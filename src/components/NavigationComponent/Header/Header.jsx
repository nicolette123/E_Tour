// Header.js
'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Header.css';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/TourPackage', label: 'TOUR PACKAGE' },
  { href: '/Gallery', label: 'GALLERY' },
  { href: '/about-us', label: 'ABOUT US' },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="logo">
        <Link href="/">
          <img src="/images/logos/the logo.png" alt="Echoes Logo" />
        </Link>
      </div>
      <nav className="nav">
        <ul>
          {navLinks.map((link) => (
            <li
              key={link.href}
              className={pathname === link.href ? 'active' : ''}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="auth-buttons">
        <button className="login">Request trip</button>
        <Link href="/login">
          <button className="get-started">Get started</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;