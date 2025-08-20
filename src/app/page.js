"use client";
import React from 'react';
  
import '../styles/home.css';
import Link from 'next/link';

import Hero from '../components/homePageComponent/Hero'
//  import Service from '../../components/Service';
import Destination from'../components/homePageComponent/Destination'
import WhyEchoes from '../components/homePageComponent/WhyEchoes';
import Testimonial from '../components/homePageComponent/Testimonial';
import Premium from '../components/homePageComponent/Premium';


function Home() {
  return (
    <section className="home-page">
     <div className="hero-banner">
        <div className="hero-overlay">
          <p className="hero-subtitle">Echoes of Rwanda - travel experience</p>
          <h1 className="hero-title">
            Explore vibrant cities, cultural<br />gems, and nature escapes
          </h1>
          <p className="hero-desc">
            Echoes of Rwanda is a smart travel assistant that creates <br /> personalized trip plans based on your preferences, making it easy to <br /> explore Rwanda with less stress and more authentic experiences.
          </p><Link href="/request-trip">
           <button className="explore-btn">Get started</button></Link>
          <p className="hero-note">
            Explore attractions, build custom <br /> itineraries, and book unforgettable <br /> experiences all in one place.
          </p>
        </div>
      </div>
    
      <Hero /> 
    <Destination /> 
    <WhyEchoes />
   
     <Testimonial />   
 <Premium /> 
    </section>
    
  )
};

export default Home;