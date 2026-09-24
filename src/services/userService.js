// src/services/userService.js
import api from "../api/api";

export const DEFAULT_STUDENT_PASSWORD = "India2day@2026";

export const userService = {
  // Get all registered users
  getAll: async () => {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // Get available user types / roles
  getUserTypes: async () => {
    try {
      const response = await api.get("/user-types");
      return response.data;
    } catch (error) {
      console.error("Error fetching user types:", error);
      throw error;
    }
  },

  // Create general user
  create: async (payload) => {
    try {
      const response = await api.post("/users", payload);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  // Reset a user's password (Admin only)
  resetPassword: async (userId, newPassword = DEFAULT_STUDENT_PASSWORD) => {
    try {
      const response = await api.post(`/users/${userId}/reset-password`, {
        password: newPassword,
        new_password: newPassword,
      });
      return response.data;
    } catch (error) {
      console.error("Error resetting user password:", error);
      throw error;
    }
  },

  /**
   * Automatically creates a new user account for a student
   * with role "Student", enrollment number as username (saved in 'email' field via API),
   * and default password "India2day@2026".
   */
  createStudentUser: async (student, password = DEFAULT_STUDENT_PASSWORD) => {
    const studentId = student?.id || student?.studentId || student?.student_id;
    if (!studentId) {
      console.warn("createStudentUser skipped: missing student ID", student);
      return { success: false, error: "Missing student ID" };
    }

    // 1. Resolve Student role userTypeId dynamically
    let studentUserTypeId = null;
    try {
      const typesRes = await api.get("/user-types");
      const list = typesRes?.data?.data || (Array.isArray(typesRes?.data) ? typesRes.data : []);
      const studentType = Array.isArray(list)
        ? list.find((t) => (t.userTypeName || t.name || t.user_type_name || "").trim().toLowerCase() === "student")
        : null;
      if (studentType) {
        studentUserTypeId = studentType.userTypeId || studentType.user_type_id || studentType.id;
      }
    } catch (err) {
      console.warn("Could not load /user-types, will attempt fallback:", err);
    }

    // Fallback ID if not found dynamically (Student is standard userTypeId = 3 in CNAT)
    if (!studentUserTypeId) {
      studentUserTypeId = 3;
    }

    // 2. Extract enrollment number / registration number
    let enrollmentNo = (
      student?.enrollment_number ||
      student?.enrollmentNumber ||
      student?.enrollment_no ||
      student?.enrollmentNo ||
      student?.registration_number ||
      student?.registrationNumber ||
      student?.reg_no ||
      student?.regNo ||
      student?.registration_no ||
      student?.admissionNumber ||
      student?.admission_number ||
      student?.admissionNo ||
      ""
    ).toString().trim();

    let studentName = (student?.student_name || student?.studentName || student?.name || "").trim();

    // If enrollment number or student name was not in the passed object, fetch fresh student record
    if ((!enrollmentNo || !studentName) && studentId) {
      try {
        const freshStuRes = await api.get(`/students/${studentId}`);
        const freshStu = freshStuRes?.data?.student || freshStuRes?.data?.data || freshStuRes?.data || {};
        if (!enrollmentNo) {
          enrollmentNo = (
            freshStu?.enrollment_number ||
            freshStu?.enrollmentNumber ||
            freshStu?.enrollment_no ||
            freshStu?.enrollmentNo ||
            freshStu?.registration_number ||
            freshStu?.registrationNumber ||
            freshStu?.reg_no ||
            freshStu?.regNo ||
            freshStu?.registration_no ||
            freshStu?.admissionNumber ||
            freshStu?.admission_number ||
            freshStu?.admissionNo ||
            ""
          ).toString().trim();
        }
        if (!studentName) {
          studentName = (freshStu?.student_name || freshStu?.studentName || freshStu?.name || "").trim();
        }
      } catch (fetchErr) {
        console.warn("Could not fetch fresh student record for enrollment number:", fetchErr);
      }
    }

    // 3. User name will be enrollment number, saved in `email` column via API
    // User request: "enrollment number will user name, here email and save it in users using api"
    const rawEmail = student?.email ? String(student.email).trim() : "";
    const whatsapp = (student?.whatsapp || student?.phone1 || "").trim();

    const username = enrollmentNo || rawEmail || whatsapp || `student_${studentId}`;
    const displayName = studentName || username;

    const payload = {
      name: displayName,
      user_name: username,
      userName: username,
      email: username, // Saved in users 'email' column/field via API
      password: password,
      password_confirmation: password,
      user_type_id: Number(studentUserTypeId),
      employee_id: null,
      student_id: Number(studentId),
    };

    try {
      const res = await api.post("/users", payload);
      return {
        success: true,
        data: res.data,
        email: username,
        username: username,
        enrollmentNumber: enrollmentNo || username,
        password: password,
        role: "Student",
      };
    } catch (firstErr) {
      console.warn("Primary student user creation attempt:", firstErr?.response?.data || firstErr.message);
      const errMsg = JSON.stringify(firstErr.response?.data || "").toLowerCase();

      // Check if user already exists (duplicate handle/email)
      if (
        errMsg.includes("already been taken") ||
        errMsg.includes("duplicate") ||
        errMsg.includes("unique")
      ) {
        console.info("User already exists for this handle/student:", username);
        return {
          success: true,
          alreadyExists: true,
          data: firstErr?.response?.data,
          email: username,
          username: username,
          enrollmentNumber: enrollmentNo || username,
          password: password,
          role: "Student",
        };
      }

      // If backend validation requires an email format with @ and domain
      if (
        !username.includes("@") ||
        errMsg.includes("valid email") ||
        errMsg.includes("must be a valid email") ||
        errMsg.includes("email")
      ) {
        const cleanEnrollment = (enrollmentNo || whatsapp || `student${studentId}`).replace(/[^0-9a-zA-Z._-]/g, "");
        const formattedEmail = `${cleanEnrollment}@coderaccotax.in`;
        try {
          const retryPayload = {
            ...payload,
            email: formattedEmail,
          };
          const retryRes = await api.post("/users", retryPayload);
          return {
            success: true,
            data: retryRes.data,
            email: formattedEmail,
            username: formattedEmail,
            enrollmentNumber: enrollmentNo || formattedEmail,
            password: password,
            role: "Student",
          };
        } catch (retryErr) {
          console.error("Retry with formatted enrollment email failed:", retryErr?.response?.data || retryErr.message);
          const retryMsg = JSON.stringify(retryErr.response?.data || "").toLowerCase();
          if (retryMsg.includes("already been taken") || retryMsg.includes("duplicate") || retryMsg.includes("unique")) {
            return {
              success: true,
              alreadyExists: true,
              data: retryErr?.response?.data,
              email: formattedEmail,
              username: formattedEmail,
              password: password,
              role: "Student",
            };
          }
        }
      }

      return {
        success: false,
        error: firstErr.response?.data?.message || firstErr.message || "Failed to create student user",
        email: username,
        username: username,
        enrollmentNumber: enrollmentNo || username,
        password: password,
      };
    }
  },

  /**
   * Helper to batch-provision student accounts for students who don't have one yet.
   */
  provisionMissingStudentAccounts: async (studentsList = [], existingUsersList = []) => {
    const existingStudentIds = new Set(
      existingUsersList
        .map((u) => u.student_id || u.studentId)
        .filter(Boolean)
        .map(String)
    );

    const missingStudents = studentsList.filter((s) => !existingStudentIds.has(String(s.id)));
    const results = [];

    for (const student of missingStudents) {
      try {
        const res = await userService.createStudentUser(student);
        results.push({ student, ...res });
      } catch (err) {
        results.push({ student, success: false, error: err.message });
      }
    }

    return results;
  },
};

export default userService;
