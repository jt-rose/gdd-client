import '../App.css';
import { ChakraProvider, div, Button,  Drawer,
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


        <div className="main">
            <div className="mainEffect">
                <div  className="mainContainer">
                  <header>
                      <ul>
                          <li>Link1</li>
                          <li>Link2</li>
                          <li>Link3</li>
                      </ul>

                  </header>


              </div>
          </div>
      </div>
      </>
    );
  }
