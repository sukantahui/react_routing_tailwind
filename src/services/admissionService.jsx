// src/services/admissionService.js
import api from "../api/api";

export const admissionService = {
  getAll: async () => {
    try {
      const response = await api.get("/admissions");
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  },
  create: async (data) => {
    try {
      const response = await api.post("/admissions",data);
      return response.data;
    } catch (error) {
      console.error("Error saving student:", error);
      throw error;
    }

  }
};