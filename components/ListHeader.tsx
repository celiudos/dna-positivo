import styled from "@emotion/styled";
import baselineInfo from "@iconify/icons-ic/baseline-info";
import { Icon } from "@iconify/react";
import { IconButton, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IPost } from "@typesApp/IPost";
import lodash from "lodash";
import * as React from "react";

type Props = {
  primary?: string;
  secondary?: string;
  modal?: Pick<IPost, "title" | "contentSanitized">;
};

export default function ListHeader({ primary, secondary, modal }: Props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const idListItemButton = `ListItens-IconButton-${lodash.snakeCase(primary)}`;
  const idListItemButtonFecharModal = `ListItens-IconButtonFecharModal-${lodash.snakeCase(
    primary
  )}`;

  return (
    <>
      <List dense>
        <ListItem
          secondaryAction={
            modal?.title ? (
              <IconButtonCss
                edge="end"
                aria-label="mais"
                id={idListItemButton}
                onClick={handleClickOpen}
              >
                <Icon icon={baselineInfo} />
              </IconButtonCss>
            ) : null
          }
        >
          <ListItemText
            primary={<Typography variant="h5">{primary}</Typography>}
            secondary={secondary}
          />
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
            <DialogContentText
              id="alert-dialog-description"
              style={{ fontSize: `1.1rem` }}
              dangerouslySetInnerHTML={{ __html: modal?.contentSanitized }}
            ></DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              autoFocus
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

export const IconButtonCss = styled(IconButton)`
  /* background: #d9d9d9 !important; */
  border: 1px solid #000000a6 !important;
`;
