// LockoutPreview.jsx
import React from 'react';
import '.././styles/Service.scss'

const carouselItems = [
  { image: '/images/image 5.png' },
  { image: '/images/kigali.jpg' },
  {
    image: '/images/image 4.png',
    title: 'Akagera National Park',
  },
  { image: '/images/image 6.png' },
  { image: '/images/lake-kivu.jpg' }
];

const LockoutPreview = () => {
  return (
    <section className="lockout-preview">
      <h2 className="title">Popular Destination</h2>

      <div className="carousel">
        {carouselItems.map((item, idx) => (
          <div className="carousel-item" key={idx}>
            <img src={item.image} alt={`carousel-${idx}`} className="carousel-img" />
            {item.title && (
              <div className="carousel-caption">
                <h3>{item.title}</h3>
              </div>
            )}
            {/* {item.title && (
            //   <>
            //     <span className="carousel-arrow left">‹</span>
            //     <span className="carousel-arrow right">›</span>
            //   </>
            )} */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LockoutPreview;
