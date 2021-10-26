import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/StarBorderOutlined";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import * as React from "react";

type Props = {
  title?: string;
  hrefVoltar?: string;
  naoTemMenuDir?: boolean;
};

export default function MainAppBar({
  title,
  hrefVoltar,
  naoTemMenuDir,
}: Props) {
  const titleDefinitivo = title || "DNA Positivo";
  return (
    <AppBar position="static">
      <Toolbar>
        {hrefVoltar ? (
          <Link href={hrefVoltar || ""} passHref>
            <IconButton size="large" aria-label="voltar" color="inherit">
              <ArrowBackIcon />
            </IconButton>
          </Link>
        ) : null}
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          {titleDefinitivo}
        </Typography>
        {!naoTemMenuDir ? (
          <>
            <Link href={"/favoritos"} passHref>
              <IconButton size="large" aria-label="favoritos" color="inherit">
                <StarIcon />
              </IconButton>
            </Link>
            <Link href={"/pesquisar"} passHref>
              <IconButton size="large" aria-label="pesquisar" color="inherit">
                <SearchIcon />
              </IconButton>
            </Link>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}
