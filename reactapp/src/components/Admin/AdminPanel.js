import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AdminProfileImg from '../../assets/images/admin img.png';
// import AdminReports from '../Admin/AdminReports';
import AdminProfile from '../../components/Admin/AdminProfile';
// import DeleteUser from './Head';
// import EditUser from './Mentor';
import FeedbackAdmindash from '../../components/Admin/FeedBackadmindash';
import ScheduleAdminDashboard from '../../components/Admin/ScheduleAdmin';
// import UserView from '../../components/Admin/Student';

import '../../assets/style/AdminCss/AdminPanel.css';
import Student from '../../components/Admin/Student';
import Mentor from './Mentor';
import Head from './Head';
import Interviewer from './Interviewer';
import AdminReports from './AdminReports';

function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <div className="side-panel">
        <Link to="/admindashboard/profile" className="profile-link">
          <img src={AdminProfileImg} alt="Profile" className="profile-image" />
        </Link>
        <h2 style={{ marginLeft: '30px' }}>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="/admindashboard">
                <i className="fas fa-bell nav-icon"></i>
                Notifications
              </Link>
            </li>
            <li>
              <Link to="/admindashboard/head">
                <i className="fas fa-user nav-icon"></i>
                Head
              </Link>
            </li>
            <li>
              <Link to="/admindashboard/mentor">
                <i className="fas fa-edit nav-icon"></i>
                Mentor
              </Link>
            </li>
            <li>
              <Link to="/admindashboard/interviewer">
                <i className="fas fa-plus nav-icon"></i>
                Interviewers
              </Link>
            </li>
            <li>
              <Link to="/admindashboard/student">
                <i className="fas fa-trash nav-icon"></i>
                Students
              </Link>
            </li>
            <li>
              <Link to="/admindashboard/feedback">
                <i className="fas fa-comment-dots nav-icon"></i>
                Feedback
              </Link>
            </li>
            {/* <li>
              <Link to="/admindashboard/schedules">
                <i className="fas fa-calendar nav-icon"></i>
                Schedules
              </Link>
            </li> */}
            <li>
              <Link to="/admindashboard/reports">
                <i className="fas fa-chart-bar nav-icon"></i>
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
          <Route path="profile" element={<AdminProfile />} />
          <Route path="notifications" element={<DefaultContent />} />
          <Route path="head" element={<Head />} />
          <Route path="mentor" element={<Mentor/>} />
          <Route path="interviewer" element={<Interviewer />} />
          <Route path="student" element={<Student />} />
          <Route path="feedback" element={<FeedbackAdmindash />} />
          <Route path="schedules" element={<ScheduleAdminDashboard />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="/" element={<DefaultContent />} />
        </Routes>
      </div>
    </div>
  );
}

const DefaultContent = () => (
  <div className="card-container">
    <div className="card notification-card">
      <h3>Notifications</h3>
      <p><strong>System Update:</strong> The system will undergo maintenance on Friday at 3 PM.</p>
      <p><strong>New User:</strong> A new user has signed up. Check the user management section for details.</p>
    </div>
    <div className="card update-card">
      <h3>Daily Updates</h3>
      <p><strong>Today’s Tasks:</strong> Review new feedback, check interview schedules, and update user profiles.</p>
      <p><strong>Pending Actions:</strong> Approve new interview requests and verify user credentials.</p>
    </div>
    <div className="card stats-card">
      <h3>Statistics</h3>
      <p><strong>Total Users:</strong> 350</p>
      <p><strong>Upcoming Interviews:</strong> 12</p>
      <p><strong>Recent Feedback:</strong> 25 new feedbacks</p>
    </div>
  </div>
);

const Reports = () => (
  <div>
    <h3>Reports Page</h3>
    <p>This is where the reports would be displayed.</p>
  </div>
);

export default AdminDashboard;
