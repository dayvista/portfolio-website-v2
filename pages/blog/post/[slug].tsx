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
  Link as ChakraLink,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { getSinglePost, getAllPostSlugs } from "src/lib/utils";
import { TagButton } from "src/components/Blog";
import ReactMarkdown from "react-markdown";
import ProgressBar from "react-scroll-progress-bar";
import Frame from "src/components/Frame";
import Renderers from "src/components/Renderers";
import { default as NextImage } from "next/image";
import { default as NextLink } from "next/link";
import styles from "src/theme/css/Post.module.css";
import {
  ChakraKoFi,
  ChakraBitcoin,
  ChakraEthereum,
  ChakraLitecoin,
  ChakraRipple,
} from "src/lib/icons";

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

const cryptoDonationOptions = [
  { component: ChakraKoFi, link: "" },
  ChakraBitcoin,
  ChakraEthereum,
  ChakraLitecoin,
  ChakraRipple,
];

const BlogPost = ({ post }: PostInterface) => {
  const router = useRouter();

  const { colorMode } = useColorMode();

  const color = useColorModeValue("black", "white");

  const [isLargerThan500] = useMediaQuery("(min-width: 501px)");

  const fontColorMode = colorMode === "light" ? "grey.400" : "grey.200";

  return router.isFallback || !post ? (
    <LoadingDynamic />
  ) : (
    <>
      <Box position="fixed" top={0} left={0} mt="0 !important">
        <ProgressBar
          bgcolor={colorMode === "light" ? "#8f8592" : "#c3bbc4"}
          height="0.35rem"
        />
      </Box>
      <Box className="blog_post_container" w="100%">
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
              m={["2.5vh 0 !important", null, 0]}
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
          <Box
            className={styles.hero_img_container}
            m="2vh auto !important"
            w={["90%", null, "75%"]}
          >
            <NextImage
              src={`/images/blog/${post.hero_image}`}
              width={post.hero_image_dimensions.width}
              height={post.hero_image_dimensions.height}
              priority={true}
            />
          </Box>
          <ReactMarkdown
            renderers={Renderers(isLargerThan500, colorMode)}
            children={post.md}
          />
          <Divider />
          <VStack w="100%">
            <Heading as="h3" size="md" textAlign="center">
              If you found this article useful, please consider donating through
              one of the links below:
            </Heading>
            <HStack>
              <NextLink href="/donate/kofi">
                <a>
                  <Box
                    fontSize="32px"
                    color={color}
                    _hover={{
                      color: colorMode === "light" ? "grey.base" : "grey.100",
                    }}
                    transition="0.25s all"
                  >
                    <ChakraKoFi />
                  </Box>
                </a>
              </NextLink>
            </HStack>
          </VStack>
        </Frame>
      </Box>
    </>
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
