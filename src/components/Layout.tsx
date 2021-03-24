import { VStack, useColorModeValue, useColorMode } from "@chakra-ui/react";
import { m as motion } from "framer-motion";
import { ReactNode } from "react";
import Header from "src/components/Header";
import Footer from "src/components/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const bg = useColorModeValue("white", "black");
  const color = useColorModeValue("black", "white");
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack
      w="100vw"
      minH="100vh"
      p="7.5vh 10vw"
      justify="space-between"
      align="center"
      as={motion.div}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: [0, 0, 0, 0, 1], x: [-10, -10, -10, -10, 0] }}
      bg={bg}
      transition="0.25s all"
    >
      <Header
        color={color}
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
      />
      {children}
      <Footer color={color} colorMode={colorMode} />
    </VStack>
  );
};

export default Layout;
