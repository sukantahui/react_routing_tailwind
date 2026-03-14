// src/services/resultService.js
import api from "../api/api";

export const resultService = {
  getAll: async () => {
    try {
      const response = await api.get("/results");
      return response.data;
    } catch (error) {
      console.error("Error fetching Courses:", error);
      throw error;
    }
  },
 
  create: async (data) => {
    try {
      const response = await api.post("/results",data);
      return response.data;
    } catch (error) {
      console.error("Error saving Courses:", error);
      throw error;
    }

  }
};