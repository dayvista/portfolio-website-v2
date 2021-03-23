import { Container, VStack, Text, Box, useColorMode } from "@chakra-ui/react";
import { default as NextLink } from "next/link";
import { default as NextImage } from "next/image";
import styles from "src/theme/css/BlogPostCard.module.css";

interface CardProps {
  slug?: string;
  heroImg?: string;
  dimensions?: { height: number; width: number };
  title?: string;
  datePosted?: string;
}

const BlogPostCard = ({ slug, heroImg, title }: CardProps) => {
  // const parsedDate: string = dayjs(datePosted).format("h A [-] MM/DD/YY");

  const { colorMode } = useColorMode();

  return (
    <NextLink href={`/blog/post/${slug}`}>
      <a style={{ margin: "0 auto", display: "table", padding: "5% 0" }}>
        <Container
          w="20vw"
          h="30vh"
          ml="0"
          mr="0"
          bg={colorMode === "light" ? "white" : "black"}
          p="0 !important"
          boxShadow={
            colorMode === "light"
              ? "-1px 2px 13px 1px rgba(242,239,233,0.4)"
              : "-1px 2px 13px 1px rgba(37,38,39,0.4)"
          }
          _hover={{
            boxShadow:
              colorMode === "light"
                ? "-1px 2px 13px 1px rgba(242,239,233,0.7)"
                : "-1px 2px 13px 1px rgba(37,38,39,0.7)",
          }}
          transition="0.25s all"
          className={styles.img_container}
        >
          <VStack w="100%" h="100%">
            <Box w="100%" h="50%" position="relative">
              <NextImage src={heroImg} layout="fill" objectFit="cover" />
            </Box>
            <Text
              fontSize="16px"
              alignSelf="flex-start"
              p="0 1vw"
              fontWeight="bold"
              mt="auto !important"
              mb="auto !important"
            >
              {title}
            </Text>
          </VStack>
        </Container>
      </a>
    </NextLink>
  );
};

export default BlogPostCard;
