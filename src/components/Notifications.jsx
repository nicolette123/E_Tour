'use client';
import React, { useState } from 'react';
import SideBar from './SideBar';
import TopBar from './TopBar';
import "@/styles/dashboard.css";
import "@/styles/table.css";

const mockData = [
  {
    id: 1,
    name: "Natalia",
    message: "New order CM210 placed for Kigali"
  },
  {
    id: 2,
    name: "John",
    message: "Order CM211 is pending approval"
  },
  {
    id: 3,
    name: "Emma",
    message: "Order CM212 was rejected"
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockData);
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
    const notification = notifications.find(n => n.id === id);
    setEditRowId(id);
    setEditFormData({
      name: notification.name,
      message: notification.message
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
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, ...editFormData } : n
    ));
    setEditRowId(null);
    setEditFormData({});
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditFormData({});
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
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

    const sortedNotifications = [...notifications].sort((a, b) => {
      const aValue = a[key] ? a[key].toString().toLowerCase() : '';
      const bValue = b[key] ? b[key].toString().toLowerCase() : '';
      if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setNotifications(sortedNotifications);
  };

  const handleAddRow = () => {
    const newNotification = {
      id: notifications.length + 1,
      name: "New User",
      message: "New notification"
    };
    setNotifications([...notifications, newNotification]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Compute stats
  const totalNotifications = notifications.length;

  const filteredNotifications = notifications.filter(n =>
    n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="main-content">
        <TopBar title="Notifications" />
        <div className="content-body">
          <div className="trip-table">
            <h3>Notifications</h3>
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
            <div className="notification-list">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map(n => (
                  <div key={n.id} className="notification-row" style={{ borderBottom: '1px solid #E0E0E0' }}>
                    <div className="notification-header">
                      <input
                        type="checkbox"
                        checked={!!selectedRows[n.id]}
                        onChange={() => handleCheckboxChange(n.id)}
                      />
                      <h5>
                        {editRowId === n.id ? (
                          <input
                            type="text"
                            value={editFormData.name}
                            onChange={(e) => handleEditChange(e, 'name')}
                          />
                        ) : (
                          n.name
                        )}
                      </h5>
                      {selectedRows[n.id] && (
                        <div className="more-container">
                          <i
                            className="ri-more-fill"
                            onClick={() => handleMoreClick(n.id)}
                          ></i>
                          {menuOpen === n.id && (
                            <div className="more-menu">
                              <button onClick={() => handleEdit(n.id)}>Edit</button>
                              <button onClick={() => handleDelete(n.id)}>Delete</button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {editRowId === n.id ? (
                      <div className="notification-edit">
                        <input
                          type="text"
                          value={editFormData.message}
                          onChange={(e) => handleEditChange(e, 'message')}
                          placeholder="Message"
                        />
                        <div className="edit-form">
                          <button onClick={() => handleSaveEdit(n.id)}>Save</button>
                          <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <p>{n.message}</p>
                    )}
                  </div>
                ))
              ) : (
                <p>No notifications found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
