import { IFavoritosStorage } from "@typesApp/IFavoritosStorage";
import { IPost } from "@typesApp/IPost";

export default class FavoritosStorageUtils {
  static nomeKey = "dna_positivo_favoritos";
  static objDefault: IFavoritosStorage = { version: "2", favoritos: {} };

  static alteracaoDeVersao(): IFavoritosStorage {
    const jsonObjStorage =
      localStorage.getItem(FavoritosStorageUtils.nomeKey) || "";

    const jsonObj = jsonObjStorage
      ? (JSON.parse(jsonObjStorage) as IFavoritosStorage)
      : FavoritosStorageUtils.objDefault;

    switch (jsonObj.version) {
      case "1":
        return FavoritosStorageUtils.objDefault; // Resetar se for version 1
      default:
        return jsonObj;
    }
  }

  static set(value: IPost): IFavoritosStorage {
    const jsonObj = FavoritosStorageUtils.get();
    if (!jsonObj.favoritos[value.id]) jsonObj.favoritos[value.id] = value;

    localStorage.setItem(
      FavoritosStorageUtils.nomeKey,
      JSON.stringify(jsonObj)
    );

    return FavoritosStorageUtils.get();
  }

  static get(): IFavoritosStorage {
    return FavoritosStorageUtils.alteracaoDeVersao();
  }

  static removeById(id: string): IFavoritosStorage {
    const jsonObj = FavoritosStorageUtils.get();
    delete jsonObj.favoritos[id];

    localStorage.setItem(
      FavoritosStorageUtils.nomeKey,
      JSON.stringify(jsonObj)
    );

    return FavoritosStorageUtils.get();
  }

  static getById(id: string): IPost | {} {
    const jsonObj = FavoritosStorageUtils.get();
    return jsonObj.favoritos
      ? jsonObj.favoritos[id]
      : FavoritosStorageUtils.objDefault;
  }

  static verificaSeExiste(): boolean {
    return !!localStorage.getItem(FavoritosStorageUtils.nomeKey);
  }

  static getObjDefault(): IFavoritosStorage {
    return FavoritosStorageUtils.objDefault;
  }
}
