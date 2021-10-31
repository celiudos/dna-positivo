import {
  Chip,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { carregandoPaginaAction } from "@store/actionCreator";
import { IListItem } from "@typesApp/IListItem";
import DateUtils from "@utils/DateUtils";
import Link from "next/link";
import * as React from "react";
import { useDispatch } from "react-redux";
import EstrelaFavorito from "./EstrelaFavorito";

export default function ListItens({
  itens,
  hasData = false,
  hasStar = true,
}: IListItem) {
  const dispatch = useDispatch();

  return (
    <Paper>
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
                    <ListItemButton
                      divider
                      onClick={(): void => {
                        dispatch(carregandoPaginaAction());
                      }}
                    >
                      <ListItemText
                        primary={
                          <>
                            <Chip label={item.catName} size="small" />{" "}
                            <Typography variant="subtitle1">
                              {item.title}
                            </Typography>
                          </>
                        }
                        secondary={`${item.resumo}...`}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              );
            })
          : null}
      </List>
    </Paper>
  );
}
