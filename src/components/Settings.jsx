'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router
import SideBar from './SideBar';
import TopBar from './TopBar';
import "@/styles/dashboard.css";
import "@/styles/setting.css";

// Simulated mock data
const mockProfile = {
  name: "Jane Doe",
  email: "janedoe@example.com",
  number: "+1234567890",
  avatar: "https://i.pravatar.cc/100?img=5",
};

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const router = useRouter(); // Use Next.js router hook

  useEffect(() => {
    // Simulate fetching profile (mock)
    const timer = setTimeout(() => {
      setProfile(mockProfile);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleEditProfile = () => {
    router.push('/edit-profile', { state: { profile } }); // Use router.push for navigation
  };

  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="main-content">
        <TopBar title="Profile" />
        <div className="content-body">
          <h3 className="section-title">Profile</h3>

          {profile ? (
            <div className="profile-card">
              <div className="profile-header">
                <img
                  src={profile.avatar}
                  alt="User Avatar"
                  className="profile-avatar"
                />
                <div className="profile-info">
                  <h4 className="profile-name">{profile.name}</h4>
                </div>
              </div>

              <div className="profile-details">
                <div className="profile-field">
                  <p>{profile.email}</p>
                  <p className="profile-role">{profile.number}</p>
                </div>
                <div className='buttons'>
                  <button className='button1' onClick={handleEditProfile}>
                    Edit Profile
                  </button>
                  <button className='button2'>
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;