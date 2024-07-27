// import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import Interview from './components/Interview';
import Reports from './components/Reports';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar'; // Uncommented Navbar import

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Login /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notification" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
