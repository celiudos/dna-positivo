export default class TextUtils {
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
