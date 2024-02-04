import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { deleteCurrency, initializeState } from "../actions/currency";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";

export default function TableComponent({ openModal }){

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeState());
    }, [dispatch]);
    
    const currencies = useSelector((state) => state.currencies);

    return (
        <Table variant="simple">
        <Thead>
            <Tr>
            <Th>Base Currency</Th>
            <Th>Counter Currency</Th>
            <Th>Rate</Th>
            <Th></Th>
            <Th></Th>
            </Tr>
        </Thead>
            <Tbody>
            {currencies.map((currency) => (
                <Tr key={currency.id}>
                    <Td>{currency.base}</Td>
                    <Td>{currency.counter}</Td>
                    <Td>{currency.rate}</Td>
                    <Td>
                    <Button colorScheme="yellow" onClick={() => openModal({id: currency.id, base: currency.base, counter: currency.counter, rate: currency.rate})}>
                        UPDATE
                    </Button>
                    </Td>
                    <Td>
                    <Button colorScheme="red" onClick={() => dispatch(deleteCurrency(currency.id))}>
                        DELETE
                    </Button>
                    </Td>
                </Tr>
            ))}
            </Tbody>
        </Table>
    )
}

