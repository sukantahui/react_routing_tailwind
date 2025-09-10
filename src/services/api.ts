// api.ts
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // ✅ only one comma
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request interceptor (for token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or sessionStorage, or context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional: handle 401, 500 etc.)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirect to login.");
      // e.g., use react-router navigate("/login")
    }
    return Promise.reject(error);
  }
);

export default api;
