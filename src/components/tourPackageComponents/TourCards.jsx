'use client';

import styles from './TourCards.module.scss';
import { useRouter } from 'next/navigation'; // ✅ Import router

const toursData = [
  {
    id: 1,
    title: 'Akagera National Park',
    desc: 'Visitors to Akagera National Park can take part in a range of activities, including game drives, boat safaris, bird watching, and nature walks.',
    imgSrc: '/images/akagera.png',
    link: '/akagera', // ✅ Add link
  },
  {
    id: 2,
    title: 'Bisoke Hike',
    desc: 'The Bisoke hike is a popular mountain trek in Rwanda, located in the Volcanoes National Park. It is one of the most challenging hikes in the park.',
    imgSrc: '/images/bisoke.png',
    link: '#', // ⛔ placeholder (optional)
  },
  {
    id: 3,
    title: 'Lake Kivu trip',
    desc: 'A trip to Lake Kivu can be a truly unique and memorable experience.',
    imgSrc: '/images/lake-kivu.png',
    link: '#', // ⛔ placeholder (optional)
  },
];

// Repeat and slice to get 9 cards
const tours = [...toursData, ...toursData, ...toursData].slice(0, 9);

export default function TourCards() {
  const router = useRouter();

  return (
    <section className={styles.cardsSection}>
      <div className={styles.grid}>
        {tours.map((t, index) => (
          <div key={index} className={styles.card}>
            <img src={t.imgSrc} alt={t.title} className={styles.cardImg} />
            <div className={styles.cardBody}>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <button
                className={styles.learnMore}
                onClick={() => {
                  if (t.link && t.link !== '#') router.push(t.link);
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
