'use client';
import React, { useState } from 'react';
import { Camera, MapPin, Calendar, Users, Filter, Grid, List, Search, Heart, Share2, Download } from 'lucide-react';
import './Gallery.scss';

const galleryCategories = [
  { id: 'all', name: 'All Photos', count: 48 },
  { id: 'wildlife', name: 'Wildlife', count: 12 },
  { id: 'landscapes', name: 'Landscapes', count: 15 },
  { id: 'culture', name: 'Culture', count: 8 },
  { id: 'adventure', name: 'Adventure', count: 13 }
];

const galleryImages = [
  {
    id: 1,
    src: '/images/akagera.png',
    title: 'Akagera National Park',
    category: 'wildlife',
    location: 'Eastern Rwanda',
    date: '2024-01-15',
    photographer: 'John Safari',
    likes: 124,
    description: 'Magnificent elephants roaming freely in Akagera National Park'
  },
  {
    id: 2,
    src: '/images/lake-kivu.png',
    title: 'Lake Kivu Sunset',
    category: 'landscapes',
    location: 'Western Rwanda',
    date: '2024-01-20',
    photographer: 'Sarah Nature',
    likes: 89,
    description: 'Breathtaking sunset over the serene waters of Lake Kivu'
  },
  {
    id: 3,
    src: '/images/kigali.jpg',
    title: 'Kigali City Skyline',
    category: 'culture',
    location: 'Kigali',
    date: '2024-02-01',
    photographer: 'Mike Urban',
    likes: 156,
    description: 'Modern Kigali showcasing Rwanda\'s remarkable development'
  },
  {
    id: 4,
    src: '/images/nyungwe.jpg',
    title: 'Nyungwe Forest Canopy',
    category: 'adventure',
    location: 'Southern Rwanda',
    date: '2024-02-10',
    photographer: 'Emma Explorer',
    likes: 203,
    description: 'Thrilling canopy walk through ancient Nyungwe Forest'
  },
  {
    id: 5,
    src: '/images/volcano.jpg',
    title: 'Volcanoes National Park',
    category: 'wildlife',
    location: 'Northern Rwanda',
    date: '2024-02-15',
    photographer: 'David Wildlife',
    likes: 278,
    description: 'Mountain gorillas in their natural habitat'
  },
  {
    id: 6,
    src: '/images/genocide.jpg',
    title: 'Genocide Memorial',
    category: 'culture',
    location: 'Kigali',
    date: '2024-02-20',
    photographer: 'Lisa Heritage',
    likes: 95,
    description: 'Honoring the memory at Kigali Genocide Memorial'
  }
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = galleryImages.filter(image => {
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="container">
          <div className="hero-content">
            <Camera className="hero-icon" size={48} />
            <h1 className="hero-title">Rwanda Photo Gallery</h1>
            <p className="hero-description">
              Discover the breathtaking beauty of Rwanda through our curated collection of stunning photographs.
              From wildlife adventures to cultural experiences, explore the Land of a Thousand Hills.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Controls */}
      <section className="gallery-controls">
        <div className="container">
          <div className="controls-wrapper">
            {/* Search Bar */}
            <div className="search-bar">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search photos by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Category Filter */}
            <div className="category-filter">
              <Filter className="filter-icon" size={20} />
              <div className="category-buttons">
                {galleryCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="view-toggle">
              <button
                onClick={() => setViewMode('grid')}
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-content">
        <div className="container">
          <div className={`gallery-grid ${viewMode}`}>
            {filteredImages.map(image => (
              <div key={image.id} className="gallery-item" onClick={() => setSelectedImage(image)}>
                <div className="image-wrapper">
                  <img src={image.src} alt={image.title} className="gallery-image" />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <h3 className="image-title">{image.title}</h3>
                      <div className="image-meta">
                        <span className="meta-item">
                          <MapPin size={14} />
                          {image.location}
                        </span>
                        <span className="meta-item">
                          <Calendar size={14} />
                          {new Date(image.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="overlay-actions">
                      <button className="action-btn">
                        <Heart size={16} />
                        {image.likes}
                      </button>
                      <button className="action-btn">
                        <Share2 size={16} />
                      </button>
                      <button className="action-btn">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                {viewMode === 'list' && (
                  <div className="item-details">
                    <h3 className="item-title">{image.title}</h3>
                    <p className="item-description">{image.description}</p>
                    <div className="item-meta">
                      <span>By {image.photographer}</span>
                      <span>{image.location}</span>
                      <span>{new Date(image.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="empty-state">
              <Camera size={48} />
              <h3>No photos found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImage(null)}>
              ×
            </button>
            <img src={selectedImage.src} alt={selectedImage.title} className="modal-image" />
            <div className="modal-info">
              <h2>{selectedImage.title}</h2>
              <p>{selectedImage.description}</p>
              <div className="modal-meta">
                <span><MapPin size={16} /> {selectedImage.location}</span>
                <span><Calendar size={16} /> {new Date(selectedImage.date).toLocaleDateString()}</span>
                <span><Users size={16} /> {selectedImage.photographer}</span>
                <span><Heart size={16} /> {selectedImage.likes} likes</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
