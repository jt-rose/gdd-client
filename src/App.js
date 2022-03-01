import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

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
    </div>
  );
}

export default App;
