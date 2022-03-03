
import {useState, useEffect} from 'react';
import axios from 'axios'
import {post} from '../utils/serverURL.js'


export const Register = () => {

    const [user, setNewUser] = useState({image:'./pfPic.jpeg'});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewUser({ ...user, [name]: value });
    };

    const handleNewUser = async  (e) => {
        console.log(user.username);
        e.preventDefault();
        await post(
            '/user/register',
            {
                username: user.username,
                password: user.password,
                email: user.email,
                company: user.company,
                description: user.description,
                location: user.location,
                image: user.image,
            }
        )}


  return (
    <>
      <h1>Register</h1>;
        <div className="main">
            <div className="mainEffect">
                <div  className="mainContainer">
                  <header>
                      <ul>
                          <li>Link1</li>
                          <li>Link2</li>
                          <li>Link3</li>
                      </ul>

                  </header>
                  <form onSubmit={handleNewUser}>
                      <div id="formdiv">
                          <div className='pairs'>
                              UserName: <input className="input"  name='username' onChange={handleChange}/><br/>
                              Password: <input className="input" type='password' name='password' onChange={handleChange}/><br/>
                          </div>
                          <div className='pairs'>
                              Email: <input className="input" name="email" onChange={handleChange}/><br/>
                              Company: <input className="input" name='company' onChange={handleChange}/><br/>
                          </div>
                          <div className='pairs'>
                              Location <input className="input" name='location' onChange={handleChange}/><br/>
                              Description <input className="input" name='description' onChange={handleChange}/><br/>
                              Image url: <input className="input" name='image'  onChange={handleChange}/><br/>
                          <input id='buttForm1' className='butt' type="submit" value="Submit"/>
                          </div>
                      </div>
                  </form>

              </div>
          </div>
      </div>
      </>
    );
  }
