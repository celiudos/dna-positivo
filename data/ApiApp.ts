import DNA_fisico_e_quantico_PAGES from "@data/DNA_fisico_e_quantico_PAGES.json";
import DNA_fisico_e_quantico_POSTS from "@data/DNA_fisico_e_quantico_POSTS.json";
import DNA_holografico_e_quantico_PAGES from "@data/DNA_holografico_e_quantico_PAGES.json";
import DNA_positivo_PAGES from "@data/DNA_positivo_PAGES.json";
import Inteligencia_artificial_positiva_PAGES from "@data/Inteligencia_artificial_positiva_PAGES.json";
import Inteligencia_artificial_positiva_POSTS from "@data/Inteligencia_artificial_positiva_POSTS.json";
import IBloggerJson, { IEntryComCat } from "@typesApp/IBloggerJson";
import { IPost } from "@typesApp/IPost";
import DateUtils from "@utils/DateUtils";
import TextUtils from "@utils/TextUtils";
import axios from "axios";
import lodash from "lodash";
import sanitizeHtml from "sanitize-html";
import getUuid from "uuid-by-string";

export default class ApiApp {
  static defaultPost: IPost = {
    title: "",
    published: "",
    updated: "",
    content: "",
    contentSanitized: "",
    resumo: "",
    cat: 0,
    catName: "",
    id: "",
    isPage: false,
    isSubheader: false,
    href: "",
    hrefOriginal: "",
  };

  static getTodos(): IPost[] {
    let {
      DnafisicoequanticoDados,
      DnapositivoDados,
      InteligenciaartificialpositivaDados,
      DNA_holografico_e_quantico_Dados,
    } = ApiApp.getJsonsEstaticosDePosts();

    let posts = ApiApp.getApenasPostsDoEntry(
      DnafisicoequanticoDados,
      DnapositivoDados,
      InteligenciaartificialpositivaDados,
      DNA_holografico_e_quantico_Dados
    );

    let { InteligenciaartificialpositivaDadosPages } =
      ApiApp.getJsonsEstaticosDePages();

    let pages = ApiApp.getApenasPostsDoEntryGenerico(
      InteligenciaartificialpositivaDadosPages,
      3,
      "Inteligência Artificial Positiva"
    );

    const postsFormatados = ApiApp.formatarPostDoBlogParaOApp(posts);
    const pagesFormatados = ApiApp.formatarPostDoBlogParaOApp(pages, true);

    let todosPosts = [...postsFormatados, ...pagesFormatados];

    return todosPosts;
  }

  private static formatarPostDoBlogParaOApp(
    posts: IEntryComCat[],
    isPage: boolean = false
  ): IPost[] {
    const itens = posts.map((item: any, key): IPost => {
      const id = getUuid(item.id.$t);

      let resumo = sanitizeHtml(item.content.$t, {
        allowedTags: [""],
        allowedAttributes: {},
      });
      resumo = resumo.slice(0, 180);

      return {
        title: item.title.$t,
        published: item.published.$t,
        updated: item.updated.$t,
        content: item.content.$t,
        contentSanitized: sanitizeHtml(item.content.$t, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
          allowedAttributes: {
            table: ["border"],
            // img: ["src", "height", "width"],
            img: ["src"],
            a: ["href", "target"],
          },
          allowedStyles: {
            "*": {
              // Match HEX and RGB
              color: [
                /^#(0x)?[0-9a-f]+$/i,
                /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
              ],
              "text-align": [/^left$/, /^right$/, /^center$/],
              // Match any number with px, em, or %
              // "font-size": [/^\d+(?:px|em|%)$/],
            },
            // p: {
            //   "font-size": [/^\d+rem$/],
            // },
          },
        }),
        resumo,
        cat: item.cat,
        catName: item.catName,
        id,
        isSubheader: false,
        isPage,
        href: `/cat/${item.cat}/${id}`,
        hrefOriginal: item.link.filter(
          (l: any) => l.type === "text/html" && l.rel === "alternate"
        )[0].href,
      };
    });

