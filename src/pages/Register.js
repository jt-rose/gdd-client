import { useState, useEffect } from "react";
import axios from "axios";
import { post } from "../utils/serverURL.js";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";

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
    <>
      <div className="main">
        <div className="mainEffect">
          <div className="mainContainer">
            <div className="header" padding="4" color="white">
              <h1>Register</h1>
              <Navbar />

              <Link className="links" to="/design">
                Design Doc
              </Link>
              <Link className="links" to="/search">
                Search projects
              </Link>
            </div>
            <div className="content">
              <div className="contentLeft">
                {errorMessage && <p>{errorMessage}</p>}
                <form onSubmit={handleNewUser}>
                  <div id="formBox">
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
                        value="./pfPic.jpeg"
                        onChange={handleChange}
                        required
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
              </div>
              <div className="contentRight">
                <div maxW="xl" centerContent></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
