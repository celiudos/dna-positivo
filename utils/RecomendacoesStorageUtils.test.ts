import { IPost } from "@typesApp/IPost";
import RecomendacoesStorageUtils from "./RecomendacoesStorageUtils";

/**
 * `testEnvironment` do Jest é "node" (ver package.json), então não existe
 * `localStorage` global como no navegador. Um mock em memória bem simples
 * já basta para exercitar o utilitário.
 */
function criarLocalStorageMock() {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => (key in store ? store[key] : null),
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
}

// @ts-ignore -- mock mínimo só com o que RecomendacoesStorageUtils usa
global.localStorage = criarLocalStorageMock();

function post(dados: Partial<IPost>): IPost {
  return {
    id: "id",
    title: "",
    published: "",
    updated: "",
    resumo: "",
    content: "",
    contentSanitized: "",
    cat: 1,
    catName: "Categoria",
    href: "",
    hrefOriginal: "",
    isSubheader: false,
    isPage: false,
    isNovo: false,
    ...dados,
  };
}

beforeEach(() => {
  localStorage.clear();
});

describe("extrairPalavras", () => {
  it("remove HTML, acentos, caixa, palavras curtas e palavras comuns", () => {
    const palavras = RecomendacoesStorageUtils.extrairPalavras(
      "<p>A Meditação e o Subconsciente</p>"
    );
    expect(palavras).toEqual(["meditacao", "subconsciente"]);
  });

  it("retorna vazio para texto vazio", () => {
    expect(RecomendacoesStorageUtils.extrairPalavras("")).toEqual([]);
  });
});

describe("registrarVisualizacao", () => {
  it("soma peso às palavras do título e do resumo, título pesando mais", () => {
    const jsonObj = RecomendacoesStorageUtils.registrarVisualizacao(
      post({
        id: "1",
        title: "Meditação Guiada",
        resumo: "Uma técnica de meditação para relaxar",
      })
    );

    expect(jsonObj.palavrasChave.meditacao).toBe(3 + 1); // título (3) + resumo (1)
    expect(jsonObj.palavrasChave.guiada).toBe(3);
    expect(jsonObj.visualizados).toEqual(["1"]);
  });

  it("marca o post como visualizado sem duplicar em visualizações repetidas", () => {
    const item = post({ id: "1", title: "Meditação Guiada", resumo: "" });

    RecomendacoesStorageUtils.registrarVisualizacao(item);
    const jsonObj = RecomendacoesStorageUtils.registrarVisualizacao(item);

    expect(jsonObj.visualizados).toEqual(["1"]);
    expect(jsonObj.palavrasChave.meditacao).toBe(6); // duas visualizações
  });
});

describe("recomendar", () => {
  it("não recomenda nada sem perfil de interesse salvo", () => {
    const posts = [post({ id: "1", title: "Meditação Guiada" })];
    expect(RecomendacoesStorageUtils.recomendar(posts)).toEqual([]);
  });

  it("prioriza posts com mais palavras-chave em comum com o histórico", () => {
    RecomendacoesStorageUtils.registrarVisualizacao(
      post({
        id: "visto",
        title: "Meditação e Subconsciente Positivo",
        resumo: "",
      })
    );

    const maisProximo = post({
      id: "2",
      title: "Subconsciente Positivo em Ação",
      resumo: "",
    });
    const menosProximo = post({
      id: "3",
      title: "Meditação para dormir",
      resumo: "",
    });
    const semRelacao = post({ id: "4", title: "Receita de bolo", resumo: "" });

    const recomendados = RecomendacoesStorageUtils.recomendar([
      semRelacao,
      menosProximo,
      maisProximo,
    ]);

    expect(recomendados.map((p) => p.id)).toEqual(["2", "3"]);
  });

  it("nunca recomenda um post já visualizado", () => {
    RecomendacoesStorageUtils.registrarVisualizacao(
      post({ id: "1", title: "Meditação Guiada", resumo: "" })
    );

    const recomendados = RecomendacoesStorageUtils.recomendar([
      post({ id: "1", title: "Meditação Guiada", resumo: "" }),
    ]);

    expect(recomendados).toEqual([]);
  });

  it("respeita a quantidade pedida", () => {
    RecomendacoesStorageUtils.registrarVisualizacao(
      post({ id: "visto", title: "Meditação Positiva", resumo: "" })
    );

    const posts = [1, 2, 3, 4, 5].map((n) =>
      post({ id: `${n}`, title: "Meditação Positiva", resumo: "" })
    );

    expect(RecomendacoesStorageUtils.recomendar(posts, 2)).toHaveLength(2);
  });
});

export {};
