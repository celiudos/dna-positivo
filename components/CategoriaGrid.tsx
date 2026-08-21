import atomIcon from "@iconify/icons-mdi/atom";
import brainIcon from "@iconify/icons-mdi/brain";
import dnaIcon from "@iconify/icons-mdi/dna";
import shimmerIcon from "@iconify/icons-mdi/shimmer";
import virtualRealityIcon from "@iconify/icons-mdi/virtual-reality";
import { Icon, IconifyIcon } from "@iconify/react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { carregandoPaginaAction } from "@store/actionCreator";
import configApp from "configApp";
import Link from "next/link";
import * as React from "react";
import { useDispatch } from "react-redux";

const ICONES: { [key: string]: IconifyIcon } = {
  brain: brainIcon,
  atom: atomIcon,
  dna: dnaIcon,
  shimmer: shimmerIcon,
  metaverso: virtualRealityIcon,
};

type Props = {
  totalPorCategoria?: { [cat: string]: number };
};

/**
 * Grade de acesso rápido às categorias (um blog de origem por card).
 * Quando a quantidade de categorias é ímpar, o último card ocupa a linha
 * inteira para a grade não ficar com um "buraco".
 */
export default function CategoriaGrid({ totalPorCategoria }: Props) {
  const dispatch = useDispatch();
  const categorias = configApp.categorias;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 1.5,
      }}
    >
      {categorias.map((categoria, key) => {
        const total = totalPorCategoria?.[categoria.cat];
        const ocupaLinhaInteira =
          categorias.length % 2 !== 0 && key === categorias.length - 1;

        return (
          <ButtonBase
            key={categoria.cat}
            component={Link}
            href={categoria.href}
            id={`CategoriaGrid-${categoria.cat}`}
            onClick={(): void => {
              dispatch(carregandoPaginaAction());
            }}
            sx={{
              gridColumn: ocupaLinhaInteira ? "span 2" : "auto",
              display: "flex",
              flexDirection: ocupaLinhaInteira ? "row" : "column",
              alignItems: ocupaLinhaInteira ? "center" : "flex-start",
              justifyContent: "flex-start",
              gap: ocupaLinhaInteira ? 1.5 : 1.25,
              textAlign: "left",
              p: 2,
              minHeight: ocupaLinhaInteira ? 0 : 132,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: categoria.corFundo,
              transition: "transform .18s ease, box-shadow .18s ease",
              "&:active": { transform: "scale(0.985)" },
              "&:hover": { boxShadow: "0px 6px 18px rgba(37, 41, 57, 0.08)" },
            }}
          >
            <Box
              aria-hidden
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#FFFFFF",
                color: categoria.cor,
                boxShadow: "0px 2px 6px rgba(37, 41, 57, 0.06)",
              }}
            >
              <Icon
                icon={ICONES[categoria.icone] || dnaIcon}
                width={22}
                height={22}
              />
            </Box>
            <Box sx={{ minWidth: 0, flexGrow: 1 }}>
              <Typography
                variant="subtitle1"
                component="span"
                sx={{ display: "block", color: "text.primary", lineHeight: 1.3 }}
              >
                {categoria.title}
              </Typography>
              {total ? (
                <Typography
                  variant="caption"
                  component="span"
                  sx={{ display: "block", color: "text.secondary", mt: 0.25 }}
                >
                  {total} publicações
                </Typography>
              ) : null}
            </Box>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
