import ContainerApp from "@components/ContainerApp";
import MainAppBar from "@components/MainAppBar";
import roundSentimentDissatisfied from "@iconify/icons-ic/round-sentiment-dissatisfied";
import { Icon } from "@iconify/react";
import { Alert, AlertTitle } from "@mui/material";
import { Box } from "@mui/system";

export default function TelaEmpty() {
  return (
    <ContainerApp title={"Vazio"}>
      <MainAppBar />
      <main>
        <Box p={2}>
          <Alert
            severity="info"
            icon={<Icon icon={roundSentimentDissatisfied} />}
          >
            <AlertTitle>Nenhuma publicação encontrada</AlertTitle>
            Verifique o endereço e tente novamente.
          </Alert>
        </Box>
      </main>
    </ContainerApp>
  );
}
