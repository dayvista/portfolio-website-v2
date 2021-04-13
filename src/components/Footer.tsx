import { ChakraGitHub, ChakraLinkedIn, ChakraMail } from "src/lib/icons";
import { HStack, Link as ChakraLink, ColorMode } from "@chakra-ui/react";

const socialLinks = [
  {
    link: "https://github.com/dayvista",
    alt: "Liam Davis' GitHub profile, username dayvista",
    icon: <ChakraGitHub />,
  },
  {
    link: "https://www.linkedin.com/in/wjdiii",
    alt: "Liam Davis' LinkedIn profile",
    icon: <ChakraLinkedIn />,
  },
  {
    link: "mailto:liamdavis@tuta.io",
    alt: "Click here to email Liam directly.",
    icon: <ChakraMail />,
  },
];

interface FooterProps {
  colorMode: ColorMode;
  color: "black" | "white";
}

const Footer = ({ colorMode, color }: FooterProps) => {
  return (
    <HStack w={["80%", null, "40%", null, "20%"]} justify="space-between">
      {socialLinks.map((obj) => {
        return (
          <ChakraLink
            href={obj.link}
            alt={obj.alt}
            target="_blank"
            rel="noopener noreferral nofollow"
            fontSize="32px"
            color={color}
            _hover={{
              color: colorMode === "light" ? "grey.base" : "grey.100",
            }}
            _focus={{ boxShadow: "none" }}
            key={obj.link}
            transition="0.25s all"
          >
            {obj.icon}
          </ChakraLink>
        );
      })}
    </HStack>
  );
};

export default Footer;
