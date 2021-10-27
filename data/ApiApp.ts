import DnafisicoequanticoJson from "@data/dnafisicoequantico.json";
import DnapositivoJson from "@data/dnapositivo.json";
import InteligenciaartificialpositivaJson from "@data/inteligenciaartificialpositiva.json";
import IBloggerJson, { IEntryComCat } from "@typesApp/IBloggerJson";
import { IPost } from "@typesApp/IPost";
import TextUtils from "@utils/TextUtils";
import axios from "axios";
import lodash from "lodash";
import sanitizeHtml from "sanitize-html";

export default class ApiApp {
  static defaultPost: IPost = {
    title: "",
    published: "",
    updated: "",
    content: "",
    contentSanitized: "",
    cat: 0,
    catName: "",
    id: 0,
    isSubheader: false,
    href: "",
    hrefOriginal: "",
  };

  static getTodos(): IPost[] {
    const {
      DnafisicoequanticoDados,
      DnapositivoDados,
      InteligenciaartificialpositivaDados,
    } = ApiApp.getJsonsEstaticos();

    const posts = ApiApp.getApenasPostsDoEntry(
      DnafisicoequanticoDados,
      DnapositivoDados,
      InteligenciaartificialpositivaDados
    );

    return ApiApp.formatarPostDoBlogParaOApp(posts);
  }

  private static formatarPostDoBlogParaOApp(posts: IEntryComCat[]) {
    const itens = posts.map(
      (item: any, key): IPost => ({
        title: item.title.$t,
        published: item.published.$t,
        updated: item.updated.$t,
        content: item.content.$t,
        contentSanitized: sanitizeHtml(item.content.$t, {
          // allowedTags: [""],
          // allowedAttributes: {},
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
          allowedStyles: {
            "*": {
              // Match HEX and RGB
              color: [
                /^#(0x)?[0-9a-f]+$/i,
                /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
              ],
              "text-align": [/^left$/, /^right$/, /^center$/],
              // Match any number with px, em, or %
              "font-size": [/^\d+(?:px|em|%)$/],
            },
            p: {
              "font-size": [/^\d+rem$/],
            },
          },
        }),
        cat: item.cat,
        catName: item.catName,
        id: key,
        isSubheader: false,
        href: `/cat/${item.cat}/${key}`,
        hrefOriginal: item.link.filter(
          (l: any) => l.type === "text/html" && l.rel === "alternate"
        )[0].href,
      })
    );

    return ApiApp.tratarDados(itens);
  }

  private static getApenasPostsDoEntry(
    DnafisicoequanticoDados: IBloggerJson,
    DnapositivoDados: IBloggerJson,
    InteligenciaartificialpositivaDados: IBloggerJson
  ): IEntryComCat[] {
    let posts1: any = [];
    let posts2: any = [];
    let posts3: any = [];

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

    const posts = [...posts1, ...posts2, ...posts3];
    return posts;
  }

  private static getJsonsEstaticos() {
    const DnafisicoequanticoDados = DnafisicoequanticoJson as IBloggerJson;
    const DnapositivoDados = DnapositivoJson as IBloggerJson;
    const InteligenciaartificialpositivaDados =
      InteligenciaartificialpositivaJson as IBloggerJson;
    return {
      DnafisicoequanticoDados,
      DnapositivoDados,
      InteligenciaartificialpositivaDados,
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
    } = ApiApp.getJsonsEstaticos();

    const posts1 = await ApiApp.verificarSeTemPostNovoNoSite(
      DnafisicoequanticoDados,
      "https://dnafisicoequantico.blogspot.com"
    );
    const posts2 = await ApiApp.verificarSeTemPostNovoNoSite(
      DnapositivoDados,
      "https://dnapositivo.blogspot.com"
    );
    const posts3 = await ApiApp.verificarSeTemPostNovoNoSite(
      InteligenciaartificialpositivaDados,
      "https://inteligenciaartificialpositiva.blogspot.com"
    );

    let posts: any = [];

    if (posts1 && posts2 && posts3) {
      posts = ApiApp.getApenasPostsDoEntry(posts1, posts2, posts3);
      posts = ApiApp.formatarPostDoBlogParaOApp(posts);
    }

    return posts;
  }

  private static async verificarSeTemPostNovoNoSite(
    jsonEstativo: IBloggerJson,
    urlBase: string
  ) {
    const dataUltimaAtualizacao = jsonEstativo.feed.updated.$t;

    let responseData;
    try {
      const response = await axios.get(`${urlBase}/feeds/posts/default`, {
        params: {
          alt: "json",
          "updated-min": dataUltimaAtualizacao,
          orderby: "updated",
        },
      });
      responseData = response.data as IBloggerJson;
    } catch (error) {
      console.log("error:", error);
    }
    return responseData;
  }

  static getDefaultPost(): IPost {
    return ApiApp.defaultPost;
  }

  static tratarDados(posts: IPost[]): IPost[] {
    const postsTratados = posts.map((p) => {
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
    return postsTratados;
  }
}
