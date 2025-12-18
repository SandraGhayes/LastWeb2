import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./PageStyles.css";

function YourListings() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Temporary sample items _ now including price
  const [products, setProducts] = useState([
    { id: 1, name: "Wireless Earbuds Pro", stock: 24, price: 89.99, category: "Electronics", sales: 34, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200", status: "active" },
    { id: 2, name: "Smart Watch Series X", stock: 12, price: 199.99, category: "Electronics", sales: 28, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200", status: "active" },
    { id: 3, name: "Bluetooth Speaker", stock: 3, price: 65.00, category: "Electronics", sales: 25, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200", status: "low_stock" },
    { id: 4, name: "Laptop Stand Pro", stock: 18, price: 45.00, category: "Accessories", sales: 22, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200", status: "active" },
    { id: 5, name: "USB-C Hub 7-in-1", stock: 0, price: 35.00, category: "Accessories", sales: 19, image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=200", status: "out_of_stock" },
    { id: 6, name: "Gaming Mouse Pro", stock: 15, price: 89.00, category: "Gaming", sales: 45, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200", status: "active" },
  ]);

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const activeCount = products.filter(p => p.status === "active").length;
  const lowStockCount = products.filter(p => p.status === "low_stock").length;
  const outOfStockCount = products.filter(p => p.status === "out_of_stock").length;

  const filteredProducts = products.filter(product => {
    const matchesFilter = filter === "all" || product.status === filter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="seller-app">
      <Sidebar />
      <div className="page-container">
        <div className="page-header">
          <div className="header-content-left">
            <h1 className="page-title">
              <i className="fas fa-box"></i> Your Listings
            </h1>
            <p className="page-subtitle">Manage all your products in one place</p>
          </div>
          <Link to="/add-product" className="btn-primary-header">
            <i className="fas fa-plus"></i> Add Product
          </Link>
        </div>

        {/* Stats */}
        <div className="stats-row small">
          <div className="stat-card">
            <i className="fas fa-box"></i>
            <div className="stat-data">
              <span className="stat-num">{products.length}</span>
              <span className="stat-label">Total Products</span>
            </div>
          </div>
          <div className="stat-card completed">
            <i className="fas fa-check-circle"></i>
            <div className="stat-data">
              <span className="stat-num">{activeCount}</span>
              <span className="stat-label">Active</span>
            </div>
          </div>
          <div className="stat-card warning">
            <i className="fas fa-exclamation-triangle"></i>
            <div className="stat-data">
              <span className="stat-num">{lowStockCount}</span>
              <span className="stat-label">Low Stock</span>
            </div>
          </div>
          <div className="stat-card danger">
            <i className="fas fa-times-circle"></i>
            <div className="stat-data">
              <span className="stat-num">{outOfStockCount}</span>
              <span className="stat-label">Out of Stock</span>
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
                All ({products.length})
              </button>
              <button
                className={`filter-tab ${filter === "active" ? "active" : ""}`}
                onClick={() => setFilter("active")}
              >
                Active ({activeCount})
              </button>
              <button
                className={`filter-tab ${filter === "low_stock" ? "active" : ""}`}
                onClick={() => setFilter("low_stock")}
              >
                Low Stock ({lowStockCount})
              </button>
              <button
                className={`filter-tab ${filter === "out_of_stock" ? "active" : ""}`}
                onClick={() => setFilter("out_of_stock")}
              >
                Out of Stock ({outOfStockCount})
              </button>
            </div>
            <div className="filter-right">
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="view-toggle">
                <button
                  className={viewMode === "grid" ? "active" : ""}
                  onClick={() => setViewMode("grid")}
                >
                  <i className="fas fa-th"></i>
                </button>
                <button
                  className={viewMode === "list" ? "active" : ""}
                  onClick={() => setViewMode("list")}
                >
                  <i className="fas fa-list"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="content-card">
          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-inbox"></i>
              <h3>No products found</h3>
              <p>No products match your criteria.</p>
              <Link to="/add-product" className="btn-primary">
                <i className="fas fa-plus"></i> Add Your First Product
              </Link>
            </div>
          ) : viewMode === "grid" ? (
            <div className="product-grid-enhanced">
              {filteredProducts.map((product) => (
                <div key={product.id} className={`product-card-enhanced ${product.status}`}>
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} />
                    {product.status === "low_stock" && <span className="stock-badge warning">Low Stock</span>}
                    {product.status === "out_of_stock" && <span className="stock-badge danger">Out of Stock</span>}
                  </div>
                  <div className="product-content">
                    <span className="product-category">{product.category}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <div className="product-stats">
                      <span><i className="fas fa-box"></i> {product.stock} in stock</span>
                      <span><i className="fas fa-shopping-bag"></i> {product.sales} sold</span>
                    </div>
                    <div className="product-actions">
                      <button className="btn-edit"><i className="fas fa-edit"></i> Edit</button>
                      <button className="btn-delete" onClick={() => handleDelete(product.id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Sales</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="product-cell-with-img">
                          <img src={product.image} alt={product.name} />
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td className="amount">${product.price.toFixed(2)}</td>
                      <td>{product.stock}</td>
                      <td>{product.sales}</td>
                      <td>
                        <span className={`status-badge ${product.status === "active" ? "completed" : product.status === "low_stock" ? "pending" : "cancelled"}`}>
                          {product.status.replace("_", " ")}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn-small edit"><i className="fas fa-edit"></i></button>
                        <button className="action-btn-small delete" onClick={() => handleDelete(product.id)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default YourListings;
