import React, { useState } from 'react';
import '../assets/style/Mentor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faUsers, faSignOutAlt, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Main Mentor Component
const Mentor = ({ setActiveTab }) => {
  const [activeTab, setActiveTabState] = useState('welcome');
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', password: '******', batch: '2022', dept: 'Math', section: 'A', photo: 'url1' },
    { id: 2, name: 'Bob Brown', email: 'bob@example.com', password: '******', batch: '2022', dept: 'Science', section: 'B', photo: 'url2' },
  ]);
  const [interviews, setInterviews] = useState([
    { id: 1, title: 'Interview 1', date: '2024-08-01' },
    { id: 2, title: 'Interview 2', date: '2024-08-02' },
  ]);

  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'interviews':
        return <Interviews interviews={interviews} />;
      case 'students':
        return <Students students={students} onAddStudent={handleAddStudent} />;
      case 'welcome':
      default:
        return <Welcome />;
    }
  };

  return (
    <div className="mentor">
      <div className="sidebar">
        <div className="profile-icon">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <ul>
          <li onClick={() => setActiveTabState('profile')}><FontAwesomeIcon icon={faUser} /> Profile</li>
          <li onClick={() => setActiveTabState('interviews')}><FontAwesomeIcon icon={faCalendarAlt} /> Interviews</li>
          <li onClick={() => setActiveTabState('students')}><FontAwesomeIcon icon={faUsers} /> Students</li>
          <li onClick={() => setActiveTab('welcome')}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</li>
        </ul>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

// Welcome Component
const Welcome = () => (
  <div className="welcome">
    <h2>Welcome, Back!</h2>
    <p>Please select an option from the sidebar to manage your tasks.</p>
  </div>
);

// Profile Component
const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Mentor Name",
    email: "mentor@example.com",
    contact: "123-456-7890",
    dept: "Department",
    classBeingMentored: "Class",
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Profile updated:", profileData);
    setIsEditing(false);
  };

  return (
    <div className="profile">
      <h2>Mentor Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Contact:</label>
            <input
              type="text"
              name="contact"
              value={profileData.contact}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Department:</label>
            <input
              type="text"
              name="dept"
              value={profileData.dept}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Class Being Mentored:</label>
            <input
              type="text"
              name="classBeingMentored"
              value={profileData.classBeingMentored}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Contact:</strong> {profileData.contact}</p>
          <p><strong>Department:</strong> {profileData.dept}</p>
          <p><strong>Class Being Mentored:</strong> {profileData.classBeingMentored}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

// Interviews Component
const Interviews = ({ interviews }) => (
  <div className="interviews">
    <h2>Interviews</h2>
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {interviews.map(interview => (
          <tr key={interview.id}>
            <td>{interview.title}</td>
            <td>{interview.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Students Component
const Students = ({ students, onAddStudent }) => {
  const [newStudent, setNewStudent] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    batch: '',
    dept: '',
    section: '',
    photo: ''
  });

  const handleAdd = () => {
    if (newStudent.name && newStudent.email) {
      onAddStudent({ ...newStudent, id: students.length + 1 });
      setNewStudent({
        id: '',
        name: '',
        email: '',
        password: '',
        batch: '',
        dept: '',
        section: '',
        photo: ''
      });
    }
  };

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleEdit = (id) => {
    console.log(`Edit student with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete student with id: ${id}`);
  };

  return (
    <div className="students">
      <h2>Students</h2>
      <div className="add-student">
        <h3>Add New Student</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newStudent.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={newStudent.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="batch"
          placeholder="Batch"
          value={newStudent.batch}
          onChange={handleChange}
        />
        <input
          type="text"
          name="dept"
          placeholder="Department"
          value={newStudent.dept}
          onChange={handleChange}
        />
        <input
          type="text"
          name="section"
          placeholder="Section"
          value={newStudent.section}
          onChange={handleChange}
        />
        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={newStudent.photo}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Add Student</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Batch</th>
            <th>Department</th>
            <th>Section</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.password}</td>
              <td>{student.batch}</td>
              <td>{student.dept}</td>
              <td>{student.section}</td>
              <td><img src={student.photo} alt={student.name} className="student-photo" /></td>
              <td>
                <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(student.id)} />
                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(student.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mentor;
