import { useState } from "react";
import { useNavigate } from "react-router";
import { put } from "../utils/serverURL";

export const EditableText = (props) => {
  const [text, setText] = useState(props.text);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  // use props.setIsEditing
  let update = {};
  update[props.updateField] = text;
  console.log(update);

  const handleCancel = () => {
    setIsEditing(false);
    setText(props.text);
  };

  console.log("id: ", props.designid);
  const handleDesignUpdate = async () => {
    const response = await put("/doc/edit/" + props.designid, { update });
    console.log(response.data);
    setIsEditing(false);
    props.setData(response.data);
    //navigate("/design/" + props.designid);
  };

  if (!isEditing) {
    return (
      <>
        <p>{text}</p>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  } else {
    return (
      <>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleDesignUpdate}>Update</button>
        <button onClick={handleCancel}>Cancel</button>
      </>
    );
  }
};
