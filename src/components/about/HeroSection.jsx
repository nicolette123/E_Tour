'use client';

import styles from '@/components/styles/HeroSection.module.scss';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.textContent}>
        <h1>
          Echoes of Rwanda is where 
       technology meets tourism      travelers meet the people who
      make journeys special
    </h1>
    <p className={styles.subText}>Discover the Land of a Thousand Hills</p>

    

    <div className={styles.bookingForm}>
     <label>Guest</label>  
      <select>
        <option>2 Adults</option>
        <option>1 Adult</option>
        <option>2 Children</option>
      </select>
      <label>Date</label>
    <div className="date">
      
      <input type="date" />
    </div>
    <label>Package</label>

      <select>
        <option>Akagera Tour</option>
        <option>Nyungwe Tour</option>
        <option>Volcanoes Tour</option>
      </select>

      <button className={styles.bookNow}>Book Now</button>
    </div>
  </div>

  <div className={styles.imageContainer}>
    <Image
      src="/images/green-hero.png"
      alt="Chimpanzees in Rwanda"
      width={500}
      height={500}
      className={styles.chimpImage}
    />
  </div>
</section> 


);
};

export default HeroSection; 

