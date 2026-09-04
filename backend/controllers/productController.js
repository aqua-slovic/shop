const products = require('../data/products');

exports.getAllProducts = (req, res) => {
  let result = [...products];
  const { category, search, minPrice, maxPrice, sort, limit } = req.query;

  if (category) {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const term = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  }

  if (minPrice) {
    result = result.filter(p => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    result = result.filter(p => p.price <= parseFloat(maxPrice));
  }

  if (sort) {
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
  }

  if (limit) {
    result = result.slice(0, parseInt(limit));
  }

  res.json({ products: result, total: result.length });
};

exports.getProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};

exports.getCategories = (req, res) => {
  const cats = [...new Set(products.map(p => p.category))];
  res.json(cats);
};

exports.getFeaturedProducts = (req, res) => {
  const featured = products.filter(p => p.badge).slice(0, 8);
  res.json({ products: featured });
};
