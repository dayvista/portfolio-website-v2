import {
  Container,
  VStack,
  Text,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { default as NextLink } from "next/link";
import { default as NextImage } from "next/image";
import { m as motion } from "framer-motion";
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

  const bg = useColorModeValue("white", "black");
  const boxShadow = useColorModeValue(
    "-1px 2px 13px 1px rgba(242,239,233,0.4)",
    "-1px 2px 13px 1px rgba(37,38,39,0.4)"
  );
  const boxShadowHover = useColorModeValue(
    "-1px 2px 13px 1px rgba(242,239,233,0.7)",
    "-1px 2px 13px 1px rgba(37,38,39,0.7)"
  );

  const boxShadowAction: { boxShadow: string } = {
    boxShadow: boxShadowHover,
  };

  return (
    <NextLink href={`/blog/post/${slug}`}>
      <a>
        <Container
          w="20vw"
          h="37.5vh"
          bg={bg}
          p="0 !important"
          mb="5vh"
          boxShadow={boxShadow}
          as={motion.div}
          whileHover={boxShadowAction}
          whileTap={boxShadowAction}
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
