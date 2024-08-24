import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h2>About Us</h2>
                        <p>Elders care goods supply management system</p>
                    </div>
                    <div className="footer-section">
                        <h2>Contact Us</h2>
                        <p>Email: elder@elder.com</p>
                        <p>Phone: 123-456-7890</p>
                    </div>
                    <div className="footer-section">
                        <h2>Quick Links</h2>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} YourWebsite. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
