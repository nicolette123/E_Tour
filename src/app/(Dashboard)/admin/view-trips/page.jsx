"use client";

import React, { useState } from "react";
import { MapPin, Calendar, Users, DollarSign, Eye, Edit, Trash2, Plus, Search, Filter } from "lucide-react";
import "../shared-styles.css";

const mockData = [
  {
    id: 1,
    tripname: "Zipline Adventure",
    startdate: "2025-01-01",
    enddate: "2025-01-02",
    location: "Kigali",
    amount: 100000, // In RWF
    company: "Rwanda Tours",
    status: "Completed",
  },
  {
    id: 2,
    tripname: "Nyungwe Trek",
    startdate: "2025-02-01",
    enddate: "2025-02-03",
    location: "Nyungwe",
    amount: 150000,
    company: "Eco Travel",
    status: "Pending",
  },
  {
    id: 3,
    tripname: "Lake Kivu Retreat",
    startdate: "2025-03-01",
    enddate: "2025-03-04",
    location: "Gisenyi",
    amount: 200000,
    company: "Kivu Adventures",
    status: "Completed",
  },
  {
    id: 4,
    tripname: "Volcanoes Safari",
    startdate: "2025-04-01",
    enddate: "2025-04-05",
    location: "Musanze",
    amount: 300000,
    company: "Gorilla Expeditions",
    status: "Pending",
  },
  {
    id: 5,
    tripname: "Akagera Wildlife",
    startdate: "2025-05-01",
    enddate: "2025-05-03",
    location: "Akagera",
    amount: 120000,
    company: "Wild Rwanda",
    status: "Rejected",
  },
];

