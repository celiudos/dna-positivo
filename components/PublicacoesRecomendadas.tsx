import ListHeader from "@components/ListHeader";
import ListItens from "@components/ListItens";
import { Box } from "@mui/material";
import { IPost } from "@typesApp/IPost";
import RecomendacoesStorageUtils from "@utils/RecomendacoesStorageUtils";
import * as React from "react";

const QUANTIDADE_RECOMENDACOES = 3;

type Props = {
  posts: IPost[];
};

/**
 * "Publicações Recomendadas": só existe no cliente porque depende do perfil
 * de interesse salvo no localStorage (ver RecomendacoesStorageUtils, que
 * RegistrarVisualizacaoPost alimenta a cada post lido). Calcula só depois de
 * montar para não divergir do HTML gerado no servidor, e enquanto não há
 * sinal suficiente do usuário (nenhum post pontuou) a seção inteira fica
 * oculta em vez de mostrar uma lista vazia ou genérica.
 */
export default function PublicacoesRecomendadas({ posts }: Props) {
  const [recomendados, setRecomendados] = React.useState<IPost[]>([]);

  React.useEffect(() => {
    setRecomendados(
      RecomendacoesStorageUtils.recomendar(posts, QUANTIDADE_RECOMENDACOES)
    );
  }, [posts]);

  if (!recomendados.length) return null;

  return (
    <Box component="section">
      <ListHeader
        primary="Publicações Recomendadas"
        secondary="Sugestões com base no que você já leu"
      />
      <ListItens hasData itens={recomendados} />
    </Box>
  );
}
