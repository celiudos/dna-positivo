import styled from "@emotion/styled";
import { Container } from "@mui/material";
import * as React from "react";
import BaixarNovosPosts from "./BaixarNovosPosts";
import GoogleAnalyticsScript from "./GoogleAnalyticsScript";
import NextSeoHeader from "./NextSeoHeader";

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
      <BaixarNovosPosts />
    </ContainerCss>
  );
}

export const ContainerCss = styled(Container)`
  background: #f3f3f3;
  display: flex !important;
  height: 100%;
  flex-direction: column;
  z-index: 10;
  position: relative;
`;
