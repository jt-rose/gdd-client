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
            <EditableText
              designid={designid}
              updateField="name"
              text={data.name}
              setData={setData}
              // editingTarget={editingTarget}
              // setEditingTarget={setEditingTarget}
            />

            <p>{data.image}</p>
            {imagePreview && <img src={imagePreview} />}
            <input type="file" onChange={handleImageLoad} />
            <button onClick={handleSaveImage}>Save Image</button>

            <EditableSelect
              designid={designid}
              genre={data.genre}
              setData={setData}
            />
            <EditableText
              designid={designid}
              updateField="story"
              text={data.story || ""}
              setData={setData}
            />

            <section>
              <h2>Characters</h2>
              {data.characters.map((c, index) => (
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
              <EditableCard
                designid={designid}
                cardData={{ name: "", description: "", image: "" }}
                currentDataArray={data.characters}
                editingTarget={{ index: data.characters.length }}
                updateField={"characters"}
                buttonName="Add"
                setData={setData}
              />
            </section>

            <section>
              <h2>Locations</h2>
              {data.locations.map((l, index) => (
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
              <EditableCard
                designid={designid}
                cardData={{ name: "", description: "", image: "" }}
                currentDataArray={data.locations}
                editingTarget={{ index: data.locations.length }}
                updateField={"locations"}
                buttonName="Add"
                setData={setData}
              />
            </section>

            <section>
              <h2>Items</h2>
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
              <EditableCard
                designid={designid}
                cardData={{ name: "", description: "", image: "" }}
                currentDataArray={data.items}
                editingTarget={{ index: data.items.length }}
                updateField={"items"}
                buttonName="Add"
                setData={setData}
              />
            </section>

            <section>
              <h2>Gameplay Mechanics</h2>
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
              <EditableCard
                designid={designid}
                cardData={{ name: "", description: "", image: "" }}
                currentDataArray={data.gameplay}
                editingTarget={{ index: data.gameplay.length }}
                updateField={"gameplay"}
                buttonName="Add"
                setData={setData}
              />
            </section>

            <br />
            <button onClick={handleTrash}>Trash</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </LeftContent>
      <RightContent></RightContent>
    </Layout>
  );
};
