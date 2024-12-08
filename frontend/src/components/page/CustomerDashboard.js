// src/components/page/CustomerDashboard.js
import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import ReservationDetails from './ReservationDetails';
import axios from 'axios';
import HeaderMain from '../common/HeaderMain';
import FooterMain from '../common/FooterMain';
import CustomerNavBar from '../common/CustomerNavBar'; // Import the new CustomerNavBar

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [reservations, setReservations] = useState({ table: [], room: [], outdoor: [] });

  useEffect(() => {
    // Fetch customer profile
    axios.get('/api/customer/profile')
      .then(response => {
        setCustomer(response.data);
      })
      .catch(error => console.log(error));

    // Fetch customer reservations
    axios.get('/api/customer/reservations')
      .then(response => {
        const tableReservations = response.data.filter(res => res.type === 'table');
        const roomReservations = response.data.filter(res => res.type === 'room');
        const outdoorReservations = response.data.filter(res => res.type === 'outdoor');

        setReservations({
          table: tableReservations,
          room: roomReservations,
          outdoor: outdoorReservations,
        });
      })
      .catch(error => console.log(error));
  }, []);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="customer-dashboard">
      <HeaderMain /> {/* Include HeaderMain */}
      <CustomerNavBar /> {/* Include CustomerNavBar */}
      <h1>Customer Dashboard</h1>
      <Profile customer={customer} />

      <div className="reservations-section">
        <h2>Your Reservations</h2>
        <ReservationDetails type="Table" reservations={reservations.table} />
        <ReservationDetails type="Room" reservations={reservations.room} />
        <ReservationDetails type="Outdoor" reservations={reservations.outdoor} />
      </div>
      <FooterMain /> {/* Include FooterMain */}
    </div>
  );
};

export default CustomerDashboard;
