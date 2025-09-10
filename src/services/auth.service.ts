import api from "./api";

export const authService = {
  saveGuest: async (data: any): Promise<any> => {
    try {
      const response = await api.post("/dev/guests", data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
  getAllGuest: async (data: any): Promise<any> => {
    try {
      const response = await api.get("/dev/guests");
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};
