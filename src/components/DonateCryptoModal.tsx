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
} from "@chakra-ui/react";
import { default as NextImage } from "next/image";

const DonateCryptoModal = ({ isOpen, onClose, crypto }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Donate {crypto.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w="100%" justify="center" align="center">
            <NextImage src={`${crypto.name}.png`} width={375} height={375} />
            <Text>Address:</Text>
            <Text>{crypto.address}</Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button m="0 auto !important" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DonateCryptoModal;
