// src/components/HeroSection.jsx
import React from 'react';
import '.././styles/HeroSection.scss'

const HeroSection = () => {
  return (
     <div className="highlight-section">
        <div className="highlight-card text-card">
          <span className="subheading">Country of thousand hills</span>
          <h3 className="main-heading">Don’t miss out<br />experience it for yourself.</h3>
          <button className="explore-btn">enerate</button>
        </div>

        <div className="highlight-card image-card">
          <p className='highlight-discount'>Get a discount of 20%</p><div className="icon-overlay">↗</div>
          <img src="/images/hero-background.png" alt="Hotel Resort" />
          
        </div>

        <div className="highlight-card user-card">
          <div className="avatars">
            <img src="/images/user.png" alt="User 1" />
            <img src="/images/user1.png" alt="User 2" />
            <img src="/images/user2.png" alt="User 3" />
            <img src="/images/user3.png" alt="User 4" />
          </div>
          <p className="user-count">100K+ User Travelled</p>
        </div>
      </div>
    
  );
};

export default HeroSection;