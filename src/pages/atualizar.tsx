
import ContainerApp from "@/components/ContainerApp";
import ListHeader from "@/components/ListHeader";
import MainAppBar from "@/components/MainAppBar";
import ApiPost from "@/lib/ApiPost";
import ApiSearch from "@/lib/ApiSearch";
import { DisplayFlexCenter } from "@/styles/DisplayFlex";
import DateUtils from "@/utils/DateUtils";
import {
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import lodash from "lodash";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function Atualizar() {
  const [postsNovos, setPostsNovos] = useState<IPost[]>([]);
  const [postsAlterados, setPostsAlterados] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);

  const pageSize = 5;

  const forcarAtualizacao = useCallback(async (abriNovaAba) => {
    setLoading(true);

    const postsTodos = await ApiPost.getTodosPosts(true);

    ApiSearch.setAllPosts(postsTodos);

    const postsNovos = ApiSearch.search({
      pageSize,
      orderBy: "published",
    });
    setPostsNovos(postsNovos.results);

    const postsAlterados = ApiSearch.search({
      pageSize,
      orderBy: "updated",
    });
    setPostsAlterados(postsAlterados.results);
    setLoading(false);

    if (!abriNovaAba) {
      // abrir outra aba na Home
      window.open("/", "_blank");
    }
  }, []);

  return (
    <ContainerApp>
      <MainAppBar />
      <main>
        <Grid container>
          <Grid size={12} mt={2}>
            <DisplayFlexCenter>
              <Stack>
                <Button
                  variant="contained"
                  onClick={() => forcarAtualizacao(false)}
                >
                  Forçar Atualização
                  {loading && <CircularProgress color="success" size={24} />}
                </Button>
                <span>
                  Vai abrir nova aba na Home. É necessário para concluir a
                  atualização!.
                </span>
              </Stack>
            </DisplayFlexCenter>
          </Grid>
          <Grid size={12} mt={2}>
            <DisplayFlexCenter>
              <Button variant="outlined" onClick={() => forcarAtualizacao(true)}>
                Apenas exibir posts atualizados abaixo
                {loading && <CircularProgress color="success" size={24} />}
              </Button>
            </DisplayFlexCenter>
          </Grid>
          <Grid container spacing={4}>
            {postsNovos.length ? (
              <Grid size={12}>
                <ListHeader primary="Novas publicações" />
                <ListItensDetalhes posts={postsNovos} />
              </Grid>
            ) : null}
            {postsAlterados.length ? (
              <Grid size={12}>
                <ListHeader primary="Publicações atualizadas" />
                <ListItensDetalhes posts={postsAlterados} />
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </main>
    </ContainerApp>
  );
}

function ListItensDetalhes({ posts }: { posts: IPost[] }) {
  return (
    <Paper>
      <List component="nav" aria-label="Lista de itens" disablePadding>
        {posts
          ? posts.map((item, key) => {
            const idListItemButton = `ListItens-ListItemButton-${key}-${lodash.snakeCase(
              item.title
            )}`;

            return (
              <ListItem key={key} disablePadding>
                <ListItemButton id={idListItemButton} divider
                  href={item.href || ""}
                  component={Link}>
                  <ListItemText
                    primary={item.title}
                    secondary={
                      <Stack component="span">
                        <span>
                          Publicado:{" "}
                          {DateUtils.formatarDataDatetimeUX({
                            data: item.published,
                            formato: "dd/MM/yyyy HH:mm",
                          })}
                        </span>
                        <span>
                          Atualizado:{" "}
                          {DateUtils.formatarDataDatetimeUX({
                            data: item.updated,
                            formato: "dd/MM/yyyy HH:mm",
                          })}
                        </span>
                      </Stack>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })
          : null}
      </List>
    </Paper>
  );
}
