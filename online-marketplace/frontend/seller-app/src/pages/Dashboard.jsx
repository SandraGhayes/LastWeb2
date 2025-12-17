import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Temporary frontend values — dynamic later with backend
  const [stats] = useState({
    totalProducts: 12,
    pendingOrders: 5,
    salesCompleted: 48,
    revenue: 2350,
  });

  const [recentSales] = useState([
    { id: 1, product: "Gaming Mouse", buyer: "Omar Khaled", amount: 45 },
    { id: 2, product: "PS5 Controller", buyer: "Laila Samir", amount: 60 },
    { id: 3, product: "Nintendo Switch Case", buyer: "Youssef Ali", amount: 22 },
    { id: 4, product: "Gaming Headset", buyer: "Mona Adel", amount: 80 },
  ]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.isAuthenticated && userData.type === 'seller') {
      setUser(userData);
    } else {
      navigate('/login');
    }
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  const statCards = [
    { label: "Total Listings", value: stats.totalProducts, icon: "fa-box", color: "#1a5d3a" },
    { label: "Pending Orders", value: stats.pendingOrders, icon: "fa-clock", color: "#ffcc00" },
    { label: "Sales Completed", value: stats.salesCompleted, icon: "fa-check-circle", color: "#1a5d3a" },
    { label: "Revenue", value: "$" + stats.revenue.toLocaleString(), icon: "fa-dollar-sign", color: "#ffcc00" }
  ];

  return (
    <div className="seller-app">
      <Sidebar />
      <div className="dashboard-content">
        {/* Top Banner */}
        <div className="dashboard-banner">
          <div className="banner-content">
            <h1 className="banner-title">
              Welcome back, <span>{user?.name || 'Seller'}</span>!
            </h1>
            <p className="banner-subtitle">Manage your store and track your sales performance</p>
          </div>
        </div>

        <div className="dashboard-container">
          {/* Stats Cards */}
          <div className="stats-grid">
            {statCards.map((card, index) => (
              <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="stat-icon" style={{ background: `${card.color}20`, color: card.color }}>
                  <i className={`fas ${card.icon}`}></i>
                </div>
                <div className="stat-info">
                  <h2 className="stat-value">{card.value}</h2>
                  <p className="stat-label">{card.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <section className="quick-actions-section">
            <h2 className="section-title">
              <i className="fas fa-bolt"></i> Quick Actions
            </h2>
            <div className="quick-actions">
              <Link to="/add-product" className="action-btn">
                <i className="fas fa-plus-circle"></i>
                <span>Add Product</span>
              </Link>
              <Link to="/your-listings" className="action-btn">
                <i className="fas fa-box"></i>
                <span>Your Listings</span>
              </Link>
              <Link to="/pending-orders" className="action-btn">
                <i className="fas fa-clock"></i>
                <span>Pending Orders</span>
              </Link>
              <Link to="/history" className="action-btn">
                <i className="fas fa-history"></i>
                <span>Sales History</span>
              </Link>
            </div>
          </section>

          {/* Recent Sales */}
          <section className="recent-sales-section">
            <h2 className="section-title">
              <i className="fas fa-chart-line"></i> Recent Sales
            </h2>
            <div className="sales-table-container">
              {recentSales.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-inbox"></i>
                  <p>No recent sales.</p>
                </div>
              ) : (
                <table className="sales-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Buyer</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSales.map((sale) => (
                      <tr key={sale.id}>
                        <td>{sale.product}</td>
                        <td>{sale.buyer}</td>
                        <td className="amount-cell">${sale.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
