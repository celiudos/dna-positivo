import ContainerApp from "@components/ContainerApp";
import ListSection from "@components/ListSection";
import MainAppBar from "@components/MainAppBar";
import TelaLoading from "@components/TelaLoading";
import ApiApp from "@data/ApiApp";
import { IPost } from "@typesApp/IPost";
import BaixarPostsDoBloger from "@utils/BaixarPostsDoBloger";
import lodash from "lodash";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

type Props = {
  posts: IPost[];
};

export default function Tecnicas({ posts }: Props) {
  const router = useRouter();

  useEffect(() => {
    async function init() {
      const itens = ApiApp.getTodos();
      const itens2 =
        (await BaixarPostsDoBloger.getTodosSelecionados()) as IPost[];
      console.log("itens:", itens.length, itens2.length);

      const diff = lodash.differenceBy(itens, itens2, "id");
      console.log("diff:", diff);
    }
    init();
  }, []);

  if (router.isFallback) return <TelaLoading />;

  return (
    <ContainerApp title={posts[0].catName} description={"Categoria"}>
      <MainAppBar title={posts[0].catName} hrefVoltar="/" />
      <main>
        <ListSection itens={posts} />
      </main>
    </ContainerApp>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

type Params = {
  params: {
    catId: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const posts = await ApiApp.getTodosENovos();

  const postsCat = posts.filter((item) => item.cat.toString() === params.catId);
  return {
    props: { posts: postsCat },
  };
}
