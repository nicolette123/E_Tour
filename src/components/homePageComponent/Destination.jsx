import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import "./destination.scss";

export default function Destination() {
  const destinations = [
    {
      title: "Akagera National Park",
      image: "/images/akagera.png",
      description: "Wildlife Safari Paradise"
    },
    {
      title: "Lake Kivu",
      image: "/images/lake-kivu.png",
      description: "Serene Lake Experience"
    },
    {
      title: "Kigali",
      image: "/images/kigali.jpg",
      description: "Modern Capital City"
    },
    {
      title: "Nyungwe Park",
      image: "/images/nyungwe.jpg",
      description: "Ancient Rainforest"
    },
    {
      title: "Volcanoes National Park",
      image: "/images/volcano.jpg",
      description: "Mountain Gorilla Trekking"
    },
    {
      title: "Rwanda Memorial Genocide",
      image: "/images/genocide.jpg",
      description: "Historical Remembrance"
    },
  ];

  return (
    <section className="destination-section">
      <div className="container">
        <h2 className="destination-title">Popular Destinations</h2>
        <div className="grid">
          {destinations.map((dest, index) => (
            <div key={index} className="card">
              <Image
                src={dest.image}
                alt={dest.title}
                width={400}
                height={320}
                className="card-image"
              />
              <div className="card-overlay"></div>
              <div className="card-label">
                <div className="card-title">{dest.title}</div>
                <div className="card-description">{dest.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}