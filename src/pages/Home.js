import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { get, post } from "../utils/serverURL";
import { Navbar } from "../components/Navbar";
import { Layout, LeftContent, RightContent } from "../components/Layout";
import { FaUserFriends, FaShareAlt, FaFacebookMessenger } from 'react-icons/fa';
import { IoLogoGameControllerB, IoMdPersonAdd } from 'react-icons/io';
import { GiHoodedAssassin  } from "react-icons/gi";
import { FcSearch } from 'react-icons/fc';
import { RiTeamFill  } from "react-icons/ri";


export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [newDesignName, setNewDesignName] = useState("");
  const [toggle, setToggle] = useState(false);

  const show = () => {
    setToggle((prevState) => !prevState);
  };
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 800px)").matches
  )

  let navigate = useNavigate();

  const handleCreateDesign = async () => {
    const response = await post("/doc/create", {
      name: newDesignName,
    });

    navigate("/design/" + response.data._id);
  };

  useEffect(async () => {
    const response = await get("/user");
    if (response.data.error) {
      navigate("/welcome");
    } else {
      setData(response.data);
      setIsLoading(false);
      console.log(response.data);
    }
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);


  // console.log(data);
  // console.log(data.myDesigns.length);
  return (
    <Layout title="Home">
      <LeftContent >
        {!isLoading && (
          <>
          {!matches &&
          <div className='search'>
              <input type="text" placeholder="Search.."/>
              <button type="submit"><FcSearch/></button>
          </div>
          }
          <div className='homeDiv'>
            <div id="picBox">
                <img className='profilePic' src={data.user.image}  />

            <div className='pCardContent'>
                <div className="profileName"><h2>{data.user.username}</h2></div>
                <div className="profileName">{data.user.location}</div>
                <div className="profileName">{data.user.company}</div>
                <div className="profileName"> {data.user.description}</div>
            </div>
            </div>
                <ul id='userStats'>
                    <li ><IoLogoGameControllerB/><span> 5 </span> Game Documents</li>
                    <li ><RiTeamFill/><span> 22 </span> Collaborators</li>
                    <li ><FaUserFriends/><span> 5 </span>Game Collabs</li>
                    <li ><IoMdPersonAdd/> <span className='redNum'>5</span> Collab Request</li>
                    <li ><FaShareAlt/><span> 22 </span> Shares</li>
                    <li ><FaFacebookMessenger/><span className='redNum'>  5 </span>Messages</li>
                </ul>

          </div>


           <div className='homeDivBottom'>

           <div id='newGDD' style = {{height: toggle ? "100px" : "20px"}}>
           <button style = {{display: toggle ? "none" : "block"}}
            className='buttForm1 butt'
            onClick= {(event)=> show()}>Create a Game Document
            </button>

            <form onSubmit= {handleCreateDesign} id='newGDDForm'>
            <label id='newGDDLabel' onClick= {(event)=> show()} htmlFor="newDesignName">CloseX</label>
            <input
                placeholder='type name of new document'
                  type="text"
                  value={newDesignName}
                  onChange={(e) => setNewDesignName(e.target.value)}
                  required
                />
                <input className='buttForm1'  type='submit' value='Ceate'/>
                </form>
                </div>


                {data.myDesigns.map((designs, index)=>{
                    return (
                <div className='gddCard' key={index}>
                <div className='gddCardLeft'>
                    <img className='gddPic' src="../../gmPic.png" />
                    <h2>{designs.name}</h2>
                    {data.myDesigns.genre}
                    Creator: {data.myDesigns.creator}
                </div>
                <div className='gddCardMid'>
                <ul>
                <li>Location:</li>
                <li>Characters:</li>
                <li>items:</li>
                </ul>
                </div>

                <div className='gddCardRight'>
                    <button className='buttForm1' id='editGDDButt' onClick={(e)=> navigate("/design/" + designs._id)}>edit</button>
                    <ul>
                    <li>Collaborators:</li>
                    <li>Collaborators:</li>
                    <li><FaUserFriends /> Collaborators: 2</li>
                    </ul>





                </div>

                </div>
                        )})}
                </div>
              </>

            )}


    </LeftContent>
    {matches &&
    <RightContent >
        {!isLoading && (
        <>
            <h2> Collabs</h2>
            <div className='collabCard'>
                <div className='collabContent'>
                    <div className='collabContentTop'>
                        <div className='collabName'>
                            <h3>{data.user.username}</h3>
                            <span className='date2'>{data.myDesigns.name}</span>
                            {data.user.description}<br/>
                            Game they are working on
                        </div>
                        <img className='collabPic' src="../../pfPic.png" />
                    </div>
                    <div className='collabContentBottom'>
                            <IoLogoGameControllerB />
                            <div className='tags'>Dungeon Level</div>
                            < GiHoodedAssassin />
                            <div className='tags'> Characters</div>

                    </div>
                </div>
            </div>

        </>
        )}
    </RightContent>
    }
    </Layout>
  );
};
