// Header.jsx - Modern Tourism Header Component
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, Camera, Info, Plane, Rocket, Menu, X } from 'lucide-react';
import './Header.css';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/tour-packages', label: 'Tour Packages', icon: Package },
  { href: '/gallery', label: 'Gallery', icon: Camera },
  { href: '/about', label: 'About Us', icon: Info },
];

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo">
          <Link href="/" className="logo-link">
            <img
              src="/images/logos/the logo.png"
              alt="Echoes of Rwanda"
              className="logo-image"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.href} className="nav-item">
                <Link
                  href={link.href}
                  className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                >
                  <link.icon className="nav-icon" size={18} aria-hidden="true" />
                  <span className="nav-label">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="header-actions">
          <Link href="/request-trip" className="btn btn-secondary request-btn">
            <Plane className="btn-icon" size={18} />
            <span className="btn-text">Request Trip</span>
          </Link>
          <Link href="/login" className="btn btn-primary get-started-btn">
            <Rocket className="btn-icon" size={18} />
            <span className="btn-text">Get Started</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="menu-icon" size={24} />
            ) : (
              <Menu className="menu-icon" size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.href} className="mobile-nav-item">
                <Link
                  href={link.href}
                  className={`mobile-nav-link ${pathname === link.href ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon className="mobile-nav-icon" size={20} />
                  <span className="mobile-nav-label">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mobile-nav-actions">
            <Link
              href="/request-trip"
              className="btn btn-secondary mobile-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              <Plane className="btn-icon" size={18} />
              <span className="btn-text">Request Trip</span>
            </Link>
            <Link
              href="/login"
              className="btn btn-primary mobile-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              <Rocket className="btn-icon" size={18} />
              <span className="btn-text">Get Started</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;