import { useState } from "react";
import { put } from "../utils/serverURL";

export const EditableText = (props) => {
  const [text, setText] = useState(props.text);
  const [isEditing, setIsEditing] = useState(false);
  // use props.setIsEditing
  let update = {};
  update[props.updateField] = text;

  const handleCancel = () => {
    setIsEditing(false);
    setText(props.text);
  };

  console.log("id: ", props.designid);
  const handleDesignUpdate = async () => {
    const response = await put("/doc/edit/" + props.designid, { update });
    setIsEditing(false);
    props.setData(response.data);
  };

  if (!isEditing) {
    return (
      <>
        <div className="pairs">
          <p>{text}</p>
          <button className="buttForm2" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          {/* clear */}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="storyDiv">
          <label htmlFor={props.updateField}>{props.updateField}</label>
          <textarea
            type="text"
            id={props.updateField}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="8"
            column="50"
          ></textarea>
          <button className="buttForm1" onClick={handleDesignUpdate}>
            Update
          </button>
          <button className="buttForm1" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </>
    );
  }
};
