'use client';

import React, { useState, useEffect } from 'react';
import { api } from '../../../../services/api';
import { useAuth } from '../../../../hooks/useApi';
import {
  LoadingSpinner,
  ErrorMessage,
  RetryButton
} from '../../../../components/common/ApiComponents';
import {
  DataTable,
  StatusBadge,
  EmptyState
} from '../../../../components/dashboard/DashboardComponents';
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Star,
  Clock
} from 'lucide-react';
import './ManageTrip.css';

export default function ManageTripPage() {
  const { user, isAuthenticated } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch trips
  const fetchTrips = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: currentPage,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      };

      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }

      const response = await api.agent.getAgentTrips(params);

      if (response.success) {
        setTrips(response.data || []);
        setTotalPages(response.pagination?.totalPages || 1);
      } else {
        setError(response.message || 'Failed to fetch trips');
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
      setError(error.message || 'Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  };

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'agent') {
      window.location.href = '/login';
      return;
    }

    fetchTrips();
  }, [isAuthenticated, user, currentPage, statusFilter]);

  // Handle trip actions
  const handleViewTrip = (trip) => {
    console.log('View trip:', trip);
    window.location.href = `/agent/trips/${trip.id}`;
  };

  const handleEdit = (trip) => {
    console.log('Edit trip:', trip);
    window.location.href = `/agent/trips/${trip.id}/edit`;
  };

  const handleDelete = async (trip) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete "${trip.title}"?`);
    if (!isConfirmed) return;

    try {
      const response = await api.agent.deleteTrip(trip.id);

      if (response.success) {
        alert('Trip deleted successfully');
        fetchTrips(); // Refresh the list
      } else {
        alert(response.message || 'Failed to delete trip');
      }
    } catch (error) {
      console.error('Error deleting trip:', error);
      alert('Failed to delete trip');
    }
  };

  // Filter trips based on search term
  const filteredTrips = trips.filter(trip =>
    trip.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format currency
  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount || 0);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isAuthenticated || user?.role !== 'agent') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Trips</h1>
            <p className="text-gray-600">Create and manage your tour packages</p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/agent/trips/create'}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Trip</span>
            </button>

            <RetryButton
              onRetry={fetchTrips}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search trips..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error handling */}
        {error && (
          <ErrorMessage
            error={error}
            onRetry={fetchTrips}
            className="mb-6"
          />
        )}

        {/* Trips Display */}
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map(trip => (
              <div key={trip.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Trip Image */}
                <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <StatusBadge status={trip.status} />
                  </div>
                </div>

                {/* Trip Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {trip.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {trip.destination}
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </div>

                    {trip.maxParticipants && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        Max {trip.maxParticipants} travelers
                      </div>
                    )}

                    {trip.price && (
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {formatCurrency(trip.price)}
                      </div>
                    )}
                  </div>

                  {/* Trip Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewTrip(trip)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(trip)}
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Trip"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(trip)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {trip.rating && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                        {trip.rating}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <EmptyState
              icon={MapPin}
              title="No trips found"
              description={
                searchTerm || statusFilter !== 'all'
                  ? "No trips match your current filters."
                  : "You haven't created any trips yet. Start by creating your first trip package."
              }
              action={
                <button
                  onClick={() => window.location.href = '/agent/trips/create'}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create First Trip</span>
                </button>
              }
            />
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-200">
            <div className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}