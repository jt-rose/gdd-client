
import {useState, useEffect} from 'react';
import axios from 'axios'
import {post} from '../utils/serverURL.js'
import {useNavigate} from 'react-router'
import { Navbar } from "../components/Navbar";
import { ChakraProvider, Box, Button,  Drawer, Link,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, useDisclosure, Container} from '@chakra-ui/react'

export const Register = () => {

    const [user, setNewUser] = useState({image:'./pfPic.jpeg'});

    let navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewUser({ ...user, [name]: value });
    };

    const handleNewUser = async  (e) => {
        console.log(user.username);
        e.preventDefault();
        post(
            '/user/register',
            {
                name: user.username,
                password: user.password,
                email: user.email,
                company: user.company,
                description: user.description,
                location: user.location,
                image: user.image,
            }
        )}


  return (
    <>


      <Box className="main">
          <Box className="mainEffect">
              <Box  className="mainContainer">
                <Box className='header' padding='4' color='white'>
                 <h1>Register</h1>
                 <Navbar />

                 <Link className='links' to="/design">Design Doc</Link>
                 <Link className='links' to="/search">Search projects</Link>

                </Box>
                <Box className= "content">
                    <Box className= "contentLeft">
                        <form onSubmit={handleNewUser}>
                            <Box id="formBox">
                                <Box className='pairs'>
                                    UserName: <input className="input"  name='username' onChange={handleChange}/><br/>
                                    </Box>
                                    <Box className='pairs'>
                                    Password: <input type="password" className="input"  name='password' onChange={handleChange}/><br/>
                                </Box>
                                <Box className='pairs'>
                                    Email: <input className="input" name="email" onChange={handleChange}/><br/>
                                    </Box>
                                    <Box className='pairs'>
                                    Company: <input className="input" name='company' onChange={handleChange}/><br/>
                                </Box>
                                <Box className='pairs'>
                                    Location <input className="input" name='location' onChange={handleChange}/><br/>
                                    Description <input className="input" name='description' onChange={handleChange}/><br/>
                                    Image url: <input className="input" name='image' value='./pfPic.jpeg' onChange={handleChange}/><br/>
                                <input id='buttForm1' className='butt' type="submit" value="Submit"/>
                                </Box>
                            </Box>
                        </form>
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
