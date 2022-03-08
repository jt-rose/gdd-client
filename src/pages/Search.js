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
        <div className="searchFormBox">
          <form className="searchForm">
            <div className="pairs">
              <label htmlFor="name">Name</label>
              <input
                className="input"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="pairs">
              <label htmlFor="username">Username</label>
              <input
                className="input"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="pairs">
              <label htmlFor="genre">Genre</label>
              <select
                className="input"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option key="select-ANY" value="ANY">
                  ANY
                </option>
                {GENRE.map((g) => (
                  <option key={"select-" + g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <button className="buttForm1" onClick={handleSearch}>
              Search
            </button>
          </form>
        </div>
        <div className="searchResults">
          {noResults && <p>no results found</p>}
          {results.map((design, index) => (
            <div
              className="box"
              key={index}
              onClick={() => openDesignPage(design._id)}
            >
              <img id="searchImg" className="gddPic" src={design.image} />
              <h4>{design.name}</h4>
              <div className="clip" id="right"></div>
              <div className="clip" id="left"></div>
              <div className="clip" id="up"></div>
              <div className="clip" id="down"></div>
              <span id="rightClip" className="clipper">
                Click to Open
                <h3>{design.name}</h3>
              </span>
              <span id="leftClip" className="clipper">
                Click to Open
                <h3>{design.name}</h3>
              </span>
              <span id="upClip" className="clipper">
                Click to Open
                <h3>{design.name}</h3>
              </span>
              <span id="downClip" className="clipper">
                Click to Open
                <h3>{design.name}</h3>
              </span>
            </div>
          ))}
        </div>
      </LeftContent>
    </Layout>
  );
};
