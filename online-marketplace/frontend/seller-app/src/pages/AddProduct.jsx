import Sidebar from "../components/Sidebar";
import { useState } from "react";
import categories from "../utils/categories";
import "./PageStyles.css";

function AddProduct() {
  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [activeSubcategory, setActiveSubcategory] = useState(null); // for modal/form

  // Form state
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);

  const selectedCategory = categories.find((c) => c.name === category);
  const subcategoriesList = selectedCategory?.subcategories || [];

  const openForm = (sub) => {
    setActiveSubcategory(sub);
    setProductName("");
    setPrice("");
    setStock("");
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !price || !stock) return;

    const newProduct = {
      id: Date.now(),
      category,
      subcategory: activeSubcategory.name,
      image: image ? URL.createObjectURL(image) : activeSubcategory.image,
      name: productName,
      price: parseFloat(price).toFixed(2),
      stock: parseInt(stock),
    };

    setAddedProducts([...addedProducts, newProduct]);
    setActiveSubcategory(null); // close form
  };

  return (
    <div className="seller-app">
      <Sidebar />
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">
            <i className="fas fa-plus-circle"></i> Add Product
          </h1>
          <p className="page-subtitle">Select a category and add your products to start selling</p>
        </div>

        {/* Category Buttons */}
        <div className="content-card">
          <h2 className="section-title">
            <i className="fas fa-tags"></i> Select Category
          </h2>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "20px" }}>
            {categories.map((c) => (
              <button
                key={c.name}
                onClick={() => setCategory(c.name)}
                className={category === c.name ? "btn-primary" : "btn-secondary"}
                style={{
                  border: category === c.name ? "none" : "2px solid #e0e0e0",
                  background: category === c.name ? undefined : "#fff"
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategory Boxes */}
        {category && (
          <div className="content-card">
            <h2 className="section-title">
              <i className="fas fa-folder"></i> {category}
            </h2>
            <div className="product-grid">
              {subcategoriesList.map((sub) => (
                <div
                  key={sub.name}
                  onClick={() => openForm(sub)}
                  className="product-card"
                >
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <p className="product-name">{sub.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Form */}
        {activeSubcategory && (
          <div className="modal-overlay" onClick={() => setActiveSubcategory(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginBottom: "20px", color: "#1a5d3a" }}>
                Add Product to {activeSubcategory.name}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Available Stock</label>
                  <input
                    type="number"
                    placeholder="Enter stock quantity"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", gap: "10px" }}>
                  <button type="submit" className="btn-primary">
                    <i className="fas fa-check"></i> Add Product
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSubcategory(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Added Products */}
        {addedProducts.length > 0 && (
          <div className="content-card">
            <h2 className="section-title">
              <i className="fas fa-check-circle"></i> Products Added
            </h2>
            <div className="product-grid">
              {addedProducts.map((p) => (
                <div key={p.id} className="product-card">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <p style={{ fontSize: "12px", color: "#666", margin: "5px 0" }}>{p.category}</p>
                    <p className="product-name">{p.subcategory}</p>
                    <p className="product-price">${p.price}</p>
                    <p className="product-stock">Stock: {p.stock}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddProduct;
