import EstrelaFavorito from "@components/EstrelaFavorito";
import ListHeader from "@components/ListHeader";
import MainAppBar from "@components/MainAppBar";
import ApiApp from "@data/ApiApp";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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
import { IPost } from "@typesApp/IPost";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  post: IPost;
  converseComDNAPost: IPost;
};

export default function Post({ post, converseComDNAPost }: Props) {
  const router = useRouter();
  const { catId } = router.query;

  let [tamanhoFonte, setTamanhoFonte] = useState(0);

  if (router.isFallback) return "Carregando...";

  return (
    <Container maxWidth="sm" disableGutters>
      <MainAppBar title="Post" hrefVoltar={`/cat/${catId}`} />
      <main>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ListHeader
              primary="Atenção"
              secondary={converseComDNAPost.title}
              modal={{
                title: converseComDNAPost.title,
                contentSanitized: converseComDNAPost.contentSanitized,
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
                    <DisplayFlexCenter style={{ justifyContent: "start" }}>
                      <Box mr={1}>FAVORITO</Box>
                      <EstrelaFavorito item={post} />
                    </DisplayFlexCenter>
                  </Grid>
                  <Grid item xs={6}>
                    <DisplayFlexCenter style={{ justifyContent: "end" }}>
                      <Box mr={1}>FONTE</Box>
                      <ButtonGroup
                        color="inherit"
                        variant="outlined"
                        aria-label="alterar tamanho da fonte"
                      >
                        <Button
                          onClick={() =>
                            tamanhoFonte < 5
                              ? setTamanhoFonte(++tamanhoFonte)
                              : setTamanhoFonte(5)
                          }
                        >
                          <AddIcon />
                        </Button>
                        <Button
                          onClick={() =>
                            tamanhoFonte > 0
                              ? setTamanhoFonte(--tamanhoFonte)
                              : setTamanhoFonte(0)
                          }
                        >
                          <RemoveIcon />
                        </Button>
                      </ButtonGroup>
                    </DisplayFlexCenter>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    component="div"
                    style={{ fontSize: `2.${tamanhoFonte}25rem` }}
                  >
                    {post.title}
                  </Typography>
                  <Link href={post.hrefOriginal || ""} passHref>
                    <Button variant="outlined" href="" target="_blank">
                      Publicação original
                    </Button>
                  </Link>

                  <ContainerPostCss>
                    <Box my={2}>
                      <Divider />
                    </Box>
                    <Typography
                      variant="body1"
                      style={{ fontSize: `1.${tamanhoFonte}rem` }}
                      gutterBottom
                      dangerouslySetInnerHTML={{
                        __html: post.contentSanitized,
                      }}
                    />
                    {/* <Divider />
                    <Typography
                      variant="body1"
                      style={{ fontSize: `1.${tamanhoFonte}rem` }}
                      gutterBottom
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    /> */}
                  </ContainerPostCss>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}

export const ContainerPostCss = styled.div`
  overflow-y: auto;
`;

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
