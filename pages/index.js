import {
  VStack,
  Link as ChakraLink,
  Heading,
  UnorderedList,
  ListItem,
  Text,
} from "@chakra-ui/react";

const HomePage = () => {
  return (
    <VStack
      w="100vw"
      justify="center"
      align="center"
      m="auto"
      fontFamily="Times New Roman, Times, serif"
    >
      <VStack m="5vh 0">
        <Heading as="h1" size="md">
          The Best Web Developer Portfolio You've Ever Seen
        </Heading>
        <Heading as="h2" size="sm">
          By Liam Davis
        </Heading>
      </VStack>
      <UnorderedList spacing={7}>
        <ListItem>
          <Text size="md">
            I make web apps and manage a team of developers/designers at{" "}
            <ChakraLink
              _active
              href="https://www.seoforrealestateinvestors.com/"
              target="_blank"
              rel="noopener noreferral nofollow"
            >
              SEO for Real Estate Investors
            </ChakraLink>
            .
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            I freelance with{" "}
            <ChakraLink
              href="http://gammaguys.studio/"
              target="_blank"
              rel="noopener noreferral nofollow"
            >
              Gamma Guys Studio
            </ChakraLink>
            .
          </Text>
        </ListItem>
      </UnorderedList>
      <VStack mt="5vh !important">
        <Text>
          <ChakraLink
            href="https://github.com/dayvista"
            target="_blank"
            rel="noopener noreferral nofollow"
          >
            GitHub
          </ChakraLink>
        </Text>
        <Text>
          <ChakraLink
            href="https://linkedin.com/in/wjdiii"
            target="_blank"
            rel="noopener noreferral nofollow"
          >
            LinkedIn
          </ChakraLink>
        </Text>
        <Text>
          <ChakraLink
            href="mailto:liamdavis@tuta.io"
            rel="noopener noreferral nofollow"
          >
            Email
          </ChakraLink>
        </Text>
      </VStack>
    </VStack>
  );
};

export default HomePage;
