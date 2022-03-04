import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router";
import { Layout, LeftContent, RightContent } from "../components/Layout";
import { GENRE } from "../utils/GENRE";
import { post } from "../utils/serverURL";

export const Search = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [genre, setGenre] = useState("ANY");
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  let navigate = useNavigate();
  console.log(results);

  const handleSearch = async (e) => {
    e.preventDefault();
    let searchParams = {};
    if (name !== "") {
      searchParams.name = name;
    }
    if (username !== "") {
      searchParams.username = username;
    }
    if (genre !== "ANY") {
      searchParams.genre = genre;
    }

    const response = await post("/doc/search", { searchParams });
    if (response.data.length) {
      setResults(response.data);
      setNoResults(false);
    } else {
      setResults(response.data);
      setNoResults(true);
    }
  };

  const openDesignPage = (designid) => {
    navigate("/design/" + designid);
  };

  return (
    <Layout title="Search">
      <LeftContent>
        <form>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="genre">Genre</label>
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option key="select-ANY" value="ANY">
              ANY
            </option>
            {GENRE.map((g) => (
              <option key={"select-" + g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <button onClick={handleSearch}>Search</button>
        </form>

        {noResults && <p>no results found</p>}
        {results.map((design) => (
          <h3 onClick={() => openDesignPage(design._id)}>{design.name}</h3>
        ))}
      </LeftContent>
      <RightContent></RightContent>
    </Layout>
  );
};
