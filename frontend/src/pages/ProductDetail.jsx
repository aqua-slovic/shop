import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { fetchProduct, fetchProducts, formatPrice } from '../api';
import '../styles/productDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setAdded(false);
    const loadData = async () => {
      try {
        const data = await fetchProduct(id);
        setProduct(data);
        const relatedData = await fetchProducts({ category: data.category, limit: 4 });
        setRelated(relatedData.products.filter(p => p.id !== data.id).slice(0, 4));
        setQuantity(1);
      } catch (error) {
        console.error('Failed to load product', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addItem(product, quantity);
      navigate('/checkout');
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-accent" style={{ marginTop: 20 }}>Back to Shop</Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> <i>/</i>
          <Link to="/shop">Shop</Link> <i>/</i>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>{product.category}</Link> <i>/</i>
          <span className="current">{product.name}</span>
        </div>

        <div className="product-detail-main">
          <div className="product-detail-images">
            <div className="product-detail-main-image">
              <img src={product.image} alt={product.name} />
              {product.badge && <span className="product-detail-badge">{product.badge}</span>}
              {discount > 0 && <span className="product-detail-discount">Save {discount}%</span>}
            </div>
          </div>

          <div className="product-detail-info">
            <div className="product-detail-category">{product.category}</div>
            <h1>{product.name}</h1>
            <div className="product-detail-rating">
              <span className="stars">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
              <span>{product.rating} ({product.reviews} reviews)</span>
            </div>
            <div className="product-detail-price">
              <span className="detail-price-current">{formatPrice(product.price)}</span>
              {product.originalPrice && <span className="detail-price-original">{formatPrice(product.originalPrice)}</span>}
            </div>
            <p className="product-detail-description">{product.longDescription || product.description}</p>

            <div className="product-features">
              <h3>Key Features</h3>
              <ul>
                {product.features && product.features.map((feature, i) => (
                  <li key={i}>✓ {feature}</li>
                ))}
              </ul>
            </div>

            <div className="product-detail-actions">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className="btn btn-accent add-to-cart-btn" onClick={handleAddToCart}>
                {added ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
              <button className="btn btn-dark buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
            </div>

            <div className="product-detail-meta">
              <div className="meta-row">
                <span className="meta-label">Availability:</span>
                <span className="meta-value in-stock">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Stock:</span>
                <span className="meta-value">{product.stock} units</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Free Shipping:</span>
                <span className="meta-value">On orders over MK 170,000</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Returns:</span>
                <span className="meta-value">30-day easy returns</span>
              </div>
            </div>

            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="product-specs">
                <h3>Specifications</h3>
                <div className="specs-grid">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div className="spec-item" key={key}>
                      <span className="spec-label">{key}</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="related-products">
            <div className="section-header">
              <div className="overline">You May Also Like</div>
              <h2>Related Products</h2>
            </div>
            <div className="products-grid products-grid-small">
              {related.map(relProduct => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
