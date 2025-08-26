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
  Calendar,
  Users,
  MapPin,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

export default function ManageBookingPage() {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch bookings
  const fetchBookings = async () => {
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

      const response = await api.agent.getAgentBookings(params);

      if (response.success) {
        setBookings(response.data || []);
        setTotalPages(response.pagination?.totalPages || 1);
      } else {
        setError(response.message || 'Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError(error.message || 'Failed to fetch bookings');
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

    fetchBookings();
  }, [isAuthenticated, user, currentPage, statusFilter]);

  // Handle booking actions
  const handleViewBooking = (booking) => {
    console.log('View booking:', booking);
    // Navigate to booking details page
    window.location.href = `/agent/bookings/${booking.id}`;
  };

  const handleEditBooking = (booking) => {
    console.log('Edit booking:', booking);
    // Navigate to booking edit page
    window.location.href = `/agent/bookings/${booking.id}/edit`;
  };

  const handleDeleteBooking = async (booking) => {
    if (!window.confirm(`Are you sure you want to delete the booking for ${booking.clientName}?`)) {
      return;
    }

    try {
      // This would typically call a delete booking API
      console.log('Delete booking:', booking);
      alert('Booking deletion functionality will be implemented with the backend API');

      // Refresh bookings after deletion
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking');
    }
  };

  // Filter bookings based on search term
  const filteredBookings = bookings.filter(booking =>
    booking.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.tourTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.destination?.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-2xl font-bold text-gray-900">Manage Bookings</h1>
            <p className="text-gray-600">View and manage all your client bookings</p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/agent/bookings/create'}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Booking</span>
            </button>

            <RetryButton
              onRetry={fetchBookings}
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
                  placeholder="Search bookings..."
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
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>

              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error handling */}
        {error && (
          <ErrorMessage
            error={error}
            onRetry={fetchBookings}
            className="mb-6"
          />
        )}

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Bookings ({filteredBookings.length})
            </h2>
          </div>

          {filteredBookings.length > 0 ? (
            <DataTable
              columns={[
                {
                  header: 'Client',
                  key: 'clientName',
                  render: (value, row) => (
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-blue-600">
                          {value?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{value}</div>
                        <div className="text-sm text-gray-500">{row.clientEmail}</div>
                      </div>
                    </div>
                  )
                },
                {
                  header: 'Tour/Destination',
                  key: 'tourTitle',
                  render: (value, row) => (
                    <div>
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                        {value || 'Custom Trip'}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {row.destination}
                      </div>
                    </div>
                  )
                },
                {
                  header: 'Dates',
                  key: 'startDate',
                  render: (value, row) => (
                    <div className="text-sm">
                      <div className="text-gray-900">{formatDate(value)}</div>
                      <div className="text-gray-500">to {formatDate(row.endDate)}</div>
                    </div>
                  )
                },
                {
                  header: 'Travelers',
                  key: 'travelers',
                  render: (value) => (
                    <div className="flex items-center text-sm text-gray-900">
                      <Users className="w-4 h-4 mr-1 text-gray-400" />
                      {value || 1}
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
                },
                {
                  header: 'Actions',
                  key: 'actions',
                  render: (_, row) => (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewBooking(row)}
                        className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditBooking(row)}
                        className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                        title="Edit Booking"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(row)}
                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        title="Delete Booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )
                }
              ]}
              data={filteredBookings}
              loading={loading}
              onRowClick={handleViewBooking}
            />
          ) : (
            <div className="p-6">
              <EmptyState
                icon={Calendar}
                title="No bookings found"
                description={
                  searchTerm || statusFilter !== 'all'
                    ? "No bookings match your current filters."
                    : "You haven't created any bookings yet. Start by adding your first booking."
                }
                action={
                  <button
                    onClick={() => window.location.href = '/agent/bookings/create'}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create First Booking</span>
                  </button>
                }
              />
            </div>
          )}
        </div>

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
