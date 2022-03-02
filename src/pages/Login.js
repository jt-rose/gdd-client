import { useState } from "react";
import { post } from "../utils/serverURL";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // attempt to login
    const response = await post("/user/login", { username, password });

    console.log(response.data);

    // if successful, move to home page

    // if unsuccessful, redirect back to login with error message
  };

  return (
    <>
      <h1>Login</h1>;
      <form>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>login</button>
      </form>
    </>
  );
};
