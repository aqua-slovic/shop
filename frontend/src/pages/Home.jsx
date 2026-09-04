import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchFeaturedProducts, fetchProducts } from '../api';
import '../styles/home.css';

function Home() {
  const [featured, setFeatured] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [featData, bestData, newData] = await Promise.all([
          fetchFeaturedProducts(),
          fetchProducts({ sort: 'rating', limit: 8 }),
          fetchProducts({ limit: 4 })
        ]);
        setFeatured(featData.products);
        setBestSellers(bestData.products);
        setNewArrivals(newData.products.slice(0, 4));
      } catch (error) {
        console.error('Failed to load data', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-tagline">PROFESSIONAL AUDIO EQUIPMENT</div>
          <h1>Where Music<br/>Comes Alive</h1>
          <p>Discover premium music appliances trusted by artists, producers, and studios worldwide.</p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-accent">Shop Collection</Link>
            <Link to="/shop?sort=rating" className="btn btn-outline">Best Sellers</Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <strong>500+</strong>
              <span>Pro Products</span>
            </div>
            <div className="hero-stat">
              <strong>10k+</strong>
              <span>Happy Customers</span>
            </div>
            <div className="hero-stat">
              <strong>4.8</strong>
              <span>Avg. Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-strip">
        <div className="container features-grid">
          <div className="feature-item">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 17h14M5 17l-2-4h14l2 4M5 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM19 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/><path d="M1 5h15v10H1z"/><path d="M20 8h3v6h-3z"/></svg>
            <div><strong>Free Shipping</strong><span>On orders over MK 170,000</span></div>
          </div>
          <div className="feature-item">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            <div><strong>Genuine Products</strong><span>100% authentic gear</span></div>
          </div>
          <div className="feature-item">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <div><strong>24/7 Support</strong><span>Always here to help</span></div>
          </div>
          <div className="feature-item">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            <div><strong>Secure Payment</strong><span>Your data is protected</span></div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="overline">Featured Products</div>
            <h2>Handpicked for You</h2>
            <p>Our most popular and highly-rated music equipment, curated for your next project.</p>
          </div>
          {loading ? (
            <div className="loading-container"><div className="spinner"></div></div>
          ) : (
            <div className="products-grid">
              {featured.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CATEGORY SHOWCASE */}
      <section className="category-showcase">
        <div className="container">
          <div className="section-header">
            <div className="overline">Browse Categories</div>
            <h2>Shop by Category</h2>
          </div>
          <div className="categories-grid">
            <Link to="/shop?category=Headphones" className="category-card">
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop" alt="Headphones" />
              <div className="category-card-overlay">
                <h3>Headphones</h3>
                <span>View Now →</span>
              </div>
            </Link>
            <Link to="/shop?category=Guitars" className="category-card">
              <img src="https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=600&h=600&fit=crop" alt="Guitars" />
              <div className="category-card-overlay">
                <h3>Guitars</h3>
                <span>View Now →</span>
              </div>
            </Link>
            <Link to="/shop?category=Microphones" className="category-card">
              <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&h=600&fit=crop" alt="Microphones" />
              <div className="category-card-overlay">
                <h3>Microphones</h3>
                <span>View Now →</span>
              </div>
            </Link>
            <Link to="/shop?category=DJ%20Equipment" className="category-card">
              <img src="https://images.unsplash.com/photo-1605028710076-7aace3a8a5e6?w=600&h=600&fit=crop" alt="DJ Equipment" />
              <div className="category-card-overlay">
                <h3>DJ Equipment</h3>
                <span>View Now →</span>
              </div>
            </Link>
            <Link to="/shop?category=Monitors" className="category-card">
              <img src="https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=600&fit=crop" alt="Monitors" />
              <div className="category-card-overlay">
                <h3>Studio Monitors</h3>
                <span>View Now →</span>
              </div>
            </Link>
            <Link to="/shop?category=Amplifiers" className="category-card">
              <img src="https://images.unsplash.com/photo-1567891386273-f009d777f932?w=600&h=600&fit=crop" alt="Amplifiers" />
              <div className="category-card-overlay">
                <h3>Amplifiers</h3>
                <span>View Now →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="overline">Customer Favorites</div>
            <h2>Best Sellers</h2>
            <p>Join thousands of musicians who trust Royal D Studio for their gear.</p>
          </div>
          <div className="products-grid">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="container cta-banner-content">
          <div>
            <h2>Build Your Dream Studio</h2>
            <p>From beginner essentials to professional equipment, we have everything you need to create your best work.</p>
          </div>
          <Link to="/shop" className="btn btn-gold">Start Shopping</Link>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="overline">Just In</div>
            <h2>New Arrivals</h2>
          </div>
          <div className="products-grid products-grid-small">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="testimonial-section">
        <div className="container">
          <div className="testimonial">
            <div className="testimonial-quote">"</div>
            <p>The quality of their gear is unmatched. My studio monitor headphones from Royal D Studio completely changed the way I mix my music."</p>
            <div className="testimonial-author">
              <strong>Marcus Johnson</strong>
              <span>Music Producer, Los Angeles</span>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section">
        <div className="container newsletter-box">
          <div className="section-header" style={{ marginBottom: 24 }}>
            <div className="overline">Stay Connected</div>
            <h2 style={{ color: 'white', marginBottom: 8 }}>Join Our Newsletter</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>Get exclusive deals, new product alerts, and music production tips.</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="btn btn-gold">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;
