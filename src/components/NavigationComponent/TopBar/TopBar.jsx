"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./topbar.css";

const TopBar = ({ title, user = { name: "Traveler", role: "client" } }) => {
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Toggle dropdowns and sidebar
  const toggleDateDropdown = () => {
    setIsDateDropdownOpen(!isDateDropdownOpen);
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsDateDropdownOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    // Dispatch event to notify sidebar of collapse state
    window.dispatchEvent(new CustomEvent("sidebarToggle", { detail: { isCollapsed: !isSidebarCollapsed } }));
  };

  // Sample date ranges for professional filtering
  const dateRanges = [
    "This Week",
    "This Month",
    "Next Month",
    "Q1 2025",
    "Q2 2025",
    "Q3 2025",
    "Q4 2025",
    "Custom Range",
  ];

  // Sample notifications
  const notifications = [
    { id: 1, message: "New booking for Gorilla Trekking Tour", time: "2h ago" },
    { id: 2, message: "Payment received from Jane Doe", time: "4h ago" },
    { id: 3, message: "Tour schedule updated", time: "1d ago" },
  ];

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          <i className={`ri-${isSidebarCollapsed ? "menu-unfold" : "menu-fold"}-line`}></i>
        </button>
        <h4 className="topbar-title">{title || "Dashboard"}</h4>
      </div>
      <div className="topbar-actions">
        {/* Search Bar */}
        <div className="topbar-search">
          <i className="ri-search-line"></i>
          <input type="search" placeholder="Search tours, bookings, travelers..." />
        </div>

        {/* Date Filter Dropdown */}
        <div className="topbar-dropdown">
          <button className="dropdown-toggle" onClick={toggleDateDropdown}>
            <i className="ri-calendar-line"></i> Date Filter
            <i className={`ri-arrow-${isDateDropdownOpen ? "up" : "down"}-s-line`}></i>
          </button>
          {isDateDropdownOpen && (
            <div className="dropdown-content">
              {dateRanges.map((range) => (
                <Link
                  key={range}
                  href={`#${range.replace(" ", "-").toLowerCase()}`}
                  className="dropdown-item"
                >
                  {range}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="topbar-dropdown">
          <button className="topbar-icon-btn">
            <i className="ri-notification-4-line"></i>
            {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
          </button>
          <div className="dropdown-content notifications">
            {notifications.map((notification) => (
              <div key={notification.id} className="dropdown-item notification-item">
                <span>{notification.message}</span>
                <span className="notification-time">{notification.time}</span>
              </div>
            ))}
            <Link href="/notifications" className="dropdown-item view-all">
              View All Notifications
            </Link>
          </div>
        </div>

        {/* User Profile Dropdown */}
        <div className="topbar-dropdown">
          <button className="dropdown-toggle" onClick={toggleProfileDropdown}>
            <i className="ri-user-line"></i>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}: {user.name}
            <i className={`ri-arrow-${isProfileDropdownOpen ? "up" : "down"}-s-line`}></i>
          </button>
          {isProfileDropdownOpen && (
            <div className="dropdown-content">
              <Link href={`/${user.role}/profile`} className="dropdown-item">
                Profile
              </Link>
              <Link href={`/${user.role}/settings`} className="dropdown-item">
                Settings
              </Link>
              <Link href="/logout" className="dropdown-item logout">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;