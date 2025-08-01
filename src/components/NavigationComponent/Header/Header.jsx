'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Header.scss';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveRoute = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo">
          <div className="logo-icon">E</div>
          <Link href="/" className="logo-text">
            Echoes of Rwanda
          </Link>
        </div>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <Link 
              href="/" 
              className={isActiveRoute('/') ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/tour-packages" 
              className={isActiveRoute('/tour-packages') ? 'active' : ''}
            >
              Tour Packages
            </Link>
          </li>
          <li>
            <Link 
              href="/gallery" 
              className={isActiveRoute('/gallery') ? 'active' : ''}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className={isActiveRoute('/about') ? 'active' : ''}
            >
              About us
            </Link>
          </li>
        </ul>

        <div className="nav-buttons">
          <Link href="/request-trip" className="btn btn-outline">
            Request Trip
          </Link>
          <Link href="/login" className="btn btn-primary">
            Get started
          </Link>
        </div>

        <div 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}