import styled from "@emotion/styled";
import roundArrowBack from "@iconify/icons-ic/round-arrow-back";
import roundStarBorder from "@iconify/icons-ic/round-star-border";
import { Icon } from "@iconify/react";
import { LinearProgress, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { carregandoPaginaAction } from "@store/actionCreator";
import { RootState } from "@store/storeConfig";
import configApp from "configApp";
import Link from "next/link";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import PesquisarDialog from "./PesquisarDialog";

type Props = {
  title?: string;
  hrefVoltar?: string;
  naoTemMenuDir?: boolean;
};

const acaoCss = {
  color: "inherit",
  bgcolor: "rgba(255, 255, 255, 0.14)",
  width: 40,
  height: 40,
  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.24)" },
};

export default function MainAppBar({
  title,
  hrefVoltar,
  naoTemMenuDir,
}: Props) {
  const titleDefinitivo = title || configApp.site;
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
      <Toolbar sx={{ gap: 1, px: 1.5 }}>
        {hrefVoltar ? (
          <IconButton
            component={Link}
            href={hrefVoltar || ""}
            id="btn-header-voltar"
            aria-label="voltar"
            sx={acaoCss}
            onClick={(): void => {
              dispatch(carregandoPaginaAction());
            }}
          >
            <Icon icon={roundArrowBack} width={22} height={22} />
          </IconButton>
        ) : null}
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          noWrap
          sx={{ flexGrow: 1, minWidth: 0, pl: hrefVoltar ? 0 : 0.5 }}
        >
          {titleDefinitivo}
        </Typography>
        {!naoTemMenuDir ? (
          <>
            <IconButton
              component={Link}
              href={"/favoritos"}
              aria-label="favoritos"
              id="btn-header-favoritos"
              sx={acaoCss}
            >
              <Icon icon={roundStarBorder} width={22} height={22} />
            </IconButton>
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
  margin-top: -3px;
`;
