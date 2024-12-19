import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { IPostYoutube } from "@typesApp/IPost";
import { RootState } from "@store/storeConfig";
import { useDispatch, useSelector } from "react-redux";
import ApiPost from "@lib/ApiPost";
import { allPostsAction } from "@store/actionCreator";

function extrairUrlYoutube(content: string): string[] {
  const regex =
    /href="(https?:\/\/(?:www\.)?youtube\.com\/[^\s"]+|https?:\/\/youtu\.be\/[^\s"]+)"/gi;

  /* @ts-ignore */
  const matches = [...content.matchAll(regex)];
  const urls = matches.map((match) => match[1]); // Extrai apenas as URLs
  return urls;
}

function extrairImgYoutube(content: string): string[] {
  const regex = /<img\s+[^>]*src="([^"]+)"/gi;

  /* @ts-ignore */
  const matches = [...content.matchAll(regex)];
  const urls = matches.map((match) => match[1]); // Extrai apenas as URLs
  const urlsAjustadas = urls.map((url) => {
    return url.replaceAll('"', "'").replaceAll("\\", "");
  });
  return urlsAjustadas;
}

export const useFuseSearch = (textoPesquisa: string, limiteCerteza = 80) => {
  const [fuseObj, setFuseObj] = useState<Fuse<IPostYoutube> | null>(null);
  const { allPosts } = useSelector((state: RootState) => state.rootReducer);
  const [resultIncerto, setResultIncerto] = useState<IPostYoutube[]>([]);
  const [resultCerteza, setResultCerteza] = useState<IPostYoutube[]>([]);

  const [formatPosts, setformatPosts] = useState<IPostYoutube[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!allPosts)
      ApiPost.setAllPosts().then((posts) => dispatch(allPostsAction(posts)));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPosts]);

  useEffect(() => {
    if (!allPosts) return;
    // filter posts with "contentSanitized" containing a url for youtube
    const filterPostYoutube: IPostYoutube[] = allPosts.filter(
      (post: IPostYoutube) => post.contentSanitized.indexOf("youtube") !== -1
    );

    // extract the url from all href param containing "https://www.youtube.com" from youtube to a key "youtubeUrl"
    const formatPosts: IPostYoutube[] = filterPostYoutube.map((result) => {
      let youtubeUrl = "";
      let youtubeImg = "";

      const findYoutube = extrairUrlYoutube(result.contentSanitized);
      const findImgYoutube = extrairImgYoutube(result.contentSanitized);

      if (findYoutube) {
        youtubeUrl = findYoutube[0];
      }

      if (findImgYoutube) {
        youtubeImg = findImgYoutube[0];
      }
      return {
        ...result,
        youtubeUrl,
        youtubeImg,
      };
    });

    const formatPostsSemAcento = formatPosts.map((post) => ({
      ...post,
      titleSemAcento: post.title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""),
    }));

    setformatPosts(formatPostsSemAcento);
  }, [allPosts]);

  useEffect(() => {
    if (!formatPosts) return;

    const fuse = new Fuse(formatPosts, {
      includeScore: true,
      threshold: 0.3,
      keys: [
        {
          name: "titleSemAcento",
          weight: 0.7,
        },
        {
          name: "resumo",
          weight: 0.3,
        },
      ],
    });

    setFuseObj(fuse);
  }, [formatPosts]);

  useEffect(() => {
    if (!fuseObj || !textoPesquisa) return;
    // console.log("fuseObj:", fuseObj);
    // console.log("textoPesquisa:", textoPesquisa);

    const results = fuseObj.search(textoPesquisa);
    // console.log("results:", results);

    const resultsPosts: IPostYoutube[] = results.map((result) => ({
      ...result.item,
      score: result.score
        ? parseFloat(((result.score - 1) * -1).toFixed(2)) * 100
        : 0,
    }));

    // console.log("resultsPosts:", resultsPosts);

    const postCerteza = resultsPosts.filter(
      (post) => post.score >= limiteCerteza
    );
    // console.log("postCerteza:", postCerteza);
    setResultIncerto(resultsPosts as IPostYoutube[]);

    const postCertezaPrimeiro = postCerteza[0];
    setResultCerteza(postCertezaPrimeiro ? [postCertezaPrimeiro] : []);
  }, [fuseObj, limiteCerteza, textoPesquisa]);

  return [resultCerteza, resultIncerto];
};
