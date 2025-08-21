'use client';

import React, { useState, useEffect } from 'react';
import { useAuth, useMyBookings, useDestinations, useTours } from '../../../hooks/useApi';
import {
  LoadingSpinner,
  ErrorMessage,
  RetryButton
} from '../../../components/common/ApiComponents';
import {
  StatCard,
  ChartCard,
  DataTable,
  StatusBadge,
  QuickActionCard,
  ActivityFeed,
  EmptyState
} from '../../../components/dashboard/DashboardComponents';
import {
  Calendar,
  MapPin,
  Heart,
  Clock,
  Star,
  Plane,
  Camera,
  Gift,
  Search,
  Filter,
  BookOpen,
  CreditCard,
  User,
  Settings,
  Bell,
  Globe,
  Compass
} from 'lucide-react';

export default function ClientDashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch user's bookings
  const {
    data: myBookings,
    loading: bookingsLoading,
    error: bookingsError,
    refresh: refreshBookings
  } = useMyBookings({
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // Fetch featured destinations
  const {
    data: featuredDestinations,
    loading: destinationsLoading
  } = useDestinations({
    featured: true,
    limit: 6
  });

  // Fetch popular tours
  const {
    data: popularTours,
    loading: toursLoading
  } = useTours({
    sortBy: 'popularity',
    limit: 6
  });

  // Check authentication and permissions
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'client')) {
      window.location.href = '/login';
    }
  }, [isAuthenticated, user, authLoading]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    refreshBookings();
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

  if (authLoading || (!isAuthenticated || user?.role !== 'client')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Calculate stats from bookings
  const totalBookings = myBookings?.data?.length || 0;
  const upcomingBookings = myBookings?.data?.filter(booking =>
    new Date(booking.startDate) > new Date()
  ).length || 0;
  const completedBookings = myBookings?.data?.filter(booking =>
    booking.status === 'completed'
  ).length || 0;
  const totalSpent = myBookings?.data?.reduce((sum, booking) =>
    sum + (booking.totalAmount || 0), 0
  ) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Travel Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.firstName || 'Traveler'}! Ready for your next adventure?</p>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            <RetryButton
              onRetry={handleRefresh}
              loading={bookingsLoading}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Error handling */}
        {bookingsError && (
          <ErrorMessage
            error={bookingsError}
            onRetry={handleRefresh}
            className="mb-6"
          />
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Bookings"
            value={totalBookings}
            change={totalBookings > 0 ? `${upcomingBookings} upcoming` : 'Start exploring!'}
            changeType="positive"
            icon={Calendar}
            color="blue"
            loading={bookingsLoading}
          />
          <StatCard
            title="Upcoming Trips"
            value={upcomingBookings}
            change={upcomingBookings > 0 ? 'Get ready!' : 'Plan your next trip'}
            changeType="positive"
            icon={Plane}
            color="green"
            loading={bookingsLoading}
          />
          <StatCard
            title="Completed Trips"
            value={completedBookings}
            change={completedBookings > 0 ? 'Great memories!' : 'Your journey starts here'}
            changeType="positive"
            icon={Star}
            color="purple"
            loading={bookingsLoading}
          />
          <StatCard
            title="Total Spent"
            value={formatCurrency(totalSpent)}
            change={totalSpent > 0 ? 'Worth every penny!' : 'Start your adventure'}
            changeType="positive"
            icon={CreditCard}
            color="orange"
            loading={bookingsLoading}
          />
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickActionCard
              title="Explore Destinations"
              description="Discover amazing places"
              icon={Compass}
              color="blue"
              onClick={() => window.location.href = '/destinations'}
            />
            <QuickActionCard
              title="Browse Tours"
              description="Find perfect tour packages"
              icon={Globe}
              color="green"
              onClick={() => window.location.href = '/tours'}
            />
            <QuickActionCard
              title="My Bookings"
              description="View and manage bookings"
              icon={BookOpen}
              color="purple"
              onClick={() => window.location.href = '/client/bookings'}
            />
            <QuickActionCard
              title="My Profile"
              description="Update personal information"
              icon={User}
              color="orange"
              onClick={() => window.location.href = '/client/profile'}
            />
          </div>
        </div>

        {/* My Bookings */}
        {totalBookings > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">My Recent Bookings</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Bookings
              </button>
            </div>

            <DataTable
              columns={[
                {
                  header: 'Tour',
                  key: 'tourTitle',
                  render: (value, row) => (
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <Camera className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{value}</div>
                        <div className="text-sm text-gray-500">{row.destination}</div>
                      </div>
                    </div>
                  )
                },
                {
                  header: 'Travel Date',
                  key: 'startDate',
                  render: (value, row) => (
                    <div>
                      <div className="text-sm text-gray-900">{formatDate(value)}</div>
                      <div className="text-sm text-gray-500">
                        {row.endDate && `to ${formatDate(row.endDate)}`}
                      </div>
                    </div>
                  )
                },
                {
                  header: 'Status',
                  key: 'status',
                  render: (value) => <StatusBadge status={value} />
                },
                {
                  header: 'Amount',
                  key: 'totalAmount',
                  render: (value, row) => (
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(value, row.currency)}
                    </div>
                  )
                }
              ]}
              data={myBookings.data.slice(0, 5)}
              loading={bookingsLoading}
              onRowClick={(booking) => window.location.href = `/client/bookings/${booking.id}`}
            />
          </div>
        )}

        {/* Featured Destinations & Popular Tours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Destinations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Featured Destinations</h3>
              <button
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                onClick={() => window.location.href = '/destinations'}
              >
                View All
              </button>
            </div>

            {destinationsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : featuredDestinations?.data?.length > 0 ? (
              <div className="space-y-4">
                {featuredDestinations.data.slice(0, 3).map((destination) => (
                  <div
                    key={destination.id}
                    className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                    onClick={() => window.location.href = `/destinations/${destination.id}`}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{destination.name}</h4>
                      <p className="text-sm text-gray-500">{destination.location}</p>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">
                          {destination.rating || '4.8'} ({destination.reviews || '120'} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <button className="text-red-500 hover:text-red-700">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={MapPin}
                title="No destinations"
                description="Explore amazing destinations around the world."
                action={
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => window.location.href = '/destinations'}
                  >
                    Explore Destinations
                  </button>
                }
              />
            )}
          </div>

          {/* Popular Tours */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Popular Tours</h3>
              <button
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                onClick={() => window.location.href = '/tours'}
              >
                View All
              </button>
            </div>

            {toursLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : popularTours?.data?.length > 0 ? (
              <div className="space-y-4">
                {popularTours.data.slice(0, 3).map((tour) => (
                  <div
                    key={tour.id}
                    className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                    onClick={() => window.location.href = `/tours/${tour.id}`}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{tour.title}</h4>
                      <p className="text-sm text-gray-500">{tour.duration} days</p>
                      <div className="flex items-center mt-1">
                        <span className="text-lg font-bold text-green-600">
                          {formatCurrency(tour.price)}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">per person</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <button className="text-red-500 hover:text-red-700">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Globe}
                title="No tours available"
                description="Discover amazing tour packages for your next adventure."
                action={
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    onClick={() => window.location.href = '/tours'}
                  >
                    Browse Tours
                  </button>
                }
              />
            )}
          </div>
        </div>

        {/* Travel Tips & Recommendations */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Ready for Your Next Adventure?</h3>
              <p className="text-blue-100 mb-4">
                Discover Rwanda's breathtaking landscapes, rich culture, and unforgettable experiences.
              </p>
              <div className="flex space-x-4">
                <button
                  className="px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-medium"
                  onClick={() => window.location.href = '/destinations'}
                >
                  Explore Destinations
                </button>
                <button
                  className="px-6 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 font-medium"
                  onClick={() => window.location.href = '/tours'}
                >
                  Browse Tours
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <Camera className="w-24 h-24 text-blue-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
