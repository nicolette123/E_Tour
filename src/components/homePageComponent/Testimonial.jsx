'use client';
import React from 'react';
import './testimonial.css'
const testimonials = [
  {
    name: 'James Waston',
    image: '/images/test3.jpg',
    quote: 'I recently went on a tour with Echoes of Rwanda Company and was extremely impressed with the level of professionalism and organization.',
  },
  {
    name: 'Emma Waston',
    image: '/images/test1.jpg',
    quote: 'I recently went on a tour with Echoes of Rwanda Company and was extremely impressed with the level of professionalism and organization.',
  },
  {
    name: 'Nathalie Waston',
    image: '/images/test2.jpg',
    quote: 'I recently went on a tour with Echoes of Rwanda Company and was extremely impressed with the level of professionalism and organization.',
  },
  

];

const Testimonial = () => {
  return (
    <section className="testimonials">
      <h2 className="testimonial-heading">Our Traveller Say</h2>
      <p className='say'>what our client says about us</p>
      <div className="testimonial-card-wrapper">
        {testimonials.map((t, index) => (
          <div className="testimonial-card" key={index}>
            <div className="testimonial-image-wrapper">
              <img src={t.image} alt={t.name} />
            </div>
            <h3>{t.name}</h3>
            <p>{t.quote}</p>
          </div>
        ))}
      </div>
      {/* <div className="testimonial-dots">
        <span />
        <span />
        <span />
      </div> */}
    </section>
  );
};

export default Testimonial;