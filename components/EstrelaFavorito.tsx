import roundStar from "@iconify/icons-ic/round-star";
import roundStarBorder from "@iconify/icons-ic/round-star-border";
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

  const ElemEstrela = (
    <Icon
      icon={isItemComEstrela ? roundStar : roundStarBorder}
      width={20}
      height={20}
    />
  );

  return typeBtn ? (
    <Button
      id={idButton}
      size="small"
      variant={isItemComEstrela ? "contained" : "outlined"}
      color="secondary"
      startIcon={ElemEstrela}
      onClick={onClickIcon}
      sx={{ color: isItemComEstrela ? undefined : "text.secondary" }}
    >
      {isItemComEstrela ? "Favoritado" : "Favoritar"}
    </Button>
  ) : (
    <IconButton
      id={idButton}
      edge="end"
      aria-label={
        isItemComEstrela ? "remover dos favoritos" : "adicionar aos favoritos"
      }
      onClick={onClickIcon}
      sx={{ color: isItemComEstrela ? "secondary.main" : "text.disabled" }}
    >
      {ElemEstrela}
    </IconButton>
  );
}
