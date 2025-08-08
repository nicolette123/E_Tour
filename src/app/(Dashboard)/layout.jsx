"use client";

import { useState, useEffect } from "react";

import SideBar from "../../components/NavigationComponent/SideBar/SideBar";
import TopBar from "../../components/NavigationComponent/TopBar/TopBar";
import "./layout.css";





export default function DashboardLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Listen for sidebar toggle events
 
  

  return (
    
      <body className="dashboard-body">
        <div className={`dashboard-container ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
          <SideBar />
          <div className="main-content">
            <TopBar
              title="Dashboard"
              user={{ name: "Jane Doe", role: "admin" }}
            />
            <div className="content-body">

              <section className="dashboard-children" aria-label="Additional Content">
                {children}
              </section>
            </div>
          </div>
        </div>
      </body>
  );
}