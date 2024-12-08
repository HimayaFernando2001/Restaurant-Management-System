import React from 'react';
import '../css/RoomReservation.css'; 

const AddRoomReservationForm = ({ newReservation, handleChange, handleSubmit, editingReservation, handleCancel }) => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    return (
        <form onSubmit={handleSubmit} className="reservation-form">
            <div className="form-row">
                <label>Customer Name:</label>
                <input type="text" name="customerName" placeholder="Customer Name" value={newReservation.customerName} onChange={handleChange} required />
            </div>
            <div className="form-row">
                <label>Email:</label>
                <input type="email" name="email" placeholder="Email" value={newReservation.email} onChange={handleChange} required />
            </div>
            <div className="form-row">
                <label>Phone Number:</label>
                <input type="text" name="phoneNumber" placeholder="Phone Number" value={newReservation.phoneNumber} onChange={handleChange} required />
            </div>
            <div className="form-row">
                <label>Room Type:</label>
                <select name="roomType" value={newReservation.roomType} onChange={handleChange} required>
                    <option value="">Select Room Type</option>
                    <option value="Normal">Normal</option>
                    <option value="AC">AC</option>
                    <option value="VIP">VIP</option>
                </select>
            </div>
            <div className="form-row">
                <label>Room Number:</label>
                <input type="text" name="roomNumber" placeholder="Room Number" value={newReservation.roomNumber} onChange={handleChange} required />
            </div>
            <div className="form-row">
                <label>Check-in Date:</label>
                <input type="date" name="checkInDate" value={newReservation.checkInDate} onChange={handleChange} required min={today} />
            </div>
            <div className="form-row">
                <label>Check-in Time:</label>
                <input  
                    type="text"
                    name="checkInTime"
                    value={newReservation.timeFrom}
                    onChange={handleChange}
                    placeholder="HH:MM"
                    pattern="[0-9]{2}:[0-9]{2}"
                    required />
            </div>
            <div className="form-row">
                <label>Check-out Date:</label>
                <input type="date" name="checkOutDate" value={newReservation.checkOutDate} onChange={handleChange} required min={today} />
            </div>
            <div className="form-row">
                <label>Check-out Time:</label>
                <input 
                    type="text"
                    name="checkOutTime"
                    value={newReservation.timeFrom}
                    onChange={handleChange}
                    placeholder="HH:MM"
                    pattern="[0-9]{2}:[0-9]{2}"
                    required />
            </div>
            <div className="form-row">
                <label>Number of Guests:</label>
                <input type="number" name="numberOfGuests" placeholder="Number of Guests" value={newReservation.numberOfGuests} onChange={handleChange} required min="1" />
            </div>
            <button type="submit" className="submit-button green-button">
                {editingReservation ? 'Update Reservation' : 'Submit Reservation'}
            </button>
            <button type="button" className="cancel-button" onClick={handleCancel}>
                Cancel
            </button>
        </form>
    );
};

export default AddRoomReservationForm;
