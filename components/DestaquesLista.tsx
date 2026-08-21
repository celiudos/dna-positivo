import outlineOpenInNew from "@iconify/icons-ic/outline-open-in-new";
import roundAutoAwesome from "@iconify/icons-ic/round-auto-awesome";
import roundChevronRight from "@iconify/icons-ic/round-chevron-right";
import { Icon } from "@iconify/react";
import { Box, List, ListItem, ListItemButton, Paper } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { carregandoPaginaAction } from "@store/actionCreator";
import lodash from "lodash";
import Link from "next/link";
import * as React from "react";
import { useDispatch } from "react-redux";

type Destaque = {
  title: string;
  href: string;
};

function isLinkExterno(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/**
 * Lista dos destaques da Home. Links externos (Youtube, Drive, blogs) abrem em
 * nova aba e ganham o ícone de "abrir fora do app".
 */
export default function DestaquesLista({ itens }: { itens: Destaque[] }) {
  const dispatch = useDispatch();

  return (
    <Paper variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
      <List component="nav" aria-label="Destaques" disablePadding>
        {itens.map((item, key) => {
          const externo = isLinkExterno(item.href);
          const idListItemButton = `DestaquesLista-ListItemButton-${key}-${lodash.snakeCase(
            item.title
          )}`;

          return (
            <ListItem
              key={key}
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
                href={item.href}
                id={idListItemButton}
                target={externo ? "_blank" : undefined}
                rel={externo ? "noopener noreferrer" : undefined}
                onClick={(): void => {
                  if (!externo) dispatch(carregandoPaginaAction());
                }}
                sx={{ px: 2, py: 1.5, gap: 1.5 }}
              >
                <Box
                  aria-hidden
                  sx={{
                    width: 34,
                    height: 34,
                    flexShrink: 0,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(217, 166, 78, 0.14)",
                    color: "secondary.dark",
                  }}
                >
                  <Icon icon={roundAutoAwesome} width={19} height={19} />
                </Box>
                <ListItemText
                  primary={item.title}
                  secondary={externo ? "Abre fora do aplicativo" : undefined}
                />
                <Box
                  aria-hidden
                  sx={{
                    display: "flex",
                    color: "text.disabled",
                    flexShrink: 0,
                  }}
                >
                  <Icon
                    icon={externo ? outlineOpenInNew : roundChevronRight}
                    width={externo ? 18 : 22}
                    height={externo ? 18 : 22}
                  />
                </Box>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
