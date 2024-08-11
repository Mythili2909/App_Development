import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../assets/style/StudentCss/StudentInterviews.css'; // Ensure this path is correct for your CSS file

const StudentInterviews = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleTakeTest = (roundType) => {
    if (roundType === 'HR Round') {
      navigate('/demo'); // Navigate to the 'demo' page for HR Round
    } else {
      // Handle other rounds or default behavior
      alert(`Navigating to ${roundType} test`);
    }
  };

  return (
    <div className="schedules-container">
      <h1>My Interviews</h1>
      <div className="card-container">
        <div className="card">
          <h3>Technical Round</h3>
          <p>Prepare for the technical round with coding and problem-solving tasks.</p>
          <button onClick={() => handleTakeTest('Technical Round')} className="take-test-button">
            Take Test
          </button>
        </div>
        <div className="card">
          <h3>HR Round</h3>
          <p>Prepare for the HR round with behavioral and situational questions.</p>
          <button onClick={() => handleTakeTest('HR Round')} className="take-test-button">
            Take Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentInterviews;
