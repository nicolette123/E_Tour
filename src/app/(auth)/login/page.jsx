'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
//import { apiMethods} from @/utils/api
import '../../../styles/login.css';
import { api, get, post, put, del, API_URL } from '../../../utils/api';

const Login = () => {
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

        // Clear errors when user starts typing
        if (error) {
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
            // API call using the post method
            const response = await post('/auth/login', {
                email: formData.email,
                password: formData.password,
            });
            
            console.log('Full API Response:', response); // Debug log
            
            // Handle response and determine user role - FIXED: Access nested data structure
            const userRole = response.data?.user?.role || 'client';
            const token = response.data?.token;
            const user = response.data?.user;
            
            // Store token and user data (you might want to use localStorage, sessionStorage, or a state management solution)
            if (token) {
                localStorage.setItem('authToken', token);
                localStorage.setItem('userData', JSON.stringify(user));
            }
            
            alert(`Welcome ${user?.name || 'User'}! Login successful! Redirecting...`);
            
            // Route based on user role from API response
     switch (userRole.toLowerCase()) {
    case 'admin':
        router.push('/admin');
        break;
    case 'agent':
        router.push('/agent');
        break;
    case 'client':
    default:
        router.push('/client');
        break;
}

        } catch (err) {
            console.error('Login Error:', err); // Debug log
            
            // Handle different error structures
            let errorMessage = 'Login failed. Please try again.';
            
            // Check for API error message in the response structure
            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.data?.message) {
                errorMessage = err.data.message;
            } else if (err.message) {
                errorMessage = err.message;
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
                <h1>Login</h1>
                <h2>Login to your account</h2>
                
                {/* Demo instructions
                <div className="demo-info">
                    <p><small>Demo: Use "admin", "client", or "agent" as email for quick testing</small></p>
                </div> */}
                
                {error && <p className="error" role="alert">{error}</p>}
                
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
                        Don&apos;t have an account yet? <Link href="/signup">Sign Up today.</Link>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Login;