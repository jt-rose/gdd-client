import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { get, post, put, remove } from "../utils/serverURL";
import { EditableText } from "../components/EditableText";
import { EditableCard } from "../components/EditableCard";
import { Layout, LeftContent, RightContent } from "../components/Layout";
import { EditableSelect } from "../components/EditableSelect";

export const Design = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [creator, setCreator] = useState(null);
  const [myProject, setMyProject] = useState(false);
  // {target: 'locations', index: number | null}
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [pendingCollabRequest, setPendingCollabrequest] = useState(false);
  const [isDesignCreator, setIsDesignCreator] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [collabRequestUsers, setCollabRequestUsers] = useState([]);
  const [modalFixedSize, setModalFixedSize] = useState(false);

  const { designid } = useParams();
  const navigate = useNavigate();

  // load and preview the image file ahead of submitting the update
  const handleImageLoad = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSaveImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("updateField", "main-image");
    formData.append("updateIndex", null);
    const response = await put("/doc/edit/image/" + designid, formData);
    console.log(response.data);
  };

  const handleDelete = async () => {
    await remove("/doc/delete/" + designid);
    navigate("/");
  };

  const handleTrash = async () => {
    await put("/doc/trash/" + designid);
    navigate("/");
  };

  const handleJoinRequest = async () => {
    console.log("hi");
    const response = await post("/doc/join", {
      designId: designid,
    });
    console.log(response.data);
    if (!response.data.error) {
      setData(response.data.designDoc);
      setMyProject(response.data.myProject);
      setPendingCollabrequest(response.data.pendingCollabRequest);
      setIsDesignCreator(response.data.isDesignCreator);
      setCollaborators(response.data.collaborators);
      setCollabRequestUsers(response.data.collabRequestUserData);
    }
  };

  const handleJoinAccept = async (requestingUserId) => {
    const response = await post("/doc/join/accept", {
      designId: designid,
      requestingUserId,
    });

    if (!response.data.error) {
      setData(response.data.designDoc);
      setMyProject(response.data.myProject);
      setPendingCollabrequest(response.data.pendingCollabRequest);
      setIsDesignCreator(response.data.isDesignCreator);
      setCollaborators(response.data.collaborators);
      setCollabRequestUsers(response.data.collabRequestUserData);
    }
  };

  const handleJoinReject = async (requestingUserId) => {
    const response = await post("/doc/join/reject", {
      designId: designid,
      requestingUserId,
    });
    console.log(response.data);
    if (!response.data.error) {
      setData(response.data.designDoc);
      setMyProject(response.data.myProject);
      setPendingCollabrequest(response.data.pendingCollabRequest);
      setIsDesignCreator(response.data.isDesignCreator);
      setCollaborators(response.data.collaborators);
      setCollabRequestUsers(response.data.collabRequestUserData);
    }
  };

  useEffect(async () => {
    const response = await get("/doc/" + designid);
    setData(response.data.designDoc);
    setCreator(response.data.creator);
    setMyProject(response.data.myProject);
    setPendingCollabrequest(response.data.pendingCollabRequest);
    setIsDesignCreator(response.data.isDesignCreator);
    setCollaborators(response.data.collaborators);
    setCollabRequestUsers(response.data.collabRequestUserData);
    console.log(response.data);
    setIsLoading(false);
  }, []);

  return (
    <Layout
      title="Game Design Document"
      designPage={true}
      modalFixedSize={modalFixedSize}
    >
      <LeftContent>
        {!isLoading && (
          <>
            <div className="docPairs">
              <div className="docName">
                <EditableText
                  designid={designid}
                  updateField="name"
                  text={data.name}
                  setData={setData}
                  large={true}
                  myProject={myProject}
                />
                <div className="smallImgBox" onClick={() => navigate("/user/" + creator.username)}>
                  <p>created by <span id='accentColor'>{creator.username}</span></p>
                  <img className="smallImg" src={creator.image} />
                </div>
              </div>


              <div className="gddPic2">
                {!imagePreview && <img className="gddImg" src={data.image} />}
                {imagePreview && <img className="gddImg" src={imagePreview} />}
              </div>
              {myProject && (
                <div className="gddPicFile">
                  <input
                    className="inputfile"
                    type="file"
                    onChange={handleImageLoad}
                  />
                  <button className="buttForm2" onClick={handleSaveImage}>
                    Save Image
                  </button>
                </div>
              )}
            </div>
            <div className="docPairs">
              <EditableSelect
                designid={designid}
                genre={data.genre}
                myProject={myProject}
                setData={setData}
              />
              <div className="story">
                <EditableText
                  designid={designid}
                  updateField="story"
                  text={data.story || ""}
                  myProject={myProject}
                  setData={setData}
                />
                {!data.story && <p>-- No story listed yet --</p>}
              </div>
            </div>
            <div className="docPairs">
              <h2>CHARACTERS</h2>
              <div className="cardLocation docCard">
                {myProject && (
                  <EditableCard
                    designid={designid}
                    cardData={{
                      name: "Character Name",
                      description: "Description",
                      image: "../../gmPic.png",
                    }}
                    currentDataArray={data.characters}
                    editingTarget={{ index: data.characters.length }}
                    updateField={"characters"}
                    buttonName="Add"
                    addNew={true}
                    myProject={myProject}
                    setData={setData}
                    setModalFixedSize={setModalFixedSize}
                  />
                )}

                {data.characters.reverse().map((c, index) => (
                  <EditableCard
                    key={"char-card-" + index}
                    designid={designid}
                    cardData={c}
                    currentDataArray={data.characters}
                    editingTarget={{ index }}
                    updateField={"characters"}
                    buttonName="Edit"
                    myProject={myProject}
                    setData={setData}
                    setModalFixedSize={setModalFixedSize}
                  />
                ))}
                {!myProject && data.characters.length === 0 && (
                  <p>-- No characters listed yet --</p>
                )}
              </div>
            </div>
            <div className="docPairs">
              <h2>LOCATIONS</h2>
              <div className="cardLocation docCard">
                {myProject && (
                  <EditableCard
                    designid={designid}
                    cardData={{
                      name: "Location Name",
                      description: "Description",
                      image: "../../gmPic.png",
                    }}
                    currentDataArray={data.locations}
                    editingTarget={{ index: data.locations.length }}
                    updateField={"locations"}
                    buttonName="Add"
                    addNew={true}
                    myProject={myProject}
                    setData={setData}
                    setModalFixedSize={setModalFixedSize}
                  />
                )}

                {data.locations.reverse().map((l, index) => (
                  <EditableCard
                    key={"loc-card-" + index}
                    designid={designid}
                    cardData={l}
                    currentDataArray={data.locations}
                    editingTarget={{ index }}
                    updateField={"locations"}
                    buttonName="Edit"
                    myProject={myProject}
                    setData={setData}
                    setModalFixedSize={setModalFixedSize}
                  />
                ))}
                {!myProject && data.locations.length === 0 && (
                  <p>-- No locations listed yet --</p>
                )}
              </div>
            </div>
            <div className="docPairs">
              <h2>ITEMS</h2>
              <div className="cardItems docCard">
                {myProject && (
                  <EditableCard
                    designid={designid}
                    cardData={{
                      name: "Name",
                      description: "Description",
                      image: "../../gmPic.png",
                    }}
                    currentDataArray={data.items}
                    editingTarget={{ index: data.items.length }}
                    updateField={"items"}
                    buttonName="Add"
                    addNew={true}
                    myProject={myProject}
                    setData={setData}
                    setModalFixedSize={setModalFixedSize}
                  />
                )}

                {data.items.map((item, index) => (
                  <EditableCard
                    key={"item-card-" + index}
                    designid={designid}
                    cardData={item}
                    currentDataArray={data.items}
                    editingTarget={{ index }}
                    updateField={"items"}
                    buttonName="Edit"
                    myProject={myProject}
                    setData={setData}
                    setModalFixedSize={setModalFixedSize}
                  />
                ))}
                {!myProject && data.items.length === 0 && (
                  <p>-- No items listed yet --</p>
                )}
              </div>
            </div>
            <div className="docPairs">
              <h2>GAMEPLAY MECHANICS</h2>
              <div className="cardGpMech docCard">
                {myProject && (
                  <EditableCard
                    designid={designid}
                    cardData={{
                      name: "Gameplay Mechanic",
                      description: "Description",
                      image: "../../gmPic.png",
                    }}
                    currentDataArray={data.gameplay}
                    editingTarget={{ index: data.gameplay.length }}
                    updateField={"gameplay"}
                    buttonName="Add"
                    addNew={true}
                    myProject={myProject}
                    setData={setData}
                    setModalFixedSize={setModalFixedSize}
                  />
                )}

                {data.gameplay.map((gm, index) => (
                  <EditableCard
                    key={"gameplay-card-" + index}
                    designid={designid}
                    cardData={gm}
                    currentDataArray={data.gameplay}
                    editingTarget={{ index }}
                    updateField={"gameplay"}
                    buttonName="Edit"
                    myProject={myProject}
                    setData={setData}
                    setModalFixedSize={setModalFixedSize}
                  />
                ))}
                {!myProject && data.gameplay.length === 0 && (
                  <p>-- No gameplay mechanics listed yet --</p>
                )}
              </div>
            </div>
            <div className="docPairs">
              <h2>COLLABORATORS</h2>
              <div className="cardGpMech docCard">
                {collaborators.map((collabs, index) => (
                <div key={"coll-card-" + index} className="collabCard3" onClick={() => navigate("/user/" + collabs.username)}  >
                  <img className="collabPic" src={collabs.image} />
                  <h3 className="collabName3">{collabs.username}</h3>
                </div>

              ))}
              </div>
            </div>

            {!myProject && !pendingCollabRequest && (
              <div id="requestBox">
                <button className="buttForm1" onClick={handleJoinRequest}>
                  Request to Join Design Team
                </button>
              </div>
            )}
            {!myProject && pendingCollabRequest && (
              <div id="requestBox">
                <p className="glow">
                  -- A request to join this design team has been sent! --
                </p>
              </div>
            )}

            {isDesignCreator && data.collabRequestUsers.length !== 0 && (
              <div className="collabBox">
                <h2 className="glow">Collaboration Requests</h2>
                {collabRequestUsers.map((u, index) => (
                  <div className="collabBoxName" key={"collab-request-" + index}>

                  <div className="smallImgBox2" onClick={() => navigate("/user/" + u.username)}>
                    <img className="smallImg2" src={u.image}/>
                    <p>
                      <span id="reqName">{u.username}</span> wants to join this
                      project
                    </p>
                  </div>

                    <div id="requestButtBox">
                      <button
                        className="buttForm1"
                        id="accept"
                        onClick={() => handleJoinAccept(u._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="buttForm1"
                        id="delete"
                        onClick={() => handleJoinReject(u._id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {isDesignCreator && (
              <div className="docButt">
                <button id="trash" className="buttForm1" onClick={handleTrash}>
                  Send to Trash
                </button>
                <button
                  id="delete"
                  className="buttForm1"
                  onClick={handleDelete}
                >
                  **Delete** Document
                </button>
              </div>
            )}
          </>
        )}
      </LeftContent>
    </Layout>
  );
};
