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
      {/*
        O <main> global (styles/globals.css) usa `flex: 1 0 auto`, pensado para paginas de
        leitura onde a pagina toda deve rolar. Aqui a lista precisa do inverso: caber na
        altura do navegador para a ListSection controlar seu proprio scroll interno (senao
        o menu de letras da trilha fica "solto" no meio de uma pagina rolavel). O style
        inline vence a regra global (seletor por ID) sem alterar as outras paginas.
      */}
      <main style={{ flex: "1 1 0%", minHeight: 0 }}>
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
