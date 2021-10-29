import { Container } from "@mui/material";
import * as React from "react";
import styled from "styled-components";
import NextSeoHeader from "./NextSeoHeader";

type Props = {
  children: React.ReactNode;
};

export default function ContainerApp({ children }: Props) {
  return (
    <ContainerCss maxWidth="sm" disableGutters>
      <NextSeoHeader />
      {children}
    </ContainerCss>
  );
}

export const ContainerCss = styled(Container)`
  background: #fafafa;
  display: flex !important;
  height: 100%;
  flex-direction: column;
`;
