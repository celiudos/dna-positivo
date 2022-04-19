import ApiSearch from "@lib/ApiSearch";
import {
  allPostsAction,
  postsAction,
  postsNovosAction,
} from "@store/actionCreator";
import { RootState } from "@store/storeConfig";
import BaixarPostsDoBlogger from "@utils/BaixarPostsDoBlogger";
import GenericUtils from "@utils/GenericUtils";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function InitReducePosts() {
  const dispatch = useDispatch();
  const { posts, postsNovos } = useSelector(
    (state: RootState) => state.rootReducer
  );

  useEffect(() => {
    async function init() {
      const response = await axios(
        `${GenericUtils.getUrlBase()}api/ultimos-posts?catId=4`
      );
      console.log("response:", response);

      if (response.status === 200) {
        dispatch(postsNovosAction(response.data.results));
      }
    }
    init();
  }, [dispatch]);

  useEffect(() => {
    async function init() {
      const posts = await BaixarPostsDoBlogger.getDefaultPost();
      dispatch(postsAction(posts));
    }
    init();
  }, [dispatch]);

  useEffect(() => {
    async function init() {
      const allPosts = [...posts, ...postsNovos];
      ApiSearch.setAllPosts(allPosts);
      dispatch(allPostsAction(allPosts));
    }
    if (posts && postsNovos) init();
  }, [dispatch, posts, postsNovos]);

  return null;
}
