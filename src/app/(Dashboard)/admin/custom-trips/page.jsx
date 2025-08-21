"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useApi";
import {
  MapPin,
  Users,
  DollarSign,
  Calendar,
  Search,
  Filter,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  RefreshCw,
  User,
  Star
} from "lucide-react";
import "../shared-styles.css";

export default function AdminCustomTrips() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [customTripRequests, setCustomTripRequests] = useState([
    {
      id: '1',
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah@example.com',
      destination: 'Volcanoes National Park',
      budget: 2500,
      interests: 'Gorilla trekking, Photography',
      preferredStartDate: '2024-03-15',
      preferredEndDate: '2024-03-20',
      groupSize: 4,
      clientNotes: 'Looking for a premium gorilla trekking experience with professional photography guidance.',
      status: 'pending',
      createdAt: '2024-01-15T10:30:00Z',
      assignedAgent: null,
      priority: 'high'
    },
    {
      id: '2',
      clientName: 'Michael Chen',
      clientEmail: 'michael@example.com',
      destination: 'Lake Kivu',
      budget: 1200,
      interests: 'Relaxation, Water sports',
      preferredStartDate: '2024-04-01',
      preferredEndDate: '2024-04-05',
      groupSize: 2,
      clientNotes: 'Honeymoon trip, looking for romantic lakeside accommodation.',
      status: 'assigned',
      createdAt: '2024-01-14T14:20:00Z',
      assignedAgent: {
        id: 'agent1',
        name: 'David Mukamana',
        email: 'david@laketoursrw.com',
        rating: 4.8
      },
      priority: 'medium'
    },
    {
      id: '3',
      clientName: 'Emma Wilson',
      clientEmail: 'emma@example.com',
      destination: 'Nyungwe Forest',
      budget: 800,
      interests: 'Hiking, Bird watching',
      preferredStartDate: '2024-02-20',
      preferredEndDate: '2024-02-23',
      groupSize: 1,
      clientNotes: 'Solo traveler interested in canopy walk and bird watching tours.',
      status: 'completed',
      createdAt: '2024-01-10T09:15:00Z',
      assignedAgent: {
        id: 'agent2',
        name: 'Grace Uwimana',
        email: 'grace@forestadventures.rw',
        rating: 4.9
      },
      priority: 'low'
    }
  ]);

  const [availableAgents] = useState([
    { id: 'agent1', name: 'David Mukamana', email: 'david@laketoursrw.com', rating: 4.8, specialization: 'Lake Tours' },
    { id: 'agent2', name: 'Grace Uwimana', email: 'grace@forestadventures.rw', rating: 4.9, specialization: 'Forest Adventures' },
    { id: 'agent3', name: 'Jean Baptiste', email: 'jean@gorillatours.rw', rating: 4.7, specialization: 'Gorilla Trekking' },
    { id: 'agent4', name: 'Alice Mutoni', email: 'alice@rwandatours.com', rating: 4.6, specialization: 'Cultural Tours' }
  ]);

  // Check authentication
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'admin')) {
      window.location.href = '/login';
    }
  }, [isAuthenticated, user, authLoading]);

  const fetchCustomTripRequests = async () => {
    setLoading(true);
    try {
      // GET /admin/custom-trips
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real implementation, update customTripRequests from API
    } catch (error) {
      console.error('Failed to fetch custom trip requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomTripRequests();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleAssignAgent = async (requestId, agentId) => {
    try {
      // POST /admin/custom-trips/:id/assign
      console.log(`Assigning agent ${agentId} to request ${requestId}`);

      const agent = availableAgents.find(a => a.id === agentId);

      setCustomTripRequests(prev => prev.map(request =>
        request.id === requestId
          ? { ...request, status: 'assigned', assignedAgent: agent }
          : request
      ));

      setShowAssignModal(false);
      setSelectedRequest(null);
    } catch (error) {
      console.error('Failed to assign agent:', error);
    }
  };

  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      // PUT /admin/custom-trips/:id
      console.log(`Updating request ${requestId} to ${newStatus}`);

      setCustomTripRequests(prev => prev.map(request =>
        request.id === requestId
          ? { ...request, status: newStatus }
          : request
      ));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const filteredRequests = customTripRequests.filter(request => {
    const matchesSearch = request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.interests.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      assigned: { color: 'bg-blue-100 text-blue-800', icon: UserCheck },
      in_progress: { color: 'bg-purple-100 text-purple-800', icon: RefreshCw },
      completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle }
    };

    const config = statusConfig[status] || statusConfig.pending;
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
      high: { color: 'bg-red-100 text-red-800' },
      medium: { color: 'bg-yellow-100 text-yellow-800' },
      low: { color: 'bg-green-100 text-green-800' }
    };

    const config = priorityConfig[priority] || priorityConfig.medium;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading custom trip requests...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Custom Trip Requests</h1>
              <p className="text-gray-600 mt-1">Manage and assign custom trip requests to agents</p>
            </div>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button
                onClick={fetchCustomTripRequests}
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
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{customTripRequests.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customTripRequests.filter(r => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Assigned</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customTripRequests.filter(r => r.status === 'assigned').length}
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
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customTripRequests.filter(r => r.status === 'completed').length}
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
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{request.clientName}</h3>
                    <p className="text-sm text-gray-500">{request.clientEmail}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getPriorityBadge(request.priority)}
                  {getStatusBadge(request.status)}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{request.destination}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span>Budget: ${request.budget.toLocaleString()}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{request.groupSize} travelers</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {new Date(request.preferredStartDate).toLocaleDateString()} - {' '}
                    {new Date(request.preferredEndDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Interests:</p>
                <p className="text-sm text-gray-600">{request.interests}</p>
              </div>

              {request.clientNotes && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Client Notes:</p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {request.clientNotes}
                  </p>
                </div>
              )}

              {request.assignedAgent && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">Assigned Agent:</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-900">{request.assignedAgent.name}</p>
                      <p className="text-sm text-blue-600">{request.assignedAgent.email}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600">{request.assignedAgent.rating}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Created: {new Date(request.createdAt).toLocaleDateString()}
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => console.log('View details:', request.id)}
                    className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>

                  {request.status === 'pending' && (
                    <button
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowAssignModal(true);
                      }}
                      className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      <UserCheck className="w-4 h-4 mr-1" />
                      Assign Agent
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
            <p className="text-gray-500">No custom trip requests match your current filters.</p>
          </div>
        )}

        {/* Assign Agent Modal */}
        {showAssignModal && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Assign Agent to {selectedRequest.clientName}'s Request
              </h3>

              <div className="space-y-3 mb-6">
                {availableAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleAssignAgent(selectedRequest.id, agent.id)}
                  >
                    <div>
                      <p className="font-medium text-gray-900">{agent.name}</p>
                      <p className="text-sm text-gray-500">{agent.specialization}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600">{agent.rating}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedRequest(null);
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
