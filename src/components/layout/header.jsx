// Header.js
import React from 'react';
import '../../styles/header.scss'; // Adjust the path as necessary
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={"/images/logos.png"} alt="Echoes Logo" />
      </div>
      <nav className="nav">
        <ul>
          <li className="active">HOME</li>
          <li>Tour Package</li>
          <li>Gallery</li>
          <li>About us</li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <button className="login">Request trip</button>
        <button className="get-started">Get started</button>
      </div>
    </header>
  );
};

export default Header;
