import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { createOrder, formatPrice } from '../api';
import '../styles/checkout.css';

function Checkout() {
  const { items, getSubtotal, getShipping, getTax, getTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCardNumber = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').replace(/(.{4})/g, '$1 ').trim();
    setForm(prev => ({ ...prev, cardNumber: value.slice(0, 19) }));
  };

  const handleExpiry = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length >= 3) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setForm(prev => ({ ...prev, expiry: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip', 'cardName', 'cardNumber', 'expiry', 'cvv'];
    const emptyField = required.find(field => !form[field].trim());
    if (emptyField) {
      setError('Please fill in all required fields');
      return;
    }

    setPlacing(true);

    try {
      const orderData = {
        shippingInfo: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          country: form.country
        },
        paymentInfo: {
          cardName: form.cardName,
          cardNumber: form.cardNumber.replace(/\s/g, '')
        },
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          name: item.name
        })),
        subtotal: getSubtotal(),
        shipping: getShipping(),
        tax: getTax(),
        total: getTotal()
      };

      const order = await createOrder(orderData);
      clearCart();
      navigate('/order-confirmation', { state: { orderNumber: order.orderNumber, total: order.total } });
    } catch (err) {
      setError('Failed to place order. Please try again.');
      console.error('Order error:', err);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="checkout-section">
              <h2>Shipping Information</h2>
              <div className="checkout-form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input type="text" id="firstName" name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input type="text" id="lastName" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" />
                </div>
              </div>
              <div className="checkout-form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address">Street Address *</label>
                <input type="text" id="address" name="address" value={form.address} onChange={handleChange} placeholder="123 Music Avenue" />
              </div>
              <div className="checkout-form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input type="text" id="city" name="city" value={form.city} onChange={handleChange} placeholder="Los Angeles" />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input type="text" id="state" name="state" value={form.state} onChange={handleChange} placeholder="CA" />
                </div>
              </div>
              <div className="checkout-form-row">
                <div className="form-group">
                  <label htmlFor="zip">ZIP / Postal Code *</label>
                  <input type="text" id="zip" name="zip" value={form.zip} onChange={handleChange} placeholder="90001" />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <select id="country" name="country" value={form.country} onChange={handleChange}>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <h2>Payment Information</h2>
              <div className="form-group">
                <label htmlFor="cardName">Name on Card *</label>
                <input type="text" id="cardName" name="cardName" value={form.cardName} onChange={handleChange} placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number *</label>
                <input type="text" id="cardNumber" name="cardNumber" value={form.cardNumber} onChange={handleCardNumber} placeholder="1234 5678 9012 3456" inputMode="numeric" />
              </div>
              <div className="checkout-form-row">
                <div className="form-group">
                  <label htmlFor="expiry">Expiry Date *</label>
                  <input type="text" id="expiry" name="expiry" value={form.expiry} onChange={handleExpiry} placeholder="MM/YY" maxLength="5" />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input type="password" id="cvv" name="cvv" value={form.cvv} onChange={handleChange} placeholder="•••" maxLength="4" inputMode="numeric" />
                </div>
              </div>
            </div>

            {error && <div className="checkout-error">{error}</div>}

            <button type="submit" className="btn btn-accent place-order-btn" disabled={placing}>
              {placing ? 'Processing...' : `Place Order · ${formatPrice(getTotal())}`}
            </button>
          </form>

          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="checkout-summary-items">
              {items.map(item => (
                <div className="checkout-summary-item" key={item.productId}>
                  <div className="checkout-summary-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="checkout-summary-item-info">
                    <span className="checkout-summary-item-name">{item.name}</span>
                    <span className="checkout-summary-item-qty">Qty: {item.quantity}</span>
                  </div>
                  <span className="checkout-summary-item-total">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="checkout-summary-totals">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
