"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useApi";
import {
  Bell,
  MessageSquare,
  User,
  Calendar,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  RefreshCw,
  Settings,
  AlertCircle,
  Info,
  Check,
  DollarSign,
  Star,
  MapPin
} from "lucide-react";
import "../shared-styles.css";

export default function AdminNotifications() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New Booking Received',
      message: 'John Doe has booked a Gorilla Trekking tour for 4 people on March 15, 2024.',
      type: 'booking',
      status: 'unread',
      priority: 'high',
      createdAt: '2024-01-15T10:30:00Z',
      actionUrl: '/admin/bookings',
      metadata: {
        bookingId: 'BK-2024-001',
        customerName: 'John Doe',
        amount: 1200
      }
    },
    {
      id: '2',
      title: 'Payment Received',
      message: 'Payment of $800 received for booking BK-2024-002 from Sarah Johnson.',
      type: 'payment',
      status: 'read',
      priority: 'medium',
      createdAt: '2024-01-14T14:20:00Z',
      actionUrl: '/admin/dash-payment',
      metadata: {
        bookingId: 'BK-2024-002',
        amount: 800,
        paymentMethod: 'Credit Card'
      }
    },
    {
      id: '3',
      title: 'Custom Trip Request',
      message: 'New custom trip request from Michael Chen for Lake Kivu with budget $1200.',
      type: 'custom_trip',
      status: 'unread',
      priority: 'medium',
      createdAt: '2024-01-13T09:15:00Z',
      actionUrl: '/admin/custom-trips',
      metadata: {
        requestId: 'CT-2024-003',
        customerName: 'Michael Chen',
        destination: 'Lake Kivu'
      }
    },
    {
      id: '4',
      title: 'Review Needs Moderation',
      message: 'A new review with 2 stars has been submitted and needs moderation.',
      type: 'review',
      status: 'unread',
      priority: 'low',
      createdAt: '2024-01-12T16:45:00Z',
      actionUrl: '/admin/reviews',
      metadata: {
        reviewId: 'RV-2024-004',
        rating: 2,
        customerName: 'Emma Wilson'
      }
    },
    {
      id: '5',
      title: 'Contact Message',
      message: 'New contact message from potential customer about partnership opportunities.',
      type: 'contact',
      status: 'read',
      priority: 'low',
      createdAt: '2024-01-11T02:00:00Z',
      actionUrl: '/admin/contact-messages',
      metadata: {
        messageId: 'MSG-2024-005',
        senderName: 'Business Partner'
      }
    }
  ]);

  // Check authentication
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'admin')) {
      window.location.href = '/login';
    }
  }, [isAuthenticated, user, authLoading]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      // GET /admin/notifications
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real implementation, update notifications from API
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      // PUT /admin/notifications/:id/read
      console.log(`Marking notification ${notificationId} as read`);

      setNotifications(prev => prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, status: 'read' }
          : notification
      ));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      // DELETE /admin/notifications/:id
      console.log(`Deleting notification ${notificationId}`);

      setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const handleBulkAction = async (action) => {
    try {
      console.log(`Performing bulk action: ${action} on notifications:`, selectedNotifications);

      if (action === 'mark_read') {
        selectedNotifications.forEach(notificationId => {
          handleMarkAsRead(notificationId);
        });
      } else if (action === 'delete') {
        selectedNotifications.forEach(notificationId => {
          handleDelete(notificationId);
        });
      }

      setSelectedNotifications([]);
    } catch (error) {
      console.error('Failed to perform bulk action:', error);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || notification.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getNotificationIcon = (type) => {
    const iconConfig = {
      booking: { icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
      payment: { icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
      custom_trip: { icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-100' },
      review: { icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100' },
      contact: { icon: MessageSquare, color: 'text-gray-600', bg: 'bg-gray-100' },
      system: { icon: Settings, color: 'text-gray-600', bg: 'bg-gray-100' }
    };

    const config = iconConfig[type] || iconConfig.system;
    const Icon = config.icon;

    return (
      <div className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center`}>
        <Icon className={`w-5 h-5 ${config.color}`} />
      </div>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: 'bg-red-100 text-red-800', icon: AlertCircle },
      medium: { color: 'bg-yellow-100 text-yellow-800', icon: Info },
      low: { color: 'bg-green-100 text-green-800', icon: Check }
    };

    const config = priorityConfig[priority] || priorityConfig.medium;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-1">Stay updated with system activities and alerts</p>
            </div>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button
                onClick={fetchNotifications}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">
                  {notifications.filter(n => n.status === 'unread').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-gray-900">
                  {notifications.filter(n => n.priority === 'high').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-2xl font-bold text-gray-900">
                  {notifications.filter(n => {
                    const today = new Date().toDateString();
                    const notificationDate = new Date(n.createdAt).toDateString();
                    return today === notificationDate;
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="booking">Bookings</option>
                <option value="payment">Payments</option>
                <option value="custom_trip">Custom Trips</option>
                <option value="review">Reviews</option>
                <option value="contact">Messages</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>

            {selectedNotifications.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedNotifications.length} selected
                </span>
                <button
                  onClick={() => handleBulkAction('mark_read')}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                >
                  Mark Read
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md ${notification.status === 'unread' ? 'border-l-4 border-l-blue-500' : ''
                }`}
            >
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={selectedNotifications.includes(notification.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedNotifications(prev => [...prev, notification.id]);
                    } else {
                      setSelectedNotifications(prev => prev.filter(id => id !== notification.id));
                    }
                  }}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                {getNotificationIcon(notification.type)}

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`text-lg font-semibold ${notification.status === 'unread' ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {getPriorityBadge(notification.priority)}
                      {notification.status === 'unread' && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(notification.createdAt).toLocaleString()}</span>
                      </div>
                      {notification.metadata && (
                        <div className="flex items-center space-x-2">
                          {notification.metadata.customerName && (
                            <span>• {notification.metadata.customerName}</span>
                          )}
                          {notification.metadata.amount && (
                            <span>• ${notification.metadata.amount}</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {notification.actionUrl && (
                        <button
                          onClick={() => window.location.href = notification.actionUrl}
                          className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                      )}

                      {notification.status === 'unread' ? (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Mark Read
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDelete(notification.id)}
                          className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
            <p className="text-gray-500">No notifications match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
