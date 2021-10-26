import ListHeader from "@components/ListHeader";
import ListItens, { ItemProps } from "@components/ListItens";
import MainAppBar from "@components/MainAppBar";
import { Grid, Paper } from "@mui/material";
import Container from "@mui/material/Container";
import DnafisicoequanticoJson from "./api/dnafisicoequantico.json";
import DnafisicoequanticoType from "./api/DnafisicoequanticoType";

const DnafisicoequanticoDados =
  DnafisicoequanticoJson as DnafisicoequanticoType;

const posts = DnafisicoequanticoDados.feed.entry;
const itens = posts.map(
  (item, key): ItemProps => ({
    title: item.title.$t,
    href: `/post/${key}`,
    hasStar: true,
  })
);

export default function Posts() {
  return (
    <Container maxWidth="sm">
      <MainAppBar />
      <main>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ListHeader
              primary="Atenção"
              secondary="Sobre Coronavírus (COVID-19)"
              modal={{
                title: "Sobre Coronavírus (COVID-19)",
                conteudo:
                  "Estamos passando por uma grande pandemia de CORONAVIRUS em todo planeta. Estamos disponibilizando o acesso imediato a 8 técnicas para nos ajudar, e também ao planeta, afim de superarmos juntos este momento! Não deixe de seguir as recomendações de prevenção ao contágio, como: Lavar as mãos com água e sabão ou use álcool em gel, use máscara, cubra o nariz e boca ao tossir ou espirrar, evite aglomerações, mantenha os ambientes bem ventilados, não compartilhe objetos pessoais e, se possível, flque em casa.",
              }}
            />
            <Paper>
              <ListItens itens={itens} />
            </Paper>
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}
