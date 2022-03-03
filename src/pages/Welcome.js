import {useState, useEffect} from 'react';
import axios from 'axios'

import {useNavigate} from 'react-router'
import { Navbar } from "../components/Navbar";
import { ChakraProvider, Box, Button,  Drawer, Link, Image,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, useDisclosure, Container} from '@chakra-ui/react'

export const Welcome= () => {

    let navigate = useNavigate();



  return (
    <>


      <Box className="main">
          <Box className="mainEffect">
              <Box  className="mainContainer">
                <Box className='header' padding='4' color='white'>
                 <h1>Welcome</h1>
                 <Navbar />



                </Box>
                <Box className= "content">
                    <Box className= "contentLeft">

                    </Box>
                    <Box className= "contentRight">
                        <Container maxW='xl' centerContent>


                        

                        </Container>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
    </>
  );
}
