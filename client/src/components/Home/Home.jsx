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
                    <div className="overlay">
                        <div className="text">Adopt</div>
                    </div>
                    <img className="animal-image" src={animal1} alt="Animal 1" />
                </a>
                <a href="/animal2" className="animal-link">
                    <div className="overlay">
                        <div className="text">Foster</div>
                    </div>
                    <img className="animal-image" src={animal2} alt="Animal 2" />
                </a>
                <a href="/animal3" className="animal-link">
                    <div className="overlay">
                        <div className="text">Volunteer</div>
                    </div>
                    <img className="animal-image" src={animal3} alt="Animal 3" />
                </a>
            </div>
        </div>
    );
};

export default Home;