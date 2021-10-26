import InfoIcon from "@mui/icons-material/Info";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";

type Props = {
  primary?: string;
  secondary?: string;
  modal?: { title: string; conteudo: string };
};

export default function ListHeader({ primary, secondary, modal }: Props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <List dense>
        <ListItem
          secondaryAction={
            modal?.title ? (
              <IconButton
                edge="end"
                aria-label="mais"
                onClick={handleClickOpen}
              >
                <InfoIcon />
              </IconButton>
            ) : null
          }
        >
          <ListItemText primary={primary} secondary={secondary} />
        </ListItem>
      </List>

      {modal?.title ? (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{modal?.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {modal?.conteudo}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Entendi
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
}