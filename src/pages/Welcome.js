import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { Layout, LeftContent, RightContent } from "../components/Layout";

export const Welcome = () => {
  let navigate = useNavigate();

  const moveToLogin = () => {
    navigate("/login");
  };

  const moveToRegister = () => {
    navigate("/register");
  };

  const moveToSearch = () => {
    navigate("/search");
  };

  return (
    <div>
      <h1>GameDocs</h1>
      <p>Welcome to GameDocs - lorem ipsum</p>
      <button onClick={moveToRegister}>create an account</button>
      <button onClick={moveToLogin}>sign in</button>
      <button onClick={moveToSearch}>browse GDD</button>
    </div>
  );
  //   return (

  //     <Layout title="Home">
  //       <LeftContent>
  //     <>
  //     </>
  //     </LeftContent>
  //     <RightContent></RightContent>
  //   </Layout>
  //   );
};
