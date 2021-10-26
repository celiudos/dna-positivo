import lodash from "lodash";

type TGetDinheiroFormatado = {
  valor: number | string;
  isAbreviado?: boolean;
  prefixo?: string;
};

export default class GenericUtils {
  static substituirCharsSpeciais(s: string): string {
    if (!s) return "";
    s = s.replaceAll(new RegExp("[.-]", "g"), "");
    s = lodash.words(s).join(" ");
    s = lodash.deburr(s);
    return s;
  }

  static getDinheiroFormatado({
    valor = 0.0,
    isAbreviado = false,
    prefixo = "R$ ",
  }: TGetDinheiroFormatado): string {
    if (typeof valor === "string") valor = Number(this.formatarValor(valor));

    if (isAbreviado) {
      const units = [" mil", " milhões", " bilhões"];
      // Divide to get SI Unit engineering style numbers (1e3,1e6,1e9, etc)
      let unit: number = Math.floor((valor.toFixed(0).length - 1) / 3) * 3;
      // Calculate the remainder
      let num = valor / Number("1e" + unit);
      let unitname = units[Math.floor(unit / 3) - 1];

      if (!unitname) {
        unitname = "";
      }

      num = Math.floor(num);

      // output number remainder + unitname
      return `${prefixo}${num}${unitname}`;
    } else {
      return (
        prefixo +
        new Intl.NumberFormat("pt-BR", {
          currency: "BRL",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(valor)
      );
    }
  }

  static capitalizeTheFirstLetterOfEachWord(words: string): string {
    var separateWord = words.toLowerCase().split(" ");
    for (var i = 0; i < separateWord.length; i++) {
      separateWord[i] =
        separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    return separateWord.join(" ");
  }

  static bytesToSize(bytes: number): string {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte"; // eslint-disable-line
    var i = Math.floor(Math.log(bytes) / Math.log(1024)); // eslint-disable-line
    return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
  }

  static getPorcentagem({ ind = 0, qntTotal = 0 }): string {
    return Math.round((ind / qntTotal) * 100) + "%";
  }

  static isParamsVazios(params = {}) {
    return Object.values(params).some((v) => !v);
  }

  static formatarValor(valStr: string): number {
    if (valStr) {
      let numberPattern = /\d+(?:\.\d{3})*,\d{2}/g;
      const numArr = valStr.match(numberPattern);

      if (!numArr || !numArr.length) return 0;

      const num = numArr[0];

      const separarNum = num.replaceAll(".", "").replace(",", ".");
      return parseFloat(separarNum);
    } else {
      return 0;
    }
  }

  static somenteNumeros(str: string): string {
    if (!str) return "";
    var res = str.replace(/\D/g, "");
    return res.toString();
  }

  static cpfCnpj(v: string): string {
    if (!v) return v;

    //Remove tudo o que não é dígito
    v = v.replace(/\D/g, "");

    if (v.length <= 12) {
      //CPF

      //Coloca um ponto entre o terceiro e o quarto dígitos
      v = v.replace(/(\d{3})(\d)/, "$1.$2");

      //Coloca um ponto entre o terceiro e o quarto dígitos
      //de novo (para o segundo bloco de números)
      v = v.replace(/(\d{3})(\d)/, "$1.$2");

      //Coloca um hífen entre o terceiro e o quarto dígitos
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      //CNPJ

      //Coloca ponto entre o segundo e o terceiro dígitos
      v = v.replace(/^(\d{2})(\d)/, "$1.$2");

      //Coloca ponto entre o quinto e o sexto dígitos
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");

      //Coloca uma barra entre o oitavo e o nono dígitos
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");

      //Coloca um hífen depois do bloco de quatro dígitos
      v = v.replace(/(\d{4})(\d)/, "$1-$2");
    }

    return v;
  }

  static isTestingJest() {
    return process.env.JEST_WORKER_ID !== undefined;
  }

  static limparCamposVazios(obj = {}): {} {
    return lodash.pickBy(obj, lodash.identity);
  }
}
