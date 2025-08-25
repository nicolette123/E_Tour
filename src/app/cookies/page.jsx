'use client';

import React from 'react';
import { 
  Cookie, 
  Settings, 
  Shield, 
  Eye,
  BarChart3,
  Globe,
  AlertTriangle,
  Calendar,
  CheckCircle,
  X
} from 'lucide-react';
import './cookies.css';

export default function CookiesPage() {
  const lastUpdated = "December 15, 2024";

  const cookieTypes = [
    {
      id: 'essential',
      title: 'Essential Cookies',
      icon: Shield,
      description: 'These cookies are necessary for the website to function and cannot be switched off in our systems.',
      examples: ['Session management', 'Security tokens', 'Load balancing'],
      duration: 'Session or up to 1 year',
      canDisable: false
    },
    {
      id: 'analytics',
      title: 'Analytics Cookies',
      icon: BarChart3,
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information.',
      examples: ['Google Analytics', 'Page views', 'User behavior tracking'],
      duration: 'Up to 2 years',
      canDisable: true
    },
    {
      id: 'functional',
      title: 'Functional Cookies',
      icon: Settings,
      description: 'These cookies enable the website to provide enhanced functionality and personalization.',
      examples: ['Language preferences', 'Region selection', 'User preferences'],
      duration: 'Up to 1 year',
      canDisable: true
    },
    {
      id: 'marketing',
      title: 'Marketing Cookies',
      icon: Globe,
      description: 'These cookies are used to track visitors across websites to display relevant advertisements.',
      examples: ['Social media tracking', 'Ad targeting', 'Conversion tracking'],
      duration: 'Up to 2 years',
      canDisable: true
    }
  ];

  return (
    <div className="cookies-page">
      <div className="cookies-container">
        {/* Header Section */}
        <div className="cookies-header">
          <div className="header-icon">
            <Cookie size={48} />
          </div>
          <h1>Cookie Policy</h1>
          <p>Learn about how we use cookies and similar technologies on our website</p>
          <div className="last-updated">
            <Calendar size={16} />
            Last updated: {lastUpdated}
          </div>
        </div>

        {/* Introduction */}
        <div className="cookies-intro">
          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
            They are widely used to make websites work more efficiently and provide information to website owners.
          </p>
          <p>
            At Echoes of Rwanda, we use cookies to enhance your browsing experience, analyze website traffic, 
            and provide personalized content and advertisements.
          </p>
        </div>

        {/* Cookie Types */}
        <div className="cookie-types">
          <h2>Types of Cookies We Use</h2>
          <div className="types-grid">
            {cookieTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <div key={type.id} className="cookie-type-card">
                  <div className="type-header">
                    <div className="type-icon">
                      <IconComponent size={24} />
                    </div>
                    <h3>{type.title}</h3>
                    <div className={`toggle-status ${type.canDisable ? 'optional' : 'required'}`}>
                      {type.canDisable ? (
                        <span className="optional">Optional</span>
                      ) : (
                        <span className="required">Required</span>
                      )}
                    </div>
                  </div>
                  <p className="type-description">{type.description}</p>
                  <div className="type-details">
                    <div className="detail-item">
                      <strong>Examples:</strong>
                      <ul>
                        {type.examples.map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="detail-item">
                      <strong>Duration:</strong> {type.duration}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How We Use Cookies */}
        <div className="cookie-usage">
          <h2>How We Use Cookies</h2>
          <div className="usage-grid">
            <div className="usage-item">
              <Eye size={24} />
              <h3>Website Functionality</h3>
              <p>To remember your preferences and settings, such as language selection and login status.</p>
            </div>
            <div className="usage-item">
              <BarChart3 size={24} />
              <h3>Analytics & Performance</h3>
              <p>To understand how you use our website and improve our services based on user behavior.</p>
            </div>
            <div className="usage-item">
              <Shield size={24} />
              <h3>Security</h3>
              <p>To protect against fraud and ensure the security of our website and your data.</p>
            </div>
            <div className="usage-item">
              <Globe size={24} />
              <h3>Marketing</h3>
              <p>To show you relevant advertisements and measure the effectiveness of our marketing campaigns.</p>
            </div>
          </div>
        </div>

        {/* Third-Party Cookies */}
        <div className="third-party-cookies">
          <h2>Third-Party Cookies</h2>
          <p>
            We may also use third-party cookies from trusted partners to enhance your experience:
          </p>
          <div className="third-party-list">
            <div className="third-party-item">
              <h4>Google Analytics</h4>
              <p>Helps us understand website usage and improve user experience.</p>
            </div>
            <div className="third-party-item">
              <h4>Social Media Platforms</h4>
              <p>Enables social sharing features and social media integration.</p>
            </div>
            <div className="third-party-item">
              <h4>Payment Processors</h4>
              <p>Facilitates secure payment processing for bookings and services.</p>
            </div>
          </div>
        </div>

        {/* Managing Cookies */}
        <div className="cookie-management">
          <h2>Managing Your Cookie Preferences</h2>
          <div className="management-content">
            <div className="management-text">
              <h3>Browser Settings</h3>
              <p>
                You can control and manage cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul>
                <li>View cookies stored on your device</li>
                <li>Delete existing cookies</li>
                <li>Block cookies from specific websites</li>
                <li>Block all cookies</li>
                <li>Delete cookies when you close your browser</li>
              </ul>
              
              <h3>Cookie Consent</h3>
              <p>
                When you first visit our website, you'll see a cookie consent banner. You can choose which 
                types of cookies to accept or reject. You can change your preferences at any time by 
                clicking the cookie settings link in our footer.
              </p>
            </div>
            <div className="management-warning">
              <AlertTriangle size={24} />
              <h4>Important Note</h4>
              <p>
                Disabling certain cookies may affect the functionality of our website and limit your 
                ability to use some features. Essential cookies cannot be disabled as they are necessary 
                for the website to function properly.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="cookies-contact">
          <h2>Questions About Cookies?</h2>
          <p>
            If you have any questions about our use of cookies, please contact us:
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <strong>Email:</strong> echoesofrwanda@gmail.com
            </div>
            <div className="contact-item">
              <strong>Phone:</strong> +250784800280
            </div>
            <div className="contact-item">
              <strong>Address:</strong> Kigali, Rwanda
            </div>
          </div>
          <a href="/contact" className="contact-btn">
            Contact Us
          </a>
        </div>

        {/* Policy Updates */}
        <div className="policy-updates">
          <div className="update-icon">
            <AlertTriangle size={24} />
          </div>
          <div className="update-content">
            <h3>Policy Updates</h3>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices 
              or for other operational, legal, or regulatory reasons. Please check this page periodically 
              for updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
