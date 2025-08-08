"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../styles/sidebar.css";

const SideBar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: "ri-dashboard-line" },
    { href: "admin/view-trips", label: "View Trips", icon: "ri-stacked-view" },
    { href: "admin/dash-payment", label: "Payment", icon: "ri-bank-card-line" },
    { href: "admin/users", label: "Users", icon: "ri-user-line" },
  ];

  const links2 = [
    { href: "admin/notifications", label: "Notifications", icon: "ri-notification-4-line" },
    { href: "admin/settings", label: "Settings", icon: "ri-settings-5-line" },
  ];

  return (
    <div className="sidebar">
      <ul>
        <img src="/images/logos/the logo.png" alt="Logo" className="logo" />
        <div className="sidebar-links">
          {links.map(({ href, label, icon }) => (
            <Link key={href} href={href}>
              <li className={pathname === href ? "nav-active" : ""}>
                <i className={icon}></i> {label}
              </li>
            </Link>
          ))}
        </div>
        <div className="sidebar-links2">
          {links2.map(({ href, label, icon }) => (
            <Link key={href} href={href}>
              <li className={pathname === href ? "nav-active" : ""}>
                <i className={icon}></i> {label}
              </li>
            </Link>
          ))}
        </div>
        <h4 className="welcome">Welcome back 👋</h4>
      </ul>
    </div>
  );
};

export default SideBar;