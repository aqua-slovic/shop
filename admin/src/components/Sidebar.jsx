import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar({ onLogout }) {
  const menuItems = [
    { to: '/', icon: '📊', label: 'Dashboard' },
    { to: '/products', icon: '🎸', label: 'Products' },
    { to: '/orders', icon: '📦', label: 'Orders' },
    { to: '/customers', icon: '👥', label: 'Customers' },
    { to: '/settings', icon: '⚙️', label: 'Settings' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-text">Royal D Studio</span>
          <span className="logo-sub">ADMIN</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <a href="https://shop-backend-2-m1cv.onrender.com" target="_blank" rel="noreferrer" className="sidebar-link">
          <span className="sidebar-icon">🌐</span>
          <span>View Store</span>
        </a>
        <button onClick={onLogout} className="sidebar-link sidebar-logout">
          <span className="sidebar-icon">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
