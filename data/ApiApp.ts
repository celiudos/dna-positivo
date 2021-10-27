import DnafisicoequanticoJson from "@data/dnafisicoequantico.json";
import DnapositivoJson from "@data/dnapositivo.json";
import InteligenciaartificialpositivaJson from "@data/inteligenciaartificialpositiva.json";
import IBloggerJson from "@typesApp/IBloggerJson";
import { IPost } from "@typesApp/IPost";

export default class ApiApp {
  static defaultPost: IPost = {
    title: "",
    content: "",
    cat: 0,
    catName: "",
    id: 0,
    isSubheader: false,
    href: "",
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
        cat: item.cat,
        catName: item.catName,
        id: key,
        isSubheader: false,
        href: `/cat/${item.cat}/${key}`,
      })
    );

    return itens;
  }

  static getDefaultPost(): IPost {
    return ApiApp.defaultPost;
  }
}
