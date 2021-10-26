import ListSection from "@components/ListSection";
import MainAppBar from "@components/MainAppBar";
import ApiApp, { PostType } from "@data/ApiApp";
import BloggerJsonType from "@data/BloggerJsonType";
import DnaPositivoJson from "@data/dnapositivo.json";
import { Grid, Paper } from "@mui/material";
import Container from "@mui/material/Container";
import { useRouter } from "next/dist/client/router";

const DnaPositivoDados = DnaPositivoJson as BloggerJsonType;

const posts = DnaPositivoDados.feed.entry;
const itens = posts.map((item, key) => ({
  id: key,
  title: item.title.$t,
  href: `/post/${key}`,
  hasStar: true,
  isSubheader: false,
}));

type Props = {
  posts: PostType[];
};

export default function Tecnicas({ posts }: Props) {
  const router = useRouter();

  if (router.isFallback) return "Carregando...";
  return (
    <Container maxWidth="sm">
      <MainAppBar title={posts[0].catName} hrefVoltar="/" />
      <main>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper>
              <ListSection itens={posts} />
            </Paper>
          </Grid>
          -
        </Grid>
      </main>
    </Container>
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
