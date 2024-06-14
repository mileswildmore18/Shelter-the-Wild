import React from 'react';
import '../Footer/style.css'; 
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; 
import logo from '../Images/paw.png'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <img src={logo} alt="Shelter The Wild Logo" className="footer-logo" />
                
                <a href="/contact"></a>
                <div className="social-icons">
                    <a href="https://www.facebook.com/yourpage"><FaFacebook /></a>
                    <a href="https://www.twitter.com/yourpage"><FaTwitter /></a>
                    <a href="https://www.instagram.com/yourpage"><FaInstagram /></a>
                    <p>&copy; {new Date().getFullYear()} <span style={{ fontStyle: 'italic' }}>Shelter the Wild</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;