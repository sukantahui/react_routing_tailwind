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
  updateGuest: async (id: any, data: any): Promise<any> => {
    try {
      const response = await api.put("/dev/guests/"+id, data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};
