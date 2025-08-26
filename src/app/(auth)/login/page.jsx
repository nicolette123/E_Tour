'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useApi';
import { api } from '../../../services/api';
import { LoadingSpinner, ErrorMessage, SuccessMessage } from '../../../components/common/ApiComponents';
import { redirectToRoleDashboard } from '../../../utils/roleBasedRouting';
import '../../../styles/login.css';

const Login = () => {
    const router = useRouter();
    const { login, isAuthenticated, loading: authLoading, user } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect if already authenticated
    useEffect(() => {
        if (!authLoading && isAuthenticated && user) {
            console.log('User already authenticated, redirecting based on role:', user.role);
            console.log('User data:', user);

            // Special routing for clients - go to tour packages instead of dashboard
            if (user.role === 'client') {
                router.replace('/tour-packages');
            } else {
                redirectToRoleDashboard(router, user.role, true);
            }
        }
    }, [isAuthenticated, authLoading, user, router]);

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

        // Clear errors when user starts typing
        if (error) {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
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
            // Use the API service directly for more control
            const response = await api.auth.login({
                email: formData.email,
                password: formData.password,
            });

            if (response.success) {
                setSuccess('Login successful! Redirecting...');

                // Get user role for routing
                const userRole = response.data.user?.role || 'client';
                const userName = response.data.user?.name || response.data.user?.firstName || 'User';

                console.log('Login successful, redirecting based on role:', userRole);
                console.log('User data:', response.data.user);

                // Store authentication data
                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token);
                }
                if (response.data.user) {
                    localStorage.setItem('userData', JSON.stringify(response.data.user));
                }

                // Route based on user role from API response
                setTimeout(() => {
                    if (userRole === 'client') {
                        router.push('/tour-packages');
                    } else if (userRole === 'agent') {
                        router.push('/agent');
                    } else if (userRole === 'admin') {
                        router.push('/admin');
                    } else {
                        // Default fallback
                        router.push('/tour-packages');
                    }
                }, 1500); // Show success message briefly before redirect

            } else {
                // Handle API error response
                setError(response.message || 'Login failed. Please check your credentials.');
            }

        } catch (err) {
            console.error('Login Error:', err);

            // Handle different types of errors
            if (err.response) {
                // Server responded with error status
                const status = err.response.status;
                const message = err.response.data?.message || err.message;

                if (status === 401) {
                    setError('Invalid email or password. Please try again.');
                } else if (status === 403) {
                    setError('Account is not verified. Please check your email for verification instructions.');
                } else if (status === 429) {
                    setError('Too many login attempts. Please try again later.');
                } else {
                    setError(message || 'Login failed. Please try again.');
                }
            } else if (err.request) {
                // Network error - could be CORS or connection issue
                if (err.message && (err.message.includes('CORS') || err.message.includes('ERR_FAILED'))) {
                    setError('Server connection issue. Please ensure you\'re running the app on http://localhost:3000 or try refreshing the page.');
                } else {
                    setError('Unable to connect to server. Please check your internet connection.');
                }
            } else {
                // Other error
                setError('An unexpected error occurred. Please try again.');
            }
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

                {/* Demo instructions
                <div className="demo-info">
                    <p><small>Demo: Use "admin", "client", or "agent" as email for quick testing</small></p>
                </div> */}

                <ErrorMessage error={error} className="mb-4" />
                <SuccessMessage message={success} className="mb-4" />

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">E-mail Address</label>
                    <br />
                    <input
                        type="text"
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
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <span className="checkmark"></span>
                            Remember me
                        </label>
                        <Link href="/forgot-password" className="forgot-link">Forget Password?</Link>
                    </div>
                    <div className="sign-in">
                        <button type="submit" disabled={loading} aria-busy={loading} className="flex items-center justify-center">
                            {loading ? (
                                <>
                                    <LoadingSpinner size="sm" className="mr-2" />
                                    Signing In...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </div>
                </form>
                <div className="sign-up">
                    <h3>
                        Don&apos;t have an account yet? <Link href="/signup">Sign Up today.</Link>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Login;