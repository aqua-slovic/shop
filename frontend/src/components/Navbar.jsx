import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/navbar.css';

function Navbar() {
  const { getItemCount } = useContext(CartContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setMobileOpen(false);
    }
  };

  return (
    <>
      <header className="navbar">
        <nav className="navbar-main">
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              <span className="logo-text">Royal D Studio</span>
              <span className="logo-sub">MUSIC APPLIANCES</span>
            </Link>
          </div>

          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/shop">Categories</Link></li>
            <li><Link to="/shop?sort=rating">Best Sellers</Link></li>
          </ul>

          <div className="navbar-right">
            <form className="navbar-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search music gear..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button>
            </form>

            <Link to="/cart" className="navbar-cart">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {getItemCount() > 0 && <span className="navbar-cart-count">{getItemCount()}</span>}
            </Link>

            <button className="navbar-mobile-toggle" onClick={() => setMobileOpen(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <span className="logo-text">Royal D Studio</span>
            <button onClick={() => setMobileOpen(false)}>✕</button>
          </div>
          <div className="mobile-menu-body">
            <div className="mobile-search">
              <form onSubmit={handleSearch}>
                <input type="text" placeholder="Search music gear..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button type="submit">Search</button>
              </form>
            </div>
            <nav>
              <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/shop" onClick={() => setMobileOpen(false)}>Shop All</Link>
              <Link to="/shop?category=Headphones" onClick={() => setMobileOpen(false)}>Headphones</Link>
              <Link to="/shop?category=Guitars" onClick={() => setMobileOpen(false)}>Guitars</Link>
              <Link to="/shop?category=Microphones" onClick={() => setMobileOpen(false)}>Microphones</Link>
              <Link to="/shop?category=DJ%20Equipment" onClick={() => setMobileOpen(false)}>DJ Equipment</Link>
              <Link to="/shop?category=Amplifiers" onClick={() => setMobileOpen(false)}>Amplifiers</Link>
              <Link to="/cart" onClick={() => setMobileOpen(false)}>Cart</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
