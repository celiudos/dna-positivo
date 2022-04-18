import ContainerApp from "@components/ContainerApp";
import MainAppBar from "@components/MainAppBar";
import roundSentimentDissatisfied from "@iconify/icons-ic/round-sentiment-dissatisfied";
import { Icon } from "@iconify/react";
import { Alert, AlertTitle } from "@mui/material";
import { Box } from "@mui/system";

export default function Offline() {
  return (
    <ContainerApp title={"404"}>
      <MainAppBar />
      <main>
        <Box p={2}>
          <Alert
            severity="warning"
            icon={<Icon icon={roundSentimentDissatisfied} />}
          >
            <AlertTitle>Página não encontrada</AlertTitle>
            Erro 404
          </Alert>
        </Box>
      </main>
    </ContainerApp>
  );
}
