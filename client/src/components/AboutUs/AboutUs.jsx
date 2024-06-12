import React from 'react';
import Mission from '../AboutUs/Mission';
import History from '../AboutUs/History';
import Team from '../AboutUs/Team';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us">
            <h1>About Us</h1>
            <Mission />
            <History />
            <Team />
        </div>
    );
};

export default AboutUs;