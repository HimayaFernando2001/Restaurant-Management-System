import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  
import AddRoomReservationForm from './AddRoomReservationForm'; 
import '../css/CustomerRoom.css'; 

const CustomerRoom = () => {
    const [newReservation, setNewReservation] = useState({
        customerName: '',
        email: '',
        phoneNumber: '',
        roomType: '',
        roomNumber: '',
        checkInDate: '',
        checkInTime: '',
        checkOutDate: '',
        checkOutTime: '',
        numberOfGuests: ''
    });

    const [editingReservation, setEditingReservation] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReservation((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:8070/roomReservation/add', newReservation)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Reservation Added Successfully',
                    text: response.data.message || 'Your room reservation has been added!'
                });
                resetForm();
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Room is not available for the selected date and time.'
                });
                console.error(error);
            });
    };

    const resetForm = () => {
        setNewReservation({
            customerName: '',
            email: '',
            phoneNumber: '',
            roomType: '',
            roomNumber: '',
            checkInDate: '',
            checkInTime: '',
            checkOutDate: '',
            checkOutTime: '',
            numberOfGuests: ''
        });
        setEditingReservation(false);
    };

    const handleCancel = () => {
        resetForm();
    };

    return (
        <div className="customer-room">
            <img 
                src="/images/Gallery_7.jpg" 
                alt="Room Background" 
                className="background-image"
            />
            <div className="room-form">
                <h1>Room Reservation</h1>
                <AddRoomReservationForm
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

export default CustomerRoom;
