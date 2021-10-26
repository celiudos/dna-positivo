import ListSection from "@components/ListSection";
import MainAppBar from "@components/MainAppBar";
import BloggerJsonType from "@data/BloggerJsonType";
import DnaPositivoJson from "@data/dnapositivo.json";
import { Grid, Paper } from "@mui/material";
import Container from "@mui/material/Container";

const DnaPositivoDados = DnaPositivoJson as BloggerJsonType;

const posts = DnaPositivoDados.feed.entry;
const itens = posts.map((item, key) => ({
  title: item.title.$t,
  href: `/post/${key}`,
  hasStar: true,
  isSubheader: false,
}));

export default function Tecnicas() {
  return (
    <Container maxWidth="sm">
      <MainAppBar title="Posts" hrefVoltar="/" />
      <main>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper>
              <ListSection itens={itens} />
            </Paper>
          </Grid>
          -
        </Grid>
      </main>
    </Container>
  );
}
