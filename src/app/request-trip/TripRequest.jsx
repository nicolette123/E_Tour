import React, { useState } from 'react';
import { Calendar, Users, DollarSign, MapPin, Phone, Mail, Building, CheckCircle, AlertCircle } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get minimum end date (day after start date)
  const getMinEndDate = () => {
    if (!formData.startDate) return getTodayDate();
    const startDate = new Date(formData.startDate);
    startDate.setDate(startDate.getDate() + 1);
    return startDate.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    let tempErrors = {};

    // Basic required field validation
    if (!formData.companyName.trim()) tempErrors.companyName = 'Company name is required';
    if (!formData.phone.trim()) tempErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) tempErrors.email = 'Email is required';
    if (!formData.address.trim()) tempErrors.address = 'Address is required';
    if (!formData.totalNumber) tempErrors.totalNumber = 'Number of travelers is required';
    if (!formData.amount.trim()) tempErrors.amount = 'Budget amount is required';
    if (!formData.startDate) tempErrors.startDate = 'Start date is required';
    if (!formData.endDate) tempErrors.endDate = 'End date is required';

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      tempErrors.phone = 'Please enter a valid phone number';
    }

    // Number validation
    if (formData.totalNumber && (parseInt(formData.totalNumber) < 1 || parseInt(formData.totalNumber) > 50)) {
      tempErrors.totalNumber = 'Number of travelers must be between 1 and 50';
    }

    // Amount validation
    if (formData.amount && (parseFloat(formData.amount) < 100)) {
      tempErrors.amount = 'Budget must be at least $100';
    }

    // Date validation
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (formData.startDate) {
      const startDate = new Date(formData.startDate);
      if (startDate < today) {
        tempErrors.startDate = 'Start date cannot be in the past';
      }
    }

    if (formData.endDate) {
      const endDate = new Date(formData.endDate);
      if (endDate < today) {
        tempErrors.endDate = 'End date cannot be in the past';
      }

      if (formData.startDate && endDate <= new Date(formData.startDate)) {
        tempErrors.endDate = 'End date must be after start date';
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          companyName: '',
          phone: '',
          email: '',
          address: '',
          totalNumber: '',
          amount: '',
          startDate: '',
          endDate: ''
        });
      }, 3000);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSubmitted) {
    return (
      <div className={styles["trip-request-form"]}>
        <div className={styles["success-message"]}>
          <CheckCircle size={64} />
          <h2>Request Submitted Successfully!</h2>
          <p>Thank you for your trip request. We'll get back to you within 24 hours with a customized itinerary and pricing.</p>
          <div className={styles["success-details"]}>
            <p><strong>Trip Duration:</strong> {formData.startDate} to {formData.endDate}</p>
            <p><strong>Travelers:</strong> {formData.totalNumber} people</p>
            <p><strong>Budget:</strong> ${formData.amount}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["trip-request-form"]}>
      <p className={styles.subtitle}>Request your Trip</p>
      <h2 className={styles.title}>Request the trip on your own choice</h2>

      <form onSubmit={handleSubmit}>
        <h3>Create a Trip</h3>
        <div className={styles["form-grid"]}>
          <div className={styles["form-field"]}>
            <label htmlFor="companyName">
              <Building size={18} />
              Company/Organization Name *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter your company or organization name"
              className={errors.companyName ? styles.error : ''}
            />
            {errors.companyName && (
              <span className={styles["error-message"]}>
                <AlertCircle size={16} />
                {errors.companyName}
              </span>
            )}
          </div>

          <div className={styles["form-field"]}>
            <label htmlFor="phone">
              <Phone size={18} />
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+250784800280"
              className={errors.phone ? styles.error : ''}
            />
            {errors.phone && (
              <span className={styles["error-message"]}>
                <AlertCircle size={16} />
                {errors.phone}
              </span>
            )}
          </div>

          <div className={styles["form-field"]}>
            <label htmlFor="email">
              <Mail size={18} />
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={errors.email ? styles.error : ''}
            />
            {errors.email && (
              <span className={styles["error-message"]}>
                <AlertCircle size={16} />
                {errors.email}
              </span>
            )}
          </div>

          <div className={styles["form-field"]}>
            <label htmlFor="address">
              <MapPin size={18} />
              Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your full address"
              className={errors.address ? styles.error : ''}
            />
            {errors.address && (
              <span className={styles["error-message"]}>
                <AlertCircle size={16} />
                {errors.address}
              </span>
            )}
          </div>

          <div className={styles["form-field"]}>
            <label htmlFor="totalNumber">
              <Users size={18} />
              Number of Travelers *
            </label>
            <input
              type="number"
              id="totalNumber"
              name="totalNumber"
              value={formData.totalNumber}
              onChange={handleChange}
              placeholder="How many people?"
              min="1"
              max="50"
              className={errors.totalNumber ? styles.error : ''}
            />
            {errors.totalNumber && (
              <span className={styles["error-message"]}>
                <AlertCircle size={16} />
                {errors.totalNumber}
              </span>
            )}
          </div>

          <div className={styles["form-field"]}>
            <label htmlFor="amount">
              <DollarSign size={18} />
              Budget (USD) *
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Your budget in USD"
              min="100"
              step="50"
              className={errors.amount ? styles.error : ''}
            />
            {errors.amount && (
              <span className={styles["error-message"]}>
                <AlertCircle size={16} />
                {errors.amount}
              </span>
            )}
          </div>

          <div className={styles["form-field"]}>
            <label htmlFor="startDate">
              <Calendar size={18} />
              Start Date *
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={getTodayDate()}
              className={errors.startDate ? styles.error : ''}
            />
            {errors.startDate && (
              <span className={styles["error-message"]}>
                <AlertCircle size={16} />
                {errors.startDate}
              </span>
            )}
          </div>

          <div className={styles["form-field"]}>
            <label htmlFor="endDate">
              <Calendar size={18} />
              End Date *
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={getMinEndDate()}
              className={errors.endDate ? styles.error : ''}
            />
            {errors.endDate && (
              <span className={styles["error-message"]}>
                <AlertCircle size={16} />
                {errors.endDate}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={styles["submit-btn"]}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className={styles.spinner}></div>
              Submitting Request...
            </>
          ) : (
            <>
              <CheckCircle size={20} />
              Submit Trip Request
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TripRequest;
