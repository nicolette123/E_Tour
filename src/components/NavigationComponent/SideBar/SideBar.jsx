"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./sidebar.css";

const SideBar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  // Role-based links tailored for Echoes of Rwanda
  const links = {
    admin: [
      { href: "/admin", label: "Dashboard", icon: "ri-dashboard-line" },
      { href: "/admin/view-trips", label: "All Tours", icon: "ri-map-pin-line" },
      { href: "/admin/dash-payment", label: "Payments", icon: "ri-bank-line" },
      { href: "/admin/users", label: "Users", icon: "ri-user-line" },
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
        <button className="logout-btn">
          <i className="ri-logout-box-line"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;