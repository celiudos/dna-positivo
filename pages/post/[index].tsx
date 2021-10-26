import ListHeader from "@components/ListHeader";
import MainAppBar from "@components/MainAppBar";
import { Grid, Paper, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useRouter } from "next/dist/client/router";
import DnafisicoequanticoJson from "../api/dnafisicoequantico.json";
import DnafisicoequanticoType from "../api/DnafisicoequanticoType";

type PostProps = { title: string; content: string };

type Props = {
  post: PostProps;
};

export default function Post({ post }: Props) {
  const router = useRouter();

  if (router.isFallback) return "Carregando...";
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
              <Typography variant="h4" gutterBottom component="div">
                {post.title}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </Paper>
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}

export async function getStaticPaths() {
  // const pathsComGeneros = GenerosIconsJson.map((gen) => ({
  //   params: { idGenero: gen.value.toString() },
  // }));

  return {
    paths: [],
    fallback: true,
  };
}

type Params = {
  params: {
    index: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const DnafisicoequanticoDados =
    DnafisicoequanticoJson as DnafisicoequanticoType;
  console.log("params:", params);

  const posts = DnafisicoequanticoDados.feed.entry;
  const post = posts.filter((item, key) => key.toString() === params.index);
  console.log("post:", post);

  const postFormatado = post.map(
    (item): PostProps => ({
      title: item.title.$t,
      content: item.content.$t,
    })
  );

  console.log("postFormatado:", postFormatado);

  return {
    props: { post: postFormatado[0] },
  };
}
