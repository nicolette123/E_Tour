"use client";
import React, { useState } from 'react';
import './Signup.css';
import bgImage from './assets/bgImage.png';
import logo from './assets/logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faEye,
  faLanguage,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    language: '',
    profilePhoto: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="signup-page">
      
      <div className="left-side" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="overlay">
          <img src={logo} alt="Logo" className="logo" />
          
        </div>
      </div>

    
      <div className="right-side">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Start Your Journey with Us</h2>
          <p>Create your account to plan personalized itineraries, book unforgettable attractions, and connect with travelers around Rwanda. Whether you're exploring public spots or discovering hidden gems, everything starts here.</p>

         <label htmlFor="firstname">First Name</label>

          <div className="input-group">
            <FontAwesomeIcon icon={faUser} />
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
          </div>

          <label htmlFor="email">E-mail Address</label>
          <div className="input-group">
            <FontAwesomeIcon icon={faEnvelope} />
            <input type="email" name="email" placeholder="Your Email" onChange={handleChange} />
          </div>

        <label htmlFor="phone">Phone number</label>
          <div className="input-group phone-wrapper">
            <span role="img" aria-label="flag">🇷🇼</span>
            <select name="countryCode" defaultValue="+25">
              <option value="+25">+25</option>
              <option value="+254">+254</option>
            </select>
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />
          </div>

          <label htmlFor="password">Password</label>
          <div className="input-group password-wrapper">
            <FontAwesomeIcon icon={faLock} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={faEye}
              className="toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <label htmlFor="confirm">Confirm Password</label>
          <div className="input-group password-wrapper">
            <FontAwesomeIcon icon={faLock} />
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={faEye}
              className="toggle-icon"
              onClick={() => setShowConfirm(!showConfirm)}
            />
          </div>

          <label htmlFor="language">Preferred Language</label>
          <div className="input-group">
            <FontAwesomeIcon icon={faLanguage} />
            <select name="language" onChange={handleChange}>
              <option value="">Preferred Language</option>
              <option value="English">English</option>
              <option value="Kinyarwanda">Kinyarwanda</option>
            </select>
          </div>

          <label htmlFor="profile">Profile Photo</label>
          <div className="input-group file-input">
            <FontAwesomeIcon icon={faUpload} />
            <input type="file" name="profilePhoto" onChange={handleChange} />
          </div>

          <p className="terms">
            By creating an account, you agree to our <a href="#">Terms of service</a> and <a href="#">privacy policy</a>
          </p>

          <button type="submit" className="submit-btn">Register - start your journey</button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
 