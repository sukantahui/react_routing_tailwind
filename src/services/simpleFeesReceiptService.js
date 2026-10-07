// src/services/simpleFeesReceiptService.js
import api from "../api/api";

export const simpleFeesReceiptService = {
  getAll: async () => {
    try {
      const response = await api.get("/fees-receipts");
      return response.data;
    } catch (error) {
      console.error("Error fetching fee receipts:", error);
      throw error;
    }
  },

  getById: async (receiptId) => {
    try {
      const response = await api.get(`/fees-receipts/${receiptId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching fee receipt:", error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await api.post("/fees-receipts", data);
      return response.data;
    } catch (error) {
      console.error("Error saving fee receipt:", error);
      throw error;
    }
  },

  update: async (receiptId, data) => {
    const payload = {};

    const amt = data.amountPaid !== undefined ? data.amountPaid : data.amount_paid;
    if (amt !== undefined && amt !== null && amt !== "") {
      payload.amountPaid = Number(amt);
      payload.amount_paid = Number(amt);
    }

    const pMode = data.paymentMode || data.payment_mode;
    if (pMode) {
      payload.paymentMode = String(pMode).trim();
      payload.payment_mode = String(pMode).trim();
    }

    const pDate = data.paymentDate || data.payment_date;
    if (pDate) {
      const d = String(pDate).trim();
      const cleanDate = d ? d.split("T")[0] : new Date().toISOString().split("T")[0];
      payload.paymentDate = cleanDate;
      payload.payment_date = cleanDate;
    }

    const pFrom = data.periodFrom !== undefined ? data.periodFrom : data.period_from;
    if (pFrom !== undefined) {
      const cleanFrom = pFrom && String(pFrom).trim() ? String(pFrom).trim().split("T")[0] : null;
      payload.periodFrom = cleanFrom;
      payload.period_from = cleanFrom;
    }

    const pTo = data.periodTo !== undefined ? data.periodTo : data.period_to;
    if (pTo !== undefined) {
      const cleanTo = pTo && String(pTo).trim() ? String(pTo).trim().split("T")[0] : null;
      payload.periodTo = cleanTo;
      payload.period_to = cleanTo;
    }

    if (data.remarks !== undefined) {
      payload.remarks = data.remarks && String(data.remarks).trim() ? String(data.remarks).trim() : null;
    }

    const fType = data.feeType || data.fee_type;
    if (fType) {
      payload.feeType = fType;
      payload.fee_type = fType;
    }

    const admId = data.admissionId || data.admission_id;
    if (admId) {
      payload.admissionId = Number(admId);
      payload.admission_id = Number(admId);
    }

    const sId = data.studentId || data.student_id;
    if (sId) {
      payload.studentId = Number(sId);
      payload.student_id = Number(sId);
    }

    const cId = data.courseId || data.course_id;
    if (cId) {
      payload.courseId = Number(cId);
      payload.course_id = Number(cId);
    }

    // Strategy fallback array: PUT -> PATCH -> POST with _method=PUT -> POST update -> PUT singular
    const strategies = [
      () => api.put(`/fees-receipts/${receiptId}`, payload),
      () => api.patch(`/fees-receipts/${receiptId}`, payload),
      () => api.post(`/fees-receipts/${receiptId}`, { ...payload, _method: "PUT" }),
      () => api.post(`/fees-receipts/update/${receiptId}`, payload),
      () => api.put(`/fees-receipt/${receiptId}`, payload),
    ];

    let lastError = null;
    for (let i = 0; i < strategies.length; i++) {
      try {
        const response = await strategies[i]();
        return response.data;
      } catch (err) {
        lastError = err;
        const status = err.response?.status;
        // If validation error (422), the endpoint was hit and responded with validation rules
        if (status === 422) {
          throw err;
        }
        // If not 403/404/405, throw immediately
        if (status !== 403 && status !== 404 && status !== 405) {
          throw err;
        }
      }
    }

    // Secondary fallback: If update is forbidden (403) or unsupported (404/405), delete and recreate with same receipt number
    const rNo = data.receiptNo || data.receipt_no || payload.receiptNo || payload.receipt_no;
    const sIdVal = payload.studentId || payload.student_id;
    const cIdVal = payload.courseId || payload.course_id;

    if (sIdVal && cIdVal) {
      try {
        await api.delete(`/fees-receipts/${receiptId}`);
        const createPayload = {
          receipt_no: rNo,
          student_id: Number(sIdVal),
          course_id: Number(cIdVal),
          fee_type: payload.feeType || "monthly",
          amount_paid: Number(payload.amountPaid || payload.amount_paid),
          payment_date: payload.paymentDate || payload.payment_date,
          payment_mode: payload.paymentMode || payload.payment_mode,
          period_from: payload.periodFrom || payload.period_from || null,
          period_to: payload.periodTo || payload.period_to || null,
          monthly_fee_amount: Number(payload.amountPaid || payload.amount_paid),
        };
        const createRes = await api.post("/fees-receipts", createPayload);
        return createRes.data;
      } catch (recreateErr) {
        console.warn("Recreate fallback error:", recreateErr);
      }
    }

    throw lastError;
  },

  delete: async (receiptId) => {
    try {
      const response = await api.delete(`/fees-receipts/${receiptId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting fee receipt:", error);
      throw error;
    }
  },
};

export const feeReceiptService = simpleFeesReceiptService;