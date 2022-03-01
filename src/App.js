import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Redirect, Link } from "react-router-dom";

const Hello = () => {
  return <h1>Hello</h1>;
};
const Goodbye = () => {
  return <h1>Goodbye</h1>;
};

function App() {
  const [state, setState] = useState("");

  const testLogin = () => {
    axios
      .get("https://gdd-server.herokuapp.com/login")
      .then((response) => console.log(response));
  };
  const testLogout = () => {
    axios
      .get("https://gdd-server.herokuapp.com/logout")
      .then((response) => console.log(response));
  };
  const getProtected = () => {
    axios
      .get("https://gdd-server.herokuapp.com/protected")
      .then((response) => console.log(response));
  };

  useEffect(() => {
    axios.get("https://gdd-server.herokuapp.com").then((response) => {
      setState(response.data);
    });
  }, []);
  return (
    <div className="App">
      <h1>GDD</h1>
      <p>{String(state)}</p>
      <button onClick={testLogin}>Login</button>
      <button onClick={testLogout}>Logout</button>
      <button onClick={getProtected}>protected?</button>

      <BrowserRouter>
        <Link to="/hello">say Hello</Link>
        <Link to="/goodbye">say Goodbye</Link>
        <Routes>
          <Route exact path="/hello" element={<Hello />} />
          <Route exact path="/goodbye" element={<Goodbye />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
