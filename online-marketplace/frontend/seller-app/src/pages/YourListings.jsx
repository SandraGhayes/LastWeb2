import Sidebar from "../components/Sidebar";
import { useState } from "react";
import "./PageStyles.css";

function YourListings() {
  // Temporary sample items — now including price
  const [products, setProducts] = useState([
    { id: 1, name: "Football", stock: 10, price: 25.99, image: "https://i.imgur.com/sf1.jpg" },
    { id: 2, name: "Basketball Shoes", stock: 5, price: 75.5, image: "https://i.imgur.com/523.jpg" },
    { id: 3, name: "Tennis Racket", stock: 8, price: 120.0, image: "https://i.imgur.com/UI1.jpg" },
  ]);

  return (
    <div className="seller-app">
      <Sidebar />
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">
            <i className="fas fa-box"></i> Your Listings
          </h1>
          <p className="page-subtitle">These are all the products you currently have listed for sale</p>
        </div>

        <div className="content-card">
          {products.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-inbox"></i>
              <p>No products listed yet. <a href="/add-product">Add your first product</a></p>
            </div>
          ) : (
            <div className="product-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <p className="product-stock">Available: {product.stock}</p>
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

export default YourListings;
