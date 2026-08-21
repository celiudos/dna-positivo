import AvisoImportante from "@components/AvisoImportante";
import BtnCompartilhar from "@components/BtnCompartilhar";
import ContainerApp from "@components/ContainerApp";
import EstrelaFavorito from "@components/EstrelaFavorito";
import MainAppBar from "@components/MainAppBar";
import TelaEmpty from "@components/TelaEmpty";
import TelaLoading from "@components/TelaLoading";
import baselineLink from "@iconify/icons-ic/baseline-link";
import roundAdd from "@iconify/icons-ic/round-add";
import roundRemove from "@iconify/icons-ic/round-remove";
import { Icon } from "@iconify/react";
import ApiPost from "@lib/ApiPost";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { IPost } from "@typesApp/IPost";
import DateUtils from "@utils/DateUtils";
import configApp from "configApp";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  const [tamanhoFonte, setTamanhoFonte] = useState(FONTE_CONFIG.min);
  const [isNativeShare, setNativeShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && !!navigator.share) {
      setNativeShare(true);
    }
  }, []);

  if (router.isFallback) return <TelaLoading />;
  if (!post.id) return <TelaEmpty />;

  const tamanhoTitulo = 1.375 + tamanhoFonte * 0.14;
  const tamanhoTexto = 1 + tamanhoFonte * 0.09;

  return (
    <ContainerApp title={post.title} description={post.catName}>
      <MainAppBar title={post.catName || "Post"} hrefVoltar={`/cat/${catId}`} />
      <main>
        {/* Barra de leitura: favoritar e ajustar o tamanho da fonte */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            px: 2,
            py: 1,
            bgcolor: "rgba(245, 246, 251, 0.88)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <EstrelaFavorito item={post} typeBtn />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="overline" color="text.secondary">
              Fonte
            </Typography>
            <ButtonGroup
              size="small"
              color="inherit"
              variant="outlined"
              aria-label="alterar tamanho da fonte"
            >
              <Button
                aria-label="diminuir fonte"
                disabled={tamanhoFonte === FONTE_CONFIG.min}
                onClick={() =>
                  setTamanhoFonte((atual) =>
                    Math.max(FONTE_CONFIG.min, atual - 1)
                  )
                }
              >
                <Icon icon={roundRemove} width={18} height={18} />
              </Button>
              <Button
                aria-label="aumentar fonte"
                disabled={tamanhoFonte === FONTE_CONFIG.max}
                onClick={() =>
                  setTamanhoFonte((atual) =>
                    Math.min(FONTE_CONFIG.max, atual + 1)
                  )
                }
              >
                <Icon icon={roundAdd} width={18} height={18} />
              </Button>
            </ButtonGroup>
          </Box>
        </Box>

        <Stack spacing={2.5} sx={{ px: 2, pt: 2.5, pb: 5 }}>
          {postsAntesDeQualquerDialogo
            ? postsAntesDeQualquerDialogo.map((item, key) => (
                <AvisoImportante
                  key={key}
                  titulo={item.title}
                  contentSanitized={item.contentSanitized}
                />
              ))
            : null}

          <Paper
            component="article"
            variant="outlined"
            sx={{ borderRadius: 3, p: 2.5 }}
          >
            <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
              <Chip
                label={post.catName}
                size="small"
                sx={{
                  bgcolor: "rgba(93, 107, 196, 0.10)",
                  color: "primary.dark",
                }}
              />
              {post.isNovo ? (
                <Chip label="Novo!" color="secondary" size="small" />
              ) : null}
            </Stack>

            <Typography
              variant="h4"
              component="h1"
              sx={{ fontSize: `${tamanhoTitulo}rem` }}
            >
              {post.title}
            </Typography>

            <Typography
              variant="caption"
              component="p"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Publicado em{" "}
              {DateUtils.formatarDataDatetimeUX({ data: post.published })}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box
              className="conteudo-post"
              sx={{ fontSize: `${tamanhoTexto}rem`, lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: post.contentSanitized }}
            />
          </Paper>

          <Stack spacing={1.5}>
            {isNativeShare ? (
              <BtnCompartilhar
                fullWidth
                variant="contained"
                onClick={() =>
                  navigator.share({
                    title: post.title,
                    url: post.href,
                  })
                }
              >
                Compartilhar
              </BtnCompartilhar>
            ) : null}
            <Button
              component={Link}
              href={post.hrefOriginal || ""}
              variant="outlined"
              fullWidth
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<Icon icon={baselineLink} width={18} height={18} />}
            >
              Ver publicação original
            </Button>
          </Stack>
        </Stack>
      </main>
    </ContainerApp>
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
