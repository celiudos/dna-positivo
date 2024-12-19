import ContainerApp from "@components/ContainerApp";
import { useFuseSearch } from "@hook/useFuseSearch";
import baselineArrowBack from "@iconify/icons-ic/baseline-arrow-back";
import baselineClear from "@iconify/icons-ic/baseline-clear";
import baselineSearch from "@iconify/icons-ic/baseline-search";
import outlineInfo from "@iconify/icons-ic/outline-info";
import outlineReportProblem from "@iconify/icons-ic/outline-report-problem";
import { Icon } from "@iconify/react";
import ApiPost from "@lib/ApiPost";
import ApiSearch from "@lib/ApiSearch";
import {
  Alert,
  Chip,
  Dialog,
  Input,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import { allPostsAction } from "@store/actionCreator";
import { RootState } from "@store/storeConfig";
import theme from "@styles/theme";
import { IPost } from "@typesApp/IPost";
import TextUtils from "@utils/TextUtils";
import lodash from "lodash";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import Magafla from "./Magafla";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const negritoCss: React.CSSProperties = {
  backgroundColor: "inherit",
  color: theme.palette.info.main,
  fontWeight: "bold",
};

let timeout: NodeJS.Timeout;

export default function PesquisarDialog() {
  const [inputPesquisa, setinputPesquisa] = useState("");
  const [resultadosPesquisa, setResultadosPesquisa] = useState<IPost[]>([]);
  const [searchWords, setSearchWords] = useState<string[]>([]);
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const { allPosts } = useSelector((state: RootState) => state.rootReducer);

  const [resultCerteza] = useFuseSearch(inputPesquisa, 20);

  const handleClickOpen = () => {
    if (!allPosts)
      ApiPost.setAllPosts().then((posts) => dispatch(allPostsAction(posts)));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function zerarPesquisa() {
    setResultadosPesquisa([]);
    setSearchWords([]);
    setinputPesquisa("");
  }

  function onChangePesquisa(ev: { target: { value: string } }) {
    const val = ev.target.value;
    setinputPesquisa(val);
    if (val === "") {
      setResultadosPesquisa([]);
      setSearchWords([]);

      return false;
    }

    setProgress(true);

    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      const resp = ApiSearch.search({
        searchBy: val,
        pageSize: 50,
        limit: 50,
        searchFields: ["title", "resumo", "contentSanitized"],
      });

      setResultadosPesquisa(resp.results as IPost[]);
      setSearchWords(val.split(" "));
      setProgress(false);
    }, 1000);
  }

  const qntResultados = resultadosPesquisa.length;
  const semResultado = qntResultados === 0 && inputPesquisa !== "";
  const comResultado = qntResultados > 0 && inputPesquisa !== "";
  const nadaPesquisado = qntResultados === 0 && inputPesquisa === "";

  return (
    <>
      <IconButton
        id="btn-header-pesquisar"
        size="large"
        aria-label="pesquisar"
        color="inherit"
        onClick={handleClickOpen}
      >
        <Icon icon={baselineSearch} />
      </IconButton>
      <Dialog
        fullScreen
        TransitionComponent={Transition}
        open={open}
        onClose={handleClose}
      >
        <ContainerApp title="Pesquisar">
          <AppBar position="static" color="transparent">
            <Toolbar>
              <Input
                id="input-header-pesquisar"
                autoFocus
                fullWidth
                value={inputPesquisa}
                disableUnderline
                onChange={onChangePesquisa}
                startAdornment={
                  <IconButton
                    size="large"
                    aria-label="voltar"
                    color="inherit"
                    onClick={handleClose}
                  >
                    <Icon icon={baselineArrowBack} />
                  </IconButton>
                }
                endAdornment={
                  <IconButton
                    id="apagar-pesquisa"
                    aria-label="Apagar pesquisa"
                    onClick={zerarPesquisa}
                    edge="end"
                  >
                    <Icon icon={baselineClear} />
                  </IconButton>
                }
              />
            </Toolbar>
            {progress && <LinearProgress />}
          </AppBar>
          <main
            onTouchStart={() => {
              if (window && window.document) {
                /* @ts-ignore */
                window.document.getElementById("apagar-pesquisa").focus();
              }
            }}
          >
            <Magafla resultCerteza={resultCerteza} />
            {qntResultados > 0 ? (
              <Box m={2}>
                <Typography variant="subtitle1">
                  {qntResultados} resultado
                  {qntResultados ? "s" : ""}
                </Typography>
              </Box>
            ) : null}

            {comResultado && (
              <Paper>
                <List dense component="div">
                  {resultadosPesquisa.map((i, keyResult) => {
                    const idListItemButton = `ListItens-ListItemButton-${keyResult}-${lodash.snakeCase(
                      i.title
                    )}`;

                    return (
                      <ListItem
                        disablePadding
                        key={keyResult}
                        divider={keyResult !== qntResultados - 1}
                        component="div"
                      >
                        <Link href={i.href} passHref key={keyResult}>
                          <ListItemButton
                            component="a"
                            id={idListItemButton}
                            divider={keyResult !== qntResultados - 1}
                          >
                            <ListItemText
                              onClick={() => {
                                handleClose();
                              }}
                              primary={
                                <>
                                  <Chip label={i.catName} size="small" />{" "}
                                  <Typography variant="subtitle1">
                                    <Highlighter
                                      highlightStyle={negritoCss}
                                      searchWords={searchWords}
                                      autoEscape={true}
                                      sanitize={(text) =>
                                        TextUtils.stringToSlugSemHifen(text)
                                      }
                                      textToHighlight={i.title}
                                    />
                                  </Typography>
                                </>
                              }
                              secondary={
                                <>
                                  <Highlighter
                                    highlightStyle={negritoCss}
                                    searchWords={searchWords}
                                    autoEscape={true}
                                    sanitize={(text) =>
                                      TextUtils.stringToSlugSemHifen(text)
                                    }
                                    textToHighlight={i.resumo}
                                  />
                                  ...
                                </>
                              }
                            />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            )}

            {semResultado && (
              <Box pt={2}>
                <Alert
                  icon={<Icon icon={outlineReportProblem} />}
                  severity="warning"
                >
                  Nenhum resultado encontrado
                </Alert>
              </Box>
            )}

            {nadaPesquisado && (
              <Box pt={2}>
                <Alert icon={<Icon icon={outlineInfo} />} severity="info">
                  Digite algum valor no campo de busca
                </Alert>
              </Box>
            )}
          </main>
        </ContainerApp>
      </Dialog>
    </>
  );
}
