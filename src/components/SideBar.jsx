"use client"; // add this line at the very top

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // ✅ Correct import for App Router
import "@/styles/sidebar.scss";

const SideBar = () => {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Dashboard", icon: "ri-dashboard-line" },
        { href: "/view-trips", label: "View Trips", icon: "ri-stacked-view" },
        { href: "/payment", label: "Payment", icon: "ri-bank-card-line" },
        { href: "/users", label: "Users", icon: "ri-user-line" },
        
    ];

    const links2 = [
        { href: "/notifications", label: "Notifications", icon: "ri-notification-4-line" },
        { href: "/settings", label: "Settings", icon: "ri-settings-5-line" },
    ];

    return (
        <div className="sidebar">
            <ul>
                <img src="/images/logos/the logo.png" alt="Logo" className='logo' />
                <div className='sidebar-links'>
                    {links.map(({ href, label, icon }) => (
                        <Link key={href} href={href}>
                            <li className={pathname === href ? "nav-active" : ""}>
                                <i className={icon}></i>{label}
                            </li>
                        </Link>
                    ))}
                </div>
                <div className='sidebar-links2'>
                    {links2.map(({ href, label, icon }) => (
                        <Link key={href} href={href}>
                            <li className={pathname === href ? "nav-active" : ""}>
                                <i className={icon}></i>{label}
                            </li>
                        </Link>
                    ))}
                </div>
                <h4 className='welcome'>Welcome back 👋 </h4>
            </ul>
        </div>
    );
};

export default SideBar;
