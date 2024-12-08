import React from 'react';
import '../css/Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faYoutube, faInstagram, faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'; 

function Contact() {
    return (
        <div className="contact-page">
            <div className="image-container">
                {/* Background Image */}
                <img src="/images/Contact_1.jpeg" alt="Contact Us" className="background-image" />

                {/* Contact Page Header */}
                <div className="contact-header">
                    <h1 className="contact-title">Contact Us</h1>
                    <p className="contact-subtitle">
                        We would love to hear from you! Whether you have a question, feedback, or need assistance, 
                        our team is here to help.
                    </p>
                </div>
            </div>

            <div className="contact-section">

                <h2>Our Location</h2>
                    <p>
                        Visit us at:<br />
                        Peacock Corridor Holiday House<br />
                        Mathugama, Sri Lanka<br />
                    </p>

                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.751129198077!2d80.23606431535542!3d6.553516520395153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae246ea5a4c3b53%3A0x1cc68f4f041e1f1!2sPeacock%20Corridoor%20Holiday%20House%2C%20Mathugama!5e0!3m2!1sen!2slk!4v1695644292001!5m2!1sen!2slk"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Google Map of Peacock Corridor Holiday House"
                    ></iframe>
                </div>

                <p>
                    You can also find us on Google Maps: 
                    <a
                        href="https://www.google.com/maps?q=Peacock+Corridoor+Holiday+House,+Mathugama"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open in Google Maps
                    </a>
                </p>

                <h2>Follow Us</h2>
                <p>
                    Stay connected with us on social media:<br />
                    <div className="contact-social-icons">
                        <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faWhatsapp} />
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faYoutube} />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                    </div>
                </p>
            </div>
        </div>
    );
}

export default Contact;
