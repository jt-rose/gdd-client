import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Redirect, Link } from "react-router-dom";
import { ChakraProvider, ButtonGroup, Button } from "@chakra-ui/react";
import { serverURL } from "./utils/serverURL";
import { RegisterForm } from "./components/RegisterForm";

const Hello = () => {
  return <h1>Hello</h1>;
};
const Goodbye = () => {
  return <h1>Goodbye</h1>;
};

function App() {
  const [state, setState] = useState("");
  console.log("NODE ENV is ", process.env.NODE_ENV);

  const testLogin = () => {
    axios
      .get(serverURL + "/login", { withCredentials: true })
      .then((response) => console.log(response));
  };
  const testLogout = () => {
    axios
      .get(serverURL + "/logout", { withCredentials: true })
      .then((response) => console.log(response));
  };
  const getProtected = () => {
    axios
      .get(serverURL + "/protected", { withCredentials: true })
      .then((response) => console.log(response));
  };

  useEffect(() => {
    axios.get("https://gdd-server.herokuapp.com").then((response) => {
      setState(response.data);
    });
  }, []);
  return (
    <ChakraProvider>
      <div className="App">
        <h1>GDD</h1>
        <p>{String(state)}</p>
        <br />
        <RegisterForm />
        <ButtonGroup>
          <Button onClick={testLogin}>Login</Button>
          <Button onClick={testLogout}>Logout</Button>
          <Button onClick={getProtected}>protected?</Button>
        </ButtonGroup>

        <BrowserRouter>
          <Link to="/hello">say Hello</Link>
          <Link to="/goodbye">say Goodbye</Link>
          <Routes>
            <Route exact path="/hello" element={<Hello />} />
            <Route exact path="/goodbye" element={<Goodbye />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}

export default App;
