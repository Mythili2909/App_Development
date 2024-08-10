import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../assets/style/AdminCss/Head.css';

function Head() {
  const [heads, setHeads] = useState([
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', password: 'password123', contact: '123-456-7890', dept: 'CSE' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', password: 'password123', contact: '987-654-3210', dept: 'IT' },
    // More head data here...
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ id: '', name: '', email: '', password: '', contact: '', dept: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempData, setTempData] = useState(null); // Temporarily store data during editing

  const filteredHeads = heads.filter(head =>
    head.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    head.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e, index = null) => {
    if (index !== null) {
      // Inline editing for table rows
      const updatedHeads = [...heads];
      updatedHeads[index] = { ...updatedHeads[index], [e.target.name]: e.target.value };
      setHeads(updatedHeads);
    } else {
      // Form input change for adding new head
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateFields = (data) => {
    let isValid = true;
    if (!data.name || !data.email || !data.password || !data.contact || !data.dept) {
      isValid = false;
    }
    return isValid;
  };

  const handleAddOrEdit = () => {
    if (editingIndex !== null) {
      // Update existing head
      if (validateFields(formData)) {
        const updatedHeads = [...heads];
        updatedHeads[editingIndex] = formData;
        setHeads(updatedHeads);
        setEditingIndex(null);
        setFormData({ id: '', name: '', email: '', password: '', contact: '', dept: '' });
      } else {
        alert('Please fill out all required fields.');
      }
    } else {
      // Add new head
      if (validateFields(formData)) {
        setHeads([...heads, formData]);
        setFormData({ id: '', name: '', email: '', password: '', contact: '', dept: '' });
      } else {
        alert('Please fill out all required fields.');
      }
    }
  };

  const handleEditClick = (index) => {
    setTempData({ ...heads[index] }); // Save the current data before editing
    setEditingIndex(index);
  };

  const handleSaveClick = () => {
    setEditingIndex(null);
    setTempData(null); // Clear temporary data
  };

  const handleCancelClick = () => {
    const updatedHeads = [...heads];
    updatedHeads[editingIndex] = tempData; // Restore the original data
    setHeads(updatedHeads);
    setEditingIndex(null);
    setTempData(null);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this head?")) {
      const updatedHeads = heads.filter((_, i) => i !== index);
      setHeads(updatedHeads);
    }
  };

  return (
    <div className="head-view">
      <h2>Head Management</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search heads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="head-form-container">
        <div className="head-form">
          <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleInputChange} />
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
          <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleInputChange} />
          <input type="text" name="dept" placeholder="Department" value={formData.dept} onChange={handleInputChange} />
          
          <button className="add-head-button" onClick={handleAddOrEdit}>
            <FontAwesomeIcon icon={faPlus} /> {editingIndex !== null ? 'Update Head' : 'Add Head'}
          </button>
        </div>
      </div>

      <table className="head-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Contact</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredHeads.map((head, index) => (
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td><input type="text" name="id" value={head.id} onChange={(e) => handleInputChange(e, index)} disabled /></td>
                  <td><input type="text" name="name" value={head.name} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="email" name="email" value={head.email} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="password" name="password" value={head.password} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="text" name="contact" value={head.contact} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="text" name="dept" value={head.dept} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} onClick={handleSaveClick} className="action-icon" />
                    <FontAwesomeIcon icon={faTimes} onClick={handleCancelClick} className="action-icon" />
                  </td>
                </>
              ) : (
                <>
                  <td>{head.id}</td>
                  <td>{head.name}</td>
                  <td>{head.email}</td>
                  <td>{head.password}</td>
                  <td>{head.contact}</td>
                  <td>{head.dept}</td>
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

export default Head;
