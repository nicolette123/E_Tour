'use client';

import React, { useState } from 'react';
import { Calendar, Users, DollarSign, MapPin, Phone, Mail, Building, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import styles from './TripRequest.module.scss';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useApi';

const TripRequest = () => {
  const { isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    email: '',
    address: '',
    destination: '',
    budget: '',
    interests: '',
    preferredStartDate: '',
    preferredEndDate: '',
    groupSize: '',
    clientNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMinEndDate = () => {
    if (!formData.preferredStartDate) return getTodayDate();
    const startDate = new Date(formData.preferredStartDate);
    startDate.setDate(startDate.getDate() + 1);
    return startDate.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.destination.trim()) tempErrors.destination = 'Destination is required';
    if (!formData.groupSize) tempErrors.groupSize = 'Number of travelers is required';
    if (!formData.budget.trim()) tempErrors.budget = 'Budget amount is required';
    if (!formData.preferredStartDate) tempErrors.preferredStartDate = 'Start date is required';
    if (!formData.preferredEndDate) tempErrors.preferredEndDate = 'End date is required';

    if (formData.groupSize && (parseInt(formData.groupSize) < 1 || parseInt(formData.groupSize) > 50)) {
      tempErrors.groupSize = 'Number of travelers must be between 1 and 50';
    }

    if (formData.budget && (parseFloat(formData.budget) < 100)) {
      tempErrors.budget = 'Budget must be at least $100';
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (formData.preferredStartDate) {
      const startDate = new Date(formData.preferredStartDate);
      if (startDate < today) {
        tempErrors.preferredStartDate = 'Start date cannot be in the past';
      }
    }

    if (formData.preferredEndDate) {
      const endDate = new Date(formData.preferredEndDate);
      if (endDate < today) {
        tempErrors.preferredEndDate = 'End date cannot be in the past';
      }

      if (formData.preferredStartDate && endDate <= new Date(formData.preferredStartDate)) {
        tempErrors.preferredEndDate = 'End date must be after start date';
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

    if (!isAuthenticated) {
      setSubmitMessage('Please click on Get Started to log in and submit your request.');
      return;
    }

    setIsSubmitting(true);

    try {
      const apiPayload = {
        destination: formData.destination,
        budget: parseFloat(formData.budget),
        interests: formData.interests || undefined,
        preferredStartDate: formData.preferredStartDate,
        preferredEndDate: formData.preferredEndDate,
        groupSize: parseInt(formData.groupSize),
        clientNotes: `Company: ${formData.companyName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAddress: ${formData.address}\n\nAdditional Notes: ${formData.clientNotes || 'None'}`
      };

      const response = await api.trip.createCustomTripRequest(apiPayload);

      if (response.success) {
        console.log('Trip request submitted successfully:', response);
        setIsSubmitted(true);
        setSubmitMessage('You will receive an email that your trip has been received.');
      } else {
        throw new Error(response.message || 'Failed to submit trip request');
      }

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          companyName: '',
          phone: '',
          email: '',
          address: '',
          destination: '',
          budget: '',
          interests: '',
          preferredStartDate: '',
          preferredEndDate: '',
          groupSize: '',
          clientNotes: ''
        });
      }, 5000);

    } catch (error) {
      console.error('Error submitting trip request:', error);
      const errorMessage = error.message || 'There was an error submitting your request. Please try again.';
      alert(`Error: ${errorMessage}`);
      if (error.response?.status === 401) {
        alert('Please log in to submit a trip request.');
        // window.location.href = '/login';
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles["trip-request-form"]}>
        <div className={styles["success-message"]}>
          <CheckCircle size={64} />
          <h2>Request Submitted Successfully!</h2>
          <p>Thank you for your trip request. We'll get back to you within 24 hours with a customized itinerary and pricing.</p>
          <div className={styles["success-details"]}>
            <p><strong>Destination:</strong> {formData.destination}</p>
            <p><strong>Trip Duration:</strong> {formData.preferredStartDate} to {formData.preferredEndDate}</p>
            <p><strong>Travelers:</strong> {formData.groupSize} people</p>
            <p><strong>Budget:</strong> ${formData.budget}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["trip-request-form"]}>
      <p className={styles.subtitle}>Request your Trip</p>
      <h2 className={styles.title}>Request the trip on your own choice</h2>

      {submitMessage && (
        <div className={styles["submit-message"]}>
          {submitMessage}
          {!isAuthenticated && (
            <button onClick={() => window.location.href = '/login'} className={styles["get-started-btn"]}>
              Get Started
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h3>Create a Custom Trip Request</h3>

        <div className={styles["form-section"]}>
          <h4>Trip Details</h4>
          <div className={styles["form-grid"]}>
            <div className={styles["form-field"]}>
              <label htmlFor="destination">
                <MapPin size={18} />
                Destination *
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Where would you like to go? (e.g., Volcanoes National Park)"
                className={errors.destination ? styles.error : ''}
              />
              {errors.destination && (
                <span className={styles["error-message"]}>
                  <AlertCircle size={16} />
                  {errors.destination}
                </span>
              )}
            </div>

            <div className={styles["form-field"]}>
              <label htmlFor="budget">
                <DollarSign size={18} />
                Budget (USD) *
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Your budget in USD"
                min="100"
                step="50"
                className={errors.budget ? styles.error : ''}
              />
              {errors.budget && (
                <span className={styles["error-message"]}>
                  <AlertCircle size={16} />
                  {errors.budget}
                </span>
              )}
            </div>

            <div className={styles["form-field"]}>
              <label htmlFor="groupSize">
                <Users size={18} />
                Number of Travelers *
              </label>
              <input
                type="number"
                id="groupSize"
                name="groupSize"
                value={formData.groupSize}
                onChange={handleChange}
                placeholder="How many people?"
                min="1"
                max="50"
                className={errors.groupSize ? styles.error : ''}
              />
              {errors.groupSize && (
                <span className={styles["error-message"]}>
                  <AlertCircle size={16} />
                  {errors.groupSize}
                </span>
              )}
            </div>

            <div className={styles["form-field"]}>
              <label htmlFor="interests">
                <FileText size={18} />
                Interests & Activities
              </label>
              <input
                type="text"
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="e.g., Gorilla trekking, cultural tours, hiking"
              />
            </div>

            <div className={styles["form-field"]}>
              <label htmlFor="preferredStartDate">
                <Calendar size={18} />
                Preferred Start Date *
              </label>
              <input
                type="date"
                id="preferredStartDate"
                name="preferredStartDate"
                value={formData.preferredStartDate}
                onChange={handleChange}
                min={getTodayDate()}
                className={errors.preferredStartDate ? styles.error : ''}
              />
              {errors.preferredStartDate && (
                <span className={styles["error-message"]}>
                  <AlertCircle size={16} />
                  {errors.preferredStartDate}
                </span>
              )}
            </div>

            <div className={styles["form-field"]}>
              <label htmlFor="preferredEndDate">
                <Calendar size={18} />
                Preferred End Date *
              </label>
              <input
                type="date"
                id="preferredEndDate"
                name="preferredEndDate"
                value={formData.preferredEndDate}
                onChange={handleChange}
                min={getMinEndDate()}
                className={errors.preferredEndDate ? styles.error : ''}
              />
              {errors.preferredEndDate && (
                <span className={styles["error-message"]}>
                  <AlertCircle size={16} />
                  {errors.preferredEndDate}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={styles["form-section"]}>
          <h4>Contact Information</h4>
          <div className={styles["form-grid"]}>
            <div className={styles["form-field"]}>
              <label htmlFor="companyName">
                <Building size={18} />
                Company/Organization Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter your company or organization name"
              />
            </div>

            <div className={styles["form-field"]}>
              <label htmlFor="phone">
                <Phone size={18} />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+250784800280"
              />
            </div>

            <div className={styles["form-field"]}>
              <label htmlFor="email">
                <Mail size={18} />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
              />
            </div>

            <div className={styles["form-field"]}>
              <label htmlFor="address">
                <MapPin size={18} />
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your full address"
              />
            </div>

            <div className={styles["form-field"]} style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="clientNotes">
                <FileText size={18} />
                Additional Notes
              </label>
              <textarea
                id="clientNotes"
                name="clientNotes"
                value={formData.clientNotes}
                onChange={handleChange}
                placeholder="Any special requests or additional information..."
                rows="4"
                maxLength="1000"
                style={{ resize: 'vertical' }}
              />
              <small style={{ color: '#666', fontSize: '0.85em' }}>
                {formData.clientNotes.length}/1000 characters
              </small>
            </div>
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