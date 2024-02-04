import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';

export default function ReduxToasts() {
    const msg = useSelector(state => state.msg); // Adjust the path to where your msg state lives
    const toast = useToast();
  
    useEffect(() => {
        console.log(msg);

      if (msg.title && msg.status) {
        toast({
          title: msg.title,
          status: msg.status, // "success", "error", "warning", or "info"
          duration: 5000,
          isClosable: true,
        });
      }
    }, [msg, toast]);
  
    return null; // This component does not render anything
  }