import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts, getSinglePost } from "src/lib/utils";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const LoadingDynamic = dynamic(() => import("src/components/Loading"));
import parse, { HTMLReactParserOptions, domToReact } from "html-react-parser";
import { Element } from "domhandler/lib/node";
import { VStack, Heading, Text, Box, useColorMode } from "@chakra-ui/react";
import { default as NextImage } from "next/image";
import styles from "src/theme/css/Post.module.css";

interface PostInterface {
  post: {
    html: string;
    title: string;
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

  if (router.isFallback || !post) {
    return <LoadingDynamic />;
  } else {
    const options: HTMLReactParserOptions = {
      replace: (domNode: Element) => {
        if (domNode.name?.includes("p")) {
          return (
            <Text mt="0 !important" fontSize="18px">
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

    return (
      <VStack
        w="100%"
        spacing={7}
        m="5vh 0 !important"
        align="flex-start"
        borderRadius="5px"
        p="2.5%"
        bg={colorMode === "light" ? "grey.50" : "grey.700"}
        boxShadow={
          colorMode === "light"
            ? "-1px 2px 13px 1px rgba(86, 78, 88,0.4)"
            : "-1px 2px 13px 1px rgba(195, 187, 196,0.4)"
        }
        transition="0.25s all"
      >
        <Heading as="h1" size="md">
          {post.title}
        </Heading>
        {parse(post.html, options)}
      </VStack>
    );
  }
};

export default BlogPost;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug: string | string[] = params.slug;

  const postData = await getSinglePost(slug);

  return { props: { post: postData ? postData : null }, revalidate: 1 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPosts();

  const postSlugsArr = [];

  await Promise.all(
    allPosts.map(async (post: { slug: string }) => {
      if (post.slug) {
        postSlugsArr.push({ params: { slug: post.slug } });
      }
    })
  );

  return {
    paths: postSlugsArr,
    fallback: true,
  };
};
