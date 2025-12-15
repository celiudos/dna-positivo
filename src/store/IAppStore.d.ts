type IAppFuncsStore = {
  setFavorito: (favorito: IStoreDefault["favorito"]) => void;
  setFavoritoAlterado: (favoritoAlterado: IStoreDefault["favoritoAlterado"]) => void;
  setCarregandoPagina: (carregandoPagina: IStoreDefault["carregandoPagina"]) => void;
  setPostsNovos: (postsNovos: IStoreDefault["postsNovos"]) => void;
  setPosts: (posts: IStoreDefault["posts"]) => void;
  setAllPosts: (allPosts: IStoreDefault["allPosts"]) => void;
};

type IStoreDefault = {
  favorito: {
    version: string;
    favoritos: { [key: string]: IPost } | null;
  };
  favoritoAlterado: IPost | null;
  carregandoPagina: number;
  postsNovos: IPost[] | undefined;
  posts: IPost[] | undefined;
  allPosts: IPost[] | undefined;
};

type IAppStore = IAppFuncsStore & IStoreDefault;
