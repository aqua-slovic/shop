import React, { useEffect, useState } from 'react';
import { getOrders, formatPrice } from '../api';
import '../styles/orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data.orders);
      } catch (error) {
        console.error('Failed to load orders', error);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const statuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const filteredOrders = statusFilter === 'All'
    ? orders
    : orders.filter(o => o.status === statusFilter);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Orders</h1>
          <p>Manage your incoming orders</p>
        </div>
      </div>

      <div className="orders-toolbar">
        <h3>Order Summary</h3>
        <div className="status-filters">
          {statuses.map(status => (
            <button
              key={status}
              className={`status-filter-btn ${statusFilter === status ? 'active' : ''}`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="stats-summary">
        <div className="stats-summary-item">
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
        </div>
        <div className="stats-summary-item">
          <span>Total Revenue</span>
          <strong>{formatPrice(orders.reduce((sum, o) => sum + (o.total || 0), 0))}</strong>
        </div>
        <div className="stats-summary-item">
          <span>Pending</span>
          <strong>{orders.filter(o => o.status === 'Pending').length}</strong>
        </div>
        <div className="stats-summary-item">
          <span>Completed</span>
          <strong>{orders.filter(o => o.status === 'Delivered').length}</strong>
        </div>
      </div>

      {loading ? (
        <div className="loading-container"><div className="spinner"></div></div>
      ) : filteredOrders.length === 0 ? (
        <div className="no-orders">
          <p style={{ fontSize: 48, marginBottom: 16 }}>📦</p>
          <h3>No orders found</h3>
          <p>Orders placed on the frontend will appear here.</p>
        </div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map(order => (
            <div
              key={order.orderNumber}
              className="order-card"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="order-card-header">
                <span className="order-number">#{order.orderNumber}</span>
                <span className={`order-status status-${order.status.toLowerCase()}`}>{order.status}</span>
              </div>
              <div className="order-card-body">
                <div className="order-customer">
                  <strong>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</strong>
                  <span>{order.shippingInfo.email}</span>
                  <span>{order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.state}</span>
                </div>
                <div className="order-items-count">
                  <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                </div>
                <div className="order-total">
                  <span>{formatPrice(order.total)}</span>
                </div>
                <div className="order-date">
                  <span>{formatDate(order.date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal order-modal" onClick={e => e.stopPropagation()}>
            <h3>Order #{selectedOrder.orderNumber}</h3>
            <div className="order-modal-status">
              Status: <span className={`status-pill ${selectedOrder.status === 'Delivered' ? 'status-in' : selectedOrder.status === 'Cancelled' ? 'status-out' : 'status-pending'}`}>{selectedOrder.status}</span>
            </div>
            <div className="order-modal-section">
              <h4>Shipping Information</h4>
              <p><strong>{selectedOrder.shippingInfo.firstName} {selectedOrder.shippingInfo.lastName}</strong></p>
              <p>{selectedOrder.shippingInfo.email}</p>
              <p>{selectedOrder.shippingInfo.phone}</p>
              <p>{selectedOrder.shippingInfo.address}, {selectedOrder.shippingInfo.city}, {selectedOrder.shippingInfo.state} {selectedOrder.shippingInfo.zip}</p>
            </div>
            <div className="order-modal-section">
              <h4>Payment</h4>
              <p>Card ending in {selectedOrder.paymentInfo.last4}</p>
              <p>{selectedOrder.paymentInfo.cardName}</p>
            </div>
            <div className="order-modal-section">
              <h4>Items</h4>
              {selectedOrder.items.map((item, i) => (
                <div className="order-modal-item" key={i}>
                  <span>{item.name} × {item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="order-modal-totals">
                <div><span>Subtotal:</span><span>{formatPrice(selectedOrder.subtotal)}</span></div>
                <div><span>Shipping:</span><span>{selectedOrder.shipping === 0 ? 'Free' : formatPrice(selectedOrder.shipping)}</span></div>
                <div><span>Tax:</span><span>{formatPrice(selectedOrder.tax)}</span></div>
                <div className="order-modal-grand-total"><span>Total:</span><span>{formatPrice(selectedOrder.total)}</span></div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setSelectedOrder(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
