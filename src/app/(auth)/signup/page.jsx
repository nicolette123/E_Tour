'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '../../../services/api';
import { LoadingSpinner, ErrorMessage, SuccessMessage } from '../../../components/common/ApiComponents';
import '../../../styles/signup.css';

const UserRegister = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    receiveNotifications: true,
    agreeToTerms: false,
    isAgent: false,
    companyName: '',
    location: '',
    role: 'client',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVerificationButton, setShowVerificationButton] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const goToVerification = () => {
    console.log('🔄 Navigating to verification page...');
    
    // Double-check localStorage before navigating
    const storedUserId = localStorage.getItem('userId');
    const storedUserEmail = localStorage.getItem('userEmail');
    
    console.log('🔄 Pre-navigation localStorage check:', {
      userId: storedUserId,
      userEmail: storedUserEmail
    });
    
    if (!storedUserId) {
      console.error('❌ Critical: No userId in localStorage before navigation!');
      alert('Error: User data not saved. Please try registration again.');
      return;
    }
    
    try {
      router.push('/verification');
      console.log('✅ Router.push called successfully');
    } catch (error) {
      console.error('❌ Router.push failed:', error);
      // Fallback: use window.location if router fails
      try {
        window.location.href = '/verification';
        console.log('✅ Window.location fallback used');
      } catch (fallbackError) {
        console.error('❌ Window.location fallback also failed:', fallbackError);
        alert('Unable to redirect automatically. Please go to the verification page manually.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'isAgent' && { role: checked ? 'agent' : 'client' }),
    }));

    // Real-time validation
    if (name === 'email' && value && !validateEmail(value)) {
      setError('Please enter a valid email address');
    } else if (name === 'email' && error === 'Please enter a valid email address') {
      setError('');
    }

    if (name === 'confirmPassword' && value !== formData.password) {
      setError('Passwords do not match');
    } else if (name === 'confirmPassword' && value === formData.password && error === 'Passwords do not match') {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setShowVerificationButton(false);
    setLoading(true);

    // Enhanced validation
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a number.');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms and Privacy Policy');
      setLoading(false);
      return;
    }

    if (formData.isAgent && (!formData.companyName.trim() || !formData.location.trim())) {
      setError('Please fill in both company name and location for agent registration');
      setLoading(false);
      return;
    }

    // Prepare payload according to API documentation
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: formData.role,
      notificationsEnabled: formData.receiveNotifications,
      agreedToTerms: formData.agreeToTerms,
      ...(formData.isAgent && {
        companyName: formData.companyName.trim(),
        location: formData.location.trim(),
      }),
    };

    try {
      console.log('Submitting registration with payload:', { ...payload, password: '[HIDDEN]' });

      const response = await api.auth.signup(payload);

      if (response.success) {
        console.log('Full registration response:', response);

        // FIXED: Handle the nested response structure where user data is at response.data.user
        let userData;
        
        // Check if the response has the new nested structure
        if (response.data && response.data.user) {
          console.log('✅ Using nested user structure from response.data.user');
          userData = response.data.user;
        } else if (response.data && response.data.id) {
          console.log('✅ Using direct structure from response.data');
          userData = response.data;
        } else {
          console.error('❌ Unknown response structure');
          console.log('Full response structure:', JSON.stringify(response, null, 2));
          setError('Registration completed but user data structure is unexpected. Please contact support.');
          setLoading(false);
          return;
        }

        // Extract user information from the correct location
        const userId = userData.id;
        const userEmail = userData.email;
        const userName = userData.name;
        const emailVerified = userData.emailVerified;
        const emailSent = userData.emailSent;

        console.log('Extracted user data:', { 
          userId, 
          userEmail, 
          userName, 
          emailVerified,
          emailSent,
          userDataSource: response.data.user ? 'response.data.user' : 'response.data'
        });

        // Validate that we have the required data
        if (!userId) {
          console.error('❌ No userId found in registration response!');
          console.log('Full response structure:', JSON.stringify(response, null, 2));
          console.log('UserData object:', userData);
          console.log('Available keys in userData:', Object.keys(userData || {}));
          setError('Registration completed but user ID is missing. Please contact support.');
          setLoading(false);
          return;
        }

        if (!userEmail) {
          console.error('❌ No userEmail found in registration response!');
          setError('Registration completed but email is missing. Please contact support.');
          setLoading(false);
          return;
        }

        // Test localStorage before storing
        try {
          localStorage.setItem('test', 'test');
          localStorage.removeItem('test');
          console.log('✅ localStorage is accessible');
        } catch (storageError) {
          console.error('❌ localStorage not accessible:', storageError);
          setError('Cannot store user data locally. Please check browser settings.');
          setLoading(false);
          return;
        }

        // Store user information for verification process
        try {
          localStorage.setItem('userId', userId);
          localStorage.setItem('userEmail', userEmail);
          localStorage.setItem('userName', userName || '');
          localStorage.setItem('pendingVerification', 'true');
          
          // Verify storage worked
          const storedUserId = localStorage.getItem('userId');
          const storedUserEmail = localStorage.getItem('userEmail');
          const storedUserName = localStorage.getItem('userName');
          
          console.log('✅ Storage verification:', {
            storedUserId,
            storedUserEmail,
            storedUserName,
            userIdMatches: storedUserId === userId,
            emailMatches: storedUserEmail === userEmail
          });
          
          if (storedUserId !== userId) {
            throw new Error('Failed to verify userId storage');
          }
          
          if (storedUserEmail !== userEmail) {
            throw new Error('Failed to verify userEmail storage');
          }
          
        } catch (storageError) {
          console.error('❌ Failed to store data:', storageError);
          setError('Failed to store user data. Please try again.');
          setLoading(false);
          return;
        }

        // Show success message with registration details
        const successMessage = response.data.message || 'Registration successful! Please check your email for verification instructions.';
        setSuccess(successMessage);
        setShowVerificationButton(true);
        
        console.log('✅ Registration successful, showing verification button and auto-redirect...');

        // Show countdown and redirect to verification page
        let countdown = 5;
        const countdownInterval = setInterval(() => {
          countdown--;
          if (countdown > 0) {
            setSuccess(`${successMessage} Redirecting to verification page in ${countdown} seconds... (or click the button below)`);
          } else {
            clearInterval(countdownInterval);
            setSuccess('Redirecting to verification page now...');
          }
        }, 1000);

        // Redirect to verification page after showing success message
        setTimeout(() => {
          clearInterval(countdownInterval);
          console.log('🔄 Auto-redirecting to verification page now...');
          goToVerification();
        }, 5000);
        
      } else {
        setError(response.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);

      let errorMessage = 'Registration failed. Please try again.';

      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || err.message;

        switch (status) {
          case 400:
            errorMessage = message || 'Invalid input. Please check your details.';
            break;
          case 409:
            errorMessage = 'Email already exists. Please use a different email or log in.';
            break;
          case 422:
            errorMessage = message || 'Validation failed. Please check your input.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later or contact support.';
            break;
          default:
            errorMessage = message || 'Registration failed. Please try again.';
        }
      } else if (err.request) {
        if (err.message && (err.message.includes('CORS') || err.message.includes('ERR_FAILED'))) {
          errorMessage = 'Server connection issue. Please ensure you\'re running the app on http://localhost:3000 or try refreshing the page.';
        } else {
          errorMessage = 'Unable to reach the server. Please check your internet connection.';
        }
      } else {
        errorMessage = err.message || 'An unexpected error occurred. Please try again.';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-image">
        <div className="transparent"></div>
        <h1>Echoes of Rwanda</h1>
      </div>
      <div className="register-form">
        <h1>Register your account</h1>

        <ErrorMessage error={error} className="mb-4" />
        <SuccessMessage message={success} className="mb-4" />

        {/* Manual verification button */}
        {showVerificationButton && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button
              type="button"
              onClick={goToVerification}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
            >
              Go to Verification Page Now
            </button>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
              Click the button above if automatic redirect doesn't work
            </p>
          </div>
        )}

        {/* Development Debug Panel */}
        {process.env.NODE_ENV === 'development' && (
          <div style={{ 
            background: '#f8f9fa', 
            border: '1px solid #dee2e6',
            padding: '15px', 
            margin: '15px 0', 
            fontSize: '12px', 
            borderRadius: '4px',
            fontFamily: 'monospace'
          }}>
            <strong>🔧 Debug Info (Development Only):</strong><br />
            <div style={{ marginTop: '10px' }}>
              <div>Form Valid: {formData.agreeToTerms && validateEmail(formData.email) && formData.password.length >= 8 ? 'Yes' : 'No'}</div>
              <div>Email Valid: {validateEmail(formData.email) ? 'Yes' : 'No'}</div>
              <div>Password Strong: {/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password) ? 'Yes' : 'No'}</div>
              <div>Passwords Match: {formData.password === formData.confirmPassword ? 'Yes' : 'No'}</div>
              <div>Terms Agreed: {formData.agreeToTerms ? 'Yes' : 'No'}</div>
              <div>Is Agent: {formData.isAgent ? 'Yes' : 'No'}</div>
              <div>Role: {formData.role}</div>
            </div>
            
            <button
              type="button"
              onClick={() => {
                console.log('🧪 Current localStorage state:');
                for (let i = 0; i < localStorage.length; i++) {
                  const key = localStorage.key(i);
                  const value = localStorage.getItem(key);
                  console.log(`  ${key}: ${value}`);
                }
                console.log('🧪 Current form data:', { ...formData, password: '[HIDDEN]', confirmPassword: '[HIDDEN]' });
              }}
              style={{ 
                fontSize: '10px', 
                padding: '4px 8px',
                backgroundColor: '#17a2b8',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                marginTop: '10px'
              }}
            >
              Log Debug Info
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="same-row">
            <div className="name-inputs">
              <label htmlFor="name">Full Name</label>
              <br />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="name-inputs">
              <label htmlFor="email">E-mail Address</label>
              <br />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className="same-row">
            <div className="name-inputs">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="name-inputs">
              <label htmlFor="confirm-password">Confirm Password</label>
              <br />
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>
          {formData.isAgent && (
            <div className="same-row">
              <div className="name-inputs">
                <label htmlFor="companyName">Company Name</label>
                <br />
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              <div className="name-inputs">
                <label htmlFor="location">Location</label>
                <br />
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter your location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>
          )}
          <div className="checkboxes">
            <label>
              <input
                type="checkbox"
                name="isAgent"
                checked={formData.isAgent}
                onChange={handleChange}
                disabled={loading}
              />{' '}
              Are you an Agent?
            </label>
            <label>
              <input
                type="checkbox"
                name="receiveNotifications"
                checked={formData.receiveNotifications}
                onChange={handleChange}
                disabled={loading}
              />{' '}
              Yes, I want to receive notifications.
            </label>
            <label>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                disabled={loading}
              />{' '}
              I agree to all the Terms, Privacy Policy
            </label>
          </div>
          <div className="create-account">
            <button type="submit" disabled={loading} aria-busy={loading} className="flex items-center justify-center">
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Registering...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
        <div className="login">
          <h3>
            Already have an Account? <Link href="/login">Login</Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;