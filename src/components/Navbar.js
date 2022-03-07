import { Link, useNavigate } from "react-router-dom";
import { remove } from "../utils/serverURL";
import { useState, useEffect } from "react";

export const Navbar = (props) => {
  let navigate = useNavigate();

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  const handleLogout = async () => {
    const response = await remove("/user/logout");
    props.setUser(null);
    navigate("/welcome");
  };
  return (
    <>
      <div className="nav">
        <div className="navBottom">
          <Link className="links" to="/">
            Home
          </Link>
          <Link className="links" to="/search">
            Search
          </Link>
          {props.user && props.user._id ? (
            <button className="links" onClick={handleLogout}>
              logout
            </button>
          ) : (
            <Link className="links" to="/login">
              <button className="links">login</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
