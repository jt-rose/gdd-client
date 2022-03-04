import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { get, post } from "../utils/serverURL";
import { Navbar } from "../components/Navbar";
import { Layout, LeftContent, RightContent } from "../components/Layout";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
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
      setData(response.data);
      setIsLoading(false);
      console.log(response.data);
    }
  }, []);

  return (
    <Layout title="Home">
      <LeftContent>
        {!isLoading && (
          <>
            <img src={data.user.image} />
            <label htmlFor="newDesignName">Name</label>
            <input
              type="text"
              value={newDesignName}
              onChange={(e) => setNewDesignName(e.target.value)}
            />
            <button onClick={handleCreateDesign}>Create</button>
          </>
        )}
      </LeftContent>
      <RightContent></RightContent>
    </Layout>
  );
};
