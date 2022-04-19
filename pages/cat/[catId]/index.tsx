import ContainerApp from "@components/ContainerApp";
import ListSection from "@components/ListSection";
import MainAppBar from "@components/MainAppBar";
import TelaEmpty from "@components/TelaEmpty";
import TelaLoading from "@components/TelaLoading";
import ApiPost from "@lib/ApiPost";
import { IPost } from "@typesApp/IPost";
import configApp from "configApp";
import { useRouter } from "next/dist/client/router";

type Props = {
  posts: IPost[];
};

export default function Tecnicas({ posts }: Props) {
  const router = useRouter();

  if (router.isFallback) return <TelaLoading />;
  if (!posts.length) return <TelaEmpty />;

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
  const posts = await ApiPost.getPostsByCatId(params.catId);

  return {
    props: { posts },
    revalidate: configApp.nextJs.revalidate,
  };
}
