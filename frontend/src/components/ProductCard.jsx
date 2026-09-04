import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../api';
import '../styles/productCard.css';

function ProductCard({ product }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=600&h=600&fit=crop';
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-image">
        <img src={product.image} alt={product.name} onError={handleImageError} loading="lazy" />
        {product.badge && <span className={`product-card-badge badge-${product.badge.toLowerCase().replace(' ', '-')}`}>{product.badge}</span>}
        {discount > 0 && <span className="product-card-discount">-{discount}%</span>}
      </div>
      <div className="product-card-body">
        <div className="product-card-category">{product.category}</div>
        <h3 className="product-card-name">{product.name}</h3>
        <div className="product-card-rating">
          <span className="stars">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
          <span className="product-card-reviews">({product.reviews})</span>
        </div>
        <div className="product-card-price">
          <span className="price-current">{formatPrice(product.price)}</span>
          {product.originalPrice && <span className="price-original">{formatPrice(product.originalPrice)}</span>}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
