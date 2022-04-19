import { IPost } from "@typesApp/IPost";
import BaixarPostsDoBlogger from "@utils/BaixarPostsDoBlogger";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { catId },
  } = req;

  let posts: IPost[] = [];
  let status = "";

  try {
    if (catId) {
      posts = await BaixarPostsDoBlogger.getTodosSelecionados(
        catId.toString(),
        {
          "max-results": "5",
          "start-index": "1",
        }
      );
    } else {
      status = "Erro: não há o parâmetro catId";
      res.status(400).json({ catId, status, count: 0, posts: [] });
    }

    res.status(200).json({
      catId,
      status,
      count: posts.length,
      posts,
    });
  } catch (error) {
    status = "Error : " + error;
    res.status(400).json({ catId, status, count: 0, posts: [] });
  }
}
