import { useState } from "react";
import { put } from "../utils/serverURL";

export const EditableCard = (props) => {
  const { cardData, editingTarget } = props;
  const [name, setName] = useState(cardData.name);
  const [description, setDescription] = useState(cardData.description);
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(cardData.image);
  const [isEditing, setIsEditing] = useState(false);
  // use props.setIsEditing
  const currentDataArray = props.currentDataArray;
  let update = {};
  update[props.updateField] = [
    ...currentDataArray.slice(0, editingTarget.index),
    { name, description, image: imageURL },
    ...currentDataArray.slice(editingTarget.index + 1),
  ];
  // need update field and index for insertion
  console.log("update: ", update);
  console.log("img file: ", imageFile);
  console.log("img url: ", imageURL);

  const handleCancel = () => {
    setIsEditing(false);
    setName(cardData.name);
    setDescription(cardData.description);
    setImageFile(null);
    setImageURL(cardData.image);
  };

  const handleDesignUpdate = async () => {
    const response = await put("/doc/edit/" + props.designid, { update });
    console.log("response data: ", response.data);
    setIsEditing(false);

    if (cardData.name === "") {
      setName("");
      setDescription("");
      setImageFile(null);
      setImageURL(""); // change to placeholder
      props.setData(response.data);
    } else {
      props.setData(response.data);
    }

    //navigate("/design/" + props.designid);
  };

  // add image to s3 and store url in anticipation of update
  const handleImageUpdate = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const response = await put("/doc/image-upload", formData);
    console.log(response.data);
    setImageFile(file);
    setImageURL(response.data.image);
  };

  if (!isEditing) {
    return (
      <>
        <h3>{name}</h3>
        <p>{description}</p>
        <img src={imageURL} />
        {/* remove */}
        <button onClick={() => setIsEditing(true)}>{props.buttonName}</button>
      </>
    );
  } else {
    return (
      <div className="pairs">
        <label
          htmlFor={props.updateField + "-name-" + props.editingTarget.index}
        >
          Name
        </label>
        <input
          type="text"
          id={props.updateField + "-name-" + props.editingTarget.index}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label
          htmlFor={
            props.updateField + "-description-" + props.editingTarget.index
          }
        >
          Description
        </label>
        <input
          type="text"
          id={props.updateField + "-description-" + props.editingTarget.index}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label
          htmlFor={props.updateField + "-image-" + props.editingTarget.index}
        >
          Image
        </label>
        <input
          type="file"
          id={props.updateField + "-image-" + props.editingTarget.index}
          onChange={handleImageUpdate}
        />
        <img src={imageURL} />
        <button onClick={handleDesignUpdate}>Update</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    );
  }
};
