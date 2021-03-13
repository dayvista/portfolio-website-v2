import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import { appTheme } from "src/theme";
import * as useAckee from "use-ackee";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

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

        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>⚪</text></svg>"
        />
      </Head>
      <ChakraProvider theme={appTheme}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;
