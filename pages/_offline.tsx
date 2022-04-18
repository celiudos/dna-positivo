import ContainerApp from "@components/ContainerApp";
import MainAppBar from "@components/MainAppBar";
import baselineSignalWifiOff from "@iconify/icons-ic/baseline-signal-wifi-off";
import { Icon } from "@iconify/react";
import { Alert, AlertTitle, Box } from "@mui/material";

export default function Offline() {
  return (
    <ContainerApp title={"Offline"}>
      <MainAppBar />
      <main>
        <Box p={2}>
          <Alert
            severity="warning"
            icon={<Icon icon={baselineSignalWifiOff} />}
          >
            <AlertTitle>Você está offline</AlertTitle>
            Verifique suas configurações de rede.
            <p>
              Para habilitar essa página offline, você precisa carregá-la ao
              menos uma vez.
            </p>
          </Alert>
        </Box>
      </main>
    </ContainerApp>
  );
}
