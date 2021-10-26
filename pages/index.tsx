import ListHeader from "@components/ListHeader";
import ListItens from "@components/ListItens";
import MainAppBar from "@components/MainAppBar";
import { Grid, Paper } from "@mui/material";
import Container from "@mui/material/Container";
import { DisplayFlexCenter } from "@styles/DisplayFlex";
import Image from "next/image";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <MainAppBar />
      <main>
        <DisplayFlexCenter>
          <Image src="/img/logo.png" alt="Logo" width={150} height={97} />
        </DisplayFlexCenter>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ListHeader primary="Início" secondary="Introdução" />
            <Paper>
              <ListItens itens={[{ title: "COVID" }, { title: "Técnicas" }]} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <ListHeader
              primary="Sites externos"
              secondary="Todas as explicações detalhadas sobre cada técnica"
            />
            <Paper>
              <ListItens
                itens={[
                  { title: "DNA Positivo" },
                  { title: "DNA físico e Quântico" },
                ]}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <ListHeader secondary="Para tratar problemas, neutralizar ameaças e as mais diversas manipulações no nosso planeta" />
            <Paper>
              <ListItens
                itens={[{ title: "Inteligência Artificial Positiva" }]}
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
