// src/components/HeroSection.jsx
import React from 'react';
import './hero.css'
import Link from 'next/link';
const Hero = () => {
  return (
     <div className="highlight-section">
        <div className="highlight-card text-card">
          <span className="subheading">Country of thousand hills</span>
          <h3 className="main-heading">Don’t miss out<br />experience it for yourself.</h3>
        <Link href="/login">
          <button className="explore-btn">Join us</button></Link>
        </div>

        <div className="highlight-card image-card">
          <p className='highlight-discount'>Get a discount of 20%</p><div className="icon-overlay">↗</div>
          <img src="/images/resort.jpg" alt="Hotel Resort" />
          
        </div>

        <div className="highlight-card user-card">
          <div className="avatars">
            <img src="/images/user1.jpg" alt="User 1" />
            <img src="/images/user2.jpg" alt="User 2" />
            <img src="/images/user3.jpg" alt="User 3" />
            <img src="/images/user4.jpg" alt="User 4" />
          </div>
          <p className="user-count">100K+ User Travelled</p>
        </div>
      </div>
    
  );
};

export default Hero;