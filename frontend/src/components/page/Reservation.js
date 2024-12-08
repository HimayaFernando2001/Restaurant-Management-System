import React from 'react';
import '../css/Reservation.css'; // Import your styles
import { useNavigate } from 'react-router-dom';

function Reservation() {
    const navigate = useNavigate();

    const handleRoomBooking = () => {
        navigate('/customer-room'); 
    };

    const handleTableBooking = () => {
        navigate('/customer-table'); 
    };

    const handleOutdoorBooking = () => {
        navigate('/customer-outdoor'); 
    };

    return (
        <div className="reservation">
            {/* Image container */}
            <div className="image-container">
                {/* Background Image */}
                <img src="/images/Reservation_3.jpg" alt="Reservation" className="background-image" />
                
                {/* Reservation Title */}
                <div className="overlay">
                    <h1 className="reservation-title">Choose Your Perfect Reservation</h1>
                    <p className="reservation-subtitle">Choose an intimate table, luxurious room, or outdoor space. Book now for a personalized dining experience.</p>
                </div>
            </div>

            {/* Detailed description below the image */}
            <div className="reservation-description">
                <p>
                    Welcome to Peacock Corridor Holiday House’s reservation, 
                    where we make it easy for you to book the perfect dining experience. 
                    Whether you prefer the privacy of our luxurious rooms, 
                    the comfort of an intimate table, or the charm of an outdoor setting, 
                    our flexible reservation options are designed to meet your needs. 
                    Enjoy a memorable stay or dining experience at Peacock Corrido, 
                    where every detail is crafted to provide you with the best service. 
                    Reserve your room, table, or outdoor space today for a seamless and personalized visit.
                </p>
            </div>

            {/* Elliptical Image below the description */}
            <div className="elliptical-image-container">
                <img 
                    src="/images/Reservation_4.jpg" 
                    alt="Elliptical Decoration" 
                    className="elliptical-image" 
                />
            </div>

            {/* New Horizontal Layout for Short Description and Image */}
            <div className="rectangle-container">
                <div className="horizontal-layout">
                    <div className="short-description">
                        <h2 className="room-heading">Choose Your Ideal Room</h2>
                        <p>
                            Experience luxurious accommodations at Peacock Corridor Holiday House. 
                            Choose from our Non-AC, AC, and VIP rooms. 
                            We provide all the facilities and excellent service to ensure your comfort and satisfaction.
                        </p>
                        <button className="book-reservation-button" onClick={handleRoomBooking}>Book Room Reservation</button>
                    </div>

                    <div className="room-image-container">
                        <img 
                            src="/images/Reservation_4.jpeg" 
                            alt="Room Reservation" 
                            className="room-image" 
                        />
                    </div>
                </div>
            </div>

            <div className="rectangle-container">
                <div className="horizontal-layout">
                    <div className="table-image-container">
                        <img 
                            src="/images/Table_Reservation_1.jpeg" 
                            alt="Table Reservation" 
                            className="table-image" 
                        />
                    </div>

                    <div className="short-description-t">
                        <h2 className="table-heading">Reserve Your Table Today</h2>
                        <p>
                            Enjoy a delightful dining experience at Peacock Corridor Holiday House. 
                            Choose your preferred table and indulge in our exquisite menu offerings. 
                            Our attentive service and cozy atmosphere ensure an unforgettable meal.
                        </p>
                        <button className="book-reservation-button" onClick={handleTableBooking}>Book Table Reservation</button>
                    </div>
                </div>
            </div>

            <div className="rectangle-container">
                <div className="horizontal-layout">
                    <div className="short-description-o">
                        <h2 className="outdoor-heading">Reserve Your Outdoor Space</h2>
                        <p>
                           Enjoy the beauty of nature at Peacock Corridor Holiday House. 
                           Choose from our serene outdoor spaces for gatherings, events, or a peaceful retreat. 
                           With stunning views and exceptional service, we ensure a memorable experience in a perfect setting.
                        </p>
                        <button className="book-reservation-button" onClick={handleOutdoorBooking}>Book Outdoor Reservation</button>
                    </div>

                    <div className="outdoor-image-container">
                        <img 
                            src="/images/Outdoor_Reservation_1.jpeg" 
                            alt="Outdoor Reservation" 
                            className="outdoor-image" 
                        />
                    </div>
                </div>
            </div>

            <div className="photo">
                <div className="image">
                    <img src="/images/Reservation_6.jpg" alt="Table" className="small-image rotate1" />
                </div>
                <div className="image">
                    <img src="/images/Reservation_7.jpg" alt="Outdoor" className="small-image rotate2"/>
                </div>
                <div className="image">
                    <img src="/images/Reservation_5.jpg" alt="Reservation" className="small-image rotate3"/>
                </div>
            </div>
        </div>
    );
}

export default Reservation;
