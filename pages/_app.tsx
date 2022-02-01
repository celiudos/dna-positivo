import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useStore } from "@store/storeConfig";
import { DisplayFlexCenter } from "@styles/DisplayFlex";
import "@styles/globals.css";
import theme from "@styles/theme";
import configApp from "configApp";
import type { AppProps } from "next/app";
import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import { Provider } from "react-redux";
import styled from "styled-components";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);

  return (
    <React.Fragment>
      <Head>
        <title>{configApp.titulo}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
        <ImageContainerCss>
          <Image
            className="rotating"
            src="/img/planeta-maior.jpg"
            alt="Planeta terra"
            layout="fill"
            objectFit="contain"
          />
        </ImageContainerCss>
      </ThemeProvider>
    </React.Fragment>
  );
}

export const ImageContainerCss = styled(DisplayFlexCenter)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: #000;
`;
