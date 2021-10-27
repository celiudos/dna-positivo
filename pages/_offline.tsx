import MainAppBar from "@components/MainAppBar";
import Container from "@mui/material/Container";
import { DisplayFlexCenter } from "@styles/DisplayFlex";

export default function Offline() {
  return (
    <Container maxWidth="sm" disableGutters>
      <MainAppBar />
      <main>
        <DisplayFlexCenter>Offline</DisplayFlexCenter>
      </main>
    </Container>
  );
}
