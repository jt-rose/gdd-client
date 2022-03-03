import {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router";
import { get, put, remove } from "../utils/serverURL";
import { EditableText } from "../components/EditableText";
import { EditableCard } from "../components/EditableCard";
import axios from 'axios'

import {useNavigate} from 'react-router'
import { Navbar } from "../components/Navbar";
import { ChakraProvider, Box, Button,  Drawer, Link, Container} from '@chakra-ui/react'

export const Design = () => {
const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [editingTarget, setEditingTarget] = useState(null); // {target: 'locations', index: number | null}
  const { designid } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await remove("/doc/delete/" + designid);
    navigate("/");
  };

  const handleTrash = async () => {
    await put("/doc/trash/" + designid);
    navigate("/");
  };

  useEffect(async () => {
    const response = await get("/doc/" + designid);
    setData(response.data);
    setIsLoading(false);
  }, []);

  return (
    <>


      <Box className="main">
          <Box className="mainEffect">
              <Box  className="mainContainer">
                <Box className='header' padding='4' color='white'>
                 <h1>Design</h1>
                 <Navbar />



                </Box>
                <Box className= "content">
                    <Box className= "contentLeft">
<h1>GDD Page</h1>
      {!isLoading && (
        <>
          <p>{data.name}</p>
          <EditableText
            designid={designid}
            updateField="name"
            text={data.name}
            setData={setData}
            // editingTarget={editingTarget}
            // setEditingTarget={setEditingTarget}
          />

          <p>{data.image}</p>
          {/* {data.story &&} */}
          <EditableText
            designid={designid}
            updateField="story"
            text={data.story || ""}
            setData={setData}
          />
          {/* {data.characters.map(char => (
              <EditableCard />
          ))} */}
          <p>characters</p>
          {data.characters.map((c, index) => (
            <EditableCard
              designid={designid}
              cardData={c}
              currentDataArray={data.characters}
              editingTarget={{ index }}
              updateField={"characters"}
              setData={setData}
            />
          ))}
          <EditableCard
            designid={designid}
            cardData={{ name: "", description: "", image: "" }}
            currentDataArray={data.characters}
            editingTarget={{ index: data.characters.length }}
            updateField={"characters"}
            setData={setData}
          />
          <br />
          <button onClick={handleTrash}>Trash</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
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

