import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/style/Admin.css'; // Ensure you create and style this CSS file

function Admin() {
    const navigate = useNavigate();

    const [adminDetails, setAdminDetails] = useState({
        name: 'Admin Name',
        email: 'admin@example.com',
        phone: '123-456-7890'
    });

    const [isEditing, setIsEditing] = useState(false);
    const [activeSection, setActiveSection] = useState('schedule');

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setAdminDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleLogout = () => {
        navigate("/");
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'schedule':
                return (
                    <div className="admin-section">
                        <h2>Interviewers and Scheduled Timings</h2>
                        <div className="interviewers-list">
                            <p>Interviewer 1 - 10:00 AM to 11:00 AM, 2024-07-27</p>
                            <p>Interviewer 2 - 11:00 AM to 12:00 PM, 2024-07-28</p>
                        </div>
                    </div>
                );
            case 'interviewers':
                return (
                    <div className="admin-section">
                        <h2>List of Interviewers</h2>
                        <div className="interviewers-list">
                            <p>Interviewer 1</p>
                            <p>Interviewer 2</p>
                        </div>
                    </div>
                );
            case 'coders':
                return (
                    <div className="admin-section">
                        <h2>List of Coders</h2>
                        <div className="coders-list">
                            <p>Coder 1</p>
                            <p>Coder 2</p>
                        </div>
                    </div>
                );
            case 'profile':
                return (
                    <div className="admin-section">
                        <h2>Admin Profile</h2>
                        {isEditing ? (
                            <div className="admin-profile">
                                <input
                                    type="text"
                                    name="name"
                                    value={adminDetails.name}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={adminDetails.email}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={adminDetails.phone}
                                    onChange={handleEditChange}
                                />
                                <button onClick={() => setIsEditing(false)}>Save</button>
                            </div>
                        ) : (
                            <div className="admin-profile">
                                <p>Name: {adminDetails.name}</p>
                                <p>Email: {adminDetails.email}</p>
                                <p>Phone: {adminDetails.phone}</p>
                                <button onClick={() => setIsEditing(true)}>Edit</button>
                            </div>
                        )}
                    </div>
                );
            case 'reports':
                return (
                    <div className="admin-section">
                        <h2>Coder Reports</h2>
                        <div className="reports-list">
                            <p>Coder 1 - Interview on 2024-07-26 at 10:00 AM</p>
                            <p>Correct Questions: 8/10</p>
                            <p>Remarks: Excellent</p>
                            <p>Coder 2 - Interview on 2024-07-26 at 11:00 AM</p>
                            <p>Correct Questions: 7/10</p>
                            <p>Remarks: Good</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="admin-page">
            <div className="sidebar">
                <ul>
                    <li onClick={() => setActiveSection('schedule')}>Schedule</li>
                    <li onClick={() => setActiveSection('interviewers')}>Interviewers</li>
                    <li onClick={() => setActiveSection('coders')}>Coders</li>
                    <li onClick={() => setActiveSection('profile')}>Profile</li>
                    <li onClick={() => setActiveSection('reports')}>Reports</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </div>
            <div className="content">
                <h1>Welcome Back, Admin!</h1>
                {renderSection()}
            </div>
        </div>
    );
}

export default Admin;
