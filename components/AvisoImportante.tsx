import outlineReportProblem from "@iconify/icons-ic/outline-report-problem";
import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import lodash from "lodash";
import * as React from "react";

type Props = {
  titulo: string;
  contentSanitized: string;
};

/**
 * Destaque de leitura obrigatoria exibido antes do conteudo de um post.
 * O texto completo abre em modal para nao empurrar o post para baixo.
 */
export default function AvisoImportante({ titulo, contentSanitized }: Props) {
  const [open, setOpen] = React.useState(false);
  const idBotao = `AvisoImportante-${lodash.snakeCase(titulo)}`;

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 3,
          p: 2,
          bgcolor: "rgba(217, 166, 78, 0.10)",
          borderColor: "rgba(217, 166, 78, 0.35)",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          aria-hidden
          sx={{
            width: 36,
            height: 36,
            flexShrink: 0,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#FFFFFF",
            color: "secondary.dark",
          }}
        >
          <Icon icon={outlineReportProblem} width={20} height={20} />
        </Box>
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography variant="overline" component="p" color="secondary.dark">
            Atenção
          </Typography>
          <Typography variant="subtitle2" sx={{ lineHeight: 1.4 }}>
            {titulo}
          </Typography>
        </Box>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          id={idBotao}
          onClick={() => setOpen(true)}
          sx={{ flexShrink: 0 }}
        >
          Ler
        </Button>
      </Paper>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="aviso-dialog-title"
      >
        <DialogTitle id="aviso-dialog-title">{titulo}</DialogTitle>
        <DialogContent>
          <DialogContentText
            className="conteudo-post"
            sx={{ fontSize: "1rem", lineHeight: 1.65 }}
            dangerouslySetInnerHTML={{ __html: contentSanitized }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="contained" autoFocus onClick={() => setOpen(false)}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
