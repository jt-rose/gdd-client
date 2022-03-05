import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { get, post, put, remove } from "../utils/serverURL";
import { EditableText } from "../components/EditableText";
import { EditableCard } from "../components/EditableCard";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { Layout, LeftContent, RightContent } from "../components/Layout";
import { EditableSelect } from "../components/EditableSelect";

export const Design = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [editingTarget, setEditingTarget] = useState(null);
  // {target: 'locations', index: number | null}
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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

  useEffect(async () => {
    const response = await get("/doc/" + designid);
    setData(response.data);
    setIsLoading(false);
  }, []);

  return (
    <Layout title={isLoading ? "Design" : data.name}>
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
                  // editingTarget={editingTarget}
                  // setEditingTarget={setEditingTarget}
                />
              </div>
              <div className="gddPic2">
                {!imagePreview && <img className="gddImg" src={data.image} />}
                {imagePreview && <img className="gddImg" src={imagePreview} />}
              </div>
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
            </div>
            <div className="docPairs">
              <EditableSelect
                designid={designid}
                genre={data.genre}
                setData={setData}
              />
              <div className="story">
                <EditableText
                  designid={designid}
                  updateField="story"
                  text={data.story || ""}
                  setData={setData}
                />
              </div>
            </div>
            <div className="docPairs">
              <h2>Characters</h2>
              <div className="cardLocation docCard">
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
                  setData={setData}
                />
                {data.characters.reverse().map((c, index) => (
                  <EditableCard
                    designid={designid}
                    cardData={c}
                    currentDataArray={data.characters}
                    editingTarget={{ index }}
                    updateField={"characters"}
                    buttonName="Edit"
                    setData={setData}
                  />
                ))}
              </div>
            </div>
            <div className="docPairs">
              <h2>Locations</h2>
              <div className="cardLocation docCard">
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
                  setData={setData}
                />
                {data.locations.reverse().map((l, index) => (
                  <EditableCard
                    designid={designid}
                    cardData={l}
                    currentDataArray={data.locations}
                    editingTarget={{ index }}
                    updateField={"locations"}
                    buttonName="Edit"
                    setData={setData}
                  />
                ))}
              </div>
            </div>
            <div className="docPairs">
              <h2>Items</h2>
              <div className="cardItems docCard">
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
                  setData={setData}
                />
                {data.items.map((item, index) => (
                  <EditableCard
                    designid={designid}
                    cardData={item}
                    currentDataArray={data.items}
                    editingTarget={{ index }}
                    updateField={"items"}
                    buttonName="Edit"
                    setData={setData}
                  />
                ))}
              </div>
            </div>
            <div className="docPairs">
              <h2>Gameplay Mechanics</h2>
              <div className="cardGpMech docCard">
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
                  setData={setData}
                />
                {data.gameplay.map((gm, index) => (
                  <EditableCard
                    designid={designid}
                    cardData={gm}
                    currentDataArray={data.gameplay}
                    editingTarget={{ index }}
                    updateField={"gameplay"}
                    buttonName="Edit"
                    setData={setData}
                  />
                ))}
              </div>
            </div>
            <div className="docButt">
              <button id="trash" className="buttForm1" onClick={handleTrash}>
                Send to Trash
              </button>
              <button id="delete" className="buttForm1" onClick={handleDelete}>
                **Delete Whole Document**
              </button>
            </div>
          </>
        )}
      </LeftContent>
    </Layout>
  );
};
