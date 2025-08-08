"use client";

import React, { useState } from "react";
import "./user.scss";

const mockData = [
  {
    id: 1,
    name: "Zipporah Uwimana",
    phonenumber: "+250780000001",
    location: "Kigali",
    company: "Rwanda Tours",
    status: "Completed",
  },
  {
    id: 2,
    name: "Sophia Ingabire",
    phonenumber: "+250780000002",
    location: "Musanze",
    company: "Gorilla Expeditions",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Tom Nkurunziza",
    phonenumber: "+250780000003",
    location: "Gisenyi",
    company: "Kivu Adventures",
    status: "Active",
  },
];

const Users = () => {
  const [users, setUsers] = useState(mockData);
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
    const user = users.find((user) => user.id === id);
    setEditRowId(id);
    setEditFormData({
      name: user.name,
      phonenumber: user.phonenumber,
      location: user.location,
      company: user.company,
      status: user.status,
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
    setUsers(users.map((user) =>
      user.id === id ? { ...user, ...editFormData } : user
    ));
    setEditRowId(null);
    setEditFormData({});
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditFormData({});
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
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

    const sortedUsers = [...users].sort((a, b) => {
      const aValue = a[key] ? a[key].toString().toLowerCase() : "";
      const bValue = b[key] ? b[key].toString().toLowerCase() : "";
      if (aValue < bValue) return direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setUsers(sortedUsers);
  };

  const handleAddRow = () => {
    const newUser = {
      id: Math.max(...users.map((u) => u.id), 0) + 1,
      name: "New User",
      phonenumber: "+250780000000",
      location: "Kigali",
      company: "New Company",
      status: "Pending",
    };
    setUsers([...users, newUser]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phonenumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUsers = users.length;
  const inactiveUsers = users.filter((user) => user.status === "Inactive").length;
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const completedUsers = users.filter((user) => user.status === "Completed").length;

  return (
    <div className="users-dashboard">
      <h1 className="dashboard-title">User Management</h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <i className="ri-group-line"></i>
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div className="stat-card">
          <i className="ri-user-off-line"></i>
          <h3>Inactive Users</h3>
          <p>{inactiveUsers}</p>
        </div>
        <div className="stat-card">
          <i className="ri-user-line"></i>
          <h3>Active Users</h3>
          <p>{activeUsers}</p>
        </div>
        <div className="stat-card">
          <i className="ri-user-check-line"></i>
          <h3>Completed Trips</h3>
          <p>{completedUsers}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table-container">
        <div className="table-header">
          <h2>All Users</h2>
          <div className="table-actions">
            <button className="add-btn" onClick={handleAddRow}>
              <i className="ri-add-line"></i> Add User
            </button>
            <div className="search-bar">
              <i className="ri-search-line"></i>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <table className="users-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th onClick={() => handleSort("name")}>
                Name {sortConfig.key === "name" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("phonenumber")}>
                Phone Number {sortConfig.key === "phonenumber" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("location")}>
                Location {sortConfig.key === "location" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={!!selectedRows[user.id]}
                      onChange={() => handleCheckboxChange(user.id)}
                    />
                  </td>
                  {editRowId === user.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          value={editFormData.name}
                          onChange={(e) => handleEditChange(e, "name")}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editFormData.phonenumber}
                          onChange={(e) => handleEditChange(e, "phonenumber")}
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
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </td>
                      <td>
                        <div className="edit-actions">
                          <button className="action-btn save" onClick={() => handleSaveEdit(user.id)}>
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
                      <td>{user.name}</td>
                      <td>{user.phonenumber}</td>
                      <td>{user.location}</td>
                      <td>{user.company}</td>
                      <td>
                        <span className={`status ${user.status.toLowerCase()}`}>{user.status}</span>
                      </td>
                      <td>
                        {selectedRows[user.id] && (
                          <div className="more-container">
                            <i
                              className="ri-more-2-fill"
                              onClick={() => handleMoreClick(user.id)}
                            ></i>
                            {menuOpen === user.id && (
                              <div className="more-menu">
                                <button onClick={() => handleEdit(user.id)}>
                                  <i className="ri-edit-line"></i> Edit
                                </button>
                                <button onClick={() => handleDelete(user.id)}>
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
                <td colSpan="7" className="no-data">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;