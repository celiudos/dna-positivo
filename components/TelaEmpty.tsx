import ContainerApp from "@components/ContainerApp";
import EstadoVazio from "@components/EstadoVazio";
import MainAppBar from "@components/MainAppBar";
import roundSentimentDissatisfied from "@iconify/icons-ic/round-sentiment-dissatisfied";

export default function TelaEmpty() {
  return (
    <ContainerApp title={"Vazio"}>
      <MainAppBar hrefVoltar="/" />
      <main>
        <EstadoVazio
          icone={roundSentimentDissatisfied}
          titulo="Nenhuma publicação encontrada"
          descricao="Verifique o endereço e tente novamente."
          acao={{ label: "Voltar para o início", href: "/" }}
        />
      </main>
    </ContainerApp>
  );
}
