// src/services/courseService.js
import api from "../api/api";

export const courseService = {
  getAll: async () => {
    try {
      const response = await api.get("/courses");
      return response.data;
    } catch (error) {
      console.error("Error fetching Courses:", error);
      throw error;
    }
  },
  create: async (data) => {
    try {
      const response = await api.post("/courses",data);
      return response.data;
    } catch (error) {
      console.error("Error saving Courses:", error);
      throw error;
    }

  }
};