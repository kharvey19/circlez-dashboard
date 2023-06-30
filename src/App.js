import React, { useEffect, useState } from 'react';
import { Link, Element, animateScroll as scroll } from 'react-scroll';
import './App.css';
import ManageBlogs from './components/ManageBlogs';
import Messages from './components/Messages';
import Premium from './components/Premium';
import VerifyBlogUsers from './components/VerifyBlogUsers';
import logo from './logo.png';


function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [showShadow, setShowShadow] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


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
      <header className={`navbar pl-10 text-black md:mr-10 fixed top-0 w-screen b ${showShadow ? 'opaque' : ''}`} style={{ borderBottom: '1px solid grey'}}>
        <div className="flex justify-between items-center w-screen">
          <div className="flex items-center">
            <img src={logo} className="w-14 mr-2" alt="logo" />
            <h1 className="text-lg md:text-3xl font-bold"> CIRCLEZ </h1>
          </div>
        </div>
    </header>

    <main className='mt-32'>
        <div>
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


        </div>
   
        
      </main>
    </div>
  );
}

export default App;

