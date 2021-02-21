import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import { appTheme } from "src/theme";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>liamdavis.dev</title>

        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>🌱</text></svg>"
        />

        {/* Plausible Analytics script */}
        {typeof window !== "undefined" &&
          window?.location?.hostname === "liamdavis.dev" && (
            <script
              async
              defer
              data-domain="liamdavis.dev"
              src="https://plausible.io/js/plausible.js"
            />
          )}
      </Head>
      <ChakraProvider theme={appTheme}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
