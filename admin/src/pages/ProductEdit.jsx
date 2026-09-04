import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, createProduct, updateProduct } from '../api';
import '../styles/productEdit.css';

const categories = ['Headphones', 'Interfaces', 'Guitars', 'Monitors', 'Microphones', 'MIDI Controllers', 'DJ Equipment', 'Drum Machines', 'Mixers', 'Speakers', 'Amplifiers', 'Samplers'];

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [loading, setLoading] = useState(isEditing);
  const [form, setForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: categories[0],
    image: '',
    description: '',
    longDescription: '',
    features: '',
    stock: '',
    badge: '',
    rating: '',
    reviews: ''
  });

  useEffect(() => {
    if (isEditing) {
      const loadProduct = async () => {
        try {
          const data = await getProduct(id);
          setForm({
            name: data.name || '',
            price: data.price || '',
            originalPrice: data.originalPrice || '',
            category: data.category || categories[0],
            image: data.image || '',
            description: data.description || '',
            longDescription: data.longDescription || '',
            features: (data.features || []).join('\n'),
            stock: data.stock || '',
            badge: data.badge || '',
            rating: data.rating || '',
            reviews: data.reviews || ''
          });
        } catch (error) {
          showToast('Failed to load product');
        } finally {
          setLoading(false);
        }
      };
      loadProduct();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      showToast('Name and price are required');
      return;
    }

    const productData = {
      ...form,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
      stock: parseInt(form.stock) || 0,
      features: form.features ? form.features.split('\n').map(f => f.trim()).filter(Boolean) : [],
      rating: parseFloat(form.rating) || 0,
      reviews: parseInt(form.reviews) || 0,
      badge: form.badge || null
    };

    try {
      if (isEditing) {
        await updateProduct(id, productData);
        showToast('Product updated successfully');
      } else {
        await createProduct(productData);
        showToast('Product created successfully');
      }
      navigate('/products');
    } catch (error) {
      showToast('Failed to save product');
    }
  };

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>{isEditing ? 'Edit Product' : 'Add New Product'}</h1>
          <p>{isEditing ? `Update product #${id}` : 'Create a new product for your store'}</p>
        </div>
      </div>

      <form className="product-edit-form" onSubmit={handleSubmit}>
        <div className="product-edit-grid">
          <div className="form-panel">
            <h2>Basic Information</h2>
            <div className="form-group">
              <label>Product Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Studio Master Headphones" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Price (MK) *</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="510000" step="1000" />
              </div>
              <div className="form-group">
                <label>Original Price (MK)</label>
                <input type="number" name="originalPrice" value={form.originalPrice} onChange={handleChange} placeholder="680000" step="1000" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Badge</label>
                <select name="badge" value={form.badge} onChange={handleChange}>
                  <option value="">None</option>
                  <option value="Best Seller">Best Seller</option>
                  <option value="New">New</option>
                  <option value="Popular">Popular</option>
                  <option value="Sale">Sale</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-panel">
            <h2>Product Image</h2>
            <div className="image-preview">
              {form.image ? (
                <img src={form.image} alt="Preview" />
              ) : (
                <div className="image-preview-placeholder">
                  <span>Image Preview</span>
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input type="url" name="image" value={form.image} onChange={handleChange} placeholder="https://example.com/image.jpg" />
            </div>
          </div>
        </div>

        <div className="form-panel">
          <h2>Description</h2>
          <div className="form-group">
            <label>Short Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="3" placeholder="A brief description shown in product cards"></textarea>
          </div>
          <div className="form-group">
            <label>Full Description</label>
            <textarea name="longDescription" value={form.longDescription} onChange={handleChange} rows="5" placeholder="A detailed description shown on the product detail page"></textarea>
          </div>
        </div>

        <div className="product-edit-grid">
          <div className="form-panel">
            <h2>Features</h2>
            <div className="form-group">
              <label>Features (one per line)</label>
              <textarea name="features" value={form.features} onChange={handleChange} rows="6" placeholder="Feature 1&#10;Feature 2&#10;Feature 3"></textarea>
            </div>
          </div>

          <div className="form-panel">
            <h2>Inventory & Rating</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Stock Quantity</label>
                <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="25" />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <input type="number" name="rating" value={form.rating} onChange={handleChange} placeholder="4.5" step="0.1" min="0" max="5" />
              </div>
            </div>
            <div className="form-group">
              <label>Number of Reviews</label>
              <input type="number" name="reviews" value={form.reviews} onChange={handleChange} placeholder="342" />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={() => navigate('/products')}>Cancel</button>
          <button type="submit" className="btn btn-accent">{isEditing ? 'Update Product' : 'Create Product'}</button>
        </div>
      </form>
    </div>
  );
}

export default ProductEdit;
