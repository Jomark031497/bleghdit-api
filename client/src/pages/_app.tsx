import axios from "axios";
import { Provider as ReduxProvider } from "react-redux";
import Head from "next/head";
import { SWRConfig } from "swr";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { CssBaseline, ThemeProvider } from "@mui/material";

import Layout from "../components/Layout";
import theme from "../styles/theme";
import store from "../redux/store";
import fetcher from "../lib/fetcher";
import createEmotionCache from "../lib/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { pathname } = useRouter();
  const authRoute = ["/register", "/login"].includes(pathname);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>leddit</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SWRConfig value={{ fetcher: async (url) => fetcher(url), dedupingInterval: 10000 }}>
        <ReduxProvider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {!authRoute ? (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            ) : (
              <Component {...pageProps} />
            )}
          </ThemeProvider>
        </ReduxProvider>
      </SWRConfig>
    </CacheProvider>
  );
}

export default MyApp;
