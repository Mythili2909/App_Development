import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../assets/style/HeadCss/HeadInterviewer.css';

function HeadInterviewer() {
  const [interviewers, setInterviewers] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', qualification: 'MBA', experience: '5 years' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', qualification: 'MSc', experience: '3 years' },
    // More interviewer data here...
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ id: '', name: '', email: '', qualification: '', experience: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({ id: '', name: '', email: '', qualification: '', experience: '' });

  const filteredInterviewers = interviewers.filter(interviewer =>
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
    const { id, name, email, qualification, experience } = formData;
    if (id && name && email && qualification && experience) {
      if (editingIndex !== null) {
        const updatedInterviewers = [...interviewers];
        updatedInterviewers[editingIndex] = formData;
        setInterviewers(updatedInterviewers);
        setEditingIndex(null);
      } else {
        setInterviewers([...interviewers, formData]);
      }
      setFormData({ id: '', name: '', email: '', qualification: '', experience: '' });
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
          placeholder="Search interviewers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="interviewer-form">
        <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleInputChange} />
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        <input type="text" name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleInputChange} />
        <input type="text" name="experience" placeholder="Experience" value={formData.experience} onChange={handleInputChange} />
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
            <th>Qualification</th>
            <th>Experience</th>
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
                  <td><input type="text" name="qualification" value={editFormData.qualification} onChange={handleEditInputChange} /></td>
                  <td><input type="text" name="experience" value={editFormData.experience} onChange={handleEditInputChange} /></td>
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
                  <td>{interviewer.qualification}</td>
                  <td>{interviewer.experience}</td>
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

export default HeadInterviewer;
