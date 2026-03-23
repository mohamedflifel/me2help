import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // cookie-based auth — no Authorization header needed
});

// Global 401 handler — only redirect if NOT on an auth route
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRoute = error.config?.url?.includes('/auth/');
    if (error.response?.status === 401 && !isAuthRoute) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
