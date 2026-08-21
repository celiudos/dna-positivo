import roundChevronRight from "@iconify/icons-ic/round-chevron-right";
import { Icon } from "@iconify/react";
import { Box, Chip, ListItem, ListItemButton, Paper } from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
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
    <Paper variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
      <List component="nav" aria-label="Lista de itens" disablePadding>
        {itens
          ? itens.map((item, key) => {
              const data = hasData
                ? DateUtils.formatarDataDatetimeUX({
                    data: item.updated,
                    formato: "dd/MM/yyyy",
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
                  sx={{
                    "&:not(:last-of-type)": {
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    },
                  }}
                >
                  <ListItemButton
                    component={Link}
                    href={item.href || ""}
                    id={idListItemButton}
                    onClick={(): void => {
                      dispatch(carregandoPaginaAction());
                    }}
                    sx={{ px: 2, py: 1.5, gap: 1 }}
                  >
                    {isFormatoCompleto ? (
                      <ListItemText
                        disableTypography
                        primary={
                          <Box>
                            <Chip
                              label={item.catName}
                              size="small"
                              sx={{
                                mb: 0.75,
                                bgcolor: "rgba(93, 107, 196, 0.10)",
                                color: "primary.dark",
                              }}
                            />
                            <Typography variant="subtitle1">
                              {item.title}
                            </Typography>
                          </Box>
                        }
                      />
                    ) : (
                      <ListItemText
                        primary={item.title}
                        secondary={
                          item.catName || data
                            ? [item.catName, data].filter(Boolean).join(" · ")
                            : null
                        }
                      />
                    )}
                    {!hasStar ? (
                      <Box
                        aria-hidden
                        sx={{
                          display: "flex",
                          color: "text.disabled",
                          flexShrink: 0,
                        }}
                      >
                        <Icon icon={roundChevronRight} width={22} height={22} />
                      </Box>
                    ) : null}
                  </ListItemButton>
                </ListItem>
              );
            })
          : null}
      </List>
    </Paper>
  );
}
