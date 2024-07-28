import React, { useState } from "react";
// import { FaList, FaUser, FaPlus, FaBell, FaChartBar } from 'react-icons/fa';
import { FaCode, FaFileAlt, FaList, FaUser, FaUsers, FaPlus, FaBell, FaChartBar } from 'react-icons/fa';

import { useNavigate } from "react-router-dom";
import '../assets/style/Admin.css';
import adminimg from '../assets/images/admin img.png';

function Admin() {
    const navigate = useNavigate();
    const [adminDetails, setAdminDetails] = useState({
        name: 'Meera Jasmine',
        email: 'Meera@gmail.com',
        password: '******',
        qualification: 'MSc',
        experience: '5 years',
        dob: '1990-01-01',
        phone: '123-456-7890'
    });
    const [isEditing, setIsEditing] = useState(false);
    const [activeSection, setActiveSection] = useState('schedule');
    const [searchQuery, setSearchQuery] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const [coders, setCoders] = useState([
        { id: 1, name: "Michael David", interviewsCompleted: 5, remarks: "Good" },
        { id: 2, name: "Edward James", interviewsCompleted: 8, remarks: "Excellent" }
    ]);
    const [interviewers, setInterviewers] = useState([
        { id: 1, name: "Jane Doe", email: "jane@example.com", qualification: "MSc", skills: "React, Node.js", experience: "5 years" },
        { id: 2, name: "John Smith", email: "john@example.com", qualification: "BSc", skills: "Java, Spring", experience: "3 years" }
    ]);
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", qualification: "", experience: "", dob: "", phone: "", type: "coder" });

    const [reminders, setReminders] = useState([
        { id: 1, task: "Maintenance", description: "Check server status and perform necessary updates." },
        { id: 2, task: "User Review", description: "Review new user applications for approval." }
    ]);

    const [interviewSchedules, setInterviewSchedules] = useState([
        { id: 1, interviewer: "Jane Doe", date: "2024-08-01", time: "10:00 AM", candidate: "John Smith" },
        // Add more schedules here if needed
    ]);

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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleAddUser = () => {
        const { name, email, password, qualification, experience, dob, phone, type } = newUser;
        if (name && email && password && qualification && experience && dob && phone) {
            if (type === 'coder') {
                setCoders([...coders, { id: Date.now(), name, interviewsCompleted: 0, remarks: "" }]);
            } else if (type === 'interviewer') {
                setInterviewers([...interviewers, { id: Date.now(), name, email, qualification, experience, dob, phone }]);
            }
            setNewUser({ name: "", email: "", password: "", qualification: "", experience: "", dob: "", phone: "", type: "coder" });
        }
    };

    const handleDeleteUser = (id, type) => {
        if (type === 'coder') {
            setCoders(coders.filter(coder => coder.id !== id));
        } else if (type === 'interviewer') {
            setInterviewers(interviewers.filter(interviewer => interviewer.id !== id));
        }
    };

    const handleEditUser = (user, type) => {
        setEditMode(true);
        setCurrentUser({ ...user, type });
    };

    const handleSaveEdit = () => {
        const { id, name, email, password, qualification, experience, dob, phone, type } = currentUser;
        if (name && email && password && qualification && experience && dob && phone) {
            if (type === 'coder') {
                setCoders(coders.map(coder => coder.id === id ? { id, name, interviewsCompleted: coder.interviewsCompleted, remarks: coder.remarks } : coder));
            } else if (type === 'interviewer') {
                setInterviewers(interviewers.map(interviewer => interviewer.id === id ? { id, name, email, qualification, experience, dob, phone } : interviewer));
            }
            setEditMode(false);
            setCurrentUser(null);
        }
    };

    const renderCard = (data, type) => (
        <div className="card-container">
            {data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).map(item => (
                <div className="card" key={item.id}>
                    <h3>{item.name}</h3>
                    {type === 'interviewer' ? (
                        <>
                            <p>Email: {item.email}</p>
                            <p>Qualification: {item.qualification}</p>
                            <p>Experience: {item.experience}</p>
                            <p>DOB: {item.dob}</p>
                            <p>Phone: {item.phone}</p>
                        </>
                    ) : (
                        <>
                            <p>Interviews Completed: {item.interviewsCompleted}</p>
                            <p>Remarks: {item.remarks}</p>
                        </>
                    )}
                    <div className="card-actions">
                        <button className="edit-button" onClick={() => handleEditUser(item, type)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDeleteUser(item.id, type)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderSection = () => {
        switch (activeSection) {
            case 'schedule':
                return (
                    <div className="admin-section">
                        <h2>Upcoming Interviews</h2>
                        <div className="admin-section">
                            {interviewSchedules.map((schedule) => (
                                <div className="schedule-card" key={schedule.id}>
                                    <h3>Interviewer: {schedule.interviewer}</h3>
                                    <p>Date: {schedule.date}</p>
                                    <p>Time: {schedule.time}</p>
                                    <p>Candidate: {schedule.candidate}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'interviewers':
                return (
                    <div className="admin-section">
                        <h2>List of Interviewers</h2>
                        {renderCard(interviewers, 'interviewer')}
                    </div>
                );
            case 'coders':
                return (
                    <div className="admin-section">
                        <h2>List of Coders</h2>
                        {renderCard(coders, 'coder')}
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
                                    type="password"
                                    name="password"
                                    value={adminDetails.password}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="text"
                                    name="qualification"
                                    value={adminDetails.qualification}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="text"
                                    name="experience"
                                    value={adminDetails.experience}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="date"
                                    name="dob"
                                    value={adminDetails.dob}
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
                                <p>Password: {adminDetails.password}</p>
                                <p>Qualification: {adminDetails.qualification}</p>
                                <p>Experience: {adminDetails.experience}</p>
                                <p>Date of Birth: {adminDetails.dob}</p>
                                <p>Phone: {adminDetails.phone}</p>
                                <button onClick={() => setIsEditing(true)}>Edit</button>
                            </div>
                        )}
                    </div>
                );
            case 'addUser':
                return (
                    <div className="admin-section">
                        <h2>Add User</h2>
                        <div className="add-user">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Qualification"
                                value={newUser.qualification}
                                onChange={(e) => setNewUser({ ...newUser, qualification: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Experience"
                                value={newUser.experience}
                                onChange={(e) => setNewUser({ ...newUser, experience: e.target.value })}
                            />
                            <input
                                type="date"
                                value={newUser.dob}
                                onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })}
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                value={newUser.phone}
                                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                            />
                            <select
                                value={newUser.type}
                                onChange={(e) => setNewUser({ ...newUser, type: e.target.value })}
                            >
                                <option value="" disabled>Select Role</option>
                                <option value="Coder">Coder</option>
                                <option value="Interviewer">Interviewer</option>
                            </select>
                            <button onClick={handleAddUser}>Add User</button>
                        </div>
                    </div>
                );
            case 'reminders':
                return (
                    <div className="admin-section">
                        <h2>Reminders</h2>
                        <ul className="reminders-list">
                            {reminders.map(reminder => (
                                <li key={reminder.id}>
                                    <h3>{reminder.task}</h3>
                                    <p>{reminder.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };
   

    return (
        <div className="admin-dashboard">
            <aside className="sidebar">
                <div className="admin-profile-sidebar">
                    <img src={adminimg} alt="Admin" className="admin-image" />
                    <h3>Meera Jasmine</h3>
                </div>
                <ul className="sidebar-menu">
                    <li onClick={() => setActiveSection('schedule')}><FaList /> Upcoming Interviews</li>
                    <li onClick={() => setActiveSection('interviewers')}><FaUser /> Interviewers</li>
                    <li onClick={() => setActiveSection('coders')}><FaUsers /> Coders</li>
                    <li onClick={() => setActiveSection('addUser')}><FaPlus /> Add User</li>
                    <li onClick={() => setActiveSection('reminders')}><FaBell /> Reminders</li>
                    <li onClick={() => setActiveSection('profile')}><FaChartBar /> Admin Profile</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </aside>
            <main className="admin-content">
                {renderSection()}
            </main>
        </div>
    );
}

export default Admin;
