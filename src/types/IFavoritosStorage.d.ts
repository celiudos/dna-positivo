interface IFavoritosStorage {
  version: string;
  favoritos: { [key: string]: IPost };
}
