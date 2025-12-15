import lodash from "lodash";

interface IFiltrarPorTermos {
  termos: Array<string>;
  alvoPesquisa: string;
  isOtimizado?: boolean /* Remove chars especiais */;
  isTermoExato?: boolean /* Procura exatamente o valor do alvoPesquisa */;
}

type TFiltrarPorTermos = {
  isEncontrado: boolean;
  encontradoPor: string;
};
export default class TextUtils {
  static filtrarPorTermos({
    termos,
    alvoPesquisa,
    isOtimizado,
    isTermoExato,
  }: IFiltrarPorTermos): TFiltrarPorTermos {
    let resJson = {
      isEncontrado: false,
      encontradoPor: "",
    };

    if (typeof alvoPesquisa !== "string") {
      console.log(
        "Erro filtrarPorTermosETrazerResultado: alvoPesquisa não é String"
      );
      return resJson;
    }

    const alvoPesquisaLowerCase = alvoPesquisa.trim().toLowerCase();

    termos.filter((c) => {
      const termoObjLowerCase = c.trim().toLowerCase();
      let filtrado = false;

      if (isTermoExato && isOtimizado) {
        filtrado =
          TextUtils.substituirCharsSpeciais(alvoPesquisaLowerCase) ==
          TextUtils.substituirCharsSpeciais(termoObjLowerCase);
      } else if (isTermoExato && !isOtimizado) {
        filtrado = alvoPesquisaLowerCase == termoObjLowerCase;
      } else if (!isTermoExato && isOtimizado) {
        filtrado =
          TextUtils.substituirCharsSpeciais(alvoPesquisaLowerCase).indexOf(
            TextUtils.substituirCharsSpeciais(termoObjLowerCase)
          ) !== -1;
      } else if (!isTermoExato && !isOtimizado) {
        filtrado = alvoPesquisaLowerCase.indexOf(termoObjLowerCase) !== -1;
      } else {
        filtrado = false;
      }

      if (filtrado) {
        resJson.isEncontrado = true;
        resJson.encontradoPor = c;
      }
      return c;
    });

    return resJson;
  }

  static substituirCharsSpeciais(s: string): string {
    if (!s) return "";
    // var i;
    // var r = s.toLowerCase();
    // var non_asciis = {
    //   "": "[.,?()!@#%&*()?<>=-]",
    //   " ": "[/]",
    //   S: "[$]",
    //   a: "[àáâãäå]",
    //   ae: "æ",
    //   c: "ç",
    //   e: "[èéêë]",
    //   i: "[ìíîï]",
    //   n: "ñ",
    //   o: "[òóôõö]",
    //   oe: "œ",
    //   u: "[ùúûűü]",
    //   y: "[ýÿ]",
    //   ____: '["]',
    //   ___: "[:]",
    //   __: "[}]",
    //   _: "[{]",
    // };
    // for (i in non_asciis) {
    //   r = r.replace(new RegExp(non_asciis[i], "g"), i);
    // }
    // return r;
    // s = s.trim();
    // s = s
    //   .replaceAll("  ", " ")
    //   .replaceAll(new RegExp("[.,?()!@#%&*()?<>=-]", "g"), "");
    s = s.replaceAll(new RegExp("[.-]", "g"), "");
    s = lodash.words(s).join(" ");
    s = lodash.deburr(s);
    return s;
  }

  static removerEspacosString(str: string): string {
    try {
      return str.replaceAll("\n", "").replaceAll("\t", "").trim();
    } catch (error) {
      console.log("Erro removerEspacosString: ", str, error);
      return "";
    }
  }

  static stringToSlugSemHifen(str: string): string {
    if (typeof str !== "string") {
      // console.log(
      //   "Erro stringToSlugSemHifen: valor não é STRING",
      //   typeof str
      // );
      return "";
    }

    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâãèéëêìíïîòóöôõùúüûñç·/_,:;";
    var to = "aaaaaeeeeiiiiooooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, " ") // collapse whitespace and replace by -
      .replace(/-+/g, " "); // collapse dashes

    return str;
  }

  static limitarTexto = (
    txt: string,
    tamanho = 45,
    adicionarNoFinal = "..."
  ): string => {
    if (typeof txt !== "string") {
      return "";
    }
    return txt.length >= tamanho
      ? txt.slice(0, tamanho) + adicionarNoFinal
      : txt;
  };

  static get2primeirosNomes = (s: string): string => {
    if (typeof s !== "string") {
      return "";
    }
    const separar = s.split(" ");
    if (separar[0] && separar[1]) return `${separar[0]} ${separar[1]}`;
    return separar[0];
  };

  static capitalize = (s: string): string => {
    if (typeof s !== "string") {
      return "";
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  static qntParse = (v: number): string => (v > 99 ? "+99" : v.toString());
}
