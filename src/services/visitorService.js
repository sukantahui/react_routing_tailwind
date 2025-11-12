import api from "../api/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://codernaccotax.co.in/cnat_api/public/api";

export const visitorService = {
  saveInquiry: async (data) => {
    try {
      const response = await api.post("/dev/visitors", data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw err.response?.data || err;
    }
  },
  getAll: async () => {
    try {
      const response = await api.get("/visitors");
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw err.response?.data || err;
    }
  },
};
