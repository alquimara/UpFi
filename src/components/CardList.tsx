/* eslint-disable prettier/prettier */
import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [image, setImage] = useState('')


  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleImage(img) {
    setImage(img)
    onOpen()
  }

  return (
    <>
      <SimpleGrid columns={3} spacing='40px'>
        {cards.map((item) => (
          <Card key={item.id} data={item} viewImage={() => { handleImage(item.url) }} />
        ))}
      </SimpleGrid>
      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={image} />
    </>

  );
}
