// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:10000';

export const API_ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/api/contact`,
  CHECKOUT: `${API_BASE_URL}/api/checkout/create-checkout-session`,
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_BASE_URL; 