import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const LoadingDynamic = dynamic(() => import("src/components/Loading"));
import {
  Stack,
  Heading,
  Text,
  Box,
  useColorMode,
  Spacer,
  HStack,
  VStack,
  chakra,
  useMediaQuery,
  useColorModeValue,
  useDisclosure,
  Button,
  AspectRatio,
} from "@chakra-ui/react";
import { getSinglePost, getAllPostSlugs } from "src/lib/utils";
import { TagButton } from "src/components/Blog";
import ReactMarkdown from "react-markdown";
import ProgressBar from "react-scroll-progress-bar";
import Frame from "src/components/Frame";
import Renderers from "src/components/Renderers";
import { default as NextImage } from "next/image";
import styles from "src/theme/css/Post.module.css";
import { ChakraDollar } from "src/lib/icons";
import { useState, useRef } from "react";
import ScrollToTopButton from "src/components/ScrollToTopButton";
import DonateCryptoModal from "src/components/DonateCryptoModal";
import { cryptoDonationOptions } from "src/lib/data";
import { NextSeo } from "next-seo";
import { PostInterface } from "src/lib/interfaces";
// import axios from "axios";

type BlogPostProps = { post: PostInterface; slug: string };
const BlogPost = ({ post, slug }: BlogPostProps) => {
  const scrollRef = useRef(null);

  const router = useRouter();

  const [chosenCrypto, setChosenCrypto] = useState(cryptoDonationOptions[0]);

  const { colorMode } = useColorMode();

  const color = useColorModeValue("black", "white");

  const [isMobile] = useMediaQuery("(max-width: 30em)");

  const fontColorMode = colorMode === "light" ? "grey.400" : "grey.200";

  const { isOpen, onOpen, onClose } = useDisclosure();

  return router.isFallback || !post ? (
    <LoadingDynamic />
  ) : (
    <>
      <NextSeo
        {...(post.title ? { title: post.title } : {})}
        description={post.description}
        openGraph={{
          url: `https://liamdavis.dev/blog/post/${slug}`,
          ...(post.title ? { title: post.title } : {}),
          description: post.description,
          images: [
            {
              url: "https://res.cloudinary.com/gamma-guys-studio/image/upload/v1619743307/logoDark_r285pd.png",
              width: 794,
              height: 1123,
              alt: "Liam Davis | Web Development",
            },
            {
              url: `https://liamdavis.dev/_next/image?url=%2Fimages%2Fblog%2F${post.hero_image}&w=1920&q=75`,
              width: post.hero_image_dimensions.width,
              height: post.hero_image_dimensions.height,
              alt: post.title,
            },
          ],
        }}
      />
      <Box position="fixed" top={0} left={0} mt="0 !important" zIndex={2}>
        <ProgressBar
          bgcolor={colorMode === "light" ? "#766c79" : "#c3bbc4"}
          height="0.35rem"
        />
      </Box>
      <Box
        position="absolute"
        top={0}
        visibility="hidden"
        w={0}
        h={0}
        m="0 !important"
        ref={scrollRef}
      />
      <Box className={styles.blog_post_container} w="100%">
        <Frame>
          <Heading
            as="h1"
            size="lg"
            fontFamily="Yantramanav, sans-serif !important"
            fontWeight={400}
          >
            {post.title}
          </Heading>
          <Stack
            w="100%"
            justify="space-between"
            align={["flex-start", null, "center"]}
            flexDir={["column", null, "row"]}
          >
            <Heading
              as="h3"
              size="xs"
              color={fontColorMode}
              fontFamily="Yantramanav, sans-serif !important"
            >
              By{" "}
              <chakra.span
                color={colorMode === "light" ? "grey.500" : "grey.100"}
              >
                Liam Davis
              </chakra.span>
            </Heading>
            <HStack
              justify={["center", null, "flex-end"]}
              spacing={2}
              m={["1vh 0 !important", null, 0]}
              alignSelf={["flex-end", null, "inherit"]}
            >
              {post?.tags &&
                post?.tags.map((tag) => {
                  return <TagButton tag={tag} key={tag} />;
                })}
            </HStack>
          </Stack>
          <HStack w="100%" justify="space-between" color={fontColorMode}>
            <Text fontFamily="Yantramanav, sans-serif !important">
              {`${post?.minutes_to_read} min. read`}
            </Text>
            <Text fontFamily="Yantramanav, sans-serif !important">
              {post?.published}
            </Text>
          </HStack>
          <Spacer />
          <AspectRatio
            className={styles.hero_img_container}
            m="2vh auto !important"
            w={["90%", null, "75%"]}
            maxW={["90%", null, "75%"]}
            ratio={16 / 9}
            position="relative"
          >
            <NextImage
              src={`/images/blog/${post.hero_image}`}
              layout="fill"
              objectFit="cover"
              priority={true}
            />
          </AspectRatio>
          <VStack
            w="100%"
            align="flex-start"
            sx={{
              "ol code, li code, p code, a code": {
                bg: useColorModeValue("rgb(247, 243, 247)", "rgb(63, 63, 63)"),
                px: "5px",
                borderRadius: "5px",
              },
              "li, li a": {
                fontSize: "18px",
              },
              "li p": { display: "inline" },
              p: { fontSize: "18px" },
            }}
          >
            <ReactMarkdown
              renderers={Renderers(isMobile, colorMode)}
              children={post.md}
            />
          </VStack>
          <VStack w="100%">
            <Heading as="h3" size="sm" textAlign="center">
              If you found this article useful, please consider donating:
            </Heading>
            <HStack
              w={["65%", null, "50%", "55%", "35%"]}
              justify="space-between"
              mt="2.5vh !important"
            >
              <Button
                as="a"
                fontSize="32px"
                color={color}
                cursor="pointer"
                _hover={{
                  color: colorMode === "light" ? "grey.base" : "grey.100",
                }}
                transition="0.25s all"
                href="https://www.buymeacoffee.com/liamdavis"
                rel="noopener noreferrer nofollow"
                target="_blank"
              >
                <ChakraDollar />
              </Button>
              {cryptoDonationOptions.map((crypto) => {
                const CryptoIcon = crypto.component;

                return (
                  <Button
                    fontSize="32px"
                    color={color}
                    _hover={{
                      color: colorMode === "light" ? "grey.base" : "grey.100",
                    }}
                    transition="0.25s all"
                    key={`${crypto.name}-container`}
                    onClick={() => {
                      setChosenCrypto(crypto);
                      onOpen();
                    }}
                  >
                    <CryptoIcon key={`${crypto.name}-icon`} />
                  </Button>
                );
              })}
            </HStack>
          </VStack>
        </Frame>
      </Box>
      <DonateCryptoModal
        isOpen={isOpen}
        onClose={onClose}
        crypto={chosenCrypto}
      />
      <ScrollToTopButton scrollRef={scrollRef} />
    </>
  );
};

export default BlogPost;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getSinglePost(
    "/src/content",
    `${params.slug as string}.md`
  );

  // const pageViewsReq = await axios.get(
  //   `https://plausible.io/api/v1/stats/aggregate?site_id=liamdavis.dev&period=6mo&filters=event:page%3D%3D%2Fblog%2Fpost%2F${params.tag}`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${process.env.PLAUSIBLE_API_KEY}`,
  //     },
  //   }
  // );

  // const { data }: { data: { results: { visitors: { value: number } } } } =
  //   pageViewsReq;
  // const { results } = data;
  // const { visitors } = results;
  // const { value: pageViews } = visitors;

  return { props: { post: postData, slug: params.slug as string } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugArr = await getAllPostSlugs("/src/content");

  return {
    paths: slugArr,
    fallback: false,
  };
};
