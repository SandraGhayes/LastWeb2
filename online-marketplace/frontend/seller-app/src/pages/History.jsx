import Sidebar from "../components/Sidebar";
import { useState } from "react";
import OrdersFilterBar from "../components/OrdersFilterBar";
import "./PageStyles.css";


function History() {
  // Sample sold orders for frontend display
  const [soldOrders, setSoldOrders] = useState([
    {
      id: 1,
      product: "PlayStation 5",
      category: "Gaming",
      quantity: 2,
      buyer: "John Doe",
      price: 499,
      date: "2025-12-01",
      datePublished: "2025-11-20",
      image: "https://i.imgur.com/PS5.jpg",
    },
    {
      id: 2,
      product: "Nintendo Switch",
      category: "Gaming",
      quantity: 1,
      buyer: "Jane Smith",
      price: 299,
      date: "2025-12-02",
      datePublished: "2025-11-25",
      image: "https://i.imgur.com/NS.jpg",
    },
  ]);
  
  const [filteredOrders, setFilteredOrders] = useState(soldOrders);

  const applyFilters = (filters) => {
    let data = [...soldOrders];

    // By date sold
    if (filters.dateSold) {
      data = data.filter((o) => o.date === filters.dateSold);
    }

    // By date published
    if (filters.datePublished) {
      data = data.filter((o) => o.datePublished === filters.datePublished);
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
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredOrders(data);
  };


  
return (
    <div className="seller-app">
      <Sidebar />
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">
            <i className="fas fa-history"></i> Sales History
          </h1>
          <p className="page-subtitle">View all your completed sales and transactions</p>
        </div>

        <div className="content-card">
          <OrdersFilterBar onFilterChange={applyFilters} showDateSold={true} />
        </div>
        
        <div className="content-card">
          {filteredOrders.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-inbox"></i>
              <p>No sales history found.</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredOrders.map((order) => (
                <div key={order.id} className="product-card">
                  <img src={order.image} alt={order.product} className="product-image" />
                  <div className="product-info" style={{ textAlign: "left" }}>
                    <h3 className="product-name">{order.product}</h3>
                    <p className="product-stock"><strong>Category:</strong> {order.category}</p>
                    <p className="product-stock"><strong>Quantity:</strong> {order.quantity}</p>
                    <p className="product-price">Price: ${order.price}</p>
                    <p className="product-price">Total: ${(order.price * order.quantity).toFixed(2)}</p>
                    <p className="product-stock"><strong>Buyer:</strong> {order.buyer}</p>
                    <p className="product-stock" style={{ fontSize: "12px" }}><strong>Date Sold:</strong> {order.date}</p>
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

export default History;