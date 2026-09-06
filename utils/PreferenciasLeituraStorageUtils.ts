import { IPreferenciasLeitura } from "@typesApp/IPreferenciasLeitura";

/**
 * Preferências da experiência de leitura persistidas no navegador. Hoje só o
 * nível de ampliação da fonte: o usuário aumenta/diminui na barra de leitura
 * do post e o valor fica gravado aqui para valer nas próximas telas e posts
 * (ajuste global, não por página). Segue o mesmo formato dos outros
 * *StorageUtils — um objeto com `version` para migração/reset de formato.
 */
export default class PreferenciasLeituraStorageUtils {
  static nomeKey = "dna_positivo_preferencias_leitura";

  /** Faixa de níveis aceitos para o ajuste de fonte (0 = padrão do tema). */
  static LIMITE_MIN = 0;
  static LIMITE_MAX = 5;

  static objDefault: IPreferenciasLeitura = {
    version: "1",
    tamanhoFonte: PreferenciasLeituraStorageUtils.LIMITE_MIN,
  };

  static getObjDefault(): IPreferenciasLeitura {
    return { ...PreferenciasLeituraStorageUtils.objDefault };
  }

  /** Mantém o nível dentro da faixa e sem casas decimais. */
  static normalizarNivel(valor: number): number {
    if (!Number.isFinite(valor)) {
      return PreferenciasLeituraStorageUtils.LIMITE_MIN;
    }

    return Math.min(
      PreferenciasLeituraStorageUtils.LIMITE_MAX,
      Math.max(
        PreferenciasLeituraStorageUtils.LIMITE_MIN,
        Math.round(valor),
      ),
    );
  }

  static get(): IPreferenciasLeitura {
    if (typeof localStorage === "undefined") {
      return PreferenciasLeituraStorageUtils.getObjDefault();
    }

    const bruto = localStorage.getItem(PreferenciasLeituraStorageUtils.nomeKey);
    if (!bruto) return PreferenciasLeituraStorageUtils.getObjDefault();

    try {
      const jsonObj = JSON.parse(bruto) as IPreferenciasLeitura;

      return {
        version:
          jsonObj.version || PreferenciasLeituraStorageUtils.objDefault.version,
        tamanhoFonte: PreferenciasLeituraStorageUtils.normalizarNivel(
          jsonObj.tamanhoFonte,
        ),
      };
    } catch {
      return PreferenciasLeituraStorageUtils.getObjDefault();
    }
  }

  static getTamanhoFonte(): number {
    return PreferenciasLeituraStorageUtils.get().tamanhoFonte;
  }

  /**
   * Grava o novo nível (já limitado à faixa) e devolve o valor efetivamente
   * salvo, para quem chamou refletir na tela sem reler o storage.
   */
  static setTamanhoFonte(valor: number): number {
    const jsonObj = PreferenciasLeituraStorageUtils.get();
    jsonObj.tamanhoFonte = PreferenciasLeituraStorageUtils.normalizarNivel(
      valor,
    );

    if (typeof localStorage !== "undefined") {
      localStorage.setItem(
        PreferenciasLeituraStorageUtils.nomeKey,
        JSON.stringify(jsonObj),
      );
    }

    return jsonObj.tamanhoFonte;
  }
}
