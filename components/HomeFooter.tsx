import BtnCompartilhar from "@components/BtnCompartilhar";
import outlineMail from "@iconify/icons-ic/outline-mail";
import { Icon } from "@iconify/react";
import { Box, Paper, Snackbar, Typography } from "@mui/material";
import configApp from "configApp";
import * as React from "react";

import packageJson from "../package.json";

/**
 * Rodape da Home: contato, compartilhamento e versao do app.
 * Quando o dispositivo nao tem o compartilhamento nativo, o link e copiado
 * para a area de transferencia.
 */
export default function HomeFooter() {
  const [avisoCopiado, setAvisoCopiado] = React.useState(false);

  async function compartilhar() {
    const dados = { title: configApp.titulo, url: configApp.url };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(dados);
      } catch {
        // usuario cancelou o compartilhamento
      }
      return;
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(configApp.url);
      setAvisoCopiado(true);
    }
  }

  return (
    <Box component="footer">
      <Paper variant="outlined" sx={{ borderRadius: 3, p: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            aria-hidden
            sx={{
              width: 40,
              height: 40,
              flexShrink: 0,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(93, 107, 196, 0.10)",
              color: "primary.main",
            }}
          >
            <Icon icon={outlineMail} width={21} height={21} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1">Fale com a gente</Typography>
            <Typography
              variant="body2"
              component="a"
              href={`mailto:${configApp.email}`}
              sx={{
                color: "primary.main",
                textDecoration: "none",
                wordBreak: "break-all",
              }}
            >
              {configApp.email}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <BtnCompartilhar fullWidth onClick={compartilhar}>
            Compartilhar o aplicativo
          </BtnCompartilhar>
        </Box>
      </Paper>

      <Typography
        variant="caption"
        component="p"
        align="center"
        color="text.secondary"
        sx={{ mt: 2.5 }}
      >
        {configApp.titulo} · v{packageJson.version || 0}
      </Typography>

      <Snackbar
        open={avisoCopiado}
        autoHideDuration={2500}
        onClose={() => setAvisoCopiado(false)}
        message="Link copiado!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
