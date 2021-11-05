import ContainerApp from "@components/ContainerApp";
import ApiApp from "@data/ApiApp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import SearchIcon from "@mui/icons-material/Search";
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
import theme from "@styles/theme";
import { IPost } from "@typesApp/IPost";
import TextUtils from "@utils/TextUtils";
import * as JsSearch from "js-search";
import lodash from "lodash";
import Link from "next/link";
import React, { useState } from "react";
import Highlighter from "react-highlight-words";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getSearchObj() {
  const itens = ApiApp.getTodos();

  const search = new JsSearch.Search("id");

  search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
  search.tokenizer = {
    tokenize(text) {
      return TextUtils.stringToSlugSemHifen(text).split(" ");
    },
  };
  search.addIndex("title");
  search.addIndex("resumo");

  search.addDocuments(itens);

  return search;
}

const searchObj = getSearchObj();

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

  const handleClickOpen = () => {
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
      if (!searchObj) return false;

      const resultados = searchObj.search(val);
      setResultadosPesquisa(resultados.slice(0, 50) as IPost[]);
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
        <SearchIcon />
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
                    <ArrowBackIcon />
                  </IconButton>
                }
                endAdornment={
                  <IconButton
                    id="apagar-pesquisa"
                    aria-label="Apagar pesquisa"
                    onClick={zerarPesquisa}
                    edge="end"
                  >
                    <ClearIcon />
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
                  icon={<ReportProblemOutlinedIcon fontSize="inherit" />}
                  severity="warning"
                >
                  Nenhum resultado encontrado
                </Alert>
              </Box>
            )}

            {nadaPesquisado && (
              <Box pt={2}>
                <Alert
                  icon={<InfoOutlinedIcon fontSize="inherit" />}
                  severity="info"
                >
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
