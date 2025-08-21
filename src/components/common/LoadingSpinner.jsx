// Modern Loading Spinner Component
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  text = 'Loading...', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  };

  const colorClasses = {
    primary: 'spinner-primary',
    secondary: 'spinner-secondary',
    accent: 'spinner-accent',
    white: 'spinner-white'
  };

  const spinnerClass = `loading-spinner ${sizeClasses[size]} ${colorClasses[color]}`;
  const containerClass = `spinner-container ${fullScreen ? 'fullscreen' : ''}`;

  return (
    <div className={containerClass}>
      <div className="spinner-content">
        <div className={spinnerClass}>
          <div className="spinner-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        {text && <p className="spinner-text">{text}</p>}
      </div>
    </div>
  );
};

// Skeleton Loading Component
export const SkeletonLoader = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px',
  className = '' 
}) => {
  return (
    <div 
      className={`skeleton-loader ${className}`}
      style={{ 
        width, 
        height, 
        borderRadius 
      }}
    />
  );
};

// Card Skeleton
export const CardSkeleton = () => {
  return (
    <div className="card-skeleton">
      <SkeletonLoader height="200px" borderRadius="12px" className="skeleton-image" />
      <div className="skeleton-content">
        <SkeletonLoader height="24px" width="80%" className="skeleton-title" />
        <SkeletonLoader height="16px" width="60%" className="skeleton-subtitle" />
        <div className="skeleton-actions">
          <SkeletonLoader height="40px" width="120px" borderRadius="20px" />
          <SkeletonLoader height="40px" width="80px" borderRadius="20px" />
        </div>
      </div>
    </div>
  );
};

// Button Loading State
export const ButtonLoader = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'btn-spinner-small',
    medium: 'btn-spinner-medium',
    large: 'btn-spinner-large'
  };

  return (
    <div className={`btn-loading-spinner ${sizeClasses[size]}`}>
      <div className="btn-spinner-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
