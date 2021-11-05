import ContainerApp from "@components/ContainerApp";
import EstrelaFavorito from "@components/EstrelaFavorito";
import ListHeader from "@components/ListHeader";
import MainAppBar from "@components/MainAppBar";
import TelaLoading from "@components/TelaLoading";
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
import { Box } from "@mui/system";
import { DisplayFlexCenter } from "@styles/DisplayFlex";
import { IPost } from "@typesApp/IPost";
import configApp from "configApp";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  post: IPost;
  postsAntesDeQualquerDialogo: IPost[];
};

const FONTE_CONFIG = {
  min: 0,
  max: 5,
};

export default function Post({ post, postsAntesDeQualquerDialogo }: Props) {
  const router = useRouter();
  const { catId } = router.query;
  let [tamanhoFonte, setTamanhoFonte] = useState(FONTE_CONFIG.min);

  if (router.isFallback) return <TelaLoading />;

  return (
    <ContainerApp title={post.title} description={post.catName}>
      <MainAppBar title="Post" hrefVoltar={`/cat/${catId}`} />
      <main>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {postsAntesDeQualquerDialogo
              ? postsAntesDeQualquerDialogo.map((item, key) => (
                  <ListHeader
                    key={key}
                    primary="Atenção"
                    secondary={item.title}
                    modal={{
                      title: item.title,
                      contentSanitized: item.contentSanitized,
                    }}
                  />
                ))
              : null}

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
                    <EstrelaFavorito item={post} typeBtn />
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
                          disabled={FONTE_CONFIG.min === tamanhoFonte}
                          onClick={() =>
                            tamanhoFonte > FONTE_CONFIG.min
                              ? setTamanhoFonte(--tamanhoFonte)
                              : setTamanhoFonte(FONTE_CONFIG.min)
                          }
                        >
                          <RemoveIcon />
                        </Button>
                        <Button
                          disabled={FONTE_CONFIG.max === tamanhoFonte}
                          onClick={() =>
                            tamanhoFonte < FONTE_CONFIG.max
                              ? setTamanhoFonte(++tamanhoFonte)
                              : setTamanhoFonte(FONTE_CONFIG.max)
                          }
                        >
                          <AddIcon />
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
                      style={{ fontSize: `1.${tamanhoFonte + 2}rem` }}
                      gutterBottom
                      dangerouslySetInnerHTML={{
                        __html: post.contentSanitized,
                      }}
                    />
                  </ContainerPostCss>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </ContainerApp>
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

  const postsAntesDeQualquerDialogo = posts.filter(
    (item) => configApp.idsPostsAntesDeQualquerDialogo.indexOf(item.id) !== -1
  );
  const post = posts.filter((item) => item.id.toString() === params.id);

  let postCarregado = post[0];

  if (!postCarregado) {
    const postsNovos = await ApiApp.getPostsNovos();
    postCarregado = postsNovos.filter((np: IPost) => np.id === params.id)[0];
  }

  return {
    props: { post: postCarregado, postsAntesDeQualquerDialogo },
  };
}
