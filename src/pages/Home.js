import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { get, post } from "../utils/serverURL";

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

  if (isLoading) {
    return <p>...loading</p>;
  } else {
    return (
      <>
        <h1>Home Page</h1>
        <p>{String(userData)}</p>
        <label htmlFor="newDesignName">Name</label>
        <input
          type="text"
          value={newDesignName}
          onChange={(e) => setNewDesignName(e.target.value)}
        />
        <button onClick={handleCreateDesign}>Create</button>
      </>
    );
  }
};
