"use client"
import React, { useState } from 'react';
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
  };

  return (
    <div className="manage-client-container">
      <h1 className="page-title">Manage Clients</h1>
      {clients.length > 0 ? (
        <div className="client-list">
          {clients.map(client => (
            <div key={client.id} className="client-card">
              <div className="client-details">
                <h2 className="client-name">{client.name}</h2>
                <p><strong>Email:</strong> {client.email}</p>
                <p><strong>Trip:</strong> {client.appliedTrip}</p>
                <p>
                  <strong>Status:</strong> <span className={`status-badge status-${client.status.toLowerCase()}`}>{client.status}</span>
                </p>
              </div>
              <div className="client-actions">
                {client.status === 'Pending' && (
                  <>
                    <button 
                      className="action-button approve-button" 
                      onClick={() => handleApprove(client)}
                    >
                      Approve
                    </button>
                    <button 
                      className="action-button reject-button" 
                      onClick={() => handleReject(client)}
                    >
                      Reject
                    </button>
                  </>
                )}
                <button 
                  className="action-button contact-button" 
                  onClick={() => handleContact(client)}
                >
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-clients-message">No clients have applied for trips yet.</p>
      )}
      <ConfirmationModal />
    </div>
  );
}