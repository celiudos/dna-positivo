import "@/styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter';
import configApp from "@/config/configApp";
import ThemeConfig from "@/theme/ThemeConfig";

// Or `v1X-pages` if you are using Next.js v1X

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider {...pageProps}>
      <Head>
        <title>{configApp.titulo}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <ThemeConfig>
        <Component {...pageProps} />
      </ThemeConfig>
    </AppCacheProvider>
  );
}


