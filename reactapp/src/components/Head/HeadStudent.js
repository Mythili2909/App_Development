import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import 'C:/Users/91739/Desktop/App/App_Development/reactapp/src/assets/style/HeadCss/HeadStudent.css';

function HeadStudent() {
  const [students, setStudents] = useState([
    { registerNo: '101', name: 'Alice Johnson', email: 'alice@example.com', password: 'pass1', dept: 'CSE', batch: '2021', section: 'A', ratings: 4.5, contact: '1234567890' },
    { registerNo: '102', name: 'Bob Smith', email: 'bob@example.com', password: 'pass2', dept: 'IT', batch: '2022', section: 'B', ratings: 4.0, contact: '0987654321' },
    // More student data here...
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterBatch, setFilterBatch] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [formData, setFormData] = useState({ registerNo: '', name: '', email: '', password: '', dept: '', batch: '', section: '', ratings: '', contact: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const filteredStudents = students.filter(student =>
    (filterDept === '' || student.dept === filterDept) &&
    (filterBatch === '' || student.batch === filterBatch) &&
    (filterSection === '' || student.section === filterSection) &&
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrEdit = () => {
    const { registerNo, name, email, password, dept, batch, section, ratings, contact } = formData;
    if (registerNo && name && email && password && dept && batch && section && ratings && contact) {
      if (editingIndex !== null) {
        const updatedStudents = [...students];
        updatedStudents[editingIndex] = formData;
        setStudents(updatedStudents);
        setEditingIndex(null);
      } else {
        setStudents([...students, formData]);
      }
      setFormData({ registerNo: '', name: '', email: '', password: '', dept: '', batch: '', section: '', ratings: '', contact: '' });
    } else {
      alert('All fields must be filled out.');
    }
  };

  const handleEdit = (index) => {
    setFormData(students[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const updatedStudents = students.filter((_, i) => i !== index);
      setStudents(updatedStudents);
    }
  };

  return (
    <div className="student-view">
      <h2>Student Management</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
          <option value="">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="CIVIL">CIVIL</option>
          <option value="MECH">MECH</option>
          <option value="EEE">EEE</option>
          <option value="ECE">ECE</option>
        </select>
        <select value={filterBatch} onChange={(e) => setFilterBatch(e.target.value)}>
          <option value="">All Batches</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
        <select value={filterSection} onChange={(e) => setFilterSection(e.target.value)}>
          <option value="">All Sections</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>
      
      <div className="student-form">
        <input type="text" name="registerNo" placeholder="Register No" value={formData.registerNo} onChange={handleInputChange} />
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        <input type="text" name="dept" placeholder="Department" value={formData.dept} onChange={handleInputChange} />
        <input type="text" name="batch" placeholder="Batch" value={formData.batch} onChange={handleInputChange} />
        <input type="text" name="section" placeholder="Section" value={formData.section} onChange={handleInputChange} />
        <input type="number" name="ratings" placeholder="Ratings" value={formData.ratings} onChange={handleInputChange} />
        <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleInputChange} />
        <button className="add-student-button" onClick={handleAddOrEdit}>
          <FontAwesomeIcon icon={faPlus} /> {editingIndex !== null ? 'Update Student' : 'Add Student'}
        </button>
      </div>
      
      <table className="student-table">
        <thead>
          <tr>
            <th>Register No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Dept</th>
            <th>Batch</th>
            <th>Section</th>
            <th>Ratings</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.registerNo}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.password}</td>
              <td>{student.dept}</td>
              <td>{student.batch}</td>
              <td>{student.section}</td>
              <td>{student.ratings}</td>
              <td>{student.contact}</td>
              <td>
                <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(index)} className="action-icon" />
                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(index)} className="action-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HeadStudent;
