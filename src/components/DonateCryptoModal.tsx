import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Text,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import { default as NextImage } from "next/image";
import { CryptoDonationOptionsInterface } from "src/lib/interfaces";
import styles from "src/theme/css/Image.module.css";

const DonateCryptoModal = ({
  isOpen,
  onClose,
  crypto,
}: {
  isOpen: boolean;
  onClose: () => void;
  crypto: CryptoDonationOptionsInterface;
}) => {
  const { colorMode } = useColorMode();

  const fontColor = colorMode === "light" ? "black" : "white";

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader userSelect="none" color={fontColor}>
          Donate {crypto.name}
        </ModalHeader>
        <ModalCloseButton
          borderRadius="5px"
          color={fontColor}
          _focus={{ boxShadow: "0 0 0 3px rgb(80 138 168 / 60%)" }}
        />
        <ModalBody color={fontColor}>
          <VStack w="100%" justify="center" align="center">
            <Box className={styles.img_container}>
              <NextImage
                src={`/images/donate/${crypto.name}.png`}
                width={300}
                height={300}
              />
            </Box>
            <Text mt="4vh !important" fontWeight="bold" userSelect="none">
              Address:
            </Text>
            <Text>{crypto.address}</Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            mr="auto"
            onClick={onClose}
            p="2%"
            borderRadius="5px"
            color={fontColor}
            bg={colorMode === "light" ? "grey.100" : "grey.600"}
            _hover={{
              background: colorMode === "light" ? "grey.200" : "grey.500",
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DonateCryptoModal;
