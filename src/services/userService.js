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

  // Update current authenticated user profile (Name, Mobile, Gender, etc.)
  updateProfile: async (payload) => {
    try {
      const response = await api.put("/profile", payload);
      const updatedUser = response?.data?.data || response?.data?.user || response?.data;
      if (updatedUser && typeof updatedUser === "object") {
        try {
          const rawLocal = localStorage.getItem("user");
          const parsed = rawLocal ? JSON.parse(rawLocal) : {};
          const merged = { ...parsed, ...updatedUser };
          localStorage.setItem("user", JSON.stringify(merged));
          window.dispatchEvent(new Event("storage"));
          window.dispatchEvent(new Event("authChanged"));
        } catch {}
      }
      return updatedUser;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },

  // Reset a user's password (Admin only)
  resetPassword: async (userId, newPassword = DEFAULT_STUDENT_PASSWORD) => {
    try {
      const response = await api.post(`/users/${userId}/reset-password`, {
        password: newPassword,
        new_password: newPassword,
        password_confirmation: newPassword,
        confirm_password: newPassword,
      });
      return response.data;
    } catch (error) {
      console.error("Error resetting user password:", error);
      throw error;
    }
  },

  // Reset password for currently logged-in user (All roles: Student, Teacher, Staff, Admin)
  resetSelfPassword: async (newPassword, confirmPassword) => {
    try {
      let user = null;
      try {
        const userStr = localStorage.getItem("user");
        user = userStr ? JSON.parse(userStr) : null;
      } catch (e) {
        void e;
      }

      const userId = user?.id || user?.userId || user?.student_id || user?.employee_id;
      const userEmail = user?.email || user?.userName || user?.user_name;

      if (userId) {
        try {
          const res = await api.post(`/users/${userId}/reset-password`, {
            password: newPassword,
            new_password: newPassword,
            password_confirmation: confirmPassword || newPassword,
            confirm_password: confirmPassword || newPassword,
          });
          return res.data;
        } catch (idErr) {
          console.warn("Direct user ID reset endpoint failed, trying /reset-password route:", idErr);
        }
      }

      // Fallback via general /reset-password endpoint with email / username
      const response = await api.post("/reset-password", {
        email: userEmail || "",
        password: newPassword,
        new_password: newPassword,
        confirm_password: confirmPassword || newPassword,
        password_confirmation: confirmPassword || newPassword,
      });
      return response.data;
    } catch (error) {
      console.error("Self password reset failed:", error);
      throw error;
    }
  },

  /**
   * Prompts any logged-in user with a secure, masked dialog to reset their own password.
   */
  promptSelfPasswordReset: async (SwalInstance) => {
    let user = null;
    try {
      const userStr = localStorage.getItem("user");
      user = userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      void e;
    }

    if (!user) {
      SwalInstance.fire({
        icon: "warning",
        title: "Please Sign In",
        text: "You must be signed in to reset your account password.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    const displayName =
      user.name ||
      user.student_name ||
      user.studentName ||
      user.employeeName ||
      user.userName ||
      user.email ||
      "User";

    const userRole =
      user.role ||
      user.userTypeName ||
      (user.student_id ? "Student" : user.employee_id ? "Staff" : "Account Holder");

    return SwalInstance.fire({
      title: "Reset Account Password",
      html: `
        <div class="text-left space-y-3.5 text-xs text-slate-300">
          <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div class="truncate max-w-[220px]">
              <span class="text-slate-400 text-[10px] uppercase block font-semibold">Account User</span>
              <strong class="text-white text-sm truncate block">${displayName}</strong>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-sky-500/10 text-sky-400 border border-sky-500/20">
              ${userRole}
            </span>
          </div>

          <div>
            <label class="block font-semibold text-slate-200 mb-1">
              New Password <span class="text-rose-400">*</span>
            </label>
            <div class="relative">
              <input
                id="swal-self-new-pass"
                type="password"
                placeholder="Enter new password (min 6 characters)"
                class="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-mono text-sm outline-none focus:border-amber-500"
              />
              <button
                type="button"
                id="swal-toggle-self-pass"
                tabindex="-1"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 transition cursor-pointer"
                title="Toggle password visibility"
              >
                <i id="swal-icon-self-pass" class="bi bi-eye"></i>
              </button>
            </div>
          </div>

          <div>
            <label class="block font-semibold text-slate-200 mb-1">
              Confirm New Password <span class="text-rose-400">*</span>
            </label>
            <div class="relative">
              <input
                id="swal-self-confirm-pass"
                type="password"
                placeholder="Re-enter new password"
                class="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-mono text-sm outline-none focus:border-amber-500"
              />
              <button
                type="button"
                id="swal-toggle-self-confirm"
                tabindex="-1"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 transition cursor-pointer"
                title="Toggle confirm password visibility"
              >
                <i id="swal-icon-self-confirm" class="bi bi-eye"></i>
              </button>
            </div>
            <p class="text-[10px] text-slate-400 mt-1">
              Ensure your new password contains at least 6 characters.
            </p>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Update My Password",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#334155",
      background: "#0f172a",
      color: "#f8fafc",
      didOpen: () => {
        const passInput = document.getElementById("swal-self-new-pass");
        const togglePassBtn = document.getElementById("swal-toggle-self-pass");
        const iconPass = document.getElementById("swal-icon-self-pass");

        const confirmInput = document.getElementById("swal-self-confirm-pass");
        const toggleConfirmBtn = document.getElementById("swal-toggle-self-confirm");
        const iconConfirm = document.getElementById("swal-icon-self-confirm");

        if (togglePassBtn && passInput && iconPass) {
          togglePassBtn.addEventListener("click", () => {
            const isPassword = passInput.type === "password";
            passInput.type = isPassword ? "text" : "password";
            iconPass.className = isPassword ? "bi bi-eye-slash" : "bi bi-eye";
          });
        }

        if (toggleConfirmBtn && confirmInput && iconConfirm) {
          toggleConfirmBtn.addEventListener("click", () => {
            const isPassword = confirmInput.type === "password";
            confirmInput.type = isPassword ? "text" : "password";
            iconConfirm.className = isPassword ? "bi bi-eye-slash" : "bi bi-eye";
          });
        }
      },
      preConfirm: async () => {
        const pass = document.getElementById("swal-self-new-pass")?.value?.trim();
        const confirm = document.getElementById("swal-self-confirm-pass")?.value?.trim();

        if (!pass) {
          SwalInstance.showValidationMessage("Please enter a new password.");
          return false;
        }
        if (pass.length < 6) {
          SwalInstance.showValidationMessage("Password must be at least 6 characters.");
          return false;
        }
        if (!confirm) {
          SwalInstance.showValidationMessage("Please confirm your new password.");
          return false;
        }
        if (pass !== confirm) {
          SwalInstance.showValidationMessage("New Password and Confirm Password do not match.");
          return false;
        }

        try {
          const res = await userService.resetSelfPassword(pass, confirm);
          return { res, pass };
        } catch (err) {
          SwalInstance.showValidationMessage(
            err.response?.data?.message || "Failed to update password. Please try again."
          );
          return false;
        }
      },
    }).then((res) => {
      if (res.isConfirmed && res.value) {
        SwalInstance.fire({
          title: "Password Updated Successfully!",
          text: "Your account password has been updated. Please use your new password for your next login.",
          icon: "success",
          background: "#0f172a",
          color: "#f8fafc",
          confirmButtonColor: "#0284c7",
        });
      }
    });
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

  /**
   * Get all consistent unique identifier keys for a user object
   */
  getUserIdentifiers: (user) => {
    if (!user) return [];
    const keys = [];
    const id = user.id || user.userId || user.user_id;
    if (id) keys.push(`id_${id}`);

    const stuId = user.student_id || user.studentId;
    if (stuId) keys.push(`student_${stuId}`);

    const empId = user.employee_id || user.employeeId || user.employee?.employeeId;
    if (empId) keys.push(`employee_${empId}`);

    const email = user.email || user.employee?.email;
    if (email) keys.push(`email_${String(email).trim().toLowerCase()}`);

    const username = user.userName || user.user_name || user.username;
    if (username) keys.push(`username_${String(username).trim().toLowerCase()}`);

    const name = user.name || user.employeeName || user.employee?.employeeName;
    if (name) keys.push(`name_${String(name).trim().toLowerCase()}`);

    return keys;
  },

  /**
   * Retrieves individual user-specific profile picture URL.
   * Isolates avatars so different accounts on the same browser have their own distinct photo.
   */
  getUserAvatar: (user) => {
    if (!user) return "";

    // 1. Direct property on user object
    if (user.avatar && typeof user.avatar === "string" && user.avatar.trim() !== "") {
      return user.avatar;
    }
    if (user.profilePicture && typeof user.profilePicture === "string" && user.profilePicture.trim() !== "") {
      return user.profilePicture;
    }
    if (user.image && typeof user.image === "string" && user.image.trim() !== "") {
      return user.image;
    }

    // 2. Lookup in user avatar registry map in localStorage
    try {
      const mapStr = localStorage.getItem("portal_user_avatars");
      if (mapStr) {
        const avatarMap = JSON.parse(mapStr);
        const keys = userService.getUserIdentifiers(user);
        for (const k of keys) {
          if (avatarMap && avatarMap[k]) return avatarMap[k];
        }
      }
    } catch {
      // ignore
    }

    // 3. User-specific key fallback
    try {
      const keys = userService.getUserIdentifiers(user);
      for (const k of keys) {
        const val = localStorage.getItem(`userAvatar_${k}`);
        if (val) return val;
      }
    } catch {
      // ignore
    }

    return "";
  },

  /**
   * Saves individual avatar for a specific user.
   */
  saveUserAvatar: (user, avatarDataUrl) => {
    if (!user) return null;
    const cleanAvatar = avatarDataUrl || "";
    const keys = userService.getUserIdentifiers(user);

    // 1. Update user avatar map
    try {
      let avatarMap = {};
      const existing = localStorage.getItem("portal_user_avatars");
      if (existing) {
        try {
          avatarMap = JSON.parse(existing) || {};
        } catch {
          avatarMap = {};
        }
      }
      keys.forEach((k) => {
        if (cleanAvatar) {
          avatarMap[k] = cleanAvatar;
        } else {
          delete avatarMap[k];
        }
      });
      localStorage.setItem("portal_user_avatars", JSON.stringify(avatarMap));
    } catch (e) {
      console.warn("Could not save to portal_user_avatars:", e);
    }

    // 2. Update user-specific individual localStorage keys
    try {
      keys.forEach((k) => {
        if (cleanAvatar) {
          localStorage.setItem(`userAvatar_${k}`, cleanAvatar);
        } else {
          localStorage.removeItem(`userAvatar_${k}`);
        }
      });
      // Clean up legacy global shared key if present
      localStorage.removeItem("userAvatar");
    } catch (e) {
      void e;
    }

    // 3. Update active user object in localStorage if this is the active session
    let updatedUser = { ...user, avatar: cleanAvatar, profilePicture: cleanAvatar, image: cleanAvatar };
    try {
      const rawCurrentUser = localStorage.getItem("user");
      if (rawCurrentUser) {
        const parsed = JSON.parse(rawCurrentUser);
        const currentKeys = userService.getUserIdentifiers(parsed);
        const isMatch = keys.some((k) => currentKeys.includes(k));
        if (isMatch) {
          updatedUser = { ...parsed, avatar: cleanAvatar, profilePicture: cleanAvatar, image: cleanAvatar };
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      }
    } catch (e) {
      void e;
    }

    // 4. Try API persist in background if user ID exists
    try {
      const userId = user.id || user.userId || user.user_id;
      if (userId) {
        api.put(`/users/${userId}`, { avatar: cleanAvatar, image: cleanAvatar }).catch(() => {});
      }
    } catch {
      // ignore
    }

    // 5. Trigger reactive event across tabs / navbar / profile
    try {
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("authChanged"));
    } catch (e) {
      void e;
    }

    return updatedUser;
  },

  /**
   * Remove individual avatar for a specific user
   */
  removeUserAvatar: (user) => {
    return userService.saveUserAvatar(user, "");
  },

  /**
   * Automatically enriches the user session with linked student details,
   * specifically including gender_id, gender name, student profile, etc.
  /**
   * Enriches the user session with fresh profile data from /me.
   * Safe against infinite loops and 403 Forbidden errors.
   */
  hydrateUserProfile: async (userObj) => {
    if (!userObj || typeof userObj !== "object") return userObj;

    const token = localStorage.getItem("token");
    if (!token || token === "null" || token === "undefined") return userObj;

    let baseUser = { ...userObj };

    // If gender_id is already present and valid, return immediately
    if (baseUser.gender_id !== undefined && baseUser.gender_id !== null && (baseUser.student || baseUser.employee)) {
      return baseUser;
    }

    // 1. Fetch fresh /me from backend which embeds student, employee, gender_id, and role
    try {
      const meRes = await api.get("/me");
      const freshUser = meRes?.data?.data || meRes?.data?.user || (meRes?.data?.id ? meRes.data : null);
      if (freshUser && typeof freshUser === "object") {
        baseUser = {
          ...baseUser,
          ...freshUser,
        };
      }
    } catch (meErr) {
      // ignore network errors
    }

    // If gender_id is still missing for a student, ensure a safe default so UI functions properly
    if (baseUser.gender_id === undefined || baseUser.gender_id === null) {
      const isFemale = String(baseUser.gender || baseUser.genderName || "").toLowerCase().includes("female");
      baseUser.gender_id = isFemale ? 2 : (baseUser.student_id ? 2 : 1);
      baseUser.gender = baseUser.gender_id === 2 ? "Female" : "Male";
    }

    try {
      localStorage.setItem("user", JSON.stringify(baseUser));
    } catch {}

    return baseUser;
  },
};

export default userService;
