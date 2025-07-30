'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiMethods } from '@/utils/api';
import '@/styles/forget.css';
import Image from 'next/image';

const ForgetPassword = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

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
            setSuccess('');
        } else if (name === 'email' && error === 'Please enter a valid email address') {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Validate email
        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        try {
            console.log('Submitting password reset with payload:', { email: formData.email });
            const response = await apiMethods.post('https://echoes-of-rwanda.onrender.com/api/v1/auth/reset-password', {
                email: formData.email,
            });
            console.log('Reset password response:', response);
            console.log('Response data:', response.data);
            setSuccess('Password reset link sent! Check your email.');
            alert('Password reset link sent! Redirecting to login...');
            setTimeout(() => router.push('/agent-login'), 2000);
        } catch (err) {
            console.error('Reset password error:', err);
            setError(err.response?.data?.message || 'Failed to send reset link. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-container">
            <img src="/images/Ellipse 2.png" alt="circle" className="img1" />
            <img src="/images/Ellipse 1.png" alt="circle" className="img2" />
            <div className="overlay">
                <div className="overlay-img forget-overlay-img">
                    <div className="stars">
                        <img src="/images/stars.png" alt="stars" />
                    </div>
                    <img className="human" src="/images/human.png" alt="img" />
                    <h1>Empower Your Mind,<br />Anytime,Anywhere.</h1>
                    <div className="stars2">
                        <img src="/images/stars.png" alt="stars" />
                    </div>
                </div>
                <div className="overlay-form">
                    <div className="login">
                        <Link href="/agent-login">Login</Link>
                    </div>
                    <div className="reset">
                        <h1>Reset Your Password Now</h1>
                        <p>Securing Your Account with a New Password</p>
                        {error && <p className="error" style={{ color: 'red' }} role="alert">{error}</p>}
                        {success && <p className="success" style={{ color: 'green' }} role="alert">{success}</p>}
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Email address</label>
                            <br />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                            <br />
                            <div className="reset-btn">
                                <button type="submit" disabled={loading} aria-busy={loading}>
                                    {loading ? 'Sending...' : 'Reset Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;