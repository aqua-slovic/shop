import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts, fetchCategories } from '../api';
import '../styles/shop.css';

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const category = searchParams.get('category') || 'All';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'featured';

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category !== 'All') params.category = category;
        if (search) params.search = search;
        if (sort !== 'featured') params.sort = sort;
        const data = await fetchProducts(params);
        setProducts(data.products);
        setTotal(data.total);
      } catch (error) {
        console.error('Failed to load products', error);
      } finally {
        setLoading(false);
      }
    };

    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(['All', ...data]);
      } catch (error) {
        console.error('Failed to load categories', error);
      }
    };

    loadProducts();
    loadCategories();
  }, [category, search, sort]);

  const setFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'All' && value !== 'featured') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params, { replace: true });
  };

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'name', label: 'Name: A-Z' }
  ];

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div className="container">
          <div className="breadcrumb">
            <span>Home</span> <i>/</i> <span>Shop</span>
            {category !== 'All' && <><i>/</i> <span className="current">{category}</span></>}
          </div>
          <h1>{search ? `Search: "${search}"` : category !== 'All' ? category : 'All Products'}</h1>
          <p>{total} products found</p>
        </div>
      </div>

      <div className="container shop-content">
        <aside className="shop-sidebar">
          <h3>Categories</h3>
          <div className="category-list">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-link ${category === cat ? 'active' : ''}`}
                onClick={() => setFilter('category', cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        <div className="shop-main">
          <div className="shop-toolbar">
            <span className="result-count">Showing {products.length} {products.length === 1 ? 'product' : 'products'}</span>
            <div className="sort-control">
              <label>Sort by:</label>
              <select
                value={sort}
                onChange={(e) => setFilter('sort', e.target.value)}
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-container"><div className="spinner"></div></div>
          ) : products.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🎵</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search for something else.</p>
              <button className="btn btn-accent" onClick={() => { navigate('/shop'); }}>Clear All Filters</button>
            </div>
          ) : (
            <div className="shop-products-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
