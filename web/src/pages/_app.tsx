import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core";
import { useRouter } from "next/router";
import theme from "../styles/theme";
import axios from "axios";
import Layout from "../components/Layout";

axios.defaults.baseURL = "http://localhost:5000/";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        {!authRoute ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </>
  );
}
export default MyApp;
