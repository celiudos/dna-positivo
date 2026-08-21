import { Icon, IconifyIcon } from "@iconify/react";
import { Box, Button, Paper, Typography } from "@mui/material";
import Link from "next/link";
import * as React from "react";

type Props = {
  icone: IconifyIcon;
  titulo: string;
  descricao?: React.ReactNode;
  /** Cor de destaque do circulo do icone. Padrao: azul da marca. */
  cor?: "primary" | "secondary";
  acao?: { label: string; href: string };
};

const CORES = {
  primary: { fundo: "rgba(93, 107, 196, 0.12)", icone: "primary.main" },
  secondary: { fundo: "rgba(217, 166, 78, 0.16)", icone: "secondary.dark" },
};

/**
 * Cartao padrao para telas sem conteudo (404, offline, categoria vazia).
 */
export default function EstadoVazio({
  icone,
  titulo,
  descricao,
  cor = "primary",
  acao,
}: Props) {
  const paleta = CORES[cor];

  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Paper
        variant="outlined"
        sx={{ borderRadius: 3, p: 4, textAlign: "center" }}
      >
        <Box
          aria-hidden
          sx={{
            width: 64,
            height: 64,
            mx: "auto",
            mb: 2,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: paleta.fundo,
            color: paleta.icone,
          }}
        >
          <Icon icon={icone} width={32} height={32} />
        </Box>
        <Typography variant="h6" gutterBottom>
          {titulo}
        </Typography>
        {descricao ? (
          <Typography variant="body2" color="text.secondary">
            {descricao}
          </Typography>
        ) : null}
        {acao ? (
          <Button
            component={Link}
            href={acao.href}
            variant="contained"
            sx={{ mt: 3 }}
          >
            {acao.label}
          </Button>
        ) : null}
      </Paper>
    </Box>
  );
}
