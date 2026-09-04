import React, { useEffect, useState } from 'react';
import { getOrders, formatPrice } from '../api';
import '../styles/customers.css';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await getOrders();
        const uniqueCustomers = {};
        data.orders.forEach(order => {
          const email = order.shippingInfo.email.toLowerCase();
          if (!uniqueCustomers[email]) {
            uniqueCustomers[email] = {
              name: `${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`,
              email: order.shippingInfo.email,
              phone: order.shippingInfo.phone || '—',
              address: `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}`,
              orders: 1,
              totalSpent: order.total || 0,
              lastOrder: order.date
            };
          } else {
            uniqueCustomers[email].orders += 1;
            uniqueCustomers[email].totalSpent += order.total || 0;
            uniqueCustomers[email].lastOrder = order.date;
          }
        });
        setCustomers(Object.values(uniqueCustomers));
      } catch (error) {
        console.error('Failed to load customers', error);
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Customers</h1>
          <p>View your customer information</p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search customers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="customers-search"
      />

      {loading ? (
        <div className="loading-container"><div className="spinner"></div></div>
      ) : (
        <div className="customers-table-container">
          <table className="customers-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Last Order</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, i) => (
                <tr key={i}>
                  <td>
                    <div className="customer-info">
                      <div className="customer-avatar">
                        {customer.name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <strong>{customer.name}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="customer-email">{customer.email}</span>
                    <span className="customer-phone">{customer.phone}</span>
                  </td>
                  <td>
                    <span className="customer-address">{customer.address}</span>
                  </td>
                  <td>
                    <span className="customer-order-count">{customer.orders}</span>
                  </td>
                  <td>
                    <span className="customer-spent">{formatPrice(customer.totalSpent)}</span>
                  </td>
                  <td>
                    <span className="customer-date">{formatDate(customer.lastOrder)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCustomers.length === 0 && (
            <div className="no-customers">
              <p>No customers found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Customers;
