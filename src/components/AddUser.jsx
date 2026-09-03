// ============================================================================
// AddUser.jsx - Dedicated Full-Page Admin User & Role Registration Console
// ============================================================================

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

export default function AddUser() {
  const navigate = useNavigate();

  // State lists
  const [userTypes, setUserTypes] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Form inputs
  const [formData, setFormData] = useState({
    user_type_id: "",
    employee_id: "",
    student_id: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Load dropdown resources
  useEffect(() => {
    const loadResources = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const [rolesRes, empRes, stuRes] = await Promise.all([
          api.get("/user-types"),
          api.get("/employees"),
          api.get("/students"),
        ]);

        if (rolesRes?.data?.status) {
          setUserTypes(rolesRes.data.data || []);
        }
        if (empRes?.data?.status) {
          setEmployees(empRes.data.data || []);
        }
        if (stuRes?.data?.status || Array.isArray(stuRes?.data)) {
          const sList = stuRes?.data?.data || stuRes?.data || [];
          setStudents(Array.isArray(sList) ? sList : []);
        }
      } catch (err) {
        console.error("Failed to load registration dependencies:", err);
        setFetchError(
          err.response?.data?.message ||
            "Failed to load role or personnel records. Make sure you are signed in as Admin."
        );
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  // Selected Role inspection
  const selectedRoleObj = useMemo(() => {
    return userTypes.find((t) => String(t.userTypeId) === String(formData.user_type_id));
  }, [userTypes, formData.user_type_id]);

  const isStudentRole = useMemo(() => {
    return (selectedRoleObj?.userTypeName || "").trim().toLowerCase() === "student";
  }, [selectedRoleObj]);

  // Selected Employee & Student details for preview
  const selectedEmployeeObj = useMemo(() => {
    return employees.find((e) => String(e.employeeId) === String(formData.employee_id));
  }, [employees, formData.employee_id]);

  const selectedStudentObj = useMemo(() => {
    return students.find((s) => String(s.id) === String(formData.student_id));
  }, [students, formData.student_id]);

  // Handle Role selection
  const handleRoleChange = (e) => {
    const roleId = e.target.value;
    const roleObj = userTypes.find((t) => String(t.userTypeId) === String(roleId));
    const isStudent = (roleObj?.userTypeName || "").trim().toLowerCase() === "student";

    setFormData((prev) => ({
      ...prev,
      user_type_id: roleId,
      employee_id: "",
      student_id: "",
      email: "",
    }));
  };

  // Handle Employee selection
  const handleEmployeeChange = (e) => {
    const empId = e.target.value;
    const emp = employees.find((item) => String(item.employeeId) === String(empId));

    setFormData((prev) => ({
      ...prev,
      employee_id: empId,
      student_id: "",
      email: emp?.email || emp?.employeeName?.toLowerCase().replace(/\s+/g, "") || prev.email,
    }));
  };

  // Handle Student selection
  const handleStudentChange = (e) => {
    const sId = e.target.value;
    const stu = students.find((item) => String(item.id) === String(sId));

    setFormData((prev) => ({
      ...prev,
      student_id: sId,
      employee_id: "",
      email: stu?.registration_number || stu?.email || prev.email,
    }));
  };

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Quick generate password
  const generatePassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$";
    let pass = "";
    for (let i = 0; i < 10; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({
      ...prev,
      password: pass,
      password_confirmation: pass,
    }));
  };

  // Password Strength Indicator
  const passwordStrength = useMemo(() => {
    const p = formData.password || "";
    if (!p) return { score: 0, text: "", color: "" };
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;

    if (score <= 1) return { score: 1, text: "Weak", color: "bg-rose-500 text-rose-400" };
    if (score === 2) return { score: 2, text: "Medium", color: "bg-amber-500 text-amber-400" };
    return { score: 3, text: "Strong", color: "bg-emerald-500 text-emerald-400" };
  }, [formData.password]);

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.user_type_id) {
      Swal.fire({
        icon: "warning",
        title: "Role Required",
        text: "Please select an authoritative role for the new user.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    if (isStudentRole && !formData.student_id) {
      Swal.fire({
        icon: "warning",
        title: "Student Selection Required",
        text: "Please link this account to an enrolled student record.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    if (!isStudentRole && !formData.employee_id) {
      Swal.fire({
        icon: "warning",
        title: "Employee Record Required",
        text: "Please link this account to an existing employee.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    if (!formData.email.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Login Handle Required",
        text: "Please enter a valid login username or email.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    if (formData.password.length < 8) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 8 characters long.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Password and confirmation password do not match.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        email: formData.email.trim(),
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        user_type_id: Number(formData.user_type_id),
        employee_id: isStudentRole ? null : Number(formData.employee_id),
        student_id: isStudentRole ? Number(formData.student_id) : null,
      };

      const res = await api.post("/users", payload);

      if (res?.data?.status) {
        Swal.fire({
          icon: "success",
          title: "User Successfully Registered!",
          html: `
            <div class="text-left text-xs text-slate-300 space-y-1.5 p-3 rounded-lg bg-slate-800/80 mt-2">
              <p><b>Login Handle:</b> <span class="text-sky-400">${formData.email}</span></p>
              <p><b>Assigned Role:</b> <span class="text-purple-400">${selectedRoleObj?.userTypeName}</span></p>
              <p><b>Associated Record:</b> ${isStudentRole ? selectedStudentObj?.student_name : selectedEmployeeObj?.employeeName}</p>
            </div>
          `,
          background: "#0f172a",
          color: "#f8fafc",
          iconColor: "#38bdf8",
          showCancelButton: true,
          confirmButtonColor: "#0284c7",
          cancelButtonColor: "#475569",
          confirmButtonText: "View Users Directory",
          cancelButtonText: "Register Another User",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/admin/users");
          } else {
            // Reset form for next entry
            setFormData({
              user_type_id: "",
              employee_id: "",
              student_id: "",
              email: "",
              password: "",
              password_confirmation: "",
            });
          }
        });
      } else {
        throw new Error(res?.data?.message || "Failed to register user.");
      }
    } catch (err) {
      console.error("User registration error:", err);
      const msg =
        err.response?.data?.message ||
        (err.response?.data?.errors
          ? Object.values(err.response.data.errors).flat().join(" ")
          : "Could not register user account.");

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: msg,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Preview display values
  const previewName = isStudentRole
    ? selectedStudentObj?.student_name || "Student Full Name"
    : selectedEmployeeObj?.employeeName || "Employee Full Name";

  const previewAffiliation = isStudentRole
    ? selectedStudentObj?.registration_number || "Student Registration"
    : selectedEmployeeObj?.department?.name || "Department / Designation";

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Background glow accents */}
      <div className="fixed w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-[160px] -top-40 -left-20 pointer-events-none" />
      <div className="fixed w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] top-1/2 -right-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        {/* Navigation Breadcrumbs & Header Card */}
        <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
              <span>/</span>
              <Link to="/admin/users" className="hover:text-white transition">User Governance</Link>
              <span>/</span>
              <span className="text-sky-400 font-semibold">Register User</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <i className="bi bi-person-plus-fill text-sky-400"></i>
              Provision &amp; Register User
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              As an authorized administrator, register credentials, set login passwords, and grant tailored RBAC authorization.
            </p>
          </div>

          <Link
            to="/admin/users"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/80 transition"
          >
            <i className="bi bi-people-fill"></i>
            <span>All Users Directory</span>
          </Link>
        </div>

        {fetchError ? (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 p-6 rounded-2xl text-center">
            <i className="bi bi-exclamation-octagon-fill text-3xl block mb-2 text-rose-400"></i>
            <h3 className="font-bold text-base">Error Loading Administrative Resources</h3>
            <p className="text-xs mt-1 text-slate-400">{fetchError}</p>
          </div>
        ) : loading ? (
          <div className="bg-slate-900/50 border border-slate-800 p-12 rounded-2xl text-center text-slate-400">
            <svg className="animate-spin h-8 w-8 text-sky-400 mx-auto mb-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <p className="text-sm">Initializing registration form resources...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Columns: Main Registration Form */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* SECTION 1: ROLE & RECORD LINKAGE */}
                <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-5">
                  <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 text-xs flex items-center justify-center font-bold">1</span>
                      Role &amp; Identity Affiliation
                    </h2>
                    <span className="text-[11px] text-slate-500">Step 1 of 2</span>
                  </div>

                  {/* 1. Select Role */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Assign Authority Role <span className="text-rose-400">*</span>
                    </label>
                    <select
                      name="user_type_id"
                      value={formData.user_type_id}
                      onChange={handleRoleChange}
                      required
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                    >
                      <option value="">-- Choose System Role --</option>
                      {userTypes.map((t) => (
                        <option key={t.userTypeId} value={t.userTypeId}>
                          {t.userTypeName}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Role controls accessible routes, action capabilities, and security barriers.
                    </p>
                  </div>

                  {/* 2. Dynamic Association */}
                  {formData.user_type_id ? (
                    isStudentRole ? (
                      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/25 space-y-2">
                        <label className="block text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                          <i className="bi bi-mortarboard-fill"></i>
                          <span>Link to Enrolled Student</span> <span className="text-rose-400">*</span>
                        </label>
                        <select
                          name="student_id"
                          value={formData.student_id}
                          onChange={handleStudentChange}
                          required
                          className="w-full bg-slate-950 border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
                        >
                          <option value="">-- Select Enrolled Student ({students.length} on record) --</option>
                          {students.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.student_name} • {s.registration_number || `ID: #${s.id}`}
                            </option>
                          ))}
                        </select>
                        <p className="text-[11px] text-emerald-400/80">
                          Account will synchronize with the student's academic records, fees, and exam results.
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-sky-500/5 border border-sky-500/25 space-y-2">
                        <label className="block text-xs font-semibold text-sky-300 flex items-center gap-1.5">
                          <i className="bi bi-briefcase-fill"></i>
                          <span>Link to Staff / Employee</span> <span className="text-rose-400">*</span>
                        </label>
                        <select
                          name="employee_id"
                          value={formData.employee_id}
                          onChange={handleEmployeeChange}
                          required
                          className="w-full bg-slate-950 border border-sky-500/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-400 cursor-pointer"
                        >
                          <option value="">-- Select Employee Record ({employees.length} on record) --</option>
                          {employees.map((emp) => (
                            <option key={emp.employeeId} value={emp.employeeId}>
                              {emp.employeeName} ({emp.department?.name || "General"} • {emp.designation?.name || "Staff"})
                            </option>
                          ))}
                        </select>
                        <p className="text-[11px] text-sky-400/80">
                          Account will link to the designated employee profile and organizational unit.
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-dashed border-slate-800 text-center text-xs text-slate-500">
                      Select a role above to unlock student or staff linkage.
                    </div>
                  )}
                </div>

                {/* SECTION 2: CREDENTIALS & SECURITY */}
                <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-5">
                  <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs flex items-center justify-center font-bold">2</span>
                      Login Credentials &amp; Password
                    </h2>
                    <span className="text-[11px] text-slate-500">Step 2 of 2</span>
                  </div>

                  {/* Login Handle */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Login Identifier (Username or Email) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="email"
                      placeholder={isStudentRole ? "e.g. CNAT-00001-2627 or student@domain.com" : "e.g. staff.username or staff@domain.com"}
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      This exact handle will be required for authentication at <span className="text-slate-400">/login</span>.
                    </p>
                  </div>

                  {/* Password & Generator */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-slate-200">
                        Set Password (Min 8 characters) <span className="text-rose-400">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={generatePassword}
                        className="text-[11px] font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <i className="bi bi-lightning-charge-fill"></i>
                        <span>Generate Strong Password</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Password */}
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter password..."
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          minLength={8}
                          className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-3.5 pr-8 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs cursor-pointer"
                        >
                          <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                        </button>
                      </div>

                      {/* Confirm Password */}
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="password_confirmation"
                          placeholder="Confirm password..."
                          value={formData.password_confirmation}
                          onChange={handleInputChange}
                          required
                          minLength={8}
                          className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-3.5 pr-8 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs cursor-pointer"
                        >
                          <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                        </button>
                      </div>
                    </div>

                    {/* Password Strength Meter */}
                    {formData.password && (
                      <div className="flex items-center gap-2 pt-1">
                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden flex gap-1">
                          <div className={`h-full flex-1 ${passwordStrength.score >= 1 ? passwordStrength.color.split(" ")[0] : "bg-transparent"}`}></div>
                          <div className={`h-full flex-1 ${passwordStrength.score >= 2 ? passwordStrength.color.split(" ")[0] : "bg-transparent"}`}></div>
                          <div className={`h-full flex-1 ${passwordStrength.score >= 3 ? passwordStrength.color.split(" ")[0] : "bg-transparent"}`}></div>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${passwordStrength.color.split(" ")[1]}`}>
                          {passwordStrength.text}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* SUBMIT ACTIONS */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <Link
                    to="/admin/users"
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 shadow-xl shadow-sky-500/25 transition cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>Creating User Account...</span>
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check2-circle text-base"></i>
                        <span>Register User &amp; Set Role</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Live Account Preview Card */}
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl sticky top-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-4">
                  <i className="bi bi-eye text-sky-400"></i>
                  Live Account Preview
                </h3>

                {/* Simulated User Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-850 to-slate-950 border border-slate-750/80 shadow-inner space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white font-bold text-base flex items-center justify-center shadow-lg shadow-sky-600/30">
                      {(previewName.substring(0, 2)).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm leading-tight">
                        {previewName}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {formData.email || "username / handle"}
                      </p>
                    </div>
                  </div>

                  {/* Role & Affiliation Tags */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[11px]">System Role:</span>
                      {selectedRoleObj ? (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
                          {selectedRoleObj.userTypeName}
                        </span>
                      ) : (
                        <span className="text-slate-500 italic">Not set</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[11px]">Category:</span>
                      <span className="text-slate-300 font-medium">
                        {isStudentRole ? "Student Account" : "Staff Account"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[11px]">Affiliation:</span>
                      <span className="text-slate-300 font-medium text-right max-w-[140px] truncate">
                        {previewAffiliation}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[11px]">Account Status:</span>
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Help Tips */}
                <div className="mt-5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-2">
                  <p className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <i className="bi bi-shield-check text-sky-400"></i>
                    Admin Governance Guidelines:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-400">
                    <li>Students authenticate with their registration number.</li>
                    <li>Staff authenticate with their assigned email or username.</li>
                    <li>Passwords must have at least 8 characters.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}