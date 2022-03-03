import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Redirect, Link } from "react-router-dom";
import { serverURL } from "./utils/serverURL";
import { RegisterForm } from "./components/RegisterForm";
import { Home } from "./pages/Home";
import { Design } from "./pages/Design";
import { CreateDesign } from "./pages/CreateDesign";
import { EditDesign } from "./pages/EditDesign";
import { EditProfile } from "./pages/EditProfile";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Welcome } from "./pages/Welcome";
import { Search } from "./pages/Search";
import { Navbar } from "./components/Navbar";
import { ChakraProvider, Box, Button,  Drawer,  Container} from '@chakra-ui/react'

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

      // <Navbar />
  return (

    <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/design/:designid" element={<Design />} />
        <Route exact path="/create" element={<CreateDesign />} />
        <Route exact path="/edit-design" element={<EditDesign />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/edit-profile" element={<EditProfile />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/welcome" element={<Welcome />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
</ChakraProvider>

  );
}

export default App;
