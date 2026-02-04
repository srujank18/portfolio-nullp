import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:9092';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000, // Increased to 30 seconds
});

// Response interceptor to handle successful responses
api.interceptors.response.use(
  (response) => {
    console.log('API Response successful:', response.status, response.config.method.toUpperCase(), response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error interceptor:', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method
    });
    return Promise.reject(error);
  }
);

export default api;
