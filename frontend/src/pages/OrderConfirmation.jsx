import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { formatPrice } from '../api';
import '../styles/orderConfirmation.css';

function OrderConfirmation() {
  const location = useLocation();
  const { orderNumber, total } = location.state || { orderNumber: '—', total: 0 };

  return (
    <div className="order-confirmation">
      <div className="container">
        <div className="confirmation-box">
          <div className="confirmation-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <h1>Order Confirmed!</h1>
          <p className="confirmation-message">Thank you for your purchase. Your order has been placed successfully.</p>

          <div className="confirmation-details">
            <div className="confirmation-detail-item">
              <span className="confirmation-label">Order Number</span>
              <span className="confirmation-value">#{orderNumber}</span>
            </div>
            <div className="confirmation-detail-item">
              <span className="confirmation-label">Total Amount</span>
              <span className="confirmation-value">{formatPrice(total)}</span>
            </div>
          </div>

          <p className="confirmation-note">
            A confirmation email has been sent to your email address. Your order will be shipped within 2-3 business days.
          </p>

          <div className="confirmation-actions">
            <Link to="/shop" className="btn btn-accent">Continue Shopping</Link>
            <Link to="/" className="btn btn-dark">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
