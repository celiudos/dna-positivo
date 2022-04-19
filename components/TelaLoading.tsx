import ContainerApp from "@components/ContainerApp";

import MainAppBar from "@components/MainAppBar";
import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DisplayFlexCenter } from "@styles/DisplayFlex";
import Image from "next/image";

export default function TelaLoading({ msg = "Carregando..." }) {
  return (
    <ContainerApp>
      <MainAppBar title={"..."} hrefVoltar="/" />
      <main>
        <DisplayFlexCenter>
          <Box sx={{ width: "150px" }} p={2}>
            <Image src="/img/logo.jpg" alt="Logo" width={360} height={360} />
            <Typography align="center">{msg}</Typography>
            <LinearProgress />
          </Box>
        </DisplayFlexCenter>
      </main>
    </ContainerApp>
  );
}
