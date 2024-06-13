import React from 'react';
import '../Footer/style.css'; 
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; 
import logo from '../Images/paw.png'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <img src={logo} alt="Shelter The Wild Logo" className="footer-logo" /> {/* Add this line */}
                <p>&copy; {new Date().getFullYear()} Shelter the Wild</p>
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