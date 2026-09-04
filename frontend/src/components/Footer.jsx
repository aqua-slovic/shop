import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="logo-text footer-logo">Royal D<span> Studio</span></span>
          <p className="footer-desc">
            Premium music appliances and professional audio equipment for musicians, producers, and audio enthusiasts.
          </p>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop">All Products</Link></li>
            <li><Link to="/shop?category=Headphones">Headphones</Link></li>
            <li><Link to="/shop?category=Guitars">Guitars</Link></li>
            <li><Link to="/shop?category=Microphones">Microphones</Link></li>
            <li><Link to="/shop?category=Amplifiers">Amplifiers</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="#">Contact Us</Link></li>
            <li><Link to="#">Shipping & Delivery</Link></li>
            <li><Link to="#">Returns & Refunds</Link></li>
            <li><Link to="#">FAQs</Link></li>
            <li><Link to="#">Track Order</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:wisdommalata@royaldstudio.com">wisdommalata@royaldstudio.com</a></li>
            <li><a href="tel:+265983468381">+265 983 46 83 81</a></li>
            <li><p>Wisdom Malata,<br/>Lilongwe, Malawi</p></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Royal D Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
