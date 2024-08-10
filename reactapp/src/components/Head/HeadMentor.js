import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../assets/style/HeadCss/HeadMentor.css';

function HeadMentor() {
  const [mentors, setMentors] = useState([
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', qualification: 'PhD', experience: '10 years' },
    { id: '2', name: 'Bob Brown', email: 'bob@example.com', qualification: 'MSc', experience: '7 years' },
    // More mentor data here...
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ id: '', name: '', email: '', qualification: '', experience: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({ id: '', name: '', email: '', qualification: '', experience: '' });

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.email.toLowerCase().includes(searchTerm.toLowerCase())
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
        const updatedMentors = [...mentors];
        updatedMentors[editingIndex] = formData;
        setMentors(updatedMentors);
        setEditingIndex(null);
      } else {
        setMentors([...mentors, formData]);
      }
      setFormData({ id: '', name: '', email: '', qualification: '', experience: '' });
    } else {
      alert('All fields must be filled out.');
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditFormData(mentors[index]);
  };

  const handleSaveClick = (index) => {
    const updatedMentors = [...mentors];
    updatedMentors[index] = editFormData;
    setMentors(updatedMentors);
    setEditingIndex(null);
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this mentor?")) {
      const updatedMentors = mentors.filter((_, i) => i !== index);
      setMentors(updatedMentors);
    }
  };

  return (
    <div className="mentor-view">
      <h2>Mentor Management</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search mentors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mentor-form">
        <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleInputChange} />
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        <input type="text" name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleInputChange} />
        <input type="text" name="experience" placeholder="Experience" value={formData.experience} onChange={handleInputChange} />
        <div className="add-mentor-button-container">
          <button className="add-mentor-button" onClick={handleAddOrEdit}>
            <FontAwesomeIcon icon={faPlus} /> {editingIndex !== null ? 'Update Mentor' : 'Add Mentor'}
          </button>
        </div>
      </div>

      <table className="mentor-table">
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
          {filteredMentors.map((mentor, index) => (
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
                  <td>{mentor.id}</td>
                  <td>{mentor.name}</td>
                  <td>{mentor.email}</td>
                  <td>{mentor.qualification}</td>
                  <td>{mentor.experience}</td>
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

export default HeadMentor;
