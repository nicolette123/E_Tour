// Modern Hero Section Component
import React from 'react';
import Link from 'next/link';
import { Mountain, Star, PartyPopper, ArrowUpRight, Users, Award, MapPin } from 'lucide-react';
import './hero.css'

const Hero = () => {
  return (
    <section className="highlight-section">
      <div className="container">
        <div className="highlight-grid">
          {/* Text Card */}
          <div className="highlight-card text-card">
            <div className="card-content">
              <span className="subheading">
                <Mountain className="subheading-icon" size={16} />
                Country of Thousand Hills
              </span>
              <h3 className="main-heading">
                Don't Miss Out<br />
                <span className="heading-accent">Experience It for Yourself</span>
              </h3>
              <p className="card-description">
                Discover the breathtaking beauty of Rwanda's landscapes,
                from rolling hills to pristine lakes and vibrant culture.
              </p>
              <Link href="/tour-packages" className="btn btn-primary explore-btn">
                <Star className="btn-icon" size={18} />
                <span className="btn-text">Join Us</span>
              </Link>
            </div>
          </div>

          {/* Image Card with Discount */}
          <div className="highlight-card image-card">
            <div className="card-image-wrapper">
              <img
                src="/images/resort.jpg"
                alt="Luxury Resort in Rwanda"
                className="card-image"
              />
              <div className="image-overlay">
                <div className="discount-badge">
                  <PartyPopper className="discount-icon" size={16} />
                  <span className="discount-text">Get 20% Off</span>
                </div>
                <div className="card-action-icon">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
            <div className="card-info">
              <h4 className="card-title">Premium Accommodations</h4>
              <p className="card-subtitle">Luxury resorts & eco-lodges</p>
            </div>
          </div>

          {/* User Statistics Card */}
          <div className="highlight-card user-card">
            <div className="card-content">
              <div className="user-stats-header">
                <h4 className="stats-title">Trusted by Travelers</h4>
                <Users className="stats-icon" size={24} />
              </div>

              <div className="avatars-section">
                <div className="avatars">
                  <img src="/images/user1.jpg" alt="Happy traveler" className="avatar" />
                  <img src="/images/user2.jpg" alt="Happy traveler" className="avatar" />
                  <img src="/images/user3.jpg" alt="User 3" className="avatar" />
                  <img src="/images/user4.jpg" alt="User 4" className="avatar" />
                  <div className="avatar-more">+</div>
                </div>
                <div className="user-stats">
                  <p className="user-count">100K+</p>
                  <p className="user-label">Happy Travelers</p>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">4.9</span>
                  <span className="stat-label">Rating</span>
                  <div className="stat-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="star-icon" size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Destinations</span>
                  <MapPin className="stat-icon" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
