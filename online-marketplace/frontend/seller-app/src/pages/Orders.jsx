import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PageStyles.css";

function Orders() {
  const navigate = useNavigate();

  // Sample pending orders (same data as your PendingOrders page)
  const [pendingOrders] = useState([
    {
      id: 1,
      product: "Football",
      quantity: 2,
      buyer: "John Doe",
      image: "https://i.imgur.com/sf1.jpg",
    },
    {
      id: 2,
      product: "Basketball Shoes",
      quantity: 1,
      buyer: "Jane Smith",
      image: "https://i.imgur.com/523.jpg",
    },
  ]);

  // Sample sold orders (same as your History page)
  const [soldOrders] = useState([
    {
      id: 1,
      product: "PlayStation 5",
      quantity: 2,
      buyer: "John Doe",
      price: 499,
      date: "2025-12-01",
      image: "https://i.imgur.com/PS5.jpg",
    },
    {
      id: 2,
      product: "Nintendo Switch",
      quantity: 1,
      buyer: "Jane Smith",
      price: 299,
      date: "2025-12-02",
      image: "https://i.imgur.com/NS.jpg",
    },
  ]);

  // Show only the first **2** recent items
  const recentPending = pendingOrders.slice(0, 2);
  const recentHistory = soldOrders.slice(0, 2);

  return (
    <div className="seller-app">
      <Sidebar />
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">
            <i className="fas fa-shopping-cart"></i> Orders Overview
          </h1>
          <p className="page-subtitle">Manage your pending orders and view sales history</p>
        </div>

        {/* PENDING ORDERS PREVIEW */}
        <div className="content-card">
          <h2 className="section-title">
            <i className="fas fa-clock"></i> Pending Orders
          </h2>
          <p style={{ color: "#666", marginBottom: "20px" }}>Your most recent pending orders</p>

          {recentPending.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-inbox"></i>
              <p>No pending orders at the moment.</p>
            </div>
          ) : (
            <>
              <div className="product-grid">
                {recentPending.map((order) => (
                  <div key={order.id} className="product-card">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="product-image"
                    />
                    <div className="product-info">
                      <h3 className="product-name">{order.product}</h3>
                      <p className="product-stock">Quantity: {order.quantity}</p>
                      <p className="product-stock">Buyer: {order.buyer}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/pending-orders")}
                className="btn-primary"
                style={{ marginTop: "20px" }}
              >
                <i className="fas fa-arrow-right"></i> View More
              </button>
            </>
          )}
        </div>

        {/* SALES HISTORY PREVIEW */}
        <div className="content-card">
          <h2 className="section-title">
            <i className="fas fa-history"></i> Sales History
          </h2>
          <p style={{ color: "#666", marginBottom: "20px" }}>Your latest completed orders</p>

          {recentHistory.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-inbox"></i>
              <p>No sales history yet.</p>
            </div>
          ) : (
            <>
              <div className="product-grid">
                {recentHistory.map((order) => (
                  <div key={order.id} className="product-card">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="product-image"
                    />
                    <div className="product-info">
                      <h3 className="product-name">{order.product}</h3>
                      <p className="product-stock">Quantity: {order.quantity}</p>
                      <p className="product-price">${order.price.toFixed(2)}</p>
                      <p className="product-stock">Total: ${(order.price * order.quantity).toFixed(2)}</p>
                      <p className="product-stock" style={{ fontSize: "12px" }}>Date: {order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/history")}
                className="btn-primary"
                style={{ marginTop: "20px", background: "linear-gradient(135deg, #1a5d3a 0%, #0d3b2a 100%)" }}
              >
                <i className="fas fa-arrow-right"></i> View More
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
