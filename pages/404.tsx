import ContainerApp from "@components/ContainerApp";
import EstadoVazio from "@components/EstadoVazio";
import MainAppBar from "@components/MainAppBar";
import roundSentimentDissatisfied from "@iconify/icons-ic/round-sentiment-dissatisfied";

export default function NaoEncontrado() {
  return (
    <ContainerApp title={"404"}>
      <MainAppBar hrefVoltar="/" />
      <main>
        <EstadoVazio
          icone={roundSentimentDissatisfied}
          titulo="Página não encontrada"
          descricao="O endereço acessado não existe ou foi movido. (Erro 404)"
          cor="secondary"
          acao={{ label: "Voltar para o início", href: "/" }}
        />
      </main>
    </ContainerApp>
  );
}
