import ListItens, { ItemProps } from "@components/ListItens";
import MainAppBar from "@components/MainAppBar";
import { Grid, Paper } from "@mui/material";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import DnafisicoequanticoJson from "./api/dnafisicoequantico.json";
import BloggerJsonType from "./api/DnafisicoequanticoType";

const DnafisicoequanticoDados = DnafisicoequanticoJson as BloggerJsonType;

const posts = DnafisicoequanticoDados.feed.entry;
const itens = posts.map(
  (item, key): ItemProps => ({
    title: item.title.$t,
    href: `/post/${key}`,
    hasStar: true,
  })
);

export default function Favoritos() {
  return (
    <Container maxWidth="sm">
      <MainAppBar title="Favoritos" hrefVoltar="/" naoTemMenuDir />
      <main>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper>
              <ListItens itens={itens} />
            </Paper>

            <Alert severity="info">
              Os itens favoritos ficam armazenados offline
            </Alert>
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}
