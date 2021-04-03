import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import appTheme from "src/theme";
import * as useAckee from "use-ackee";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextRouter } from "next/router";
import type { AppProps } from "next/app";
import Head from "next/head";
import { MotionConfig, AnimationFeature, GesturesFeature } from "framer-motion";
import "@fontsource/biorhyme/300.css";
import "@fontsource/space-grotesk/300.css";
import "src/theme/css/global.css";
import Favicons from "src/components/Favicons";
import Layout from "src/components/Layout";

const App = ({ Component, pageProps }: AppProps) => {
  const router: NextRouter = useRouter();

  const [url, setUrl] = useState<string>(undefined);

  typeof window !== "undefined" &&
    useAckee(
      url,
      {
        server: "https://stats.gammaguys.studio",
        domainId: "5a7ed897-6b19-42e7-b765-36f2e36024f9",
      },
      { detailed: true, ignoreLocalhost: true, ignoreOwnVisits: true }
    );

  useEffect(() => {
    if (router?.pathname) {
      setUrl(router.pathname);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Liam Davis | Web Developer</title>

        <meta content="#252627" name="theme-color" />
        <meta content="#252627" name="msapplication-navbutton-color" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="#252627" name="apple-mobile-web-app-status-bar-style" />

        <Favicons />
      </Head>
      <ChakraProvider theme={appTheme}>
        <CSSReset />
        <MotionConfig features={[AnimationFeature, GesturesFeature]}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MotionConfig>
      </ChakraProvider>
    </>
  );
};

export default App;
