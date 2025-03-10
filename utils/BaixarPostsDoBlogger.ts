import IBloggerJson, { IEntryComCat } from "@typesApp/IBloggerJson";
import { IPost } from "@typesApp/IPost";
import TextUtils from "@utils/TextUtils";
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
      name: "inteligenciavirtualpositiva",
      catId: 3,
      catName: "Inteligência Virtual Positiva",
    },
    {
      name: "dnaholograficoequantico",
      catId: 4,
      catName: "DNA Holográfico e Quântico",
    },
    {
      name: "dnadometaverso",
      catId: 5,
      catName: "DNA do Metaverso",
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
    // {
    //   catId: "3",
    //   tipo: "pages",
    // },
    {
      catId: "4",
      tipo: "pages",
    },
    {
      catId: "5",
      tipo: "posts",
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
    isNovo: false,
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
        .replace("Diálogo Dirigido - ", "")
        .replace("Diálogo Dirigido ao ", "")
        .replace("Diálogo Dirigido para o ", "")
        .replace("Diálogo Dirigido para a ", "")
        .replace("Diálogo Dirigido para ", "")
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

    // filtrar posts com o mesmo nome
    postsTratados = lodash.uniqBy(postsTratados, "title");
    // console.log("postsTratados:", postsTratados);

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
        isNovo: false,
        href: `/cat/${item.cat}/${id}`,
        hrefOriginal: item.link.filter(
          (l: any) => l.type === "text/html" && l.rel === "alternate"
        )[0].href,
        resumo,
        contentSanitized: sanitizeHtml(item.content.$t, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat([
            "img",
            "iframe",
          ]),
          allowedAttributes: {
            table: ["border"],
            img: ["src"],
            a: ["href", "target"],
            iframe: [
              "src",
              // "width",
              "height",
              "frameborder",
              "allow",
              "allowfullscreen",
            ],
          },
          allowedStyles: {
            "*": {
              color: [
                /^#(0x)?[0-9a-f]+$/i,
                /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
              ],
              "text-align": [/^left$/, /^right$/, /^center$/],
            },
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
    let txt = "";
    try {
      const url = new URL(
        `https://${urlBase}.blogspot.com/feeds/${urlPost}/default`
      );
      const params = {
        alt: "json",
        orderby: "updated",
        ...paramsBlogger,
      };
      url.search = new URLSearchParams(params).toString();

      const response = await fetch(url.toString());
      txt = await response.text();
      responseData = BaixarPostsDoBlogger.fixJson(txt) as IBloggerJson;
    } catch (error) {
      console.log("Error getPostsFromBlogspot:", error);
    }
    return responseData;
  }

  static fixJson(jsonText: string): {} {
    let jsonFixed = {};
    try {
      jsonFixed = JSON.parse(jsonText);
    } catch (error) {
      const err = error as any;
      if (err.message.indexOf("Unexpected token , in JSON at position") > -1) {
        const pos = parseInt(err.message.split("position ")[1]);
        const jsonTextFixed = jsonText.slice(0, pos) + jsonText.slice(pos + 1);
        jsonFixed = BaixarPostsDoBlogger.fixJson(jsonTextFixed);
      }
    }
    return jsonFixed;
  }

  static getDefaultPost(): IPost {
    return BaixarPostsDoBlogger.defaultPost;
  }

  static unirPostsComIdsIguais(posts: IPost[]): IPost[] {
    posts = lodash.uniqBy(posts, "id");
    return posts;
  }
}
