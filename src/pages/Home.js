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
                            <Box padding='4' bg='gray.100' maxW='3xl'>
                                There are many benefits to a joint design and development system. Not only
                                does it bring benefits to the design team.
                            </Box>
                        </Container>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>


    </>
  );
};
