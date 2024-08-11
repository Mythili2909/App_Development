// StudentDashboard.js
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import StudentProfileImg from '../../assets/images/admin img.png'; // Update with the actual path to the student's profile image
import Schedules from '../Students/Shedules'; // Placeholder for the Schedules component
import StudentInterviews from '../Students/StudentInterviews'; // Placeholder for the Interviews component
// import Logout from '../../components/Student/Logout'; // Placeholder for the Logout component

import '../../assets/style/StudentCss/StudentPanel.css'; // Use this CSS file
import StudentProfile from './StudentProfile';
import Demo from './Demo';

function StudentDashboard() {
  return (
    <div className="dashboard-container">
      <div className="side-panel">
        <Link to="/studentdashboard/profile" className="profile-link">
          <img src={StudentProfileImg} alt="Profile" className="profile-image" />
        </Link>
        <h2 style={{ marginLeft: '30px' }}>Student Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="/studentdashboard/schedules">
                <i className="fas fa-calendar-day nav-icon"></i>
                Schedules
              </Link>
            </li>
            <li>
              <Link to="/studentdashboard/interviews">
                <i className="fas fa-calendar-check nav-icon"></i>
                Interviews
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="fas fa-sign-out-alt nav-icon"></i>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <Routes>
          <Route path="profile" element={<StudentProfile />} />
          <Route path="schedules" element={<Schedules />} />
          <Route path="interviews" element={<StudentInterviews />} />
          <Route path="hrround" element={<Demo />} />
          {/* <Route path="logout" element={<Logout />} /> */}
          <Route path="/" element={<Schedules />} />
        </Routes>
      </div>
    </div>
  );
}

export default StudentDashboard;
