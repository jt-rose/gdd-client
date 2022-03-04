import { useState } from "react";
import { put } from "../utils/serverURL";

export const EditableCard = (props) => {
  const { cardData, editingTarget } = props;
  const [name, setName] = useState(cardData.name);
  const [description, setDescription] = useState(cardData.description);
  const [image, setImage] = useState(cardData.image);
  const [isEditing, setIsEditing] = useState(false);
  // use props.setIsEditing
  const currentDataArray = props.currentDataArray;
  let update = {};
  update[props.updateField] = [
    ...currentDataArray.slice(0, editingTarget.index),
    { name, description, image },
    ...currentDataArray.slice(editingTarget.index + 1),
  ];
  // need update field and index for insertion
  console.log(update);

  const handleCancel = () => {
    setIsEditing(false);
    setName(cardData.name);
    setDescription(cardData.description);
    setImage(cardData.image);
  };

  console.log("id: ", props.designid);
  const handleDesignUpdate = async () => {
    const response = await put("/doc/edit/" + props.designid, { update });
    console.log("response data: ", response.data);
    setIsEditing(false);

    if (cardData.name === "") {
      setName("");
      setDescription("");
      setImage("");
      props.setData(response.data);
    } else {
      props.setData(response.data);
    }

    //navigate("/design/" + props.designid);
  };

  if (!isEditing) {
    return (
      <>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>{image}</p>
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
          type="text"
          id={props.updateField + "-image-" + props.editingTarget.index}
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button onClick={handleDesignUpdate}>Update</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    );
  }
};
