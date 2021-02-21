import { theme } from "@chakra-ui/react";
import { Heading, Text, Link } from "src/theme/components";

export const appTheme = {
  ...theme,
  components: {
    ...theme.components,
    Heading,
    Text,
    Link,
  },
};
