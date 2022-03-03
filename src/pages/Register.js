import { useState, useEffect } from "react";
import axios from "axios";
import { post } from "../utils/serverURL.js";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Layout, LeftContent, RightContent } from "../components/Layout";


export const Register = () => {
  const [user, setNewUser] = useState({ image: "./pfPic.jpeg" });

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...user, [name]: value });
  };

  const handleNewUser = async (e) => {
    console.log(user.username);
    e.preventDefault();
    post("/user/register", {
      name: user.username,
      password: user.password,
      email: user.email,
      company: user.company,
      description: user.description,
      location: user.location,
      image: user.image,
    });
  };

  return (

    <Layout title="Register">
      <LeftContent>
      <>
                <form onSubmit={handleNewUser}>
                  <div id="formBox">
                    <div className="pairs">
                      UserName:{" "}
                      <input
                        className="input"
                        name="username"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="pairs">
                      Password:{" "}
                      <input
                        type="password"
                        className="input"
                        name="password"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="pairs">
                      Email:{" "}
                      <input
                        className="input"
                        name="email"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="pairs">
                      Company:{" "}
                      <input
                        className="input"
                        name="company"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="pairs">
                      Location{" "}
                      <input
                        className="input"
                        name="location"
                        onChange={handleChange}
                      />
                      Description{" "}
                      <input
                        className="input"
                        name="description"
                        onChange={handleChange}
                      />
                      Image url:{" "}
                      <input
                        className="input"
                        name="image"
                        value="./pfPic.jpeg"
                        onChange={handleChange}
                      />
                      <input
                        id="buttForm1"
                        className="butt"
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
