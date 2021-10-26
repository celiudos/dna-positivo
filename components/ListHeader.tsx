import InfoIcon from "@mui/icons-material/Info";
import { IconButton } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";

type Props = {
  primary?: string;
  secondary?: string;
  conteudoModal?: string;
};

export default function ListHeader({
  primary,
  secondary,
  conteudoModal,
}: Props) {
  return (
    <List dense>
      <ListItem
        secondaryAction={
          conteudoModal ? (
            <IconButton edge="end" aria-label="mais">
              <InfoIcon />
            </IconButton>
          ) : null
        }
      >
        <ListItemText primary={primary} secondary={secondary} />
      </ListItem>
    </List>
  );
}
