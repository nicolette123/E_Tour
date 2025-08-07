"use client";

import React, { useState } from "react";
import "./payment.css";

const mockData = [
  {
    id: 1,
    name: "Alice Mutesi",
    date: "2025-01-01",
    amount: 100000, // In RWF
    paymentMethod: "Mobile Money",
    status: "Completed",
  },
  {
    id: 2,
    name: "Peter Nkurunziza",
    date: "2025-02-01",
    amount: 150000,
    paymentMethod: "Credit Card",
    status: "Pending",
  },
  {
    id: 3,
    name: "Teta Uwase",
    date: "2025-03-01",
    amount: 200000,
    paymentMethod: "Bank Transfer",
    status: "Completed",
  },
  {
    id: 4,
    name: "John Mugabo",
    date: "2025-04-01",
    amount: 120000,
    paymentMethod: "Cash",
    status: "Rejected",
  },
  {
    id: 5,
    name: "Marie Ingabire",
    date: "2025-05-01",
    amount: 180000,
    paymentMethod: "Mobile Money",
    status: "Pending",
  },
];

const Payment = () => {
  const [payments, setPayments] = useState(mockData);
  const [selectedRows, setSelectedRows] = useState({});
  const [menuOpen, setMenuOpen] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [searchTerm, setSearchTerm] = useState("");
  const [editRowId, setEditRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMoreClick = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleEdit = (id) => {
    const payment = payments.find((payment) => payment.id === id);
    setEditRowId(id);
    setEditFormData({
      name: payment.name,
      date: payment.date,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      status: payment.status,
    });
    setMenuOpen(null);
  };

  const handleEditChange = (event, field) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSaveEdit = (id) => {
    setPayments(payments.map((payment) =>
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
    setPayments(payments.filter((payment) => payment.id !== id));
    setSelectedRows((prev) => {
      const newSelected = { ...prev };
      delete newSelected[id];
      return newSelected;
    });
    setMenuOpen(null);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedPayments = [...payments].sort((a, b) => {
      const aValue = a[key] ? a[key].toString().toLowerCase() : "";
      const bValue = b[key] ? b[key].toString().toLowerCase() : "";
      if (aValue < bValue) return direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setPayments(sortedPayments);
  };

  const handleAddRow = () => {
    const newPayment = {
      id: Math.max(...payments.map((p) => p.id), 0) + 1,
      name: "New Person",
      date: new Date().toISOString().split("T")[0],
      amount: 0,
      paymentMethod: "Cash",
      status: "Pending",
    };
    setPayments([...payments, newPayment]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPayments = payments.filter(
    (payment) =>
      payment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalMoney = payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
  const mobileMoney = payments.filter((payment) => payment.paymentMethod === "Mobile Money").length;
  const cardPayments = payments.filter(
    (payment) => payment.paymentMethod === "Credit Card" || payment.paymentMethod === "Debit Card"
  ).length;
  const cashPayments = payments.filter((payment) => payment.paymentMethod === "Cash").length;

  return (
    <div className="payment-dashboard">
      <h1 className="dashboard-title">Payment Management</h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <i className="ri-money-dollar-circle-line"></i>
          <h3>Total Revenue (RWF)</h3>
          <p>{totalMoney.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <i className="ri-smartphone-line"></i>
          <h3>Mobile Money</h3>
          <p>{mobileMoney}</p>
        </div>
        <div className="stat-card">
          <i className="ri-bank-card-line"></i>
          <h3>Card Payments</h3>
          <p>{cardPayments}</p>
        </div>
        <div className="stat-card">
          <i className="ri-coins-line"></i>
          <h3>Cash Payments</h3>
          <p>{cashPayments}</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="payments-table-container">
        <div className="table-header">
          <h2>Payment History</h2>
          <div className="table-actions">
            <button className="add-btn" onClick={handleAddRow}>
              <i className="ri-add-line"></i> Add Payment
            </button>
            <div className="search-bar">
              <i className="ri-search-line"></i>
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <table className="payments-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th onClick={() => handleSort("name")}>
                Name {sortConfig.key === "name" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("date")}>
                Date {sortConfig.key === "date" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("amount")}>
                Amount (RWF) {sortConfig.key === "amount" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("paymentMethod")}>
                Payment Method {sortConfig.key === "paymentMethod" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("status")}>
                Status {sortConfig.key === "status" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
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
                      <td>
                        <input
                          type="text"
                          value={editFormData.name}
                          onChange={(e) => handleEditChange(e, "name")}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          value={editFormData.date}
                          onChange={(e) => handleEditChange(e, "date")}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editFormData.amount}
                          onChange={(e) => handleEditChange(e, "amount")}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <select
                          value={editFormData.paymentMethod}
                          onChange={(e) => handleEditChange(e, "paymentMethod")}
                          className="edit-select"
                        >
                          <option value="Credit Card">Credit Card</option>
                          <option value="Debit Card">Debit Card</option>
                          <option value="Cash">Cash</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Mobile Money">Mobile Money</option>
                        </select>
                      </td>
                      <td>
                        <select
                          value={editFormData.status}
                          onChange={(e) => handleEditChange(e, "status")}
                          className="edit-select"
                        >
                          <option value="Completed">Completed</option>
                          <option value="Pending">Pending</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td>
                        <div className="edit-actions">
                          <button className="action-btn save" onClick={() => handleSaveEdit(payment.id)}>
                            <i className="ri-save-line"></i> Save
                          </button>
                          <button className="action-btn cancel" onClick={handleCancelEdit}>
                            <i className="ri-close-line"></i> Cancel
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{payment.name}</td>
                      <td>{payment.date}</td>
                      <td>{payment.amount.toLocaleString()}</td>
                      <td>{payment.paymentMethod}</td>
                      <td>
                        <span className={`status ${payment.status.toLowerCase()}`}>{payment.status}</span>
                      </td>
                      <td>
                        {selectedRows[payment.id] && (
                          <div className="more-container">
                            <i
                              className="ri-more-2-fill"
                              onClick={() => handleMoreClick(payment.id)}
                            ></i>
                            {menuOpen === payment.id && (
                              <div className="more-menu">
                                <button onClick={() => handleEdit(payment.id)}>
                                  <i className="ri-edit-line"></i> Edit
                                </button>
                                <button onClick={() => handleDelete(payment.id)}>
                                  <i className="ri-delete-bin-line"></i> Delete
                                </button>
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
                <td colSpan="7" className="no-data">No payments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;