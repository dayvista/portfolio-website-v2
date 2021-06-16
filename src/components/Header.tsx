import {
  Box,
  useMediaQuery,
  Heading,
  ColorMode,
  HStack,
  Text,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import { ChakraSun, ChakraMoon } from "src/lib/icons";
import { default as NextLink } from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import { ReactFitty } from "react-fitty";

const descriptors = ["Web Developer", "Permaculturist", "♡ Blockchain"];

type HeaderProps = {
  color: "black" | "white";
  colorMode: ColorMode;
  toggleColorMode: () => void;
};
const Header = ({ color, colorMode, toggleColorMode }: HeaderProps) => {
  const router = useRouter();

  const [isLargerThan1024Px] = useMediaQuery("( min-width: 1025px )");

  const textHoverObj = {
    color: colorMode === "light" ? "grey.base" : "grey.100",
  };

  const [currentDescriptor, setCurrentDescriptor] = useState(descriptors[0]);

  useEffect(() => {
    setTimeout(() => {
      if (descriptors.indexOf(currentDescriptor) + 1 < descriptors.length) {
        setCurrentDescriptor(
          descriptors[descriptors.indexOf(currentDescriptor) + 1]
        );
      } else {
        setCurrentDescriptor(descriptors[0]);
      }
    }, 9250);
  }, [currentDescriptor]);

  return (
    <>
      <Box
        color={color}
        onClick={toggleColorMode}
        cursor="pointer"
        fontSize="32px"
        right={["1.5rem", null, "2.5rem"]}
        top={["1rem", null, "2rem"]}
        position={["absolute", null, "fixed"]}
        transition="0.25s all"
        _hover={textHoverObj}
      >
        <Tooltip
          label={colorMode === "light" ? "Dark Mode" : "Light Mode"}
          aria-label="A tooltip for dark/light modes"
          closeOnClick={isLargerThan1024Px ? false : true}
          userSelect="none"
        >
          <span>{colorMode === "light" ? <ChakraMoon /> : <ChakraSun />}</span>
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
              <ReactFitty>
                <Heading as="h1" size="lg" maxW="100%" _hover={textHoverObj}>
                  Liam Davis |{" "}
                  <AnimatePresence exitBeforeEnter>
                    {descriptors.map((desc) => {
                      return desc === currentDescriptor ? (
                        <motion.span
                          key={desc}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.5 }}
                        >
                          {currentDescriptor}
                        </motion.span>
                      ) : null;
                    })}
                  </AnimatePresence>
                </Heading>
              </ReactFitty>
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
