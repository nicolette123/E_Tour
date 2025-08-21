'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useApi';
import { LoadingSpinner, ErrorMessage, SuccessMessage } from '../../../components/common/ApiComponents';
import { runApiDiagnostics } from '../../../utils/apiCheck';
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

    // Run API diagnostics in development
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            runApiDiagnostics().catch(console.error);
        }
    }, []);

    // Redirect if already authenticated
    useEffect(() => {
        if (!authLoading && isAuthenticated && user) {
            console.log('User already authenticated, redirecting based on role:', user.role);
            console.log('User data:', user);
            redirectToRoleDashboard(router, user.role, true); // Use replace to avoid back button issues
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
            // Use the new API service for login
            const response = await login({
                email: formData.email,
                password: formData.password,
                rememberMe: formData.rememberMe,
            });

            if (response.success) {
                setSuccess(response.data.message || 'Login successful!');

                // Get user role for routing
                const userRole = response.data.user?.role || 'client';

                console.log('Login successful, redirecting based on role:', userRole);
                console.log('User data:', response.data.user);

                // Route based on user role from API response
                setTimeout(() => {
                    redirectToRoleDashboard(router, userRole);
                }, 1500); // Show success message briefly before redirect

            } else {
                // Handle API error response
                setError(response.message || 'Login failed. Please check your credentials.');
            }

        } catch (err) {
            console.error('Login Error:', err);
            setError('An unexpected error occurred. Please try again.');
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