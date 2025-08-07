'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './TourCards.module.scss';

export default function TourCards() {
  const [tours, setTours] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch('https://echoes-of-rwanda.onrender.com/api/v1/trips');
        const data = await res.json();
        setTours(data.data || []);
      } catch (error) {
        console.error('Failed to fetch tour data:', error);
      }
    };

    fetchTours();
  }, []);

  return (
    <section className={styles.cardsSection}>
      <div className={styles.grid}>
        {tours.map((tour) => (
          <div key={tour._id} className={styles.card}>
            <img
              src={tour.image || '/images/default.png'}
              alt={tour.destination}
              className={styles.cardImg}
            />
            <div className={styles.cardBody}>
            <h3>{tour.title || 'Untitled Tour'}</h3>

              <p>{tour.description}</p>
              <button
                className={styles.learnMore}
                onClick={() => {
                  if (tour._id) router.push(`/tours/${tour._id}`);
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.nav}>
        <button className={styles.navBtn}>&lt;</button>
        <button className={styles.navBtn}>&gt;</button>
      </div>
    </section>
  );
}
