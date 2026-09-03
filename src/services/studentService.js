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

  getById: async (studentId) => {
    try {
      const response = await api.get(`/students/${studentId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching student:", error);
      throw error;
    }
  },

  getWithoutAdmission: async () => {
    try {
      const response = await api.get("/students/without-admission");
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await api.post("/students", data);
      return response.data;
    } catch (error) {
      console.error("Error saving student:", error);
      throw error;
    }
  },

  createBasic: async (data) => {
    try {
      const response = await api.post("/students/basic", data);
      return response.data;
    } catch (error) {
      console.error("Error saving student:", error);
      throw error;
    }
  },

  createWithAdmission: async (data) => {
    try {
      const response = await api.post("/admissions/admissionWithStudent", data);
      return response.data;
    } catch (error) {
      console.error("Error saving student with admission:", error);
      throw error;
    }
  },

  update: async (studentId, data) => {
    try {
      const response = await api.put(`/students/${studentId}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating student:", error);
      throw error;
    }
  },
};