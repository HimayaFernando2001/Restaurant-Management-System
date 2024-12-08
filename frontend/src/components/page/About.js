import React from 'react';
import '../css/About.css'; 

function About() {
    return (
        <div className="about-page">

            <div className="image-container">

                <img src="/images/About_3.jpg" alt="Peacock Corridor Holiday House" className="background-image" />
                

                <div className="about-header">
                    <h1 className="about-title">About Our Restaurant</h1>
                    <p className="about-subtitle">
                        At Peacock Corridor Holiday House, we believe in offering more than just a stay—we provide an experience. 
                        Nestled in the heart of nature, our retreat offers luxurious accommodations, 
                        gourmet dining, and a serene environment where every guest can relax and rejuvenate. 
                        Whether you're seeking adventure or tranquility, our dedicated team is here to make your stay unforgettable. 
                        Our mission is to create lasting memories by blending comfort, 
                        local culture, and impeccable service.
                    </p>
                 </div>
            </div>


            <div className="about-section">
                <h2>Our Story</h2>
                <p>
                    Peacock Corridor Holiday House is a charming getaway nestled in the heart of nature. Founded in 2010, 
                    we have been providing visitors with an unforgettable experience of luxury, comfort, and serenity.
                </p>
                <h2>Our Vision</h2>
                <p>
                    We aim to offer our guests a tranquil escape from everyday life. We believe in sustainability, local culture, 
                    and creating a home away from home for all our visitors.
                </p>
                <h2>Our Services</h2>
                <ul>
                    <li>Luxurious rooms with nature views</li>
                    <li>Farm-to-table dining experience</li>
                    <li>Outdoor space for your special event</li>
                </ul>
                <h2>Our values</h2>
                <p>
                    We believe in sustainability, community, and excellence. 
                    At Peacock Corridor Holiday House, we are committed to protecting the environment, 
                    supporting local artisans, and ensuring that every guest feels like part of our family.
                </p>
                <h2>Experience Tranquility</h2>
                <p>
                    Step into a world of tranquility at Peacock Corridor Holiday House, 
                    where nature meets luxury. 
                    Our serene environment and dedicated staff work together to provide a peaceful retreat for all who visit.
                </p>
                <h2>Meet the Team</h2>
                <p>
                    Our dedicated team is committed to providing the best experience for every guest. With a passion for 
                    hospitality, we strive to make every stay memorable.
                </p>
            </div>
        </div>
    );
}

export default About;
