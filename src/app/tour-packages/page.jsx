'use client';
import React, { useState } from 'react';
import { Package, MapPin, Clock, Users, Star, Calendar, Filter, Search, Heart, ArrowRight, Award, Shield, Compass } from 'lucide-react';
import TourHero from '../../components/tourPackageComponents/TourHero.jsx';
import TourCards from '../../components/tourPackageComponents/TourCards.jsx';
import './TourPackages.scss';

const tourCategories = [
  { id: 'all', name: 'All Tours', count: 24 },
  { id: 'wildlife', name: 'Wildlife Safari', count: 8 },
  { id: 'culture', name: 'Cultural Tours', count: 6 },
  { id: 'adventure', name: 'Adventure', count: 5 },
  { id: 'luxury', name: 'Luxury Tours', count: 5 }
];

const featuredTours = [
  {
    id: 1,
    title: 'Gorilla Trekking Adventure',
    category: 'wildlife',
    location: 'Volcanoes National Park',
    duration: '3 Days',
    groupSize: '8 People',
    price: 1200,
    rating: 4.9,
    reviews: 156,
    image: '/images/volcano.jpg',
    description: 'Experience the thrill of encountering mountain gorillas in their natural habitat. This once-in-a-lifetime adventure includes guided treks through the misty mountains of Volcanoes National Park.',
    highlights: ['Mountain Gorilla Encounter', 'Professional Guide', 'Park Permits Included', 'Luxury Lodge Stay'],
    difficulty: 'Moderate',
    bestTime: 'Year Round'
  },
  {
    id: 2,
    title: 'Akagera Wildlife Safari',
    category: 'wildlife',
    location: 'Akagera National Park',
    duration: '2 Days',
    groupSize: '12 People',
    price: 450,
    rating: 4.7,
    reviews: 89,
    image: '/images/akagera.png',
    description: 'Discover Rwanda\'s Big Five in the beautiful savannah landscapes of Akagera National Park. Game drives, boat safaris, and stunning wildlife photography opportunities.',
    highlights: ['Big Five Safari', 'Boat Safari', 'Game Drives', 'Bird Watching'],
    difficulty: 'Easy',
    bestTime: 'Dry Season'
  },
  {
    id: 3,
    title: 'Cultural Heritage Tour',
    category: 'culture',
    location: 'Kigali & Surroundings',
    duration: '4 Days',
    groupSize: '15 People',
    price: 320,
    rating: 4.8,
    reviews: 124,
    image: '/images/kigali.jpg',
    description: 'Immerse yourself in Rwandan culture, history, and traditions. Visit local communities, markets, museums, and experience authentic Rwandan hospitality.',
    highlights: ['Cultural Villages', 'Traditional Crafts', 'Local Cuisine', 'Historical Sites'],
    difficulty: 'Easy',
    bestTime: 'Year Round'
  },
  {
    id: 4,
    title: 'Nyungwe Canopy Walk',
    category: 'adventure',
    location: 'Nyungwe National Park',
    duration: '2 Days',
    groupSize: '10 People',
    price: 380,
    rating: 4.6,
    reviews: 78,
    image: '/images/nyungwe.jpg',
    description: 'Walk among the treetops on Africa\'s only canopy walkway. Experience the ancient Nyungwe Forest from a unique perspective, 50 meters above the ground.',
    highlights: ['Canopy Walkway', 'Primate Tracking', 'Nature Walks', 'Tea Plantation Visit'],
    difficulty: 'Moderate',
    bestTime: 'Dry Season'
  },
  {
    id: 5,
    title: 'Lake Kivu Relaxation',
    category: 'luxury',
    location: 'Lake Kivu',
    duration: '3 Days',
    groupSize: '6 People',
    price: 650,
    rating: 4.9,
    reviews: 92,
    image: '/images/lake-kivu.png',
    description: 'Unwind by the shores of beautiful Lake Kivu. Enjoy water activities, spa treatments, and stunning sunset views in this peaceful lakeside retreat.',
    highlights: ['Luxury Resort', 'Water Sports', 'Spa Treatments', 'Sunset Cruises'],
    difficulty: 'Easy',
    bestTime: 'Year Round'
  },
  {
    id: 6,
    title: 'Complete Rwanda Experience',
    category: 'luxury',
    location: 'Multiple Locations',
    duration: '7 Days',
    groupSize: '8 People',
    price: 2100,
    rating: 5.0,
    reviews: 45,
    image: '/images/resort.jpg',
    description: 'The ultimate Rwanda adventure combining wildlife, culture, and luxury. Visit all major attractions with premium accommodations and exclusive experiences.',
    highlights: ['Gorilla Trekking', 'Wildlife Safari', 'Cultural Experiences', 'Luxury Lodges'],
    difficulty: 'Moderate',
    bestTime: 'Year Round'
  }
];

export default function TourPackagePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filteredTours = featuredTours.filter(tour => {
    const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory;
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = priceRange === 'all' ||
      (priceRange === 'budget' && tour.price < 500) ||
      (priceRange === 'mid' && tour.price >= 500 && tour.price < 1000) ||
      (priceRange === 'luxury' && tour.price >= 1000);
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'duration': return parseInt(a.duration) - parseInt(b.duration);
      default: return b.reviews - a.reviews; // popular
    }
  });

  return (
    <div className="tour-packages-page">
      {/* Hero Section */}
      <section className="packages-hero">
        <div className="container">
          <div className="hero-content">
            <Package className="hero-icon" size={48} />
            <h1 className="hero-title">Rwanda Tour Packages</h1>
            <p className="hero-description">
              Discover carefully crafted tour packages designed to showcase the best of Rwanda.
              From thrilling wildlife encounters to cultural immersions and luxury experiences.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <Award className="stat-icon" size={24} />
                <span className="stat-number">24</span>
                <span className="stat-label">Tour Packages</span>
              </div>
              <div className="stat-item">
                <Shield className="stat-icon" size={24} />
                <span className="stat-number">100%</span>
                <span className="stat-label">Safe & Secure</span>
              </div>
              <div className="stat-item">
                <Compass className="stat-icon" size={24} />
                <span className="stat-number">5+</span>
                <span className="stat-label">Destinations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Include existing components */}
      <TourHero />
      <TourCards />
    </div>
  );
}
