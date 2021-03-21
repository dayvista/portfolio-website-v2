import {
  CSSReset,
  ChakraProvider,
  useColorMode,
  useColorModeValue,
  ColorMode,
} from "@chakra-ui/react";
import appTheme from "src/theme";
import * as useAckee from "use-ackee";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { MotionConfig, AnimationFeature, GesturesFeature } from "framer-motion";
import "@fontsource/biorhyme/300.css";
import "@fontsource/space-grotesk/300.css";
import type { NextRouter } from "next/router";
import type { AppProps } from "next/app";
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

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/favicons/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />
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
