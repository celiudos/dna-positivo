import GoogleAnalyticsScript from "@components/GoogleAnalyticsScript";
import NextSeoHeader from "@components/NextSeoHeader";
import styled from "@emotion/styled";
import { Container } from "@mui/material";
import * as React from "react";

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export default function ContainerApp({ children, title, description }: Props) {
  return (
    <ContainerCss maxWidth="sm" disableGutters>
      <GoogleAnalyticsScript />
      <NextSeoHeader title={title} description={description} />
      {children}
    </ContainerCss>
  );
}

/**
 * Moldura do app: no mobile ocupa a tela toda; a partir de 600px vira um
 * "aparelho" centralizado sobre o fundo suave definido em globals.css.
 */
const ContainerCss = styled(Container)`
  background: var(--app-superficie, #f5f6fb);
  display: flex !important;
  height: 100%;
  flex-direction: column;
  z-index: 10;
  position: relative;
  box-shadow: 0 0 48px rgba(37, 41, 57, 0.12);
`;
