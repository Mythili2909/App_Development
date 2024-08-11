import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../assets/style/AdminCss/Interviewer.css';

function Interviewer() {
  const [interviewers, setInterviewers] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123', contact: '123-456-7890' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password456', contact: '987-654-3210' },
    // More interviewer data here...
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ id: '', name: '', email: '', password: '', contact: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({ id: '', name: '', email: '', password: '', contact: '' });

  const filteredInterviewers = interviewers.filter(interviewer =>
    interviewer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interviewer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interviewer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleAddOrEdit = () => {
    const { id, name, email, password, contact } = formData;
    if (id && name && email && password && contact) {
      if (editingIndex !== null) {
        const updatedInterviewers = [...interviewers];
        updatedInterviewers[editingIndex] = formData;
        setInterviewers(updatedInterviewers);
        setEditingIndex(null);
      } else {
        setInterviewers([...interviewers, formData]);
      }
      setFormData({ id: '', name: '', email: '', password: '', contact: '' });
    } else {
      alert('All fields must be filled out.');
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditFormData(interviewers[index]);
  };

  const handleSaveClick = (index) => {
    const updatedInterviewers = [...interviewers];
    updatedInterviewers[index] = editFormData;
    setInterviewers(updatedInterviewers);
    setEditingIndex(null);
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this interviewer?")) {
      const updatedInterviewers = interviewers.filter((_, i) => i !== index);
      setInterviewers(updatedInterviewers);
    }
  };

  return (
    <div className="interviewer-view">
      <h2>Interviewer Management</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search interviewers by ID, Name, or Email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="interviewer-form">
        <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleInputChange} />
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleInputChange} />
        <div className="add-interviewer-button-container">
          <button className="add-interviewer-button" onClick={handleAddOrEdit}>
            <FontAwesomeIcon icon={faPlus} /> {editingIndex !== null ? 'Update Interviewer' : 'Add Interviewer'}
          </button>
        </div>
      </div>

      <table className="interviewer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInterviewers.map((interviewer, index) => (
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td><input type="text" name="id" value={editFormData.id} onChange={handleEditInputChange} disabled /></td>
                  <td><input type="text" name="name" value={editFormData.name} onChange={handleEditInputChange} /></td>
                  <td><input type="email" name="email" value={editFormData.email} onChange={handleEditInputChange} /></td>
                  <td><input type="password" name="password" value={editFormData.password} onChange={handleEditInputChange} /></td>
                  <td><input type="text" name="contact" value={editFormData.contact} onChange={handleEditInputChange} /></td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} onClick={() => handleSaveClick(index)} className="action-icon" />
                    <FontAwesomeIcon icon={faTimes} onClick={handleCancelClick} className="action-icon" />
                  </td>
                </>
              ) : (
                <>
                  <td>{interviewer.id}</td>
                  <td>{interviewer.name}</td>
                  <td>{interviewer.email}</td>
                  <td>{interviewer.password}</td>
                  <td>{interviewer.contact}</td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} onClick={() => handleEditClick(index)} className="action-icon" />
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(index)} className="action-icon" />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Interviewer;
