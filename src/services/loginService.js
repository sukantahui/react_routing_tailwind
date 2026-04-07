// src/services/loginService.js
import api from "../api/api";

export const loginService = {
  login: async (credentials) => {
    try {
        console.log("🧭 Base URL:", import.meta.env.VITE_API_BASE_URL);
      const response = await api.post("/login", credentials);
      return response.data; // returns { status, message, data: { user, token } }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },
  currentUser: async () => {
    try {
      const response = await api.get("/me");
      return response.data; 
      /*
        Standard response.data
        {
          "status": true,
          "message": "User fetched",
          "data": {
            "userId": 7,
            "userName": "ritajaghosh@gmail.com",
            "userTypeId": 4,
            "userType": {
              "userTypeId": 4,
              "userTypeName": "Manager"
            },
            "employee": {
              "employeeId": 4,
              "employeeName": "Ritaja Ghosh",
              "mobile": "7003310220",
              "email": "ritajaghosh@gmail.com",
              "department": {
                "departmenntId": 4,
                "name": "Office"
              },
              "designation": {
                "designationId": 4,
                "name": "Manager"
              }
            }
          }
        }
      */
    } catch (error) {
      throw error;
    }
  },
};
