import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ChakraProvider, Box, Button,  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, useDisclosure, Container} from '@chakra-ui/react'


export const Home = () => {

const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>

      <Box className="main">
          <Box className="mainEffect">
              <Box  className="mainContainer" >
                <Box className='header' padding='4' color='white'>
                <Navbar />
                <h1>Home Page</h1>
                <Link className='links' to="/design">Design Doc</Link>
                <Link className='links' to="/search">Search projects</Link>

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
};
