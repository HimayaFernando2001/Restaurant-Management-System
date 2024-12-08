// src/components/common/CustomerNavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/CustomerNavBar.css'; // You can style this component

const CustomerNavBar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    onLogout(); // Call the logout function passed as a prop
    navigate('/signin'); // Redirect to the sign-in page after logging out
  };

  return (
    <nav className="customer-nav">
      <ul>
        <li className="navbar-link"> <Link to="/reservation">Reservation</Link></li>
        <li className="navbar-link"> <Link to="/profile">Profile</Link></li>
        <li>
          <button onClick={handleSignOut} className="signout-button">
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default CustomerNavBar;
