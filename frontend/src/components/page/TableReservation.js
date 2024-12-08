import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  
import '../css/TableReservation.css';
import AddTableReservationForm from './AddTableReservationForm';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TableReservation = () => {
    const [reservations, setReservations] = useState([]);
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
    const [showForm, setShowForm] = useState(false);
    const [editingReservation, setEditingReservation] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // New state for success message

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = () => {
        axios.get('http://localhost:8070/TableReservation/')
            .then(response => setReservations(response.data))
            .catch(error => Swal.fire('Error', 'Failed to fetch reservations', 'error'));  
    };

    const handleChange = (e) => {
        setNewReservation({ ...newReservation, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingReservation) {
            // Edit reservation
            axios.put(`http://localhost:8070/TableReservation/update/${editingReservation._id}`, newReservation)
                .then(response => {
                    Swal.fire('Success', response.data.message || 'Reservation Updated', 'success');
                    resetForm();
                    fetchReservations(); 
                })
                .catch(error => Swal.fire('Error', 'Failed to update reservation', 'error'));  // Show error alert
        } else {
            // Add new reservation
            axios.post('http://localhost:8070/TableReservation/add', newReservation)
                .then(response => {
                    setReservations(prevReservations => [...prevReservations, response.data]);  
                    setSuccessMessage('Reservation Added Successfully'); // Set success message
                    Swal.fire('Success', 'Reservation Added Successfully', 'success'); // Updated success message
                    resetForm();
                })
                .catch(error => {
                    console.error(error);  // Log the error to console for debugging
                    const errorMessage = error.response ? error.response.data.message : 'Failed to add reservation';
                    Swal.fire('Error', errorMessage, 'error');  
                });
        }
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
        setShowForm(false);
        setEditingReservation(null);
        setSuccessMessage(''); 
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
                axios.delete(`http://localhost:8070/TableReservation/delete/${id}`)
                    .then(() => {
                        fetchReservations();
                        Swal.fire('Deleted!', 'Your reservation has been deleted.', 'success');
                    })
                    .catch(error => Swal.fire('Error', 'Failed to delete reservation', 'error'));  
            }
        });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredReservations = reservations.filter(reservation =>
        reservation.customerName && reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleGenerateReport = () => {
        const doc = new jsPDF();
        doc.text('Table Reservations Report', 14, 16);

        const tableColumn = [
            "Customer Name",
            "Email",
            "Phone Number",
            "Table Number",
            "Date",
            "Time From",
            "Time To",
            "Number of Guests"
        ];

        const tableRows = filteredReservations.map(reservation => [
            reservation.customerName,
            reservation.email,
            reservation.phoneNumber,
            reservation.tableNo,
            new Date(reservation.date).toISOString().split('T')[0],
            reservation.timeFrom,
            reservation.timeTo,
            reservation.numberOfGuests
        ]);

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save('table_reservations_report.pdf');

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

            {successMessage && <div className="success-message">{successMessage}</div>} 

            {showForm && (
                <AddTableReservationForm
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
                        <th>Table Number</th>
                        <th>Date</th>
                        <th>Time From</th>
                        <th>Time To</th>
                        <th>Number of Guests</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReservations.length > 0 ? ( 
                        filteredReservations.map(reservation => (
                            <tr key={reservation._id}>
                                <td>{reservation.customerName}</td>
                                <td>{reservation.email}</td>
                                <td>{reservation.phoneNumber}</td>
                                <td>{reservation.tableNo}</td>
                                <td>{new Date(reservation.date).toISOString().split('T')[0]}</td>
                                <td>{reservation.timeFrom}</td>
                                <td>{reservation.timeTo}</td>
                                <td>{reservation.numberOfGuests}</td>
                                <td>
                                    <button className="update-button" onClick={() => handleEdit(reservation)}>Update</button>
                                    <button className="delete-button" onClick={() => handleDelete(reservation._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="9">No Reservations Available</td></tr> 
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableReservation;
