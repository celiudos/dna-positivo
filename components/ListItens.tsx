import StarIcon from "@mui/icons-material/StarBorderOutlined";
import { IconButton, ListItem, ListItemButton } from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import * as React from "react";

export type ItemProps = { title: string; href: string; hasStar?: boolean };

export type ListItensProps = {
  itens: ItemProps[];
};

export default function ListItens({ itens }: ListItensProps) {
  return (
    <List component="nav" aria-label="Lista de itens">
      {itens
        ? itens.map((item, key) => (
            <ListItem
              key={key}
              secondaryAction={
                item.hasStar ? (
                  <IconButton edge="end" aria-label="favorito">
                    <StarIcon />
                  </IconButton>
                ) : null
              }
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
