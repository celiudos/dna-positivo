import ContainerApp from "@components/ContainerApp";
import ListHeader from "@components/ListHeader";
import MainAppBar from "@components/MainAppBar";
import ApiSearch from "@lib/ApiSearch";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
} from "@mui/material";
import { IPost } from "@typesApp/IPost";
import DateUtils from "@utils/DateUtils";
import lodash from "lodash";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function Atualizar() {
  const [postsNovos, setPostsNovos] = useState<IPost[]>([]);
  const [postsAlterados, setPostsAlterados] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);

  const pageSize = 5;

  const forcarAtualizacao = useCallback(async (abriNovaAba: boolean) => {
    setLoading(true);

    const response = await fetch("/api/atualizar");
    const data = await response.json();
    const postsTodos = (data.posts || []) as IPost[];

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
    <ContainerApp title="Atualizar">
      <MainAppBar title="Atualizar conteúdo" hrefVoltar="/" />
      <main>
        <Stack spacing={3} sx={{ px: 2, py: 2.5, pb: 5 }}>
          <Paper variant="outlined" sx={{ borderRadius: 3, p: 2.5 }}>
            <Stack spacing={1.5}>
              <Button
                variant="contained"
                fullWidth
                disabled={loading}
                onClick={() => forcarAtualizacao(false)}
                endIcon={
                  loading ? <CircularProgress color="inherit" size={18} /> : null
                }
              >
                Forçar atualização
              </Button>
              <Button
                variant="outlined"
                fullWidth
                disabled={loading}
                onClick={() => forcarAtualizacao(true)}
                endIcon={
                  loading ? <CircularProgress color="inherit" size={18} /> : null
                }
              >
                Apenas exibir posts atualizados
              </Button>
              <Alert severity="info">
                O botão de forçar atualização abre uma nova aba na Home. Isso é
                necessário para concluir a atualização.
              </Alert>
            </Stack>
          </Paper>

          {postsNovos.length ? (
            <Box component="section">
              <ListHeader primary="Novas publicações" />
              <ListItensDetalhes posts={postsNovos} />
            </Box>
          ) : null}
          {postsAlterados.length ? (
            <Box component="section">
              <ListHeader primary="Publicações atualizadas" />
              <ListItensDetalhes posts={postsAlterados} />
            </Box>
          ) : null}
        </Stack>
      </main>
    </ContainerApp>
  );
}

function ListItensDetalhes({ posts }: { posts: IPost[] }) {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
      <List component="nav" aria-label="Lista de itens" disablePadding>
        {posts
          ? posts.map((item, key) => {
              const idListItemButton = `ListItens-ListItemButton-${key}-${lodash.snakeCase(
                item.title
              )}`;

              return (
                <ListItem
                  key={key}
                  disablePadding
                  sx={{
                    "&:not(:last-of-type)": {
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    },
                  }}
                >
                  <ListItemButton
                    component={Link}
                    href={item.href || ""}
                    id={idListItemButton}
                    sx={{ px: 2, py: 1.5 }}
                  >
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
