import { useState } from "react";
import { GENRE } from "../utils/GENRE";
import { put } from "../utils/serverURL";

export const EditableSelect = (props) => {
  const [genre, setGenre] = useState(props.genre);
  const [isEditing, setIsEditing] = useState(false);
  // use props.setIsEditing
  const update = {
    genre,
  };

  const handleCancel = () => {
    setIsEditing(false);
    setGenre(props.genre);
  };

  const handleDesignUpdate = async () => {
    const response = await put("/doc/edit/" + props.designid, { update });
    setIsEditing(false);
    props.setData(response.data);
    //navigate("/design/" + props.designid);
  };

  if (!isEditing) {
    return (
      <>
        <h2>{genre}</h2>
        {props.myProject && (
          <button className="buttForm2" onClick={() => setIsEditing(true)}>
            Edit Genre
          </button>
        )}
      </>
    );
  } else {
    return (
      <>
        <label htmlFor="genre">Genre</label>
        <select id="genre" onChange={(e) => setGenre(e.target.value)}>
          {GENRE.map((g) => (
            <option value={g} selected={g === genre}>
              {g}
            </option>
          ))}
        </select>
        <button onClick={handleDesignUpdate}>Update</button>
        <button onClick={handleCancel}>Cancel</button>
      </>
    );
  }
};
