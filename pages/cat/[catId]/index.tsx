import ContainerApp from "@components/ContainerApp";
import ListSection from "@components/ListSection";
import MainAppBar from "@components/MainAppBar";
import TelaLoading from "@components/TelaLoading";
import ApiSearch from "@lib/ApiSearch";
import { IPost } from "@typesApp/IPost";
import { useRouter } from "next/dist/client/router";

type Props = {
  posts: IPost[];
};

export default function Tecnicas({ posts }: Props) {
  const router = useRouter();

  if (router.isFallback) return <TelaLoading />;

  if (!posts.length) return "Nada encontrado";

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
  const posts = await ApiSearch.search({
    filterBy: { cat: parseInt(params.catId) },
  });

  return {
    props: { posts: posts.results },
  };
}
