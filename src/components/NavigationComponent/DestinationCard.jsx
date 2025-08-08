"use client";

import React from 'react';
import "../../styles/destination.css";

const mockData = [
  {
    id: 1,
    placeName: "",
    imageUrl: "https://placehold.co/300x200?text=Akagera+National+Park",
    alt: ""
  },
  {
    id: 2,
    placeName: "",
    imageUrl: "https://placehold.co/300x200?text=Lake+Kivu",
    alt: ""
  },
  {
    id: 3,
    placeName: "",
    imageUrl: "https://placehold.co/300x200?text=Volcanoes+National+Park",
    alt: ""
  }
];

const DestinationCard = ({ destinations }) => {
  return (
    <div className="destination">
      <h1>Popular Destinations</h1>
      <div className="destination-cards">
        {destinations.map(destination => (
          <div key={destination.id} className="destination-card">
            <img src={destination.imageUrl} alt={destination.alt} />
            <p>{destination.placeName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default () => <DestinationCard destinations={mockData} />;