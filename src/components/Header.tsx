import {
  Box,
  useMediaQuery,
  Tooltip,
  Heading,
  ColorMode,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChakraSun, ChakraMoon } from "src/lib/icons";
import { default as NextLink } from "next/link";
import { useRouter } from "next/router";

interface HeaderProps {
  color: "black" | "white";
  colorMode: ColorMode;
  toggleColorMode: () => void;
}

const Header = ({ color, colorMode, toggleColorMode }: HeaderProps) => {
  const router = useRouter();

  const [isLargerThan1024Px] = useMediaQuery("( min-width: 1025px )");

  const textHoverObj = {
    color: colorMode === "light" ? "grey.base" : "grey.100",
  };

  return (
    <>
      <Box
        color={color}
        onClick={toggleColorMode}
        cursor="pointer"
        fontSize="32px"
        right={["1.5rem", null, "2.5rem"]}
        top={["1rem", null, "2rem"]}
        position="absolute"
        transition="0.25s all"
        _hover={textHoverObj}
      >
        <Tooltip
          label={colorMode === "light" ? "Light Mode" : "Dark Mode"}
          aria-label="A tooltip for dark/light modes"
          closeOnClick={isLargerThan1024Px ? false : true}
          userSelect="none"
        >
          <span>{colorMode === "light" ? <ChakraSun /> : <ChakraMoon />}</span>
        </Tooltip>
      </Box>
      <VStack
        align="flex-start"
        alignSelf="flex-start"
        userSelect="none"
        color={color}
      >
        <Box>
          <NextLink href="/">
            <a>
              <Heading as="h1" size="lg" _hover={textHoverObj}>
                Liam Davis | Web Developer
              </Heading>
            </a>
          </NextLink>
        </Box>
        <HStack
          fontSize={["20px", null, "24px", null, "22px"]}
          spacing={[2, null, 4]}
        >
          <NextLink href="/blog">
            <a>
              <Text _hover={textHoverObj}>Blog</Text>
            </a>
          </NextLink>
          <Text>
            {router?.pathname?.includes("blog")
              ? "◐"
              : router?.pathname?.includes("portfolio")
              ? "◑"
              : colorMode === "dark"
              ? "◒"
              : "◓"}
          </Text>
          <NextLink href="/portfolio">
            <a>
              <Text _hover={textHoverObj}>Portfolio</Text>
            </a>
          </NextLink>
        </HStack>
      </VStack>
    </>
  );
};

export default Header;
