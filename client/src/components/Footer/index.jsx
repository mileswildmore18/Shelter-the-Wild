import React from 'react';
import '../Footer/style.css'; // Assuming you have a CSS file for styling
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Importing Font Awesome icons

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Shelter The Wild</p>
                <a href="/contact">Contact Us</a>
                <div className="social-icons">
                    <a href="https://www.facebook.com/yourpage"><FaFacebook /></a>
                    <a href="https://www.twitter.com/yourpage"><FaTwitter /></a>
                    <a href="https://www.instagram.com/yourpage"><FaInstagram /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;