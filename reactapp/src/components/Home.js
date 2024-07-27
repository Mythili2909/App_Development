import React from 'react';
import '../assets/style/Home.css'; // Import your custom CSS
import Navbar from './Navbar';
import img1 from '../assets/images/home img2.jpg';
import img2 from '../assets/images/home img3.png';
import img3 from '../assets/images/home img4.png';
import img4 from '../assets/images/home img5.png';
import bgImage from '../assets/images/home side img.png'; // Import your new background image

import icon1 from '../assets/images/div img1.png'; // Add your icon images here
import icon2 from '../assets/images/div img2.png';
import icon3 from '../assets/images/div img3.png';
import icon4 from '../assets/images/div img4.png';

import rotateImg1 from '../assets/images/div img4.png'; // Add your rotating images here
import rotateImg2 from '../assets/images/div img1.png';
import rotateImg3 from '../assets/images/div img2.png';
import rotateImg4 from '../assets/images/div img3.png';

import centralImg from '../assets/images/div img3.png'; // Import the central image

function Home() {
    React.useEffect(() => {
        const options = {
            root: null, // Use the viewport as the container
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible'); // Add the class to trigger the CSS transition
                    observer.unobserve(entry.target); // Stop observing once the element is visible
                }
            });
        }, options);

        // Observe all rows and divisions
        document.querySelectorAll('.row, .division').forEach(element => {
            observer.observe(element);
        });
    }, []);

    return (
        <div className="home-con">
            <Navbar />
            <div className="home-parent-container">
                <div className="home-image-container">
                    <img src={bgImage} alt="Background" className="home-bg-image" />
                </div>
                <div className="home-content-container">
                    <div className="home-container">
                        <h1 className="home-text">Explore here!</h1>
                        <a href="#learn-more" className="home-button">Create Account</a>
                    </div>
                </div>
                <div className="custom-shape-divider-bottom-1721975298">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                </div>
            </div>
            <div className="content-container">
                <div className="row">
                    <div className="content">
                        <h1>Master the interview & land a job worth loving.</h1>
                        <p>Simulate realistic interviews for over 120 different job positions and level up your skills in no time.</p>
                    </div>
                    <div className="image">
                        <img src={img1} alt="Interview Simulation" />
                    </div>
                </div>
                <div className="row">
                    <div className="image">
                        <img src={img2} alt="Interview Simulation" />
                    </div>
                    <div className="content">
                        <h1>Take Mock Interviews On Your Own</h1>
                        <p>Take unlimited interviews and master your skills from anywhere. No awkward meetups required.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="content">
                        <h1>Practice for the Pressure</h1>
                        <p>We use your built-in camera to recreate the pressure of actual interviews so you can gain realistic experience and feel prepared for anything.</p>
                    </div>
                    <div className="image">
                        <img src={img3} alt="Interview Simulation" />
                    </div>
                </div>
                <div className="row">
                    <div className="image">
                        <img src={img4} alt="Interview Simulation" />
                    </div>
                    <div className="content">
                        <h1>Take Mock Interviews On Your Own</h1>
                        <p>Take unlimited interviews and master your skills from anywhere. No awkward meetups required.</p>
                    </div>
                </div>
            </div>

            {/* New Section with Four Divisions */}
            <div className="four-divisions-container">
                <div className="division">
                    <img src={icon1} alt="Icon 1" className="division-icon" />
                    <h2>Build interview confidence.</h2>
                    <p>We give you everything you need to master your interview skills in less time than any other option, so you can walk into your interview with confidence.</p>
                </div>
                <div className="division">
                    <img src={icon2} alt="Icon 2" className="division-icon" />
                    <h2>Get hired faster.</h2>
                    <p>Our simulator is optimized to help you master your interview skills in the most efficient way possible, so you can be prepared to ace the interview in no time.</p>
                </div>
                <div className="division">
                    <img src={icon3} alt="Icon 3" className="division-icon" />
                    <h2>Accelerate your career & earn more.</h2>
                    <p>Master the skill of interviewing by practicing it just like you practice your favorite sport or hobby.</p>
                </div>
                <div className="division">
                    <img src={icon4} alt="Icon 4" className="division-icon" />
                    <h2>Land the job you've been dreaming of.</h2>
                    <p>Gain realistic interview experience and confidence, and stand out in your job search.</p>
                </div>
            </div>

            {/* Rotating Images Section */}
            <div className="rotating-images-container">
                <img src={centralImg} alt="Central Image" className="central-image" />
                <div className="rotating-images-wrapper">
                    <div className="rotating-image">
                        <img src={rotateImg1} alt="Rotating Image 1" />
                    </div>
                    <div className="rotating-image">
                        <img src={rotateImg2} alt="Rotating Image 2" />
                    </div>
                    <div className="rotating-image">
                        <img src={rotateImg3} alt="Rotating Image 3" />
                    </div>
                    <div className="rotating-image">
                        <img src={rotateImg4} alt="Rotating Image 4" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
