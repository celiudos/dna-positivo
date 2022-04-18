import ContainerApp from "@components/ContainerApp";
import ListHeader from "@components/ListHeader";
import ListItens from "@components/ListItens";
import MainAppBar from "@components/MainAppBar";
import styled from "@emotion/styled";
import ApiSearch from "@lib/ApiSearch";
import { Alert, AlertTitle, Grid, Paper, Typography } from "@mui/material";
import { DisplayFlexCenter } from "@styles/DisplayFlex";
import { IPost } from "@typesApp/IPost";
import BaixarPostsDoBloger from "@utils/BaixarPostsDoBloger";
import configApp from "configApp";
import Image from "next/image";
import Link from "next/link";
import packageJson from "../package.json";

export default function Index({ postsNovos }: { postsNovos: IPost[] }) {
  console.log("postsNovos:", postsNovos);

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
                  ...BaixarPostsDoBloger.getDefaultPost(),
                  title: "DNA Positivo",
                  href: "/cat/2",
                },
                {
                  ...BaixarPostsDoBloger.getDefaultPost(),
                  title: "DNA físico e Quântico",
                  href: "/cat/1",
                },
                {
                  ...BaixarPostsDoBloger.getDefaultPost(),
                  title: "DNA Holográfico e Quântico",
                  href: "/cat/4",
                },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <ListHeader secondary="Para tratar problemas, neutralizar ameaças e as mais diversas manipulações no nosso planeta" />

            <ListItens
              hasStar={false}
              itens={[
                {
                  ...BaixarPostsDoBloger.getDefaultPost(),
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
                ...BaixarPostsDoBloger.getDefaultPost(),
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
              secondary="quintoelementoamor@hotmail.com"
            />
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

export function getStaticProps() {
  const postsNovos = ApiSearch.getPostsRecentes();
  return {
    props: { postsNovos },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    // revalidate: 10, // In seconds
    // revalidate: 86400, // 1 dia
    revalidate: 86400 * 3, // 3 dias
  };
}
