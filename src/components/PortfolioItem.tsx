import {
  VStack,
  HStack,
  Heading,
  Text,
  useColorMode,
  Box,
  Link as ChakraLink,
  useMediaQuery,
  Tooltip,
} from "@chakra-ui/react";
import styles from "src/theme/css/Portfolio.module.css";
import { PortfolioItemInterface } from "src/lib/interfaces";

const PortfolioItem = ({
  heading,
  duration,
  description,
  technologies,
  link,
}: PortfolioItemInterface) => {
  const { colorMode } = useColorMode();

  const [isLargerThan1024Px] = useMediaQuery("( min-width: 1025px )");

  return (
    <VStack
      className={styles.portfolio_item_container}
      align="flex-start"
      m="2.5vh 0 !important"
      w="100%"
    >
      <HStack w="100%" justify="space-between">
        <ChakraLink
          href={link}
          target="_blank"
          rel="noopener noreferral nofollow"
        >
          <Heading as="h3" size="sm">
            {heading}
          </Heading>
        </ChakraLink>
        {technologies && technologies.length > 0 ? (
          <HStack spacing={5}>
            {technologies.map((techObj, i) => {
              const TechIcon = techObj.component;

              return (
                <Box
                  fontSize="24px"
                  color={colorMode === "light" ? "grey.base" : "grey.100"}
                  key={`${techObj.name}-${i}-box`}
                >
                  <Tooltip
                    label={techObj.name}
                    aria-label="A tooltip for dark/light modes"
                    closeOnClick={isLargerThan1024Px ? false : true}
                    userSelect="none"
                    key={`${techObj.name}-${i}-tooltip`}
                  >
                    <span>
                      <TechIcon key={`${techObj.name}-${i}-icon`} />
                    </span>
                  </Tooltip>
                </Box>
              );
            })}
          </HStack>
        ) : null}
      </HStack>
      <Text
        color={colorMode === "light" ? "grey.500" : "grey.200"}
        fontSize="15px"
        mt="0vh !important"
        mb="1.25vh"
      >
        {!duration
          ? "Ongoing"
          : duration?.length === 1
          ? `${duration[0]}`
          : duration?.length === 2
          ? `${duration[0]} to ${duration[1]}`
          : "Ongoing"}
      </Text>
      <Text fontSize="17px" mt="0 !important">
        {description}
      </Text>
    </VStack>
  );
};

export default PortfolioItem;