    return ApiApp.tratarDados(itens);
  }

  private static getApenasPostsDoEntry(
    DnafisicoequanticoDados: IBloggerJson,
    DnapositivoDados: IBloggerJson,
    InteligenciaartificialpositivaDados: IBloggerJson,
    DNA_holografico_e_quantico_Dados: IBloggerJson
  ): IEntryComCat[] {
    let posts1: any = [];
    let posts2: any = [];
    let posts3: any = [];
    let posts4: any = [];

    try {
      posts1 = DnafisicoequanticoDados.feed.entry.map((p) => ({
        ...p,
        cat: 1,
        catName: "DNA Físico e Quântico",
      }));
    } catch (error) {}

    try {
      posts2 = DnapositivoDados.feed.entry.map((p) => ({
        ...p,
        cat: 2,
        catName: "DNA Positivo",
      }));
    } catch (error) {}

    try {
      posts3 = InteligenciaartificialpositivaDados.feed.entry.map((p) => ({
        ...p,
        cat: 3,
        catName: "Inteligência Artificial Positiva",
      }));
    } catch (error) {}

    try {
      posts4 = DNA_holografico_e_quantico_Dados.feed.entry.map((p) => ({
        ...p,
        cat: 4,
        catName: "DNA Holográfico e Quântico",
      }));
    } catch (error) {}

    const posts = [...posts1, ...posts2, ...posts3, ...posts4];
    return posts;
  }

  private static getApenasPostsDoEntryGenerico(
    bloggerJson: IBloggerJson,
    catId: number,
    catName: string
  ): IEntryComCat[] {
    let posts: any = [];

    try {
      posts = bloggerJson.feed.entry.map((p) => ({
        ...p,
        cat: catId,
        catName: catName,
      }));
    } catch (error) {}
    return posts;
  }

  private static getJsonsEstaticosDePages() {
    const DnafisicoequanticoDadosPages =
      DNA_fisico_e_quantico_PAGES as IBloggerJson;
    const DnapositivoDadosPages = DNA_positivo_PAGES as IBloggerJson;
    const InteligenciaartificialpositivaDadosPages =
      Inteligencia_artificial_positiva_PAGES as IBloggerJson;
    const DNA_holografico_e_quanticoPages =
      DNA_holografico_e_quantico_PAGES as IBloggerJson;

    return {
      DnafisicoequanticoDadosPages,
      DnapositivoDadosPages,
      InteligenciaartificialpositivaDadosPages,
      DNA_holografico_e_quanticoPages,
    };
  }

  static getMaisRecentes(max: number = 3): IPost[] {
    let todos = ApiApp.getTodos();
    todos = lodash.orderBy(todos, "updated", "desc");
    return todos.slice(0, max);
  }

  static async getPostsNovos() {
    const {
      DnafisicoequanticoDados,
      DnapositivoDados,
      InteligenciaartificialpositivaDados,
      DNA_holografico_e_quantico_Dados,
    } = ApiApp.getJsonsEstaticosDePosts();

    const posts1 = await ApiApp.verificarSeTemPostNovoNoSite(
      DnafisicoequanticoDados,
      "https://dnafisicoequantico.blogspot.com/feeds/posts"
    );

    const posts2 = await ApiApp.verificarSeTemPostNovoNoSite(
      DnapositivoDados,
      "https://dnapositivo.blogspot.com/feeds/pages"
    );

    const posts3 = await ApiApp.verificarSeTemPostNovoNoSite(
      InteligenciaartificialpositivaDados,
      "https://inteligenciaartificialpositiva.blogspot.com/feeds/posts"
    );

    const posts4 = await ApiApp.verificarSeTemPostNovoNoSite(
      DNA_holografico_e_quantico_Dados,
      "https://dnaholograficoequantico.blogspot.com/feeds/pages"
    );

    let posts: any = [];

    if (posts1 && posts2 && posts3 && posts4) {
      posts = ApiApp.getApenasPostsDoEntry(posts1, posts2, posts3, posts4);
      posts = ApiApp.formatarPostDoBlogParaOApp(posts);
    }

    const todosPostsMaisRecentes = ApiApp.getPostsRecentes();

    posts = posts.concat(todosPostsMaisRecentes);

    return posts;
  }

  private static getPostsRecentes(diasDeDif = 15, maxPosts = 5): IPost[] {
    const todosPosts = ApiApp.getTodos();
    let todosPostsMaisRecentes = lodash.orderBy(todosPosts, "updated", "desc");

    todosPostsMaisRecentes = todosPostsMaisRecentes
      .filter(
        (post) =>
          DateUtils.getdiffInCalendarDays({
            fim: new Date(post.updated),
          }) < diasDeDif
      )
      .slice(0, maxPosts);
    return todosPostsMaisRecentes;
  }

  static async getPostsENovosById(id: IPost["id"]): Promise<IPost> {
    const todosPosts = ApiApp.getTodos();
    const post = todosPosts.filter((item) => item.id.toString() === id);

    let postCarregado = post[0];

    if (!postCarregado) {
      const postsNovos = await ApiApp.getPostsNovos();
      postCarregado = postsNovos.filter((np: IPost) => np.id === id)[0];
    }

    return postCarregado;
  }

  static async getTodosENovos(): Promise<IPost[]> {
    const todosPosts = ApiApp.getTodos();
    const postsNovos = await ApiApp.getPostsNovos();
    const postsCarregados = todosPosts.concat(postsNovos);
    return postsCarregados;
  }

  private static getJsonsEstaticosDePosts() {
    const DnafisicoequanticoDados = DNA_fisico_e_quantico_POSTS as IBloggerJson;
    const InteligenciaartificialpositivaDados =
      Inteligencia_artificial_positiva_POSTS as IBloggerJson;

    // Ajuste rápido: Só busca de PAGES
    const DnapositivoDados = DNA_positivo_PAGES as IBloggerJson;
    const DNA_holografico_e_quantico_Dados =
      DNA_holografico_e_quantico_PAGES as IBloggerJson;

    return {
      DnafisicoequanticoDados,
      DnapositivoDados,
      InteligenciaartificialpositivaDados,
      DNA_holografico_e_quantico_Dados,
    };
  }

  private static async verificarSeTemPostNovoNoSite(
    jsonEstativo: IBloggerJson,
    urlBase: string
  ) {
    const dataUltimaAtualizacao = jsonEstativo.feed.updated.$t;

    let responseData;

    try {
      const response = await axios.get(`${urlBase}/default`, {
        params: {
          alt: "json",
          "updated-min": dataUltimaAtualizacao,
          "max-results": "5",
          orderby: "updated",
        },
      });

      responseData = response.data as IBloggerJson;
    } catch (error) {
      console.log("error:", error);
    }

    // PAGES NÃO FILTRAM POR "updated-min". Faz a filtragem manual
    if (responseData?.feed.entry) {
      responseData.feed.entry = responseData.feed.entry.filter(
        (post) => new Date(post.updated.$t) > new Date(dataUltimaAtualizacao)
      );
    }

    return responseData;
  }

  static getDefaultPost(): IPost {
    return ApiApp.defaultPost;
  }

  static tratarDados(posts: IPost[]): IPost[] {
    let postsTratados = posts.map((p) => {
      let novoTitle = p.title;

      novoTitle = novoTitle
        .replace("Diálogo dirigido com o ", "")
        .replace("Diálogo Dirigido com o ", "")
        .replace("Diálogo dirigido com a ", "")
        .replace("Diálogo Dirigido com a ", "")
        .replace("Diálogo Dirigido com ", "");
      novoTitle = novoTitle.trim();
      novoTitle = TextUtils.capitalize(novoTitle);

      p.title = novoTitle;

      return p;
    });

    postsTratados = postsTratados.filter((p) => p.title !== "");

    return postsTratados;
  }

  private static unirPostsIguais(posts: IPost[]): IPost[] {
    // posts = lodash.uniqBy(posts, "title");
    return posts;
  }
}
