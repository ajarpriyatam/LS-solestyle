import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? "/api/v1" : "https://b-ls-solestyle.vercel.app/api/v1");

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      // Network Error - Check CORS configuration or API availability
    } else if (error.response?.status === 404) {
      // API endpoint not found
    } else if (error.response?.status >= 500) {
      // Server error
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
