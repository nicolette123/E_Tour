'use client';

import styles from './HeroSection.module.scss';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.textContent}>
        <h1>
          Echoes of Rwanda is where <br />
          technology meets tourism <br />
          travelers meet the people who <br />
          make journeys special
        </h1>
        <p className={styles.subText}>Discover the Land of a Thousand Hills</p>

        <div className={styles.bookingForm}>
          <div className={styles.formItem}>
            
            <label>Guest</label>
            <select>
              <option>2 Adult</option>
              <option>1 Adult</option>
              <option>2 Child</option>
            </select>
          </div>
          <div className={styles.formItem}>
            <label>Date</label>
            <select>
              <option>12 - 13 April 2021</option>
              <option>20 - 22 May 2021</option>
            </select>
          </div>
          <div className={styles.formItem}>
            <label>Package</label>
            <select>
              <option>Akagera Tour</option>
              <option>Nyungwe Tour</option>
              <option>Volcanoes Tour</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.imageContainer}>
        <div className={styles.buttonWrapper}>
          <button className={styles.bookNow}>Book Now</button>
        </div>
        <Image
          src="/images/green-hero.png"
          alt="Chimpanzees in Rwanda"
          width={500}
          height={782}
          className={styles.chimpImage}
        />
      </div>
    </section>
  );
};

export default HeroSection;
