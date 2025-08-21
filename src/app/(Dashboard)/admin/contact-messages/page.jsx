"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useApi";
import {
  Mail,
  MessageSquare,
  User,
  Clock,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Reply,
  Archive,
  RefreshCw,
  Calendar,
  Tag
} from "lucide-react";
import "../shared-styles.css";

export default function AdminContactMessages() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [contactMessages, setContactMessages] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Inquiry about Gorilla Trekking Tours',
      message: 'Hi, I am interested in booking a gorilla trekking tour for my family of 4. Could you please provide more information about the available packages and pricing?',
      status: 'new',
      priority: 'medium',
      createdAt: '2024-01-15T10:30:00Z',
      assignedAdminId: null,
      assignedAdminName: null,
      category: 'booking_inquiry',
      lastUpdated: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      subject: 'Complaint about Recent Trip',
      message: 'I recently completed a trip to Lake Kivu and was disappointed with the accommodation quality. The hotel was not as described on your website. I would like to discuss this matter.',
      status: 'in_progress',
      priority: 'high',
      createdAt: '2024-01-14T14:20:00Z',
      assignedAdminId: 'admin1',
      assignedAdminName: 'Admin User',
      category: 'complaint',
      lastUpdated: '2024-01-14T16:45:00Z'
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael@example.com',
      subject: 'Partnership Opportunity',
      message: 'Hello, I represent a travel agency in Singapore and would like to explore partnership opportunities with your company. Could we schedule a call to discuss potential collaboration?',
      status: 'resolved',
      priority: 'low',
      createdAt: '2024-01-13T09:15:00Z',
      assignedAdminId: 'admin2',
      assignedAdminName: 'Business Admin',
      category: 'partnership',
      lastUpdated: '2024-01-13T17:30:00Z'
    },
    {
      id: '4',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      subject: 'Website Technical Issue',
      message: 'I am experiencing issues with the booking form on your website. When I try to submit my booking details, I get an error message. Please help resolve this.',
      status: 'new',
      priority: 'high',
      createdAt: '2024-01-12T16:45:00Z',
      assignedAdminId: null,
      assignedAdminName: null,
      category: 'technical_support',
      lastUpdated: '2024-01-12T16:45:00Z'
    }
  ]);

  // Check authentication
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'admin')) {
      window.location.href = '/login';
    }
  }, [isAuthenticated, user, authLoading]);

  const fetchContactMessages = async () => {
    setLoading(true);
    try {
      // GET /admin/contact-messages
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real implementation, update contactMessages from API
    } catch (error) {
      console.error('Failed to fetch contact messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactMessages();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdateStatus = async (messageId, newStatus, assignedAdminId = null) => {
    try {
      // PUT /admin/contact-messages/:id
      console.log(`Updating message ${messageId} to ${newStatus}`);

      setContactMessages(prev => prev.map(message =>
        message.id === messageId
          ? {
            ...message,
            status: newStatus,
            assignedAdminId: assignedAdminId || message.assignedAdminId,
            assignedAdminName: assignedAdminId ? user?.name : message.assignedAdminName,
            lastUpdated: new Date().toISOString()
          }
          : message
      ));
    } catch (error) {
      console.error('Failed to update message status:', error);
    }
  };

  const handleAssignToMe = (messageId) => {
    handleUpdateStatus(messageId, 'in_progress', user?.id);
  };

  const handleReply = async () => {
    if (!replyText.trim() || !selectedMessage) return;

    try {
      // In real implementation, send reply via API
      console.log('Sending reply to:', selectedMessage.email);
      console.log('Reply text:', replyText);

      // Update message status to resolved
      handleUpdateStatus(selectedMessage.id, 'resolved');

      setShowReplyModal(false);
      setSelectedMessage(null);
      setReplyText('');
    } catch (error) {
      console.error('Failed to send reply:', error);
    }
  };

  const handleBulkAction = async (action) => {
    try {
      console.log(`Performing bulk action: ${action} on messages:`, selectedMessages);

      if (action === 'mark_resolved') {
        selectedMessages.forEach(messageId => {
          handleUpdateStatus(messageId, 'resolved');
        });
      } else if (action === 'assign_to_me') {
        selectedMessages.forEach(messageId => {
          handleUpdateStatus(messageId, 'in_progress', user?.id);
        });
      }

      setSelectedMessages([]);
    } catch (error) {
      console.error('Failed to perform bulk action:', error);
    }
  };

  const filteredMessages = contactMessages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { color: 'bg-blue-100 text-blue-800', icon: Mail },
      in_progress: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      resolved: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      closed: { color: 'bg-gray-100 text-gray-800', icon: XCircle }
    };

    const config = statusConfig[status] || statusConfig.new;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: 'bg-red-100 text-red-800', icon: AlertCircle },
      medium: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      low: { color: 'bg-green-100 text-green-800', icon: CheckCircle }
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

  const getCategoryBadge = (category) => {
    const categoryConfig = {
      booking_inquiry: { color: 'bg-blue-100 text-blue-800', label: 'Booking' },
      complaint: { color: 'bg-red-100 text-red-800', label: 'Complaint' },
      partnership: { color: 'bg-purple-100 text-purple-800', label: 'Partnership' },
      technical_support: { color: 'bg-orange-100 text-orange-800', label: 'Technical' },
      general: { color: 'bg-gray-100 text-gray-800', label: 'General' }
    };

    const config = categoryConfig[category] || categoryConfig.general;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Tag className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading contact messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
              <p className="text-gray-600 mt-1">Manage customer inquiries and support requests</p>
            </div>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button
                onClick={fetchContactMessages}
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
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                <p className="text-2xl font-bold text-gray-900">{contactMessages.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New Messages</p>
                <p className="text-2xl font-bold text-gray-900">
                  {contactMessages.filter(m => m.status === 'new').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {contactMessages.filter(m => m.status === 'in_progress').length}
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
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {contactMessages.filter(m => m.status === 'resolved').length}
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
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {selectedMessages.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedMessages.length} selected
                </span>
                <button
                  onClick={() => handleBulkAction('assign_to_me')}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                >
                  Assign to Me
                </button>
                <button
                  onClick={() => handleBulkAction('mark_resolved')}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                >
                  Mark Resolved
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <div key={message.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedMessages.includes(message.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMessages(prev => [...prev, message.id]);
                      } else {
                        setSelectedMessages(prev => prev.filter(id => id !== message.id));
                      }
                    }}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{message.subject}</h3>
                      {getStatusBadge(message.status)}
                      {getPriorityBadge(message.priority)}
                      {getCategoryBadge(message.category)}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{message.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        <span>{message.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(message.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{message.message}</p>

                    {message.assignedAdminName && (
                      <div className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">Assigned to:</span> {message.assignedAdminName}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Last updated: {new Date(message.lastUpdated).toLocaleString()}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => console.log('View details:', message.id)}
                    className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>

                  {message.status === 'new' && (
                    <button
                      onClick={() => handleAssignToMe(message.id)}
                      className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Assign to Me
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setSelectedMessage(message);
                      setShowReplyModal(true);
                    }}
                    className="flex items-center px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    <Reply className="w-4 h-4 mr-1" />
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMessages.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
            <p className="text-gray-500">No contact messages match your current filters.</p>
          </div>
        )}

        {/* Reply Modal */}
        {showReplyModal && selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Reply to {selectedMessage.name}
              </h3>

              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Original message:</strong>
                </p>
                <p className="text-sm text-gray-800">{selectedMessage.message}</p>
              </div>

              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
              />

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowReplyModal(false);
                    setSelectedMessage(null);
                    setReplyText('');
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
