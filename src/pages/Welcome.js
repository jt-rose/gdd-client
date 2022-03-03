import '../App.css';
import { ChakraProvider, Box, Button,  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, useDisclosure } from '@chakra-ui/react'



export const Welcome = () => {


  return (
    <>
      <h1>Welcome</h1>


        <Box className="main">
            <Box className="mainEffect">
                <Box  className="mainContainer">
                  <header>
                      <ul>
                          <li>Link1</li>
                          <li>Link2</li>
                          <li>Link3</li>
                      </ul>

                  </header>


              </Box>
          </Box>
      </Box>
      </>
    );
  }
