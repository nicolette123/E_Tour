import React from 'react';
import './agent.css'; // Import the CSS file

// Dummy data for the dashboard
const dummyData = {
  totalLeads: 150,
  leadsThisMonth: 35,
  appointmentsScheduled: 20,
  closedDeals: 5,
  pendingTasks: [
    { id: 1, task: 'Follow up with John Doe', dueDate: '2025-08-15' },
    { id: 2, task: 'Schedule a call with Jane Smith', dueDate: '2025-08-18' },
    { id: 3, task: 'Prepare a presentation for the new client', dueDate: '2025-08-20' },
  ],
  recentActivity: [
    { id: 1, activity: 'Called John Doe', timestamp: '2 hours ago' },
    { id: 2, activity: 'Updated lead status for Jane Smith', timestamp: '5 hours ago' },
    { id: 3, activity: 'Sent an email to a new prospect', timestamp: '1 day ago' },
  ],
};

export default function AgentDashboard() {
  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Agent Dashboard 📊</h1>

      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Total Leads</h3>
          <p className="summary-value">{dummyData.totalLeads}</p>
        </div>
        <div className="summary-card">
          <h3>Leads This Month</h3>
          <p className="summary-value">{dummyData.leadsThisMonth}</p>
        </div>
        <div className="summary-card">
          <h3>Appointments Scheduled</h3>
          <p className="summary-value">{dummyData.appointmentsScheduled}</p>
        </div>
        <div className="summary-card">
          <h3>Closed Deals</h3>
          <p className="summary-value">{dummyData.closedDeals}</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2>Pending Tasks 📝</h2>
          <ul className="task-list">
            {dummyData.pendingTasks.map((task) => (
              <li key={task.id} className="task-item">
                <span className="task-text">{task.task}</span>
                <span className="task-due-date">Due: {task.dueDate}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-section">
          <h2>Recent Activity 🔔</h2>
          <ul className="activity-list">
            {dummyData.recentActivity.map((activity) => (
              <li key={activity.id} className="activity-item">
                <span className="activity-text">{activity.activity}</span>
                <span className="activity-timestamp">{activity.timestamp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}