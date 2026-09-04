import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct, formatPrice } from '../api';
import '../styles/products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showDelete, setShowDelete] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products);
      } catch (error) {
        console.error('Failed to load products', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
      setShowDelete(null);
      showToast('Product deleted successfully');
    } catch (error) {
      showToast('Failed to delete product');
    }
  };

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p>Manage your music equipment inventory</p>
        </div>
        <Link to="/products/new" className="btn btn-accent">+ Add New Product</Link>
      </div>

      <div className="products-toolbar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="products-search"
        />
        <span>{filteredProducts.length} products</span>
      </div>

      {loading ? (
        <div className="loading-container"><div className="spinner"></div></div>
      ) : (
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>
                    <div className="product-cell">
                      <img src={product.image} alt={product.name} className="product-cell-image" />
                      <div>
                        <span className="product-cell-name">{product.name}</span>
                        {product.badge && <span className={`badge ${product.badge.includes('Sale') ? 'badge-sale' : product.badge.includes('New') ? 'badge-new' : 'badge-gold'}`}>{product.badge}</span>}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="table-category">{product.category}</span>
                  </td>
                  <td className="table-price">
                    <span className="price-current">{formatPrice(product.price)}</span>
                    {product.originalPrice && <span className="price-original">{formatPrice(product.originalPrice)}</span>}
                  </td>
                  <td>
                    <span className={`stock-count ${product.stock < 10 ? 'stock-low' : product.stock < 20 ? 'stock-medium' : 'stock-good'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill ${product.inStock ? 'status-in' : 'status-out'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <Link to={`/products/${product.id}/edit`} className="action-btn action-edit" title="Edit">✏️</Link>
                      <button className="action-btn action-delete" onClick={() => setShowDelete(product.id)} title="Delete">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="no-results">
              <p>No products found</p>
            </div>
          )}
        </div>
      )}

      {showDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setShowDelete(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(showDelete)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
