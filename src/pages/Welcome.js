import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";

export const Welcome = () => {
  let navigate = useNavigate();

  return (
    <>
      <div className="main">
        <div className="mainEffect">
          <div className="mainContainer">
            <div className="header" padding="4" color="white">
              <h1>Welcome</h1>
              <Navbar />
            </div>
            <div className="content">
              <div className="contentLeft"></div>
              <div className="contentRight">
                <div maxW="xl" centerContent></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
