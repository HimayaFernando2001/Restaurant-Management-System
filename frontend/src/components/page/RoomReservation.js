import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/RoomReservation.css'; 
import AddRoomReservationForm from './AddRoomReservationForm'; 
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';  

const RoomReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [newReservation, setNewReservation] = useState({
        customerName: '',
        phoneNumber: '',
        email: '', 
        roomType: '',
        roomNumber: '',
        checkInDate: '',
        checkInTime: '',
        checkOutDate: '',
        checkOutTime: '',
        numberOfGuests: ''
    });
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingReservation, setEditingReservation] = useState(null);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = () => {
        axios.get('http://localhost:8070/RoomReservation/')
            .then(response => setReservations(response.data))
            .catch(error => console.error(error));
    };

    const handleChange = (e) => {
        setNewReservation({ ...newReservation, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingReservation) {
            axios.put(`http://localhost:8070/RoomReservation/update/${editingReservation._id}`, newReservation)
                .then(response => {
                    Swal.fire('Success', response.data.message || 'Reservation Updated', 'success');
                    resetForm();
                    fetchReservations();
                })
                .catch(error => console.error(error));
        } else {
            axios.post('http://localhost:8070/RoomReservation/add', newReservation)
                .then(response => {
                    Swal.fire('Success', response.data.message || 'Reservation Added', 'success');
                    resetForm();
                    fetchReservations();
                })
                .catch(error => {
                    Swal.fire('Error', 'Room is not available for the selected time.', 'error');
                    console.error(error);
                });
        }
    };

    const resetForm = () => {
        setNewReservation({
            customerName: '',
            phoneNumber: '',
            email: '', 
            roomType: '',
            roomNumber: '',
            checkInDate: '',
            checkInTime: '',
            checkOutDate: '',
            checkOutTime: '',
            numberOfGuests: ''
        });
        setShowForm(false);
        setEditingReservation(null);
    };

    const handleCancel = () => {
        resetForm();
        setShowForm(false);
    };

    const handleEdit = (reservation) => {
        setNewReservation(reservation);
        setEditingReservation(reservation);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4caf50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8070/RoomReservation/delete/${id}`)
                    .then(() => {
                        fetchReservations();
                        Swal.fire("Deleted!", "Reservation Deleted", "success");
                    })
                    .catch(error => console.error(error));
            }
        });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const filteredReservations = reservations.filter(reservation =>
        reservation.customerName && reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleGenerateReport = () => {
        const doc = new jsPDF();
        doc.text('Room Reservations Report', 14, 16);

        const tableColumn = [
            "Customer Name",
            "Phone Number",
            "Email", 
            "Room Type",
            "Room Number",
            "Check-In Date",
            "Check-In Time",
            "Check-Out Date",
            "Check-Out Time",
            "Number of Guests"
        ];

        const tableRows = filteredReservations.map(reservation => [
            reservation.customerName,
            reservation.phoneNumber,
            reservation.email, 
            reservation.roomType,
            reservation.roomNumber,
            formatDate(reservation.checkInDate),
            reservation.checkInTime,
            formatDate(reservation.checkOutDate),
            reservation.checkOutTime,
            reservation.numberOfGuests
        ]);

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save('room_reservations_report.pdf');

        Swal.fire('Success', 'Report generated successfully.', 'success');
    };

    return (
        <div className="reservation-container">

            <div className="search-bar-and-buttons">
                <input 
                    type="text" 
                    placeholder="Search reservation by name" 
                    value={searchTerm} 
                    onChange={handleSearch} 
                    className="search-bar"
                />
                
                <button onClick={handleGenerateReport} className="report-button">
                    Generate Report
                </button>
                
                <button onClick={() => setShowForm(!showForm)} className="add-button">
                    + Add Reservation
                </button>
            </div>

            {showForm && (
                <AddRoomReservationForm
                    newReservation={newReservation}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    editingReservation={editingReservation}
                    handleCancel={handleCancel}
                />
            )}

            <table className="reservation-table">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Phone Number</th>
                        <th>Email</th> 
                        <th>Room Type</th>
                        <th>Room Number</th>
                        <th>Check-In Date</th>
                        <th>Check-In Time</th>
                        <th>Check-Out Date</th>
                        <th>Check-Out Time</th>
                        <th>Number of Guests</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReservations.map(reservation => (
                        <tr key={reservation._id}>
                            <td>{reservation.customerName}</td>
                            <td>{reservation.phoneNumber}</td>
                            <td>{reservation.email}</td> 
                            <td>{reservation.roomType}</td>
                            <td>{reservation.roomNumber}</td>
                            <td>{formatDate(reservation.checkInDate)}</td>
                            <td>{reservation.checkInTime}</td>
                            <td>{formatDate(reservation.checkOutDate)}</td>
                            <td>{reservation.checkOutTime}</td>
                            <td>{reservation.numberOfGuests}</td>
                            <td>
                                <button className="update-button" onClick={() => handleEdit(reservation)}>Update</button>
                                <button className="delete-button" onClick={() => handleDelete(reservation._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoomReservation;
