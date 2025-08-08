"use client"
import React, { useState } from 'react';
import './ManageTrip.css';

// Dummy data for trips
const initialTrips = [
  {
    id: 1,
    title: 'Client Meeting in Musanze',
    destination: 'Musanze, Rwanda',
    startDate: '2025-10-15',
    endDate: '2025-10-16',
    status: 'Upcoming',
  },
  {
    id: 2,
    title: 'Kigali Office Visit',
    destination: 'Kigali, Rwanda',
    startDate: '2025-09-01',
    endDate: '2025-09-01',
    status: 'Completed',
  },
  {
    id: 3,
    title: 'Site Inspection in Rubavu',
    destination: 'Rubavu, Rwanda',
    startDate: '2025-11-20',
    endDate: '2025-11-23',
    status: 'Upcoming',
  },
];

export default function ManageTripPage() {
  const [trips, setTrips] = useState(initialTrips);

  const handleEdit = (tripId) => {
    // In a real application, this would open a modal or navigate to an edit form
    console.log(`Editing trip with ID: ${tripId}`);
    alert(`Editing trip with ID: ${tripId}`);
  };

  const handleDelete = (tripId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this trip?');
    if (isConfirmed) {
      setTrips(trips.filter(trip => trip.id !== tripId));
      console.log(`Deleting trip with ID: ${tripId}`);
    }
  };

  return (
    <div className="manage-trip-container">
      <h1 className="page-title">Manage Your Trips</h1>
      {trips.length > 0 ? (
        <div className="trip-list">
          {trips.map(trip => (
            <div key={trip.id} className="trip-card">
              <div className="trip-details">
                <h2 className="trip-title">{trip.title}</h2>
                <p><strong>Destination:</strong> {trip.destination}</p>
                <p><strong>Dates:</strong> {trip.startDate} to {trip.endDate}</p>
                <p className="trip-status">
                  <strong>Status:</strong> <span className={`status-${trip.status.toLowerCase()}`}>{trip.status}</span>
                </p>
              </div>
              <div className="trip-actions">
                <button 
                  className="action-button edit-button" 
                  onClick={() => handleEdit(trip.id)}
                >
                  Edit
                </button>
                <button 
                  className="action-button delete-button" 
                  onClick={() => handleDelete(trip.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-trips-message">You have no trips planned at this time.</p>
      )}
    </div>
  );
}