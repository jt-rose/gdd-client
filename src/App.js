import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Design } from "./pages/Design";
import { EditProfile } from "./pages/EditProfile";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Welcome } from "./pages/Welcome";
import { Search } from "./pages/Search";

function App() {
  console.log("NODE ENV is ", process.env.NODE_ENV);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/design/:designid" element={<Design />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/edit-profile" element={<EditProfile />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/welcome" element={<Welcome />} />
        <Route path="/user/:username" element={<Home />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
