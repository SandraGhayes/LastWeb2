import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./PageStyles.css";

function PendingOrders() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [pendingOrders, setPendingOrders] = useState([
    { id: 1231, product: "Wireless Earbuds Pro", qty: 2, buyer: "Ahmed M.", email: "ahmed@email.com", amount: 178, date: "2024-01-15", status: "Awaiting Shipment", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100" },
    { id: 1230, product: "Smart Watch Series X", qty: 1, buyer: "Sara K.", email: "sara@email.com", amount: 199, date: "2024-01-15", status: "Processing", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100" },
    { id: 1229, product: "Bluetooth Speaker", qty: 1, buyer: "Omar A.", email: "omar@email.com", amount: 65, date: "2024-01-14", status: "Awaiting Shipment", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100" },
    { id: 1228, product: "Laptop Stand Pro", qty: 1, buyer: "Laila A.", email: "laila@email.com", amount: 45, date: "2024-01-14", status: "Processing", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100" },
    { id: 1227, product: "USB-C Hub 7-in-1", qty: 2, buyer: "Youssef K.", email: "youssef@email.com", amount: 70, date: "2024-01-13", status: "Awaiting Shipment", image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=100" },
  ]);

  const handleShip = (orderId) => {
    setPendingOrders(pendingOrders.filter(o => o.id !== orderId));
    alert(`Order #${orderId} marked as shipped!`);
  };

  const handleCancel = (orderId) => {
    if (window.confirm(`Are you sure you want to cancel order #${orderId}?`)) {
      setPendingOrders(pendingOrders.filter(o => o.id !== orderId));
    }
  };

  const filteredOrders = pendingOrders.filter(order => {
    const matchesFilter = filter === "all" ||
      (filter === "awaiting" && order.status === "Awaiting Shipment") ||
      (filter === "processing" && order.status === "Processing");
    const matchesSearch = order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const awaitingCount = pendingOrders.filter(o => o.status === "Awaiting Shipment").length;
  const processingCount = pendingOrders.filter(o => o.status === "Processing").length;

  return (
    <div className="seller-app">
      <Sidebar />
      <div className="page-container">
        <div className="page-header">
          <div className="header-content-left">
            <h1 className="page-title">
              <i className="fas fa-clock"></i> Pending Orders
            </h1>
            <p className="page-subtitle">Orders that need your attention</p>
          </div>
          <div className="header-stats">
            <div className="header-stat">
              <span className="num">{pendingOrders.length}</span>
              <span className="label">Total Pending</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="content-card filter-card">
          <div className="filter-row">
            <div className="filter-tabs">
              <button
                className={`filter-tab ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All ({pendingOrders.length})
              </button>
              <button
                className={`filter-tab ${filter === "awaiting" ? "active" : ""}`}
                onClick={() => setFilter("awaiting")}
              >
                <i className="fas fa-truck"></i> Awaiting Shipment ({awaitingCount})
              </button>
              <button
                className={`filter-tab ${filter === "processing" ? "active" : ""}`}
                onClick={() => setFilter("processing")}
              >
                <i className="fas fa-cog"></i> Processing ({processingCount})
              </button>
            </div>
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="content-card">
          {filteredOrders.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-inbox"></i>
              <h3>No pending orders</h3>
              <p>All caught up! No orders match your criteria.</p>
            </div>
          ) : (
            <div className="orders-list-enhanced">
              {filteredOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-main">
                    <img src={order.image} alt={order.product} className="order-img" />
                    <div className="order-details">
                      <div className="order-header">
                        <span className="order-id">Order #{order.id}</span>
                        <span className={`status-badge ${order.status === "Processing" ? "processing" : "pending"}`}>
                          {order.status}
                        </span>
                      </div>
                      <h3 className="order-product">{order.product}</h3>
                      <p className="order-qty">Quantity: {order.qty}</p>
                    </div>
                  </div>
                  <div className="order-customer">
                    <h4>Customer</h4>
                    <p className="customer-name"><i className="fas fa-user"></i> {order.buyer}</p>
                    <p className="customer-email"><i className="fas fa-envelope"></i> {order.email}</p>
                  </div>
                  <div className="order-info">
                    <div className="info-item">
                      <span className="info-label">Order Date</span>
                      <span className="info-value">{order.date}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Amount</span>
                      <span className="info-value amount">${order.amount}</span>
                    </div>
                  </div>
                  <div className="order-actions">
                    <button className="btn-ship" onClick={() => handleShip(order.id)}>
                      <i className="fas fa-truck"></i> Mark as Shipped
                    </button>
                    <button className="btn-cancel" onClick={() => handleCancel(order.id)}>
                      <i className="fas fa-times"></i> Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PendingOrders;
