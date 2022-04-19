import { IFavoritosStorage } from "@typesApp/IFavoritosStorage";
import { IPost } from "@typesApp/IPost";
import FavoritosStorageUtils from "@utils/FavoritosStorageUtils";

interface ReduxState {
  favorito: IFavoritosStorage;
  favoritoAlterado: IPost | {};
  carregandoPagina: number;
  postsNovos: IPost[] | undefined;
  posts: IPost[] | undefined;
  allPosts: IPost[] | undefined;
}

let stateInicial: ReduxState = {
  favorito: FavoritosStorageUtils.getObjDefault(),
  favoritoAlterado: {},
  carregandoPagina: 0,
  postsNovos: [],
  posts: [],
  allPosts: [],
};

export default function rootReducer(
  state = stateInicial,
  action: any
): ReduxState {
  state = {
    ...state,
  };

  switch (action.type) {
    //novo
    case "FAVORITO":
      return {
        ...state,
        favorito: action.valor,
      };
    case "FAVORITO_ALTERADO":
      return {
        ...state,
        favoritoAlterado: action.valor,
      };
    case "CARREGANDO_PAGINA":
      return {
        ...state,
        carregandoPagina: action.valor,
      };
    case "POSTS_NOVOS":
      return {
        ...state,
        postsNovos: action.valor,
      };
    case "POSTS":
      return {
        ...state,
        posts: action.valor,
      };
    case "ALL_POSTS":
      return {
        ...state,
        allPosts: action.valor,
      };
    default:
      return state;
  }
}
