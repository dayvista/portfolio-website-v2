import { Heading, VStack, HStack, chakra } from "@chakra-ui/react";
import { default as NextLink } from "next/link";
import { m as motion } from "framer-motion";

const HomePage = () => {
  return (
    <VStack w="100vw" h="100vh" p="10vh 10vw" align="center">
      <Heading as="h1" size="lg">
        Liam Davis | Web Developer
      </Heading>
      <HStack w="65%">
        <NextLink href="/projects">
          <a>Projects</a>
        </NextLink>
      </HStack>
    </VStack>
  );
};

export default HomePage;
