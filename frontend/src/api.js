const API_BASE_URL = 'https://shop-backend-2-m1cv.onrender.com/api';

export const fetchProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE_URL}/products${query ? `?${query}` : ''}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const fetchProduct = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/products/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

export const fetchFeaturedProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products/featured`);
  if (!response.ok) throw new Error('Failed to fetch featured products');
  return response.json();
};

export const createOrder = async (orderData) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  if (!response.ok) throw new Error('Failed to create order');
  return response.json();
};

export const formatPrice = (amount) => {
  const num = Number(amount);
  if (isNaN(num)) return 'MK 0';
  return 'MK ' + num.toLocaleString('en-MW', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};
