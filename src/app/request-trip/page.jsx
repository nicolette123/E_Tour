'use client';

import TripRequest from './TripRequest.jsx';

import React from 'react';
import styles from './TripRequest.module.scss'; 
import api from '../../utils/api';



export default function RequestTripPage() {
  return (
    <main>
      <TripRequest />
    </main>
  );
}
