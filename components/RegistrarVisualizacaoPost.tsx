import { IPost } from "@typesApp/IPost";
import RecomendacoesStorageUtils from "@utils/RecomendacoesStorageUtils";
import * as React from "react";

type Props = {
  post: Pick<IPost, "id" | "title" | "resumo">;
};

/**
 * Sem UI própria: só registra no localStorage as palavras-chave do post
 * assim que a tela de leitura monta, alimentando o perfil de interesse que
 * a Home usa para montar "Publicações Recomendadas" (ver
 * RecomendacoesStorageUtils e PublicacoesRecomendadas). Fica isolado da
 * tela de post para não misturar leitura de conteúdo com rastreio de
 * comportamento.
 */
export default function RegistrarVisualizacaoPost({ post }: Props) {
  React.useEffect(() => {
    if (!post.id) return;
    RecomendacoesStorageUtils.registrarVisualizacao(post);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.id]);

  return null;
}
