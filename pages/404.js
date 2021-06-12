import { Text, VStack, useColorModeValue } from "@chakra-ui/react";

export const Custom404Page = () => {
  const color = useColorModeValue("black", "white");

  return (
    <VStack
      w="100%"
      justify="center"
      textAlign="center"
      fontSize="22px"
      userSelect="none"
    >
      <Text color={color}>404...</Text>
      <Text color={color}>
        Let me know if I can help you find what you're looking for!
      </Text>
    </VStack>
  );
};

export default Custom404Page;
