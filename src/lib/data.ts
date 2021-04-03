import {
  ChakraReact,
  ChakraNext,
  ChakraPostgres,
  ChakraDocker,
  ChakraJavaScript,
} from "src/lib/icons";
import { ChakraComponent } from "@chakra-ui/react";

export const portfolioItems: {
  heading: string;
  duration?: boolean | [string, string];
  description: string;
  technologies: ChakraComponent<any>[];
}[] = [
  {
    heading: "Forge - Client Collaboration / Management Dashboard",
    description: "test description",
    technologies: [ChakraNext, ChakraReact, ChakraPostgres],
  },
  {
    heading: "REI Link",
    duration: ["May, 2020", "Feb, 2021"],
    description: "test description 2",
    technologies: [ChakraDocker, ChakraJavaScript],
  },
];
