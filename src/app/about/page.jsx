'use client';
import React from 'react';
import { Info, Users, Award, Shield, Heart, Globe, Target, Eye, CheckCircle, Star, MapPin, Phone, Mail, Search, Compass } from 'lucide-react';
import './About.scss';



export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Globe className="badge-icon" size={20} />
              <span>Immersive Travel for Curious Explorers</span>
            </div>
            <h1 className="hero-title">Redefining Rwanda Travel</h1>
            <p className="hero-description">
              We blend smart technology with local storytelling to make each journey personal,
              meaningful, and immersive. Experience Rwanda not just as a destination, but as a living story.
            </p>
            <div className="hero-cta">
              <a href="/request-trip" className="book-now-btn">
                <Star size={20} />
                Start Your Journey
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="about-problem">
        <div className="container">
          <div className="problem-content">
            <div className="problem-icon">
              <Search size={48} />
            </div>
            <h2>The Problem</h2>
            <p>
              Most tourism platforms promote static information — leaving travelers with
              generic plans, little cultural depth, and no real personalization. Traditional tourism feels
              more like a checklist than a meaningful journey.
            </p>
          </div>
        </div>
      </section>

      {/* Our Objective Section */}
      <section className="about-objective">
        <div className="container">
          <div className="objective-content">
            <div className="objective-text">
              <div className="section-badge">
                <Target size={20} />
                <span>Our Objective</span>
              </div>
              <h2>Redefining Rwanda Travel</h2>
              <p>
                To redefine how travelers experience Rwanda by blending smart tech with local storytelling —
                making each journey personal, meaningful, and immersive. We help travelers not just see Rwanda,
                but feel its soul.
              </p>
            </div>
            <div className="objective-image">
              <img src="/images/camp.png" alt="Rwanda Cultural Experience" />
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Unique */}
      <section className="about-unique">
        <div className="container">
          <h2 className="section-title">What Makes Us Unique</h2>
          <p className="section-subtitle">Unlike traditional tourism sites, we offer:</p>

          <div className="unique-features">
            <div className="feature-card">
              <div className="feature-icon">
                <MapPin size={32} />
              </div>
              <h3>Dynamic Personalized Itineraries</h3>
              <p>We generate custom travel plans based on your interests, travel time, and real-time location — no two journeys are the same.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Heart size={32} />
              </div>
              <h3>GPS-Triggered Cultural Echoes</h3>
              <p>Experience rich, place-based narratives that unlock the stories behind every location you visit.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users size={32} />
              </div>
              <h3>Local Community Gems</h3>
              <p>We prioritize authentic local experiences and hidden community treasures, not just tourist hotspots.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How Echoes Began */}
      <section className="about-origin">
        <div className="container">
          <div className="origin-content">
            <div className="origin-image">
              <img src="/images/bridge.png" alt="Rwanda Landscape" />
            </div>
            <div className="origin-text">
              <div className="section-badge">
                <Compass size={20} />
                <span>How Echoes Began</span>
              </div>
              <h2>Born from a Simple Question</h2>
              <blockquote>
                "How can we make Rwandan travel feel more like a story and less like a checklist?"
              </blockquote>
              <p>
                Inspired by Rwanda's vibrant culture and underrepresented local experiences, we designed
                Echoes to empower both locals and visitors to rediscover the country with fresh eyes.
              </p>
              <p>
                Our platform transforms every journey into a narrative, where technology meets tradition,
                and every location has a voice waiting to be heard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What It Does */}
      <section className="about-features">
        <div className="container">
          <div className="features-header">
            <h2 className="section-title">What Echoes Does</h2>
            <p className="section-description">
              We're not just another booking platform — we're your cultural compass to Rwanda's soul.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-number">01</div>
              <div className="feature-content">
                <h3>Smart Itinerary Generation</h3>
                <p>AI-powered recommendations that adapt to your interests, time, and location in real-time.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-number">02</div>
              <div className="feature-content">
                <h3>Cultural Echoes Stories</h3>
                <p>GPS-triggered narratives that bring every location to life with rich cultural context.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-number">03</div>
              <div className="feature-content">
                <h3>Bookable Cultural Tours</h3>
                <p>Seamlessly book authentic experiences with local guides and community partners.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-number">04</div>
              <div className="feature-content">
                <h3>Community Connection</h3>
                <p>Direct access to local artisans, storytellers, and hidden gems off the beaten path.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome to Echoes Section */}
      <section className="welcome-to-echoes">
        <div className="container">
          <div className="welcome-content">
            <div className="welcome-text">
              <div className="welcome-badge">
                <Heart size={20} />
                <span>Welcome to Echoes</span>
              </div>
              <h2>Ready to Explore Rwanda?</h2>
              <p>
                Let us create an unforgettable journey tailored just for you. Contact our team today to start
                planning your Rwanda adventure and discover the soul of the Land of a Thousand Hills.
              </p>
              <div className="welcome-features">
                <div className="welcome-feature">
                  <CheckCircle size={18} />
                  <span>Personalized cultural experiences</span>
                </div>
                <div className="welcome-feature">
                  <CheckCircle size={18} />
                  <span>GPS-triggered storytelling</span>
                </div>
                <div className="welcome-feature">
                  <CheckCircle size={18} />
                  <span>Local community connections</span>
                </div>
              </div>
              <div className="welcome-cta">
                <a href="/request-trip" className="book-now-btn">
                  <Star size={20} />
                  Book Your Adventure Now
                </a>
              </div>
              <div className="contact-info">
                <div className="contact-item">
                  <Phone size={16} />
                  <span>+250784800280</span>
                </div>
                <div className="contact-item">
                  <Mail size={16} />
                  <span>echoesofrwanda@gmail.com</span>
                </div>
                <div className="contact-item">
                  <MapPin size={16} />
                  <span>Kigali, Rwanda</span>
                </div>
              </div>
            </div>
            <div className="welcome-images">
              <div className="image-grid">
                <div className="image-card large">
                  <img src="/images/camp.png" alt="Rwanda Cultural Experience" />
                  <div className="image-overlay">
                    <span>Cultural Immersion</span>
                  </div>
                </div>
                <div className="image-card">
                  <img src="/images/bridge.png" alt="Rwanda Adventure" />
                  <div className="image-overlay">
                    <span>Adventure Awaits</span>
                  </div>
                </div>
                <div className="image-card">
                  <img src="/images/akagera.png" alt="Rwanda Wildlife" />
                  <div className="image-overlay">
                    <span>Wildlife Safari</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
