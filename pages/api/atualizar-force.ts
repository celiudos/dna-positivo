import BaixarPostsDoBlogger from "@utils/BaixarPostsDoBlogger";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let posts = [];
  let status = "";

  try {
    posts = await BaixarPostsDoBlogger.getTodosSelecionados();

    status = `Baixados ${posts.length} posts.`;
    res.status(200).json({
      status,
      count: posts.length,
      posts,
    });
  } catch (error) {
    status = "Error : " + error;
    res.status(400).json({ status, count: 0, posts: [] });
  }
}
