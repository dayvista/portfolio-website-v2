import {
  Box,
  useMediaQuery,
  Tooltip,
  Heading,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChakraSun, ChakraMoon } from "src/lib/icons";

const Header = ({ color, colorMode, toggleColorMode }) => {
  const [isLargerThan1024Px] = useMediaQuery("( min-width: 1025px )");

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
        _hover={{ color: colorMode === "light" ? "grey.base" : "grey.100" }}
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
      <Heading
        as="h1"
        size="lg"
        userSelect="none"
        color={color}
        alignSelf="flex-start"
      >
        Liam Davis | Web Developer
      </Heading>
    </>
  );
};

export default Header;
