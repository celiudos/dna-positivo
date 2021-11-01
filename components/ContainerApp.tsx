import { Container } from "@mui/material";
import Script from "next/script";
import * as React from "react";
import styled from "styled-components";
import NextSeoHeader from "./NextSeoHeader";

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export default function ContainerApp({ children, title, description }: Props) {
  return (
    <ContainerCss maxWidth="sm" disableGutters>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-1795HP39M2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-1795HP39M2');
        `}
      </Script>
      <NextSeoHeader title={title} description={description} />
      {children}
    </ContainerCss>
  );
}

export const ContainerCss = styled(Container)`
  background: #f3f3f3;
  display: flex !important;
  height: 100%;
  flex-direction: column;
`;
