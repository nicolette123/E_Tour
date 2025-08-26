'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../../../styles/login.css';

import { api } from '../../../services/api';
import API_CONFIG from '../../../services/api/config';

const Verification = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        code: '',
    });
    const [userId, setUserId] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasValidSession, setHasValidSession] = useState(false);
    const [forceEnable, setForceEnable] = useState(false);

    // Retrieve user data from localStorage on component mount
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedUserEmail = localStorage.getItem('userEmail');
        const pendingVerification = localStorage.getItem('pendingVerification');

        console.log('🔍 Retrieved from localStorage:', { storedUserId, storedUserEmail, pendingVerification });

        if (storedUserEmail) {
            setUserEmail(storedUserEmail);
        }

        if (storedUserId) {
            setUserId(storedUserId);
            setHasValidSession(true);
            console.log('✅ Retrieved userId from localStorage:', storedUserId);
        } else {
            console.log('❌ No userId found in localStorage');
        }

        // Check if user has any verification session
        if (storedUserId || (pendingVerification && storedUserEmail)) {
            setHasValidSession(true);
            if (storedUserId) {
                console.log('✅ Valid verification session found with userId');
            } else {
                console.log('✅ Valid verification session found with email (userId not available)');
            }
        } else {
            setError('No verification session found. Please register again.');
            console.log('❌ No valid verification session');
        }
    }, []);

    const validateCode = (code) => {
        const codeRegex = /^[a-zA-Z0-9]{6}$/;
        return codeRegex.test(code);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Real-time validation for verification code
        if (name === 'code' && value && !validateCode(value)) {
            setError('Verification code must be exactly 6 alphanumeric characters');
        } else if (name === 'code' && error === 'Verification code must be exactly 6 alphanumeric characters') {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validate code
        if (!validateCode(formData.code)) {
            setError('Verification code must be exactly 6 alphanumeric characters');
            setLoading(false);
            return;
        }

        // Validate that we have either userId or email for verification
        if (!userId && !userEmail) {
            setError('No user information available for verification. Please register again.');
            setLoading(false);
            return;
        }

        // Log verification method being used
        if (userId) {
            console.log('🔑 Using userId-based verification (preferred method)');
        } else {
            console.log('📧 Using email-based verification (fallback method)');
        }

        try {
            console.log('🚀 Submitting verification with:', { userId, userEmail, code: formData.code });

            let response;
            if (userId) {
                // Use userId-based verification (as per API documentation)
                console.log('✅ Using userId for verification');
                response = await api.auth.verifyEmail(userId, formData.code);
            } else {
                // Handle missing userId - the API requires userId, not email
                console.error('❌ Cannot verify without userId - API requires userId parameter');
                throw new Error('Verification failed: User ID is required but not available. This appears to be a backend issue where the registration response did not include the user ID. Please try registering again or contact support.');
            }

            console.log('📥 Verification response:', response);

            // Check if verification was successful
            const isSuccess = response && (response.success === true || response.success !== false);

            if (isSuccess) {
                console.log('✅ Verification successful!');
                alert('Verification successful! Redirecting to login...');

                // Clear verification data from localStorage after successful verification
                localStorage.removeItem('userId');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('pendingVerification');

                // Redirect to login page
                console.log('🔄 Redirecting to login page...');
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                const errorMessage = response?.error || response?.message || 'Verification failed';
                console.error('❌ Verification failed:', errorMessage);
                throw new Error(errorMessage);
            }
        } catch (err) {
            console.error('🚨 Verification error:', err);

            // Extract error message from different possible sources
            let errorMessage = 'Verification failed. Please try again.';

            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.message) {
                errorMessage = err.message;
            } else if (typeof err === 'string') {
                errorMessage = err;
            }

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
                <h1>Verification</h1>
                <h2>Verify your Email</h2>

                {/* Debug info for development */}
                {process.env.NODE_ENV === 'development' && (
                    <div style={{ background: '#f0f0f0', padding: '10px', margin: '10px 0', fontSize: '12px', borderRadius: '4px' }}>
                        <strong>Debug Info:</strong><br />
                        UserId: {userId || 'Not found'}<br />
                        Email: {userEmail || 'Not found'}<br />
                        Valid Session: {hasValidSession ? 'Yes' : 'No'}<br />
                        Button Enabled: {(hasValidSession || forceEnable) && !loading ? 'Yes' : 'No'}
                        <br />
                        <button
                            type="button"
                            onClick={() => setForceEnable(!forceEnable)}
                            style={{ fontSize: '10px', padding: '2px 6px', marginTop: '5px' }}
                        >
                            {forceEnable ? 'Disable Force' : 'Force Enable'}
                        </button>
                        <br />
                        <input
                            type="text"
                            placeholder="Manual UserId (for testing)"
                            value={userId || ''}
                            onChange={(e) => {
                                setUserId(e.target.value);
                                setHasValidSession(!!e.target.value);
                                if (e.target.value) {
                                    localStorage.setItem('userId', e.target.value);
                                } else {
                                    localStorage.removeItem('userId');
                                }
                            }}
                            style={{ fontSize: '10px', padding: '2px', marginTop: '5px', width: '200px' }}
                        />
                        <p style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                            Enter userId if you have it from backend logs/database
                        </p>
                        <br />
                        <button
                            type="button"
                            onClick={async () => {
                                console.log('🧪 Testing API connectivity...');
                                try {
                                    const testResponse = await api.auth.verifyEmail('test-user-id', '123456');
                                    console.log('🧪 API test response:', testResponse);
                                    alert('API test completed - check console for details');
                                } catch (error) {
                                    console.log('🧪 API test error:', error);
                                    alert('API test error - check console for details');
                                }
                            }}
                            style={{ fontSize: '10px', padding: '2px 6px', marginTop: '5px' }}
                        >
                            Test API
                        </button>
                    </div>
                )}

                {userEmail && (
                    <div>
                        <p className="info" style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
                            We sent a verification code to: <strong>{userEmail}</strong>
                        </p>
                        {!userId && (
                            <p className="info" style={{ color: '#888', fontSize: '12px', marginBottom: '10px', fontStyle: 'italic' }}>
                                Note: Using email-based verification (user ID not available from registration)
                            </p>
                        )}
                    </div>
                )}

                {error && (
                    <div>
                        <p className="error" style={{ color: 'red' }} role="alert">{error}</p>
                        {!hasValidSession && (
                            <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>
                                <Link href="/signup" style={{ color: '#007bff', textDecoration: 'underline' }}>
                                    Click here to register again
                                </Link>
                            </p>
                        )}
                        {error.includes('User ID is required but not available') && (
                            <div style={{ backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '4px', padding: '12px', marginTop: '10px' }}>
                                <p style={{ color: '#856404', fontSize: '14px', margin: '0 0 8px 0', fontWeight: 'bold' }}>
                                    🔧 Technical Issue Detected
                                </p>
                                <p style={{ color: '#856404', fontSize: '13px', margin: '0 0 8px 0' }}>
                                    The registration process completed, but the system didn't receive your user ID from the server. This is a backend issue.
                                </p>
                                <p style={{ color: '#856404', fontSize: '13px', margin: '0' }}>
                                    <strong>Solutions:</strong><br />
                                    1. Try registering again with the same email<br />
                                    2. Contact support if the issue persists<br />
                                    3. Check if you received a verification email from your previous registration
                                </p>
                            </div>
                        )}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="code">Verification code</label>
                    <br />
                    <input
                        type="text"
                        id="code"
                        name="code"
                        placeholder="Enter your verification code"
                        value={formData.code}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                    <br />
                    <div className="sign-in">
                        <button type="submit" disabled={loading || (!hasValidSession && !forceEnable)} aria-busy={loading}>
                            {loading ? 'Submitting...' : 'Submit code'}
                        </button>
                    </div>
                </form>
                <div className="sign-up">
                    <h3>
                        Need the code resent?{' '}
                        {userEmail ? (
                            <button
                                type="button"
                                onClick={async () => {
                                    try {
                                        setLoading(true);
                                        const response = await api.auth.resendVerification(userEmail);
                                        if (response.success) {
                                            alert(`Verification code resent to ${userEmail}`);
                                        } else {
                                            alert('Failed to resend verification code. Please try again.');
                                        }
                                    } catch (error) {
                                        console.error('Resend error:', error);
                                        alert('Failed to resend verification code. Please try again.');
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
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
                            <Link href="/resend-verification">Resend Verification code</Link>
                        )}
                    </h3>
                    <h3>
                        Already verified? <Link href="/login">Sign in</Link>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Verification;