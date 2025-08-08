'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Header from '../../components/tourDetailsComponents/Header';
import Footer from '../../components/tourDetailsComponents/Footer';
import Payment from '../../components/payment/Payment';
import styles from '../../components/tourDetailsComponents/Akagera.module.scss';

// Separate the component that uses useSearchParams
const AkageraContent = () => {
  const [trip, setTrip] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  console.log('Fetched ID:', id);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await fetch(`https://echoes-of-rwanda.onrender.com/api/v1/trips/${id}`);
        const data = await res.json();
        console.log('API response:', data);
        if (data?.data) {
          setTrip(data.data);
        }
      } catch (err) {
        console.error('Error fetching trip:', err);
      }
    };

    if (id) fetchTrip();
  }, [id]);

  if (!trip) return <p>Please wait....</p>;

  const {
    title,
    location,
    description,
    agentName,
    startDate,
    endDate,
    priceInfo,
    images = [],
    maxSeats
  } = trip;

  const fallbackImage = '/images/default.png';

  return (
    <div className={styles.akageraContainer}>
      {/*<Header />*/}

      <div className={styles['tour-details']}>
        <div className={styles['tour-header']}>
          <div>
            <h2>{title}</h2>
            <p>{location}</p>
          </div>
          <div className={styles['action-buttons']}>
            <a href="#"><Image src="/images/Akagera/Vector.png" alt="icon" width={20} height={20} /> Share</a>
            <a href="#">Save</a>
          </div>
        </div>

        <div className={styles['image-grid']}>
          <div className={styles['main-image']}>
            <Image
              src={images[0] || fallbackImage}
              alt="Main"
              width={580}
              height={550}
              unoptimized
            />
          </div>
          <div className={styles['thumb-images']}>
            {images.slice(1, 5).map((img, i) => (
              <Image
                key={i}
                src={img || fallbackImage}
                alt={`Thumb ${i}`}
                width={150}
                height={100}
                className={styles.thumbnail}
                unoptimized
              />
            ))}
          </div>
        </div>

        <div className={styles['tour-content']}>
          <div className={styles['left-content']}>
            <h3>Trip Hosted by {agentName}</h3>
            <p>{maxSeats} guests</p>

            <h4>Description</h4>
            <p>{description}</p>

            <h4>Period of Trip</h4>
            <p>This trip lasts from {startDate} to {endDate}</p>
          </div>

          <div className={styles['right-content']}>
            <div className={styles['price-section']}>
              <p>{priceInfo?.formatted || 'N/A'} / Trip</p>

              <div className={styles['booking-box']}>
                <div className={styles['date-row']}>
                  <div>
                    <div className={styles.label}>CHECK IN</div>
                    <div>{startDate}</div>
                  </div>
                  <div>
                    <div className={styles.label}>CHECK OUT</div>
                    <div>{endDate}</div>
                  </div>
                </div>
                <div className={styles['guest-row']}>
                  <span>GUESTS</span> {maxSeats} Guests
                </div>
              </div>

              <div className={styles.buttons}>
                <button className={styles.reserve} onClick={() => setShowPayment(true)}>Reserve</button>
              </div>

              <div className={styles.note}>You won't be charged yet</div>
            </div>
          </div>
        </div>
      </div>

      {showPayment && <Payment onClose={() => setShowPayment(false)} />}
    </div>
  );
};

// Loading component for Suspense fallback
const Loading = () => (
  <div className={styles.akageraContainer}>
    <p>Loading tour details...</p>
  </div>
);

// Main component wrapped with Suspense
const AkageraPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AkageraContent />
    </Suspense>
  );
};

export default AkageraPage;