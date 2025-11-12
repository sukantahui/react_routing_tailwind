// src/services/studentService.js
import api from "../api/api";

export const studentService = {
  getAll: async () => {
    try {
      const response = await api.get("/students");
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  },
};