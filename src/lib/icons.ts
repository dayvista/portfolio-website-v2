import { chakra, ChakraComponent } from "@chakra-ui/react";

import { GiStripedSun } from "react-icons/gi";
import { WiMoonAltWaningCrescent6 } from "react-icons/wi";
import { RiLinkedinLine } from "react-icons/ri";
import { FiMail, FiGithub } from "react-icons/fi";

export const ChakraMail: ChakraComponent<any> = chakra(FiMail);
export const ChakraGitHub: ChakraComponent<any> = chakra(FiGithub);
export const ChakraLinkedIn: ChakraComponent<any> = chakra(RiLinkedinLine);
export const ChakraSun: ChakraComponent<any> = chakra(GiStripedSun);
export const ChakraMoon: ChakraComponent<any> = chakra(
  WiMoonAltWaningCrescent6
);
