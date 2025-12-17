import Sidebar from "../components/Sidebar";
import { useState } from "react";
import OrdersFilterBar from "../components/OrdersFilterBar";
import "./PageStyles.css";

function PendingOrders() {
  // Sample pending orders
  const [pendingOrders, setPendingOrders] = useState([
    {
      id: 1,
      product: "Football",
      quantity: 2,
      buyer: "John Doe",
      image: "https://i.imgur.com/sf1.jpg",
      category: "Sports",
      dateOrdered: "2025-01-15",
      price: 25.99,
    },
    {
      id: 2,
      product: "Basketball Shoes",
      quantity: 1,
      buyer: "Jane Smith",
      image: "https://i.imgur.com/523.jpg",
      category: "Sports",
      dateOrdered: "2025-01-14",
      price: 75.50,
    },
    {
      id: 3,
      product: "Tennis Racket",
      quantity: 1,
      buyer: "Mike Johnson",
      image: "https://i.imgur.com/UI1.jpg",
      category: "Sports",
      dateOrdered: "2025-01-13",
      price: 120.00,
    },
  ]);

  const [filteredOrders, setFilteredOrders] = useState(pendingOrders);

  // Optional: handle order cancellation
  const cancelOrder = (orderId) => {
    const orderToCancel = pendingOrders.find((o) => o.id === orderId);
    if (!orderToCancel) return;

    // Remove order from pending
    const updated = pendingOrders.filter((o) => o.id !== orderId);
    setPendingOrders(updated);
    setFilteredOrders(updated);

    // Here you can also increase product stock in YourListings
    // This requires lifting state or using global state/context
    alert(`Order for ${orderToCancel.product} cancelled. Stock should be updated.`);
  };

  const applyFilters = (filters) => {
    let data = [...pendingOrders];

    // By date ordered
    if (filters.dateSold) {
      data = data.filter((o) => o.dateOrdered === filters.dateSold);
    }

    // By date published
    if (filters.datePublished) {
      data = data.filter((o) => o.dateOrdered === filters.datePublished);
    }

    // Category
    if (filters.category.trim() !== "") {
      data = data.filter((o) =>
        o.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    // Price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange === "600+"
        ? [600, Infinity]
        : filters.priceRange.split("-").map(Number);

      data = data.filter((o) => o.price >= min && o.price <= max);
    }

    // Sorting
    if (filters.sort === "high-low") {
      data.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "low-high") {
      data.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "recent") {
      data.sort((a, b) => new Date(b.dateOrdered) - new Date(a.dateOrdered));
    }

    setFilteredOrders(data);
  };

  return (
    <div className="seller-app">
      <Sidebar />
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">
            <i className="fas fa-clock"></i> Pending Orders
          </h1>
          <p className="page-subtitle">These are all the orders that have been placed but not delivered yet</p>
        </div>

        <div className="content-card">
          <OrdersFilterBar onFilterChange={applyFilters} showDateSold={false} />
        </div>

        <div className="content-card">
          {filteredOrders.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-inbox"></i>
              <p>No pending orders found.</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredOrders.map((order) => (
                <div key={order.id} className="product-card">
                  <img
                    src={order.image}
                    alt={order.product}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3 className="product-name">{order.product}</h3>
                    {order.category && <p className="product-stock"><strong>Category:</strong> {order.category}</p>}
                    <p className="product-stock">Quantity: {order.quantity}</p>
                    {order.price && <p className="product-price">Price: ${order.price.toFixed(2)}</p>}
                    <p className="product-stock">Buyer: {order.buyer}</p>
                    {order.dateOrdered && <p className="product-stock" style={{ fontSize: "12px" }}>Date: {order.dateOrdered}</p>}
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="btn-danger"
                      style={{ width: "100%", marginTop: "10px" }}
                    >
                      <i className="fas fa-times"></i> Cancel Order
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
