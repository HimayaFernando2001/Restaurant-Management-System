// src/components/common/CustomerNavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/CustomerNavbar.css'; // You can style this component

const CustomerNavBar = () => {
  return (
    <nav className="customer-nav">
      <ul>
        <li><Link to="/room-reservation">Room Reservation</Link></li>
        <li><Link to="/table-reservation">Table Reservation</Link></li>
        <li><Link to="/outdoor-reservation">Outdoor Reservation</Link></li>
        <li><Link to="/reservation-details">Reservation Details</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default CustomerNavBar;
