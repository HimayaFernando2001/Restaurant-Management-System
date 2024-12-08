import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert2
import AddOutdoorReservationForm from './AddOutdoorReservationForm'; 
import '../css/CustomerOutdoor.css'; 

const CustomerOutdoor = () => {
    const [newReservation, setNewReservation] = useState({
        customerName: '',
        email: '',
        phoneNumber: '',
        eventType: '',
        date: '',
        timeFrom: '',
        timeTo: '',
        numberOfGuests: ''
    });

    const [editingReservation, setEditingReservation] = useState(false); 

    const handleChange = (e) => {
        setNewReservation({
            ...newReservation,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Post data to your API
        axios.post('http://localhost:8070/outdoorReservation/add', newReservation)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Reservation Added Successfully',
                    text: response.data.message || 'Your reservation has been added!'
                });
                resetForm();
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Outdoor space is not available for the selected time.'
                });
                console.error(error);
            });
    };

    const resetForm = () => {
        setNewReservation({
            customerName: '',
            email: '',
            phoneNumber: '',
            eventType: '',
            date: '',
            timeFrom: '',
            timeTo: '',
            numberOfGuests: ''
        });
        setEditingReservation(false);
    };

    const handleCancel = () => {
        resetForm();
    };

    return (
        <div className="outdoor-container">
            <img 
                src="/images/Gallery_7.jpg" 
                alt="Background" 
                className="background-image"
            />
            <div className="outdoor-form">
                <h1>Outdoor Reservation</h1>
                <AddOutdoorReservationForm 
                    newReservation={newReservation}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                    editingReservation={editingReservation}
                />
            </div>
        </div>
    );
};

export default CustomerOutdoor;
