import React from 'react';
import '../../assets/style/AdminCss/FeedBackadmindash.css';

const notifications = [
  {
    title: 'System Maintenance Alert',
    content: 'Scheduled maintenance on Friday at 3 PM. Service might be unavailable during this time.',
  },
  {
    title: 'New User Registration',
    content: 'A new user has registered. Please review their details in the user management section.',
  },
];

const dailyUpdates = [
  {
    title: 'Tasks for Today',
    content: 'Assess new feedback submissions.\nReview upcoming interview schedules.\nUpdate profiles for all users.',
  },
  {
    title: 'Pending Tasks',
    content: 'Approve pending interview requests.\nValidate the credentials of new users.',
  },
];

const statistics = [
  {
    title: 'Total Registered Users',
    content: '350',
  },
  {
    title: 'Interviews Scheduled Today',
    content: '12',
  },
  {
    title: 'Recent Feedback Received',
    content: '25 new feedbacks',
  },
];

function AdminDashboardCards() {
  return (
    <div className="dashboard-cards-container">
      <div className="dashboard-card notifications-card">
        <h3>Notifications</h3>
        {notifications.map((notification, index) => (
          <div key={index} className="dashboard-card-item">
            <h4>{notification.title}</h4>
            <p>{notification.content}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-card daily-updates-card">
        <h3>Daily Updates</h3>
        {dailyUpdates.map((update, index) => (
          <div key={index} className="dashboard-card-item">
            <h4>{update.title}</h4>
            <p>{update.content}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-card statistics-card">
        <h3>Statistics</h3>
        {statistics.map((stat, index) => (
          <div key={index} className="dashboard-card-item">
            <h4>{stat.title}</h4>
            <p>{stat.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboardCards;
