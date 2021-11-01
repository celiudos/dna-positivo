import ContainerApp from "@components/ContainerApp";
import MainAppBar from "@components/MainAppBar";
import SignalWifiConnectedNoInternet4Icon from "@mui/icons-material/SignalWifiConnectedNoInternet4";
import { Alert, AlertTitle, Box } from "@mui/material";
export default function Offline() {
  return (
    <ContainerApp title={"Offline"}>
      <MainAppBar />
      <main>
        <Box p={2}>
          <Alert
            severity="warning"
            icon={<SignalWifiConnectedNoInternet4Icon fontSize="inherit" />}
          >
            <AlertTitle>Você está offline</AlertTitle>
            Verifique suas configurações de rede
          </Alert>
        </Box>
      </main>
    </ContainerApp>
  );
}
