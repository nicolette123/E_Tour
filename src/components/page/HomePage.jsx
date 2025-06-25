"use client";
import React from 'react';
  import '../../styles/HomePage.scss';
// import '../styles/HomePage.scss';
import HeroSection from '../../components/HeroSection';
 import Service from '../../components/Service';
import Destination from '../Destination';
import WhyEchoes from '../WhyEchoes';
import Premium from '../Premium';
// import WhyEchoes from '../component/WhyEchoes';
// import Flow from '../component/Flow';
// import Premium from '../component/Premium';
// import Footer from '../component/Footer';


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
          </p>
           <button className="explore-btn">Get started</button>
          <p className="hero-note">
            Explore attractions, build custom <br /> itineraries, and book unforgettable <br /> experiences all in one place.
          </p>
        </div>
      </div>
    
     <HeroSection /> 
     <Service /> 
    {/* <Destination /> */}
     <WhyEchoes />
     <Premium />
    {/* <Flow />
    
    <Footer />  */}
    </section>
    
  )
};

export default Home;