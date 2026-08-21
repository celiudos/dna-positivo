import ContainerApp from "@components/ContainerApp";
import MainAppBar from "@components/MainAppBar";
import { Box, LinearProgress, Typography } from "@mui/material";
import Image from "next/image";

export default function TelaLoading({ msg = "Carregando..." }) {
  return (
    <ContainerApp>
      <MainAppBar title={"..."} hrefVoltar="/" />
      <main>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            px: 3,
            py: 8,
          }}
        >
          <Box
            sx={{
              width: 92,
              height: 92,
              borderRadius: "28px",
              overflow: "hidden",
              bgcolor: "background.paper",
              boxShadow: "0px 10px 28px rgba(37, 41, 57, 0.14)",
            }}
          >
            <Image
              src="/img/logo-180x180.jpg"
              alt="Logo DNA Positivo"
              width={180}
              height={180}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          <Typography variant="subtitle1" color="text.secondary">
            {msg}
          </Typography>
          <LinearProgress sx={{ width: 160, borderRadius: 999 }} />
        </Box>
      </main>
    </ContainerApp>
  );
}
