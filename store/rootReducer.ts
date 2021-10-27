import { IFavoritosStorage } from "@typesApp/IFavoritosStorage";
import { IPost } from "@typesApp/IPost";
import FavoritosStorageUtils from "@utils/FavoritosStorageUtils";

interface ReduxState {
  favorito: IFavoritosStorage;
  favoritoAlterado: IPost | {};
}

let stateInicial: ReduxState = {
  favorito: FavoritosStorageUtils.getObjDefault(),
  favoritoAlterado: {},
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
    default:
      return state;
  }
}
