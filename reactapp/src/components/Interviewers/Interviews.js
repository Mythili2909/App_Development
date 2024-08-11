import { faCalendarAlt, faCheck, faEdit, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../assets/style/InterviewerCss/Interview.css';
import moment from 'moment';

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    roundName: '',
    scheduleDate: '',
    scheduleTime: '12:00 AM'
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch all interviews on component mount
  useEffect(() => {
    axios.get('http://127.0.0.1:8080/api/interviews')
      .then(response => {
        // Parse the dates and times from the backend format
        const parsedInterviews = response.data.map(interview => ({
          ...interview,
          scheduleDate: moment(interview.scheduleDate).format('YYYY-MM-DD'),
          scheduleTime: moment(interview.scheduleTime, 'HH:mm').format('hh:mm A') // Convert to 12-hour format with AM/PM
        }));
        setInterviews(parsedInterviews);
      })
      .catch(error => {
        console.error('Error fetching interviews:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddInterview = () => {
    const { title, description, roundName, scheduleDate, scheduleTime } = formData;
    if (title && roundName && scheduleDate && scheduleTime) {
      // Format the date and time to match the backend format
      const formattedData = {
        ...formData,
        scheduleDate: moment(scheduleDate).format('YYYY-MM-DD'),
        scheduleTime: moment(scheduleTime, 'hh:mm A').format('HH:mm') // Convert to 24-hour format for backend
      };

      axios.post('http://127.0.0.1:8080/api/interviews/add', formattedData)
        .then(response => {
          const newInterview = {
            ...response.data,
            scheduleDate: moment(response.data.scheduleDate).format('YYYY-MM-DD'),
            scheduleTime: moment(response.data.scheduleTime, 'HH:mm').format('hh:mm A') // Display in 12-hour format
          };
          setInterviews([...interviews, newInterview]);
          setFormData({ title: '', description: '', roundName: '', scheduleDate: '', scheduleTime: '12:00 AM' });
          setIsFormVisible(false);
        })
        .catch(error => {
          console.error('Error adding interview:', error);
        });
    } else {
      alert('Title, Round Name, Schedule Date, and Schedule Time are required fields.');
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setFormData({
      ...interviews[index],
      scheduleTime: moment(interviews[index].scheduleTime, 'hh:mm A').format('hh:mm A')
    });
  };

  const handleSaveClick = () => {
    const interviewId = interviews[editingIndex].id;

    // Format the date and time to match the backend format
    const formattedData = {
      ...formData,
      scheduleDate: moment(formData.scheduleDate).format('YYYY-MM-DD'),
      scheduleTime: moment(formData.scheduleTime, 'hh:mm A').format('HH:mm') // Convert to 24-hour format for backend
    };

    axios.put(`http://127.0.0.1:8080/api/interviews/${interviewId}`, formattedData)
      .then(response => {
        const updatedInterviews = [...interviews];
        updatedInterviews[editingIndex] = {
          ...response.data,
          scheduleDate: moment(response.data.scheduleDate).format('YYYY-MM-DD'),
          scheduleTime: moment(response.data.scheduleTime, 'HH:mm').format('hh:mm A') // Display in 12-hour format
        };
        setInterviews(updatedInterviews);
        setEditingIndex(null);
        setFormData({ title: '', description: '', roundName: '', scheduleDate: '', scheduleTime: '12:00 AM' });
      })
      .catch(error => {
        console.error('Error updating interview:', error);
      });
  };

  const handleDelete = (index) => {
    const interviewId = interviews[index].id;
    if (window.confirm('Are you sure you want to delete this interview?')) {
      axios.delete(`http://127.0.0.1:8080/api/interviews/${interviewId}`)
        .then(() => {
          const updatedInterviews = interviews.filter((_, i) => i !== index);
          setInterviews(updatedInterviews);
        })
        .catch(error => {
          console.error('Error deleting interview:', error);
        });
    }
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
    setFormData({ title: '', description: '', roundName: '', scheduleDate: '', scheduleTime: '12:00 AM' });
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setFormData({
      title: '',
      description: '',
      roundName: '',
      scheduleDate: '',
      scheduleTime: '12:00 AM'
    });
  };

  return (
    <div className="interviews-view">
      <h2>Interview Management</h2>

      <button className="schedule-interview-button" onClick={() => setIsFormVisible(true)}>
        <FontAwesomeIcon icon={faCalendarAlt} /> Schedule Interview
      </button>

      {isFormVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCancelForm}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <h3>Schedule Interview</h3>
            <div className="form-group">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="description"
                placeholder="Description (optional)"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="roundName"
                placeholder="Round Name"
                value={formData.roundName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="date"
                name="scheduleDate"
                value={formData.scheduleDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="time"
                name="scheduleTime"
                value={formData.scheduleTime.split(' ')[0]}  // Extract the time part
                onChange={handleInputChange}
              />
              <select
                name="scheduleTimePeriod"
                value={formData.scheduleTime.includes('AM') ? 'AM' : 'PM'}
                onChange={(e) => {
                  const period = e.target.value;
                  const [hours, minutes] = formData.scheduleTime.split(' ')[0].split(':');
                  const time = `${hours}:${minutes} ${period}`;
                  setFormData({ ...formData, scheduleTime: time });
                }}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <div className="form-actions">
              <button className="add-interview-button" onClick={handleAddInterview}>
                <FontAwesomeIcon icon={faPlus} /> Add Interview
              </button>
              <button className="cancel-interview-button" onClick={handleCancelForm}>
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="interviews-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Round Name</th>
            <th>Schedule Date</th>
            <th>Schedule Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview, index) => (
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="roundName"
                      value={formData.roundName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="scheduleDate"
                      value={formData.scheduleDate}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      name="scheduleTime"
                      value={formData.scheduleTime.split(' ')[0]}  // Extract the time part
                      onChange={handleInputChange}
                    />
                    <select
                      name="scheduleTimePeriod"
                      value={formData.scheduleTime.includes('AM') ? 'AM' : 'PM'}
                      onChange={(e) => {
                        const period = e.target.value;
                        const [hours, minutes] = formData.scheduleTime.split(' ')[0].split(':');
                        const time = `${hours}:${minutes} ${period}`;
                        setFormData({ ...formData, scheduleTime: time });
                      }}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </td>
                  <td>
                    <button className="save-button" onClick={handleSaveClick}>
                      <FontAwesomeIcon icon={faCheck} /> Save
                    </button>
                    <button className="cancel-button" onClick={handleCancelClick}>
                      <FontAwesomeIcon icon={faTimes} /> Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{interview.title}</td>
                  <td>{interview.description}</td>
                  <td>{interview.roundName}</td>
                  <td>{interview.scheduleDate}</td>
                  <td>{interview.scheduleTime}</td>
                  <td>
                    <button onClick={() => handleEditClick(index)}>
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button onClick={() => handleDelete(index)}>
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
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

export default Interviews;
