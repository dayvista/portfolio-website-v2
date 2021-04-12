import { VStack, useColorMode } from "@chakra-ui/react";

const Frame = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <VStack
      w={["100%", null, "90%", "80%", "70%"]}
      spacing={2}
      m="5vh auto !important"
      align="flex-start"
      borderRadius="5px"
      p="2.5%"
      bg={colorMode === "light" ? "#FFFEFD" : "#303132"}
      boxShadow={
        colorMode === "light"
          ? "-1px 2px 13px 1px rgba(86, 78, 88,0.4)"
          : "-1px 2px 13px 1px rgba(195, 187, 196,0.4)"
      }
      color={colorMode === "light" ? "black" : "white"}
      transition="0.25s all"
      fontFamily="Yantramanav, sans-serif !important"
      wordBreak="break-word"
    >
      {children}
    </VStack>
  );
};

export default Frame;
