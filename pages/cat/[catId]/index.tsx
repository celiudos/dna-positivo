import ContainerApp from "@components/ContainerApp";
import ListSection from "@components/ListSection";
import MainAppBar from "@components/MainAppBar";
import TelaLoading from "@components/TelaLoading";
import ApiApp from "@data/ApiApp";
import { IPost } from "@typesApp/IPost";
import { useRouter } from "next/dist/client/router";

type Props = {
  posts: IPost[];
};

export default function Tecnicas({ posts }: Props) {
  const router = useRouter();

  if (router.isFallback) return <TelaLoading />;

  return (
    <ContainerApp>
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
  const posts = ApiApp.getTodos();
  const postsCat = posts.filter((item) => item.cat.toString() === params.catId);
  return {
    props: { posts: postsCat },
  };
}
