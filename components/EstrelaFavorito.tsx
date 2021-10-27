import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { IconButton } from "@mui/material";
import { favoritoAlteradoAction } from "@store/actionCreator";
import { IPost } from "@typesApp/IPost";
import FavoritosStorageUtils from "@utils/FavoritosStorageUtils";
import * as React from "react";
import { useDispatch } from "react-redux";

export default function EstrelaFavorito({ item }: { item: IPost }) {
  const [favStorage, setFavStorage] = React.useState(
    FavoritosStorageUtils.getObjDefault
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    setFavStorage(FavoritosStorageUtils.get());
  }, []);

  const isItemComEstrela = !!favStorage.favoritos[item.id];

  return (
    <IconButton
      edge="end"
      aria-label="favorito"
      onClick={() => {
        let jsonStorage;
        if (isItemComEstrela) {
          jsonStorage = FavoritosStorageUtils.removeById(item.id.toString());
        } else {
          jsonStorage = FavoritosStorageUtils.set(item);
        }
        dispatch(favoritoAlteradoAction(item));
        setFavStorage(jsonStorage);
      }}
    >
      {isItemComEstrela ? (
        <StarIcon color="secondary" />
      ) : (
        <StarBorderOutlinedIcon />
      )}
    </IconButton>
  );
}
