'use client';

import React, { useState } from 'react';
import {
  Users,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  UserPlus,
  Eye,
  MessageCircle
} from 'lucide-react';
import './ManageClient.css';

// Dummy data for clients who have applied for a trip
const initialClients = [
  {
    id: 1,
    name: 'Uwase Aline',
    email: 'uwase.aline@example.com',
    phone: '+250 788 123 456',
    appliedTrip: 'Client Meeting in Musanze',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Niyonsaba Jean',
    email: 'niyonsaba.jean@example.com',
    phone: '+250 788 654 321',
    appliedTrip: 'Kigali Office Visit',
    status: 'Approved',
  },
  {
    id: 3,
    name: 'Mutabazi David',
    email: 'mutabazi.david@example.com',
    phone: '+250 788 987 654',
    appliedTrip: 'Site Inspection in Rubavu',
    status: 'Pending',
  },
  {
    id: 4,
    name: 'Kwizera Sarah',
    email: 'kwizera.sarah@example.com',
    phone: '+250 788 111 222',
    appliedTrip: 'Client Meeting in Musanze',
    status: 'Rejected',
  },
];

export default function ManageClientPage() {
  const [clients, setClients] = useState(initialClients);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // A modal for confirmation
  const ConfirmationModal = () => {
    if (!showModal || !selectedClient) return null;

    const { actionType } = selectedClient;
    
    const handleConfirm = () => {
      const newClients = clients.map(client => {
        if (client.id === selectedClient.id) {
          if (actionType === 'approve') {
            return { ...client, status: 'Approved' };
          } else if (actionType === 'reject') {
            return { ...client, status: 'Rejected' };
          }
        }
        return client;
      });
      setClients(newClients);
      setShowModal(false);
      setSelectedClient(null);
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Confirm Action</h3>
          <p>Are you sure you want to {actionType} {selectedClient.name}'s application?</p>
          <div className="modal-actions">
            <button className="confirm-btn" onClick={handleConfirm}>Yes, {actionType}</button>
            <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  const handleApprove = (client) => {
    setSelectedClient({ ...client, actionType: 'approve' });
    setShowModal(true);
  };

  const handleReject = (client) => {
    setSelectedClient({ ...client, actionType: 'reject' });
    setShowModal(true);
  };

  const handleContact = (client) => {
    console.log(`Contacting client: ${client.name} at ${client.email}`);
    // Open email client or show contact modal
    window.location.href = `mailto:${client.email}?subject=Regarding your trip application&body=Dear ${client.name},%0D%0A%0D%0A`;
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter clients based on search and status
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.appliedTrip.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || client.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Clients</h1>
            <p className="text-gray-600">Review and manage client applications</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
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
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {filteredClients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map(client => (
              <div key={client.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                {/* Client Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-lg font-semibold text-blue-600">
                        {client.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                      <div className="flex items-center mt-1">
                        {client.status === 'Pending' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </span>
                        )}
                        {client.status === 'Approved' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approved
                          </span>
                        )}
                        {client.status === 'Rejected' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                            <XCircle className="w-3 h-3 mr-1" />
                            Rejected
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Client Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {client.email}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {client.phone}
                  </div>

                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{client.appliedTrip}</span>
                  </div>
                </div>

                {/* Client Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    {client.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(client)}
                          className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(client)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handleContact(client)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Contact Client"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => console.log('View client details:', client)}
                      className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No clients found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== 'all'
                  ? "No clients match your current filters."
                  : "No clients have applied for trips at this time."}
              </p>
              <button
                onClick={() => window.location.href = '/agent/clients/add'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors mx-auto"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add First Client</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmationModal />
    </div>
  );
}