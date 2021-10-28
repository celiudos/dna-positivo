import ContainerApp from "@components/ContainerApp";
import MainAppBar from "@components/MainAppBar";
import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DisplayFlexCenter } from "@styles/DisplayFlex";
import Image from "next/image";

export default function TelaLoading() {
  return (
    <ContainerApp>
      <MainAppBar title={"..."} hrefVoltar="/" />
      <main>
        <DisplayFlexCenter>
          <Box sx={{ width: "150px" }}>
            <Image src="/img/logo.png" alt="Logo" width={150} height={97} />
            <Typography align="center">Carregando</Typography>
            <LinearProgress />
          </Box>
        </DisplayFlexCenter>
      </main>
    </ContainerApp>
  );
}
