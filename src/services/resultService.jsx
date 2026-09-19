// src/services/resultService.jsx
import api from "../api/api";

export const resultService = {
  getAll: async () => {
    try {
      const response = await api.get("/results");
      return response.data;
    } catch (error) {
      console.error("Error fetching results:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/results/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching result ${id}:`, error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await api.post("/results", data);
      return response.data;
    } catch (error) {
      console.error("Error saving result:", error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/results/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating result ${id}:`, error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/results/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting result ${id}:`, error);
      throw error;
    }
  },
};