"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useApi";
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Calendar,
  Filter
} from "lucide-react";
import "./topbar.css";

const TopBar = ({ title, user = { name: "Traveler", role: "client" } }) => {
  const router = useRouter();
  const { logout, user: authUser, isAuthenticated, loading } = useAuth();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle functions
  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsNotificationOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    window.dispatchEvent(new CustomEvent("sidebarToggle", { detail: { isCollapsed: !isSidebarCollapsed } }));
  };

  // Handle logout functionality
  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setIsProfileDropdownOpen(false);

    try {
      // Call the logout API
      const result = await logout();

      // Clear local storage regardless of API response
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        // Clear any other auth-related items
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('tokenExpiry');
      }

      // Always redirect to login page
      router.push('/login');

    } catch (error) {
      console.error('Logout error:', error);

      // Even if logout API fails, clear local storage and redirect
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('tokenExpiry');
      }

      router.push('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  // Get user display info - prioritize authUser from useAuth hook
  const displayUser = authUser || user;

  // Get user name with better fallback handling
  let userName = "User";
  if (displayUser?.firstName && displayUser?.lastName) {
    userName = `${displayUser.firstName} ${displayUser.lastName}`;
  } else if (displayUser?.name) {
    userName = displayUser.name;
  } else if (displayUser?.email) {
    // Use email prefix as fallback
    userName = displayUser.email.split('@')[0];
  }

  // Get user role
  const userRole = displayUser?.role || "client";

  // Generate initials
  const userInitials = userName.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || "U";

  // Sample notifications
  const notifications = [
    { id: 1, message: "New booking for Gorilla Trekking Tour", time: "2h ago", type: "booking" },
    { id: 2, message: "Payment received from Jane Doe", time: "4h ago", type: "payment" },
    { id: 3, message: "Tour schedule updated", time: "1d ago", type: "update" },
  ];

  // Don't render if still loading or not authenticated
  if (loading) {
    return (
      <header className="modern-topbar">
        <div className="topbar-container">
          <div className="loading-topbar">Loading...</div>
        </div>
      </header>
    );
  }

  // If not authenticated, don't render the full topbar
  if (!isAuthenticated && !authUser) {
    return null;
  }

  return (
    <header className="modern-topbar">
      <div className="topbar-container">
        {/* Left Section */}
        <div className="topbar-left">
          <button
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          <div className="page-info">
            <h1 className="page-title">{title || "Dashboard"}</h1>
            <span className="page-subtitle">Welcome back, {userName.split(' ')[0]}</span>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="topbar-center">
          <form onSubmit={handleSearch} className="search-container">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search tours, bookings, travelers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="search-clear"
              >
                <X size={16} />
              </button>
            )}
          </form>
        </div>

        {/* Right Section */}
        <div className="topbar-right">
          {/* Quick Actions */}
          <div className="quick-actions">
            <button className="action-btn" title="Filter">
              <Filter size={18} />
            </button>
            <button className="action-btn" title="Calendar">
              <Calendar size={18} />
            </button>
          </div>

          {/* Notifications */}
          <div className="notification-container" ref={notificationRef}>
            <button
              className="notification-btn"
              onClick={toggleNotifications}
              aria-label="Notifications"
            >
              <Bell size={18} />
              {notifications.length > 0 && (
                <span className="notification-badge">{notifications.length}</span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="notification-dropdown">
                <div className="dropdown-header">
                  <h3>Notifications</h3>
                  <span className="notification-count">{notifications.length} new</span>
                </div>
                <div className="notification-list">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="notification-item">
                      <div className="notification-content">
                        <p className="notification-message">{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                      <div className={`notification-indicator ${notification.type}`}></div>
                    </div>
                  ))}
                </div>
                <div className="dropdown-footer">
                  <Link href="/notifications" className="view-all-link">
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="profile-container" ref={profileRef}>
            <button
              className="profile-btn"
              onClick={toggleProfileDropdown}
              aria-label="User menu"
            >
              <div className="user-avatar">
                {userInitials}
              </div>
              <div className="user-info">
                <span className="user-name">{userName}</span>
                <span className="user-role">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
              </div>
              <ChevronDown size={16} className={`chevron ${isProfileDropdownOpen ? 'open' : ''}`} />
            </button>

            {isProfileDropdownOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <div className="user-avatar large">
                    {userInitials}
                  </div>
                  <div className="user-details">
                    <h4>{userName}</h4>
                    <p>{displayUser?.email || 'user@example.com'}</p>
                  </div>
                </div>

                <div className="dropdown-menu">
                  <Link href={`/${userRole}/profile`} className="menu-item">
                    <User size={16} />
                    <span>My Profile</span>
                  </Link>
                  <Link href={`/${userRole}/settings`} className="menu-item">
                    <Settings size={16} />
                    <span>Settings</span>
                  </Link>
                  <div className="menu-divider"></div>
                  <button
                    onClick={handleLogout}
                    className="menu-item logout-btn"
                    disabled={isLoggingOut}
                  >
                    <LogOut size={16} />
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                    {isLoggingOut && <div className="loading-spinner"></div>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;