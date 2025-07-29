
import React, { use, useState } from 'react';
//import styles from '@components/styles/TripRequestForm.module.scss';
import styles from '@/components/forms/TripRequestForm.module.scss'; // Assuming you have styles for this form



const TripRequestForm = () => {
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
        <label htmlFor="company">Company Name</label>
        <input type="text" id="company" />
      </div>
      <div className={styles["form-field"]}>
        <label htmlFor="phone">Phone</label>
        <input type="text" id="phone" />
      </div>
      <div className={styles["form-field"]}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
      </div>
      <div className={styles["form-field"]}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" />
      </div>
      <div className={styles["form-field"]}>
        <label htmlFor="totalNumber">Total Number</label>
        <input type="number" id="totalNumber" />
      </div>
      <div className={styles["form-field"]}>
        <label htmlFor="amount">Amount of Money</label>
        <input type="text" id="amount" />
      </div>
      <div className={styles["form-field"]}>
  <label htmlFor="startDate">Start Date</label>
  <input type="date" id="startDate" />
</div>

<div className={styles["form-field"]}>
  <label htmlFor="endDate">End Date</label>
  <input type="date" id="endDate" />
</div>
    </div>

    <button type="submit" className={styles["submit-btn"]}>Submit</button>
  </form>
</div>

  );
};

export default TripRequestForm;
