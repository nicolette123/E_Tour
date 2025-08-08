"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./settings.css";

const mockProfile = {
  name: "Jane Uwase",
  email: "jane.uwase@rwandatravel.com",
  number: "+250780123456",
  avatar: "https://i.pravatar.cc/100?img=5",
};

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setProfile(mockProfile);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleEditProfile = () => {
    router.push("/edit-profile");
  };

  const handleLogout = () => {
    // Simulate logout (replace with actual auth logic)
    alert("Logging out...");
    router.push("/login");
  };

  return (
    <div className="settings-dashboard">
      <h1 className="dashboard-title">Profile Settings</h1>

      <div className="settings-container">
        <h2 className="section-title">
          <i className="ri-user-settings-line"></i> Profile
        </h2>

        {profile ? (
          <div className="profile-card">
            <div className="profile-header">
              <img
                src={profile.avatar}
                alt="User Avatar"
                className="profile-avatar"
                onError={(e) => (e.target.src = "/default-avatar.png")} // Fallback image
              />
              <div className="profile-info">
                <h3 className="profile-name">{profile.name}</h3>
                <p className="profile-email">{profile.email}</p>
                <p className="profile-number">{profile.number}</p>
              </div>
            </div>
            <div className="profile-actions">
              <button className="action-btn edit" onClick={handleEditProfile}>
                <i className="ri-edit-line"></i> Edit Profile
              </button>
              <button className="action-btn logout" onClick={handleLogout}>
                <i className="ri-logout-box-line"></i> Log Out
              </button>
            </div>
          </div>
        ) : (
          <div className="loading">Loading profile...</div>
        )}
      </div>
    </div>
  );
};

export default Settings;