'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Use Next.js hooks
import TopBar from './TopBar';
import SideBar from './SideBar';
import "@/styles/dashboard.css";
import '@/styles/setting.css';

const EditProfile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse profile data from query parameters
  const initialProfile = {
    name: searchParams.get('name') || '',
    email: searchParams.get('email') || '',
    number: searchParams.get('number') || '',
    avatar: searchParams.get('avatar') || '',
  };

  const [formData, setFormData] = useState(initialProfile);

  useEffect(() => {
    // Update formData if query parameters change
    setFormData({
      name: searchParams.get('name') || '',
      email: searchParams.get('email') || '',
      number: searchParams.get('number') || '',
      avatar: searchParams.get('avatar') || '',
    });
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated data to an API
    console.log('Updated profile:', formData);
    // Navigate back to settings page after saving
    router.push('/settings');
  };

  return (
    <div className="dashboard-container">
         <SideBar />
      <div className="main-content">
        <TopBar title="Edit Profile" />
        <div className="content-body">
          <i className="ri-arrow-left-s-line"></i><h3 className="section-title">Edit Profile</h3>
          <form onSubmit={handleSubmit} className="profile-form">
            {/* <div className="form-group">
              <label htmlFor="avatar">Avatar URL</label>
              <input
                type="text"
                id="avatar"
                name="avatar"
                value={formData.avatar}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter avatar URL"
              />
              {formData.avatar && (
                <img
                  src={formData.avatar}
                  alt="Preview"
                  className="profile-avatar-preview"
                  style={{ width: '100px', height: '100px', marginTop: '10px' }}
                />
              )}
            </div> */}
            <div className="form-group">
              <label htmlFor="name">Name</label><br />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label><br />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="number">Phone Number</label><br />
              <input
                type="tel"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="button1">
                Save Details
              </button>
              
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;