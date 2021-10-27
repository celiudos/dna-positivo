import ListItens from "@components/ListItens";
import MainAppBar from "@components/MainAppBar";
import { Grid, Paper } from "@mui/material";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
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
    <Container maxWidth="sm">
      <MainAppBar title="Favoritos" hrefVoltar="/" naoTemMenuDir />
      <main>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper>
              <ListItens itens={favStorage} />
            </Paper>

            <Alert severity="info">
              Os itens favoritos ficam armazenados apenas nesse dispositivo
            </Alert>
            {/* <Alert severity="info">
              Os itens favoritos ficam armazenados offline
            </Alert> */}
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}
