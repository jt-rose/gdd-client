import { Link, useNavigate } from "react-router-dom";
import { remove } from "../utils/serverURL";
import { IoLogoGameControllerB } from 'react-icons/io';
import { FcSearch } from 'react-icons/fc';
import { useState, useEffect } from "react";


export const Navbar = () => {
  let navigate = useNavigate();
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);

  const handleLogout = async () => {
    const response = await remove("/user/logout");
    console.log(response.data);
    navigate("/welcome");
  };
  return (
    <>
        <div className='nav'>
            <div className='navTop'>
                
            </div>

            <div className='navBottom'>
                <div className='n'>
                    <Link className="links" to="/">
                    Home
                    </Link>
                    <Link className="links" to="/register">
                    Register
                    </Link>
                    <Link className="links" to="/login">
                    Login
                    </Link>
                    <Link className="links" to="/search">
                    Search
                    </Link>
                    <button className="links" onClick={handleLogout}>
                    logout
                    </button>
                </div>
            {matches &&
            <div className='search'>
                <input type="text" placeholder="Search.."/>
                <button type="submit"><FcSearch/></button>
            </div>
            }
            </div>
        </div>
    </>
  )
};
