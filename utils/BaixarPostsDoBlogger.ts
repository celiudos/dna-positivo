import IBloggerJson, { IEntryComCat } from "@typesApp/IBloggerJson";
import { IPost } from "@typesApp/IPost";
import TextUtils from "@utils/TextUtils";
import axios from "axios";
import lodash from "lodash";
import sanitizeHtml from "sanitize-html";
import getUuid from "uuid-by-string";

type TParamsBlogger = {
  "max-results": string;
  "start-index": string;
};

export default class BaixarPostsDoBlogger {
  static bloggerEntities = [
    {
      name: "dnafisicoequantico",
      catId: 1,
      catName: "DNA Físico e Quântico",
    },
    {
      name: "dnapositivo",
      catId: 2,
      catName: "DNA Positivo",
    },
    {
      name: "inteligenciaartificialpositiva",
      catId: 3,
      catName: "Inteligência Artificial Positiva",
    },
    {
      name: "dnaholograficoequantico",
      catId: 4,
      catName: "DNA Holográfico e Quântico",
    },
  ];

  static jsonBloggerPermitidos = [
    {
      catId: "1",
      tipo: "posts",
    },
    {
      catId: "2",
      tipo: "pages",
    },
    {
      catId: "3",
      tipo: "posts",
    },
    {
      catId: "3",
      tipo: "pages",
    },
    {
      catId: "4",
      tipo: "pages",
    },
  ];

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

  static async getTodosSelecionados(
    byId?: string,
    paramsBlogger?: TParamsBlogger
  ): Promise<IPost[]> {
    let postsBlogspot: IPost[] = [];

    const permitidos = byId
      ? BaixarPostsDoBlogger.jsonBloggerPermitidos.filter((j) =>
          byId.includes(j.catId)
        )
      : BaixarPostsDoBlogger.jsonBloggerPermitidos;

    for (const p of permitidos) {
      const posts = await BaixarPostsDoBlogger.getByCatIdETipo(
        p.catId,
        p.tipo as "posts" | "pages",
        paramsBlogger
      );
      postsBlogspot = postsBlogspot.concat(posts);
    }

    return postsBlogspot;
  }

  static async getByCatIdETipo(
    catId: string,
    tipo: "posts" | "pages",
    paramsBlogger?: TParamsBlogger
  ): Promise<IPost[]> {
    let postsBlogspot: IPost[] = [];

    for await (const ent of BaixarPostsDoBlogger.bloggerEntities.filter(
      (b) => b.catId.toString() === catId
    )) {
      const posts = await BaixarPostsDoBlogger.getPostsFromBlogspot(
        ent.name,
        tipo,
        paramsBlogger
      );

      if (posts) {
        const postsEntry = BaixarPostsDoBlogger.getApenasPostsDoEntryGenerico(
          posts,
          ent.catId,
          ent.catName
        );
        const postsFormatados = BaixarPostsDoBlogger.formatarPostDoBlogParaOApp(
          postsEntry,
          tipo === "pages"
        );

        postsBlogspot = [...postsBlogspot, ...postsFormatados];
      }
    }

    return postsBlogspot;
  }

  private static tratarDados(posts: IPost[]): IPost[] {
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
        cat: item.cat,
        catName: item.catName,
        id,
        isSubheader: false,
        isPage,
        href: `/cat/${item.cat}/${id}`,
        hrefOriginal: item.link.filter(
          (l: any) => l.type === "text/html" && l.rel === "alternate"
        )[0].href,
        resumo,
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
      };
    });

    return BaixarPostsDoBlogger.tratarDados(itens);
  }

  private static getApenasPostsDoEntryGenerico(
    blogerJson: IBloggerJson,
    catId: number,
    catName: string
  ): IEntryComCat[] {
    let posts: any = [];

    try {
      posts = blogerJson.feed.entry.map((p) => ({
        ...p,
        cat: catId,
        catName: catName,
      }));
    } catch (error) {}
    return posts;
  }

  private static async getPostsFromBlogspot(
    urlBase: string,
    urlPost: "posts" | "pages",
    paramsBlogger: TParamsBlogger = {
      "max-results": "200",
      "start-index": "1",
    }
  ): Promise<IBloggerJson | undefined> {
    let responseData;

    try {
      const url = `https://${urlBase}.blogspot.com/feeds/${urlPost}/default`;

      const response = await axios.get(url, {
        params: {
          alt: "json",
          orderby: "updated",
          ...paramsBlogger,
        },
      });

      responseData = response.data as IBloggerJson;
      // console.log("responseData:", url, response);
    } catch (error) {
      console.log("error:", error);
    }
    return responseData;
  }

  // static async verificarSeTemPostNovoNoSite(
  //   urlBase: string,
  //   urlPost: "posts" | "pages",
  //   maxResults = "20"
  // ) {
  //   let responseData;

  //   try {
  //     const url = `https://${urlBase}.blogspot.com/feeds/${urlPost}/default`;
  //     const response = await axios.get(url, {
  //       params: {
  //         alt: "json",
  //         "max-results": maxResults,
  //         orderby: "updated",
  //       },
  //     });

  //     responseData = response.data as IBloggerJson;
  //   } catch (error) {
  //     console.log("error:", error);
  //   }

  //   return responseData;
  // }

  static getDefaultPost(): IPost {
    return BaixarPostsDoBlogger.defaultPost;
  }

  static unirPostsComIdsIguais(posts: IPost[]): IPost[] {
    posts = lodash.uniqBy(posts, "id");
    return posts;
  }
}
