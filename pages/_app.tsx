import { CacheProvider, EmotionCache } from "@emotion/react";
import styled from "@emotion/styled";
import { useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useStore } from "@store/storeConfig";
import createEmotionCache from "@styles/createEmotionCache";
import { DisplayFlexCenter } from "@styles/DisplayFlex";
import "@styles/globals.css";
import configApp from "configApp";
import type { AppProps } from "next/app";
import Head from "next/head";
import Image from "next/image";
import { Provider } from "react-redux";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const store = useStore(pageProps.initialReduxState);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <CacheProvider value={emotionCache}>
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
          {matches ? (
            <Image
              className="rotating"
              src="/img/planeta-maior.jpg"
              alt="Planeta terra"
              layout="fill"
              objectFit="contain"
            />
          ) : null}
        </ImageContainerCss>
      </ThemeProvider>
    </CacheProvider>
  );
}

export const ImageContainerCss = styled(DisplayFlexCenter)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: #000;
`;
