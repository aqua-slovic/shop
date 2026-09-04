const API_BASE_URL = 'http://localhost:5000/api/admin';

export const getDashboardStats = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard`);
  if (!response.ok) throw new Error('Failed to fetch dashboard');
  return response.json();
};

export const getProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const getProduct = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};

export const createProduct = async (productData) => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });
  if (!response.ok) throw new Error('Failed to create product');
  return response.json();
};

export const updateProduct = async (id, productData) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });
  if (!response.ok) throw new Error('Failed to update product');
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete product');
  return response.json();
};

export const getOrders = async () => {
  const response = await fetch('http://localhost:5000/api/orders');
  if (!response.ok) throw new Error('Failed to fetch orders');
  return response.json();
};

export const getCategoriesWithCounts = async () => {
  const response = await fetch(`${API_BASE_URL}/categories/counts`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

export const formatPrice = (amount) => {
  const num = Number(amount);
  if (isNaN(num)) return 'MK 0';
  return 'MK ' + num.toLocaleString('en-MW', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};
