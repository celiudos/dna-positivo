import ListHeader from "@components/ListHeader";
import MainAppBar from "@components/MainAppBar";
import ApiApp from "@data/ApiApp";
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

type PostProps = { title: string; content: string };

type Props = {
  post: PostProps;
  converseComDNAPost: PostProps;
};

export default function Post({ post, converseComDNAPost }: Props) {
  const router = useRouter();
  const { catId } = router.query;

  if (router.isFallback) return "Carregando...";
  return (
    <Container maxWidth="sm">
      <MainAppBar title="Post" hrefVoltar={`/cat/${catId}`} />
      <main>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ListHeader
              primary="Atenção"
              secondary={converseComDNAPost.title}
              modal={{
                title: converseComDNAPost.title,
                conteudo: converseComDNAPost.content,
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
    id: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const posts = ApiApp.getTodos();

  const converseComDNAPost = posts.filter((item) => item.id === 50)[0];
  const post = posts.filter((item) => item.id.toString() === params.id);
  return {
    props: { post: post[0], converseComDNAPost },
  };
}
