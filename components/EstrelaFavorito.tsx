import baselineStar from "@iconify/icons-ic/baseline-star";
import outlineStarOutline from "@iconify/icons-ic/outline-star-outline";
import { Icon } from "@iconify/react";
import { Button, IconButton } from "@mui/material";
import { IPost } from "@typesApp/IPost";
import FavoritosStorageUtils from "@utils/FavoritosStorageUtils";
import * as React from "react";

export default function EstrelaFavorito({
  item,
  typeBtn,
}: {
  item: IPost;
  typeBtn?: boolean;
}) {
  const [favStorage, setFavStorage] = React.useState(
    FavoritosStorageUtils.getObjDefault
  );

  React.useEffect(() => {
    setFavStorage(FavoritosStorageUtils.get());
  }, []);

  const isItemComEstrela = !!favStorage.favoritos[item.id];

  function onClickIcon() {
    let jsonStorage;
    if (isItemComEstrela) {
      jsonStorage = FavoritosStorageUtils.removeById(item.id.toString());
    } else {
      jsonStorage = FavoritosStorageUtils.set(item);
    }
    setFavStorage(jsonStorage);
  }

  const idButton = `EstrelaFavorito-${item.id}`;

  const ElemEstrela = isItemComEstrela ? (
    <Icon icon={baselineStar} color="secondary" />
  ) : (
    <Icon icon={outlineStarOutline} />
  );

  return typeBtn ? (
    <Button
      id={idButton}
      variant="outlined"
      color="inherit"
      endIcon={ElemEstrela}
      onClick={onClickIcon}
    >
      Favorito
    </Button>
  ) : (
    <IconButton
      id={idButton}
      edge="end"
      aria-label="favorito"
      onClick={onClickIcon}
    >
      {ElemEstrela}
    </IconButton>
  );
}
