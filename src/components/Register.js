import React, { useState, useEffect } from 'react';
import logo from '../logo.png';
import { firebase } from './config';


const Register = (props) => {
    const closeRegister = props.closeRegister;
    const openLogin = props.openLogin;

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return () => subscriber(); // Unsubscribe from the auth state change listener
    }, []);
  
    const handleRegistration = () => {
      // Perform user registration with Firebase
      // You can use the firebase.auth().createUserWithEmailAndPassword() method or any other method provided by Firebase
      // Example:
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // User registration successful
          const user = userCredential.user;
          console.log('User registered:', user);
          openLogin();
          closeRegister();
        })
        .catch((error) => {
          // User registration failed
          const errorMessage = error.message;
          console.error('User registration error:', errorMessage);
        });
    };
  
    if (initializing) return null;

  return (
    <div className="bg-white h-screen flex justify-center items-center">
      <div className="bg-gray-300 w-1/2 rounded-lg mt-12">
        <div className="flex flex-row justify-center">
          <img src={logo} alt="logo" className='mt-5' style={{ width: "150px", height: "150px", borderRadius: "50%" }} />
        </div>
        <h1 className="text-6xl font-bold mb-10 pt-5">Register</h1>
        <div className="flex flex-col justify-center items-center">
        <input
          style={{ width: "300px", height: "30px", borderRadius: "5px", border: "1px solid #ccc", padding: "5px 10px", fontSize: "16px", marginBottom: "10px" }}
          type="text"
          name="Email"
          placeholder="Email"
          autoCapitalize='off'
          autoComplete='off'
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          style={{ width: "300px", height: "30px", borderRadius: "5px", border: "1px solid #ccc", padding: "5px 10px", fontSize: "16px", marginBottom: "10px" }}
          type="password"
          name="Password"
          placeholder="Password"
          autoCapitalize='off'
          autoComplete='off'
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <input
          style={{ width: "300px", height: "30px", borderRadius: "5px", border: "1px solid #ccc", padding: "5px 10px", fontSize: "16px", marginBottom: "10px" }}
          type="password"
          name="Confirm Password"
          placeholder="Confirm Password"
          autoCapitalize='off'
          autoComplete='off'
          required
        />
        <p 
            onClick={() => {
                        openLogin();
                        closeRegister();
                    }} 
            className='mb-5 text-sm'> Already have an account? Login! </p>
        <button
          type="submit"
          name="submit"
          value="Submit"
          className='mb-5'
          onClick={handleRegistration}
        >
          Submit
        </button>

        </div>
      </div>
    </div>
  );
};

export default Register;