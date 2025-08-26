'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../../../styles/login.css';

import { api } from '../../../services/api';

const Verification = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        code: '',
    });
    const [userId, setUserId] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userName, setUserName] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasValidSession, setHasValidSession] = useState(false);
    const [forceEnable, setForceEnable] = useState(false);

    // Retrieve user data from localStorage on component mount
    useEffect(() => {
        console.log('🔍 VERIFICATION DEBUG: Starting localStorage check...');
        
        // Check all localStorage items for debugging
        console.log('🔍 All localStorage items:');
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            console.log(`  ${key}: ${value}`);
        }
        
        const storedUserId = localStorage.getItem('userId');
        const storedUserEmail = localStorage.getItem('userEmail');
        const storedUserName = localStorage.getItem('userName');
        const pendingVerification = localStorage.getItem('pendingVerification');

        console.log('🔍 Retrieved from localStorage:', { 
            storedUserId, 
            storedUserEmail,
            storedUserName,
            pendingVerification,
            userIdType: typeof storedUserId,
            userIdLength: storedUserId?.length,
            userIdExists: !!storedUserId
        });

        if (storedUserEmail) {
            setUserEmail(storedUserEmail);
            console.log('✅ Set userEmail:', storedUserEmail);
        }

        if (storedUserName) {
            setUserName(storedUserName);
            console.log('✅ Set userName:', storedUserName);
        }

        if (storedUserId) {
            setUserId(storedUserId);
            setHasValidSession(true);
            console.log('✅ Retrieved userId from localStorage:', storedUserId);
            console.log('✅ UserId is valid UUID format:', /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(storedUserId));
        } else {
            console.log('❌ No userId found in localStorage');
            console.log('❌ StoredUserId value:', storedUserId);
            console.log('❌ StoredUserId type:', typeof storedUserId);
            console.log('❌ Is storedUserId null?', storedUserId === null);
            console.log('❌ Is storedUserId undefined?', storedUserId === undefined);
            console.log('❌ Is storedUserId empty string?', storedUserId === '');
        }

        // Check if user has any verification session
        if (storedUserId || (pendingVerification && storedUserEmail)) {
            setHasValidSession(true);
            if (storedUserId) {
                console.log('✅ Valid verification session found with userId');
            } else {
                console.log('⚠️ Valid verification session found with email only (userId not available)');
                setError('User ID not found from registration. You may need to register again.');
            }
        } else {
            setError('No verification session found. Please register first.');
            console.log('❌ No valid verification session');
        }
    }, []);

    const validateCode = (code) => {
        const codeRegex = /^[a-zA-Z0-9]{6}$/;
        return codeRegex.test(code);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Only allow alphanumeric characters for verification code
        if (name === 'code') {
            const cleanValue = value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6);
            setFormData((prev) => ({
                ...prev,
                [name]: cleanValue.toUpperCase(),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        // Clear error when user starts typing
        if (error && name === 'code' && value) {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Validate code
        if (!validateCode(formData.code)) {
            setError('Verification code must be exactly 6 alphanumeric characters');
            setLoading(false);
            return;
        }

        // Validate that we have userId for verification
        if (!userId) {
            setError('User ID is required for verification but was not found. Please register again.');
            setLoading(false);
            return;
        }

        console.log('🚀 Submitting verification with:', { 
            userId, 
            userEmail, 
            code: formData.code,
            timestamp: new Date().toISOString()
        });

        try {
            // Use userId-based verification (as per API documentation)
            const response = await api.auth.verifyEmail(userId, formData.code);
            
            console.log('📥 Verification API response:', response);

            // Check if verification was successful based on response structure
            if (response && (response.success === true || response.status === 200)) {
                console.log('✅ Verification successful!');
                
                setSuccess('Email verification successful! Redirecting to login page...');

                // Clear verification data from localStorage after successful verification
                localStorage.removeItem('userId');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userName');
                localStorage.removeItem('pendingVerification');
                
                console.log('🧹 Cleared localStorage verification data');

                // Redirect to login page after showing success message
                setTimeout(() => {
                    console.log('🔄 Redirecting to login page...');
                    router.push('/login');
                }, 2000);

            } else {
                // Handle various error response formats
                const errorMessage = response?.message || response?.error || 'Verification failed. Please check your code and try again.';
                console.error('❌ Verification failed:', errorMessage);
                setError(errorMessage);
            }

        } catch (err) {
            console.error('🚨 Verification error:', err);

            // Extract error message from different possible sources
            let errorMessage = 'Verification failed. Please try again.';

            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.response?.data?.error) {
                errorMessage = err.response.data.error;
            } else if (err.message) {
                errorMessage = err.message;
            } else if (typeof err === 'string') {
                errorMessage = err;
            }

            // Handle specific error cases
            if (err.response?.status === 400) {
                errorMessage = 'Invalid verification code. Please check and try again.';
            } else if (err.response?.status === 404) {
                errorMessage = 'User not found or verification code expired. Please register again.';
            } else if (err.response?.status === 410) {
                errorMessage = 'Verification code has expired. Please request a new one.';
            } else if (err.response?.status === 429) {
                errorMessage = 'Too many attempts. Please wait before trying again.';
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (!userEmail) {
            setError('Cannot resend code: email address not found. Please register again.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            console.log('📤 Resending verification code to:', userEmail);
            const response = await api.auth.resendVerification(userEmail);
            
            console.log('📥 Resend response:', response);

            if (response && (response.success === true || response.status === 200)) {
                setSuccess(`Verification code resent to ${userEmail}. Please check your inbox.`);
                console.log('✅ Verification code resent successfully');
            } else {
                const errorMessage = response?.message || 'Failed to resend verification code. Please try again.';
                setError(errorMessage);
                console.error('❌ Failed to resend verification code:', errorMessage);
            }
        } catch (error) {
            console.error('🚨 Resend error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to resend verification code. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="image-container">
                <div className="transparent"></div>
                <h1>Echoes of Rwanda</h1>
            </div>
            <div className="login-container">
                <h1>Email Verification</h1>
                <h2>Please verify your email address</h2>

                {/* User info display */}
                {(userEmail || userName) && (
                    <div style={{ 
                        background: '#f8f9fa', 
                        padding: '15px', 
                        margin: '15px 0', 
                        borderRadius: '8px',
                        border: '1px solid #e9ecef'
                    }}>
                        {userName && (
                            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#333' }}>
                                <strong>Welcome, {userName}!</strong>
                            </p>
                        )}
                        {userEmail && (
                            <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                                We sent a 6-digit verification code to: <strong>{userEmail}</strong>
                            </p>
                        )}
                    </div>
                )}

                {/* Success message */}
                {success && (
                    <div style={{
                        backgroundColor: '#d4edda',
                        color: '#155724',
                        padding: '12px',
                        borderRadius: '4px',
                        border: '1px solid #c3e6cb',
                        marginBottom: '15px'
                    }}>
                        <p style={{ margin: 0 }} role="status">{success}</p>
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <div style={{
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        padding: '12px',
                        borderRadius: '4px',
                        border: '1px solid #f5c6cb',
                        marginBottom: '15px'
                    }}>
                        <p style={{ margin: 0 }} role="alert">{error}</p>
                        
                        {/* Show helpful actions based on error type */}
                        {!hasValidSession && (
                            <p style={{ margin: '10px 0 0 0', fontSize: '14px' }}>
                                <Link href="/signup" style={{ color: '#721c24', textDecoration: 'underline' }}>
                                    ← Go back to registration
                                </Link>
                            </p>
                        )}
                        
                        {error.includes('expired') && (
                            <button
                                type="button"
                                onClick={handleResendCode}
                                disabled={loading || !userEmail}
                                style={{
                                    marginTop: '10px',
                                    padding: '8px 16px',
                                    backgroundColor: '#721c24',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                Request New Code
                            </button>
                        )}
                    </div>
                )}

                {/* Verification Form */}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="code" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                        Enter 6-Digit Verification Code
                    </label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                        placeholder="e.g., ABC123"
                        value={formData.code}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        maxLength={6}
                        style={{
                            width: '100%',
                            padding: '12px',
                            fontSize: '16px',
                            letterSpacing: '2px',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            border: '2px solid #ddd',
                            borderRadius: '4px',
                            marginBottom: '20px'
                        }}
                    />
                    
                    <div className="sign-in">
                        <button 
                            type="submit" 
                            disabled={loading || !hasValidSession || !formData.code} 
                            aria-busy={loading}
                            style={{
                                width: '100%',
                                padding: '12px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                backgroundColor: (loading || !hasValidSession || !formData.code) ? '#ccc' : '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: (loading || !hasValidSession || !formData.code) ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? 'Verifying...' : 'Verify Email'}
                        </button>
                    </div>
                </form>

                {/* Additional Actions */}
                <div className="sign-up" style={{ marginTop: '20px', textAlign: 'center' }}>
                    <h3>
                        Need the code resent?{' '}
                        {userEmail ? (
                            <button
                                type="button"
                                onClick={handleResendCode}
                                disabled={loading}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#007bff',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    fontSize: 'inherit',
                                    fontFamily: 'inherit'
                                }}
                            >
                                Resend to {userEmail}
                            </button>
                        ) : (
                            <Link href="/resend-verification">Resend Verification Code</Link>
                        )}
                    </h3>
                    <h3>
                        Already verified? <Link href="/login">Sign In</Link>
                    </h3>
                    <h3>
                        Need to use a different email? <Link href="/signup">Register Again</Link>
                    </h3>
                </div>

                {/* Debug Panel for Development */}
                {process.env.NODE_ENV === 'development' && (
                    <div style={{ 
                        background: '#f0f0f0', 
                        padding: '15px', 
                        margin: '20px 0', 
                        fontSize: '12px', 
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}>
                        <strong>🔧 Debug Info (Development Only):</strong><br />
                        <div style={{ marginTop: '10px', fontFamily: 'monospace' }}>
                            <div>UserId: {userId || 'Not found'}</div>
                            <div>Email: {userEmail || 'Not found'}</div>
                            <div>Name: {userName || 'Not found'}</div>
                            <div>Valid Session: {hasValidSession ? 'Yes' : 'No'}</div>
                            <div>Current Code: {formData.code || 'Empty'}</div>
                            <div>Code Valid: {validateCode(formData.code) ? 'Yes' : 'No'}</div>
                        </div>
                        
                        <div style={{ marginTop: '10px' }}>
                            <button
                                type="button"
                                onClick={() => setForceEnable(!forceEnable)}
                                style={{ 
                                    fontSize: '10px', 
                                    padding: '4px 8px', 
                                    marginRight: '10px',
                                    backgroundColor: forceEnable ? '#dc3545' : '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '3px'
                                }}
                            >
                                {forceEnable ? 'Disable Force' : 'Force Enable Form'}
                            </button>
                            
                            <button
                                type="button"
                                onClick={() => {
                                    console.log('🧪 Current localStorage state:');
                                    for (let i = 0; i < localStorage.length; i++) {
                                        const key = localStorage.key(i);
                                        const value = localStorage.getItem(key);
                                        console.log(`  ${key}: ${value}`);
                                    }
                                }}
                                style={{ 
                                    fontSize: '10px', 
                                    padding: '4px 8px',
                                    backgroundColor: '#17a2b8',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '3px'
                                }}
                            >
                                Log localStorage
                            </button>
                        </div>

                        <div style={{ marginTop: '10px' }}>
                            <input
                                type="text"
                                placeholder="Manual UserId (for testing)"
                                value={userId || ''}
                                onChange={(e) => {
                                    const newUserId = e.target.value.trim();
                                    setUserId(newUserId);
                                    setHasValidSession(!!newUserId);
                                    if (newUserId) {
                                        localStorage.setItem('userId', newUserId);
                                    } else {
                                        localStorage.removeItem('userId');
                                    }
                                }}
                                style={{ 
                                    fontSize: '10px', 
                                    padding: '4px', 
                                    width: '100%',
                                    marginTop: '5px',
                                    border: '1px solid #ccc',
                                    borderRadius: '3px'
                                }}
                            />
                            <p style={{ fontSize: '10px', color: '#666', margin: '5px 0 0 0' }}>
                                Paste the userId from your registration logs or database for testing
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Verification;