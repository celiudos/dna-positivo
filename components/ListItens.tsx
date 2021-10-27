import { ListItem, ListItemButton } from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { IListItem } from "@typesApp/IListItem";
import Link from "next/link";
import * as React from "react";
import EstrelaFavorito from "./EstrelaFavorito";

export default function ListItens({ itens, hasStar = true }: IListItem) {
  return (
    <List component="nav" aria-label="Lista de itens">
      {itens
        ? itens.map((item, key) => (
            <ListItem
              key={key}
              secondaryAction={hasStar ? <EstrelaFavorito item={item} /> : null}
              disablePadding
            >
              <Link href={item.href || ""} passHref>
                <ListItemButton divider>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))
        : null}
    </List>
  );
}
