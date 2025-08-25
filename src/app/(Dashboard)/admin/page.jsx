'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useApi';
import {
  Users,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
  Settings,
  Plus,
  Download,
  Filter,
  Search,
  Bell,
  BarChart3,
  PieChart,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MessageSquare,
  Star,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertTriangle,
  Zap,
  Target,
  Award,
  Briefcase
} from 'lucide-react';
import './shared-styles.css';

export default function Admin() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [dateRange, setDateRange] = useState('month');
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration - replace with real API calls
  const [dashboardStats] = useState({
    totalUsers: 2847,
    usersChange: 12.5,
    totalDestinations: 24,
    destinationsChange: 8.3,
    totalBookings: 1456,
    bookingsChange: 23.1,
    totalRevenue: 125000,
    revenueChange: 18.7,
    pendingBookings: 23,
    activeUsers: 1892,
    completedTours: 1203,
    averageRating: 4.8
  });

  const [recentBookings] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      tourTitle: 'Gorilla Trekking Adventure',
      bookingDate: '2024-01-15T10:30:00Z',
      status: 'confirmed',
      amount: 1200,
      currency: 'USD'
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com',
      tourTitle: 'Lake Kivu Relaxation',
      bookingDate: '2024-01-14T14:20:00Z',
      status: 'pending',
      amount: 800,
      currency: 'USD'
    },
    {
      id: 3,
      customerName: 'Mike Wilson',
      customerEmail: 'mike@example.com',
      tourTitle: 'Nyungwe Forest Canopy Walk',
      bookingDate: '2024-01-13T09:15:00Z',
      status: 'completed',
      amount: 650,
      currency: 'USD'
    }
  ]);

  const [recentActivities] = useState([
    {
      id: 1,
      type: 'booking',
      description: 'New booking received from John Doe for Gorilla Trekking',
      timestamp: '2 minutes ago',
      icon: Calendar,
      color: 'blue'
    },
    {
      id: 2,
      type: 'payment',
      description: 'Payment of $800 received for booking #BK-2024-002',
      timestamp: '15 minutes ago',
      icon: DollarSign,
      color: 'green'
    },
    {
      id: 3,
      type: 'review',
      description: 'New 5-star review submitted for Nyungwe Forest tour',
      timestamp: '1 hour ago',
      icon: Star,
      color: 'yellow'
    },
    {
      id: 4,
      type: 'user',
      description: 'New user registration: Emma Chen',
      timestamp: '2 hours ago',
      icon: Users,
      color: 'purple'
    }
  ]);

  // Check authentication and permissions
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'admin')) {
      window.location.href = '/login';
    }
  }, [isAuthenticated, user, authLoading]);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to refresh data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
  };

  // Format currency helper
  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount || 0);
  };

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status badge component
  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      completed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-800', icon: AlertTriangle }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Professional Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard Overview</h1>
        <p className="admin-page-description">
          Monitor your tourism business performance and key metrics
        </p>
      </div>

      {/* Professional Stats Cards */}
      <div className="stats-grid">
        {/* Total Users Card */}
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-content">
              <div className="stat-card-label">Total Users</div>
              <div className="stat-card-value">{dashboardStats.totalUsers.toLocaleString()}</div>
              <div className="stat-card-subtitle">Active: {dashboardStats.activeUsers.toLocaleString()}</div>
            </div>
            <div className="stat-card-icon">
              <Users />
            </div>
          </div>
          <div className="stat-card-trend">
            <TrendingUp size={16} />
            <span>+{dashboardStats.usersChange}%</span>
          </div>
        </div>

        {/* Total Destinations Card */}
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-content">
              <div className="stat-card-label">Destinations</div>
              <div className="stat-card-value">{dashboardStats.totalDestinations}</div>
              <div className="stat-card-subtitle">Featured locations</div>
            </div>
            <div className="stat-card-icon">
              <MapPin />
            </div>
          </div>
          <div className="stat-card-trend">
            <TrendingUp size={16} />
            <span>+{dashboardStats.destinationsChange}%</span>
          </div>
        </div>

        {/* Total Bookings Card */}
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-content">
              <div className="stat-card-label">Total Bookings</div>
              <div className="stat-card-value">{dashboardStats.totalBookings.toLocaleString()}</div>
              <div className="stat-card-subtitle">Pending: {dashboardStats.pendingBookings}</div>
            </div>
            <div className="stat-card-icon">
              <Calendar />
            </div>
          </div>
          <div className="stat-card-trend">
            <TrendingUp size={16} />
            <span>+{dashboardStats.bookingsChange}%</span>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-content">
              <div className="stat-card-label">Total Revenue</div>
              <div className="stat-card-value">{formatCurrency(dashboardStats.totalRevenue)}</div>
              <div className="stat-card-subtitle">This month</div>
            </div>
            <div className="stat-card-icon">
              <DollarSign />
            </div>
          </div>
          <div className="stat-card-trend">
            <TrendingUp size={16} />
            <span>+{dashboardStats.revenueChange}%</span>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="mb-8">
        <h2
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Analytics & Performance
        </h2>
        <p
          className="text-lg"
          style={{ color: 'var(--text-secondary)' }}
        >
          Track your business performance and growth metrics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Revenue Trends Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Revenue Trends
              </h3>
              <p
                className="text-base"
                style={{ color: 'var(--text-secondary)' }}
              >
                Monthly revenue performance and growth
              </p>
            </div>
            <select
              className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:border-opacity-50"
              style={{
                '--tw-ring-color': 'var(--primary-green)',
                borderColor: 'var(--primary-green)'
              }}
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div
            className="h-96 flex items-center justify-center rounded-2xl border-2"
            style={{
              backgroundColor: 'var(--background-accent)',
              borderColor: 'var(--primary-green)',
              borderOpacity: '0.2'
            }}
          >
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: 'var(--primary-green)' }}
              >
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <p
                className="text-xl font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Revenue Chart
              </p>
              <p
                className="text-base"
                style={{ color: 'var(--text-secondary)' }}
              >
                Interactive chart will be displayed here
              </p>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-8">
          {/* KPI Metrics */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h3
              className="text-2xl font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Key Performance
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                    style={{ backgroundColor: 'var(--color-success-light)' }}
                  >
                    <Target
                      className="w-6 h-6"
                      style={{ color: 'var(--color-success-dark)' }}
                    />
                  </div>
                  <span
                    className="text-base font-medium"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Conversion Rate
                  </span>
                </div>
                <span
                  className="text-xl font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  24.5%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                    style={{ backgroundColor: 'var(--color-warning-light)' }}
                  >
                    <Award
                      className="w-6 h-6"
                      style={{ color: 'var(--color-warning-dark)' }}
                    />
                  </div>
                  <span
                    className="text-base font-medium"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Average Rating
                  </span>
                </div>
                <span
                  className="text-xl font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {dashboardStats.averageRating}/5
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                    style={{ backgroundColor: 'var(--color-info-light)' }}
                  >
                    <CheckCircle
                      className="w-6 h-6"
                      style={{ color: 'var(--color-info-dark)' }}
                    />
                  </div>
                  <span
                    className="text-base font-medium"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Completed Tours
                  </span>
                </div>
                <span
                  className="text-xl font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {dashboardStats.completedTours.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3
                className="text-2xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                Quick Overview
              </h3>
              <button
                onClick={() => window.location.href = '/admin/bookings'}
                className="text-base font-medium hover:underline"
                style={{ color: 'var(--primary-green)' }}
              >
                View All Bookings
              </button>
            </div>
            <div
              className="h-48 flex items-center justify-center rounded-2xl border-2"
              style={{
                backgroundColor: 'var(--background-accent)',
                borderColor: 'var(--primary-green)',
                borderOpacity: '0.2'
              }}
            >
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'var(--primary-green)' }}
                >
                  <PieChart className="w-8 h-8 text-white" />
                </div>
                <p
                  className="text-lg font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Booking Distribution
                </p>
                <p
                  className="text-base"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Interactive chart will be displayed here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="mb-8">
        <h2
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Quick Actions
        </h2>
        <p
          className="text-lg"
          style={{ color: 'var(--text-secondary)' }}
        >
          Access frequently used administrative functions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Manage Users */}
        <button
          onClick={() => window.location.href = '/admin/users'}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-left group"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{ backgroundColor: 'var(--primary-green)' }}
          >
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3
            className="text-xl font-bold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Manage Users
          </h3>
          <p
            className="text-base"
            style={{ color: 'var(--text-secondary)' }}
          >
            Add, edit, or remove user accounts
          </p>
        </button>

        {/* View Bookings */}
        <button
          onClick={() => window.location.href = '/admin/bookings'}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-left group"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{ backgroundColor: 'var(--color-info)' }}
          >
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h3
            className="text-xl font-bold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            View Bookings
          </h3>
          <p
            className="text-base"
            style={{ color: 'var(--text-secondary)' }}
          >
            Manage all customer bookings
          </p>
        </button>

        {/* Manage Tours */}
        <button
          onClick={() => window.location.href = '/admin/view-trips'}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-left group"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{ backgroundColor: 'var(--accent-blue)' }}
          >
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h3
            className="text-xl font-bold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Manage Tours
          </h3>
          <p
            className="text-base"
            style={{ color: 'var(--text-secondary)' }}
          >
            Create and edit tour packages
          </p>
        </button>

        {/* System Settings */}
        <button
          onClick={() => window.location.href = '/admin/settings'}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-left group"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{ backgroundColor: 'var(--color-warning)' }}
          >
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h3
            className="text-xl font-bold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Settings
          </h3>
          <p
            className="text-base"
            style={{ color: 'var(--text-secondary)' }}
          >
            Configure system preferences
          </p>
        </button>
      </div>

      {/* CSS Variables for Project Design System */}
      <style jsx>{`
        :root {
          --primary-green: #367C2D;
          --accent-yellow: #DEF65B;
          --accent-blue: #2563eb;
          --background-primary: #ffffff;
          --background-secondary: #f8fafc;
          --background-tertiary: #f1f5f9;
          --background-accent: #f0f9ff;
          --text-primary: #1e293b;
          --text-secondary: #64748b;
          --text-tertiary: #94a3b8;
          --color-success: #10b981;
          --color-success-light: #d1fae5;
          --color-success-dark: #047857;
          --color-warning: #f59e0b;
          --color-warning-light: #fef3c7;
          --color-warning-dark: #d97706;
          --color-error: #ef4444;
          --color-error-light: #fee2e2;
          --color-error-dark: #dc2626;
          --color-info: #3b82f6;
          --color-info-light: #dbeafe;
          --color-info-dark: #1d4ed8;
          --accent-red: #ef4444;
        }
      `}</style>
    </div>
  );
}