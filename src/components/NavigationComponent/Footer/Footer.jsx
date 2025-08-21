// Modern Footer Component
import React from 'react';
import Link from 'next/link';
import {
  Rocket,
  Phone,
  Mail,
  MapPin,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ExternalLink
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { href: '/', label: 'Home' },
      { href: '/tour-packages', label: 'Tour Packages' },
      { href: '/gallery', label: 'Gallery' },
      { href: '/about', label: 'About Us' },
    ],
    services: [
      { href: '/request-trip', label: 'Custom Trips' },
      { href: '/tour-packages', label: 'Group Tours' },
      { href: '/gallery', label: 'Photography Tours' },
      { href: '/about', label: 'Cultural Experiences' },
    ],
    support: [
      { href: '/contact', label: 'Contact Us' },
      { href: '/faq', label: 'FAQ' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/privacy', label: 'Privacy Policy' },
    ],
  };

  const socialLinks = [
    { href: 'https://facebook.com/echoesofrwanda', icon: Facebook, label: 'Facebook' },
    { href: 'https://instagram.com/echoesofrwanda', icon: Instagram, label: 'Instagram' },
    { href: 'https://twitter.com/echoesofrwanda', icon: Twitter, label: 'Twitter' },
    { href: 'https://youtube.com/echoesofrwanda', icon: Youtube, label: 'YouTube' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section brand-section">
          <div className="footer-brand">
            <img
              src="/images/logos/the logo.png"
              alt="Echoes of Rwanda"
              className="footer-logo"
            />
            <div className="brand-text">
              <h3 className="brand-title">Echoes of Rwanda</h3>
              <p className="brand-subtitle">Discover. Explore. Experience.</p>
            </div>
          </div>

          <p className="footer-description">
            Explore vibrant cities, cultural gems, and nature escapes.
            Your gateway to authentic Rwandan experiences and unforgettable adventures.
          </p>

          <div className="footer-cta">
            <Link href="/login" className="btn btn-primary footer-button">
              <Rocket className="btn-icon" size={18} />
              <span className="btn-text">Get Started</span>
            </Link>
          </div>

          {/* Social Links */}
          <div className="social-links">
            <h4 className="social-title">Follow Us</h4>
            <div className="social-icons">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <IconComponent className="social-icon" size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Links Sections */}
        <div className="footer-section links-section">
          <div className="footer-column">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              {footerLinks.explore.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact-section">
          <h4 className="footer-heading">Get in Touch</h4>

          <div className="contact-info">
            <div className="contact-item">
              <Phone className="contact-icon" size={20} />
              <div className="contact-details">
                <span className="contact-label">Phone</span>
                <a href="tel:+250345896" className="contact-value">+250 345 896</a>
              </div>
            </div>

            <div className="contact-item">
              <Mail className="contact-icon" size={20} />
              <div className="contact-details">
                <span className="contact-label">Email</span>
                <a href="mailto:echoesofrwanda@gmail.com" className="contact-value">
                  echoesofrwanda@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-item">
              <MapPin className="contact-icon" size={20} />
              <div className="contact-details">
                <span className="contact-label">Location</span>
                <span className="contact-value">Kigali, Rwanda</span>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="newsletter">
            <h5 className="newsletter-title">Stay Updated</h5>
            <p className="newsletter-description">
              Get the latest travel tips and exclusive offers
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                required
              />
              <button type="submit" className="btn btn-accent newsletter-button">
                <Send className="btn-icon" size={16} />
                <span className="btn-text">Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} Echoes of Rwanda. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link href="/privacy" className="footer-bottom-link">Privacy Policy</Link>
              <Link href="/terms" className="footer-bottom-link">Terms of Service</Link>
              <Link href="/cookies" className="footer-bottom-link">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;