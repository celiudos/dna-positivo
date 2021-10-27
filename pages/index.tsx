import ListHeader from "@components/ListHeader";
import ListItens from "@components/ListItens";
import MainAppBar from "@components/MainAppBar";
import ApiApp from "@data/ApiApp";
import { Grid, Paper } from "@mui/material";
import Container from "@mui/material/Container";
import { DisplayFlexCenter } from "@styles/DisplayFlex";
import Image from "next/image";

export default function Index() {
  return (
    <Container maxWidth="sm" disableGutters>
      <MainAppBar />
      <main>
        <DisplayFlexCenter>
          <Image src="/img/logo.png" alt="Logo" width={150} height={97} />
        </DisplayFlexCenter>

        <Grid container spacing={2}>
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
            <Paper>
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
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <ListHeader secondary="Para tratar problemas, neutralizar ameaças e as mais diversas manipulações no nosso planeta" />
            <Paper>
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
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <ListHeader
              primary="Em caso de dúvidas, envie um e-mail"
              secondary="quintoelementoamor@hotmail.com"
            />
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}
