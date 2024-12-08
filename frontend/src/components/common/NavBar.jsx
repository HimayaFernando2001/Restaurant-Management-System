import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css'; 

const NavBar = () => {
  return (
    <div className="navbar-container">
      <div className="links-container">
        <div className="navbar-link"><Link to="/">Home</Link></div>
        <div className="navbar-link"><Link to="/menu">Menu</Link></div>
        <div className="navbar-link"><Link to="/reservation">Reservation</Link></div>
        <div className="navbar-link"><Link to="/about">About</Link></div>
        <div className="navbar-link"><Link to="/feedback">Feedback</Link></div>
        <div className="navbar-link"><Link to="/contact">Contact</Link></div>
        <div className="navbar-link"><Link to="/gallery">Gallery</Link></div>
      </div>
      <div className="auth-buttons">
        <Link to="/signin" className="sign-in-btn">Sign In</Link>
      </div>
    </div>
  );
};

export default NavBar;
