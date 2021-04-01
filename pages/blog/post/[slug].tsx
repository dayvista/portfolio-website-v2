import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const LoadingDynamic = dynamic(() => import("src/components/Loading"));
import {
  VStack,
  Heading,
  Text,
  Box,
  Divider,
  useColorMode,
  Spacer,
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { default as NextImage } from "next/image";
import styles from "src/theme/css/Post.module.css";
import { getSinglePost, getAllPostSlugs } from "src/lib/utils";
import TagButton from "src/components/TagButton";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import { zenburn } from "react-syntax-highlighter/dist/cjs/styles/hljs";

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

  const { colorMode } = useColorMode();

  const fontColorMode = colorMode === "light" ? "grey.400" : "grey.200";

  useEffect(() => {
    console.log(post);
  }, [post]);

  interface renderPropTypes {
    level?: number;
    language?: string;
    value?: string;
    children?: object[];
  }

  const renderers = {
    code: ({ language, value }) => {
      return (
        <SyntaxHighlighter
          style={zenburn}
          language={language}
          children={value}
          customStyle={{
            transition: "0.25s all",
            borderRadius: "5px",
            margin: "2.5vh 0",
          }}
          codeTagProps={{ style: { transition: "0.25s all" } }}
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
    blockquote: ({ children }) => {
      return (
        <Box
          bg={colorMode === "light" ? "grey.50" : "grey.700"}
          color={colorMode === "light" ? "black" : "white"}
          p="1%"
          borderRadius="5px"
          m="2.5vh 0"
        >
          {children}
        </Box>
      );
    },
    link: ({ href, children }) => {
      return (
        <ChakraLink
          href={href}
          target="_blank"
          rel="noopener noreferral nofollow"
        >
          {children}
        </ChakraLink>
      );
    },
    // TODO: get width and height of images in an array
    // TODO: use pexels api for image
    // image: ({src,alt}) => {
    //   console.log("imgdata");
    //   console.log(data);
    //   console.log("imgdata");

    //   return <NextImage src={src} alt={alt}  />;
    // },
  };

  return router.isFallback || !post ? (
    <LoadingDynamic />
  ) : (
    <VStack
      w="100%"
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
      <HStack w="100%" justify="space-between">
        <Heading
          as="h3"
          size="xs"
          color={fontColorMode}
          fontFamily="Yamanatrav, sans-serif !important"
        >
          By Liam Davis
        </Heading>
        <HStack justify="flex-end" spacing={2}>
          {post?.tags &&
            post?.tags.map((tag) => {
              return <TagButton tag={tag} key={tag} />;
            })}
        </HStack>
      </HStack>
      <HStack w="100%" justify="space-between" color={fontColorMode}>
        <Text fontFamily="Yamanatrav, sans-serif !important">
          {`${post?.minutes_to_read} minutes`}
        </Text>
        <Text fontFamily="Yamanatrav, sans-serif !important">
          {post?.published}
        </Text>
      </HStack>
      <Spacer />
      <ReactMarkdown renderers={renderers} plugins={[gfm]} children={post.md} />
    </VStack>
  );
};

export default BlogPost;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getSinglePost("/src/content", `${params.slug}.md`);

  return { props: { post: postData } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugArr = await getAllPostSlugs("/src/content");

  return {
    paths: slugArr,
    fallback: false,
  };
};
