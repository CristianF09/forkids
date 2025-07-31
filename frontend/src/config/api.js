// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:10000';

export const API_ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/api/contact`,
  CHECKOUT: `${API_BASE_URL}/api/checkout/create-checkout-session`,
  HEALTH: `${API_BASE_URL}/api/health`,
  PRODUCTS: `${API_BASE_URL}/api/products`,
  PAYMENTS: `${API_BASE_URL}/api/payments/config`,
};

// Stripe Configuration
export const STRIPE_CONFIG = {
  PUBLISHABLE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
};

export default API_BASE_URL; 