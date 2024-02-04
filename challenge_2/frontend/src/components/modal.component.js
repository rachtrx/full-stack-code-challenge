import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';
import { addCurrency, updateCurrency } from '../actions/currency';
import { setMessage } from '../actions/message';

export default function CurrencyModal({ isOpen, onClose, current }) {

    const currencies = useSelector((state) => state.currencies);

    const dispatch = useDispatch();

    const pairExists = function(currencies, base, counter) {
        return currencies.some(pair => pair.base === base && pair.counter === counter);
      }

    const handleSubmit = async (values, { resetForm }) => {

        const finalValues = {
            ...values,
            base: values.base.toUpperCase(),
            counter: values.counter.toUpperCase()
          }

        if (current.id) {
            dispatch(updateCurrency(finalValues));
        } else {
            if (finalValues.base === finalValues.counter) {
                dispatch(setMessage("The currency pair cannot be the same currency", "error"))
                return;
            } else if (pairExists(currencies, finalValues.base, finalValues.counter)) {
                dispatch(setMessage("The currency pair already exists", "error"))
                return;
            } else {
                dispatch(addCurrency(finalValues));
            }
        }
        onClose(); // Close modal after action
        resetForm();
    };


    const initialValues = {
        id: current.id,
        base: current.base,
        counter: current.counter,
        rate: current.rate || 0
      };

    const modalBg = useColorModeValue('white', 'gray.700');
    const overlayBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(0, 0, 0, 0.8)');

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay bg={overlayBg} />
            <ModalContent bg={modalBg} borderRadius="lg">
            <ModalHeader>{current.id ? "Update Currency" : "Add Currency"}</ModalHeader>
            <ModalCloseButton size="md" />
            <ModalBody>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form>
                <FormControl isRequired mt="4">
                    <FormLabel htmlFor="base">Base Currency</FormLabel>
                    <Field name="base" as={Input} id="base" disabled={current.id}/>
                </FormControl>
                <FormControl isRequired mt="4">
                    <FormLabel htmlFor="counter">Counter Currency</FormLabel>
                    <Field name="counter" as={Input} id="counter" disabled={current.id}/>
                </FormControl>
                <FormControl isRequired mt="4">
                    <FormLabel htmlFor="rate">Rate</FormLabel>
                    <Field name="rate" as={Input} type="number" id="rate" />
                </FormControl>
                <Button mt="4" mb="4" colorScheme="blue" type="submit" isLoading={isSubmitting}>
                    {current.id ? "Update" : "Add"}
                </Button>
                </Form>
            )}
            </Formik>
            </ModalBody>
        </ModalContent>
    </Modal>
    );
}
