import React, { useEffect, useState } from 'react';
import { Link, Element, animateScroll as scroll } from 'react-scroll';
import './App.css';
import ManageBlogs from './components/ManageBlogs';
import Messages from './components/Messages';
import Premium from './components/Premium';
import VerifyBlogUsers from './components/VerifyBlogUsers';
import logo from './logo.png';
import Login from './components/Login.js';
import Register from './components/Register';
import Settings from './components/Settings';

// Do this starting tuesday 
// make deleted tables for all categories so nothing is lost forever 
// create a deleted section 
// create settings page, manually add email / password to login table 
// this is where users can see deleted tables and restore 
// also need to see how to handle scrolling once the tables reach a certain height


function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [showShadow, setShowShadow] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [login, setLogin] = useState(true);
  const [settings, setSettings] = useState(false);
  const [main, setMain] = useState(false);


  const handleScroll = () => {
    const isHomePage = window.scrollY === 0;
    setShowShadow(!isHomePage);

    const header = document.querySelector('.navbar');
    if (header) {
      if (window.scrollY > 0) {
        header.classList.add('opaque');
      } else {
        header.classList.remove('opaque');
      }
    }
  };

  // const scrollToTop = () => {
  //   scroll.scrollToTop();
  // };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const openLogin = () => {
    setLogin(true);
  };

  const closeLogin = () => {
    setLogin(false);
  };

  const openSettings = () => {
    setSettings(true);
  };

  const closeSettings = () => {
    setSettings(false);
  };


  const openMain = () => {
    setMain(true);
  };

  const closeMain = () => {
    setMain(false);
  };

  

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuClose = () => {
    if (showMenu) {
      setShowMenu(false);
    }
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const isMobile = windowWidth <= 768;

  return (
    <div className="App" onClick={handleMenuClose}>
{!login && (
  <header className={`navbar pl-10 text-black bg-white md:mr-10 fixed top-0 z-10 w-screen b ${showShadow ? 'opaque' : ''}`} style={{ borderBottom: '1px solid grey'}}>
    <div className="flex justify-between items-center w-screen">
      <div className="flex items-center">
        <img src={logo} className="w-14 mr-2" alt="logo"onClick={() => {
          openMain();
          closeSettings();
        }}/>
        <h1 className="text-lg md:text-3xl font-bold"> CIRCLEZ </h1>
      </div>
      <div>
      {/* <button          
      
          onClick={() => {
            openSettings();
            closeMain();
          }}className='mr-5 p-3 pl-5 pr-5 bg-blue-400 rounded-md text-white font-bold text-sm hover:bg-blue-500'>
        Settings
        

      </button> */}
        <button 
          onClick={() => {
            openLogin();
            closeMain();
          }}
          className='mr-5 p-3 pl-5 pr-5 bg-indigo-400 rounded-md text-white font-bold text-sm hover:bg-indigo-500'
        >
          Log Out
        </button>
      </div>
    </div>
  </header>
)}

   
      {login &&
      
        <main className='mt-32'>
          <Element name="login" className="section">
            <Login closeLogin={closeLogin} openMain={openMain}/>
          </Element>
          </main>
        }

        {settings &&
          <main className='mt-32'>
            <Element name="settings" className="section">
              <Settings closeSettings={closeSettings} />
          </Element>
          </main>
        }

      {main && 
        <main className='mt-32'>
          <Element name="messages" className="section">
            <Messages />
          </Element>
          <Element name="verifyBlogUsers" className="section">
            <VerifyBlogUsers />
          </Element>
          <Element name="manageBlogs" className="section">
            <ManageBlogs />
          </Element>
          <Element name="premium" className="section">
            <Premium />
          </Element>
        </main>
        
        }

        </div>
   
        

  );
}

export default App;

