import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faYoutube, faInstagram, faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import '../css/FooterMain.css';

function FooterMain() {
    return (
        <footer className="footer-main">
            <div className="footer-container">
                
                <div className="footer-section">
                    <h1 className="footer-logo">Peacock Corrido Holiday House</h1>
                    <p>Providing exclusive dining experiences with premium quality services.</p>
                </div>

                
                <div className="footer-section">
                    <h2 className="topic">Pages</h2>
                    <ul className="footer-links">
                        <li><a href="/home">Home</a></li>
                        <li><a href="/menu">Menu</a></li>
                        <li><a href="/restaurant">Restaurant</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/feedback">Feedback</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/gallery">Gallery</a></li>
                    </ul>
                </div>

                
                <div className="footer-section">
                    <h2 className="topic">Contact</h2>
                    <ul className="contact-info">
                        <li>Phone: +94342244254</li>
                        <li>Email: peacockcorridoholidayhouse@gmail.com</li>
                    </ul>
                </div>

                
                <div className="footer-section newsletter">
                    <h2 className="topic">Newsletter</h2>
                    <form>
                        <input type="email" placeholder="Email Address" className="footer-input" />
                        <button type="submit" className="footer-button">Subscribe</button>
                    </form>
                    <div className="social-icons">
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
                </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="footer-bottom">
                &copy; 2023 Peacock Corrido Holiday House | All Rights Reserved
            </div>
        </footer>
    );
}

export default FooterMain;
