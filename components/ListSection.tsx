import styled from '@emotion/styled';
import { Chip, ListSubheader, Paper, Tab, Tabs, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { IListItem } from '@typesApp/IListItem';
import { IPost } from '@typesApp/IPost';
import DateUtils from '@utils/DateUtils';
import GenericUtils from '@utils/GenericUtils';
import TextUtils from '@utils/TextUtils';
import lodash from 'lodash';
import Link from 'next/link';
import * as React from 'react';
import { List, RowComponentProps, useListRef } from 'react-window';

import EstrelaFavorito from './EstrelaFavorito';

function agruparPorLetras(rawData: [], key: string) {
  const semEspaco = rawData.map((r: any) => ({
    ...r,
    [key]: r[key].trim(),
  })) as [];
  // const ordenado = lodash.orderBy(semEspaco, key);
  const ordenado = GenericUtils.orderByLocale(semEspaco, key);
  let firstLetterActual = "";
  let data = ordenado.reduce((r: any, e: any) => {
    let firstLetter = TextUtils.stringToSlugSemHifen(e[key][0]);

    // if (firstLetter === "o") {
    //   console.log("e[key]:", e[key], firstLetter);
    // }

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
    <ListSubheader
      component="div"
      style={{
        ...style,
        background: "#f4f4f4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">{item.title}</Typography>
    </ListSubheader>
  ) : (
    <ListItem
      divider
      style={{ ...style, backgroundColor: "#FFF" }}
      component="div"
      disablePadding
      secondaryAction={hasStar ? <EstrelaFavorito item={item} /> : null}
    >
      <ListItemButton
        component={Link}
        href={item.href || ""}
        id={idListItemButton}
        style={{ height: "100%" }}
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

  // console.log("itensFormatados:", itensFormatados);

  return (
    <ContainerCss>
      <Paper variant="outlined" square>
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={valueTab}
          onChange={handleChangeTab}
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
  /* height: 80vh;
  width: 100%; */
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: hidden;
`;

const ContainerAutoSizerCss = styled.div`
  flex: 1;
`;
