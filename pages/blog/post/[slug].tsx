import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const LoadingDynamic = dynamic(() => import("src/components/Loading"));
import parse, { HTMLReactParserOptions, domToReact } from "html-react-parser";
import { Element } from "domhandler/lib/node";
import {
  VStack,
  Heading,
  Text,
  Box,
  useColorMode,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import { default as NextImage } from "next/image";
import styles from "src/theme/css/Post.module.css";
import { getSinglePost, getAllPostSlugs } from "src/lib/utils";
import TagButton from "src/components/TagButton";

interface PostInterface {
  post: {
    html: string;
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

  const options: HTMLReactParserOptions = {
    replace: (domNode: Element) => {
      if (
        domNode.name?.includes("h1") ||
        domNode.name?.includes("h2") ||
        domNode.name?.includes("h3")
      ) {
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
        // TODO: switch to using Pexels api (https://www.pexels.com/api/documentation/?language=javascript#photos-show)
        //       instead of locally hosting images
        // TODO: once using Pexels api, add tooltip watermark (using fa camera icon) with attribution in bottom right of image
        const srcData = domNode.attribs.src;
        const imgSrc = srcData.split(' "')[0];
        const imgTitle = srcData.split(' "')[1].split('" =')[0];
        const imgDimensions = {
          width: Number(srcData.split("=")[1].split("x")[0]),
          height: Number(srcData.split("x")[1]),
        };

        const width = 600;
        const height = (imgDimensions.height / imgDimensions.width) * width;

        return (
          <VStack
            m="5vh auto !important"
            className={
              colorMode === "dark"
                ? styles.img_container_dark
                : styles.img_container_light
            }
          >
            <NextImage
              src={imgSrc}
              width={width}
              height={height}
              alt={domNode.attribs.alt}
            />
            {imgTitle ? (
              <Text
                fontSize="16px"
                color={fontColorMode}
                fontFamily="Yamanatrav, sans-serif !important"
              >
                {imgTitle}
              </Text>
            ) : null}
          </VStack>
        );
      }
    },
  };

  const roundedReadingTime = Math.round(post?.minutes_to_read * 10) / 10;

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
          {`${roundedReadingTime} minutes`}
        </Text>
        <Text fontFamily="Yamanatrav, sans-serif !important">
          {post?.published}
        </Text>
      </HStack>
      <Spacer />
      {parse(post.html, options)}
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
