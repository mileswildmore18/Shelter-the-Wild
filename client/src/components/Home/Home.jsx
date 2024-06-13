import React from 'react';
import '../Home/Home.css';
import SwipeableTextMobileStepper from '../Carousel';
import animal1 from '../Images/cat.jpg';
import animal2 from '../Images/corgi.jpg';
import animal3 from '../Images/pitbull.jpg';

const Home = () => {
    return (
        <div className="home">
            <h1>Make A Difference!</h1>
            <div className="animal-images">
              <SwipeableTextMobileStepper/>
            </div>
        </div>
    );
};

export default Home;