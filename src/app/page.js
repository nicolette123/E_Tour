"use client";
import React from 'react';
import Link from 'next/link';
import { Rocket, Package, Sparkles } from 'lucide-react';
import '../styles/home.css';

// Import components
import Hero from '../components/homePageComponent/HeroComponent.jsx'
import Destination from '../components/homePageComponent/Destination.jsx'
import WhyEchoes from '../components/homePageComponent/WhyEchoes.jsx';
import Testimonial from '../components/homePageComponent/Testimonial.jsx';
import Premium from '../components/homePageComponent/Premium.jsx';

function Home() {
  return (
    <main className="home-page">
      {/* Hero Banner Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-overlay">
            <div className="hero-text">
              <span className="hero-subtitle animate-fade-in">
                Echoes of Rwanda - Premium Travel Experience
              </span>
              <h1 className="hero-title animate-fade-in">
                Explore Vibrant Cities, Cultural Gems, and Nature Escapes
              </h1>
              <p className="hero-description animate-fade-in">
                Echoes of Rwanda is a smart travel assistant that creates personalized trip plans
                based on your preferences, making it easy to explore Rwanda with less stress and
                more authentic experiences.
              </p>

              <div className="hero-actions animate-fade-in">
                <Link href="/login" className="btn btn-primary hero-cta">
                  <Rocket className="btn-icon" size={20} />
                  <span className="btn-text">Get Started</span>
                </Link>
                <Link href="/tour-packages" className="btn btn-secondary hero-secondary">
                  <Package className="btn-icon" size={20} />
                  <span className="btn-text">Explore Tours</span>
                </Link>
              </div>
            </div>

            <div className="hero-note">
              <p>
                <Sparkles className="note-icon" size={18} />
                Explore attractions, build custom itineraries, and book unforgettable experiences all in one place.
              </p>
            </div>
          </div>
        </div>

        {/* Hero Background Elements */}
        <div className="hero-background">
          <div className="hero-image-overlay"></div>
        </div>
      </section>

      {/* Page Sections */}
      <Hero />
      <Destination />
      <WhyEchoes />
      <Testimonial />
      <Premium />
    </main>
  )
};

export default Home;