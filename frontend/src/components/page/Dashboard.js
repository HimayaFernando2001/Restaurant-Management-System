import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const [roomReservationCount, setRoomReservationCount] = useState(0);
  const [tableReservationCount, setTableReservationCount] = useState(0);
  const [outdoorReservationCount, setOutdoorReservationCount] = useState(0);

  useEffect(() => {
    const fetchReservationCounts = async () => {
      try {
        // Fetch room reservations and get the array length using axios
        const roomReservationsResponse = await axios.get('http://localhost:8070/roomReservation/');
        setRoomReservationCount(roomReservationsResponse.data.length);

        // Fetch table reservations and get the array length using axios
        const tableReservationsResponse = await axios.get('http://localhost:8070/tableReservation/');
        setTableReservationCount(tableReservationsResponse.data.length);

        // Fetch outdoor reservations and get the array length using axios
        const outdoorReservationsResponse = await axios.get('http://localhost:8070/outdoorReservation/');
        setOutdoorReservationCount(outdoorReservationsResponse.data.length);
      } catch (error) {
        console.error('Error fetching reservation counts:', error);
      }
    };

    fetchReservationCounts();
  }, []); // Empty array ensures effect runs once when the component mounts.

  return (
    <div className="dashboard-container">
      <h2>Reservation Dashboard</h2>
      <div className="reservation-cards">
        <div className="reservation-card">
          <h3>Room Reservations</h3>
          <p>{roomReservationCount}</p>
        </div>
        <div className="reservation-card">
          <h3>Table Reservations</h3>
          <p>{tableReservationCount}</p>
        </div>
        <div className="reservation-card">
          <h3>Outdoor Reservations</h3>
          <p>{outdoorReservationCount}</p> {/* Display the outdoor reservation count */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
