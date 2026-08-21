import ContainerApp from "@components/ContainerApp";
import ListItens from "@components/ListItens";
import MainAppBar from "@components/MainAppBar";
import outlineInfo from "@iconify/icons-ic/outline-info";
import roundStarBorder from "@iconify/icons-ic/round-star-border";
import { Icon } from "@iconify/react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import { RootState } from "@store/storeConfig";
import { IPost } from "@typesApp/IPost";
import FavoritosStorageUtils from "@utils/FavoritosStorageUtils";
import Link from "next/link";
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

  const temFavoritos = favStorage.length > 0;

  return (
    <ContainerApp title={"Favoritos"}>
      <MainAppBar title="Favoritos" hrefVoltar="/" naoTemMenuDir />
      <main>
        <Stack spacing={2.5} sx={{ px: 2, py: 2.5 }}>
          {temFavoritos ? (
            <>
              <ListItens itens={favStorage} isFormatoCompleto />
              <Alert icon={<Icon icon={outlineInfo} />} severity="info">
                Os itens favoritos ficam armazenados apenas nesse dispositivo
              </Alert>
            </>
          ) : (
            <Paper
              variant="outlined"
              sx={{ borderRadius: 3, p: 4, textAlign: "center" }}
            >
              <Box
                aria-hidden
                sx={{
                  width: 64,
                  height: 64,
                  mx: "auto",
                  mb: 2,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "rgba(217, 166, 78, 0.14)",
                  color: "secondary.dark",
                }}
              >
                <Icon icon={roundStarBorder} width={32} height={32} />
              </Box>
              <Typography variant="h6" gutterBottom>
                Nenhum favorito ainda
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Toque na estrela de qualquer publicação para guardá-la aqui.
                Seus favoritos ficam salvos apenas neste dispositivo.
              </Typography>
              <Button
                component={Link}
                href="/"
                variant="contained"
                sx={{ mt: 3 }}
              >
                Explorar publicações
              </Button>
            </Paper>
          )}
        </Stack>
      </main>
    </ContainerApp>
  );
}
