import React, { useRef , useEffect} from 'react';
import {gsap } from 'gsap';
import './DogAnimation.css';

const DogAnimation = () => {
    const tailRef = useRef(null);

    useEffect(() => {
        gsap.to(tailRef.current, {
            rotation: 20,
            transformOrigin: 'top left',
            repeat: -1,
            yoyo: true,
            duration: 2.5
        });
}, []);

return (
    <div className="dog">
        <div className="tail" ref={tailRef}></div>
    </div>
);
};

export default DogAnimation;