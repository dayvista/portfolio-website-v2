import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import { appTheme } from "src/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={appTheme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
