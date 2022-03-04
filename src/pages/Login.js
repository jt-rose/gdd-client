import { post } from "../utils/serverURL";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { Layout, LeftContent, RightContent } from "../components/Layout";

import { Navbar } from "../components/Navbar";

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
      <Layout title="Login">
        <LeftContent>
              {errorMessage && <p>{errorMessage}</p>}

              <form onSubmit={handleSubmit}>
              <div className="formBox">
              <div className="pairs">
              UserName:{" "}
                <input
                className="input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                </div>
                 <div className="pairs">
                Password:{" "}
                <input
                className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <input className="buttForm1" type='submit' value='login'/>
                </div>
                </div>
              </form>

              </LeftContent>
              
            </Layout>
  );
};
