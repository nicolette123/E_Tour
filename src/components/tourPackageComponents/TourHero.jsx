'use client';

import styles from './TourHero.module.scss';
import Image from 'next/image';
import { Search, Calendar, MapPin, Building2 } from 'lucide-react';
import CustomDropdown from '../../components/tourPackageComponents/CustomDropdown';

const TourHero = () => {
  return (
    <section className={styles.tourHero}>
      <div className={styles.introText}>
        <h3>Choose your Package</h3>
        <h2>Select your Best Package<br />for your Travel</h2>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBar}>
          <Search className={styles.searchIcon} size={20} />
          <input type="text" placeholder="Search" />
        </div>

        <CustomDropdown
          label="Posted at"
          isDate
          icon={Calendar}
        />

        <CustomDropdown
          label="Trip type"
          options={['Trip type', 'Adventure Tour', 'Hiking Trip', 'City Tour', 'Beach Activity', 'Park Trip']}
          icon={MapPin}
        />

        <CustomDropdown
          label="Company"
          options={['Company', 'G-Adventure', 'Travel leaders Group', 'Travello', 'Road scholar', 'Cox & Kings']}
          icon={Building2}
        />
      </div>
    </section>
  );
};

export default TourHero;

