import React, { useState } from 'react';
import logo from '../logo.png';
import { firebase } from './config';

const Login = (props) => {
    const closeLogin = props.closeLogin;
    const openMain = props.openMain;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (email, password) => {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        openMain();
        closeLogin();
        
      } catch (error) {
        alert(error);
      }
    };
  // idk dfkd
  return (
    <div>
  
      <div className="bg-zinc-900 h-screen flex justify-center items-center" style={{marginTop: -150}}>
        <div className=" lg:w-1/3 bg-white border-zinc-400 border rounded-md shadow-md">
          {/* <div className="flex flex-row justify-center">
            <img src={logo} alt="logo" className='mt-5' style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
          </div> */}
          <h1 className="text-5xl font-bold mb-10 pt-20">Dashboard</h1>
            <div className="flex flex-col">
              <div className="mb-2 ml-10 font-bold flex justify-start lg:justify-center lg:ml-0">Email</div>
                <div className="flex justify-center">
                  <input
                    style={{ width: "300px", height: "30px", borderRadius: "5px", border: "1px solid #ccc", padding: "5px 10px", fontSize: "16px", marginBottom: "10px" }}
                    className="ml-10 mr-10"
                    type="text"
                    name="Email"
                    onChange={(event) => setEmail(event.target.value)}
                    autoCapitalize="off"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="mb-2 ml-10 font-bold flex justify-start lg:justify-center lg:ml-0">Password</div>
                <div className="flex justify-center">
                  <input
                    style={{ width: "300px", height: "30px", borderRadius: "5px", border: "1px solid #ccc", padding: "5px 10px", fontSize: "16px", marginBottom: "10px" }}
                    className="ml-10 mr-10"
                    type="password"
                    name="Password"
                    onChange={(event) => setPassword(event.target.value)}
                    autoCapitalize="off"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="flex justify-center"> {/* Updated */}
                  <button
                    type="submit"
                    name="submit"
                    value="Submit"
                    className="mb-20 p-2 mt-4 pl-5 pr-5 bg-indigo-400 rounded-lg hover:bg-indigo-500 font-bold text-black"
                    onClick={() => loginUser(email, password)}
                  >
                    Login
                  </button>
                </div> 
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

