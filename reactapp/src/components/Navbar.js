import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../assets/style/Navbar.css'; // Ensure the path is correct
import { FaSun, FaMoon } from 'react-icons/fa'; // Import the icons for the theme toggle
import logo from '../assets/images/interview logo.png';

function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <div className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li onClick={toggleTheme} className="theme-toggle">
                    {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                    {/* <span>{isDarkMode ? ' Light Mode' : ' Dark Mode'}</span> */}
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
