import { IPost } from "@typesApp/IPost";

export interface IFavoritosStorage {
  version: string;
  favoritos: { [key: string]: IPost };
}
