"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useApi";
import SideBar from "../../components/NavigationComponent/SideBar/SideBar";
import TopBar from "../../components/NavigationComponent/TopBar/TopBar";
import "./layout.css";

export default function DashboardLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { user, loading, isAuthenticated } = useAuth();

  // Listen for sidebar toggle events
  useEffect(() => {
    const handleSidebarToggle = (event) => {
      setIsSidebarCollapsed(event.detail.isCollapsed);
    };

    window.addEventListener("sidebarToggle", handleSidebarToggle);
    return () => window.removeEventListener("sidebarToggle", handleSidebarToggle);
  }, []);

  // Handle responsive sidebar collapse
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarCollapsed(true);
      } else if (window.innerWidth >= 1024) {
        setIsSidebarCollapsed(false);
      }
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-body">
      <div className={`dashboard-container ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <SideBar />
        <div className="main-content">
          <TopBar
            title="Dashboard"
            user={user}
          />
          <main className="content-body">
            <div className="content-wrapper">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
