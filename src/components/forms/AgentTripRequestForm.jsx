import React, { useState } from 'react';
import styles from '@/components/styles/AgentTripRequestForm.module.scss';
import { FaCloudUploadAlt } from 'react-icons/fa';

const AgentTripRequestForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    email: '',
    address: '',
    totalNumber: '',
    amount: '',
    startDate: '',
    endDate: '',
  });

  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!image) tempErrors.image = 'Image required';
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
      alert('Agent trip form submitted successfully!');
      console.log(formData, image);
    }
  };

  return (
   <div className={styles['agent-trip-request-form']}>

      <p className={styles.subtitle}>Create a Trip</p>
     
      {/* Image Upload Section */}
      <div className={styles['image-upload-wrapper']}>
        <label htmlFor="imageUpload" className={styles['image-upload-label']}>
          <FaCloudUploadAlt size={40} color="#367C2D" />
          <span>Drag & drop Image or  <u>Browse</u></span>
          <span>Supported formats: JPEG,PNG,GIF</span>

          <input type="file" id="imageUpload" accept="image/*" onChange={handleImageChange} required />
        </label>
        {preview && <img src={preview} alt="Preview" className={styles.preview} />}
        {errors.image && <span className={styles.error}>{errors.image}</span>}
      </div>

      <form onSubmit={handleSubmit}>
       
        <div className={styles['form-grid']}>
          <div className={styles['form-field']}>
            <label htmlFor="company">Company Name</label>
            <input type="text" id="company" name="companyName" onChange={handleChange} />
          </div>
          <div className={styles['form-field']}>
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" name="phone" onChange={handleChange} />
          </div>
          <div className={styles['form-field']}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={handleChange} />
          </div>
          <div className={styles['form-field']}>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" onChange={handleChange} />
          </div>
          <div className={styles['form-field']}>
            <label htmlFor="totalNumber">Total Number</label>
            <input type="number" id="totalNumber" name="totalNumber" onChange={handleChange} />
          </div>
          <div className={styles['form-field']}>
            <label htmlFor="amount">Amount of Money</label>
            <input type="text" id="amount" name="amount" onChange={handleChange} />
          </div>
          <div className={styles['form-field']}>
            <label htmlFor="startDate">Start Date</label>
            <input type="date" id="startDate" name="startDate" onChange={handleChange} />
          </div>
          <div className={styles['form-field']}>
            <label htmlFor="endDate">End Date</label>
            <input type="date" id="endDate" name="endDate" onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className={styles['submit-btn']}>Submit</button>
      </form>
    </div>
  );
};

export default AgentTripRequestForm;
