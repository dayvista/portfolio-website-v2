import {
  Container,
  VStack,
  Text,
  Box,
  useColorMode,
  HStack,
  Button,
} from "@chakra-ui/react";
import { default as NextLink } from "next/link";
import { default as NextImage } from "next/image";

interface TagButtonInterface {
  tag: string;
}

interface CardInterface {
  slug?: string;
  heroImg?: string;
  dimensions?: { height: number; width: number };
  title?: string;
  datePosted?: string;
  tags: string[];
}

export const BlogPostCard = ({
  slug,
  heroImg,
  title,
  datePosted,
  tags,
}: CardInterface) => {
  const { colorMode } = useColorMode();

  return (
    <Container
      w={["85vw", null, "40vw", null, "25vw"]}
      h={["40vh", null, "30vh", null, "40vh"]}
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
      position="relative"
      top={0}
      left={0}
      userSelect="none"
    >
      <VStack w="100%" h="100%" position="absolute">
        {heroImg ? (
          <Box w="100%" h="50%" position="relative">
            <NextImage
              src={`/images/blog/${heroImg}`}
              layout="fill"
              objectFit="cover"
            />
          </Box>
        ) : null}
        <Text fontSize="16px" fontWeight="bold" alignSelf="flex-start" p="3%">
          {title}
        </Text>
        {tags && tags.length > 0 ? (
          <HStack w="100%" justify="flex-end" spacing={2} p="0 5px 0 0">
            {tags.map((tag: string) => {
              return <TagButton tag={tag} key={tag} />;
            })}
          </HStack>
        ) : null}
        <Text
          fontSize="14px"
          fontWeight="bold"
          alignSelf="flex-end"
          mt="auto !important"
          p="3%"
        >
          {datePosted}
        </Text>
      </VStack>
      <NextLink href={`/blog/post/${slug}`}>
        <a>
          <Box
            w="100%"
            h="100%"
            zIndex={1}
            position="absolute"
            top={0}
            left={0}
          />
        </a>
      </NextLink>
    </Container>
  );
};

export const TagButton = ({ tag }: TagButtonInterface) => {
  return (
    <NextLink href={`/blog/tag/${tag}`}>
      <a>
        <Button variant="tag" zIndex={2}>
          {tag}
        </Button>
      </a>
    </NextLink>
  );
};
