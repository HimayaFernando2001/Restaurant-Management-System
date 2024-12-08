import React from 'react';

const ReservationDetails = ({ type, reservations }) => {
  return (
    <div className="reservation-details">
      <h3>{type} Reservations</h3>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map(reservation => (
            <li key={reservation._id}>
              <p><strong>Reservation ID:</strong> {reservation._id}</p>
              <p><strong>Date:</strong> {reservation.date}</p>
              <p><strong>Time:</strong> {reservation.time}</p>
              <p><strong>Guests:</strong> {reservation.numberOfGuests}</p>
              {/* Add more details if needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No {type.toLowerCase()} reservations found.</p>
      )}
    </div>
  );
};

export default ReservationDetails;
