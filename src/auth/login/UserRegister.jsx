'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiMethods } from '@/utils/api';
import '@/styles/register.css';

const UserRegister = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        receiveNotifications: false,
        agreeToTerms: false,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Real-time validation for email
        if (name === 'email' && value && !validateEmail(value)) {
            setError('Please enter a valid email address');
        } else if (name === 'email' && error === 'Please enter a valid email address') {
            setError('');
        }

        // Real-time password match validation
        if (name === 'confirmPassword' && value !== formData.password) {
            setError('Passwords do not match');
        } else if (name === 'confirmPassword' && value === formData.password && error === 'Passwords do not match') {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Password strength validation
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

        try {
            console.log('Submitting registration with payload:', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                receiveNotifications: formData.receiveNotifications,
            });
            const response = await apiMethods.post('https://echoes-of-rwanda.onrender.com/api/v1/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                receiveNotifications: formData.receiveNotifications,
            });
            console.log('Registration response:', response);
            console.log('Response data:', response.data);
            // Attempt to extract userId from various possible response structures
            const userId = response.data.userId || response.data.id || response.data.user?.id;
            if (userId) {
                localStorage.setItem('userId', userId);
                console.log('Stored userId in localStorage:', userId);
            } else {
                console.warn('No userId found in response. Response data:', response.data);
                setError('Registration successful, but no user ID returned. Please contact support.');
            }
            alert('Registration successful! Redirecting to verification...');
            console.log('Registration successful!');
            setTimeout(() => router.push('/verification'), 2000);
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
                {error && <p className="error" style={{ color: 'red' }} role="alert">{error}</p>}
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
                    <div className="checkboxes">
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
                        <button type="submit" disabled={loading} aria-busy={loading}>
                            {loading ? 'Registering...' : 'Create Account'}
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