'use client';

import React from 'react';
import {
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  Calendar,
  CreditCard,
  Users,
  MapPin
} from 'lucide-react';
import './terms.css';

export default function TermsPage() {
  const lastUpdated = "December 15, 2024";

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: `By accessing and using the Echoes of Rwanda website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      id: 'services',
      title: 'Services Description',
      icon: MapPin,
      content: `Echoes of Rwanda provides tourism services including but not limited to tour packages, accommodation bookings, transportation arrangements, and travel consultation services within Rwanda. We act as an intermediary between travelers and service providers.`
    },
    {
      id: 'booking',
      title: 'Booking and Reservations',
      icon: Calendar,
      content: `All bookings are subject to availability and confirmation. A deposit is required to secure your booking. Full payment is due 30 days before your travel date. Bookings made within 30 days of travel require immediate full payment.`
    },
    {
      id: 'payment',
      title: 'Payment Terms',
      icon: CreditCard,
      content: `We accept major credit cards, bank transfers, and mobile money payments. All prices are quoted in USD unless otherwise specified. Prices are subject to change without notice until booking is confirmed with deposit payment.`
    },
    {
      id: 'cancellation',
      title: 'Cancellation Policy',
      icon: AlertTriangle,
      content: `Cancellations made 60+ days before departure: Full refund minus 10% processing fee. Cancellations 30-59 days before departure: 50% refund. Cancellations less than 30 days before departure: No refund. Force majeure events may be considered for exceptions.`
    },
    {
      id: 'responsibilities',
      title: 'Client Responsibilities',
      icon: Users,
      content: `Clients are responsible for ensuring they have valid travel documents, required vaccinations, and travel insurance. Clients must inform us of any medical conditions, dietary requirements, or special needs at the time of booking.`
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: Shield,
      content: `Echoes of Rwanda acts as an agent for service providers and is not liable for their acts or omissions. Our liability is limited to the cost of services booked. We strongly recommend comprehensive travel insurance to cover unforeseen circumstances.`
    }
  ];

  return (
    <div className="terms-page">
      <div className="terms-container">
        {/* Header Section */}
        <div className="terms-header">
          <div className="header-icon">
            <FileText size={48} />
          </div>
          <h1>Terms of Service</h1>
          <p>Please read these terms carefully before using our services</p>
          <div className="last-updated">
            <Calendar size={16} />
            Last updated: {lastUpdated}
          </div>
        </div>

        {/* Introduction */}
        <div className="terms-intro">
          <h2>Welcome to Echoes of Rwanda</h2>
          <p>
            These Terms of Service ("Terms") govern your use of our website and services.
            By using our services, you agree to these terms. Please read them carefully.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="terms-content">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div key={section.id} className="terms-section">
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

        {/* Additional Terms */}
        <div className="additional-terms">
          <h2>Additional Important Terms</h2>

          <div className="terms-grid">
            <div className="term-item">
              <h4>Force Majeure</h4>
              <p>
                We are not liable for any failure to perform our obligations due to circumstances
                beyond our reasonable control, including but not limited to natural disasters,
                government actions, or travel restrictions.
              </p>
            </div>

            <div className="term-item">
              <h4>Privacy</h4>
              <p>
                Your privacy is important to us. Please review our Privacy Policy to understand
                how we collect, use, and protect your personal information.
              </p>
            </div>

            <div className="term-item">
              <h4>Modifications</h4>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective
                immediately upon posting. Continued use of our services constitutes acceptance of
                modified terms.
              </p>
            </div>

            <div className="term-item">
              <h4>Governing Law</h4>
              <p>
                These terms are governed by the laws of Rwanda. Any disputes will be resolved
                in the courts of Rwanda.
              </p>
            </div>

            <div className="term-item">
              <h4>Travel Insurance</h4>
              <p>
                We strongly recommend that all travelers purchase comprehensive travel insurance
                to cover medical expenses, trip cancellation, and other unforeseen circumstances.
              </p>
            </div>

            <div className="term-item">
              <h4>Health & Safety</h4>
              <p>
                Travelers participate in activities at their own risk. We recommend consulting
                healthcare providers regarding vaccinations and health precautions before travel.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="terms-contact">
          <h2>Questions About These Terms?</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us:
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

        {/* Agreement Notice */}
        <div className="agreement-notice">
          <div className="notice-icon">
            <AlertTriangle size={24} />
          </div>
          <div className="notice-content">
            <h3>Important Notice</h3>
            <p>
              By using our services, you acknowledge that you have read, understood,
              and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
