import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/StarBorderOutlined";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";

type Props = {
  title?: string;
};

export default function MainAppBar({ title }: Props) {
  const titleDefinitivo = title || "DNA Positivo";
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          {titleDefinitivo}
        </Typography>
        <IconButton size="large" aria-label="favoritos" color="inherit">
          <StarIcon />
        </IconButton>
        <IconButton size="large" aria-label="search" color="inherit">
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
