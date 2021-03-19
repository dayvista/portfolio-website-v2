import {
  Heading,
  VStack,
  HStack,
  Link as ChakraLink,
  Box,
  useColorMode,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { m as motion } from "framer-motion";
import {
  ChakraGitHub,
  ChakraLinkedIn,
  ChakraMail,
  ChakraSun,
  ChakraMoon,
} from "src/lib/icons";
import { default as darkModeStyles } from "src/theme/css/darkModeIcons.module.css";
import { default as NextImage } from "next/image";

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

const HomePage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("white", "black");
  const color = useColorModeValue("black", "white");

  return (
    <>
      <VStack
        w="100vw"
        h="100vh"
        p="7.5vh 10vw"
        justify="space-between"
        align="center"
        as={motion.div}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: [0, 0, 0, 0, 1], x: [-10, -10, -10, -10, 0] }}
        bg={bg}
        transition="0.25s all"
      >
        <Box
          color={color}
          onClick={toggleColorMode}
          className={darkModeStyles.container}
          _hover={{ color: colorMode === "light" ? "grey.base" : "grey.100" }}
        >
          <Tooltip
            label={colorMode === "light" ? "Light Mode" : "Dark Mode"}
            aria-label="A tooltip for dark/light modes"
            closeOnClick={false}
            userSelect="none"
          >
            <span>
              {colorMode === "light" ? <ChakraSun /> : <ChakraMoon />}
            </span>
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
        <Box w="384px" h="384px">
          <motion.div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              userSelect: "none",
            }}
            as={motion.div}
            initial={{ scaleY: 1 }}
            animate={{
              scaleY: colorMode === "light" ? 1 : -1,
            }}
            transition={{ bounce: 0, duration: 0 }}
          >
            {colorMode === "light" ? (
              <NextImage
                src="/logoDark.svg"
                layout="fill"
                objectFit="cover"
                priority={true}
              />
            ) : (
              <NextImage
                src="/logoLight.svg"
                layout="fill"
                objectFit="cover"
                priority={true}
              />
            )}
          </motion.div>
        </Box>
        <HStack w={["80%", null, "20%"]} justify="space-between">
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
              >
                {obj.icon}
              </ChakraLink>
            );
          })}
        </HStack>
      </VStack>
    </>
  );
};

export default HomePage;
