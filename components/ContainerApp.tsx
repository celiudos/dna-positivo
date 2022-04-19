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

const ContainerCss = styled(Container)`
  background: #f3f3f3;
  display: flex !important;
  height: 100%;
  flex-direction: column;
  z-index: 10;
  position: relative;
`;
