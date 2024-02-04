import React, { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../actions/auth';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Image,
  Center,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';


const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const initialValues = {
    username: "",
    password: "",
  };

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {

    try {
      await dispatch(login(values.username, values.password));
      navigate("/home");
      // window.location.reload();
      setSubmitting(false);
    } catch (err) {
      console.error(err)
      setSubmitting(false);
    }
  };

  return (
    <Box className="col-md-12">
    <Center py={12}>
      <Box
        maxW={'40vw'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Box mb={4} display={'flex'} justifyContent={'center'}>
          <Image
            borderRadius={'full'}
            boxSize={'100px'}
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="Profile image"
          />
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <VStack spacing={5}>
                <FormControl isRequired mt="4" mb="5" isInvalid={errors.username && touched.username} position="relative">
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Field name="username" as={Input} id="username"/>
                  <FormErrorMessage position="absolute" mt={1}>
                    <ErrorMessage name="username"/>
                  </FormErrorMessage>
                </FormControl>

                <FormControl isRequired mt="4" mb="5" isInvalid={errors.password && touched.password} position="relative">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field name="password" as={Input} id="password" type="password"/>
                  <FormErrorMessage position="absolute" mt={1}>
                    <ErrorMessage name="password"/>
                  </FormErrorMessage>
                </FormControl>

                <Button colorScheme="blue" type="submit" isLoading={isSubmitting} isFullWidth>
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  </Box>
  );
}