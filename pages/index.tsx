import ContainerApp from "@components/ContainerApp";
import ListHeader from "@components/ListHeader";
import ListItens from "@components/ListItens";
import MainAppBar from "@components/MainAppBar";
import ApiApp from "@data/ApiApp";
import { Alert, AlertTitle, Grid, Paper, Typography } from "@mui/material";
import { DisplayFlexCenter } from "@styles/DisplayFlex";
import { IPost } from "@typesApp/IPost";
import configApp from "configApp";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import packageJson from "../package.json";

export default function Index({ postsNovos }: { postsNovos: IPost[] }) {
  return (
    <ContainerApp>
      <MainAppBar />
      <main>
        <ImageContainerCss>
          <Paper>
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
          </Paper>
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
                  ...ApiApp.getDefaultPost(),
                  title: "DNA Positivo",
                  href: "/cat/2",
                },
                {
                  ...ApiApp.getDefaultPost(),
                  title: "DNA físico e Quântico",
                  href: "/cat/1",
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
                  ...ApiApp.getDefaultPost(),
                  title: "Inteligência Artificial Positiva",
                  href: "/cat/3",
                },
              ]}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <ListHeader primary="Publicações mais recentes" />
            
              <ListItens hasData itens={ApiApp.getMaisRecentes()} />
            
          </Grid> */}
          <Grid item xs={12}>
            <ListHeader primary="Destaques" />
            <ListItens
              hasStar={false}
              itens={configApp.postsDestaques.map((p) => ({
                ...ApiApp.getDefaultPost(),
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
                <AlertTitle>Ajustes recentes do App</AlertTitle>
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

const ImageContainerCss = styled(DisplayFlexCenter)`
  /* width: 180px; */
  margin-top: 5px;
`;

export async function getStaticProps() {
  const postsNovos = await ApiApp.getPostsNovos();
  return {
    props: { postsNovos },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    // revalidate: 10, // In seconds
    revalidate: 86400, // 1 dia
  };
}
