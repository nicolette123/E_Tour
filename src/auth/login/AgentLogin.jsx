'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiMethods } from '@/utils/api';
import '@/styles/login.css';

const AgentLogin = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
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

        // Real-time password validation
        if (name === 'password' && value && value.length < 6) {
            setError('Password must be at least 6 characters long');
        } else if (name === 'password' && error === 'Password must be at least 6 characters long' && value.length >= 6) {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Client-side validation
        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const response = await apiMethods.post('https://echoes-of-rwanda.onrender.com/api/v1/auth/login', {
                email: formData.email,
                password: formData.password,
            });
            alert('Login successful! Redirecting...');
            setTimeout(() => router.push('/dashboard'), 2000); // Redirect to dashboard (adjust as needed)
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
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
                <h1>Login</h1>
                <h2>Login to your account</h2>
                {error && <p className="error" role="alert">{error}</p>}
                <form onSubmit={handleSubmit}>
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
                    <br />
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
                    <br />
                    <div className="remember-forgot">
                        <label>
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                disabled={loading}
                            />{' '}
                            Remember me
                        </label>
                        <Link href="/forgot-password">Forget Password?</Link>
                    </div>
                    <div className="sign-in">
                        <button type="submit" disabled={loading} aria-busy={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner"></span> Signing In...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </div>
                </form>
                <div className="sign-up">
                    <h3>
                        Don&apos;t have an account yet? <Link href="/agent-register">Sign Up today.</Link>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default AgentLogin;  