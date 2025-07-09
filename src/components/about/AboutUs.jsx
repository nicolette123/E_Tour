'use client';

import styles from '@/components/styles/AboutUs.module.scss';
import Image from 'next/image';


export default function AboutUs() {
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <h1>Welcome to Echoes of Rwanda</h1>
        <div className={styles.underline}></div>
      </header>

      {/* Introduction Section (Image Left, Text Right) */}
      <section className={styles.introSection}>
        <div className={styles.introImageContainer}>
          
          <Image
            src="/images/camp.png"
            alt="Beautiful Rwandan Lodge"
            width={600}
            height={400}
            className={styles.introImage}
            priority // Prioritize loading for above-the-fold image
          />
        </div>
        <div className={styles.introText}>
          <p>Welcome to Echoes of Rwanda, a leading tourism company based in Rwanda. This system is designed to streamline travel planning, trip management, and travel-related services for clients, agents, and administrators. It will provide smart recommendations, ranking mechanisms, and a job marketplace to connect service providers with clients requesting specific trip experiences.</p>
        </div>
      </section>

      {/* Activities Section (Text Left, Image Right) */}
      <section className={styles.activitiesSection}>
        <div className={styles.activitiesText}>
          <p>At Echoes of Rwanda, we offer a wide range of tours and activities, including cultural and historical tours, wildlife safaris, mountain gorilla trekking, and more. Our experienced and knowledgeable guides will ensure that you have a safe and enjoyable experience while exploring the stunning landscapes and rich culture of Rwanda.</p>
        </div>
        <div className={styles.activitiesImageContainer}>
          <Image
            src="/images/bridge.png"
            alt="People on a Canopy Walk"
            width={600}
            height={400}
            className={styles.activitiesImage}
          />
        </div>
      </section>

      {/* Lake Section (Full Width Image) */}
      <section className={styles.lakeSection}>
        <div className={styles.lakeImageContainer}>
          <Image
            src="/images/lake.png"
            alt="Scenic view of Lake Kivu"
            width={600}
            height={400}
            className={styles.lakeImage}
          />
        </div>
        <div className={styles.lakeText}>
          <p>
Thank you for choosing Echoes of Rwanda  for your travel needs in Rwanda. We look forward to welcoming you on one of our tours soon!</p>
        </div>
      </section>

    
    </div>
  );
}
