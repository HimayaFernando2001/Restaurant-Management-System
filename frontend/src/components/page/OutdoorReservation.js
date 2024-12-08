import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/OutdoorReservation.css';
import AddOutdoorReservationForm from './AddOutdoorReservationForm';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2'; 

const OutdoorReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [newReservation, setNewReservation] = useState({
        customerName: '',
        email: '',
        phoneNumber: '',
        eventType: '',
        date: '',
        timeFrom: '',
        timeTo: '',
        numberOfGuests: '',
    });
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingReservation, setEditingReservation] = useState(null);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = () => {
        axios.get('http://localhost:8070/outdoorReservation/')
            .then(response => setReservations(response.data))
            .catch(error => console.error(error));
    };

    const handleChange = (e) => {
        setNewReservation({ ...newReservation, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingReservation) {
            axios.put(`http://localhost:8070/outdoorReservation/update/${editingReservation._id}`, newReservation)
                .then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Reservation Updated',
                        text: response.data.message || 'Your reservation has been updated!',
                    });
                    resetForm();
                    fetchReservations();
                })
                .catch(error => console.error(error));
        } else {
            axios.post('http://localhost:8070/outdoorReservation/add', newReservation)
                .then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Reservation Added',
                        text: response.data.message || 'Your reservation has been added!',
                    });
                    resetForm();
                    fetchReservations();
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Outdoor space is not available for the selected time.',
                    });
                    console.error(error);
                });
        }
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
            numberOfGuests: '',
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
                axios.delete(`http://localhost:8070/outdoorReservation/delete/${id}`)
                    .then(() => {
                        fetchReservations();
                        Swal.fire('Deleted!', 'Reservation has been deleted.', 'success');
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
        doc.text('Outdoor Reservations Report', 14, 16);

        const tableColumn = [
            "Customer Name",
            "Email",
            "Phone Number",
            "Event Type",
            "Date",
            "Time From",
            "Time To",
            "Number of Guests",
        ];

        const tableRows = filteredReservations.map(reservation => [
            reservation.customerName,
            reservation.email,
            reservation.phoneNumber,
            reservation.eventType,
            formatDate(reservation.date),
            reservation.timeFrom,
            reservation.timeTo,
            reservation.numberOfGuests,
        ]);

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save('outdoor_reservations_report.pdf');
        
        Swal.fire({
            icon: 'success',
            title: 'Report Generated',
            text: 'Outdoor Reservations report has been generated successfully!',
        });
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
                <AddOutdoorReservationForm
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
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Event Type</th>
                        <th>Date</th>
                        <th>Time From</th>
                        <th>Time To</th>
                        <th>Number of Guests</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReservations.map(reservation => (
                        <tr key={reservation._id}>
                            <td>{reservation.customerName}</td>
                            <td>{reservation.email}</td>
                            <td>{reservation.phoneNumber}</td>
                            <td>{reservation.eventType}</td>
                            <td>{formatDate(reservation.date)}</td>
                            <td>{reservation.timeFrom}</td>
                            <td>{reservation.timeTo}</td>
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

export default OutdoorReservation;
