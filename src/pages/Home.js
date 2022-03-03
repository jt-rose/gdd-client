import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { get, post } from "../utils/serverURL";
import { Navbar } from "../components/Navbar";
import { Layout, LeftContent, RightContent } from "../components/Layout";
import { FaUserFriends } from 'react-icons/fa';

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
console.log(userData);
  return (
    <Layout title="Home">
      <LeftContent>
        {!isLoading && (
          <>
            <div className='profileCard'>
                <img className='profilePic' src='../../pfPic.png'  />
                <div className='pCardContent'>
                    {userData.username}
                    <span className='date'>{userData.location}</span>
                    {userData.description}
                    <a>
                        <FaUserFriends />22 Friends
                    </a>
                </div>
            </div>


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
      </LeftContent>
      <RightContent></RightContent>
    </Layout>
  );
};
