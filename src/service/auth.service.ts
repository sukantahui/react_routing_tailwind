import axios from "axios";
import { useEffect, useState } from "react";

export const authService = {
    saveGuest: async (data: any): Promise<any> => {
        try {
            const response = await axios.post(
                "http://127.0.0.1/cnat_api/public/api/dev/guests",
                data, // 🔹 সরাসরি JSON পাঠাচ্ছি
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "", // 🔹 তোমার token
                    },
                }
            );
            return response.data; // 🔹 return করবে response data
        } catch (error) {
            console.error("Error:", error);
            throw error; // 🔹 caller ফাংশনে handle করার জন্য error throw করো
        }
    }

}