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
  
  return (
    <div className="bg-white h-screen flex justify-center items-center">
      <div className="bg-gray-300 w-1/2 rounded-lg mt-12">
        <div className="flex flex-row justify-center">
          <img src={logo} alt="logo" className='mt-5' style={{ width: "150px", height: "150px", borderRadius: "50%" }} />
        </div>
        <h1 className="text-6xl font-bold mb-10 pt-5">Login</h1>
        <div className="flex flex-col justify-center items-center">
        <input
          style={{ width: "300px", height: "30px", borderRadius: "5px", border: "1px solid #ccc", padding: "5px 10px", fontSize: "16px", marginBottom: "10px" }}
          type="text"
          name="Email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          autoCapitalize='off'
          autoComplete='off'
          required
        />
        <input
          style={{ width: "300px", height: "30px", borderRadius: "5px", border: "1px solid #ccc", padding: "5px 10px", fontSize: "16px", marginBottom: "10px" }}
          type="text"
          name="Password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          autoCapitalize='off'
          autoComplete='off'
          required
        />
        <p> Don't have an account? <a href="/register">Register!</a> </p>
        <button
          type="submit"
          name="submit"
          value="Submit"
          className='mb-5'
          onClick={() => loginUser(email, password)}
        >
          Submit
        </button>

        </div>
      </div>
    </div>
  );
};

export default Login;

