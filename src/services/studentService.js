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
  create: async (data) => {
    try {
      const response = await api.post("/students",data);
      return response.data;
    } catch (error) {
      console.error("Error saving student:", error);
      throw error;
    }

  }
};