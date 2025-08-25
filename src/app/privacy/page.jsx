'use client';

import React from 'react';
import {
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  Settings,
  AlertTriangle,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';
import './privacy.css';

export default function PrivacyPage() {
  const lastUpdated = "December 15, 2024";

  const sections = [
    {
      id: 'collection',
      title: 'Information We Collect',
      icon: Database,
      content: `We collect information you provide directly to us, such as when you create an account, make a booking, or contact us. This includes personal information like your name, email address, phone number, passport details, and payment information. We also collect information automatically when you use our website, including IP address, browser type, and usage patterns.`
    },
    {
      id: 'usage',
      title: 'How We Use Your Information',
      icon: Settings,
      content: `We use your information to provide and improve our services, process bookings, communicate with you, send marketing materials (with your consent), comply with legal obligations, and protect against fraud. We may also use aggregated, non-personal information for analytics and business purposes.`
    },
    {
      id: 'sharing',
      title: 'Information Sharing',
      icon: UserCheck,
      content: `We may share your information with service providers (hotels, tour operators, transport companies), payment processors, legal authorities when required by law, and business partners with your consent. We do not sell your personal information to third parties for marketing purposes.`
    },
    {
      id: 'security',
      title: 'Data Security',
      icon: Lock,
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments. However, no method of transmission over the internet is 100% secure.`
    },
    {
      id: 'retention',
      title: 'Data Retention',
      icon: Calendar,
      content: `We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Booking information is typically retained for 7 years for tax and legal purposes.`
    },
    {
      id: 'rights',
      title: 'Your Rights',
      icon: Eye,
      content: `You have the right to access, update, or delete your personal information. You can also object to processing, request data portability, and withdraw consent where applicable. To exercise these rights, please contact us using the information provided below.`
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      icon: Settings,
      content: `We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences. Some features may not function properly if cookies are disabled.`
    }
  ];

  return (
    <div className="privacy-page">
      <div className="privacy-container">
        {/* Header Section */}
        <div className="privacy-header">
          <div className="header-icon">
            <Shield size={48} />
          </div>
          <h1>Privacy Policy</h1>
          <p>Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p>
          <div className="last-updated">
            <Calendar size={16} />
            Last updated: {lastUpdated}
          </div>
        </div>

        {/* Introduction */}
        <div className="privacy-intro">
          <h2>Our Commitment to Your Privacy</h2>
          <p>
            At Echoes of Rwanda, we are committed to protecting your privacy and ensuring the security
            of your personal information. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our website and services.
          </p>
        </div>

        {/* Privacy Sections */}
        <div className="privacy-content">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div key={section.id} className="privacy-section">
                <div className="section-header">
                  <div className="section-number">{index + 1}</div>
                  <div className="section-icon">
                    <IconComponent size={24} />
                  </div>
                  <h3>{section.title}</h3>
                </div>
                <div className="section-content">
                  <p>{section.content}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="additional-info">
          <h2>Additional Information</h2>

          <div className="info-grid">
            <div className="info-item">
              <h4>Children's Privacy</h4>
              <p>
                Our services are not directed to children under 13. We do not knowingly collect
                personal information from children under 13. If you become aware that a child
                has provided us with personal information, please contact us.
              </p>
            </div>

            <div className="info-item">
              <h4>International Transfers</h4>
              <p>
                Your information may be transferred to and processed in countries other than your
                country of residence. We ensure appropriate safeguards are in place to protect
                your information during such transfers.
              </p>
            </div>

            <div className="info-item">
              <h4>Third-Party Links</h4>
              <p>
                Our website may contain links to third-party websites. We are not responsible
                for the privacy practices of these external sites. We encourage you to review
                their privacy policies.
              </p>
            </div>

            <div className="info-item">
              <h4>Marketing Communications</h4>
              <p>
                With your consent, we may send you marketing communications about our services.
                You can opt out at any time by clicking the unsubscribe link in our emails or
                contacting us directly.
              </p>
            </div>

            <div className="info-item">
              <h4>Data Breach Notification</h4>
              <p>
                In the event of a data breach that may affect your personal information, we will
                notify you and relevant authorities as required by applicable law, typically
                within 72 hours of discovery.
              </p>
            </div>

            <div className="info-item">
              <h4>Policy Updates</h4>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any
                material changes by posting the new policy on our website and updating the
                "last updated" date.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="privacy-contact">
          <h2>Contact Us About Privacy</h2>
          <p>
            If you have any questions about this Privacy Policy or our privacy practices,
            please contact us:
          </p>
          <div className="contact-methods">
            <div className="contact-method">
              <Mail size={20} />
              <div>
                <strong>Email:</strong>
                <span>echoesofrwanda@gmail.com</span>
              </div>
            </div>
            <div className="contact-method">
              <Phone size={20} />
              <div>
                <strong>Phone:</strong>
                <span>+250784800280</span>
              </div>
            </div>
            <div className="contact-method">
              <Shield size={20} />
              <div>
                <strong>Data Protection Officer:</strong>
                <span>privacy@echoesofrwanda.com</span>
              </div>
            </div>
          </div>
          <a href="/contact" className="contact-btn">
            Contact Us
          </a>
        </div>

        {/* Consent Notice */}
        <div className="consent-notice">
          <div className="notice-icon">
            <AlertTriangle size={24} />
          </div>
          <div className="notice-content">
            <h3>Your Consent</h3>
            <p>
              By using our website and services, you consent to the collection and use of
              your information as described in this Privacy Policy. If you do not agree
              with this policy, please do not use our services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
