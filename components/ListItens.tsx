import { ListItem, ListItemButton } from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { IListItem } from "@typesApp/IListItem";
import DateUtils from "@utils/DateUtils";
import Link from "next/link";
import * as React from "react";
import EstrelaFavorito from "./EstrelaFavorito";

export default function ListItens({
  itens,
  hasData = false,
  hasStar = true,
}: IListItem) {
  return (
    <List component="nav" aria-label="Lista de itens" disablePadding>
      {itens
        ? itens.map((item, key) => {
            const data = hasData
              ? " - " +
                DateUtils.formatarDataDatetimeUX({
                  data: item.updated,
                })
              : "";
            return (
              <ListItem
                key={key}
                secondaryAction={
                  hasStar ? <EstrelaFavorito item={item} /> : null
                }
                disablePadding
              >
                <Link href={item.href || ""} passHref>
                  <ListItemButton divider>
                    <ListItemText
                      primary={item.title}
                      secondary={`${item.catName}${data}`}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })
        : null}
    </List>
  );
}
