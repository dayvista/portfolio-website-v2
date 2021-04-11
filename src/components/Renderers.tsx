import { default as NextImage } from "next/image";
import styles from "src/theme/css/Post.module.css";
import {
  Heading,
  Text,
  Box,
  Divider,
  Link as ChakraLink,
  ColorMode,
} from "@chakra-ui/react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/cjs/languages/hljs/javascript";
// SyntaxHighlighter.registerLanguage('jsx', jsx)
// SyntaxHighlighter.registerLanguage('jsx=', jsx)
SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("js", js);
import {
  zenburn,
  atelierHeathLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { createVisualState } from "framer-motion/types/render/utils/state";

interface renderPropTypes {
  level?: number;
  language?: string;
  value?: string;
  children?: object[];
  href?: string;
  src?: string;
  alt?: string;
}

const Renderers = (colorMode: ColorMode) => {
  return {
    code: ({ language, value }: renderPropTypes) => {
      return (
        <SyntaxHighlighter
          style={colorMode === "light" ? atelierHeathLight : zenburn}
          language={language}
          children={value}
          customStyle={{
            fontSize: "16px !important",
            transition: "0.25s all",
            borderRadius: "5px",
            margin: "5vh 0",
            alignSelf: "center",
            width: "90%",
            maxWidth: "90%",
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

      return isImageOrLink ? (
        <>{children}</>
      ) : (
        <Text fontSize="18px" className={styles.blog_font}>
          {children}
        </Text>
      );
    },
  };
};

export default Renderers;
