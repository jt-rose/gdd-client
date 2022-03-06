import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { get, post } from "../utils/serverURL";
import { Navbar } from "../components/Navbar";
import { Layout, LeftContent, RightContent } from "../components/Layout";
import { FaUserFriends, FaShareAlt, FaFacebookMessenger } from "react-icons/fa";
import { IoLogoGameControllerB, IoMdPersonAdd } from "react-icons/io";
import { GiHoodedAssassin, GiAxeSword } from "react-icons/gi";
import { FcSearch } from "react-icons/fc";
import { RiTeamFill } from "react-icons/ri";
import { TiWorld } from "react-icons/ti";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [newDesignName, setNewDesignName] = useState("");
  const [toggle, setToggle] = useState(false);
  const params = useParams();

  const show = () => {
    setToggle((prevState) => !prevState);
  };
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 800px)").matches
  );

  let navigate = useNavigate();

  const handleCreateDesign = async (e) => {
    e.preventDefault();
    const response = await post("/doc/create", {
      name: newDesignName,
    });
    navigate("/design/" + response.data._id);
  };

  useEffect(() => {
    const paramRoute = params.username ? "/" + params.username : "";
    get("/user" + paramRoute).then((response) => {
      if (response.data.error) {
        console.log(response.data);
        navigate("/welcome");
      } else {
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
        window
          .matchMedia("(min-width: 890px)")
          .addEventListener("change", (e) => setMatches(e.matches));
      }
    });
  }, [params]);

  // console.log(data);
  // console.log(data.myDesigns.length);
  return (
    <Layout title="Home">
      <LeftContent>
        {!isLoading && (
          <>
            <div className="homeDiv">
              <div id="picBox">
                <img className="profilePic" src={data.user.image} />
                <div className="pCardContent">
                  <div className="profileName">
                    <h2>{data.user.username}</h2>
                  </div>
                  <div className="profileName">{data.user.location}</div>
                  <div className="profileName">{data.user.company}</div>
                  <div className="profileName"> {data.user.description}</div>
                </div>
              </div>
              <ul id="userStats">
                <li>
                  <IoLogoGameControllerB />
                  <span> {data.user.designs.length}</span> Game Documents
                </li>
                <li>
                  <RiTeamFill />
                  <span> {data.user.collabs.length}</span> Collaborators
                </li>
                <li>
                  <FaUserFriends />
                  <span> {data.user.acceptedRequests.length} </span>Game Collabs
                </li>
                <li>
                  <IoMdPersonAdd />{" "}
                  <span className="redNum">
                    {data.user.collabRequests.length}
                  </span>{" "}
                  Collab Request
                </li>
                <li>
                  <FaShareAlt />
                  <span> 22 </span> Shares
                </li>
                <li>
                  <FaFacebookMessenger />
                  <span className="redNum"> 5 </span>Messages
                </li>
              </ul>
            </div>
            <div className="homeDivBottom">
              {data.myPage && (
                <div id="newGDD" style={{ height: toggle ? "100px" : "20px" }}>
                  <button
                    style={{ display: toggle ? "none" : "block" }}
                    className="buttForm1 butt"
                    onClick={(event) => show()}
                  >
                    Create a Game Document
                  </button>
                  <form onSubmit={handleCreateDesign} id="newGDDForm">
                    <label
                      id="newGDDLabel"
                      onClick={(event) => show()}
                      htmlFor="newDesignName"
                    >
                      CloseX
                    </label>
                    <input
                      placeholder="type name of new document"
                      type="text"
                      value={newDesignName}
                      onChange={(e) => setNewDesignName(e.target.value)}
                      required
                    />
                    <input className="buttForm1" type="submit" value="Create" />
                  </form>
                </div>
              )}
              {data.myDesigns.reverse().map((designs, index) => {
                return (
                  <div
                    className="gddCard"
                    key={"design-" + index}
                    onClick={(e) => navigate("/design/" + designs._id)}
                  >
                    <div className="gddCardLeft">
                      <img className="gddPic" src={designs.image}/>
                      <h2>{designs.name}</h2>
                      <p>Genre: {designs.genre}</p>
                    </div>
                    <div className="gddCardRight">
                      <ul>
                        <li>
                          <TiWorld /> Locations: {designs.locations.length}
                        </li>
                        <li>
                          <GiHoodedAssassin /> Characters:{" "}
                          {designs.characters.length}
                        </li>
                        <li>
                          <GiAxeSword /> Items: {designs.items.length}
                        </li>
                        <li>
                          <FaUserFriends /> Collaborators:{" "}
                          {designs.locations.length}
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </LeftContent>
      {matches && (
        <RightContent>
          {!isLoading && (
            <>
              <h2> Collabs</h2>
              {data.collaborators.map((collabUser, index) => {
                return (
                  <div
                    className="collabCard"
                    key={"caollab-" + index}
                    onClick={() => navigate("/user/" + collabUser.username)}
                  >
                    <div className="collabContent">
                      <div className="collabContentTop">
                        <div className="collabName">
                          <h3>{collabUser.username}</h3>
                          <span className="date2">{collabUser.username}</span>
                          {collabUser.description}
                          <br />
                          Game they are working on
                        </div>
                        <img className="collabPic" src="../../pfPic.png" />
                      </div>
                      <div className="collabContentBottom">
                        <IoLogoGameControllerB />
                        <div className="tags">Dungeon Level</div>
                        <GiHoodedAssassin />
                        <div className="tags"> Characters</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </RightContent>
      )}
    </Layout>
  );
};
