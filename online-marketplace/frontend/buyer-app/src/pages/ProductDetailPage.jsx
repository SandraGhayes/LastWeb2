// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { categories } from "../data/categories";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  useEffect(() => {

    let foundProduct = null;

    for (const categoryProducts of Object.values(products)) {
      foundProduct = categoryProducts.find((p) => p.id === parseInt(productId));
      if (foundProduct) break;
    }

    if (foundProduct) {
      setProduct(foundProduct);
    } else {

      navigate("/");
    }
  }, [productId, navigate]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star filled">
          ★
        </span>
      );
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">
          ☆
        </span>
      );
    }
    return stars;
  };

  const formatPrice = (price) => {
    return price.toLocaleString("en-EG");
  };

  const calculateSavings = () => {
    if (product.originalPrice > product.price) {
      return product.originalPrice - product.price;
    }
    return 0;
  };

  const calculateDiscount = () => {
    if (product.originalPrice > product.price) {
      return Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      );
    }
    return 0;
  };

  if (!product) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }


  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span> › </span>
        <Link to={`/category/electronics`}>Electronics</Link>
        <span> › </span>
        <span>{product.name}</span>
      </div>

      {/* Success Message */}
      {showAddedMessage && (
        <div className="added-to-cart-message">
          <div className="message-content">
            <span className="check-icon">✓</span>
            <span>Added to Cart</span>
          </div>
        </div>
      )}

      <div className="product-detail-container">
        {/* Images Section */}
        <div className="product-images-section">
          <div className="image-thumbnails">
            {productImages.map((img, index) => (
              <div
                key={index}
                className={`thumbnail ${selectedImage === index ? "active" : ""
                  }`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="main-image">
            <img src={productImages[selectedImage]} alt={product.name} />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>

          <div className="product-brand">
            Visit the <span className="brand-link">{product.brand}</span> Store
          </div>

          <div className="product-rating-row">
            <div className="rating-stars">{renderStars(product.rating)}</div>
            <span className="rating-number">{product.rating}</span>
            <span className="divider">|</span>
            <span className="review-count">
              {product.reviewCount.toLocaleString()} ratings
            </span>
          </div>

          <div className="divider-line"></div>

          {/* Price Section */}
          <div className="price-section">
            {calculateDiscount() > 0 && (
              <div className="discount-badge">-{calculateDiscount()}%</div>
            )}
            <div className="price-row">
              <span className="price-label">Price:</span>
              <span className="current-price">
                EGP {formatPrice(product.price)}
              </span>
            </div>
            {product.originalPrice > product.price && (
              <div className="original-price-row">
                <span className="price-label">List Price:</span>
                <span className="original-price">
                  EGP {formatPrice(product.originalPrice)}
                </span>
              </div>
            )}
            {calculateSavings() > 0 && (
              <div className="savings-row">
                You Save: EGP {formatPrice(calculateSavings())} (
                {calculateDiscount()}%)
              </div>
            )}
          </div>

          <div className="divider-line"></div>

          {/* Product Description */}
          <div className="product-description">
            <h3>About this item</h3>
            <ul>
              <li>{product.description}</li>
              <li>Brand: {product.brand}</li>
              <li>
                {product.inStock
                  ? "✓ In Stock - Ready to Ship"
                  : "✗ Currently Out of Stock"}
              </li>
              <li>{product.delivery}</li>
            </ul>
          </div>
        </div>

        {/* Purchase Section */}
        <div className="product-purchase-section">
          <div className="purchase-box">
            <div className="price-display">
              <span className="price">EGP {formatPrice(product.price)}</span>
            </div>

            <div className="delivery-info-box">
              <div className="delivery-row">
                <span className="delivery-icon">🚚</span>
                <span>{product.delivery}</span>
              </div>
              <div className="delivery-row">
                <span className="location-icon">📍</span>
                <span>Deliver to Egypt</span>
              </div>
            </div>

            <div className="stock-status">
              {product.inStock ? (
                <span className="in-stock">In Stock</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              Add to Cart
            </button>

            <button
              className="buy-now-btn"
              onClick={handleBuyNow}
              disabled={!product.inStock}
            >
              Buy Now
            </button>

            <div className="secure-transaction">
              <span className="lock-icon">🔒</span>
              <span>Secure transaction</span>
            </div>

            <div className="seller-info">
              <div className="info-row">
                <span className="label">Ships from</span>
                <span className="value">Atlantica</span>
              </div>
              <div className="info-row">
                <span className="label">Sold by</span>
                <span className="value">{product.brand}</span>
              </div>
            </div>
          </div>
        </div>


        {/* Reviews Section */}
        <div className="product-reviews-section">
          <h2>Customer Reviews</h2>
          {(() => {
            const allComments = JSON.parse(localStorage.getItem('product_comments') || '{}');
            const productComments = allComments[product.id] || [];

            if (productComments.length === 0) {
              return <p>No reviews yet. Be the first to review this product!</p>;
            }

            return (
              <div className="reviews-list">
                {productComments.map(comment => (
                  <div key={comment.id} className="review-card">
                    <div className="review-header">
                      <div className="review-author-avatar">
                        {comment.author.charAt(0).toUpperCase()}
                      </div>
                      <span className="review-author">{comment.author}</span>
                    </div>
                    <div className="review-rating">
                      {renderStars(comment.rating || 5)}
                    </div>
                    <div className="review-meta">
                      Reviewed on {new Date(comment.date).toLocaleDateString()}
                    </div>
                    <p className="review-text">{comment.text}</p>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </div >
    </div >
  );
};

export default ProductDetailPage;
