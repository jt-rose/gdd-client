import { useState, useEffect } from "react";
import axios from "axios";
import { post } from "../utils/serverURL.js";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Layout, LeftContent, RightContent } from "../components/Layout";


export const Register = () => {
  const [user, setNewUser] = useState({ image: "./pfPic.jpeg" });
  const [errorMessage, setErrorMessage] = useState(null);

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...user, [name]: value });
  };

  const handleNewUser = async (e) => {
    console.log(user.username);
    e.preventDefault();
    const response = await post("/user/register", {
      username: user.username,
      password: user.password,
      email: user.email,
      company: user.company,
      description: user.description,
      location: user.location,
      image: user.image,
    });
    console.log(response);
    if (!response.data.error) {
      navigate("/");
    } else {
      setErrorMessage(response.data.error.message);
    }
  };

  return (


    <Layout title="Register">
      <LeftContent>
      <>


                {errorMessage && <p>{errorMessage}</p>}

                <form onSubmit={handleNewUser}>
                  <div className="formBox">
                    <div className="pairs">
                      UserName:{" "}
                      <input
                        className="input"
                        name="username"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="pairs">
                      Password:{" "}
                      <input
                        type="password"
                        className="input"
                        name="password"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="pairs">
                      Email:{" "}
                      <input
                        className="input"
                        name="email"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="pairs">
                      Company:{" "}
                      <input
                        className="input"
                        name="company"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="pairs">
                      Location{" "}
                      <input
                        className="input"
                        name="location"
                        onChange={handleChange}
                        required
                      />
                      Description{" "}
                      <input
                        className="input"
                        name="description"
                        onChange={handleChange}
                        required
                      />
                      Image url:{" "}
                      <input
                        className="input"
                        name="image"
                        defaulValue="./pfPic.jpeg"
                        onChange={handleChange}
                        required
                      />
                      <input
                        className="buttForm1"
                        
                        type="submit"
                        value="Submit"
                      />
                    </div>
                  </div>
                </form>

              </>
              </LeftContent>
              <RightContent></RightContent>
            </Layout>

  );
};
