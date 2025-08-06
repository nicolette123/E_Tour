'use client';

import styles from './Payment.module.scss';

const Payment = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.paymentWrapper}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
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

          <form className={styles.form}>
            Card number
            <div className={styles.cardInputWrapper}>
              <input
                type="text"
                placeholder="1234 1234 1234 1234"
                className={styles.cardInput}
              />
              <div className={styles.cardIcons}>
                <img src="/images/payment/VISA.png" alt="Visa" />
                <img src="/images/payment/mastercard.png" alt="Mastercard" />
                <img src="/images/payment/amex.png" alt="Amex" />
                <img src="/images/payment/discover.png" alt="Discover" />
              </div>
            </div>

            Expiration date
            <div className={styles.double}>
              <input type="text" placeholder="MM / YY" />
              <input type="text" placeholder="CVC" />
            </div>

            Country
            <div className={styles.double}>
              <select>
                <option>United States</option>
                <option>Rwanda</option>
              </select>
              <input type="text" placeholder="Postal code" />
            </div>

            <button type="submit" className={styles.confirmBtn}>confirm</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
