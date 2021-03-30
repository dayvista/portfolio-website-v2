import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const LoadingDynamic = dynamic(() => import("src/components/Loading"));
import parse, { HTMLReactParserOptions, domToReact } from "html-react-parser";
import { Element } from "domhandler/lib/node";
import { VStack, Heading, Text, Box, useColorMode } from "@chakra-ui/react";
import { default as NextImage } from "next/image";
import styles from "src/theme/css/Post.module.css";
import dayjs from "dayjs";
const advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

interface PostInterface {
  post: {
    html: string;
    title: string;
    created_at: string;
  };
}

const BlogPost = ({ post }: PostInterface) => {
  const router = useRouter();

  const { colorMode } = useColorMode();

  useEffect(() => {
    if (post === null) {
      router.push("/blog");
    }
  }, [post]);

  const options: HTMLReactParserOptions = {
    replace: (domNode: Element) => {
      if (
        domNode.name?.includes("h1") ||
        domNode.name?.includes("h2") ||
        domNode.name?.includes("h3")
      ) {
        console.log(domNode);

        const elName = domNode.name;

        return (
          <Heading
            size={
              elName === "h1"
                ? "lg"
                : elName === "h2"
                ? "md"
                : elName === "h3"
                ? "sm"
                : "md"
            }
            className={styles.blog_font}
          >
            {domToReact(domNode.children)}
          </Heading>
        );
      } else if (domNode.name?.includes("p")) {
        return (
          <Text mt="0 !important" fontSize="18px" className={styles.blog_font}>
            {domToReact(domNode.children)}
          </Text>
        );
      } else if (domNode.name?.includes("img") && domNode.attribs) {
        const width = 600;
        const height =
          (Number(domNode.attribs.height) / Number(domNode.attribs.width)) *
          width;

        return (
          <Box className={styles.img_container} m="5vh 0 !important">
            <NextImage
              src={domNode.attribs.src}
              width={width}
              height={height}
            />
          </Box>
        );
      }
    },
  };

  return router.isFallback || !post ? (
    <LoadingDynamic />
  ) : (
    <VStack
      w="100%"
      spacing={7}
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
    >
      {/* TODO: include author name and tags */}
      {/* TODO: create /blog/tags/[tag].tsx route for sorting pages (modeled after /blog/index.js) */}
      <Heading
        as="h1"
        size="lg"
        fontFamily="Yamanatrav, sans-serif !important"
        fontWeight={400}
      >
        {post.title}
      </Heading>
      <Text>{dayjs(post?.created_at).format("dddd[,] MMM[.] Do[,] YYYY")}</Text>
      {parse(post.html, options)}
    </VStack>
  );
};

export default BlogPost;

export const getStaticProps: GetStaticProps = async ({}) => {
  return { props: { post: null } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: "example" } }],
    fallback: false,
  };
};
