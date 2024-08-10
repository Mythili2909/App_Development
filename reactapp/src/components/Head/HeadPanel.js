import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import HeadProfileImg from '../../assets/images/admin img.png'; // Update this with the actual path to the head's profile image
import HeadProfile from '../../components/Head/HeadProfile';
import Mentor from '../../components/Head/HeadMentor';
import Interviewer from '../../components/Head/HeadInterviewer';
import Student from '../../components/Head/HeadStudent';
import Reports from '../../components/Head/HeadReports';

import '../../assets/style/HeadCss/HeadPanel.css'; // Use this CSS file

function HeadDashboard() {
  return (
    <div className="dashboard-container">
      <div className="side-panel">
        <Link to="/headdashboard/profile" className="profile-link">
          <img src={HeadProfileImg} alt="Profile" className="profile-image" />
        </Link>
        <h2 style={{ marginLeft: '30px' }}>Head Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="/headdashboard/mentor">
                <i className="fas fa-user-graduate nav-icon"></i>
                Mentor
              </Link>
            </li>
            <li>
              <Link to="/headdashboard/interviewer">
                <i className="fas fa-users nav-icon"></i>
                Interviewer
              </Link>
            </li>
            <li>
              <Link to="/headdashboard/student">
                <i className="fas fa-user-graduate nav-icon"></i>
                Students
              </Link>
            </li>
            <li>
              <Link to="/headdashboard/reports">
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
          <Route path="profile" element={<HeadProfile />} />
          <Route path="mentor" element={<Mentor />} />
          <Route path="interviewer" element={<Interviewer />} />
          <Route path="student" element={<Student />} />
          <Route path="reports" element={<Reports />} />
          <Route path="/" element={<Mentor />} />
        </Routes>
      </div>
    </div>
  );
}

export default HeadDashboard;
