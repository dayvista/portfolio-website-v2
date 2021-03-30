import { Container, VStack, Text, Box, useColorMode } from "@chakra-ui/react";
import { default as NextLink } from "next/link";
import { default as NextImage } from "next/image";
import dayjs from "dayjs";

interface CardProps {
  slug?: string;
  heroImg?: string;
  dimensions?: { height: number; width: number };
  title?: string;
  datePosted?: string;
}

const BlogPostCard = ({ slug, heroImg, title, datePosted }: CardProps) => {
  const parsedDate = dayjs(datePosted).format("MM/DD/YY");

  const { colorMode } = useColorMode();

  return (
    <Box m="0 auto" p="5% 0" display="table">
      <NextLink href={`/blog/post/${slug}`}>
        <a>
          <Container
            w={["80vw", null, "35vw", null, "20vw"]}
            h={["30vh", null, "20vh", null, "30vh"]}
            ml="0"
            mr="0"
            bg={colorMode === "light" ? "grey.50" : "grey.700"}
            color={colorMode === "light" ? "black" : "white"}
            p="0 !important"
            boxShadow={
              colorMode === "light"
                ? "-1px 2px 13px 1px rgba(86, 78, 88,0.4)"
                : "-1px 2px 13px 1px rgba(195, 187, 196,0.4)"
            }
            _hover={{
              boxShadow:
                colorMode === "light"
                  ? "-1px 2px 13px 1px rgba(86, 78, 88,0.7)"
                  : "-1px 2px 13px 1px rgba(195, 187, 196,0.7)",
            }}
            transition="0.25s all"
            className="img_container"
          >
            <VStack w="100%" h="100%">
              {heroImg ? (
                <Box w="100%" h="50%" position="relative">
                  <NextImage src={heroImg} layout="fill" objectFit="cover" />
                </Box>
              ) : null}
              <Text
                fontSize="16px"
                fontWeight="bold"
                alignSelf="flex-start"
                p="3%"
              >
                {title}
              </Text>
              <Text
                fontSize="14px"
                fontWeight="bold"
                alignSelf="flex-end"
                mt="auto !important"
                p="3%"
              >
                {parsedDate}
              </Text>
            </VStack>
          </Container>
        </a>
      </NextLink>
    </Box>
  );
};

export default BlogPostCard;
