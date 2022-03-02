import { useState } from "react";
import { post, serverURL } from "../utils/serverURL";
import { Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
import axios from "axios";

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
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit}>Register</Button>
      </FormControl>
    </>
  );
};
