import { ListItemButton } from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";

type Props = {
  itens: { title: string; onclick?: () => void }[];
};

export default function ListItens({ itens }: Props) {
  return (
    <List component="nav" aria-label="Lista de itens">
      {itens
        ? itens.map((item, key) => (
            <ListItemButton key={key} onClick={item.onclick}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))
        : null}
    </List>
  );
}
