import React from 'react';
import './admin.css'; // Assuming CSS is in a separate file

export default function Admin() {
  // Dummy data for the dashboard
  const dashboardData = {
    totalTrips: 120,
    totalBookings: 350,
    totalUsers: 500,
    revenue: 15000, // In RWF (Rwandan Franc)
    recentTrips: [
      {
        id: 1,
        title: 'Kigali City Tour',
        destination: 'Kigali, Rwanda',
        bookings: 25,
        status: 'Active',
      },
      {
        id: 2,
        title: 'Nyungwe Forest Adventure',
        destination: 'Nyungwe, Rwanda',
        bookings: 15,
        status: 'Pending',
      },
      {
        id: 3,
        title: 'Lake Kivu Retreat',
        destination: 'Gisenyi, Rwanda',
        bookings: 30,
        status: 'Active',
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      
      {/* Overview Cards */}
      <div className="overview-grid">
        <div className="card">
          <h3>Total Trips</h3>
          <p className="card-value">{dashboardData.totalTrips}</p>
        </div>
        <div className="card">
          <h3>Total Bookings</h3>
          <p className="card-value">{dashboardData.totalBookings}</p>
        </div>
        <div className="card">
          <h3>Total Users</h3>
          <p className="card-value">{dashboardData.totalUsers}</p>
        </div>
        <div className="card">
          <h3>Revenue (RWF)</h3>
          <p className="card-value">{dashboardData.revenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Recent Trips Table */}
      <div className="recent-trips">
        <h2>Recent Trips</h2>
        <table className="trips-table">
          <thead>
            <tr>
              <th>Trip Title</th>
              <th>Destination</th>
              <th>Bookings</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.recentTrips.map((trip) => (
              <tr key={trip.id}>
                <td>{trip.title}</td>
                <td>{trip.destination}</td>
                <td>{trip.bookings}</td>
                <td>
                  <span className={`status ${trip.status.toLowerCase()}`}>
                    {trip.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn view">View</button>
                  <button className="action-btn edit">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}