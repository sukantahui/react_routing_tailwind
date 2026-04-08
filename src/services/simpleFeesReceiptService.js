// src/services/simpleFeesReceiptService.js
import api from "../api/api";

export const simpleFeesReceiptService = {
  getAll: async () => {
    try {
      const response = await api.get("/fees-receipts");
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  },
  create: async (data) => {
    try {
      const response = await api.post("/fees-receipts",data);
      return response.data;
    } catch (error) {
      console.error("Error saving student:", error);
      throw error;
    }

  }
};