'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../../../styles/login.css';
import { post, API_URL } from '../../../utils/api';

const ResendVerification = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Real-time validation for email
        if (name === 'email' && value && !validateEmail(value)) {
            setError('Please enter a valid email address');
        } else if (name === 'email' && error === 'Please enter a valid email address') {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validate email
        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        try {
            console.log('Resending verification code for email:', formData.email);
            const response = await post('https://echoes-of-rwanda.onrender.com/api/v1/auth/resend-verification', {
                email: formData.email,
            });
            alert('Verification code resent successfully! Redirecting to verification...');
            console.log('Resend successful!');
            console.log('Response data:', response.data);
            setTimeout(() => router.push('/verification'), 2000);
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
                <h1>Resend Verification Code</h1>
                <h2>Enter your Email</h2>
                {error && <p className="error" style={{ color: 'red' }} role="alert">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email Address</label>
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
                    <br />
                    <div className="sign-in">
                        <button type="submit" disabled={loading} aria-busy={loading}>
                            {loading ? 'Submitting...' : 'Resend Code'}
                        </button>
                    </div>
                </form>
                <div className="sign-up">
                    <h3>
                        Back to verification?{' '}
                        <Link href="/verification">Verify Code</Link>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default ResendVerification;