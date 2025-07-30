"use client";

import React, { useState } from 'react';
import "@/styles/table.css";

const mockData = [
  {
    id: 1,
    orderId: "CM210",
    agent: "Natalia",
    location: "Kigali",
    address: "123 Main St",
    date: "2025-01-01",
    status: "Completed"
  },
  {
    id: 2,
    orderId: "CM211",
    agent: "John",
    location: "Karongi",
    address: "456 Elm St",
    date: "2025-02-01",
    status: "Pending"
  },
  {
    id: 3,
    orderId: "CM212",
    agent: "Emma",
    location: "Nyagatare",
    address: "789 Oak St",
    date: "2025-03-01",
    status: "Rejected"
  }
];

const TripTable = () => {
  const [trips, setTrips] = useState(mockData);
  const [selectedRows, setSelectedRows] = useState({});
  const [menuOpen, setMenuOpen] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [editRowId, setEditRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleCheckboxChange = (id) => {
    setSelectedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleMoreClick = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleEdit = (id) => {
    const trip = trips.find(trip => trip.id === id);
    setEditRowId(id);
    setEditFormData({
      orderId: trip.orderId,
      agent: trip.agent,
      location: trip.location,
      address: trip.address,
      date: trip.date,
      status: trip.status
    });
    setMenuOpen(null);
  };

  const handleEditChange = (event, field) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSaveEdit = (id) => {
    setTrips(trips.map(trip =>
      trip.id === id ? { ...trip, ...editFormData } : trip
    ));
    setEditRowId(null);
    setEditFormData({});
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditFormData({});
  };

  const handleDelete = (id) => {
    setTrips(trips.filter(trip => trip.id !== id));
    setSelectedRows(prev => {
      const newSelected = { ...prev };
      delete newSelected[id];
      return newSelected;
    });
    setMenuOpen(null);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedTrips = [...trips].sort((a, b) => {
      if (a[key].toLowerCase() < b[key].toLowerCase()) return direction === 'ascending' ? -1 : 1;
      if (a[key].toLowerCase() > b[key].toLowerCase()) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setTrips(sortedTrips);
  };

  const handleAddRow = () => {
    const newTrip = {
      id: trips.length + 1,
      orderId: `CM${210 + trips.length}`,
      agent: "New Agent",
      location: "New Location",
      address: "New Address",
      date: new Date().toISOString().split('T')[0],
      status: "Pending"
    };
    setTrips([...trips, newTrip]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTrips = trips.filter(trip =>
    trip.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="trip-table">
      <div className="table-header">
        <i className="ri-add-large-fill" onClick={handleAddRow}></i>
        <i className="ri-sort-alphabet-asc" onClick={() => handleSort('agent')}></i>
        <div className="search">
          <i className="ri-search-line"></i>
          <input
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr className="table-header-row">
            <th><input type="checkbox" /></th>
            <th onClick={() => handleSort('orderId')}>Order ID {sortConfig.key === 'orderId' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
            <th onClick={() => handleSort('agent')}>Agent {sortConfig.key === 'agent' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
            <th onClick={() => handleSort('location')}>Location {sortConfig.key === 'location' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
            <th>Address</th>
            <th onClick={() => handleSort('date')}>Date {sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
            <th onClick={() => handleSort('status')}>Status {sortConfig.key === 'status' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="table-body">
          {filteredTrips.length > 0 ? (
            filteredTrips.map(trip => (
              <tr key={trip.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={!!selectedRows[trip.id]}
                    onChange={() => handleCheckboxChange(trip.id)}
                  />
                </td>
                {editRowId === trip.id ? (
                  <>
                    <td><input type="text" value={editFormData.orderId} onChange={(e) => handleEditChange(e, 'orderId')} /></td>
                    <td><input type="text" value={editFormData.agent} onChange={(e) => handleEditChange(e, 'agent')} /></td>
                    <td><input type="text" value={editFormData.location} onChange={(e) => handleEditChange(e, 'location')} /></td>
                    <td><input type="text" value={editFormData.address} onChange={(e) => handleEditChange(e, 'address')} /></td>
                    <td><input type="date" value={editFormData.date} onChange={(e) => handleEditChange(e, 'date')} /></td>
                    <td>
                      <select value={editFormData.status} onChange={(e) => handleEditChange(e, 'status')}>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td>
                      <div className="edit-form">
                        <button onClick={() => handleSaveEdit(trip.id)}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{trip.orderId}</td>
                    <td>{trip.agent}</td>
                    <td>{trip.location}</td>
                    <td>{trip.address}</td>
                    <td>{trip.date}</td>
                    <td>{trip.status}</td>
                    <td>
                      {selectedRows[trip.id] && (
                        <div className="more-container">
                          <i
                            className="ri-more-fill"
                            onClick={() => handleMoreClick(trip.id)}
                          ></i>
                          {menuOpen === trip.id && (
                            <div className="more-menu">
                              <button onClick={() => handleEdit(trip.id)}>Edit</button>
                              <button onClick={() => handleDelete(trip.id)}>Delete</button>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No trips found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TripTable;