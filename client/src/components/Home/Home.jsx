import React from 'react';
import '../Home/Home.css';
import SwipeableTextMobileStepper from '../Carousel';
import animal1 from '../Images/cat.jpg';
import animal2 from '../Images/corgi.jpg';
import animal3 from '../Images/pitbull.jpg';
import AxiosReq from '../API/AxiosReq';

const Home = () => {
    return (
        <div className="home">
            <SwipeableTextMobileStepper/>
            <h1>Make A Difference!</h1>
            <div className="animal-images">
                <a href="https://www.orangecountyanimalservicesfl.net/Adopt/AnimalsinShelter.aspx" target="_blank" rel="noopener noreferrer" className="animal-link">
                    <div className="overlay">
                        <div className="text">Adopt</div>
                    </div>
                    <img className="animal-image" src={animal1} alt="Animal 1" />
                </a>
                <a href="https://www.orangecountyanimalservicesfl.net/GetInvolved/FosterCare.aspx" target="_blank" rel="noopener noreferrer" className="animal-link">
                    <div className="overlay">
                        <div className="text">Foster</div>
                    </div>
                    <img className="animal-image" src={animal2} alt="Animal 2" />
                </a>
                <a href="https://www.orangecountyanimalservicesfl.net/GetInvolved/Volunteer.aspx" target="_blank" rel="noopener noreferrer" className="animal-link">
                    <div className="overlay">
                        <div className="text">Volunteer</div>
                    </div>
                    <img className="animal-image" src={animal3} alt="Animal 3" />
                </a>
            </div>
            <AxiosReq />
        </div>
    );
};

export default Home;