const ViewTrips = () => {
  const [trips, setTrips] = useState(mockData);
  const [selectedRows, setSelectedRows] = useState({});
  const [menuOpen, setMenuOpen] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [searchTerm, setSearchTerm] = useState("");
  const [editRowId, setEditRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMoreClick = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleEdit = (id) => {
    const trip = trips.find((trip) => trip.id === id);
    setEditRowId(id);
    setEditFormData({
      tripname: trip.tripname,
      startdate: trip.startdate,
      enddate: trip.enddate,
      location: trip.location,
      amount: trip.amount,
      company: trip.company,
      status: trip.status,
    });
    setMenuOpen(null);
  };

  const handleEditChange = (event, field) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSaveEdit = (id) => {
    setTrips(trips.map((trip) => (trip.id === id ? { ...trip, ...editFormData } : trip)));
    setEditRowId(null);
    setEditFormData({});
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditFormData({});
  };

  const handleDelete = (id) => {
    setTrips(trips.filter((trip) => trip.id !== id));
    setSelectedRows((prev) => {
      const newSelected = { ...prev };
      delete newSelected[id];
      return newSelected;
    });
    setMenuOpen(null);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedTrips = [...trips].sort((a, b) => {
      const aValue = a[key] ? a[key].toString().toLowerCase() : "";
      const bValue = b[key] ? b[key].toString().toLowerCase() : "";
      if (aValue < bValue) return direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setTrips(sortedTrips);
  };

  const handleAddRow = () => {
    const newTrip = {
      id: Math.max(...trips.map((t) => t.id), 0) + 1,
      tripname: "New Trip",
      startdate: new Date().toISOString().split("T")[0],
      enddate: new Date().toISOString().split("T")[0],
      location: "New Location",
      amount: 0,
      company: "New Company",
      status: "Pending",
    };
    setTrips([...trips, newTrip]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTrips = trips.filter(
    (trip) =>
      trip.tripname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalTrips = trips.length;
  const newTrips = trips.filter((trip) => trip.status === "Pending").length;
  const completeTrips = trips.filter((trip) => trip.status === "Completed").length;
  const rejectedTrips = trips.filter((trip) => trip.status === "Rejected").length;

  return (
    <div className="admin-page">
      {/* Professional Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">Trips Management</h1>
        <p className="admin-page-description">
          Manage all tour packages and trip offerings with comprehensive tools
        </p>
      </div>

      {/* Professional Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon">
              <MapPin />
            </div>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-label">Total Trips</div>
            <div className="stat-card-value">{totalTrips}</div>
            <div className="stat-card-subtitle">All trip packages</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--color-info)' }}>
              <Plus />
            </div>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-label">New Trips</div>
            <div className="stat-card-value">{newTrips}</div>
            <div className="stat-card-subtitle">Recently added</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--color-success)' }}>
              <Calendar />
            </div>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-label">Completed Trips</div>
            <div className="stat-card-value">{completeTrips}</div>
            <div className="stat-card-subtitle">Successfully completed</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--color-error)' }}>
              <Users />
            </div>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-label">Rejected Trips</div>
            <div className="stat-card-value">{rejectedTrips}</div>
            <div className="stat-card-subtitle">Cancelled or rejected</div>
          </div>
        </div>
      </div>

      {/* Professional Trips Table */}
      <div className="data-table-container">
        <div className="data-table-header">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
            <div className="data-table-title">All Trips</div>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button className="btn btn-primary" onClick={handleAddRow}>
                <Plus className="w-4 h-4 mr-2" />
                Add Trip
              </button>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search trips..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="form-input pl-10"
                  style={{ width: '250px' }}
                />
              </div>
            </div>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th onClick={() => handleSort("tripname")}>
                Trip Name {sortConfig.key === "tripname" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("startdate")}>
                Start Date {sortConfig.key === "startdate" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("enddate")}>
                End Date {sortConfig.key === "enddate" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("location")}>
                Location {sortConfig.key === "location" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("amount")}>
                Amount (RWF) {sortConfig.key === "amount" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("company")}>
                Company {sortConfig.key === "company" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("status")}>
                Status {sortConfig.key === "status" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrips.length > 0 ? (
              filteredTrips.map((trip) => (
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
                      <td>
                        <input
                          type="text"
                          value={editFormData.tripname}
                          onChange={(e) => handleEditChange(e, "tripname")}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          value={editFormData.startdate}
                          onChange={(e) => handleEditChange(e, "startdate")}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          value={editFormData.enddate}
                          onChange={(e) => handleEditChange(e, "enddate")}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editFormData.location}
                          onChange={(e) => handleEditChange(e, "location")}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editFormData.amount}
                          onChange={(e) => handleEditChange(e, "amount")}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editFormData.company}
                          onChange={(e) => handleEditChange(e, "company")}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <select
                          value={editFormData.status}
                          onChange={(e) => handleEditChange(e, "status")}
                          className="edit-select"
                        >
                          <option value="Completed">Completed</option>
                          <option value="Pending">Pending</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td>
                        <div className="edit-actions">
                          <button className="action-btn save" onClick={() => handleSaveEdit(trip.id)}>
                            <i className="ri-save-line"></i> Save
                          </button>
                          <button className="action-btn cancel" onClick={handleCancelEdit}>
                            <i className="ri-close-line"></i> Cancel
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{trip.tripname}</td>
                      <td>{trip.startdate}</td>
                      <td>{trip.enddate}</td>
                      <td>{trip.location}</td>
                      <td>{trip.amount.toLocaleString()}</td>
                      <td>{trip.company}</td>
                      <td>
                        <span className={`status ${trip.status.toLowerCase()}`}>{trip.status}</span>
                      </td>
                      <td>
                        {selectedRows[trip.id] && (
                          <div className="more-container">
                            <i
                              className="ri-more-2-fill"
                              onClick={() => handleMoreClick(trip.id)}
                            ></i>
                            {menuOpen === trip.id && (
                              <div className="more-menu">
                                <button onClick={() => handleEdit(trip.id)}>
                                  <i className="ri-edit-line"></i> Edit
                                </button>
                                <button onClick={() => handleDelete(trip.id)}>
                                  <i className="ri-delete-bin-line"></i> Delete
                                </button>
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
                <td colSpan="9" className="no-data">No trips found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTrips;