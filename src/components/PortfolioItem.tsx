import {
  VStack,
  HStack,
  Heading,
  Text,
  useColorMode,
  ChakraComponent,
  Box,
} from "@chakra-ui/react";
import styles from "src/theme/css/Portfolio.module.css";

interface PortfolioItemInterface {
  heading: string;
  duration?: boolean | [string, string];
  description: string;
  technologies: ChakraComponent<any>[];
}

const PortfolioItem = ({
  heading,
  duration,
  description,
  technologies,
}: PortfolioItemInterface) => {
  const { colorMode } = useColorMode();

  return (
    <VStack
      className={styles.portfolio_item_container}
      align="flex-start"
      m="2.5vh 0 !important"
      w="100%"
    >
      <HStack w="100%" justify="space-between">
        <Heading as="h3" size="sm">
          {heading}
        </Heading>
        {technologies && technologies.length > 0 ? (
          <HStack spacing={5}>
            {technologies.map((TechIcon) => {
              return (
                <Box
                  fontSize="24px"
                  color={colorMode === "light" ? "grey.base" : "grey.100"}
                >
                  <TechIcon />
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
        {duration ? `${duration[0]} to ${duration[1]}` : "Ongoing"}
      </Text>
      <Text fontSize="17px" mt="0 !important">
        {description}
      </Text>
    </VStack>
  );
};

export default PortfolioItem;
