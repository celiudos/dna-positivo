import ContainerApp from "@components/ContainerApp";
import { useFuseSearch } from "@hook/useFuseSearch";
import baselineClear from "@iconify/icons-ic/baseline-clear";
import outlineInfo from "@iconify/icons-ic/outline-info";
import outlineReportProblem from "@iconify/icons-ic/outline-report-problem";
import roundArrowBack from "@iconify/icons-ic/round-arrow-back";
import roundSearch from "@iconify/icons-ic/round-search";
import { Icon } from "@iconify/react";
import ApiPost from "@lib/ApiPost";
import ApiSearch from "@lib/ApiSearch";
import {
  Alert,
  ButtonBase,
  Chip,
  Dialog,
  InputBase,
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
import React, { useState } from "react";
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
  backgroundColor: "rgba(76, 141, 217, 0.14)",
  color: theme.palette.info.dark,
  fontWeight: 700,
  borderRadius: 4,
  padding: "0 2px",
};

let timeout: NodeJS.Timeout;

type Props = {
  /** "icone": botao da AppBar. "campo": campo de busca destacado (Home). */
  variant?: "icone" | "campo";
};

export default function PesquisarDialog({ variant = "icone" }: Props) {
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
      {variant === "campo" ? (
        <ButtonBase
          id="btn-home-pesquisar"
          aria-label="pesquisar"
          onClick={handleClickOpen}
          sx={{
            width: "100%",
            justifyContent: "flex-start",
            gap: 1.25,
            px: 2,
            py: 1.5,
            borderRadius: 999,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0px 4px 16px rgba(37, 41, 57, 0.07)",
            color: "text.secondary",
            transition: "box-shadow .18s ease",
            "&:active": { boxShadow: "none" },
          }}
        >
          <Icon icon={roundSearch} width={21} height={21} />
          <Typography variant="body2" component="span" noWrap>
            Buscar em todas as publicações
          </Typography>
        </ButtonBase>
      ) : (
        <IconButton
          id="btn-header-pesquisar"
          aria-label="pesquisar"
          onClick={handleClickOpen}
          sx={{
            color: "inherit",
            bgcolor: "rgba(255, 255, 255, 0.14)",
            width: 40,
            height: 40,
            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.24)" },
          }}
        >
          <Icon icon={roundSearch} width={22} height={22} />
        </IconButton>
      )}

      <Dialog
        fullScreen
        slots={{ transition: Transition }}
        open={open}
        onClose={handleClose}
      >
        <ContainerApp title="Pesquisar">
          <AppBar position="static" color="transparent">
            <Toolbar sx={{ gap: 1, px: 1.5, py: 1 }}>
              <Paper
                variant="outlined"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  borderRadius: 999,
                  px: 0.5,
                  bgcolor: "background.paper",
                }}
              >
                <IconButton
                  size="medium"
                  aria-label="voltar"
                  color="inherit"
                  onClick={handleClose}
                >
                  <Icon icon={roundArrowBack} width={22} height={22} />
                </IconButton>
                <InputBase
                  id="input-header-pesquisar"
                  autoFocus
                  fullWidth
                  value={inputPesquisa}
                  placeholder="Buscar publicações..."
                  onChange={onChangePesquisa}
                  sx={{ fontSize: "0.9375rem" }}
                  inputProps={{ "aria-label": "campo de pesquisa" }}
                />
                <IconButton
                  id="apagar-pesquisa"
                  aria-label="Apagar pesquisa"
                  onClick={zerarPesquisa}
                  size="medium"
                >
                  <Icon icon={baselineClear} width={20} height={20} />
                </IconButton>
              </Paper>
            </Toolbar>
            {progress && <LinearProgress />}
          </AppBar>
          <main
            onTouchStart={() => {
              if (typeof window !== "undefined" && window.document) {
                const campo = window.document.getElementById(
                  "input-header-pesquisar"
                );
                if (campo) campo.blur();
              }
            }}
          >
            <Box sx={{ px: 2, pb: 4 }}>
              <Magafla resultCerteza={resultCerteza} />

              {qntResultados > 0 ? (
                <Typography
                  variant="overline"
                  component="p"
                  color="text.secondary"
                  sx={{ my: 2 }}
                >
                  {qntResultados} resultado
                  {qntResultados > 1 ? "s" : ""}
                </Typography>
              ) : null}

              {comResultado && (
                <Paper
                  variant="outlined"
                  sx={{ borderRadius: 3, overflow: "hidden" }}
                >
                  <List dense component="div" disablePadding>
                    {resultadosPesquisa.map((i, keyResult) => {
                      const idListItemButton = `ListItens-ListItemButton-${keyResult}-${lodash.snakeCase(
                        i.title
                      )}`;

                      return (
                        <ListItem
                          disablePadding
                          key={keyResult}
                          component="div"
                          sx={{
                            "&:not(:last-of-type)": {
                              borderBottom: "1px solid",
                              borderColor: "divider",
                            },
                          }}
                        >
                          <ListItemButton
                            component={Link}
                            href={i.href}
                            id={idListItemButton}
                            onClick={() => handleClose()}
                            sx={{ px: 2, py: 1.5 }}
                          >
                            <ListItemText
                              disableTypography
                              primary={
                                <Box sx={{ mb: 0.5 }}>
                                  <Chip
                                    label={i.catName}
                                    size="small"
                                    sx={{
                                      mb: 0.75,
                                      bgcolor: "rgba(93, 107, 196, 0.10)",
                                      color: "primary.dark",
                                    }}
                                  />
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
                                </Box>
                              }
                              secondary={
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  component="span"
                                >
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
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Paper>
              )}

              {semResultado && (
                <Box sx={{ pt: 2 }}>
                  <Alert
                    icon={<Icon icon={outlineReportProblem} />}
                    severity="warning"
                  >
                    Nenhum resultado encontrado
                  </Alert>
                </Box>
              )}

              {nadaPesquisado && (
                <Box sx={{ pt: 2 }}>
                  <Alert icon={<Icon icon={outlineInfo} />} severity="info">
                    Digite algum valor no campo de busca
                  </Alert>
                </Box>
              )}
            </Box>
          </main>
        </ContainerApp>
      </Dialog>
    </>
  );
}
