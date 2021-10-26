import { ItemProps } from "@components/ListItens";
import { ListSubheader, Tab, Tabs, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextUtils from "@utils/TextUtils";
import lodash from "lodash";
import * as React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import styled from "styled-components";

type AgrupamentoPorLetrasProps = {
  isSubheader: boolean;
} & ItemProps;

type Props = {
  itens: AgrupamentoPorLetrasProps[];
};

function agruparPorLetras(rawData: [], key: string) {
  const semEspaco = rawData.map((r: any) => ({ ...r, [key]: r[key].trim() }));
  const ordenado = lodash.orderBy(semEspaco, key);
  let firstLetterActual = "";
  let data = ordenado.reduce((r: any, e: any) => {
    let firstLetter = e[key][0];

    if (firstLetter !== firstLetterActual) {
      r.push({
        title: firstLetter,
        href: "",
        hasStar: false,
        isSubheader: true,
      });
      firstLetterActual = firstLetter;
    }
    return r.concat({ ...e, isSubheader: false });
  }, []);
  return data;
}

export default function ListSection({ itens }: Props) {
  const [itensFormatados, setItensFormatados] = React.useState<
    AgrupamentoPorLetrasProps[]
  >([]);

  const listRef = React.useRef(null);

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

  return (
    <ContainerCss>
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
                onClick={() => {
                  /* @ts-ignore */
                  return listRef.current.scrollToItem(item.ind, "start");
                }}
              />
            ))
          : null}
      </Tabs>
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef}
            height={height}
            width={width}
            itemSize={76}
            itemCount={itensFormatados.length}
            overscanCount={5}
          >
            {(props: ListChildComponentProps) => {
              const { index, style } = props;
              const item = itensFormatados[index];

              return item.isSubheader ? (
                <ListSubheaderCss style={style} key={index}>
                  <Typography variant="h5">{item.title}</Typography>
                </ListSubheaderCss>
              ) : (
                <ListItem
                  divider
                  style={style}
                  key={index}
                  component="div"
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemText
                      primary={TextUtils.limitarTexto(item.title, 120)}
                    />
                  </ListItemButton>
                </ListItem>
              );
            }}
          </List>
        )}
      </AutoSizer>
    </ContainerCss>
  );
}

const ContainerCss = styled.div`
  height: 80vh;
  width: 100%;
`;

const ListSubheaderCss = styled(ListSubheader)`
  background: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
`;
