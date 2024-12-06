//import React from 'react'
import './Header.css'
import React, { useEffect, useState } from 'react';


const Header = () => {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowContent(true);
        }, 2000); // 5000 milliseconds = 5 seconds
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <div className='header'>
        <div className={`content ${showContent ? 'show' : ''}`}>
           <h1>Order Your favourite food</h1>
      <p>Welcome to foodora! Discover top-rated restaurants and exclusive deals. Enjoy fast, reliable delivery of your favorite meals, all at your fingertips.</p>
       <button>Menu</button>
       </div>
       </div>
    );
};




export default Header
