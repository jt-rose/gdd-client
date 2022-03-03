import { post } from "../utils/serverURL";
import { useNavigate } from "react-router";
import {useState, useEffect} from 'react';
import axios from 'axios'

import { Navbar } from "../components/Navbar";
import { ChakraProvider, Box, Button,  Drawer, Link, Container} from '@chakra-ui/react'

export const Login = () => {
const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // attempt to login
    const response = await post("/user/login", { username, password });

    console.log(response.data);

    // if successful, move to home page
    if (!response.data.error) {
      navigate("/");
    } else {
      setErrorMessage(response.data.error);
      setUsername("");
      setPassword("");
    }

    // if unsuccessful, redirect back to login with error message
  };



  return (

      <Box className="main">
          <Box className="mainEffect">
              <Box  className="mainContainer">
                <Box className='header' padding='4' color='white'>
                 <h1>Login</h1>
                 <Navbar />

                 

                </Box>
                <Box className= "content">
                    <Box className= "contentLeft">
      {errorMessage && <p>{errorMessage}</p>}
      <form>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>login</button>
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

  );
}
