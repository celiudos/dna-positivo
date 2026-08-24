import { IPost } from "@typesApp/IPost";
import { IRecomendacoesStorage } from "@typesApp/IRecomendacoesStorage";
import lodash from "lodash";
import TextUtils from "./TextUtils";

/**
 * Palavras comuns do português que não ajudam a identificar o assunto de um
 * post (artigos, preposições, conjunções, pronomes, verbos auxiliares...).
 * Ficam de fora do perfil de interesse para ele não virar só "ruído".
 */
const PALAVRAS_IGNORADAS = new Set([
  "aquele", "aquela", "aqueles", "aquelas", "aquilo", "algum", "alguma",
  "alguns", "algumas", "ainda", "antes", "apenas", "assim", "através",
  "cada", "coisa", "coisas", "como", "contra", "dele", "dela", "deles",
  "delas", "depois", "desde", "deve", "devem", "devia", "deviam", "disse",
  "disso", "disto", "então", "entre", "essa", "essas", "esse", "esses",
  "esta", "estas", "este", "estes", "esteja", "estejam", "estamos", "estão",
  "estava", "estavam", "estive", "esteve", "estivemos", "estiveram", "fazer",
  "fica", "ficam", "ficar", "forma", "fosse", "fossem", "grande", "hoje",
  "isso", "isto", "logo", "mais", "mesmo", "mesma", "mesmos", "mesmas",
  "meu", "meus", "minha", "minhas", "muito", "muita", "muitos", "muitas",
  "nossa", "nosso", "nossas", "nossos", "outra", "outras", "outro", "outros",
  "para", "pela", "pelas", "pelo", "pelos", "pode", "podem", "podendo",
  "porém", "porque", "quais", "qual", "quando", "quanto", "quanta",
  "quantos", "quantas", "quase", "seja", "sejam", "sempre", "sendo", "será",
  "serão", "seria", "seriam", "seus", "seu", "sido", "somos", "também",
  "tanto", "tanta", "tantos", "tantas", "tem", "têm", "tendo", "tenha",
  "tenham", "tinha", "tinham", "toda", "todas", "todo", "todos", "tudo",
  "vamos", "você", "vocês", "sobre", "onde", "aqui", "ali", "diga", "nome",
]);

/** Título pesa mais que resumo: é o resumo mais forte do assunto do post. */
const PESO_TITULO = 3;
const PESO_RESUMO = 1;

/** Sem limite, o perfil de interesse cresceria pra sempre no localStorage. */
const MAX_PALAVRAS_CHAVE_ARMAZENADAS = 200;
const MAX_POSTS_VISUALIZADOS = 60;

/** Abaixo disso a palavra costuma ser artigo/preposição não coberta pela lista acima. */
const TAMANHO_MINIMO_PALAVRA = 4;

const QUANTIDADE_RECOMENDACOES_PADRAO = 3;

export default class RecomendacoesStorageUtils {
  static nomeKey = "dna_positivo_recomendacoes";
  static objDefault: IRecomendacoesStorage = {
    version: "1",
    palavrasChave: {},
    visualizados: [],
  };

  static get(): IRecomendacoesStorage {
    const jsonObjStorage = localStorage.getItem(
      RecomendacoesStorageUtils.nomeKey
    );

    return jsonObjStorage
      ? (JSON.parse(jsonObjStorage) as IRecomendacoesStorage)
      : { version: "1", palavrasChave: {}, visualizados: [] };
  }

  static getObjDefault(): IRecomendacoesStorage {
    return RecomendacoesStorageUtils.objDefault;
  }

  /**
   * Extrai as palavras relevantes de um texto: remove HTML, acentuação e
   * caixa (via TextUtils, o mesmo normalizador usado na busca), e descarta
   * palavras curtas ou muito comuns.
   */
  static extrairPalavras(texto: string): string[] {
    if (!texto) return [];

    const semHtml = texto.replace(/<[^>]*>/g, " ");
    const normalizado = TextUtils.substituirCharsSpeciais(
      semHtml
    ).toLowerCase();

    return normalizado
      .split(/\s+/)
      .filter(
        (palavra) =>
          palavra.length >= TAMANHO_MINIMO_PALAVRA &&
          !PALAVRAS_IGNORADAS.has(palavra)
      );
  }

  /**
   * Registra a visualização de um post: soma peso às palavras-chave do
   * título e do resumo no perfil de interesse guardado no localStorage, e
   * marca o post como visto (para "recomendar" não sugerir de novo o que o
   * usuário acabou de ler). Chamado pela tela de leitura do post a cada
   * post visualizado.
   */
  static registrarVisualizacao(
    post: Pick<IPost, "id" | "title" | "resumo">
  ): IRecomendacoesStorage {
    const jsonObj = RecomendacoesStorageUtils.get();

    const palavrasComPeso = [
      ...RecomendacoesStorageUtils.extrairPalavras(post.title).map(
        (palavra) => ({ palavra, peso: PESO_TITULO })
      ),
      ...RecomendacoesStorageUtils.extrairPalavras(post.resumo).map(
        (palavra) => ({ palavra, peso: PESO_RESUMO })
      ),
    ];

    palavrasComPeso.forEach(({ palavra, peso }) => {
      jsonObj.palavrasChave[palavra] =
        (jsonObj.palavrasChave[palavra] || 0) + peso;
    });

    jsonObj.palavrasChave = Object.fromEntries(
      lodash
        .orderBy(
          Object.entries(jsonObj.palavrasChave),
          ([, peso]) => peso,
          "desc"
        )
        .slice(0, MAX_PALAVRAS_CHAVE_ARMAZENADAS)
    );

    jsonObj.visualizados = [
      post.id,
      ...jsonObj.visualizados.filter((id) => id !== post.id),
    ].slice(0, MAX_POSTS_VISUALIZADOS);

    localStorage.setItem(
      RecomendacoesStorageUtils.nomeKey,
      JSON.stringify(jsonObj)
    );

    return jsonObj;
  }

  /**
   * Algoritmo simples de recomendação por proximidade de palavras-chave:
   * cada post candidato ganha uma pontuação igual à soma, no perfil salvo,
   * do peso das palavras do seu título/resumo que já apareceram no que o
   * usuário leu — quanto mais palavras em comum (e quanto mais fortes elas
   * forem no histórico), mais perto o post fica do que ele costuma ler.
   * Sem perfil ainda formado, ou sem nenhum post com pontuação, não há
   * recomendação.
   */
  static recomendar(
    posts: IPost[],
    quantidade = QUANTIDADE_RECOMENDACOES_PADRAO
  ): IPost[] {
    const { palavrasChave, visualizados } = RecomendacoesStorageUtils.get();
    if (!Object.keys(palavrasChave).length) return [];

    const idsVisualizados = new Set(visualizados);

    const pontuados = posts
      .filter((post) => !idsVisualizados.has(post.id))
      .map((post) => {
        const palavrasDoPost = new Set([
          ...RecomendacoesStorageUtils.extrairPalavras(post.title),
          ...RecomendacoesStorageUtils.extrairPalavras(post.resumo),
        ]);

        const pontuacao = Array.from(palavrasDoPost).reduce(
          (soma, palavra) => soma + (palavrasChave[palavra] || 0),
          0
        );

        return { post, pontuacao };
      })
      .filter((item) => item.pontuacao > 0);

    return lodash
      .orderBy(pontuados, "pontuacao", "desc")
      .slice(0, quantidade)
      .map((item) => item.post);
  }
}
