// src/services/questionBankService.js
import api from "../api/api";

export const questionBankService = {
  // -------------------------------------------------------------
  // Subjects
  // -------------------------------------------------------------
  getSubjects: async () => {
    try {
      const res = await api.get("/subjects");
      return res.data?.data || res.data || [];
    } catch (error) {
      console.error("Error fetching subjects:", error);
      throw error;
    }
  },

  createSubject: async (payload) => {
    try {
      const res = await api.post("/subjects", payload);
      return res.data;
    } catch (error) {
      console.error("Error creating subject:", error);
      throw error;
    }
  },

  updateSubject: async (id, payload) => {
    try {
      const res = await api.put(`/subjects/${id}`, payload);
      return res.data;
    } catch (error) {
      console.error("Error updating subject:", error);
      throw error;
    }
  },

  deleteSubject: async (id) => {
    try {
      const res = await api.delete(`/subjects/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error deleting subject:", error);
      throw error;
    }
  },

  // -------------------------------------------------------------
  // Chapters
  // -------------------------------------------------------------
  getChapters: async () => {
    try {
      const res = await api.get("/chapters");
      return res.data?.data || res.data || [];
    } catch (error) {
      console.error("Error fetching chapters:", error);
      throw error;
    }
  },

  createChapter: async (payload) => {
    try {
      const res = await api.post("/chapters", payload);
      return res.data;
    } catch (error) {
      console.error("Error creating chapter:", error);
      throw error;
    }
  },

  updateChapter: async (id, payload) => {
    try {
      const res = await api.put(`/chapters/${id}`, payload);
      return res.data;
    } catch (error) {
      console.error("Error updating chapter:", error);
      throw error;
    }
  },

  deleteChapter: async (id) => {
    try {
      const res = await api.delete(`/chapters/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error deleting chapter:", error);
      throw error;
    }
  },

  // -------------------------------------------------------------
  // Topics
  // -------------------------------------------------------------
  getTopics: async () => {
    try {
      const res = await api.get("/topics");
      return res.data?.data || res.data || [];
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },

  createTopic: async (payload) => {
    try {
      const res = await api.post("/topics", payload);
      return res.data;
    } catch (error) {
      console.error("Error creating topic:", error);
      throw error;
    }
  },

  updateTopic: async (id, payload) => {
    try {
      const res = await api.put(`/topics/${id}`, payload);
      return res.data;
    } catch (error) {
      console.error("Error updating topic:", error);
      throw error;
    }
  },

  deleteTopic: async (id) => {
    try {
      const res = await api.delete(`/topics/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error deleting topic:", error);
      throw error;
    }
  },

  // -------------------------------------------------------------
  // Reference (Types & Levels)
  // -------------------------------------------------------------
  getQuestionTypes: async () => {
    try {
      const res = await api.get("/question-types");
      return res.data?.data || res.data || [];
    } catch (error) {
      console.warn("Could not fetch question types, using fallbacks:", error);
      return [
        { id: 1, questionTypeId: 1, questionTypeName: "Multiple Choice", defaultMarks: 1 },
        { id: 2, questionTypeId: 2, questionTypeName: "True/False", defaultMarks: 1 },
        { id: 3, questionTypeId: 3, questionTypeName: "Multiple Answers", defaultMarks: 2 },
        { id: 4, questionTypeId: 4, questionTypeName: "Short Answer", defaultMarks: 2 },
        { id: 5, questionTypeId: 5, questionTypeName: "Fill in the Blanks", defaultMarks: 1 },
      ];
    }
  },

  getQuestionLevels: async () => {
    try {
      const res = await api.get("/question-levels");
      return res.data?.data || res.data || [];
    } catch (error) {
      console.warn("Could not fetch question levels, using fallbacks:", error);
      return [
        { id: 1, questionLevelId: 1, questionLevelName: "Easy" },
        { id: 2, questionLevelId: 2, questionLevelName: "Medium" },
        { id: 3, questionLevelId: 3, questionLevelName: "Hard" },
      ];
    }
  },

  // -------------------------------------------------------------
  // Questions & Options (CRUD)
  // -------------------------------------------------------------
  getQuestions: async (params = {}) => {
    try {
      const res = await api.get("/questions", { params });
      return res.data?.data || res.data || [];
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  },

  getQuestionById: async (id) => {
    try {
      const res = await api.get(`/questions/${id}`);
      return res.data?.data || res.data;
    } catch (error) {
      console.error(`Error fetching question ${id}:`, error);
      throw error;
    }
  },

  createQuestion: async (payload) => {
    try {
      const res = await api.post("/questions", payload);
      return res.data;
    } catch (error) {
      console.error("Error creating question:", error);
      throw error;
    }
  },

  updateQuestion: async (id, payload) => {
    try {
      const res = await api.put(`/questions/${id}`, payload);
      return res.data;
    } catch (error) {
      console.error(`Error updating question ${id}:`, error);
      throw error;
    }
  },

  deleteQuestion: async (id) => {
    try {
      const res = await api.delete(`/questions/${id}`);
      return res.data;
    } catch (error) {
      console.error(`Error deleting question ${id}:`, error);
      throw error;
    }
  },
};

export default questionBankService;
