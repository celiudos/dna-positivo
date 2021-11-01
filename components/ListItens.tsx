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
import lodash from "lodash";
import Link from "next/link";
import * as React from "react";
import { useDispatch } from "react-redux";
import EstrelaFavorito from "./EstrelaFavorito";

export default function ListItens({
  itens,
  hasData = false,
  hasStar = true,
  isFormatoCompleto,
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

              const idListItemButton = `ListItens-ListItemButton-${key}-${lodash.snakeCase(
                item.title
              )}`;

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
                      id={idListItemButton}
                      divider
                      onClick={(): void => {
                        dispatch(carregandoPaginaAction());
                      }}
                    >
                      {isFormatoCompleto ? (
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
                      ) : (
                        <ListItemText
                          primary={item.title}
                          secondary={`${item.catName}${data}`}
                        />
                      )}
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
