import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/NavBarAdmin.css';

const NavbarAdmin = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); 
    navigate("/signin"); 
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/images/logo.png" alt="Restaurant Logo" className="logo" />
      </div>
      <ul className="nav-links">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/room-reservation">Room Reservation</Link></li>
        <li><Link to="/table-reservation">Table Reservation</Link></li>
        <li><Link to="/outdoor-reservation">Outdoor Reservation</Link></li>
      </ul>

      {/* Sign Out button on the right */}
      <button className="signout-button" onClick={handleLogout}>Sign Out</button>
    </nav>
  );
};

export default NavbarAdmin;
