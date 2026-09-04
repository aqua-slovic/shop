import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { formatPrice } from '../api';
import '../styles/cart.css';

function Cart() {
  const {
    items,
    updateQuantity,
    removeItem,
    getItemCount,
    getSubtotal,
    getShipping,
    getTax,
    getTotal
  } = useContext(CartContext);
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1 className="cart-title">Shopping Cart</h1>
          <div className="empty-cart">
            <div className="empty-cart-icon">🎵</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any music gear yet.</p>
            <div className="empty-cart-actions">
              <Link to="/shop" className="btn btn-accent">Start Shopping</Link>
              <Link to="/shop?sort=rating" className="btn btn-outline btn-facing-dark">Browse Best Sellers</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">Shopping Cart ({getItemCount()} {getItemCount() === 1 ? 'item' : 'items'})</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map(item => (
              <div className="cart-item" key={item.productId}>
                <Link to={`/product/${item.productId}`} className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className="cart-item-info">
                  <Link to={`/product/${item.productId}`} className="cart-item-name">
                    {item.name}
                  </Link>
                  <div className="cart-item-price">{formatPrice(item.price)}</div>
                  <div className="cart-item-line-total">
                    Line Total: <strong>{formatPrice(item.price * item.quantity)}</strong>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                  </div>
                  <button className="cart-remove-btn" onClick={() => removeItem(item.productId)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <Link to="/shop" className="continue-shopping">← Continue Shopping</Link>
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(getSubtotal())}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{getShipping() === 0 ? 'Free' : formatPrice(getShipping())}</span>
            </div>
            <div className="summary-row">
              <span>Tax (8%)</span>
              <span>{formatPrice(getTax())}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(getTotal())}</span>
            </div>

            {getSubtotal() < 170000 ? (
              <p className="free-shipping-hint">
                Add {formatPrice(170000 - getSubtotal())} more for <strong>FREE shipping!</strong>
              </p>
            ) : (
              <p className="free-shipping-hint success">✓ You qualify for FREE shipping!</p>
            )}

            <button className="btn btn-accent checkout-cta" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
