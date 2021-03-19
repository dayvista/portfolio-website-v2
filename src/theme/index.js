import { theme } from "@chakra-ui/react";
import { Heading, Text } from "src/theme/components";

const appTheme = {
  ...theme,
  styles: {
    global: {
      "html, body": {
        fontWeight: 300,
        fontFamily: "Space Grotesk, sans-serif",
        overflowX: "hidden",
        color: "black",
      },
    },
  },
  colors: {
    ...theme.colors,
    white: "#F2EFE9",
    black: "#252627",
    blue: {
      base: "#508AA8",
      50: "#e2f6ff",
      100: "#c5deea",
      200: "#a6c6d8",
      300: "#84b0c6",
      400: "#6499b5",
      500: "#4a809b",
      600: "#38637a",
      700: "#254758",
      800: "#112c38",
      900: "#001018",
    },
    grey: {
      base: "#564E58",
      50: "#f9eff9",
      100: "#dcd5de",
      200: "#c3bbc4",
      300: "#a9a0ab",
      400: "#8f8592",
      500: "#766c79",
      600: "#5c545f",
      700: "#423c45",
      800: "#29232b",
      900: "#100a15",
    },
    gray: {
      base: "#564E58",
      50: "#f9eff9",
      100: "#dcd5de",
      200: "#c3bbc4",
      300: "#a9a0ab",
      400: "#8f8592",
      500: "#766c79",
      600: "#5c545f",
      700: "#423c45",
      800: "#29232b",
      900: "#100a15",
    },
    red: {
      base: "#904E55",
      50: "#ffeaed",
      100: "#eacbcf",
      200: "#d5abaf",
      300: "#c18a91",
      400: "#ae6a71",
      500: "#955158",
      600: "#753e44",
      700: "#552c30",
      800: "#35191c",
      900: "#1a0408",
    },
  },
  components: {
    ...theme.components,
    Heading,
    Text,
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
};

export default appTheme;
