'use client';

import React, { useState } from 'react';
import styles from '@/components/styles/AgentTripRequestForm.module.scss';
import { MdCloudUpload } from 'react-icons/md';

const AgentTripRequestForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    itinerary: '',
    price: '',
    maxSeats: '',
    location: '',
    startDate: '',
    endDate: '',
    image: null,
    imagePreview: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    const requiredFields = ['title', 'price', 'maxSeats', 'location', 'startDate', 'endDate'];
    requiredFields.forEach((field) => {
      if (!formData[field]) tempErrors[field] = 'Required';
    });
    if (!formData.image) tempErrors.image = 'Image is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const payload = {
      title: formData.title,
      description: formData.description,
      itinerary: formData.itinerary,
      price: Number(formData.price),
      maxSeats: Number(formData.maxSeats),
      location: formData.location,
      startDate: formData.startDate,
      endDate: formData.endDate,
      images: [formData.imagePreview]
    };

    try {
      const response = await fetch('https://echoes-of-rwanda.onrender.com/api/v1/agent/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Submission failed');
      alert('Trip submitted successfully!');
      setFormData({
        title: '',
        description: '',
        itinerary: '',
        price: '',
        maxSeats: '',
        location: '',
        startDate: '',
        endDate: '',
        image: null,
        imagePreview: ''
      });
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles['agent-trip-request-form']}>
      <h3>Submit a Trip as an Agent</h3>

      <form onSubmit={handleSubmit}>
        <div className={styles['form-grid']}>
          <div className={styles['form-field']}>
            <label>Trip Title</label>
            <input name="title" value={formData.title} onChange={handleChange} />
            {errors.title && <div className={styles.error}>{errors.title}</div>}
          </div>

          <div className={styles['form-field']}>
            <label>Price</label>
            <input name="price" type="number" value={formData.price} onChange={handleChange} />
            {errors.price && <div className={styles.error}>{errors.price}</div>}
          </div>

          <div className={styles['form-field']}>
            <label>Max Seats</label>
            <input name="maxSeats" type="number" value={formData.maxSeats} onChange={handleChange} />
            {errors.maxSeats && <div className={styles.error}>{errors.maxSeats}</div>}
          </div>

          <div className={styles['form-field']}>
            <label>Location</label>
            <input name="location" value={formData.location} onChange={handleChange} />
            {errors.location && <div className={styles.error}>{errors.location}</div>}
          </div>

          <div className={styles['form-field']}>
            <label>Start Date</label>
            <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
            {errors.startDate && <div className={styles.error}>{errors.startDate}</div>}
          </div>

          <div className={styles['form-field']}>
            <label>End Date</label>
            <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} />
            {errors.endDate && <div className={styles.error}>{errors.endDate}</div>}
          </div>
        </div>

       <div className={styles['form-field']}>
  <label>Description</label>
  <textarea name="description" value={formData.description} onChange={handleChange} rows={4} />
</div>

<div className={styles['form-field']}>
  <label>Itinerary</label>
  <textarea name="itinerary" value={formData.itinerary} onChange={handleChange} rows={4} />
</div>


        <div className={styles['image-upload-wrapper']}>
          <label className={styles['image-upload-label']}>
            <MdCloudUpload size={60} color="#2e7d32" />
            <span>Click to upload image</span>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          {errors.image && <div className={styles.error}>{errors.image}</div>}
          {formData.imagePreview && (
            <img src={formData.imagePreview} alt="Preview" className={styles.preview} />
          )}
        </div>

        <button type="submit" className={styles['submit-btn']} disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Trip'}
        </button>
      </form>
    </div>
  );
};

export default AgentTripRequestForm;
