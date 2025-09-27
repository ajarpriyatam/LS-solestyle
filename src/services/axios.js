import axios from "axios";

const baseURL = window.location.hostname === 'localhost' ? "/api/v1" : "https://b-ls-solestyle.vercel.app/api/v1";
console.log("Axios baseURL:", baseURL);
console.log("Environment check - hostname:", window.location.hostname);
console.log("Environment check - REACT_APP_API_URL:", process.env.REACT_APP_API_URL);

const axiosInstance = axios.create({
  baseURL: baseURL,
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

export default axiosInstance;
