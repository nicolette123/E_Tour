'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/layout-tour/Header';
import Footer from '@/components/layout-tour/Footer';
import styles from '@/components/styles/Akagera.module.scss';

const AkageraPage = () => {
  return (
    <div className={styles.akageraContainer}>
      <Header />
      <div className={styles['tour-details']}>
        <div className={styles['tour-header']}>
          <div>
            <h2>Akagera National Park</h2>
            <p>Nyagatare, Rwanda</p>
          </div>
          <div className={styles['action-buttons']}>
            <a href="#"><Image src="/images/Akagera/Vector.png" alt="icon"width={20} height={20}/>
              
              Share</a>
            <a href="#">Save</a>
          </div>
        </div>

        <div className={styles['image-grid']}>
          <div className={styles['main-image']}>
            <Image src="/images/main.PNG" alt="Main" width={700} height={550} />
          </div>
          <div className={styles['thumb-images']}>
            {['img1.PNG', 'img2.PNG', 'img3.PNG', 'img4.PNG'].map((img, i) => (
              <Image
                key={i}
                src={`/images/${img}`}
                alt={`Thumb ${i}`}
                width={150}
                height={100}
                className={styles.thumbnail}
              />
            ))}
          </div>
        </div>

        <div className={styles['tour-content']}>
          <div className={styles['left-content']}>
            <h3>Trip Hosted by Elite Journeys</h3>
            <p>3 guests · 1 bedroom · 1 bed · 1 bathroom</p>

            <h4>Description</h4>
            <p>This Trip will help you to discover more about Akagera National Park...</p>

            <h4>Period of Trip</h4>
            <p>This Trip lasts for 2 days.</p>
          </div>

          <div className={styles['right-content']}>
            <div className={styles['price-section']}>
              <p>100,000 RWF / Trip</p>

              <div className={styles['booking-box']}>
                <div className={styles['date-row']}>
                  <div>
                    <div className={styles.label}>CHECK IN</div>
                    <div>6/3/2023</div>
                  </div>
                  <div>
                    <div className={styles.label}>CHECK OUT</div>
                    <div>26/3/2023</div>
                  </div>
                </div>
                <div className={styles['guest-row']}>
                  <span>GUESTS</span> 1 Guests
                </div>
              </div>

              <div className={styles['cancel-policy']}>
                <h5>CANCELLATION POLICIES</h5>
                <div className={styles.option}>
                  <span>Non - refundable</span>
                  <span>80,000 RWF total</span>
                </div>
                <div className={styles.option}>
                  <span>Refundable</span>
                  <span>20,000 RWF total</span>
                </div>
                <div className={styles['free-cancel']}>FREE CANCELLATION BEFORE 22 JUN</div>
              </div>

              <div className={styles.buttons}>
                <button className={styles.cancel}>cancel</button>
                <button className={styles.reserve}>Reserve</button>
              </div>

              <div className={styles.note}>You won’t be charged yet</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AkageraPage;
