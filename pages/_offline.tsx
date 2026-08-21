import ContainerApp from "@components/ContainerApp";
import EstadoVazio from "@components/EstadoVazio";
import MainAppBar from "@components/MainAppBar";
import baselineSignalWifiOff from "@iconify/icons-ic/baseline-signal-wifi-off";

export default function Offline() {
  return (
    <ContainerApp title={"Offline"}>
      <MainAppBar />
      <main>
        <EstadoVazio
          icone={baselineSignalWifiOff}
          titulo="Você está offline"
          cor="secondary"
          descricao="Verifique suas configurações de rede. Para habilitar esta página offline, você precisa carregá-la ao menos uma vez."
        />
      </main>
    </ContainerApp>
  );
}
