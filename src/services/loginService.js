// src/services/loginService.js
import api from "../api/api";

export const loginService = {
  login: async (credentials) => {
    try {
      const sanitizedPayload = {
        email: credentials.email ? String(credentials.email).trim() : "",
        password: credentials.password ? String(credentials.password) : "",
      };
      const response = await api.post("/login", sanitizedPayload);

      let data = response.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data.replace(/^\uFEFF/, "").trim());
        } catch (e) {
          console.warn("Could not parse response data:", e);
        }
      }

      return data; // returns { status, message, data: { user, token } }
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
      console.error("Failed to fetch current user:", error);
      throw error;
    }
  },
};
