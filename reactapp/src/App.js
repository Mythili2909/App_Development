// import './App.css';
import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';

import Login from './components/Login';
import Register from './components/Register';
// import Interview from './components/Interview';
// import Reports from './components/Reports';
// import Notifications from './components/Notifications';
// import Profile from './components/Profile';
// import Dashboard from './components/Dashboard';
// import Navbar from './components/Navbar'; // Uncommented Navbar import
// import Admin from './components/Admin';
// import Admin from 'C:/Users/91739/Desktop/App/App_Development/reactapp/src/components/Admin/AdminPanel.js';
import Coder from './components/Coder';
import HeadDashboard from './components/Head/HeadPanel';
import Interviewer from './components/Interviewer';
import MentorDashboard from './components/Mentors/MentorPanel.js';
import VideoRec from './components/VideoRec';
import AdminDashboard from '../src/components/Admin/AdminPanel.js';
import InterviewerDashboard from './components/Interviewers/InterviewerPanel.js';
import StudentDashboard from './components/Students/StudentPanel.js';
import Demo from './components/Students/Demo.js';
function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* <Login /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="/interview" element={<Interview />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notification" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} /> */}
        <Route path="/practice-sessions" element={<VideoRec />} /> 
        <Route path="/hrround" element={<Demo />} /> 
        <Route path="/interviewerdashboard/*" element={<InterviewerDashboard/>} />
        <Route path="/studentdashboard/*" element={<StudentDashboard/>} />
        <Route path="/admindashboard/*" element={< AdminDashboard/>} />
        <Route path="/mentordashboard/*" element={<MentorDashboard />} />
        <Route path="/headdashboard/*" element={<HeadDashboard />} />
      </Routes>
    </div>
  );
}

export default App;