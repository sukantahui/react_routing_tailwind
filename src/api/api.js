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

// Helpers for dual-casing compatibility (supports both camelCase and snake_case)
const toSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const toCamelCase = (str) =>
  str.replace(/_([a-z0-9])/g, (_, letter) => letter.toUpperCase());

const normalizeDataKeys = (obj, seen = new WeakSet()) => {
  if (!obj || typeof obj !== "object") return obj;
  if (typeof Blob !== "undefined" && obj instanceof Blob) return obj;
  if (typeof ArrayBuffer !== "undefined" && obj instanceof ArrayBuffer) return obj;
  if (typeof FormData !== "undefined" && obj instanceof FormData) return obj;
  if (seen.has(obj)) return obj;
  seen.add(obj);

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = normalizeDataKeys(obj[i], seen);
    }
    return obj;
  }

  const keys = Object.keys(obj);
  for (const key of keys) {
    const val = obj[key];
    if (val && typeof val === "object") {
      normalizeDataKeys(val, seen);
    }
    const camel = toCamelCase(key);
    const snake = toSnakeCase(key);
    if (camel !== key && obj[camel] === undefined) {
      obj[camel] = val;
    }
    if (snake !== key && obj[snake] === undefined) {
      obj[snake] = val;
    }
  }
  return obj;
};

// Response interceptor (handles BOM stripping, automatic JSON parsing, dual-casing, and 401s)
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

    // Auto-normalize response object keys for both camelCase and snake_case compatibility
    if (response.data && typeof response.data === "object") {
      normalizeDataKeys(response.data);
    }

    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized! Clearing invalid token.");
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("authChanged"));
      } catch (e) {
        console.warn("Storage cleanup notice:", e);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
