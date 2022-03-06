import { useState } from "react";
import { put } from "../utils/serverURL";

import { FaPlus } from "react-icons/fa";

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

  const handleCancel = () => {
    setIsEditing(false);
    setName(cardData.name);
    setDescription(cardData.description);
    setImageFile(null);
    setImageURL(cardData.image);
  };

  const handleDesignUpdate = async () => {
    const response = await put("/doc/edit/" + props.designid, { update });
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
    setImageFile(file);
    setImageURL(response.data.image);
  };

  if (!isEditing && props.addNew) {
    return (
      <>
        <div className="docPair" onClick={() => setIsEditing(true)}>
          <div className="editCard">
            <div className="add-icon-center">
              <FaPlus className="add-icon" />
            </div>
          </div>
        </div>
      </>
    );
  } else if (!isEditing) {
    return (
      <>
        <div className="docPair" onClick={() => setIsEditing(true)}>
          <div className="editCard">
            <div className="picPair">
              <img className="gameImg" src={imageURL} />
              {/* remove */}
              <button className="buttForm1" onClick={() => setIsEditing(true)}>
                {props.buttonName}
              </button>
            </div>
            <div className="gameName">
              <h3>{name}</h3>
            </div>
            <p>{description}</p>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="docPairModal">
        <div className="modal-content2">
          <div className="zoomInfoBox pairs">
            <label
              htmlFor={props.updateField + "-name-" + props.editingTarget.index}
            >
              Name
            </label>
            <input
              className="input"
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
              className="input"
              type="text"
              id={
                props.updateField + "-description-" + props.editingTarget.index
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label
              htmlFor={
                props.updateField + "-image-" + props.editingTarget.index
              }
            >
              Image
            </label>
            <input
              className="input"
              type="file"
              id={props.updateField + "-image-" + props.editingTarget.index}
              onChange={handleImageUpdate}
            />
          </div>
          <div className="docImgButtBox">
            <div className="docZoomImgBox">
              <img className="docZoomImg" src={imageURL} />
            </div>
            <button className="buttForm1" onClick={handleDesignUpdate}>
              Update
            </button>
            <button className="buttForm1" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
};
