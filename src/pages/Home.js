
import {useState, useEffect} from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { get, post } from "../utils/serverURL";
import { Navbar } from "../components/Navbar";



import { ChakraProvider, Box, Button,  Drawer, Link, Image, Container} from '@chakra-ui/react'


export const Home = () => {
const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [newDesignName, setNewDesignName] = useState("");

  let navigate = useNavigate();

  const handleCreateDesign = async () => {
    const response = await post("/doc/create", {
      name: newDesignName,
    });
    console.log(response);
    navigate("/design/" + response.data._id);
  };

  useEffect(async () => {
    const response = await get("/user");
    if (response.data.error) {
      navigate("/welcome");
    } else {
      setUserData(response.data);
      setIsLoading(false);
    }
  }, []);



  return (
    <>


      <Box className="main">
          <Box className="mainEffect">
              <Box  className="mainContainer">
                <Box className='header' padding='4' color='white'>
                 <h1>Home</h1>
                 <Navbar />

    {!isLoading && (
    <>
        <p>{String(userData)}</p>
        <label htmlFor="newDesignName">Name</label>
        <input
          type="text"
          value={newDesignName}
          onChange={(e) => setNewDesignName(e.target.value)}
        />
        <button onClick={handleCreateDesign}>Create</button>
      </>
  )}


                </Box>
                <Box className= "content">
                    <Box className= "contentLeft">

                    </Box>
                    <Box className= "contentRight">
                        <Container maxW='xl' centerContent>


                        <Box>
                          <Image src='../public/pfPic.png'  />
                          <Box className='cardContent'>
                            <Box className='cardName'>
                             Matthew
                            </Box>
                            <Box className='cardInfo'>
                              <span className='date'>Joined in 2015</span>
                              Matthew is a musician living in Nashville.
                            <a>

                              22 Friends
                            </a>
                            </Box>
                          </Box>
                        </Box>

                        </Container>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
    </>
  );
}
