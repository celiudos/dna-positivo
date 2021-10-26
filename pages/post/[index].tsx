import ListHeader from "@components/ListHeader";
import MainAppBar from "@components/MainAppBar";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarBorderOutlined";
import {
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { DisplayFlexCenter } from "@styles/DisplayFlex";
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
      <MainAppBar title="Post" hrefVoltar="/posts" />
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
              <Grid container p={1}>
                <Grid
                  item
                  container
                  py={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Button
                      color="inherit"
                      variant="outlined"
                      endIcon={
                        false ? (
                          <StarOutlineIcon />
                        ) : (
                          <StarIcon color="secondary" />
                        )
                      }
                    >
                      Favorito
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <DisplayFlexCenter>
                      <Box mr={1}>FONTE</Box>
                      <ButtonGroup
                        color="inherit"
                        variant="outlined"
                        aria-label="alterar tamanho da fonte"
                      >
                        <Button>
                          <AddIcon />
                        </Button>
                        <Button>
                          <RemoveIcon />
                        </Button>
                      </ButtonGroup>
                    </DisplayFlexCenter>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" gutterBottom component="div">
                    {post.title}
                  </Typography>
                  <Divider />
                  <Typography
                    variant="body1"
                    gutterBottom
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}

export async function getStaticPaths() {
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
