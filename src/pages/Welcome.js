import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { Layout, LeftContent, RightContent } from "../components/Layout";


export const Welcome = () => {
  let navigate = useNavigate();

  return (

    <Layout title="Home">
      <LeftContent>
    <>
    </>
    </LeftContent>
    <RightContent></RightContent>
  </Layout>
  );
};
