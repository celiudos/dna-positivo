import styled from "@emotion/styled";
import roundChevronRight from "@iconify/icons-ic/round-chevron-right";
import { Icon } from "@iconify/react";
import { Box, Chip, Paper, Tab, Tabs, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { IListItem } from "@typesApp/IListItem";
import { IPost } from "@typesApp/IPost";
import DateUtils from "@utils/DateUtils";
import GenericUtils from "@utils/GenericUtils";
import TextUtils from "@utils/TextUtils";
import lodash from "lodash";
import Link from "next/link";
import * as React from "react";
import { List, RowComponentProps, useListRef } from "react-window";

import EstrelaFavorito from "./EstrelaFavorito";

function agruparPorLetras(rawData: [], key: string) {
  const semEspaco = rawData.map((r: any) => ({
    ...r,
    [key]: r[key].trim(),
  })) as [];
  const ordenado = GenericUtils.orderByLocale(semEspaco, key);
  let firstLetterActual = "";
  let data = ordenado.reduce((r: any, e: any) => {
    let firstLetter = TextUtils.stringToSlugSemHifen(e[key][0]);

    if (firstLetter !== firstLetterActual) {
      r.push({
        title: firstLetter.toUpperCase(),
        href: "",
        isSubheader: true,
      });
      firstLetterActual = TextUtils.stringToSlugSemHifen(firstLetter);
    }
    return r.concat({ ...e, isSubheader: false });
  }, []);
  return data;
}

type TRowProps = {
  itens: IPost[];
  hasStar: boolean;
};

function Row({ index, style, itens, hasStar }: RowComponentProps<TRowProps>) {
  const item = itens[index];
  const idListItemButton = `ListItens-ListItemButton-${index}-${lodash.snakeCase(
    item.title
  )}`;

  const isPostMenorQueDiasDiff = DateUtils.isPostMenorQueDiasDiff(
    item.published
  );

  return item.isSubheader ? (
    <Box
      component="div"
      style={style}
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2,
        bgcolor: "var(--app-superficie, #f5f6fb)",
      }}
    >
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(93, 107, 196, 0.12)",
          color: "primary.dark",
          mr: 1.5,
        }}
      >
        <Typography variant="subtitle2" component="span">
          {item.title}
        </Typography>
      </Box>
      <Box
        sx={{ flexGrow: 1, height: "1px", bgcolor: "divider" }}
        aria-hidden
      />
    </Box>
  ) : (
    <ListItem
      style={style}
      component="div"
      disablePadding
      secondaryAction={hasStar ? <EstrelaFavorito item={item} /> : null}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <ListItemButton
        component={Link}
        href={item.href || ""}
        id={idListItemButton}
        sx={{ height: "100%", px: 2, gap: 1 }}
      >
        <ListItemText
          primary={
            <>
              {TextUtils.limitarTexto(item.title, 80)}{" "}
              {isPostMenorQueDiasDiff ? (
                <Chip label={"Novo!"} color="secondary" size="small" />
              ) : null}
            </>
          }
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

export default function ListSection({ itens, hasStar = true }: IListItem) {
  const [itensFormatados, setItensFormatados] = React.useState<IPost[]>([]);

  const listRef = useListRef(null);

  React.useEffect(() => {
    const itensAgrupados = agruparPorLetras(itens as [], "title") as [];
    setItensFormatados(itensAgrupados);
  }, [itens]);

  const [valueTab, setValueTab] = React.useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  const apenasItensSubheaders = itensFormatados
    .map((i, key) => ({ ...i, ind: key }))
    .filter((item) => item.isSubheader);

  const rowProps = React.useMemo(
    () => ({ itens: itensFormatados, hasStar }),
    [itensFormatados, hasStar]
  );

  return (
    <ContainerCss>
      <Paper
        elevation={0}
        square
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          value={valueTab}
          onChange={handleChangeTab}
          aria-label="Filtrar publicações por letra"
          sx={{ minHeight: 46, px: 0.5 }}
        >
          {apenasItensSubheaders
            ? apenasItensSubheaders.map((item, key) => (
                <Tab
                  key={key}
                  value={key}
                  label={item.title}
                  onClick={() =>
                    listRef.current?.scrollToRow({
                      index: item.ind,
                      align: "start",
                    })
                  }
                />
              ))
            : null}
        </Tabs>
      </Paper>
      <ContainerAutoSizerCss>
        <List
          listRef={listRef}
          rowComponent={Row}
          rowCount={itensFormatados.length}
          rowHeight={76}
          rowProps={rowProps}
          overscanCount={5}
          style={{ height: "100%", width: "100%" }}
        />
      </ContainerAutoSizerCss>
    </ContainerCss>
  );
}

const ContainerCss = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: hidden;
`;

const ContainerAutoSizerCss = styled.div`
  flex: 1;
`;
