import { CssBaseline, ThemeProvider } from "@mui/material";
import axios from "axios";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../components/Layout";
import theme from "../styles/theme";
import { Provider as ReduxProvider } from "react-redux";
import store from "../redux/store";
import fetcher from "../lib/fetcher";
import removeJSS from "../lib/removeJSS";

axios.defaults.baseURL = "http://localhost:8080/api";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoute = ["/register", "/login"].includes(pathname);
  useEffect(() => {
    removeJSS();
  }, []);
  return (
    <>
      <Head>
        <title>My Page</title>
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
    </>
  );
}

export default MyApp;
