import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <Link className='links' to="/">Home</Link>
      <Link className='links' to="/register">Register</Link>
      <Link className='links' to="/login">Login</Link>
      <Link className='links' to="/search">Search</Link>
      <Link className='links' to="/design">Design</Link>
    </>
  );
};
