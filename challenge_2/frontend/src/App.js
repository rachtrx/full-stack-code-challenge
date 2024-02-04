import "./App.css";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, Fragment } from "react";
import { useLocation, Outlet } from 'react-router-dom';
import { Flex, Box, Text, Button, useColorModeValue } from '@chakra-ui/react';
// import ReduxToasts from "./components/toast.component";

export default function App() {

    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.auth.user)
    const location = useLocation();

    useEffect(() => {
      // This will clear the message on every location change
      dispatch(clearMessage());
    }, [location, dispatch]);

    // useEffect(() => {
    //   // Define the event listener callback function
    //   const handleLogoutEvent = (e) => {
    //     logout(e.detail);
    //   };
  
    //   document.addEventListener("logout", handleLogoutEvent);
  
    //   return () => {
    //     document.removeEventListener("logout", handleLogoutEvent);
    //   };
    // }, []);

    const bg = useColorModeValue('gray.100', 'gray.800');
    const color = useColorModeValue('gray.800', 'white');

    return (
      <Box>
      <Flex bg={bg} color={color} minHeight="60px" alignItems="center" justifyContent="space-between" px={8}>
        <Text fontSize="xl" fontWeight="bold">
          Traxx Coding Challenge
        </Text>
        <Flex alignItems="center">
          {currentUser ? (
            <>
              <Text mr={4}>Welcome, {currentUser}</Text>
              <Button ml={4} colorScheme="blue" onClick={() => dispatch(logout())}>
                Log Out
              </Button>
            </>
          ) : <Fragment/>}
        </Flex>
      </Flex>
      <Outlet />
    </Box>
    );
}