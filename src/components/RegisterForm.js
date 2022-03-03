import { useState } from "react";
import { post } from "../utils/serverURL";

export const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 3 || email.length < 3) {
      setErrorMessage("bad username and email");
    } else {
      const response = await post("/user/register", {
        username,
        email,
        password,
      });

      if (response.data.error) {
        setErrorMessage(response.data.error);
      }
      console.log(response.data);
    }
  };

  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}
      <form>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Register</button>
      </form>
    </>
  );
};
