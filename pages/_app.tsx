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
        domainId: "18cebffd-1cf9-4568-a246-e681f0844e38",
      },
      { detailed: true, ignoreLocalhost: true, ignoreOwnVisits: false }
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
