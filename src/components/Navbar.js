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
      <Link className='links' to="/">Home</Link>
      <Link className='links' to="/register">Register</Link>
      <Link className='links' to="/login">Login</Link>
      <Link className='links' to="/search">Search</Link>
      <Link className='links' to="/design">Design</Link>
    <button className='links' onClick={handleLogout}>logout</button>
    </>
  );
};
