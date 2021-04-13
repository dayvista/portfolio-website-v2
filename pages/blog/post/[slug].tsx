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
  Divider,
  useColorModeValue,
  useDisclosure,
  Button,
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
import { useState, useRef } from "react";
import ScrollToTopButton from "src/components/ScrollToTopButton";
import DonateCryptoModal from "src/components/DonateCryptoModal";

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
  {
    component: ChakraBitcoin,
    name: "BTC",
    address: "3GnSprq2F4E14tr1MTgawdTSHeiGAzXKSt",
  },
  {
    component: ChakraLitecoin,
    name: "LTC",
    address: "MW57LEfQdHrEGoTNNoRxQUv7v26VTVELAU",
  },
  {
    component: ChakraEthereum,
    name: "ETH",
    address: "0x8D77C7A62246b0bf7867437f36865DdFF81D6E0E",
  },
  {
    component: ChakraRipple,
    name: "XRP",
    address: "rwEpLBJpSc3v8C8tsjw7ryvXTZNLMXnFCR",
  },
];

const BlogPost = ({ post }: PostInterface) => {
  const scrollRef = useRef(null);

  const router = useRouter();

  const [chosenCrypto, setChosenCrypto] = useState(cryptoDonationOptions[0]);

  const { colorMode } = useColorMode();

  const color = useColorModeValue("black", "white");

  const [isLargerThan500] = useMediaQuery("(min-width: 501px)");

  const fontColorMode = colorMode === "light" ? "grey.400" : "grey.200";

  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Box visibility="hidden" w={0} h={0} m="0 !important" ref={scrollRef} />
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
            <HStack spacing="5vw" mt="2.5vh !important">
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

  return { props: { post: postData } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugArr = await getAllPostSlugs("/src/content");

  return {
    paths: slugArr,
    fallback: false,
  };
};
