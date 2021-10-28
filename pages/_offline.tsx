import ContainerApp from "@components/ContainerApp";
import MainAppBar from "@components/MainAppBar";
import { DisplayFlexCenter } from "@styles/DisplayFlex";

export default function Offline() {
  return (
    <ContainerApp>
      <MainAppBar />
      <main>
        <DisplayFlexCenter>Offline</DisplayFlexCenter>
      </main>
    </ContainerApp>
  );
}
