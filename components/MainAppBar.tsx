import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/StarBorderOutlined";
import { LinearProgress, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { carregandoPaginaAction } from "@store/actionCreator";
import { RootState } from "@store/storeConfig";
import Link from "next/link";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PesquisarDialog from "./PesquisarDialog";

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
  const titleDefinitivo = title || "Página Inicial";
  const carregandoPagina = useSelector(
    (state: RootState) => state.rootReducer.carregandoPagina
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(carregandoPaginaAction(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppBarCss position="static">
      <Toolbar>
        {hrefVoltar ? (
          <Link href={hrefVoltar || ""} passHref>
            <IconButton
              size="large"
              aria-label="voltar"
              color="inherit"
              href={hrefVoltar || ""}
              onClick={(): void => {
                dispatch(carregandoPaginaAction());
              }}
            >
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
            <PesquisarDialog />
          </>
        ) : null}
      </Toolbar>
      {carregandoPagina !== 0 && <LinearProgressCss color="secondary" />}
    </AppBarCss>
  );
}

const AppBarCss = styled(AppBar)``;

const LinearProgressCss = styled(LinearProgress)`
  margin-top: -4px;
`;
