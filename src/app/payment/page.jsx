'use client';

import { useState } from 'react';
import styles from '../../components/payment/Payment.module.scss';

export default function PaymentPage() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    country: 'United States',
    postalCode: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s+/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }
    if (!/^\d{2}\/\s?\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = 'Invalid expiry date (MM / YY)';
    }
    if (!/^\d{3,4}$/.test(formData.cvc)) {
      newErrors.cvc = 'Invalid CVC';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      alert('Payment confirmed! ');
    }
  };

  return (
    <div className={styles.paymentWrapper}>
      <h2 className={styles.heading}>Confirm the payment</h2>

      <div className={styles.formContainer}>
        <h3>Payment Method</h3>

        <div className={styles.methods}>
          <button className={`${styles.method} ${styles.active}`}>
            <img src="/images/payment/card.png" alt="Card" />
            Card
          </button>
          <button className={styles.method}>
            <img src="/images/payment/momo.png" alt="Mobile Money" />
            Mobile money
          </button>
          <button className={styles.method}>
            <img src="/images/payment/Giropay.png" alt="Giropay" />
            Giropay
          </button>
          <button className={styles.dropdown}>⋯</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label>Card number</label>
          <div className={styles.cardInputWrapper}>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 1234 1234 1234"
              className={styles.cardInput}
              value={formData.cardNumber}
              onChange={handleChange}
            />
            <div className={styles.cardIcons}>
              <img src="/images/payment/VISA.png" alt="Visa" />
              <img src="/images/payment/mastercard.png" alt="Mastercard" />
              <img src="/images/payment/amex.png" alt="Amex" />
              <img src="/images/payment/discover.png" alt="Discover" />
            </div>
          </div>
          {errors.cardNumber && <p className={styles.error}>{errors.cardNumber}</p>}

          <label>Expiration date</label>
          <div className={styles.double}>
            <input
              type="text"
              name="expiry"
              placeholder="MM / YY"
              value={formData.expiry}
              onChange={handleChange}
            />
            <input
              type="text"
              name="cvc"
              placeholder="CVC"
              value={formData.cvc}
              onChange={handleChange}
            />
          </div>
          {errors.expiry && <p className={styles.error}>{errors.expiry}</p>}
          {errors.cvc && <p className={styles.error}>{errors.cvc}</p>}

          <label>Country</label>
          <div className={styles.double}>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option>United States</option>
              <option>Rwanda</option>
               <option>Another country</option>
            </select>
            <input
              type="text"
              name="postalCode"
              placeholder="Postal code"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>
          {errors.postalCode && <p className={styles.error}>{errors.postalCode}</p>}

          <button type="submit" className={styles.confirmBtn}>
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
