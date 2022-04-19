import { postsAction, postsNovosAction } from "@store/actionCreator";
import BaixarPostsDoBlogger from "@utils/BaixarPostsDoBlogger";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function InitReducePosts() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function init() {
      const posts = await BaixarPostsDoBlogger.getTodosSelecionados("4");
      dispatch(postsNovosAction(posts));
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

  return null;
}
