import ContainerApp from "@components/ContainerApp";
import ListHeader from "@components/ListHeader";
import ListItens from "@components/ListItens";
import MainAppBar from "@components/MainAppBar";
import styled from "@emotion/styled";
import ApiPost from "@lib/ApiPost";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { DisplayFlexCenter } from "@styles/DisplayFlex";
import { IPost } from "@typesApp/IPost";
import BaixarPostsDoBlogger from "@utils/BaixarPostsDoBlogger";
import configApp from "configApp";
import Image from "next/image";
import Link from "next/link";

import packageJson from "../package.json";
import { Icon } from "@iconify/react";
import BtnCompartilhar from "@components/BtnCompartilhar";

export default function Index({
  postsNovos,
  postsAlterados,
}: {
  postsNovos: IPost[];
  postsAlterados: IPost[];
}) {
  return (
    <ContainerApp>
      <MainAppBar />
      <main>
        <ImageContainerCss>
          <ImageContainerGifCss>
            <Image
              src="/img/DNA-Genetics.gif"
              alt="Genética DNA"
              layout="fill"
              objectFit="cover"
            />
          </ImageContainerGifCss>
          <PaperImgCss elevation={5}>
            <Link href={"/img/logo.jpg"}>
              <a>
                <Image
                  src="/img/logo-180x180.jpg"
                  alt="Marca"
                  width={180}
                  height={180}
                />
              </a>
            </Link>
          </PaperImgCss>
        </ImageContainerCss>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <ListHeader
              primary="Início"
              secondary="Todas as explicações detalhadas sobre cada técnica"
              modal={{
                title: "Introdução",
                contentSanitized:
                  "A nossa proposta é usar a Internet e toda sua tecnologia. Hoje, essa mesma Internet vem sendo utilizada como principal meio de disseminação de diversas informações e manipulações que têm agravado as situações de desequilíbrio planetárias. Porém, também através da Internet podemos produzir uma energia que se espalhará pelo planeta. \n Aqui você encontrará técnicas que vão te ajudar no tratamento dos seus problemas e suas doenças, lembrando sempre que quem cura é a MEDICINA, portanto, não deixe de ir ao médico!",
              }}
            />

            <ListItens
              hasStar={false}
              itens={[
                {
                  ...BaixarPostsDoBlogger.getDefaultPost(),
                  title: "DNA Positivo",
                  href: "/cat/2",
                },
                {
                  ...BaixarPostsDoBlogger.getDefaultPost(),
                  title: "DNA físico e Quântico",
                  href: "/cat/1",
                },
                {
                  ...BaixarPostsDoBlogger.getDefaultPost(),
                  title: "DNA Holográfico e Quântico",
                  href: "/cat/4",
                },
                {
                  ...BaixarPostsDoBlogger.getDefaultPost(),
                  title: "DNA do Metaverso",
                  href: "/cat/5",
                },
                {
                  ...BaixarPostsDoBlogger.getDefaultPost(),
                  title: "Inteligência Artificial Positiva",
                  href: "/cat/3",
                },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <ListHeader primary="Destaques" />
            <ListItens
              hasStar={false}
              itens={configApp.postsDestaques.map((p) => ({
                ...BaixarPostsDoBlogger.getDefaultPost(),
                ...p,
              }))}
            />
          </Grid>
          {postsNovos.length ? (
            <Grid item xs={12}>
              <ListHeader primary="Novas publicações" />
              <ListItens hasData itens={postsNovos} />
            </Grid>
          ) : null}
          {postsAlterados.length ? (
            <Grid item xs={12}>
              <ListHeader primary="Publicações atualizadas" />
              <ListItens hasData itens={postsAlterados} />
            </Grid>
          ) : null}
          {configApp.muralDeAvisos.length ? (
            <Grid item xs={12}>
              <Alert severity="info">
                <AlertTitle>Avisos</AlertTitle>
                {configApp.muralDeAvisos
                  ? configApp.muralDeAvisos.map((item, key) => (
                      <div key={key}>{item}</div>
                    ))
                  : null}
              </Alert>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <ListHeader
              primary="Em caso de dúvidas, envie um e-mail"
              secondary={configApp.email}
            />{" "}
            <Box ml={2}>
              <BtnCompartilhar
                onClick={() =>
                  navigator.share({
                    title: configApp.titulo,
                    url: configApp.url,
                  })
                }
              >
                Compartilhe este Aplicativo
              </BtnCompartilhar>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <DisplayFlexCenter>
              <Typography variant="caption" align="center" gutterBottom>
                Versão {`v${packageJson.version || 0}`}
              </Typography>
            </DisplayFlexCenter>
          </Grid>
        </Grid>
      </main>
    </ContainerApp>
  );
}

const ImageContainerGifCss = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: block;
`;

const PaperImgCss = styled(Paper)`
  padding-top: 5px;
`;

const ImageContainerCss = styled(DisplayFlexCenter)`
  /* width: 180px; */
  position: relative;
`;

export async function getStaticProps() {
  const postsNovos = await ApiPost.getPostsRecentes({});
  const postsAlterados = await ApiPost.getPostsRecentes({
    orderBy: "updated",
  });
  return {
    props: { postsNovos, postsAlterados },
    revalidate: configApp.nextJs.revalidate,
  };
}
