import { chakra, ChakraComponent } from "@chakra-ui/react";

import { GiStripedSun } from "react-icons/gi";
import { WiMoonAltWaningCrescent6 } from "react-icons/wi";
import { RiLinkedinLine } from "react-icons/ri";
import { FiMail, FiGithub } from "react-icons/fi";
import {
  SiPexels,
  SiNextDotJs,
  SiReact,
  SiPostgresql,
  SiDocker,
  SiJavascript,
} from "react-icons/si";

export const ChakraMail: ChakraComponent<any> = chakra(FiMail);
export const ChakraGitHub: ChakraComponent<any> = chakra(FiGithub);
export const ChakraLinkedIn: ChakraComponent<any> = chakra(RiLinkedinLine);
export const ChakraSun: ChakraComponent<any> = chakra(GiStripedSun);
export const ChakraMoon: ChakraComponent<any> = chakra(
  WiMoonAltWaningCrescent6
);
export const ChakraPexels: ChakraComponent<any> = chakra(SiPexels);
export const ChakraNext: ChakraComponent<any> = chakra(SiNextDotJs);
export const ChakraReact: ChakraComponent<any> = chakra(SiReact);
export const ChakraPostgres: ChakraComponent<any> = chakra(SiPostgresql);
export const ChakraDocker: ChakraComponent<any> = chakra(SiDocker);
export const ChakraJavaScript: ChakraComponent<any> = chakra(SiJavascript);
