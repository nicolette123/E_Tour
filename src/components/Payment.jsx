'use client';
import React, { useState } from 'react';
import SideBar from '@/components/SideBar';
import TopBar from './TopBar';
import "@/styles/dashboard.css";
import "@/styles/table.css";
import "@/styles/stats.css";

const mockData = [
  {
    id: 1,
    name: "alice",
    date: "2025-01-01",
    amount: "1000",
    paymentMethod: "Credit Card",
    status: "Completed"
  },
  {
    id: 2,
    name: "peter",
    date: "2025-01-01",
    amount: "1000",
    paymentMethod: "Credit Card",
    status: "Completed"
  },
  {
    id: 3,
    name: "teta",
    date: "2025-01-01",
    amount: "1000",
    paymentMethod: "Credit Card",
    status: "Completed"
  },
  {
    id: 4,
    name: "john",
    date: "2025-01-01",
    amount: "1000",
    paymentMethod: "Credit Card",
    status: "Completed"
  },
  {
    id: 5,
    name: "john",
    date: "2025-01-01",
    amount: "1000",
    paymentMethod: "Credit Card",
    status: "Rejected"
  }
];

const Payment = () => {
  const [payments, setPayments] = useState(mockData);
  const [selectedRows, setSelectedRows] = useState({});
  const [menuOpen, setMenuOpen] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [editRowId, setEditRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleCheckboxChange = (id) => {
    setSelectedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleMoreClick = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleEdit = (id) => {
    const payment = payments.find(payment => payment.id === id);
    setEditRowId(id);
    setEditFormData({
      name: payment.name,
      date: payment.date,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      status: payment.status
    });
    setMenuOpen(null);
  };

  const handleEditChange = (event, field) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSaveEdit = (id) => {
    setPayments(payments.map(payment =>
      payment.id === id ? { ...payment, ...editFormData } : payment
    ));
    setEditRowId(null);
    setEditFormData({});
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditFormData({});
  };

  const handleDelete = (id) => {
    setPayments(payments.filter(payment => payment.id !== id));
    setSelectedRows(prev => {
      const newSelected = { ...prev };
      delete newSelected[id];
      return newSelected;
    });
    setMenuOpen(null);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedPayments = [...payments].sort((a, b) => {
      const aValue = a[key] ? a[key].toString().toLowerCase() : '';
      const bValue = b[key] ? b[key].toString().toLowerCase() : '';
      
      if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setPayments(sortedPayments);
  };

  const handleAddRow = () => {
    const newPayment = {
      id: Math.max(...payments.map(p => p.id), 0) + 1,
      name: "New Person",
      date: new Date().toISOString().split('T')[0],
      amount: "0",
      paymentMethod: "Credit Card",
      status: "Pending"
    };
    setPayments([...payments, newPayment]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPayments = payments.filter(payment =>
    payment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Compute stats from payments data
  const totalMoney = payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
  const mobileMoney = payments.filter(payment => payment.paymentMethod === "Mobile Money").length;
  const visaCard = payments.filter(payment => payment.paymentMethod === "Credit Card" || payment.paymentMethod === "Debit Card").length;
  const masterCard = 0; // Assuming no MasterCard in mockData; adjust if card brand data is added

  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="main-content">
        <TopBar title="Payment" />
        <div className="content-body">
          <div className="stats-card">
            <div className="grid-container">
              <div className="grid-item">
                <h4>
                  
                  <i className="ri-money-dollar-circle-fill"></i> Total Money
                </h4>
                <p>{totalMoney}</p>
              </div>
              <div className="grid-item">
                <h4>
                  <i className="ri-money-dollar-circle-fill"></i> Mobile Money
                </h4>
                <p>{mobileMoney}</p>
              </div>
              <div className="grid-item">
                <h4>
                  <i className="ri-money-dollar-circle-fill"></i> Visa Card
                </h4>
                <p>{visaCard}</p>
              </div>
              <div className="grid-item">
                <h4>
                  <i className="ri-money-dollar-circle-fill"></i> MasterCard
                </h4>
                <p>{masterCard}</p>
              </div>
            </div>
          </div>
          <div className="trip-table">
            <h3>Payment History</h3>
            <div className="table-header">
              <i className="ri-add-large-fill" onClick={handleAddRow}></i>
              <i className="ri-sort-alphabet-asc" onClick={() => handleSort('name')}></i>
              <div className="search">
                <i className="ri-search-line"></i>
                <input
                  type="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <table>
              <thead>
                <tr className="table-header-row">
                  <th><input type="checkbox" /></th>
                  <th onClick={() => handleSort('name')}>Name {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
                  <th onClick={() => handleSort('date')}>Date {sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
                  <th onClick={() => handleSort('amount')}>Amount {sortConfig.key === 'amount' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
                  <th onClick={() => handleSort('paymentMethod')}>Payment Method {sortConfig.key === 'paymentMethod' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
                  <th onClick={() => handleSort('status')}>Status {sortConfig.key === 'status' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredPayments.length > 0 ? (
                  filteredPayments.map(payment => (
                    <tr key={payment.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={!!selectedRows[payment.id]}
                          onChange={() => handleCheckboxChange(payment.id)}
                        />
                      </td>
                      {editRowId === payment.id ? (
                        <>
                          <td><input type="text" value={editFormData.name} onChange={(e) => handleEditChange(e, 'name')} /></td>
                          <td><input type="date" value={editFormData.date} onChange={(e) => handleEditChange(e, 'date')} /></td>
                          <td><input type="number" value={editFormData.amount} onChange={(e) => handleEditChange(e, 'amount')} /></td>
                          <td>
                            <select value={editFormData.paymentMethod} onChange={(e) => handleEditChange(e, 'paymentMethod')}>
                              <option value="Credit Card">Credit Card</option>
                              <option value="Debit Card">Debit Card</option>
                              <option value="Cash">Cash</option>
                              <option value="Bank Transfer">Bank Transfer</option>
                              <option value="Mobile Money">Mobile Money</option>
                            </select>
                          </td>
                          <td>
                            <select value={editFormData.status} onChange={(e) => handleEditChange(e, 'status')}>
                              <option value="Completed">Completed</option>
                              <option value="Pending">Pending</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                          <td>
                            <div className="edit-form">
                              <button onClick={() => handleSaveEdit(payment.id)}>Save</button>
                              <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{payment.name}</td>
                          <td>{payment.date}</td>
                          <td>{payment.amount}</td>
                          <td>{payment.paymentMethod}</td>
                          <td>{payment.status}</td>
                          <td>
                            {selectedRows[payment.id] && (
                              <div className="more-container">
                                <i
                                  className="ri-more-fill"
                                  onClick={() => handleMoreClick(payment.id)}
                                ></i>
                                {menuOpen === payment.id && (
                                  <div className="more-menu">
                                    <button onClick={() => handleEdit(payment.id)}>Edit</button>
                                    <button onClick={() => handleDelete(payment.id)}>Delete</button>
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No payments found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;