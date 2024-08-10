import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import MentorProfileImg from '../../assets/images/admin img.png'; // Update this with the actual path to the mentor's profile image
import MentorStudent from '../Mentors/MentorStudent';
import MentorReports from '../Mentors/MentorReports';
// import MentorLogout from '../../components/Mentor/MentorLogout';

import '../../assets/style/MentorCss/MentorPanel.css'; // Use this CSS file
import MentorProfile from './MentorProfile';

function MentorDashboard() {
  return (
    <div className="mentor-dashboard-container">
      <div className="mentor-side-panel">
        <Link to="/mentordashboard/profile" className="mentor-profile-link">
          <img src={MentorProfileImg} alt="Profile" className="mentor-profile-image" />
        </Link>
        <h2 className="mentor-panel-title">Mentor Panel</h2>
        <nav>
          <ul className="mentor-nav-list">
            <li>
              <Link to="/mentordashboard/students" className="mentor-nav-link">
                <i className="fas fa-user-graduate mentor-nav-icon"></i>
                Students
              </Link>
            </li>
            <li>
              <Link to="/mentordashboard/reports" className="mentor-nav-link">
                <i className="fas fa-file-alt mentor-nav-icon"></i>
                Reports
              </Link>
            </li>
            <li>
              <Link to="/" className="mentor-nav-link">
                <i className="fas fa-sign-out-alt mentor-nav-icon"></i>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mentor-main-content">
        <Routes>
          <Route path="profile" element={<MentorProfile />} />
          <Route path="students" element={<MentorStudent />} />
          <Route path="reports" element={<MentorReports />} />
          <Route path="/" element={<MentorStudent />} />
        </Routes>
      </div>
    </div>
  );
}

export default MentorDashboard;
