import { useState, useEffect } from "react";
import axios from "axios";
import { post, serverURL } from "../utils/serverURL.js";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Layout, LeftContent, RightContent } from "../components/Layout";

export const Register = () => {
  const [user, setNewUser] = useState({ image: "./pfPic.jpeg" });
  const [errorMessage, setErrorMessage] = useState(null);


  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 800px)").matches
  );

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...user, [name]: value });
  };

  const handleNewUser = async (e) => {
    console.log(user.username);
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", user.image);
    formData.append("username", user.username);
    formData.append("password", user.password);
    formData.append("email", user.email);
    formData.append("company", user.company);
    formData.append("description", user.description);
    formData.append("location", user.location);
    console.log("file-img: ", formData);

    // const response = await axios.post(
    //   serverURL + "/user/register",
    //   {
    //     username: user.username,
    //     password: user.password,
    //     email: user.email,
    //     company: user.company,
    //     description: user.description,
    //     location: user.location,
    //     image: formdata,
    //   },
    //   {
    //     withCredentials: true,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   }
    // );

    const response = await post(
      "/user/register",
      formData
      // {
      //   username: user.username,
      //   password: user.password,
      //   email: user.email,
      //   company: user.company,
      //   description: user.description,
      //   location: user.location,
      //   image: formdata,
      // }
    );
  console.log(response);
  if (!response.data.error) {
    navigate("/");
    } else {
    setErrorMessage(response.data.error.message);
    }
  };
  useEffect( async () => {
    window
      .matchMedia("(min-width: 890px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

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
                <div className="pairs">
                Description{" "}
                <input
                  className="input"
                  name="description"
                  onChange={handleChange}
                  required
                />
                </div>
                <div className="pairs">
                {!matches && (
                  <div className="regPicBox">
                    <img className="regPic" src={user.imagePreview} />
                  </div>
              )}
                <input
                  className="input"
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setNewUser({
                      ...user,
                      imagePreview: URL.createObjectURL(e.target.files[0]),
                      image: e.target.files[0],
                    })
                  }
                  required
                />
                </div>
                <input className="buttForm1" type="submit" value="Submit" />
              </div>
            </div>
          </form>
        </>
      </LeftContent>
      {matches && (
      <RightContent>

        <div className="regPicBox">
          <img className="regPic" src={user.imagePreview} />
        </div>

      </RightContent>
      )}
    </Layout>
  );
};
