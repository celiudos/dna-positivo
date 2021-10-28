import ContainerApp from "@components/ContainerApp";
import ListItens from "@components/ListItens";
import MainAppBar from "@components/MainAppBar";
import { Grid } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Box } from "@mui/system";
import { RootState } from "@store/storeConfig";
import { IPost } from "@typesApp/IPost";
import FavoritosStorageUtils from "@utils/FavoritosStorageUtils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Favoritos() {
  const [favStorage, setFavStorage] = useState<IPost[]>([]);

  const favoritoAlteradoRedux = useSelector(
    (state: RootState) => state.rootReducer.favoritoAlterado
  );

  useEffect(() => {
    const fav = FavoritosStorageUtils.get();
    const favStorageArr = Object.values(fav.favoritos) as IPost[];
    setFavStorage(favStorageArr);
  }, [favoritoAlteradoRedux.id]);

  return (
    <ContainerApp>
      <MainAppBar title="Favoritos" hrefVoltar="/" naoTemMenuDir />
      <main>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ListItens itens={favStorage} />

            <Box m={2}>
              <Alert severity="info">
                Os itens favoritos ficam armazenados apenas nesse dispositivo
              </Alert>
            </Box>
            {/* <Alert severity="info">
              Os itens favoritos ficam armazenados offline
            </Alert> */}
          </Grid>
        </Grid>
      </main>
    </ContainerApp>
  );
}
