import { Icon } from "@iconify/react";
import { Alert, Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import ContainerApp from "@components/ContainerApp";
import MainAppBar from "@components/MainAppBar";
import styled from "@emotion/styled";
import { useFuseSearch } from "@hook/useFuseSearch";
import outlineInfo from "@iconify/icons-ic/outline-info";
import spartialAudio from "@iconify/icons-ic/sharp-spatial-audio-off";
import { DisplayFlexCenter } from "@styles/DisplayFlex";
import { IPostYoutube } from "@typesApp/IPost";
import ListSection from "@components/ListSection";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function Magafla() {
  const [transcription, setTranscription] = useState("");
  const [recognition, setRecognition] = useState<
    typeof window.SpeechRecognition | null
  >(null);
  const [youtubeEmbed, setYoutubeEmbed] = useState<null | IPostYoutube>(null);
  const [voiceActive, setVoiceActive] = useState(false);

  const [resultIncerto, resultCerteza] = useFuseSearch(transcription);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.lang = "pt-BR";
        rec.interimResults = true;
        rec.continuous = true;
        rec.onresult = (event: { results: string | any[] }) => {
          let transcript = "";
          for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          // console.log("transcript:", transcript);
          setTranscription(transcript);
        };
        rec.onerror = (event: { error: any }) => {
          console.error("Erro no reconhecimento de voz:", event.error);
        };
        setRecognition(rec);
      } else {
        alert("Seu navegador não suporta a API de reconhecimento de voz.");
      }
    }
  }, []);

  const startRecognition = () => {
    try {
      recognition && recognition.start();
      setVoiceActive(true);
    } catch (error) {
      console.log("ERROR:", error);
      stopRecognition();
    }
  };

  const stopRecognition = useCallback(() => {
    setVoiceActive(false);
    recognition && recognition.stop();
  }, [recognition]);

  useEffect(() => {
    setYoutubeEmbed(null);
    const hasCerteza = resultCerteza && resultCerteza.length > 0;
    if (hasCerteza) setYoutubeEmbed(resultCerteza[0]);
    stopRecognition();
  }, [resultCerteza, stopRecognition, transcription]);

  return (
    <ContainerApp title="Pesquisar">
      <MainAppBar title="Magafla" hrefVoltar={`/`} />
      <main>
        <Box pt={2}>
          <DisplayFlexCenter>
            {voiceActive ? (
              <PulseButtonCss
                variant="outlined"
                onClick={stopRecognition}
                endIcon={<PulseIconCss icon={spartialAudio} />}
              >
                Parar
              </PulseButtonCss>
            ) : (
              <Button
                variant="outlined"
                onClick={startRecognition}
                endIcon={<Icon icon={spartialAudio} />}
              >
                Iniciar
              </Button>
            )}
          </DisplayFlexCenter>
        </Box>
        {transcription && (
          <Box pt={2}>
            <Alert icon={<Icon icon={outlineInfo} />} severity="info">
              <strong>Texto Transcrito: </strong>
              <em>{transcription}</em>
            </Alert>
          </Box>
        )}
        {youtubeEmbed && (
          <Box pt={2}>
            <Paper>
              <Typography variant="h6">{youtubeEmbed.title}</Typography>
              <Link href={youtubeEmbed.youtubeLink} passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <Image
                    src={youtubeEmbed.youtubeImg}
                    alt={youtubeEmbed.title}
                    width={600}
                    height={400}
                  />
                </a>
              </Link>
            </Paper>
          </Box>
        )}
        {!youtubeEmbed && resultIncerto && resultIncerto.length > 0 && (
          <Paper>
            <Box pt={2}>
              <Alert severity="warning">
                Nenhum resultado encontrado. Veja se podem ser estes...
              </Alert>
            </Box>
            <ListSection itens={resultIncerto} />
          </Paper>
        )}
        {resultCerteza.length === 0 && resultIncerto.length === 0 && (
          <Box pt={2}>
            <Alert severity="warning">Nenhum resultado encontrado.</Alert>
          </Box>
        )}
      </main>
    </ContainerApp>
  );
}

const PulseIconCss = styled(Icon)`
  animation: pulse 2s infinite;
  color: #f50057;
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const PulseButtonCss = styled(Button)`
  animation: pulse 2s infinite;
  color: #f50057;
  border-color: #f50057;
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;
