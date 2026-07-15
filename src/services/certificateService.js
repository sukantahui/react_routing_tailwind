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
      const response = await api.get(`dev/certificates/${code}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching certificate:", error);
      throw error;
    }
  },

  // Optionally add other methods (e.g., getAll, create, update, delete) as needed.
};