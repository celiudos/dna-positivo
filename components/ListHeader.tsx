import outlineInfo from "@iconify/icons-ic/outline-info";
import { Icon } from "@iconify/react";
import { Box, IconButton, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { tokens } from "@theme/ThemeConfig";
import { IPost } from "@typesApp/IPost";
import lodash from "lodash";
import * as React from "react";

type Props = {
  primary?: string;
  secondary?: string;
  modal?: Pick<IPost, "title" | "contentSanitized">;
};

/**
 * Cabeçalho de seção: barra de destaque + título + subtítulo opcional,
 * com um botão de informação que abre um modal quando `modal` é passado.
 */
export default function ListHeader({ primary, secondary, modal }: Props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const idListItemButton = `ListItens-IconButton-${lodash.snakeCase(primary)}`;
  const idListItemButtonFecharModal = `ListItens-IconButtonFecharModal-${lodash.snakeCase(
    primary
  )}`;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          mb: 1.5,
          px: 0.25,
        }}
      >
        <Box
          aria-hidden
          sx={{
            width: 4,
            alignSelf: "stretch",
            minHeight: 24,
            borderRadius: 999,
            backgroundImage: tokens.gradienteMarca,
            flexShrink: 0,
          }}
        />
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="h5" component="h2">
            {primary}
          </Typography>
          {secondary ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.25 }}
            >
              {secondary}
            </Typography>
          ) : null}
        </Box>
        {modal?.title ? (
          <IconButton
            aria-label="mais informações"
            id={idListItemButton}
            onClick={handleClickOpen}
            size="small"
            sx={{
              flexShrink: 0,
              color: "primary.main",
              bgcolor: "rgba(93, 107, 196, 0.08)",
              width: 36,
              height: 36,
              "&:hover": { bgcolor: "rgba(93, 107, 196, 0.16)" },
            }}
          >
            <Icon icon={outlineInfo} width={20} height={20} />
          </IconButton>
        ) : null}
      </Box>

      {modal?.title ? (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{modal?.title}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              className="conteudo-post"
              sx={{ fontSize: "1rem", lineHeight: 1.65 }}
              dangerouslySetInnerHTML={{ __html: modal?.contentSanitized }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={handleClose}
              autoFocus
              variant="contained"
              id={idListItemButtonFecharModal}
            >
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
}
