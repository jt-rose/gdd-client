import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [state, setState] = useState("");

  useEffect(() => {
    axios.get("https://gdd-server.herokuapp.com").then((response) => {
      setState(response.data);
    });
  }, []);
  return (
    <div className="App">
      <h1>GDD</h1>
      <p>{String(state)}</p>
    </div>
  );
}

export default App;
