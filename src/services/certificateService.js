// src/services/certificateService.js
import api from "../api/api";

export const certificateService = {
  /**
   * Fetch a single certificate by its unique code.
   * @param {string} code - The certificate code (e.g., "CNAT-20250715125440").
   * @returns {Promise} The certificate data.
   */
  getByCode: async (code) => {
    try {
      const response = await api.get(`/dev/certificates/${code}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching certificate by code:", error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await api.get("/certificates");
      return response.data;
    } catch (error) {
      console.error("Error fetching all certificates:", error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await api.post("/certificates", data);
      return response.data;
    } catch (error) {
      console.error("Error recording certificate:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/certificates/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching certificate #${id}:`, error);
      throw error;
    }
  },
};