import CategoriaGrid from "@components/CategoriaGrid";
import ContainerApp from "@components/ContainerApp";
import DestaquesLista from "@components/DestaquesLista";
import HomeFooter from "@components/HomeFooter";
import HomeHero from "@components/HomeHero";
import ListHeader from "@components/ListHeader";
import ListItens from "@components/ListItens";
import MainAppBar from "@components/MainAppBar";
import PublicacoesRecomendadas from "@components/PublicacoesRecomendadas";
import ApiPost from "@lib/ApiPost";
import { Alert, AlertTitle, Box, Stack } from "@mui/material";
import { IPost } from "@typesApp/IPost";
import configApp from "configApp";

type Props = {
  postsNovos: IPost[];
  postsAlterados: IPost[];
  postsParaRecomendacao: IPost[];
  totalPorCategoria: { [cat: string]: number };
};

export default function Index({
  postsNovos,
  postsAlterados,
  postsParaRecomendacao,
  totalPorCategoria,
}: Props) {
  return (
    <ContainerApp>
      <MainAppBar />
      <main>
        <HomeHero />

        <Stack spacing={4} sx={{ px: 2, pb: 5 }}>
          <Box component="section">
            <ListHeader
              primary="Explorar"
              secondary="Todas as explicações detalhadas sobre cada técnica"
              modal={configApp.introducao}
            />
            <CategoriaGrid totalPorCategoria={totalPorCategoria} />
          </Box>

          <Box component="section">
            <ListHeader
              primary="Destaques"
              secondary="Conteúdos selecionados para começar"
            />
            <DestaquesLista itens={configApp.postsDestaques} />
          </Box>

          <PublicacoesRecomendadas posts={postsParaRecomendacao} />

          {postsNovos.length ? (
            <Box component="section">
              <ListHeader
                primary="Novas publicações"
                secondary="Adicionadas nos últimos dias"
              />
              <ListItens hasData itens={postsNovos} />
            </Box>
          ) : null}

          {postsAlterados.length ? (
            <Box component="section">
              <ListHeader
                primary="Publicações atualizadas"
                secondary="Revisadas recentemente"
              />
              <ListItens hasData itens={postsAlterados} />
            </Box>
          ) : null}

          {configApp.muralDeAvisos.length ? (
            <Alert severity="info">
              <AlertTitle>Avisos</AlertTitle>
              {configApp.muralDeAvisos.map((item, key) => (
                <div key={key}>{item}</div>
              ))}
            </Alert>
          ) : null}

          <HomeFooter />
        </Stack>
      </main>
    </ContainerApp>
  );
}

export async function getStaticProps() {
  const postsNovos = await ApiPost.getPostsRecentes({});

  // Um post recém-publicado também conta como recém-atualizado. Excluindo os
  // novos aqui, cada post aparece em uma seção só e "Publicações atualizadas"
  // fica reservada para o que foi de fato revisado depois de publicado.
  const postsAlterados = await ApiPost.getPostsRecentes({
    orderBy: "updated",
    excluirIds: postsNovos.map((post) => post.id),
  });
  const totalPorCategoria = await ApiPost.getTotalPorCategoria();
  const postsParaRecomendacao = await ApiPost.getPostsParaRecomendacao();

  return {
    props: {
      postsNovos,
      postsAlterados,
      postsParaRecomendacao,
      totalPorCategoria,
    },
    revalidate: configApp.nextJs.revalidate,
  };
}
