// src/services/courseService.jsx
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

  getAllWithDetails: async () => {
    try {
      const response = await api.get("/courses/details");
      return response.data;
    } catch (error) {
      console.error("Error fetching Courses with details:", error);
      throw error;
    }
  },

  // Course with topics
  create: async (data) => {
    try {
      const response = await api.post("/courses", data);
      return response.data;
    } catch (error) {
      console.error("Error saving Course:", error);
      throw error;
    }
  },

  // Course basic without topics
  createBasic: async (data) => {
    try {
      const response = await api.post("/courses/basic", data);
      return response.data;
    } catch (error) {
      console.error("Error saving Course:", error);
      throw error;
    }
  },

  // Update / Modify course
  update: async (courseId, data) => {
    try {
      const response = await api.put(`/courses/${courseId}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating Course:", error);
      throw error;
    }
  },

  // Update Course Fees & Pricing Governance (Admin / Developer / Owner only)
  updateFees: async (courseId, feeData) => {
    try {
      // Attempt authenticated Tier 1 endpoint
      const response = await api.put(`/courses/${courseId}/fees`, feeData);
      return response.data;
    } catch (error) {
      // In local dev environment fallback to /dev/courses/{id}/fees if token missing
      if (import.meta.env.DEV) {
        try {
          const devRes = await api.put(`/dev/courses/${courseId}/fees`, feeData);
          return devRes.data;
        } catch (devErr) {
          void devErr;
        }
      }
      console.error("Error updating Course Fees:", error);
      throw error;
    }
  },

  // Delete course
  delete: async (courseId) => {
    try {
      const response = await api.delete(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting Course:", error);
      throw error;
    }
  },
};