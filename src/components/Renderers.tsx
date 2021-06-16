import {
  ColorMode,
  Heading,
  Divider,
  Box,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/cjs/languages/hljs/javascript";
SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("js", js);
import {
  zenburn,
  atelierHeathLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import styles from "src/theme/css/Post.module.css";
import { default as NextImage } from "next/image";

type Child = { props: { src?: string; alt?: string; node: { type: string } } };

interface RenderPropsTypes {
  level?: number;
  language?: string;
  value?: string;
  children?: Child[];
  href?: string;
  src?: string;
  alt?: string;
}

const Renderers = (isMobile: boolean, colorMode: ColorMode) => {
  return {
    code: ({ language, value }: RenderPropsTypes) => {
      return (
        <Flex
          w="100%"
          justifyContent="center"
          alignItems="center"
          className={styles.custom_scrollbar}
        >
          <SyntaxHighlighter
            style={colorMode === "light" ? atelierHeathLight : zenburn}
            language={language}
            children={value}
            customStyle={{
              fontSize: "16px !important",
              transition: "0.25s all",
              borderRadius: "5px",
              margin: "3.5vh 0",
              width: !isMobile ? "90%" : "100%",
              maxWidth: !isMobile ? "90%" : "100%",
            }}
            codeTagProps={{
              style: {
                transition: "0.25s all",
              },
            }}
          />
        </Flex>
      );
    },
    heading: ({ level, children }: RenderPropsTypes) => {
      return (
        <Heading
          // @ts-ignore
          as={`h${level}`}
          className={styles.blog_font}
          size={
            level === 1 ? "lg" : level === 2 ? "md" : level === 3 ? "sm" : "xs"
          }
        >
          {children}
        </Heading>
      );
    },
    thematicBreak: () => {
      return <Divider />;
    },
    blockquote: ({ children }: RenderPropsTypes) => {
      return (
        <Box
          bg={colorMode === "light" ? "grey.50" : "grey.700"}
          color={colorMode === "light" ? "black" : "white"}
          p="1%"
          borderRadius="5px"
          m="2.5vh 0"
          fontSize="18px"
          className={styles.blockquote_container}
        >
          {children}
        </Box>
      );
    },
    link: ({ href, children }: RenderPropsTypes) => {
      return (
        <ChakraLink
          href={href}
          target="_blank"
          rel="noopener noreferral nofollow"
          color={colorMode === "light" ? "blue.500" : "blue.300"}
          transition="0.25s all"
          _hover={{
            color: colorMode === "light" ? "blue.700" : "blue.200",
            textDecoration: "underline",
          }}
          _focus={{
            boxShadow: "rgb(74 128 155 / 60%) 0px 0px 0px 3px !important",
          }}
          borderRadius="5px"
        >
          {children}
        </ChakraLink>
      );
    },
    image: ({ src, alt }: RenderPropsTypes) => {
      console.log(src);
      console.log(alt);

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
    paragraph: ({ children }: RenderPropsTypes) => {
      if (children[0].props.node.type === "image") {
        const { src, alt } = children[0].props;

        return (
          <Box
            position="relative"
            w={["90%", null, "75%", "80%", null]}
            h={["25vh", null, "20vh", null, "40vh"]}
            m="5vh 0 !important"
            alignSelf="center"
            className={
              styles[
                `img_container_${colorMode === "light" ? "light" : "dark"}`
              ]
            }
          >
            <NextImage src={src} alt={alt} layout="fill" objectFit="cover" />
          </Box>
        );
      } else {
        return <p>{children}</p>;
      }
    },
  };
};

export default Renderers;
