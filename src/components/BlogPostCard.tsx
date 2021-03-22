import { Container, VStack, Heading, Text } from "@chakra-ui/react";
import { default as NextLink } from "next/link";
import { default as NextImage } from "next/image";

interface CardProps {
  slug: string;
  heroImg: string;
  dimensions: { height: number; width: number };
}

const BlogPostCard = ({ slug, heroImg, dimensions }: CardProps) => {
  return (
    <Container>
      <VStack>
        <Heading></Heading>
        <Text></Text>
        {/* <NextImage src={heroImg} width={dimensions.width} height={dimensions.height}/> */}
        <Text></Text>
      </VStack>
    </Container>
  );
};

export default BlogPostCard;
