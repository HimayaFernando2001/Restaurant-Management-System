import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Profile.css';
import Swal from 'sweetalert2'; 

const Profile = () => {
    const [customer, setCustomer] = useState({});
    const [outdoorReservations, setOutdoorReservations] = useState([]);
    const [tableReservations, setTableReservations] = useState([]);
    const [roomReservations, setRoomReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingReservation, setEditingReservation] = useState(null);
    const [newReservation, setNewReservation] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const email = localStorage.getItem('email');

            if (!email) {
                setError('No email found in local storage');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8070/customer/profile/${email}`);
                if (response.status === 200) {
                    setCustomer(response.data.customer);
                    setOutdoorReservations(response.data.outdoorReservations);
                    setTableReservations(response.data.tableReservations);
                    setRoomReservations(response.data.roomReservations);
                }
            } catch (err) {
                console.error('Error fetching profile data:', err.response ? err.response.data : err.message);
                setError('Failed to fetch profile data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (reservation) => {
        setNewReservation(reservation);
        setEditingReservation(reservation);
    };

    const handleDelete = (id, type) => {
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
                axios.delete(`http://localhost:8070/${type}/delete/${id}`)
                    .then(() => {
                        if (type === 'outdoorReservation') {
                            setOutdoorReservations(prev => prev.filter(res => res._id !== id));
                        } else if (type === 'tableReservation') {
                            setTableReservations(prev => prev.filter(res => res._id !== id));
                        } else if (type === 'roomReservation') {
                            setRoomReservations(prev => prev.filter(res => res._id !== id));
                        }
                        Swal.fire('Deleted!', 'Reservation has been deleted.', 'success');
                    })
                    .catch(error => console.error(error));
            }
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const { type } = editingReservation;

        axios.put(`http://localhost:8070/${type}/update/${editingReservation._id}`, newReservation)
            .then(() => {
                if (type === 'outdoorReservation') {
                    setOutdoorReservations(prev => prev.map(res => res._id === editingReservation._id ? newReservation : res));
                } else if (type === 'tableReservation') {
                    setTableReservations(prev => prev.map(res => res._id === editingReservation._id ? newReservation : res));
                } else if (type === 'roomReservation') {
                    setRoomReservations(prev => prev.map(res => res._id === editingReservation._id ? newReservation : res));
                }
                Swal.fire('Updated!', 'Reservation has been updated.', 'success');
                setEditingReservation(null);
                setNewReservation({});
            })
            .catch(error => {
                console.error(error);
                Swal.fire('Error!', 'There was a problem updating your reservation.', 'error');
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReservation(prev => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="profile-container">
            <img src="/images/Home_3.jpeg" alt="Background" className="background-image" />
            <div className="details-box">
                <h2>Profile</h2>
                <p><strong>Name:</strong> {customer.name}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Phone Number:</strong> {customer.phone}</p>

                {/* Outdoor Reservations Section */}
                <h3>Your Outdoor Reservations</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Event Type</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Number of Guests</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {outdoorReservations.length > 0 ? (
                            outdoorReservations.map((reservation) => (
                                <tr key={reservation._id}>
                                    <td>{reservation.eventType}</td>
                                    <td>{new Date(reservation.date).toLocaleDateString()}</td>
                                    <td>{reservation.timeFrom} - {reservation.timeTo}</td>
                                    <td>{reservation.numberOfGuests}</td>
                                    <td>
                                        <button className="update-button" onClick={() => handleEdit(reservation)}>Update</button>
                                        <button className="delete-button" onClick={() => handleDelete(reservation._id, 'outdoorReservation')}>Delete</button>
                                     </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5">No outdoor reservations found.</td></tr>
                        )}
                    </tbody>
                </table>

                {/* Table Reservations Section */}
                <h3>Your Table Reservations</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Table No</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Number of Guests</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableReservations.length > 0 ? (
                            tableReservations.map((reservation) => (
                                <tr key={reservation._id}>
                                    <td>{reservation.tableNo}</td>
                                    <td>{new Date(reservation.date).toLocaleDateString()}</td>
                                    <td>{reservation.timeFrom} - {reservation.timeTo}</td>
                                    <td>{reservation.numberOfGuests}</td>
                                    <td>
                                        <button className="update-button" onClick={() => handleEdit(reservation)}>Update</button>
                                        <button className="delete-button" onClick={() => handleDelete(reservation._id, 'tableReservation')}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5">No table reservations found.</td></tr>
                        )}
                    </tbody>
                </table>

                {/* Room Reservations Section */}
                <h3>Your Room Reservations</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Room Type</th>
                            <th>Room Number</th>
                            <th>Check-In</th>
                            <th>Check-Out</th>
                            <th>Number of Guests</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomReservations.length > 0 ? (
                            roomReservations.map((reservation) => (
                                <tr key={reservation._id}>
                                    <td>{reservation.roomType}</td>
                                    <td>{reservation.roomNumber}</td>
                                    <td>{new Date(reservation.checkInDate).toLocaleDateString()} at {reservation.checkInTime}</td>
                                    <td>{new Date(reservation.checkOutDate).toLocaleDateString()} at {reservation.checkOutTime}</td>
                                    <td>{reservation.numberOfGuests}</td>
                                    <td>
                                        <button className="update-button" onClick={() => handleEdit(reservation)}>Update</button>
                                        <button className="delete-button" onClick={() => handleDelete(reservation._id, 'roomReservation')}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6">No room reservations found.</td></tr>
                        )}
                    </tbody>
                </table>

                {/* Editing Reservation Form */}
                {editingReservation && (
                    <form onSubmit={handleUpdate}>
                        <h3>Edit Reservation</h3>
                        {editingReservation.type === 'outdoorReservation' && (
                            <>
                                <label>
                                    Event Type:
                                    <input type="text" name="eventType" value={newReservation.eventType || ''} onChange={handleChange} />
                                </label>
                                <label>
                                    Date:
                                    <input type="date" name="date" value={newReservation.date || ''} onChange={handleChange} />
                                </label>
                                <label>
                                    Time From:
                                    <input type="time" name="timeFrom" value={newReservation.timeFrom || ''} onChange={handleChange} />
                                </label>
                                <label>
                                    Time To:
                                    <input type="time" name="timeTo" value={newReservation.timeTo || ''} onChange={handleChange} />
                                </label>
                                <label>
                                    Number of Guests:
                                    <input type="number" name="numberOfGuests" value={newReservation.numberOfGuests || ''} onChange={handleChange} />
                                </label>
                            </>
                        )}
                        
                        <button type="submit">Update Reservation</button>
                        <button type="button" onClick={() => setEditingReservation(null)}>Cancel</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Profile;
