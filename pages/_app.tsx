import { CacheProvider, EmotionCache } from "@emotion/react";
import { stateInicial } from "@store/rootReducer";
import { useStore } from "@store/storeConfig";
import "@styles/globals.css";
import createEmotionCache from "@theme/createEmotionCache";
import ThemeConfig from "@theme/ThemeConfig";
import configApp from "configApp";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const store = useStore(pageProps.initialReduxState);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{configApp.titulo}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <ThemeConfig>
        <Provider store={store}>
          <Component {...pageProps} />
          {/* <InitReducePosts /> */}
        </Provider>
      </ThemeConfig>
    </CacheProvider>
  );
}
