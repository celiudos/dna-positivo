import outlineSearchOff from "@iconify/icons-ic/outline-search-off";
import roundChevronRight from "@iconify/icons-ic/round-chevron-right";
import roundClose from "@iconify/icons-ic/round-close";
import roundSearch from "@iconify/icons-ic/round-search";
import { Icon } from "@iconify/react";
import {
  Box,
  Chip,
  IconButton,
  InputBase,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { carregandoPaginaAction } from "@store/actionCreator";
import theme from "@styles/theme";
import { tokens } from "@theme/ThemeConfig";
import { IListItem } from "@typesApp/IListItem";
import { IPost } from "@typesApp/IPost";
import DateUtils from "@utils/DateUtils";
import GenericUtils from "@utils/GenericUtils";
import TextUtils from "@utils/TextUtils";
import lodash from "lodash";
import Link from "next/link";
import * as React from "react";
import Highlighter from "react-highlight-words";
import { useDispatch } from "react-redux";
import { List, RowComponentProps, useListRef } from "react-window";

import EstadoVazio from "./EstadoVazio";
import EstrelaFavorito from "./EstrelaFavorito";

const ALTURA_LINHA_POST = 78;
const ALTURA_LINHA_LETRA = 42;
/** Trilha de letras: fica ao lado da lista, nunca por cima do conteudo. */
const LARGURA_TRILHA = 30;
/** Altura ideal de cada letra na trilha; encolhe sozinha quando falta espaco. */
const ALTURA_LETRA = 30;

/** Mesmo grifo usado na busca geral (PesquisarDialog), para o filtro parecer a mesma funcionalidade. */
const negritoCss: React.CSSProperties = {
  backgroundColor: "rgba(76, 141, 217, 0.14)",
  color: theme.palette.info.dark,
  fontWeight: 700,
  borderRadius: 4,
  padding: "0 2px",
};

type TLinha = { tipo: "letra"; letra: string } | { tipo: "post"; post: IPost };

type TAtalho = { letra: string; indice: number };

type TRowProps = {
  linhas: TLinha[];
  hasStar: boolean;
  termosBusca: string[];
};

/** Inicial do titulo sem acento e em caixa alta; numeros e simbolos viram "#". */
function letraInicial(titulo: string): string {
  const letra = lodash.deburr(titulo.trim().charAt(0)).toUpperCase();
  return /^[A-Z]$/.test(letra) ? letra : "#";
}

/** Ordena por titulo (pt-BR) e intercala uma linha de letra a cada troca de inicial. */
function montarLinhas(itens: IPost[]): TLinha[] {
  const ordenados = itens
    .map((post) => ({ ...post, title: post.title.trim() }))
    .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));

  let letraAnterior = "";

  return ordenados.reduce<TLinha[]>((linhas, post) => {
    const letra = letraInicial(post.title);

    if (letra !== letraAnterior) {
      letraAnterior = letra;
      linhas.push({ tipo: "letra", letra });
    }

    linhas.push({ tipo: "post", post });
    return linhas;
  }, []);
}

/** Normaliza para comparar sem acento e sem caixa (usado pelo campo de busca). */
function normalizar(texto: string): string {
  return GenericUtils.substituirCharsSpeciais(texto).toLowerCase().trim();
}

function Row({
  index,
  style,
  linhas,
  hasStar,
  termosBusca,
}: RowComponentProps<TRowProps>) {
  const dispatch = useDispatch();
  const linha = linhas[index];

  if (linha.tipo === "letra") {
    return (
      <Box
        component="div"
        style={style}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          px: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography
          variant="overline"
          component="span"
          sx={{ color: "primary.dark", lineHeight: 1 }}
        >
          {linha.letra}
        </Typography>
        <Box
          sx={{ flexGrow: 1, height: "1px", bgcolor: "divider" }}
          aria-hidden
        />
      </Box>
    );
  }

  const { post } = linha;
  const idListItemButton = `ListSection-ListItemButton-${lodash.snakeCase(
    post.title
  )}`;
  const isPostMenorQueDiasDiff = DateUtils.isPostMenorQueDiasDiff(
    post.published
  );

  return (
    <ListItem
      style={style}
      component="div"
      disablePadding
      secondaryAction={hasStar ? <EstrelaFavorito item={post} /> : null}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <ListItemButton
        component={Link}
        href={post.href || ""}
        id={idListItemButton}
        onClick={(): void => {
          dispatch(carregandoPaginaAction());
        }}
        sx={{ height: "100%", px: 2, gap: 1 }}
      >
        <ListItemText
          primary={
            <>
              <Highlighter
                highlightStyle={negritoCss}
                searchWords={termosBusca}
                autoEscape={true}
                sanitize={(texto) => TextUtils.stringToSlugSemHifen(texto)}
                textToHighlight={TextUtils.limitarTexto(post.title, 60)}
              />{" "}
              {isPostMenorQueDiasDiff ? (
                <Chip label={"Novo!"} color="secondary" size="small" />
              ) : null}
            </>
          }
          sx={{
            my: 0,
            /* Trava em 2 linhas para o titulo nunca vazar a altura fixa da linha. */
            "& .MuiListItemText-primary": {
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            },
          }}
        />
        {!hasStar ? (
          <Box aria-hidden sx={{ display: "flex", color: "text.disabled" }}>
            <Icon icon={roundChevronRight} width={22} height={22} />
          </Box>
        ) : null}
      </ListItemButton>
    </ListItem>
  );
}

