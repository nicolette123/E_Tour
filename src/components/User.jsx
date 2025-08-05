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
    name: "Zip",
    phonenumber: "078000000",
    location: "Kigali",
    company: "Transport Co",
    status: "Completed"
  },
  {
    id: 2,
    name: "Sophia",
    phonenumber: "078000000",
    location: "Kigali",
    company: "Transport Co",
    status: "Inactive"
  },
  {
    id: 3,
    name: "Tom",
    phonenumber: "078000000",
    location: "Kigali",
    company: "Transport Co",
    status: "Active"
  },
];

const Users = () => {
  const [users, setUsers] = useState(mockData);
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
    const user = users.find(user => user.id === id);
    setEditRowId(id);
    setEditFormData({
      name: user.name,
      phonenumber: user.phonenumber,
      location: user.location,
      company: user.company,
      status: user.status
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
    setUsers(users.map(user =>
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
    setUsers(users.filter(user => user.id !== id));
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

    const sortedUsers = [...users].sort((a, b) => {
      const aValue = a[key] ? a[key].toString().toLowerCase() : '';
      const bValue = b[key] ? b[key].toString().toLowerCase() : '';
      
      if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setUsers(sortedUsers);
  };

  const handleAddRow = () => {
    const newUser = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      name: "New User",
      phonenumber: "000000000",
      location: "New Location",
      company: "New Company",
      status: "Pending"
    };
    setUsers([...users, newUser]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phonenumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Compute stats from users data
  const totalUsers = users.length;
  const inactiveUsers = users.filter(user => user.status === "Inactive").length;
  const activeUsers = users.filter(user => user.status === "Active").length;
  const travellers = users.filter(user => user.status === "Completed").length;

  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="main-content">
        <TopBar title="Users" />
        <div className="content-body">
          <div className="stats-card">
            <div className="grid-container">
              <div className="grid-item">
                <h4>
                  <i className="ri-group-fill"></i> Total Users
                </h4>
                <p>{totalUsers}</p>
              </div>
              <div className="grid-item">
                <h4>
                  <i className="ri-user-fill"></i> Inactive Users
                </h4>
                <p>{inactiveUsers}</p>
              </div>
              <div className="grid-item">
                <h4>
                  <i className="ri-heart-3-fill"></i> Active Users
                </h4>
                <p>{activeUsers}</p>
              </div>
              <div className="grid-item">
                <h4>
                  <i className="ri-money-dollar-circle-fill"></i> Travellers
                </h4>
                <p>{travellers}</p>
              </div>
            </div>
          </div>
          <div className="trip-table">
            <h3>Total Users</h3>
            <div className="table-header">
              <i className="ri-add-large-fill" onClick={handleAddRow}></i>
              <i className="ri-sort-alphabet-asc" onClick={() => handleSort('name')}></i>
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
                  <th onClick={() => handleSort('name')}>Name {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
                  <th onClick={() => handleSort('phonenumber')}>Phone Number {sortConfig.key === 'phonenumber' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
                  <th onClick={() => handleSort('location')}>Location {sortConfig.key === 'location' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
                  <th onClick={() => handleSort('company')}>Company {sortConfig.key === 'company' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
                  <th onClick={() => handleSort('status')}>Status {sortConfig.key === 'status' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
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
                          <td><input type="text" value={editFormData.name} onChange={(e) => handleEditChange(e, 'name')} /></td>
                          <td><input type="text" value={editFormData.phonenumber} onChange={(e) => handleEditChange(e, 'phonenumber')} /></td>
                          <td><input type="text" value={editFormData.location} onChange={(e) => handleEditChange(e, 'location')} /></td>
                          <td><input type="text" value={editFormData.company} onChange={(e) => handleEditChange(e, 'company')} /></td>
                          <td>
                            <select value={editFormData.status} onChange={(e) => handleEditChange(e, 'status')}>
                              <option value="Completed">Completed</option>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                          </td>
                          <td>
                            <div className="edit-form">
                              <button onClick={() => handleSaveEdit(user.id)}>Save</button>
                              <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{user.name}</td>
                          <td>{user.phonenumber}</td>
                          <td>{user.location}</td>
                          <td>{user.company}</td>
                          <td>{user.status}</td>
                          <td>
                            {selectedRows[user.id] && (
                              <div className="more-container">
                                <i
                                  className="ri-more-fill"
                                  onClick={() => handleMoreClick(user.id)}
                                ></i>
                                {menuOpen === user.id && (
                                  <div className="more-menu">
                                    <button onClick={() => handleEdit(user.id)}>Edit</button>
                                    <button onClick={() => handleDelete(user.id)}>Delete</button>
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
                    <td colSpan="7">No users found</td>
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

export default Users;