import BloggerJsonType from "@data/BloggerJsonType";
import DnafisicoequanticoJson from "@data/dnafisicoequantico.json";
import DnapositivoJson from "@data/dnapositivo.json";
import InteligenciaartificialpositivaJson from "@data/inteligenciaartificialpositiva.json";

export type PostType = {
  id: number;
  title: string;
  content: string;
  cat: number;
  catName: string;
  href: string;
  isSubheader: boolean;
};

export default class ApiApp {
  static getTodos(): PostType[] {
    const DnafisicoequanticoDados = DnafisicoequanticoJson as BloggerJsonType;
    const DnapositivoDados = DnapositivoJson as BloggerJsonType;
    const InteligenciaartificialpositivaDados =
      InteligenciaartificialpositivaJson as BloggerJsonType;
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
      (item: any, key): PostType => ({
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
}
