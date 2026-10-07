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
    const payload = {};

    const cFees = data.courseFees !== undefined ? data.courseFees : data.course_fees;
    if (cFees !== undefined && cFees !== null && cFees !== "") {
      payload.courseFees = Number(cFees);
      payload.course_fees = Number(cFees);
    }

    const stStatus = data.courseStatusId !== undefined ? data.courseStatusId : data.course_status_id;
    if (stStatus !== undefined && stStatus !== null) {
      payload.courseStatusId = Number(stStatus);
      payload.course_status_id = Number(stStatus);
    }

    const cId = data.courseId !== undefined ? data.courseId : data.course_id;
    if (cId !== undefined && cId !== null && cId !== "") {
      payload.courseId = Number(cId);
      payload.course_id = Number(cId);
    }

    const fmId = data.feeModesId !== undefined ? data.feeModesId : data.fee_modes_id;
    if (fmId !== undefined && fmId !== null && fmId !== "") {
      payload.feeModesId = Number(fmId);
      payload.fee_modes_id = Number(fmId);
    }

    const admDate = data.admissionDate || data.admission_date;
    if (admDate) {
      const d = String(admDate).trim();
      const cleanDate = d ? d.split("T")[0] : new Date().toISOString().split("T")[0];
      payload.admissionDate = cleanDate;
      payload.admission_date = cleanDate;
    }

    const compDate = data.completionDate !== undefined ? data.completionDate : data.completion_date;
    if (compDate && String(compDate).trim()) {
      const cleanComp = String(compDate).trim().split("T")[0];
      payload.completionDate = cleanComp;
      payload.completion_date = cleanComp;
    } else {
      payload.completionDate = null;
      payload.completion_date = null;
    }

    if (data.remarks !== undefined) {
      payload.remarks = data.remarks && String(data.remarks).trim() ? String(data.remarks).trim() : null;
    }

    // Strategy fallback array: PUT -> PATCH -> POST with _method=PUT -> POST update
    const strategies = [
      () => api.put(`/admissions/${admissionId}`, payload),
      () => api.patch(`/admissions/${admissionId}`, payload),
      () => api.post(`/admissions/${admissionId}`, { ...payload, _method: "PUT" }),
      () => api.post(`/admissions/update/${admissionId}`, payload),
    ];

    let lastError = null;
    for (let i = 0; i < strategies.length; i++) {
      try {
        const response = await strategies[i]();
        return response.data;
      } catch (err) {
        lastError = err;
        const status = err.response?.status;
        if (status === 422) {
          throw err;
        }
        if (status !== 404 && status !== 405) {
          throw err;
        }
      }
    }

    throw lastError;
  },

  updateStatus: async (admissionId, { courseStatusId, completionDate }) => {
    const cleanCompDate = completionDate && String(completionDate).trim() ? String(completionDate).trim().split("T")[0] : null;
    const payload = {
      courseStatusId: Number(courseStatusId),
      course_status_id: Number(courseStatusId),
      completionDate: cleanCompDate,
      completion_date: cleanCompDate,
    };

    const strategies = [
      () => api.put(`/admissions/${admissionId}`, payload),
      () => api.patch(`/admissions/${admissionId}`, payload),
      () => api.post(`/admissions/${admissionId}`, { ...payload, _method: "PUT" }),
      () => api.post(`/admissions/update/${admissionId}`, payload),
    ];

    let lastError = null;
    for (let i = 0; i < strategies.length; i++) {
      try {
        const response = await strategies[i]();
        return response.data;
      } catch (err) {
        lastError = err;
        const status = err.response?.status;
        if (status === 422) {
          throw err;
        }
        if (status !== 404 && status !== 405) {
          throw err;
        }
      }
    }

    throw lastError;
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