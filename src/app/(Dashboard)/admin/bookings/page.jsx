"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useApi";
import {
  Calendar,
  Users,
  MapPin,
  DollarSign,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  MoreHorizontal
} from "lucide-react";
import "../shared-styles.css";

export default function AdminBookings() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [bookings, setBookings] = useState([]);

  // Check authentication
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'admin')) {
      window.location.href = '/login';
    }
  }, [isAuthenticated, user, authLoading]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await api.admin.getCustomTrips(); // Fetch custom trips from admin endpoint
      if (response.success) {
        setBookings(response.data.map((trip, index) => ({
          id: trip.id || index.toString(),
          bookingId: `TR-${index + 1}`,
          customerName: 'Custom Request', // Can extract from clientNotes if needed
          customerEmail: trip.clientNotes.match(/Email: (.*)/)?.[1] || '',
          tripTitle: 'Custom Trip to ' + trip.destination,
          destination: trip.destination,
          bookingDate: trip.createdAt || new Date().toISOString().split('T')[0],
          tripDate: trip.preferredStartDate,
          status: 'pending',
          amount: trip.budget,
          currency: 'USD',
          seatsBooked: trip.groupSize,
          paymentStatus: 'pending',
          agentName: 'Unassigned'
        })));
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleSelectBooking = (bookingId) => {
    setSelectedBookings(prev =>
      prev.includes(bookingId)
        ? prev.filter(id => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBookings.length === filteredBookings.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(filteredBookings.map(booking => booking.id));
    }
  };

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      // PUT /admin/bookings/:id
      console.log(`Updating booking ${bookingId} to ${newStatus}`);

      setBookings(prev => prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: newStatus }
          : booking
      ));
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  const handleBulkAction = async (action) => {
    try {
      console.log(`Performing bulk action: ${action} on bookings:`, selectedBookings);
      // Implement bulk actions
      setSelectedBookings([]);
    } catch (error) {
      console.error('Failed to perform bulk action:', error);
    }
  };

  const handleEdit = (id) => {
    const booking = bookings.find((booking) => booking.id === id);
    setEditRowId(id);
    setEditFormData({
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      tripTitle: booking.tripTitle,
      destination: booking.destination,
      tripDate: booking.tripDate,
      status: booking.status,
      amount: booking.amount,
      seatsBooked: booking.seatsBooked,
      paymentStatus: booking.paymentStatus,
      agentName: booking.agentName
    });
  };

  const handleEditChange = (event, field) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSaveEdit = (id) => {
    setBookings(bookings.map((booking) =>
      booking.id === id ? { ...booking, ...editFormData } : booking
    ));
    setEditRowId(null);
    setEditFormData({});
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditFormData({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter((booking) => booking.id !== id));
      setSelectedBookings(selectedBookings.filter(selectedId => selectedId !== id));
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tripTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle },
      completed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle }
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

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      paid: { color: 'bg-green-100 text-green-800' },
      pending: { color: 'bg-yellow-100 text-yellow-800' },
      refunded: { color: 'bg-gray-100 text-gray-800' },
      failed: { color: 'bg-red-100 text-red-800' }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Professional Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">Booking Management</h1>
        <p className="admin-page-description">
          Manage all customer bookings and reservations with comprehensive tools
        </p>
      </div>

      {/* Controls */}
      <div className="data-table-container mb-8">
        <div className="data-table-header">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
            <div className="data-table-title">Booking Overview</div>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button
                onClick={fetchBookings}
                className="btn btn-secondary"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>

              <button className="btn btn-primary">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon">
              <Calendar />
            </div>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-label">Total Bookings</div>
            <div className="stat-card-value">{bookings.length}</div>
            <div className="stat-card-subtitle">All time bookings</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--color-success)' }}>
              <CheckCircle />
            </div>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-label">Confirmed</div>
            <div className="stat-card-value">{bookings.filter(b => b.status === 'confirmed').length}</div>
            <div className="stat-card-subtitle">Active bookings</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--color-warning)' }}>
              <Clock />
            </div>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-label">Pending</div>
            <div className="stat-card-value">{bookings.filter(b => b.status === 'pending').length}</div>
            <div className="stat-card-subtitle">Awaiting confirmation</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--color-info)' }}>
              <DollarSign />
            </div>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-label">Total Revenue</div>
            <div className="stat-card-value">
              ${bookings.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
            </div>
            <div className="stat-card-subtitle">All time earnings</div>
          </div>
        </div>
      </div>

      {/* Professional Filters and Search */}
      <div className="data-table-container mb-8">
        <div className="data-table-header">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
            <div className="data-table-title">Booking Filters</div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-input pl-10"
                    style={{ width: '250px' }}
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => handleStatusFilter(e.target.value)}
                  className="form-select"
                  style={{ width: 'auto', minWidth: '150px' }}
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {selectedBookings.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {selectedBookings.length} selected
                  </span>
                  <button
                    onClick={() => handleBulkAction('confirm')}
                    className="btn btn-sm btn-success"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleBulkAction('cancel')}
                    className="btn btn-sm btn-error"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Bookings Table */}
      <div className="data-table-container">
        <div className="data-table-header">
          <div className="data-table-title">All Bookings</div>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trip
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedBookings.includes(booking.id)}
                      onChange={() => handleSelectBooking(booking.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.bookingId}</div>
                      <div className="text-sm text-gray-500">
                        Booked: {new Date(booking.bookingDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Trip: {new Date(booking.tripDate).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                      <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.tripTitle}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {booking.destination}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {booking.seatsBooked} seats
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="px-6 py-4">
                    {getPaymentStatusBadge(booking.paymentStatus)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      ${booking.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">{booking.currency}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => console.log('View booking:', booking.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(booking.id)}
                        className="text-gray-600 hover:text-gray-800"
                        title="Edit booking"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-500">No bookings match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}