import { Box } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { m as motion } from "framer-motion";
import { default as NextImage } from "next/image";

const HomePage = () => {
  const { colorMode } = useColorMode();

  return (
    <Box w={["320px", null, "384px"]} h={["320px", null, "384px"]}>
      <motion.div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          userSelect: "none",
        }}
        initial={{ scaleY: 1 }}
        animate={{
          scaleY: colorMode === "light" ? 1 : -1,
        }}
        transition={{ bounce: 0, duration: 0 }}
      >
        {colorMode === "light" ? (
          <NextImage
            src="/logoDark.svg"
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        ) : (
          <NextImage
            src="/logoLight.svg"
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        )}
      </motion.div>
    </Box>
  );
};

export default HomePage;
