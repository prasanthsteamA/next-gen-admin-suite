// Mirage.js configuration
// Set this to true to use mock server, false to use real API
export const MIRAGE_ENABLED = true;

// Base URL for real API (when Mirage is OFF)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
