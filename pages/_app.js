import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import { appTheme } from "src/theme";
import * as useAckee from "use-ackee";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { MotionConfig, AnimationFeature, GesturesFeature } from "framer-motion";
import "@fontsource/biorhyme/300.css";
import "@fontsource/space-grotesk/300.css";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  const [url, setUrl] = useState(undefined);

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
    setUrl(router?.pathname);
  }, [router?.pathname]);

  return (
    <>
      <Head>
        <title>Liam Davis | Web Developer</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={appTheme}>
        <CSSReset />
        <MotionConfig features={[AnimationFeature, GesturesFeature]}>
          <Component {...pageProps} />
        </MotionConfig>
      </ChakraProvider>
    </>
  );
};

export default App;
