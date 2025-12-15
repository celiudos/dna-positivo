import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  format,
  isValid,
  parseISO,
} from "date-fns";
import { ptBR } from "date-fns/locale";

export default class DateUtils {
  // static formatarDataAtualArquivo(formato: string = "yyyy_MM_dd"): string {
  //   try {
  //     return format(new Date(), formato, {
  //       locale: ptBR,
  //     });
  //   } catch (error) {
  //     console.log("Erro no formatarDataUX:", error);
  //     return "_erroData_";
  //   }
  // }

  static formatarDataDatetimeUX({ data = "", formato = "PPPP" }) {
    try {
      return format(new Date(data), formato, {
        locale: ptBR,
      });
    } catch (error) {
      console.log("Erro no formatarDataDatetimeUX:", data, error);
      return "-";
    }
  }

  static formatarDataUX({ data = "", formato = "PPPP", isDataAtual = false }) {
    try {
      if (isDataAtual) {
        return format(new Date(), formato, {
          locale: ptBR,
        });
      } else {
        if (!DateUtils.isDataValidaRegex(data)) return "...";
        data = DateUtils.sanearData(data);
        const divideData = data.split("/");
        const dataFormatada = `${divideData[1]}/${divideData[0]}/${divideData[2]}`;
        return format(new Date(dataFormatada), formato, {
          locale: ptBR,
        });
      }
    } catch (error) {
      console.log("Erro no formatarDataUX:", data, error);
      return "-";
    }
  }

  static getDatasInTimestamp({ ini = "", fim = "" }) {
    if (!DateUtils.isDataValidaRegex(ini) || !DateUtils.isDataValidaRegex(fim))
      return { dtIni: 0, dtFim: 0 };

    ini = DateUtils.sanearData(ini);
    fim = DateUtils.sanearData(fim);

    const dataIniTimestamp = new Date(
      parseInt(DateUtils.formatarDataUX({ data: ini, formato: "T" }))
    );
    const dataFimTimestamp = new Date(
      parseInt(DateUtils.formatarDataUX({ data: fim, formato: "T" }))
    );

    return { dtIni: dataIniTimestamp, dtFim: dataFimTimestamp };
  }

  static getdiffInCalendarMonths({ ini = "", fim = "" }) {
    if (!DateUtils.isDataValidaRegex(ini) || !DateUtils.isDataValidaRegex(fim))
      return 0;
    ini = DateUtils.sanearData(ini);
    fim = DateUtils.sanearData(fim);
    const { dtIni, dtFim } = DateUtils.getDatasInTimestamp({
      ini,
      fim,
    });
    return differenceInCalendarMonths(dtIni, dtFim);
  }

  static getdiffInCalendarDays({ ini = new Date(), fim = new Date() }) {
    return differenceInCalendarDays(ini, fim);
  }

  static isDataValida(dt = "") {
    return isValid(parseISO(dt));
  }

  static isDataValidaRegex(dt = "") {
    return (
      dt.search(
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
      ) !== -1
    );
  }

  static sanearData(dt = "") {
    return dt.replaceAll("-", "/").replaceAll(".", "/");
  }

  static isPostMenorQueDiasDiff(postDateUpdated: string, diasDeDif = 15) {
    return (
      DateUtils.getdiffInCalendarDays({
        fim: new Date(postDateUpdated),
      }) < diasDeDif
    );
  }
}
