import { Link, useNavigate } from "react-router-dom";
import { remove } from "../utils/serverURL";

export const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = async () => {
    const response = await remove("/user/logout");
    console.log(response.data);
    navigate("/welcome");
  };
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/search">Search</Link>
      <Link to="/design">Design</Link>{" "}
      <button onClick={handleLogout}>logout</button>
    </>
  );
};
