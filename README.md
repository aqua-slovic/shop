# Royal D Studio 🎵

Premium music appliances e-commerce platform built with React, Node.js, and Express.

## Project Structure

```
shop/
├── backend/          # Node.js Express API
│   ├── controllers/  # Route handlers
│   ├── routes/       # API route definitions
│   ├── data/         # Product data
│   └── server.js     # Express server entry
│
├── frontend/         # Customer-facing React app
│   ├── public/       # Static assets
│   └── src/
│       ├── components/  # Reusable components (Navbar, Footer, ProductCard)
│       ├── context/     # React Context (Cart)
│       ├── pages/       # Page components (Home, Shop, Product, Checkout)
│       └── styles/      # CSS files
│
└── admin/            # Admin dashboard React app
    ├── public/       # Static assets
    └── src/
        ├── components/  # Sidebar
        ├── pages/       # Dashboard, Products, Orders, Customers, Settings
        └── styles/      # CSS files
```

## Tech Stack

- **Frontend**: React 18, React Router 6, CSS
- **Backend**: Node.js, Express, CORS
- **Admin**: React 18, React Router 6

## Prerequisites

- Node.js 14+ and npm
- Modern web browser

## Installation

```bash
npm run install:all
```

Or install each individually:

```bash
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
```

## Running the Applications

### Backend API (Port 5000)

```bash
cd backend
npm run dev
```

### Frontend Store (Port 3000)

```bash
cd frontend
npm start
```

### Admin Panel (Port 3001)

```bash
cd admin
npm start
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
  - Query params: `category`, `search`, `minPrice`, `maxPrice`, `sort`, `limit`
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get all categories
- `GET /api/products/featured` - Get featured products

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create an order
- `GET /api/orders/:id` - Get specific order

### Admin
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/categories/counts` - Get category breakdown

## Features

### Customer Store (frontend)
- Hero section with featured content
- Product browsing with category filtering & searching
- Product detail pages with specs, features, and related products
- Shopping cart with localStorage persistence
- Checkout with shipping & payment forms
- Order confirmation

### Admin Panel (admin)
- Dashboard with store statistics
- Product CRUD operations
- Order management & viewing
- Customer analytics
- Store settings

## Pages

### Storefront (frontend)
- `/` - Home page
- `/shop` - Shop with filtering
- `/product/:id` - Product detail
- `/cart` - Shopping cart
- `/checkout` - Checkout
- `/order-confirmation` - Order confirmation

### Admin (admin)
- `/` - Dashboard
- `/products` - Manage products
- `/products/new` - Add product
- `/products/:id/edit` - Edit product
- `/orders` - Manage orders
- `/customers` - View customers
- `/settings` - Store settings
