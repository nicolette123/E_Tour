// LockoutPreview.jsx
import React from 'react';
import '../../src/styles/Service.scss';
// import Button from './button/button';

const data = [
  {
    title: 'Nyandungu',
    description: "Whether you're looking to unwind surrounded by nature, enjoy a leisurely walk, or simply escape the hustle and bustle of the city",
    image: '/images/image 10.png'
  },
  {
    description: 'The Kigali Genocide Memorial is a place of remembrance and learning dedicated to the victims of the Genocide against the Tutsi in Rwanda',
    image: '/images/image 9.png'
  },
  {
    title: 'Inyamabo',
    description: 'Inyamabo are long-horned cattle that are bred for ceremonial purposes and treated like royalty in Rwanda.',
    image: '/images/image 11.png'
  }
];

const LockoutPreview = () => {
  return (
    <section className="lockout-preview">
      <h2 className="title">Lockout Preview</h2>
      <span className='magic'>See the Magic – But You Need to Register First</span> <br />
      <div className="card-container">
        {data.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.image} alt={item.title} className="card-image" />
            <div className="card-body">
              <h3 className="card-title">{item.title}</h3>
              <p className="card-text">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* <Button text="Request services" isPrimary={true} /> */}
    </section>
  );
};

export default LockoutPreview;
