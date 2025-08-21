"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useApi";
import "./sidebar.css";

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Listen for sidebar toggle events
  useEffect(() => {
    const handleSidebarToggle = (event) => {
      setIsCollapsed(event.detail.isCollapsed);
    };
    window.addEventListener("sidebarToggle", handleSidebarToggle);
    return () => window.removeEventListener("sidebarToggle", handleSidebarToggle);
  }, []);

  // Determine user role based on pathname
  const getUserRole = () => {
    if (pathname.includes("/admin")) return "admin";
    if (pathname.includes("/agent")) return "agent";
    if (pathname.includes("/client")) return "client";
    return "admin";
  };

  const userRole = getUserRole();

  // Handle logout functionality
  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      // Call the logout API
      const result = await logout();

      // Clear local storage regardless of API response
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
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

  // Role-based links tailored for Echoes of Rwanda
  const links = {
    admin: [
      { href: "/admin", label: "Dashboard", icon: "ri-dashboard-line" },
      { href: "/admin/analytics", label: "Analytics", icon: "ri-bar-chart-line" },
      { href: "/admin/bookings", label: "Bookings", icon: "ri-calendar-check-line" },
      { href: "/admin/custom-trips", label: "Custom Trips", icon: "ri-route-line" },
      { href: "/admin/view-trips", label: "All Tours", icon: "ri-map-pin-line" },
      { href: "/admin/users", label: "Users", icon: "ri-user-line" },
      { href: "/admin/reviews", label: "Reviews", icon: "ri-star-line" },
      { href: "/admin/contact-messages", label: "Messages", icon: "ri-message-3-line" },
      { href: "/admin/dash-payment", label: "Payments", icon: "ri-bank-line" },
    ],
    agent: [
      { href: "/agent", label: "Agent Dashboard", icon: "ri-dashboard-line" },
      { href: "/agent/manage-tours", label: "Manage Tours", icon: "ri-trekking-line" },
      { href: "/agent/manage-booking", label: "Bookings", icon: "ri-ticket-line" },
      { href: "/agent/manage-client", label: "Travelers", icon: "ri-group-line" },
    ],
    client: [
      { href: "/client", label: "My Dashboard", icon: "ri-dashboard-line" },
      { href: "/client/book-tour", label: "Book a Tour", icon: "ri-compass-line" },
      { href: "/client/my-tours", label: "My Adventures", icon: "ri-suitcase-line" },
      { href: "/client/profile", label: "Profile", icon: "ri-user-line" },
    ],
  };

  const secondaryLinks = {
    admin: [
      { href: "/admin/profile", label: "Profile", icon: "ri-user-settings-line" },
      { href: "/admin/notifications", label: "Notifications", icon: "ri-notification-4-line" },
      { href: "/admin/settings", label: "Settings", icon: "ri-settings-5-line" },
    ],
    agent: [
      { href: "/agent/notifications", label: "Notifications", icon: "ri-notification-4-line" },
      { href: "/agent/settings", label: "Settings", icon: "ri-settings-5-line" },
    ],
    client: [
      { href: "/client/notifications", label: "Notifications", icon: "ri-notification-4-line" },
      { href: "/client/settings", label: "Settings", icon: "ri-settings-5-line" },
    ],
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <img src="/images/logos/logo.png" alt="Echoes of Rwanda Logo" className="logo" />
        <h3 className="app-name">Echoes of Rwanda</h3>
      </div>
      <ul className="sidebar-menu">
        <div className="sidebar-links">
          {links[userRole].map(({ href, label, icon }) => (
            <Link key={href} href={href} className="sidebar-link">
              <li className={`sidebar-item ${pathname === href ? "nav-active" : ""}`}>
                <i className={icon}></i>
                <span>{label}</span>
              </li>
            </Link>
          ))}
        </div>
        <div className="sidebar-links2">
          {secondaryLinks[userRole].map(({ href, label, icon }) => (
            <Link key={href} href={href} className="sidebar-link">
              <li className={`sidebar-item ${pathname === href ? "nav-active" : ""}`}>
                <i className={icon}></i>
                <span>{label}</span>
              </li>
            </Link>
          ))}
        </div>
      </ul>
      <div className="sidebar-footer">
        <h4 className="welcome">Murakaza neza 👋</h4>
        <button
          className="logout-btn"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <i className={isLoggingOut ? "ri-loader-4-line animate-spin" : "ri-logout-box-line"}></i>
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default SideBar;