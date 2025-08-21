"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useApi";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import "../shared-styles.css";

export default function AdminAnalytics() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('30d');
  const [analyticsData, setAnalyticsData] = useState({
    bookings: {
      total: 1247,
      growth: 12.5,
      trend: 'up',
      data: []
    },
    users: {
      total: 3456,
      growth: 8.3,
      trend: 'up',
      newUsers: 234,
      activeUsers: 2890
    },
    revenue: {
      total: 125000,
      growth: 15.2,
      trend: 'up',
      currency: 'USD',
      data: []
    },
    topDestinations: [
      { name: 'Volcanoes National Park', bookings: 156, revenue: 23400 },
      { name: 'Lake Kivu', bookings: 134, revenue: 18900 },
      { name: 'Nyungwe Forest', bookings: 98, revenue: 14700 },
      { name: 'Akagera National Park', bookings: 87, revenue: 13050 },
      { name: 'Kigali City Tour', bookings: 76, revenue: 9120 }
    ]
  });

  // Check authentication
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'admin')) {
      window.location.href = '/login';
    }
  }, [isAuthenticated, user, authLoading]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // Simulate API calls to different analytics endpoints
      // In real implementation, these would be actual API calls

      // GET /admin/analytics/bookings
      // GET /admin/analytics/users  
      // GET /admin/analytics/revenue

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update analytics data based on time range
      setAnalyticsData(prev => ({
        ...prev,
        // Update with real data from API
      }));
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const handleExportReport = async () => {
    try {
      // POST /admin/analytics/reports
      const reportData = {
        metrics: ['bookings', 'revenue', 'users'],
        timeRange: timeRange,
        filters: {}
      };

      console.log('Generating report:', reportData);
      // In real implementation, this would trigger a download
    } catch (error) {
      console.error('Failed to export report:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Professional Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">Analytics Dashboard</h1>
        <p className="admin-page-description">
          Track your business performance and insights with comprehensive analytics
        </p>
      </div>

      {/* Controls */}
      <div className="data-table-container mb-8">
        <div className="data-table-header">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
            <div className="data-table-title">Performance Analytics</div>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <select
                value={timeRange}
                onChange={(e) => handleTimeRangeChange(e.target.value)}
                className="form-select"
                style={{ width: 'auto', minWidth: '150px' }}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>

              <button
                onClick={handleExportReport}
                className="btn btn-success"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>

              <button
                onClick={fetchAnalytics}
                className="btn btn-secondary"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.bookings.total.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            {analyticsData.bookings.trend === 'up' ? (
              <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${analyticsData.bookings.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {analyticsData.bookings.growth}%
            </span>
            <span className="text-sm text-gray-500 ml-2">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.users.total.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600">{analyticsData.users.growth}%</span>
            <span className="text-sm text-gray-500 ml-2">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${analyticsData.revenue.total.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600">{analyticsData.revenue.growth}%</span>
            <span className="text-sm text-gray-500 ml-2">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.users.activeUsers.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <Eye className="w-4 h-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-500">{analyticsData.users.newUsers} new this period</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Revenue chart visualization</p>
              <p className="text-sm text-gray-400">Chart component will be integrated here</p>
            </div>
          </div>
        </div>

        {/* Bookings Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Booking Distribution</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Booking distribution chart</p>
              <p className="text-sm text-gray-400">Chart component will be integrated here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Destinations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Destinations</h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Destination</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Bookings</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Avg. Booking Value</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.topDestinations.map((destination, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                      </div>
                      <span className="font-medium text-gray-900">{destination.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{destination.bookings}</td>
                  <td className="py-3 px-4 text-gray-900">${destination.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-900">
                    ${Math.round(destination.revenue / destination.bookings).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div >
  );
}
