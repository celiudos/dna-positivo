import DnafisicoequanticoJson from "@data/dnafisicoequantico.json";
import DnapositivoJson from "@data/dnapositivo.json";
import InteligenciaartificialpositivaJson from "@data/inteligenciaartificialpositiva.json";
import IBloggerJson from "@typesApp/IBloggerJson";
import { IPost } from "@typesApp/IPost";
import TextUtils from "@utils/TextUtils";
import sanitizeHtml from "sanitize-html";

export default class ApiApp {
  static defaultPost: IPost = {
    title: "",
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
    const DnafisicoequanticoDados = DnafisicoequanticoJson as IBloggerJson;
    const DnapositivoDados = DnapositivoJson as IBloggerJson;
    const InteligenciaartificialpositivaDados =
      InteligenciaartificialpositivaJson as IBloggerJson;
    const posts1 = DnafisicoequanticoDados.feed.entry.map((p) => ({
      ...p,
      cat: 1,
      catName: "DNA Físico e Quântico",
    }));
    const posts2 = DnapositivoDados.feed.entry.map((p) => ({
      ...p,
      cat: 2,
      catName: "DNA Positivo",
    }));
    const posts3 = InteligenciaartificialpositivaDados.feed.entry.map((p) => ({
      ...p,
      cat: 3,
      catName: "Inteligência Artificial Positiva",
    }));

    const posts = [...posts1, ...posts2, ...posts3];
    const itens = posts.map(
      (item: any, key): IPost => ({
        title: item.title.$t,
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

  static getDefaultPost(): IPost {
    return ApiApp.defaultPost;
  }

  static tratarDados(posts: IPost[]): IPost[] {
    const postsTratados = posts.map((p) => {
      // if (p.title.indexOf("-ureteral grau IV") !== -1) {
      //   console.log("p.title:", p.title);
      // }
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
