// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Carpooling Service. All rights reserved.</p>
            <div className="footer-links">
                <a href="/about">About Us</a>
                <a href="/contact">Contact</a>
                <a href="/terms">Terms of Service</a>
                <a href="/privacy">Privacy Policy</a>
            </div>
        </footer>
    );
};

export default Footer;
