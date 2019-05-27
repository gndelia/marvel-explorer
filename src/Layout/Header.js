import React from 'react';
import './Header.css';
import Logo from './marvel-logo.png';

const Header = () => (
  <header className="header-container">
    <div className="title-container">
      <h1>Marvel Explorer!</h1>
      <img className="logo" src={Logo} alt="Marvel Main Free Logo" />
    </div>
    <h4>Explore your favourite characters from the Marvel Universe!</h4>
  </header>
);

export default Header;
