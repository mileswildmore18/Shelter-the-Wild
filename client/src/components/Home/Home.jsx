import React from 'react';
import '../Home/Home.css';


import animal1 from '../Images/cat.jpg';
import animal2 from '../Images/corgi.jpg';
import animal3 from '../Images/pitbull.jpg';

const Home = () => {
    return (
        <div className="home">
            <div className="animal-images">
                <img src={animal1} alt="Animal 1" />
                <img src={animal2} alt="Animal 2" />
                <img src={animal3} alt="Animal 3" />
            </div>
        </div>
    );
};

export default Home;