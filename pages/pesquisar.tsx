import ApiApp from "@data/ApiApp";
import { PostType } from "@data/PostType";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import {
  Alert,
  Input,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import theme from "@styles/theme";
import TextUtils from "@utils/TextUtils";
import * as JsSearch from "js-search";
import Link from "next/link";
import React, { useState } from "react";
import Highlighter from "react-highlight-words";

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

  search.addDocuments(itens);

  return search;
}

const negritoCss = {
  backgroundColor: "inherit",
  color: theme.palette.info.main,
};

let timeout: NodeJS.Timeout;

export default function Pesquisar() {
  const [inputPesquisa, setinputPesquisa] = useState("");
  const [resultadosPesquisa, setResultadosPesquisa] = useState<PostType[]>([]);
  const [searchWords, setSearchWords] = useState<string[]>([]);
  const [progress, setProgress] = useState(false);

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
      if (!getSearchObj) return false;

      const resultados = getSearchObj().search(val);
      setResultadosPesquisa(resultados as PostType[]);
      setSearchWords(val.split(" "));
      setProgress(false);
    }, 1000);
  }

  const semResultado = resultadosPesquisa.length === 0 && inputPesquisa !== "";
  const comResultado = resultadosPesquisa.length > 0 && inputPesquisa !== "";
  const nadaPesquisado =
    resultadosPesquisa.length === 0 && inputPesquisa === "";

  return (
    <Container maxWidth="sm">
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Input
            autoFocus
            fullWidth
            value={inputPesquisa}
            disableUnderline
            onChange={onChangePesquisa}
            startAdornment={
              <Link href={"/"} passHref>
                <IconButton size="large" aria-label="voltar" color="inherit">
                  <ArrowBackIcon />
                </IconButton>
              </Link>
            }
            endAdornment={
              <IconButton
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
      <main>
        <Container>
          <List
            dense
            subheader={
              resultadosPesquisa.length
                ? `Resultado${resultadosPesquisa.length ? "s" : ""} ${
                    resultadosPesquisa.length
                  }`
                : ""
            }
          >
            {comResultado &&
              resultadosPesquisa.map((i, keyResult) => {
                return (
                  <ListItem
                    button
                    key={keyResult}
                    divider={keyResult !== resultadosPesquisa.length - 1}
                  >
                    <Link href={i.href} passHref>
                      <ListItemText
                        primary={
                          <Highlighter
                            highlightStyle={negritoCss}
                            searchWords={searchWords}
                            autoEscape={true}
                            sanitize={(text) =>
                              TextUtils.stringToSlugSemHifen(text)
                            }
                            textToHighlight={i.title}
                          />
                        }
                        secondary={i.catName}
                        // secondaryTypographyProps={{ component: "div" }}
                        // secondary={
                        //   <Highlighter
                        //     highlightStyle={negritoCss}
                        //     searchWords={searchWords}
                        //     autoEscape={true}
                        // sanitize={(text) =>
                        //   TextUtils.stringToSlugSemHifen(text)
                        // }
                        //     textToHighlight={i.title}
                        //   />
                        // }
                      />
                    </Link>
                  </ListItem>
                );
              })}
          </List>

          {semResultado && (
            <Box pb={2}>
              <Alert
                icon={<ReportProblemOutlinedIcon fontSize="inherit" />}
                severity="warning"
              >
                Nenhum resultado encontrado
              </Alert>
            </Box>
          )}

          {nadaPesquisado && (
            <Box pb={2}>
              <Alert
                icon={<InfoOutlinedIcon fontSize="inherit" />}
                severity="info"
              >
                Digite algum valor no campo de busca
              </Alert>
            </Box>
          )}
        </Container>
      </main>
    </Container>
  );
}
