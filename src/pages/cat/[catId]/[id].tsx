import BtnCompartilhar from "@/components/BtnCompartilhar";
import ContainerApp from "@/components/ContainerApp";
import EstrelaFavorito from "@/components/EstrelaFavorito";
import ListHeader from "@/components/ListHeader";
import MainAppBar from "@/components/MainAppBar";
import TelaEmpty from "@/components/TelaEmpty";
import TelaLoading from "@/components/TelaLoading";
import styled from "@emotion/styled";
import baselineAdd from "@iconify/icons-ic/baseline-add";
import baselineLink from "@iconify/icons-ic/baseline-link";
import baselineRemove from "@iconify/icons-ic/baseline-remove";
import { Icon } from "@iconify/react";
import ApiPost from "@/lib/ApiPost";
import {
  Button,
  ButtonGroup,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DisplayFlexCenter } from "@/styles/DisplayFlex";
import DateUtils from "@/utils/DateUtils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import configApp from "@/config/configApp";
import { NextLinkComposed } from "@/components/NextLinkComposed";

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
  const [isNativeShare, setNativeShare] = useState(false);

  useEffect(() => {
    function nav() {
      if (!!navigator.share) {
        setNativeShare(true);
      }
    }
    nav();
  }, []);

  if (router.isFallback) return <TelaLoading />;
  if (!post.id) return <TelaEmpty />;

  return (
    <ContainerApp title={post.title} description={post.catName}>
      <MainAppBar title="Post" hrefVoltar={`/cat/${catId}`} />
      <main>
        <Grid container spacing={2}>
          <Grid size={12}>
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
              <Grid container p={2}>
                <Grid size={12}>
                  <Grid
                    container
                    py={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid size={6}>
                      <EstrelaFavorito item={post} typeBtn />
                    </Grid>
                    <Grid size={6}>
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
                            <Icon icon={baselineRemove} />{" "}
                          </Button>
                          <Button
                            disabled={FONTE_CONFIG.max === tamanhoFonte}
                            onClick={() =>
                              tamanhoFonte < FONTE_CONFIG.max
                                ? setTamanhoFonte(++tamanhoFonte)
                                : setTamanhoFonte(FONTE_CONFIG.max)
                            }
                          >
                            <Icon icon={baselineAdd} />{" "}
                          </Button>
                        </ButtonGroup>
                      </DisplayFlexCenter>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid size={12}>
                  <Chip label={post.catName} size="small" />
                  <Typography
                    variant="h4"
                    component="div"
                    style={{ fontSize: `2.${tamanhoFonte}25rem` }}
                  >
                    {post.title}{" "}
                    {post.isNovo ? (
                      <Chip label={"Novo!"} color="secondary" size="small" />
                    ) : null}
                  </Typography>
                  <ContainerPostCss>
                    <Box my={1}>
                      <Divider />
                    </Box>
                    <Typography
                      variant="body1"
                      component="div"
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
          <Grid
            container
            py={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid size={12}>
              <Typography variant="body2" gutterBottom align="center">
                Publicado:{" "}
                {DateUtils.formatarDataDatetimeUX({ data: post.published })}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Box m={1}>
                <Button
                  component={NextLinkComposed}
                  to={post.hrefOriginal || ""}
                  variant="outlined"
                  target="_blank"
                  endIcon={<Icon icon={baselineLink} />}
                >
                  Ver publicação original
                </Button>
              </Box>
              <Box m={1}>
                {isNativeShare ? (
                  <Box mb={2}>
                    <BtnCompartilhar
                      onClick={() =>
                        navigator.share({
                          title: post.title,
                          url: post.href,
                        })
                      }
                    >
                      Compartilhar
                    </BtnCompartilhar>
                  </Box>
                ) : null}
              </Box>
            </Grid>
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
  const posts = await ApiPost.getPostsByIds([params.id]);
  const postsAntesDeQualquerDialogo = await ApiPost.getPostsByIds(
    configApp.idsPostsAntesDeQualquerDialogo
  );

  return {
    props: {
      post: posts?.[0] || {},
      postsAntesDeQualquerDialogo: postsAntesDeQualquerDialogo,
    },
    revalidate: configApp.nextJs.revalidate,
  };
}
