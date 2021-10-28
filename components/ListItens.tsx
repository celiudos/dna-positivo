import { ListItem, ListItemButton, Paper } from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { carregandoPaginaAction } from "@store/actionCreator";
import { IListItem } from "@typesApp/IListItem";
import DateUtils from "@utils/DateUtils";
import Link from "next/link";
import * as React from "react";
import { useDispatch } from "react-redux";
import EstrelaFavorito from "./EstrelaFavorito";

export default function ListItens({
  itens,
  hasData = false,
  hasStar = true,
}: IListItem) {
  const dispatch = useDispatch();

  return (
    <Paper>
      <List component="nav" aria-label="Lista de itens" disablePadding>
        {itens
          ? itens.map((item, key) => {
              const data = hasData
                ? " - " +
                  DateUtils.formatarDataDatetimeUX({
                    data: item.updated,
                  })
                : "";

              return (
                <ListItem
                  key={key}
                  secondaryAction={
                    hasStar ? <EstrelaFavorito item={item} /> : null
                  }
                  disablePadding
                >
                  <Link href={item.href || ""} passHref>
                    <ListItemButton
                      divider
                      onClick={(): void => {
                        dispatch(carregandoPaginaAction());
                      }}
                    >
                      <ListItemText
                        primary={item.title}
                        secondary={`${item.catName}${data}`}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              );
            })
          : null}
      </List>
    </Paper>
  );
}

{
  /* <ItemDaLista
                  key={key}
                  hasStar={hasStar}
                  item={item}
                  data={data}
                /> */
}
// function ItemDaLista({
//   hasStar,
//   item,
//   data,
// }: {
//   hasStar: boolean;
//   item: IPost;
//   data: string;
// }): JSX.Element {
//   const [loading, setLoading] = React.useState(false);
//   function handleClick() {
//     setLoading(true);
//   }

//   return (
//     <ListItem
//       secondaryAction={hasStar ? <EstrelaFavorito item={item} /> : null}
//       disablePadding
//     >
//       <Link href={item.href || ""} passHref>
//         <ListItemButton
//           divider
//           component={LoadingButton}
//           onClick={handleClick}
//           loading={loading}
//         >
//           <ListItemText
//             primary={item.title}
//             secondary={`${item.catName}${data}`}
//           />
//         </ListItemButton>
//       </Link>
//     </ListItem>
//   );
// }
