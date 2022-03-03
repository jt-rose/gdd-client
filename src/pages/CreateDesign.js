import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/serverURL";

export const CreateDesign = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [story, setStory] = useState("");
  const [monetization, setMonetization] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  let navigate = useNavigate();
  // const [gameplayMechanics, setGameplayMechanics] = useState([])
  // const [characters, setCharacters] = useState([])
  // const [locations, setLocations] = useState([])
  // const [items, setItems] = useState([])

  // const addEmptyItem = () => {
  //     setItems(...items, { name: "", description: ""})
  // }

  // const removeItem = (itemIndex) => {
  //     const itemsBefore = items.slice(0, itemIndex)
  //     const itemsAfter = items.slice(itemIndex + 1)
  //     setItems([...itemsBefore, ...itemsAfter])
  // }

  // const updateItem = (itemIndex) => (event) => {
  //     const itemsBefore = items.slice(0, itemIndex)
  //     const itemsAfter = items.slice(itemIndex + 1)
  //     setItems([...itemsBefore, event.target.value, ...itemsAfter])
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await post("/doc/create", {
      name,
      description,
      story,
      monetization,
      characters: [],
      items: [],
      gameplay: [],
      locations: [],
      gameLoop: [],
      stretchGoals: [],
    });
    console.log(response.data);

    if (response.data.error) {
      console.log("ERROR: ", response.data);
      setErrorMessage(response.data.error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <h1>Create Design</h1>
      {errorMessage && <p>{String(errorMessage)}</p>}
      <form>
        image
        <br />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="story">Story</label>
        <input
          type="text"
          id="story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />
        <label htmlFor="name">Monetization</label>
        <input
          type="text"
          id="monetization"
          value={monetization}
          onChange={(e) => setMonetization(e.target.value)}
        />
        <button onClick={handleSubmit}>Create</button>
      </form>
    </>
  );
};
