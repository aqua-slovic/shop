import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats, getCategoriesWithCounts, formatPrice } from '../api';
import '../styles/dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, catData] = await Promise.all([
          getDashboardStats(),
          getCategoriesWithCounts()
        ]);
        setStats(statsData);
        setCategories(catData);
      } catch (error) {
        console.error('Failed to load dashboard', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  const statCards = [
    { label: 'Total Products', value: stats?.totalProducts || 0, icon: '🎸', color: 'primary' },
    { label: 'In Stock', value: stats?.inStock || 0, icon: '✅', color: 'success' },
    { label: 'Low Stock', value: stats?.lowStock || 0, icon: '⚠️', color: 'warning' },
    { label: 'Categories', value: stats?.categories || 0, icon: '🏷️', color: 'accent' },
    { label: 'Avg. Price', value: formatPrice(stats?.avgPrice || 0), icon: '💰', color: 'gold' },
    { label: 'Inventory Value', value: formatPrice(stats?.inventoryValue || 0), icon: '📦', color: 'dark' }
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your Royal D Studio store</p>
        </div>
        <Link to="/products/new" className="btn btn-accent">+ Add Product</Link>
      </div>

      <div className="stats-grid">
        {statCards.map((card, i) => (
          <div key={i} className={`stat-card stat-${card.color}`}>
            <div className="stat-card-icon">{card.icon}</div>
            <div className="stat-card-info">
              <span className="stat-card-value">{card.value}</span>
              <span className="stat-card-label">{card.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <h2>Best Selling Products</h2>
          <div className="best-sellers-list">
            {stats?.bestSellers?.map((product, i) => (
              <div className="best-seller-item" key={product.id}>
                <span className="best-seller-rank">{i + 1}</span>
                <img src={product.image} alt={product.name} className="best-seller-image" />
                <div className="best-seller-info">
                  <span className="best-seller-name">{product.name}</span>
                  <span className="best-seller-category">{product.category}</span>
                </div>
                <div className="best-seller-right">
                  <span className="best-seller-price">{formatPrice(product.price)}</span>
                  <span className="best-seller-reviews">{product.reviews} reviews</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <h2>Products by Category</h2>
          <div className="category-bars">
            {Object.entries(categories).map(([cat, count]) => (
              <div key={cat} className="category-bar-row">
                <div className="category-bar-info">
                  <span>{cat}</span>
                  <span>{count} products</span>
                </div>
                <div className="category-bar-track">
                  <div
                    className="category-bar-fill"
                    style={{
                      width: `${(count / Math.max(...Object.values(categories))) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
