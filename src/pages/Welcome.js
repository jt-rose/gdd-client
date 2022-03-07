import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { Layout, LeftContent, RightContent } from "../components/Layout";
import Slider from 'infinite-react-carousel';

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
    <div className="main">
      <div className="mainEffect">
        <div className="mainContainer">
          <div className="header" padding="4" color="white">
            <div>
              <h1>GameDocs</h1>
              <div className='contentLeft'>
                <p>Welcome to GameDocs </p>
                <button className='buttForm2' onClick={moveToRegister}>create an account</button>
                <button  className='buttForm2' onClick={moveToLogin}>sign in</button>
                <button className='buttForm2' onClick={moveToSearch}>browse GDD</button>
                <div className="sliderMain">
                  <div className="slider">
                    <div className='logos'>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../atari.png"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../sega.png"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../n64.png"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../nin.png"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../ps.png"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../ps5.jpeg"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../xbox.png"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../xboxX.jpeg"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../pc.png"/>
                      </div>


                      <div className='logoBox'>
                        <img className='gameLogo'src="../../atari.png"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../sega.png"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../n64.png"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../nin.png"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../ps.png"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../ps5.jpeg"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../xbox.png"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../xboxX.jpeg"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../pc.png"/>
                      </div>


                      <div className='logoBox'>
                        <img className='gameLogo'src="../../atari.png"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../sega.png"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../n64.png"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../nin.png"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../ps.png"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../ps5.jpeg"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../xbox.png"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../xboxX.jpeg"/>
                      </div>
                      <div className='logoBox'>
                        <img className='gameLogo'src="../../pc.png"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
