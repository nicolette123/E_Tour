"use client";

import React, { useState } from "react";
import { UserPlus, Search, Edit, Trash2, Shield, UserCheck } from "lucide-react";
import "../shared-styles.css";

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

const AdminUsers = () => {
  const [users, setUsers] = useState(mockData);
  const [selectedRows, setSelectedRows] = useState({});

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
    <div className="admin-page">
      {/* Professional Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">User Management</h1>
        <p className="admin-page-description">
          Manage all user accounts and permissions with comprehensive tools
        </p>
      </div>

      {/* Professional Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon">
              <UsersIcon />
            </div>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-label">Total Users</div>
            <div className="stat-card-value">{totalUsers}</div>
            <div className="stat-card-subtitle">All registered users</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--color-error)' }}>
              <UserCheck />
            </div>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-label">Inactive Users</div>
            <div className="stat-card-value">{inactiveUsers}</div>
            <div className="stat-card-subtitle">Inactive accounts</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--color-success)' }}>
              <Shield />
            </div>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-label">Active Users</div>
            <div className="stat-card-value">{activeUsers}</div>
            <div className="stat-card-subtitle">Active accounts</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--color-info)' }}>
              <UserPlus />
            </div>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-label">Completed Trips</div>
            <div className="stat-card-value">{completedUsers}</div>
            <div className="stat-card-subtitle">Verified accounts</div>
          </div>
        </div>
      </div>

      {/* Professional Users Table */}
      <div className="data-table-container">
        <div className="data-table-header">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
            <div className="data-table-title">All Users</div>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button className="btn btn-primary" onClick={handleAddRow}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </button>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
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
                <input type="checkbox" className="form-checkbox" />
              </th>
              <th onClick={() => handleSort("name")} className="cursor-pointer hover:bg-gray-100">
                Name {sortConfig.key === "name" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("phonenumber")} className="cursor-pointer hover:bg-gray-100">
                Phone Number {sortConfig.key === "phonenumber" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("location")} className="cursor-pointer hover:bg-gray-100">
                Location {sortConfig.key === "location" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("company")} className="cursor-pointer hover:bg-gray-100">
                Company {sortConfig.key === "company" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("status")} className="cursor-pointer hover:bg-gray-100">
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
                      className="form-checkbox"
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
                        <span className={`status-badge ${user.status.toLowerCase() === 'active' ? 'success' :
                          user.status.toLowerCase() === 'inactive' ? 'error' :
                            user.status.toLowerCase() === 'completed' ? 'info' : 'warning'
                          }`}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(user.id)}
                            className="btn btn-sm btn-secondary"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="btn btn-sm btn-error"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </button>
                        </div>
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

export default AdminUsers;