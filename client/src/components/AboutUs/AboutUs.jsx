import React from 'react';
import Mission from './Mission';
import History from './History';
import Team from './Team';
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