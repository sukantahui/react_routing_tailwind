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
      const response = await api.post("/admissions", data);
      return response.data;
    } catch (error) {
      console.error("Error saving admission:", error);
      throw error;
    }
  },

  createAdmissionWithStudent: async (data) => {
    try {
      const response = await api.post("/admissions/admissionWithStudent", data);
      return response.data;
    } catch (error) {
      console.error("Error saving admission with student:", error);
      throw error;
    }
  },

  createWithStudent: async (data) => {
    try {
      const response = await api.post("/admissions/admissionWithStudent", data);
      return response.data;
    } catch (error) {
      console.error("Error saving admission with student:", error);
      throw error;
    }
  },

  getById: async (admissionId) => {
    try {
      const response = await api.get(`/admissions/${admissionId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching admission:", error);
      throw error;
    }
  },

  update: async (admissionId, data) => {
    try {
      const response = await api.put(`/admissions/${admissionId}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating admission:", error);
      throw error;
    }
  },

  updateStatus: async (admissionId, { courseStatusId, completionDate }) => {
    try {
      const response = await api.put(`/admissions/${admissionId}`, {
        courseStatusId: Number(courseStatusId),
        completionDate: completionDate || null,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating course status and closing date:", error);
      throw error;
    }
  },

  delete: async (admissionId) => {
    try {
      const response = await api.delete(`/admissions/${admissionId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting admission:", error);
      throw error;
    }
  },

  getCourseStatuses: async () => {
    try {
      const response = await api.get("/course-statuses");
      return response.data;
    } catch (error) {
      console.warn("Could not fetch dynamic course statuses, returning fallback:", error);
      return {
        status: true,
        data: [
          { id: 1, course_status_name: "Ongoing" },
          { id: 2, course_status_name: "Completed" },
          { id: 3, course_status_name: "Incomplete" },
        ],
      };
    }
  },

  getLedger: async (admissionId) => {
    try {
      const response = await api.get(`/admissions/${admissionId}/ledger`);
      return response.data;
    } catch (error) {
      console.error("Error fetching admission fee ledger:", error);
      throw error;
    }
  },

  getDues: async () => {
    try {
      const response = await api.get("/admissions/dues");
      return response.data;
    } catch (error) {
      console.error("Error fetching dues report:", error);
      throw error;
    }
  },
};