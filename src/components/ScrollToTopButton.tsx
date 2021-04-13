import { Button } from "@chakra-ui/react";
import { m as motion } from "framer-motion";
import { ChakraUpArrow } from "src/lib/icons";
import { useState, useEffect } from "react";

const ScrollToTopButton = ({ scrollRef }) => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const checkScrollFromTop = () => {
    const scrollPosition = document.scrollingElement.scrollTop;

    if (scrollPosition >= 100) {
      setShowScrollButton(true);
    } else if (scrollPosition < 100) {
      setShowScrollButton(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", checkScrollFromTop);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", checkScrollFromTop);
      }
    };
  }, []);

  return (
    <Button
      as={motion.button}
      initial={{
        scale: 1,
        opacity: 0,
      }}
      animate={{
        opacity: showScrollButton ? 0.8 : 0,
      }}
      whileHover={{
        opacity: 1,
      }}
      whileTap={{
        scale: 0.9,
        opacity: 1,
      }}
      color="#508AA8"
      cursor={showScrollButton ? "pointer" : "default"}
      position="fixed"
      right={[0, null, "2.5rem"]}
      bottom="20px"
      border="none"
      p="0 !important"
      fontSize="48px"
      onClick={() => {
        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }}
    >
      <ChakraUpArrow />
    </Button>
  );
};

export default ScrollToTopButton;
