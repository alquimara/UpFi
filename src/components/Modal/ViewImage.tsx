
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
    >
      <ModalOverlay />
      <ModalContent bg="pGray.800" width='auto' maxW='900px'>
        <ModalBody p='0' >
          <Image src={imgUrl} maxW='900px' maxH='600px' />
          <Link href={imgUrl} isExternal>
            Abrir original
          </Link>
        </ModalBody>
      </ModalContent>
    </Modal>
  )

}
