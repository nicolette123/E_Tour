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
          <li>Travel guides</li>
          <li>Explore</li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <button className="login">Log in</button>
        <button className="get-started">Get started</button>
      </div>
    </header>
  );
};

export default Header;
