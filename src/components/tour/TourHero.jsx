'use client';

import styles from '@/components/styles/TourHero.module.scss';
import Image from 'next/image';
import CustomDropdown from '@/components/tour/CustomDropdown';

const TourHero = () => {
  return (
    <section className={styles.tourHero}>
      <div className={styles.introText}>
        <h3>Choose your Package</h3>
        <h2>Select your Best Package<br />for your Travel</h2>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBar}>
          <Image src="/images/search.jpg" alt="Search" width={20} height={20} />
          <input type="text" placeholder="Search" />
        </div>

        <CustomDropdown
          label="Posted at"
          isDate
          iconSrc="/images/post.png" 
        />

        <CustomDropdown
          label="Trip type"
          options={['Trip type', 'Adventure Tour', 'Hiking Trip', 'City Tour', 'Beach Activity', 'Park Trip']}
          iconSrc="/images/triptype.png" 
        />

        <CustomDropdown
          label="Company"
          options={['Company','G-Adventure', 'Travel leaders Group', 'Travello', 'Road scholar', 'Cox & Kings']}
          iconSrc="/images/company3.png"
        />
      </div>
    </section>
  );
};

export default TourHero;
