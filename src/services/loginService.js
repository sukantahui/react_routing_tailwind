// src/services/loginService.js
import api from "../api/api";

export const loginService = {
  login: async (credentials) => {
    try {
        console.log("🧭 Base URL:", import.meta.env.VITE_API_BASE_URL);
      const response = await api.post("/login", credentials);
      return response.data; // returns { status, message, data: { user, token } }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },
};
