'use client';

import React from 'react';
import Image from 'next/image';
import styles from '@/components/styles/Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image src="/images/logo (2).png" alt="Logo (2)" width={180} height={40} />
      </div>
      <div className={styles.profile}>
        <Image
          src="/images/user.png" // use any default user icon for now
          alt="User"
          width={40}
          height={40}
          className={styles.userIcon}
        />
      </div>
    </header>
  );
};

export default Header;
