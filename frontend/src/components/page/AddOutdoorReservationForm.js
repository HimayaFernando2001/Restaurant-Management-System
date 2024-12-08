import React, { useEffect, useState } from 'react';
import '../css/OutdoorReservation.css'; 

const AddOutdoorReservationForm = ({ newReservation, handleChange, handleSubmit, handleCancel, editingReservation }) => {
    const [minDate, setMinDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
        setMinDate(`${year}-${month}-${day}`);
    }, []);

    return (
        <form onSubmit={handleSubmit} className="reservation-form">
            <div className="form-row">
                <label>Customer Name:</label>
                <input 
                    type="text" 
                    name="customerName" 
                    placeholder="Customer Name" 
                    value={newReservation.customerName} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div className="form-row">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newReservation.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-row">
                <label>Phone Number:</label>
                <input 
                    type="text" 
                    name="phoneNumber" 
                    placeholder="Phone Number" 
                    value={newReservation.phoneNumber} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div className="form-row">
                <label>Event Type:</label>
                <input 
                    type="text" 
                    name="eventType" 
                    placeholder="Event Type" 
                    value={newReservation.eventType} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div className="form-row">
                <label>Date:</label>
                <input 
                    type="date" 
                    name="date" 
                    value={newReservation.date} 
                    onChange={handleChange} 
                    min={minDate} 
                    required 
                />
            </div>
            <div className="form-row">
                <label>Time From (24-hour format):</label>
                <input 
                    type="text"
                    name="timeFrom"
                    value={newReservation.timeFrom}
                    onChange={handleChange}
                    placeholder="HH:MM"
                    pattern="[0-9]{2}:[0-9]{2}"
                    required
                />
            </div>
            <div className="form-row">
                <label>Time To (24-hour format):</label>
                <input
                    type="text"
                    name="timeTo" 
                    value={newReservation.timeTo} 
                    onChange={handleChange}
                    placeholder="HH:MM"
                    pattern="[0-9]{2}:[0-9]{2}"
                    required
                />
            </div>
            <div className="form-row">
                <label>Number of Guests:</label>
                <input 
                    type="number" 
                    name="numberOfGuests" 
                    placeholder="Number of Guests" 
                    value={newReservation.numberOfGuests} 
                    onChange={handleChange} 
                    min="1"  
                    required 
                />
            </div>

            <div className="form-actions">
                <button type="submit" className="submit-button green-button">
                    {editingReservation ? 'Update Reservation' : 'Submit Reservation'}
                </button>
                <button type="button" className="cancel-button red-button" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default AddOutdoorReservationForm;
