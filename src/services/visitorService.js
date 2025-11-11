import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://codernaccotax.co.in/cnat_api/public/api";

export const visitorService = {
  saveInquiry: async (data) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/visitors`, data);
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  },
};
