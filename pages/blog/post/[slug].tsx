import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const LoadingDynamic = dynamic(() => import("src/components/Loading"));
import {
  VStack,
  Stack,
  Heading,
  Text,
  Box,
  Divider,
  useColorMode,
  Spacer,
  HStack,
  Link as ChakraLink,
  useMediaQuery,
  chakra,
} from "@chakra-ui/react";
import { default as NextImage } from "next/image";
import styles from "src/theme/css/Post.module.css";
import { getSinglePost, getAllPostSlugs } from "src/lib/utils";
import { TagButton } from "src/components/Blog";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  zenburn,
  atelierHeathLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import "@fontsource/fira-code";

interface PostInterface {
  post: {
    md: string;
    title: string;
    published: string;
    tags: string[];
    hero_image: string;
    hero_image_dimensions: { width: number; height: number; type: string };
    minutes_to_read: number;
  };
}

const BlogPost = ({ post }: PostInterface) => {
  const router = useRouter();

  const [isLargerThan500] = useMediaQuery("(min-width:501px)");

  const { colorMode } = useColorMode();

  const fontColorMode = colorMode === "light" ? "grey.400" : "grey.200";

  interface renderPropTypes {
    level?: number;
    language?: string;
    value?: string;
    children?: object[];
    href?: string;
    src?: string;
    alt?: string;
  }

  const renderers = {
    code: ({ language, value }: renderPropTypes) => {
      return (
        <SyntaxHighlighter
          style={colorMode === "light" ? atelierHeathLight : zenburn}
          language={language}
          children={value}
          customStyle={{
            transition: "0.25s all",
            borderRadius: "5px",
            margin: "5vh 0",
            alignSelf: "center",
            width: isLargerThan500 ? "initial" : "inherit",
          }}
          codeTagProps={{
            style: {
              transition: "0.25s all",
            },
          }}
        />
      );
    },
    heading: ({ level, children }: renderPropTypes) => {
      return (
        <Heading
          // @ts-ignore
          as={`h${level}`}
          className={styles.blog_font}
          size={
            level === 1 ? "lg" : level === 2 ? "md" : level === 1 ? "sm" : "xs"
          }
        >
          {children}
        </Heading>
      );
    },
    thematicBreak: () => {
      return <Divider />;
    },
    blockquote: ({ children }: renderPropTypes) => {
      return (
        <Box
          bg={colorMode === "light" ? "grey.50" : "grey.700"}
          color={colorMode === "light" ? "black" : "white"}
          p="1%"
          borderRadius="5px"
          m="2.5vh 0"
          className={styles.blockquote_container}
        >
          {children}
        </Box>
      );
    },
    link: ({ href, children }: renderPropTypes) => {
      return (
        <ChakraLink
          href={href}
          target="_blank"
          rel="noopener noreferral nofollow"
          color="blue.500"
          transition="0.25s all"
          _hover={{ color: "blue.700", textDecoration: "underline" }}
          _focus={{
            boxShadow: "rgb(74 128 155 / 60%) 0px 0px 0px 3px !important",
          }}
          borderRadius="5px"
        >
          {children}
        </ChakraLink>
      );
    },
    // TODO: use pexels api for images
    image: ({ src, alt }: renderPropTypes) => {
      return (
        <Box
          position="relative"
          w={["90%", null, "75%", "80%", null]}
          h={["25vh", null, "20vh", null, "40vh"]}
          m="5vh 0 !important"
          alignSelf="center"
          className={
            styles[`img_container_${colorMode === "light" ? "light" : "dark"}`]
          }
        >
          <NextImage src={src} alt={alt} layout="fill" objectFit="cover" />
        </Box>
      );
    },
    paragraph: ({ children }: renderPropTypes) => {
      const isImageOrLink = children.every(
        (child: { props: { node: { type: string } } }) => {
          if (child.props?.node?.type) {
            return (
              child.props.node.type === "link" ||
              child.props.node.type === "image"
            );
          } else {
            return false;
          }
        }
      );

      return isImageOrLink ? <>{children}</> : <Text>{children}</Text>;
    },
  };

  return router.isFallback || !post ? (
    <LoadingDynamic />
  ) : (
    <VStack
      w={["100%", null, "90%", "80%", "70%"]}
      spacing={2}
      m="5vh 0 !important"
      align="flex-start"
      borderRadius="5px"
      p="2.5%"
      bg={colorMode === "light" ? "#FFFEFD" : "#28222a"}
      boxShadow={
        colorMode === "light"
          ? "-1px 2px 13px 1px rgba(86, 78, 88,0.4)"
          : "-1px 2px 13px 1px rgba(195, 187, 196,0.4)"
      }
      color={colorMode === "light" ? "black" : "white"}
      transition="0.25s all"
      fontFamily="Yamanatrav, sans-serif !important"
      wordBreak="break-word"
    >
      <Heading
        as="h1"
        size="lg"
        fontFamily="Yamanatrav, sans-serif !important"
        fontWeight={400}
      >
        {post.title}
      </Heading>
      <Stack w="100%" justify="space-between" flexDir={["column", null, "row"]}>
        <Heading
          as="h3"
          size="xs"
          color={fontColorMode}
          fontFamily="Yamanatrav, sans-serif !important"
        >
          By{" "}
          <chakra.span color={colorMode === "light" ? "grey.500" : "grey.300"}>
            Liam Davis
          </chakra.span>
        </Heading>
        <HStack
          justify={["center", null, "flex-end"]}
          spacing={2}
          m={["2.5vh 0 !important", null, 0]}
        >
          {post?.tags &&
            post?.tags.map((tag) => {
              return <TagButton tag={tag} key={tag} />;
            })}
        </HStack>
      </Stack>
      <HStack w="100%" justify="space-between" color={fontColorMode}>
        <Text fontFamily="Yamanatrav, sans-serif !important">
          {`${post?.minutes_to_read} min. read`}
        </Text>
        <Text fontFamily="Yamanatrav, sans-serif !important">
          {post?.published}
        </Text>
      </HStack>
      <Spacer />
      <ReactMarkdown renderers={renderers} children={post.md} />
    </VStack>
  );
};

export default BlogPost;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getSinglePost(
    "/src/content",
    `${params.slug as string}.md`
  );

  return { props: { post: postData } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugArr = await getAllPostSlugs("/src/content");

  return {
    paths: slugArr,
    fallback: false,
  };
};
