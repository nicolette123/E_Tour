import React, { useState } from 'react';
import styles from './TripRequest.module.scss'; 
import api from '../../utils/api';

const TripRequest = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    email: '',
    address: '',
    totalNumber: '',
    amount: '',
    startDate: '',
    endDate: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.companyName) tempErrors.companyName = 'Required';
    if (!formData.phone) tempErrors.phone = 'Required';
    if (!formData.email) tempErrors.email = 'Required';
    if (!formData.address) tempErrors.address = 'Required';
    if (!formData.totalNumber) tempErrors.totalNumber = 'Required';
    if (!formData.amount) tempErrors.amount = 'Required';
    if (!formData.startDate) tempErrors.startDate = 'Required';
    if (!formData.endDate) tempErrors.endDate = 'Required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className={styles["trip-request-form"]}>
      <p className={styles.subtitle}>Request your Trip</p>
      <h2 className={styles.title}>Request the trip on your own choice</h2>

      <form onSubmit={handleSubmit}>
        <h3>Create a Trip</h3>
        <div className={styles["form-grid"]}>
          <div className={styles["form-field"]}>
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="totalNumber">Total Number</label>
            <input
              type="number"
              id="totalNumber"
              name="totalNumber"
              value={formData.totalNumber}
              onChange={handleChange}
            />
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="amount">Amount of Money</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className={styles["submit-btn"]}>Submit</button>
      </form>
    </div>
  );
};

export default TripRequest;
