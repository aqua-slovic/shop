let products = require('../data/products');
let nextId = products.length + 1;

exports.getAdminProducts = (req, res) => {
  res.json({ products });
};

exports.getAdminProduct = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};

exports.createAdminProduct = (req, res) => {
  const { name, price, originalPrice, category, image, description, longDescription, features, rating, reviews, stock, badge, specs } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ message: 'Name, price, and category are required' });
  }

  const newProduct = {
    id: nextId++,
    name,
    price: parseFloat(price),
    originalPrice: originalPrice ? parseFloat(originalPrice) : null,
    category,
    image: image || 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=600&h=600&fit=crop',
    description: description || '',
    longDescription: longDescription || '',
    features: features || [],
    rating: rating || 0,
    reviews: reviews || 0,
    stock: stock || 0,
    inStock: (stock === undefined ? true : stock > 0),
    badge: badge || null,
    specs: specs || {}
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.updateAdminProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === productId);

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const { name, price, originalPrice, category, image, description, longDescription, features, rating, reviews, stock, badge, specs } = req.body;

  if (name !== undefined) products[index].name = name;
  if (price !== undefined) products[index].price = parseFloat(price);
  if (originalPrice !== undefined) products[index].originalPrice = originalPrice ? parseFloat(originalPrice) : null;
  if (category !== undefined) products[index].category = category;
  if (image !== undefined) products[index].image = image;
  if (description !== undefined) products[index].description = description;
  if (longDescription !== undefined) products[index].longDescription = longDescription;
  if (features !== undefined) products[index].features = features;
  if (rating !== undefined) products[index].rating = rating;
  if (reviews !== undefined) products[index].reviews = reviews;
  if (stock !== undefined) {
    products[index].stock = stock;
    products[index].inStock = stock > 0;
  }
  if (badge !== undefined) products[index].badge = badge;
  if (specs !== undefined) products[index].specs = specs;

  res.json(products[index]);
};

exports.deleteAdminProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === productId);

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products.splice(index, 1);
  res.json({ message: 'Product deleted successfully' });
};

exports.getDashboardStats = (req, res) => {
  const totalProducts = products.length;
  const lowStock = products.filter(p => p.stock < 15).length;
  const inStock = products.filter(p => p.inStock).length;
  const categories = [...new Set(products.map(p => p.category))].length;
  const avgPrice = products.length > 0
    ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)
    : 0;

  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2);
  const bestSellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);

  res.json({
    totalProducts,
    lowStock,
    inStock,
    categories,
    avgPrice: parseFloat(avgPrice),
    inventoryValue: parseFloat(totalValue),
    bestSellers
  });
};

exports.getCategoriesWithCounts = (req, res) => {
  const cats = {};
  products.forEach(p => {
    cats[p.category] = (cats[p.category] || 0) + 1;
  });
  res.json(cats);
};
