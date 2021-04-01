import { Text, Flex, useColorModeValue } from "@chakra-ui/react";

export const Custom404Page = () => {
  const color = useColorModeValue("black", "white");

  return (
    <Flex
      w="100%"
      justify="center"
      textAlign="center"
      fontSize="22px"
      userSelect="none"
    >
      <Text color={color}>404... Were you looking for something?</Text>
    </Flex>
  );
};

export default Custom404Page;
