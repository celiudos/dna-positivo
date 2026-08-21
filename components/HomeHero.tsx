import PesquisarDialog from "@components/PesquisarDialog";
import { Box, Typography } from "@mui/material";
import { tokens } from "@theme/ThemeConfig";
import configApp from "configApp";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

/**
 * Topo da Home: marca, subtitulo e o campo de busca sobreposto ao cartao.
 * O gif de DNA entra apenas como textura de fundo, com pouca opacidade,
 * para nao competir com o texto.
 */
export default function HomeHero() {
  return (
    <Box component="section" sx={{ mb: 3.5 }}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,
          backgroundImage: tokens.gradienteMarca,
          color: "#FFFFFF",
          px: 2.5,
          pt: 3,
          pb: 5.5,
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.2,
          }}
        >
          <Image
            src="/img/DNA-Genetics.gif"
            alt=""
            fill
            sizes="(min-width: 600px) 600px, 100vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </Box>

        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            component={Link}
            href="/img/logo.jpg"
            aria-label="Ver a marca em tamanho maior"
            sx={{
              width: 68,
              height: 68,
              flexShrink: 0,
              borderRadius: "22px",
              overflow: "hidden",
              display: "block",
              bgcolor: "#FFFFFF",
              boxShadow: "0px 8px 20px rgba(24, 26, 44, 0.28)",
            }}
          >
            <Image
              src="/img/logo-180x180.jpg"
              alt="Marca DNA Positivo"
              width={180}
              height={180}
              priority
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h4" component="h1" sx={{ lineHeight: 1.2 }}>
              {configApp.site}
            </Typography>
            <Typography
              variant="body2"
              sx={{ opacity: 0.92, mt: 0.5, lineHeight: 1.45 }}
            >
              {configApp.subtitulo}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: 2, mt: -3, position: "relative", zIndex: 1 }}>
        <PesquisarDialog variant="campo" />
      </Box>
    </Box>
  );
}
