import ContainerApp from "@components/ContainerApp";
import MainAppBar from "@components/MainAppBar";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Alert, AlertTitle } from "@mui/material";
import { Box } from "@mui/system";
export default function Offline() {
  return (
    <ContainerApp>
      <MainAppBar />
      <main>
        <Box p={2}>
          <Alert
            severity="warning"
            icon={<SentimentVeryDissatisfiedIcon fontSize="inherit" />}
          >
            <AlertTitle>Página não encontrada</AlertTitle>
            Erro 404
          </Alert>
        </Box>
      </main>
    </ContainerApp>
  );
}
