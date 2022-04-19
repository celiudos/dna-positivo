import { TArquivoParams } from "@typesApp/IArquivo";
import BaixarPostsDoBlogger from "@utils/BaixarPostsDoBlogger";
import FilesUtils from "@utils/FileUtils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { catId },
  } = req;

  let posts = [];
  let responseArquivo: TArquivoParams | null;
  let status = "";
  const arquivo = {
    dir: "data/todos-os-posts.json",
  };

  try {
    if (catId) {
      posts = await BaixarPostsDoBlogger.getTodosSelecionados(catId.toString());
      responseArquivo = await FilesUtils.atualizarArquivo({
        conteudo: posts,
        arquivo,
      });
    } else {
      posts = await BaixarPostsDoBlogger.getTodosSelecionados();
      responseArquivo = await FilesUtils.criarArquivo({
        conteudo: posts,
        arquivo,
      });
    }

    if (responseArquivo) {
      const qnt = responseArquivo.conteudo?.length || 0;
      // status = `Baixados ${
      //   posts.length
      // } posts. Total de posts no arquivo: ${qnt}. Adicionados ${Math.abs(
      //   qnt - posts.length
      // )} posts.`;
      status = `Baixados ${posts.length} posts. Total de posts no arquivo: ${qnt}.`;
    } else {
      status = `Nada encontrado para atualizar`;
    }

    res.status(200).json({
      catId,
      status,
      count: responseArquivo?.conteudo?.length,
      posts: responseArquivo?.conteudo,
    });
  } catch (error) {
    status = "Error : " + error;
    res.status(400).json({ catId, status, count: 0, posts: [] });
  }
}
