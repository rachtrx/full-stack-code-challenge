import TableComponent from "./table.component"
import CurrencyModal from "./modal.component"
import { useDisclosure } from '@chakra-ui/react';
import { Button, Container, Heading } from '@chakra-ui/react';
import { useState } from "react";


export default function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [current, setCurrent] = useState({id: "", base: "", counter: "", rate: ""});

    const openModal = (data = {}) => {
        setCurrent(data);
        onOpen();
    };

    const closeModal = () => {
        setCurrent({}); // Reset the mode
        onClose();
    };
  
    return (
        <Container mt="4">
          <Heading as="h2" size="lg" mb="3">Currency Management</Heading>
          <br/>
          <TableComponent openModal={(data) => openModal(data)}/>
          <br/>
          <Button colorScheme="green" mb="3" onClick={onOpen}>
            Add Currency
          </Button>
          <CurrencyModal isOpen={isOpen} onClose={closeModal} current={current}/>
        </Container>
      );
  }
