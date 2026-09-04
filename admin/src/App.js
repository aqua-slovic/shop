import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductEdit from './pages/ProductEdit';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Settings from './pages/Settings';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuth') === 'true';
  });

  if (!isAuthenticated) {
    return (
      <div className="login-page">
        <div className="login-box">
          <div className="login-logo">
            <span className="logo-text">Royal D Studio</span>
            <span className="logo-sub">ADMIN PANEL</span>
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to manage your store</p>
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              localStorage.setItem('adminAuth', 'true');
              setIsAuthenticated(true);
            }}
          >
            <input type="text" placeholder="Username" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" className="btn btn-accent">Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar onLogout={() => {
        localStorage.removeItem('adminAuth');
        setIsAuthenticated(false);
      }} />
      <main className="admin-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<ProductEdit />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
