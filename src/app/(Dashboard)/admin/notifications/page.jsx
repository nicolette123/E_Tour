"use client";

import React, { useState } from "react";
import "./notifications.css";

const mockData = [
  {
    id: 1,
    name: "Natalia Uwase",
    message: "New order CM210 placed for a Kigali city tour",
  },
  {
    id: 2,
    name: "John Mugabo",
    message: "Order CM211 for Musanze safari is pending approval",
  },
  {
    id: 3,
    name: "Emma Ingabire",
    message: "Order CM212 for Nyungwe trek was rejected",
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockData);
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
    const notification = notifications.find((n) => n.id === id);
    setEditRowId(id);
    setEditFormData({
      name: notification.name,
      message: notification.message,
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
    setNotifications(notifications.map((n) =>
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
    setNotifications(notifications.filter((n) => n.id !== id));
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

    const sortedNotifications = [...notifications].sort((a, b) => {
      const aValue = a[key] ? a[key].toString().toLowerCase() : "";
      const bValue = b[key] ? b[key].toString().toLowerCase() : "";
      if (aValue < bValue) return direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setNotifications(sortedNotifications);
  };

  const handleAddRow = () => {
    const newNotification = {
      id: Math.max(...notifications.map((n) => n.id), 0) + 1,
      name: "New User",
      message: "New notification",
    };
    setNotifications([...notifications, newNotification]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNotifications = notifications.filter(
    (n) =>
      n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalNotifications = notifications.length;

  return (
    <div className="notifications-dashboard">
      <h1 className="dashboard-title">Notifications</h1>

      {/* Stats Card */}
      <div className="stats-grid">
        <div className="stat-card">
          <i className="ri-notification-3-line"></i>
          <h3>Total Notifications</h3>
          <p>{totalNotifications}</p>
        </div>
      </div>

      {/* Notifications List */}
      <div className="notifications-container">
        <div className="notifications-header">
          <h2>All Notifications</h2>
          <div className="notifications-actions">
            <button className="add-btn" onClick={handleAddRow}>
              <i className="ri-add-line"></i> Add Notification
            </button>
            <div className="search-bar">
              <i className="ri-search-line"></i>
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="notification-list">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((n) => (
              <div key={n.id} className="notification-card">
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
                        onChange={(e) => handleEditChange(e, "name")}
                        className="edit-input"
                      />
                    ) : (
                      n.name
                    )}
                  </h5>
                  {selectedRows[n.id] && (
                    <div className="more-container">
                      <i
                        className="ri-more-2-fill"
                        onClick={() => handleMoreClick(n.id)}
                      ></i>
                      {menuOpen === n.id && (
                        <div className="more-menu">
                          <button onClick={() => handleEdit(n.id)}>
                            <i className="ri-edit-line"></i> Edit
                          </button>
                          <button onClick={() => handleDelete(n.id)}>
                            <i className="ri-delete-bin-line"></i> Delete
                          </button>
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
                      onChange={(e) => handleEditChange(e, "message")}
                      className="edit-input"
                      placeholder="Message"
                    />
                    <div className="edit-actions">
                      <button className="action-btn save" onClick={() => handleSaveEdit(n.id)}>
                        <i className="ri-save-line"></i> Save
                      </button>
                      <button className="action-btn cancel" onClick={handleCancelEdit}>
                        <i className="ri-close-line"></i> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>{n.message}</p>
                )}
              </div>
            ))
          ) : (
            <div className="no-data">No notifications found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;