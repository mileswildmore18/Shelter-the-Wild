import React from 'react';
import '../Home/Home.css';

import animal1 from '../Images/cat.jpg';
import animal2 from '../Images/corgi.jpg';
import animal3 from '../Images/pitbull.jpg';

const Home = () => {
    return (
        <div className="home">
            <h1>Make A Difference!</h1>
            <div className="animal-images">
                <a href="/animal1" className="animal-link">
                    <img className="animal-image" src={animal1} alt="Animal 1" />
                    <span className="tooltip">Adopt</span>
                </a>
                <a href="/animal2" className="animal-link">
                    <img className="animal-image" src={animal2} alt="Animal 2" />
                    <span className="tooltip">Foster</span>
                </a>
                <a href="/animal3" className="animal-link">
                    <img className="animal-image" src={animal3} alt="Animal 3" />
                    <span className="tooltip">Volunteer</span>
                </a>
            </div>
        </div>
    );
};

export default Home;