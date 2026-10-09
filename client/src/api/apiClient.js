import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor to normalize errors
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let message = 'An unexpected network error occurred';
    let errors = [];

    if (error.response) {
      // The server responded with a status code out of 2xx
      message = error.response.data?.message || `Server Error (${error.response.status})`;
      errors = error.response.data?.errors || [];
    } else if (error.request) {
      // The request was made but no response was received
      message = 'Unable to connect to the API server. Please ensure the backend is running.';
      errors = ['Network timeout or connection refused'];
    } else {
      // Something else happened
      message = error.message;
    }

    const normalizedError = new Error(message);
    normalizedError.originalError = error;
    normalizedError.errors = errors;
    normalizedError.statusCode = error.response?.status;

    return Promise.reject(normalizedError);
  }
);

export default apiClient;

