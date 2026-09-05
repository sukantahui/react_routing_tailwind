// api.js
//this is my interceptor
import axios from "axios";

// Ensure any accidental space in baseURL is automatically normalized to underscore
const rawBaseURL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1/cnat_api/public/api";
const cleanBaseURL = rawBaseURL.trim().replace(/cnat\s+api/gi, "cnat_api");

// Create axios instance
const api = axios.create({
  baseURL: cleanBaseURL, // ✅ auto-sanitized from .env
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request interceptor (for token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handles BOM stripping, automatic JSON parsing, and 401s)
api.interceptors.response.use(
  (response) => {
    // If backend returns a raw string (e.g. from BOM or custom output), sanitize and parse
    if (typeof response.data === "string") {
      const cleanText = response.data.replace(/^\uFEFF/, "").trim();
      if (cleanText.startsWith("{") || cleanText.startsWith("[")) {
        try {
          response.data = JSON.parse(cleanText);
        } catch {
          // keep as string if parse fails
        }
      }
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized! Redirect to login.");
      // Optional: redirect user or clear token
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
