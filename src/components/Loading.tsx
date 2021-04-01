import { Box, useColorMode } from "@chakra-ui/react";
import { m as motion } from "framer-motion";
import { default as NextImage } from "next/image";

const Loading = () => {
  const { colorMode } = useColorMode();

  return (
    <Box w={["160px", null, "192px"]} h={["160px", null, "192px"]}>
      <motion.div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          userSelect: "none",
        }}
        animate={{
          scale: [1, 0.975, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
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

export default Loading;
