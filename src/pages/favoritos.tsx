
import ContainerApp from "@/components/ContainerApp";
import ListItens from "@/components/ListItens";
import MainAppBar from "@/components/MainAppBar";
import useAppStore from "@/store/useAppStore";
import FavoritosStorageUtils from "@/utils/FavoritosStorageUtils";
import { Grid } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Box } from "@mui/system";
// import { RootState } from "@store/storeConfig";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

export default function Favoritos() {
  const [favStorage, setFavStorage] = useState<IPost[]>([]);


  const { favoritoAlterado, setFavoritoAlterado, setFavorito } = useAppStore((state) => state as IAppStore);


  useEffect(() => {
    const fav = FavoritosStorageUtils.get();
    const favStorageArr = Object.values(fav.favoritos) as IPost[];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavStorage(favStorageArr);
  }, [favoritoAlterado?.id]);

  return (
    <ContainerApp title={"Favoritos"}>
      <MainAppBar title="Favoritos" hrefVoltar="/" naoTemMenuDir />
      <main>
        <Grid container spacing={2}>
          <Grid size={12}>
            <ListItens itens={favStorage} isFormatoCompleto />

            <Box m={2}>
              <Alert severity="info">
                Os itens favoritos ficam armazenados apenas nesse dispositivo
              </Alert>
            </Box>
          </Grid>
        </Grid>
      </main>
    </ContainerApp>
  );
}
