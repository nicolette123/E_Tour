'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiMethods } from '@/utils/api';
import '@/styles/login.css';

const Verification = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        code: '',
    });
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Retrieve userId from localStorage on component mount
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            console.log('Retrieved userId from localStorage:', storedUserId);
        } else {
            setError('No user ID found. Please register again.');
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

        // Validate userId
        if (!userId) {
            setError('No user ID found. Please register again.');
            setLoading(false);
            return;
        }

        try {
            console.log('Submitting verification with payload:', { userId, code: formData.code });
            const response = await apiMethods.post('https://echoes-of-rwanda.onrender.com/api/v1/auth/verify-email', {
                userId,
                code: formData.code,
            });
            alert('Verification successful! Redirecting to login...');
            console.log('Verification successful!');
            console.log('Response data:', response.data);
            console.log('Full response object:', response);
            // Clear userId from localStorage after successful verification
            localStorage.removeItem('userId');
            setTimeout(() => router.push('/login'), 2000);
        } catch (err) {
            console.error('Verification error:', err);
            setError(err.response?.data?.message || 'Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setError('');
        setLoading(true);

        // Validate userId
        if (!userId) {
            setError('No user ID found. Please register again.');
            setLoading(false);
            return;
        }

        try {
            console.log('Resending verification code for userId:', userId);
            const response = await apiMethods.post('https://echoes-of-rwanda.onrender.com/api/v1/auth/verify-email', {
                userId,
                resend: true,
            });
            alert('Verification code resent successfully!');
            console.log('Resend successful!');
            console.log('Response data:', response.data);
        } catch (err) {
            console.error('Resend error:', err);
            setError(err.response?.data?.message || 'Failed to resend verification code. Please try again.');
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
                {error && <p className="error" style={{ color: 'red' }} role="alert">{error}</p>}
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
                        <button type="submit" disabled={loading || !userId} aria-busy={loading}>
                            {loading ? 'Submitting...' : 'Submit code'}
                        </button>
                    </div>
                </form>
                <div className="sign-up">
                    <h3>
                        Need the code resent?{' '}
                        <button
                            onClick={handleResendCode}
                            disabled={loading || !userId}
                            
                        >
                            Resend Verification code
                        </button>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Verification;