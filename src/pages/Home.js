import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { get } from "../utils/serverURL";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  let navigate = useNavigate();

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
      </>
    );
  }
};
