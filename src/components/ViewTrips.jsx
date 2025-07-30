'use client';
import React, { useState } from 'react';
import SideBar from '@/components/SideBar';
import TopBar from './TopBar';
import "@/styles/dashboard.css";
import "@/styles/table.css";
import "@/styles/stats.css";

const mockData = [
  {
    id: 1,
    tripname: "zipline",
    startdate: "2025-01-01",
    enddate: "2025-01-02",
    location: "Kigali",
    amount: "1000",
    company: "Transport Co",
    status: "Completed"
  },
  {
    id: 2,
    tripname: "zipline",
    startdate: "2025-01-01",
    enddate: "2025-01-02",
    location: "Kigali",
    amount: "1000",
    company: "Transport Co",
    status: "Completed"
  },
  {
    id: 3,
    tripname: "zipline",
    startdate: "2025-01-01",
    enddate: "2025-01-02",
    location: "Kigali",
    amount: "1000",
    company: "Transport Co",
    status: "Completed"
  },
  {
    id: 4,
    tripname: "zipline",
    startdate: "2025-01-01",
    enddate: "2025-01-02",
    location: "Kigali",
    amount: "1000",
    company: "Transport Co",
    status: "Completed"
  },
  {
    id: 5,
    tripname: "zipline",
    startdate: "2025-01-01",
    enddate: "2025-01-02",
    location: "Kigali",
    amount: "1000",
    company: "Transport Co",
    status: "Rejected"
  }
];

const ViewTrips = () => {
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
      tripname: trip.tripname,
      startdate: trip.startdate,
      enddate: trip.enddate,
      location: trip.location,
      amount: trip.amount,
      company: trip.company,
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
      const aValue = a[key] ? a[key].toString().toLowerCase() : '';
      const bValue = b[key] ? b[key].toString().toLowerCase() : '';
      
      if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setTrips(sortedTrips);
  };

  const handleAddRow = () => {
    const newTrip = {
      id: Math.max(...trips.map(t => t.id), 0) + 1,
      tripname: "New Trip",
      startdate: new Date().toISOString().split('T')[0],
      enddate: new Date().toISOString().split('T')[0],
      location: "New Location",
      amount: "0",
      company: "New Company",
      status: "Pending"
    };
    setTrips([...trips, newTrip]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTrips = trips.filter(trip =>
    trip.tripname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Compute stats from trips data
  const totalTrips = trips.length;
  const newTrips = trips.filter(trip => trip.status === "Pending").length;
  const completeTrips = trips.filter(trip => trip.status === "Completed").length;
  const pendingTrips = trips.filter(trip => trip.status === "Pending").length;

  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="main-content">
        <TopBar title="View Trips" />
        <div className="content-body">
          <div className="stats-card">
            <div className="grid-container">
              <div className="grid-item">
                <h4>
                  <i className="ri-group-fill"></i> Total Trips
                </h4>
                <p>{totalTrips}</p>
              </div>
              <div className="grid-item">
                <h4>
                  <i className="ri-user-fill"></i> New Trips
                </h4>
                <p>{newTrips}</p>
              </div>
              <div className="grid-item">
                <h4>
                  <i className="ri-heart-3-fill"></i> Complete Trips
                </h4>
                <p>{completeTrips}</p>
              </div>
              <div className="grid-item">
                <h4>
                  <i className="ri-more-fill"></i> Pending Trips
                </h4>
                <p>{pendingTrips}</p>
              </div>
            </div>
          </div>
          <div className="trip-table">
            <h3>Total Trips</h3>
            <div className="table-header">
              <i className="ri-add-large-fill" onClick={handleAddRow}></i>
              <i className="ri-sort-alphabet-asc" onClick={() => handleSort('tripname')}></i>
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
                  <th onClick={() => handleSort('tripname')}>Trip Name {sortConfig.key === 'tripname' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
                  <th onClick={() => handleSort('startdate')}>Start Date {sortConfig.key === 'startdate' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
                  <th onClick={() => handleSort('enddate')}>End Date {sortConfig.key === 'enddate' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
                  <th onClick={() => handleSort('location')}>Location {sortConfig.key === 'location' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
                  <th onClick={() => handleSort('amount')}>Amount {sortConfig.key === 'amount' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
                  <th onClick={() => handleSort('company')}>Company {sortConfig.key === 'company' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
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
                          <td><input type="text" value={editFormData.tripname} onChange={(e) => handleEditChange(e, 'tripname')} /></td>
                          <td><input type="date" value={editFormData.startdate} onChange={(e) => handleEditChange(e, 'startdate')} /></td>
                          <td><input type="date" value={editFormData.enddate} onChange={(e) => handleEditChange(e, 'enddate')} /></td>
                          <td><input type="text" value={editFormData.location} onChange={(e) => handleEditChange(e, 'location')} /></td>
                          <td><input type="number" value={editFormData.amount} onChange={(e) => handleEditChange(e, 'amount')} /></td>
                          <td><input type="text" value={editFormData.company} onChange={(e) => handleEditChange(e, 'company')} /></td>
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
                          <td>{trip.tripname}</td>
                          <td>{trip.startdate}</td>
                          <td>{trip.enddate}</td>
                          <td>{trip.location}</td>
                          <td>{trip.amount}</td>
                          <td>{trip.company}</td>
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
                    <td colSpan="9">No trips found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTrips;