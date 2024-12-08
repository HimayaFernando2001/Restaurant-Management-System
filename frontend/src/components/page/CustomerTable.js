import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddTableReservationForm from './AddTableReservationForm';
import '../css/CustomerTable.css';

const CustomerTable = () => {
    const [newReservation, setNewReservation] = useState({
        customerName: '',
        email: '',
        phoneNumber: '',
        tableNo: '',
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

        axios.post('http://localhost:8070/tableReservation/add', newReservation)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Reservation Added Successfully',
                    text: response.data.message || 'Your table reservation has been added!'
                });
                resetForm();
            })
            .catch(error => {
                // Check if the error response indicates that the table is not available
                const errorMessage = error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : 'Table is not available for the selected date and time.';

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage
                });
                console.error(error);
            });
    };

    const resetForm = () => {
        setNewReservation({
            customerName: '',
            email: '',
            phoneNumber: '',
            tableNo: '',
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
                alt="Table Background" 
                className="background-image"
            />
            <div className="outdoor-form"> 
                <h1>Table Reservation</h1>
                <AddTableReservationForm 
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

export default CustomerTable;
