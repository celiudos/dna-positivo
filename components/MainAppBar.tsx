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
    <AppBar position="static">
      <Toolbar>
        {hrefVoltar ? (
          <Link href={hrefVoltar || ""} passHref>
            <IconButton
              size="large"
              id="btn-header-voltar"
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
              <IconButton
                size="large"
                aria-label="favoritos"
                color="inherit"
                id="btn-header-favoritos"
              >
                <StarIcon />
              </IconButton>
            </Link>
            <PesquisarDialog />
          </>
        ) : null}
      </Toolbar>
      {carregandoPagina !== 0 && <LinearDeterminate />}
    </AppBar>
  );
}

function LinearDeterminate() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          // return 0;
          clearInterval(timer);
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <LinearProgressCss
      color="secondary"
      variant="determinate"
      value={progress}
    />
  );
}

const LinearProgressCss = styled(LinearProgress)`
  margin-top: -4px;
`;
