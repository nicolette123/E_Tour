"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/signup.module.scss"; // You can rename your Signup.css to signup.module.scss

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faEye,
  faLanguage,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    language: "",
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
    <div className={styles["signup-page"]}>
      <div
        className={styles["left-side"]}
        style={{ backgroundImage: "url('/bgImage.png')" }} // Image from /public
      >
        <div className={styles.overlay}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={400}
            height={100}
            className={styles.logo}
          />
        </div>
      </div>

      <div className={styles["right-side"]}>
        <form onSubmit={handleSubmit} className={styles["signup-form"]}>
          <h2>Start Your Journey with Us</h2>
          <p>
            Create your account to plan personalized itineraries, book
            unforgettable attractions, and connect with travelers around Rwanda.
            Whether you're exploring public spots or discovering hidden gems,
            everything starts here.
          </p>

          <label htmlFor="firstname">First Name</label>
          <div className={styles["input-group"]}>
            <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
            />
          </div>

          <label htmlFor="email">E-mail Address</label>
          <div className={styles["input-group"]}>
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={handleChange}
            />
          </div>

          <label htmlFor="phone">Phone number</label>
          <div className={`${styles["input-group"]} ${styles["phone-wrapper"]}`}>
            <span role="img" aria-label="flag">
              🇷🇼
            </span>
            <select name="countryCode" defaultValue="+25">
              <option value="+25">+25</option>
              <option value="+254">+254</option>
            </select>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className={`${styles["input-group"]} ${styles["password-wrapper"]}`}>
            <FontAwesomeIcon icon={faLock} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={faEye}
              className={styles["toggle-icon"]}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <label htmlFor="confirm">Confirm Password</label>
          <div className={`${styles["input-group"]} ${styles["password-wrapper"]}`}>
            <FontAwesomeIcon icon={faLock} />
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={faEye}
              className={styles["toggle-icon"]}
              onClick={() => setShowConfirm(!showConfirm)}
            />
          </div>

          <label htmlFor="language">Preferred Language</label>
          <div className={styles["input-group"]}>
            <FontAwesomeIcon icon={faLanguage} />
            <select name="language" onChange={handleChange}>
              <option value="">Preferred Language</option>
              <option value="English">English</option>
              <option value="Kinyarwanda">Kinyarwanda</option>
            </select>
          </div>

          <label htmlFor="profile">Profile Photo</label>
          <div className={`${styles["input-group"]} ${styles["file-input"]}`}>
            <FontAwesomeIcon icon={faUpload} />
            <input type="file" name="profilePhoto" onChange={handleChange} />
          </div>

          <p className={styles["terms"]}>
            By creating an account, you agree to our{" "}
            <a href="#">Terms of service</a> and{" "}
            <a href="#">privacy policy</a>
          </p>

          <button type="submit" className={styles["submit-btn"]}>
            Register - start your journey
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
