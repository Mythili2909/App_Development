import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import InterviewerProfileImg from '../../assets/images/admin img.png'; // Update this with the actual path to the interviewer's profile image
import InterviewerProfile from '../../components/Interviewers/InterviewerProfile';
import Interviews from '../../components/Interviewers/Interviews';
import Reports from '../../components/Interviewers/InterviewerReports';

import '../../assets/style/InterviewerCss/InterviewerPanel.css'; // Use this CSS file

function InterviewerDashboard() {
  return (
    <div className="dashboard-container">
      <div className="side-panel">
        <Link to="/interviewerdashboard/profile" className="profile-link">
          <img src={InterviewerProfileImg} alt="Profile" className="profile-image" />
        </Link>
        <h2 style={{ marginLeft: '30px' }}>Interviewer Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="/interviewerdashboard/interviews">
                <i className="fas fa-calendar-check nav-icon"></i>
                Interviews
              </Link>
            </li>
            <li>
              <Link to="/interviewerdashboard/reports">
                <i className="fas fa-file-alt nav-icon"></i>
                Reports
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
          <Route path="profile" element={<InterviewerProfile />} />
          <Route path="interviews" element={<Interviews />} />
          <Route path="reports" element={<Reports />} />
          <Route path="/" element={<Interviews />} />
        </Routes>
      </div>
    </div>
  );
}

export default InterviewerDashboard;
