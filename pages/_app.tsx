import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useStore } from "@store/storeConfig";
import theme from "@styles/theme";
import type { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";
import { Provider } from "react-redux";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);

  return (
    <React.Fragment>
      <Head>
        <title>Next App</title>
        <link href="/favicon.ico" rel="icon" />
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
      </ThemeProvider>
    </React.Fragment>
  );
}
