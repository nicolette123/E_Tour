'use client';
import React from 'react';
import { Info, Users, Award, Shield, Heart, Globe, Target, Eye, CheckCircle, Star, MapPin, Phone, Mail } from 'lucide-react';
import AboutUsWelcome from '../../components/aboutUsComponent/AboutUsWelcome.jsx';
import HeroSection from '../../components/aboutUsComponent/HeroSection.jsx';
import './About.scss';

const teamMembers = [
  {
    id: 1,
    name: 'Jean Baptiste Uwimana',
    role: 'Founder & CEO',
    image: '/images/team/ceo.jpg',
    bio: 'Passionate about showcasing Rwanda\'s beauty to the world. 15+ years in tourism industry.',
    specialties: ['Strategic Planning', 'Tourism Development', 'Cultural Heritage']
  },
  {
    id: 2,
    name: 'Marie Claire Mukamana',
    role: 'Head of Operations',
    image: '/images/team/operations.jpg',
    bio: 'Expert in tour operations and customer experience. Ensures every journey is memorable.',
    specialties: ['Operations Management', 'Customer Service', 'Quality Assurance']
  },
  {
    id: 3,
    name: 'David Nkurunziza',
    role: 'Lead Tour Guide',
    image: '/images/team/guide.jpg',
    bio: 'Wildlife expert and cultural ambassador. Fluent in 4 languages with deep local knowledge.',
    specialties: ['Wildlife Guiding', 'Cultural Tours', 'Photography']
  },
  {
    id: 4,
    name: 'Sarah Uwimana',
    role: 'Marketing Director',
    image: '/images/team/marketing.jpg',
    bio: 'Digital marketing specialist focused on sustainable tourism promotion.',
    specialties: ['Digital Marketing', 'Content Creation', 'Brand Management']
  }
];

const achievements = [
  {
    icon: Award,
    title: 'Excellence Award 2023',
    description: 'Rwanda Tourism Board Recognition for Outstanding Service'
  },
  {
    icon: Users,
    title: '10,000+ Happy Travelers',
    description: 'Successfully hosted travelers from over 50 countries'
  },
  {
    icon: Shield,
    title: 'Safety Certified',
    description: 'International safety and quality standards compliance'
  },
  {
    icon: Heart,
    title: 'Community Impact',
    description: 'Supporting local communities through responsible tourism'
  }
];

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To showcase Rwanda\'s natural beauty, rich culture, and remarkable transformation while creating sustainable economic opportunities for local communities.'
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'To be Rwanda\'s leading tourism company, recognized globally for exceptional experiences and commitment to sustainable tourism practices.'
  },
  {
    icon: Heart,
    title: 'Our Values',
    description: 'Authenticity, Sustainability, Excellence, Community Empowerment, and Cultural Respect guide everything we do.'
  }
];

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <Info className="hero-icon" size={48} />
            <h1 className="hero-title">About Echoes of Rwanda</h1>
            <p className="hero-description">
              We are passionate storytellers, dedicated to sharing Rwanda's incredible journey
              of transformation, natural beauty, and vibrant culture with the world.
            </p>
          </div>
        </div>
      </section>

      {/* Include existing components */}
      <HeroSection />
      <AboutUsWelcome />
    </div>
  );
}