/**
 * Lista alfabetica de uma categoria. As abas de letras obrigavam a rolar uma
 * barra na horizontal so para achar a inicial, entao a navegacao passou a ter
 * duas vias pensadas para o polegar em 600px: um campo que filtra os titulos e
 * uma trilha vertical A-Z na borda direita, onde arrastar o dedo desliza a
 * lista e mostra a letra numa bolha — o mesmo gesto da agenda do celular.
 */
export default function ListSection({ itens, hasStar = true }: IListItem) {
  const [filtro, setFiltro] = React.useState("");
  const [indiceVisivel, setIndiceVisivel] = React.useState(0);
  const [bolha, setBolha] = React.useState<{ letra: string; y: number } | null>(
    null
  );

  const listRef = useListRef(null);
  const areaRef = React.useRef<HTMLDivElement>(null);
  const trilhaRef = React.useRef<HTMLDivElement>(null);
  const arrastandoRef = React.useRef(false);

  const termo = normalizar(filtro);
  /* Palavras "cruas" (sem normalizar) para o Highlighter, igual a busca geral: ele
     mesmo normaliza via `sanitize` antes de comparar com o titulo. */
  const termosBusca = React.useMemo(
    () => (filtro.trim() ? filtro.trim().split(/\s+/) : []),
    [filtro]
  );

  const itensFiltrados = React.useMemo(
    () =>
      termo
        ? itens.filter((post) => normalizar(post.title).includes(termo))
        : itens,
    [itens, termo]
  );

  const linhas = React.useMemo(
    () => montarLinhas(itensFiltrados),
    [itensFiltrados]
  );

  const atalhos = React.useMemo<TAtalho[]>(() => {
    const lista: TAtalho[] = [];
    linhas.forEach((linha, indice) => {
      if (linha.tipo === "letra") lista.push({ letra: linha.letra, indice });
    });
    return lista;
  }, [linhas]);

  /* Letra da secao que esta no topo da area visivel: e ela que fica destacada. */
  const letraAtiva = React.useMemo(() => {
    const secao = atalhos.filter(({ indice }) => indice <= indiceVisivel).pop();
    return secao?.letra || atalhos[0]?.letra || "";
  }, [atalhos, indiceVisivel]);

  /* Ao mudar o filtro a lista muda de tamanho: volta para o topo. */
  function aplicarFiltro(valor: string) {
    setFiltro(valor);
    setIndiceVisivel(0);
    listRef.current?.scrollToRow({ index: 0, align: "start" });
  }

  const irParaLetra = React.useCallback(
    (indice: number) => {
      listRef.current?.scrollToRow({ index: indice, align: "start" });
    },
    [listRef]
  );

  /* A trilha e um controle continuo: a posicao do dedo vira uma letra. */
  const arrastarNaTrilha = React.useCallback(
    (clientY: number) => {
      const trilha = trilhaRef.current;
      const area = areaRef.current;
      if (!trilha || !area || !atalhos.length) return;

      const medidaTrilha = trilha.getBoundingClientRect();
      const proporcao = (clientY - medidaTrilha.top) / medidaTrilha.height;
      const posicao = lodash.clamp(
        Math.floor(proporcao * atalhos.length),
        0,
        atalhos.length - 1
      );
      const atalho = atalhos[posicao];
      const medidaArea = area.getBoundingClientRect();

      irParaLetra(atalho.indice);
      setBolha({
        letra: atalho.letra,
        y: lodash.clamp(
          clientY - medidaArea.top,
          40,
          Math.max(40, medidaArea.height - 40)
        ),
      });
    },
    [atalhos, irParaLetra]
  );

  const soltarTrilha = React.useCallback(() => {
    arrastandoRef.current = false;
    setBolha(null);
  }, []);

  const alturaLinha = React.useCallback(
    (index: number, { linhas: linhasDaVez }: TRowProps) =>
      linhasDaVez[index].tipo === "letra"
        ? ALTURA_LINHA_LETRA
        : ALTURA_LINHA_POST,
    []
  );

  const chaveLinha = React.useCallback(
    (index: number, { linhas: linhasDaVez }: TRowProps) => {
      const linha = linhasDaVez[index];
      return linha.tipo === "letra" ? `letra-${linha.letra}` : linha.post.id;
    },
    []
  );

  const rowProps = React.useMemo(
    () => ({ linhas, hasStar, termosBusca }),
    [linhas, hasStar, termosBusca]
  );

  const totalFiltrado = itensFiltrados.length;
  const resumo = termo
    ? `${totalFiltrado} ${
        totalFiltrado === 1 ? "resultado" : "resultados"
      } para “${filtro.trim()}”`
    : `${itens.length} ${
        itens.length === 1 ? "publicação" : "publicações"
      } em ordem alfabética`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowY: "hidden",
      }}
    >
      <Paper
        elevation={0}
        square
        sx={{
          px: 2,
          pt: 1.5,
          pb: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            height: 44,
            px: 1.5,
            borderRadius: 999,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "rgba(93, 107, 196, 0.06)",
          }}
        >
          <Box aria-hidden sx={{ display: "flex", color: "text.disabled" }}>
            <Icon icon={roundSearch} width={20} height={20} />
          </Box>
          <InputBase
            id="ListSection-InputBase-filtro"
            value={filtro}
            onChange={(evento) => aplicarFiltro(evento.target.value)}
            placeholder="Buscar nesta categoria"
            inputProps={{
              "aria-label": "Buscar publicações desta categoria pelo título",
            }}
            sx={{ flexGrow: 1, fontSize: "0.9375rem" }}
          />
          {filtro ? (
            <IconButton
              id="ListSection-IconButton-limpar_filtro"
              aria-label="limpar busca"
              size="small"
              onClick={() => aplicarFiltro("")}
              sx={{ color: "text.secondary", flexShrink: 0 }}
            >
              <Icon icon={roundClose} width={18} height={18} />
            </IconButton>
          ) : null}
        </Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 0.75, px: 0.5 }}
        >
          {resumo}
        </Typography>
      </Paper>

      {linhas.length ? (
        <Box
          ref={areaRef}
          sx={{ flex: 1, minHeight: 0, display: "flex", position: "relative" }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <List
              listRef={listRef}
              rowComponent={Row}
              rowCount={linhas.length}
              rowHeight={alturaLinha}
              rowKey={chaveLinha}
              rowProps={rowProps}
              overscanCount={5}
              onRowsRendered={({ startIndex }) => setIndiceVisivel(startIndex)}
              style={{ height: "100%", width: "100%" }}
            />
          </Box>

          <Box
            role="navigation"
            aria-label="Ir para a letra"
            onPointerDown={(evento) => {
              evento.currentTarget.setPointerCapture(evento.pointerId);
              arrastandoRef.current = true;
              arrastarNaTrilha(evento.clientY);
            }}
            onPointerMove={(evento) => {
              if (arrastandoRef.current) arrastarNaTrilha(evento.clientY);
            }}
            onPointerUp={soltarTrilha}
            onPointerCancel={soltarTrilha}
            sx={{
              width: LARGURA_TRILHA,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderLeft: "1px solid",
              borderColor: "divider",
              bgcolor: "background.default",
              touchAction: "none",
              userSelect: "none",
              cursor: "pointer",
            }}
          >
            <Box
              ref={trilhaRef}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                height: `min(100%, ${atalhos.length * ALTURA_LETRA}px)`,
              }}
            >
              {atalhos.map((atalho) => {
                const isAtiva = atalho.letra === letraAtiva;

                return (
                  <Box
                    key={atalho.letra}
                    component="button"
                    type="button"
                    id={`ListSection-Letra-${atalho.letra}`}
                    aria-label={`Ir para a letra ${atalho.letra}`}
                    aria-current={isAtiva ? "true" : undefined}
                    onClick={() => irParaLetra(atalho.indice)}
                    sx={{
                      flex: "1 1 0",
                      minHeight: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 0,
                      border: 0,
                      background: "none",
                      font: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        lineHeight: 1,
                        transition:
                          "background-color .15s ease, color .15s ease",
                        bgcolor: isAtiva ? "primary.main" : "transparent",
                        color: isAtiva
                          ? "primary.contrastText"
                          : "text.secondary",
                      }}
                    >
                      {atalho.letra}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {bolha ? (
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                right: LARGURA_TRILHA + 10,
                top: bolha.y,
                transform: "translateY(-50%)",
                width: 60,
                height: 60,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: tokens.gradienteMarca,
                boxShadow: tokens.sombraFlutuante,
                color: "primary.contrastText",
                pointerEvents: "none",
              }}
            >
              <Typography
                variant="h3"
                component="span"
                sx={{ color: "inherit" }}
              >
                {bolha.letra}
              </Typography>
            </Box>
          ) : null}
        </Box>
      ) : (
        <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
          <EstadoVazio
            icone={outlineSearchOff}
            titulo={termo ? "Nada encontrado por aqui" : "Categoria sem posts"}
            descricao={
              termo ? (
                <>
                  Nenhuma publicação desta categoria combina com{" "}
                  <strong>“{filtro.trim()}”</strong>. Tente outra palavra ou use
                  a busca geral do app.
                </>
              ) : (
                "Esta categoria ainda não tem publicações."
              )
            }
          />
        </Box>
      )}
    </Box>
  );
}
