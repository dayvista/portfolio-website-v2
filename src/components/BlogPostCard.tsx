import { Container, VStack, Heading, Text } from "@chakra-ui/react";
import { default as NextLink } from "next/link";
import { default as NextImage } from "next/image";

interface CardProps {
  slug: string;
  heroImg: string;
  dimensions: { height: number; width: number };
  title: string;
  datePosted: string;
}

const BlogPostCard = ({
  slug,
  heroImg,
  dimensions,
  title,
  datePosted,
}: CardProps) => {
  return (
    <NextLink href={`/blog/post/${slug}`}>
      <a>
        <Container>
          <VStack>
            <Heading as="h3" size="sm">
              {title}
            </Heading>
            <Text>{datePosted}</Text>
            <NextImage
              src={heroImg}
              width={dimensions.width}
              height={dimensions.height}
            />
            <Text></Text>
          </VStack>
        </Container>
      </a>
    </NextLink>
  );
};

export default BlogPostCard;
