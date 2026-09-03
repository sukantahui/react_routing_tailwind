// ============================================================================
// UserManagement.jsx - Ultra-Modern Admin User & Role Governance Portal
// ============================================================================

import React, { useState, useEffect, useMemo } from "react";
import api from "../api/api";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [students, setStudents] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("all");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    user_type_id: "",
    employee_id: "",
    student_id: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // Fetch initial data (users, employees, students, user-types)
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersRes, employeesRes, studentsRes, rolesRes] = await Promise.all([
        api.get("/users"),
        api.get("/employees"),
        api.get("/students"),
        api.get("/user-types"),
      ]);

      if (usersRes?.data?.status) {
        setUsers(usersRes.data.data || []);
      }
      if (employeesRes?.data?.status) {
        setEmployees(employeesRes.data.data || []);
      }
      if (studentsRes?.data?.status || Array.isArray(studentsRes?.data)) {
        const studentList = studentsRes?.data?.data || studentsRes?.data || [];
        setStudents(Array.isArray(studentList) ? studentList : []);
      }
      if (rolesRes?.data?.status) {
        setUserTypes(rolesRes.data.data || []);
      }
    } catch (err) {
      console.error("Failed to load user management data:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load user governance data. Ensure you have Admin privileges."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Check if current selected role is Student
  const selectedRoleObj = useMemo(() => {
    return userTypes.find((t) => String(t.userTypeId) === String(formData.user_type_id));
  }, [userTypes, formData.user_type_id]);

  const isStudentRole = useMemo(() => {
    return (selectedRoleObj?.userTypeName || "").trim().toLowerCase() === "student";
  }, [selectedRoleObj]);

  // Handle Role selection
  const handleRoleChange = (e) => {
    const roleId = e.target.value;
    const roleObj = userTypes.find((t) => String(t.userTypeId) === String(roleId));
    const isStudent = (roleObj?.userTypeName || "").trim().toLowerCase() === "student";

    setFormData((prev) => ({
      ...prev,
      user_type_id: roleId,
      // Clear previous linkage when switching role types
      employee_id: isStudent ? "" : prev.employee_id,
      student_id: isStudent ? prev.student_id : "",
      email: "",
    }));
  };

  // Handle Employee selection
  const handleEmployeeChange = (e) => {
    const empId = e.target.value;
    const selectedEmp = employees.find((emp) => String(emp.employeeId) === String(empId));

    setFormData((prev) => ({
      ...prev,
      employee_id: empId,
      student_id: "",
      email: selectedEmp?.email || selectedEmp?.employeeName?.toLowerCase().replace(/\s+/g, "") || prev.email,
    }));
  };

  // Handle Student selection
  const handleStudentChange = (e) => {
    const sId = e.target.value;
    const selectedStudent = students.find((s) => String(s.id) === String(sId));

    setFormData((prev) => ({
      ...prev,
      student_id: sId,
      employee_id: "",
      email: selectedStudent?.registration_number || selectedStudent?.email || prev.email,
    }));
  };

  // Handle standard input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new user
  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!formData.user_type_id) {
      Swal.fire({
        icon: "warning",
        title: "Role Required",
        text: "Please assign a system role for this user.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    if (isStudentRole && !formData.student_id) {
      Swal.fire({
        icon: "warning",
        title: "Student Profile Required",
        text: "Please select an enrolled student to link to this account.",
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
        text: "Please select an employee to link to this staff account.",
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
        text: "Please specify a username or email for logging in.",
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
        text: "Password and Confirm Password do not match.",
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
          title: "User Created!",
          text: `User account [${formData.email}] with role [${selectedRoleObj?.userTypeName}] was created successfully.`,
          background: "#0f172a",
          color: "#f8fafc",
          iconColor: "#38bdf8",
          confirmButtonColor: "#0284c7",
        });

        // Reset form & close modal
        setFormData({
          user_type_id: "",
          employee_id: "",
          student_id: "",
          email: "",
          password: "",
          password_confirmation: "",
        });
        setIsModalOpen(false);
        // Refresh users list
        fetchData();
      } else {
        throw new Error(res?.data?.message || "Failed to create user.");
      }
    } catch (err) {
      console.error("Create user failed:", err);
      const msg =
        err.response?.data?.message ||
        (err.response?.data?.errors
          ? Object.values(err.response.data.errors).flat().join(" ")
          : "Could not create user account.");

      Swal.fire({
        icon: "error",
        title: "Creation Failed",
        text: msg,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Filtered Users computation
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = searchTerm.toLowerCase();
      const matchSearch =
        (u.name || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q) ||
        (u.userName || "").toLowerCase().includes(q) ||
        (u.department || "").toLowerCase().includes(q) ||
        (u.role || "").toLowerCase().includes(q);

      const matchRole =
        selectedRoleFilter === "all" ||
        (u.role || "").toLowerCase() === selectedRoleFilter.toLowerCase();

      return matchSearch && matchRole;
    });
  }, [users, searchTerm, selectedRoleFilter]);

  // Role pill styles helper
  const getRoleBadge = (roleName) => {
    const role = (roleName || "").toLowerCase();
    if (role === "admin" || role === "developer" || role === "owner") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
          <i className="bi bi-shield-check text-purple-400"></i>
          {roleName}
        </span>
      );
    }
    if (role === "student") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <i className="bi bi-mortarboard text-emerald-400"></i>
          {roleName}
        </span>
      );
    }
    if (role === "teacher") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
          <i className="bi bi-person-video3 text-amber-400"></i>
          {roleName}
        </span>
      );
    }
    if (role.includes("manager")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
          <i className="bi bi-briefcase-fill text-sky-400"></i>
          {roleName}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-300 border border-slate-500/30">
        <i className="bi bi-person-fill text-slate-400"></i>
        {roleName}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Background glow accents */}
      <div className="fixed w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[140px] -top-32 -left-20 pointer-events-none" />
      <div className="fixed w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[140px] top-1/3 -right-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Top Header Card */}
        <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-3">
              <i className="bi bi-shield-lock-fill"></i>
              <span>ADMIN ACCESS ONLY • ROLE GOVERNANCE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              User Accounts &amp; Role Governance
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Provision student portals, faculty logins, and administrative role tiers with route-level security.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/80 transition cursor-pointer"
              title="Refresh users"
            >
              <i className={`bi bi-arrow-clockwise ${loading ? "animate-spin" : ""}`}></i>
              <span>Refresh</span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 shadow-lg shadow-sky-500/25 transition-all duration-200 cursor-pointer"
            >
              <i className="bi bi-person-plus-fill text-sm"></i>
              <span>Add New User</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <i className="bi bi-people-fill text-lg"></i>
            </div>
            <div>
              <p className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Total Users</p>
              <p className="text-xl font-bold text-white">{users.length}</p>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <i className="bi bi-mortarboard text-lg"></i>
            </div>
            <div>
              <p className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Students</p>
              <p className="text-xl font-bold text-white">
                {users.filter((u) => (u.role || "").toLowerCase() === "student").length}
              </p>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <i className="bi bi-person-video3 text-lg"></i>
            </div>
            <div>
              <p className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Teachers</p>
              <p className="text-xl font-bold text-white">
                {users.filter((u) => (u.role || "").toLowerCase() === "teacher").length}
              </p>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <i className="bi bi-shield-check text-lg"></i>
            </div>
            <div>
              <p className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Admins &amp; Mgrs</p>
              <p className="text-xl font-bold text-white">
                {users.filter((u) => ["admin", "developer", "owner", "manager"].some((r) => (u.role || "").toLowerCase().includes(r))).length}
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
            <input
              type="text"
              placeholder="Search user by name, email, username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value)}
              className="w-full sm:w-auto bg-slate-950/80 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500 cursor-pointer"
            >
              <option value="all">All Roles ({users.length})</option>
              {userTypes.map((t) => (
                <option key={t.userTypeId} value={t.userTypeName}>
                  {t.userTypeName}
                </option>
              ))}
            </select>

            {(searchTerm || selectedRoleFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedRoleFilter("all");
                }}
                className="text-xs text-slate-400 hover:text-white px-2.5 py-2 hover:bg-slate-800 rounded-lg transition"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="p-12 text-center text-slate-400">
              <svg className="animate-spin h-8 w-8 text-sky-400 mx-auto mb-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <p className="text-sm">Loading user directory...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-rose-400">
              <i className="bi bi-exclamation-triangle text-2xl mb-2 block"></i>
              <p className="text-sm font-semibold">{error}</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <i className="bi bi-people text-3xl mb-2 block"></i>
              <p className="text-sm">No users matched your search criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-950/70 border-b border-slate-800 text-[11px] uppercase font-semibold text-slate-400 tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">#ID</th>
                    <th className="py-3.5 px-4">User &amp; Email</th>
                    <th className="py-3.5 px-4">Login Handle</th>
                    <th className="py-3.5 px-4">Assigned Role</th>
                    <th className="py-3.5 px-4">Affiliation &amp; Category</th>
                    <th className="py-3.5 px-4">Mobile</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-slate-400 text-xs">#{u.id}</td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-inner">
                            {(u.name || u.userName || "U").substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-white text-xs sm:text-sm">{u.name || "N/A"}</div>
                            <div className="text-[11px] text-slate-400">{u.email || "No email"}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-300 text-xs">{u.userName}</td>

                      <td className="py-3.5 px-4">{getRoleBadge(u.role)}</td>

                      <td className="py-3.5 px-4">
                        <div className="text-xs text-slate-300">{u.department || "General"}</div>
                        <div className="text-[11px] text-slate-500">{u.designation || (u.studentId ? "Student" : "Staff")}</div>
                      </td>

                      <td className="py-3.5 px-4 text-xs font-mono text-slate-400">{u.mobile || "—"}</td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Provision New User Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/40">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <i className="bi bi-person-plus text-sky-400"></i>
                    Provision New User Account
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Assign role authority and generate portal login credentials.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                >
                  <i className="bi bi-x-lg text-sm"></i>
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleCreateUser} className="p-6 space-y-4">
                {/* 1. SELECT ROLE FIRST */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    1. Select Authority Role <span className="text-rose-400">*</span>
                  </label>
                  <select
                    name="user_type_id"
                    value={formData.user_type_id}
                    onChange={handleRoleChange}
                    required
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                  >
                    <option value="">-- Choose User Role (e.g. Student, Teacher, Admin) --</option>
                    {userTypes.map((t) => (
                      <option key={t.userTypeId} value={t.userTypeId}>
                        {t.userTypeName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. DYNAMIC ASSOCIATION (Student vs Employee) */}
                {formData.user_type_id ? (
                  isStudentRole ? (
                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 mb-1.5 flex items-center gap-1.5">
                        <i className="bi bi-mortarboard"></i>
                        <span>2. Link to Enrolled Student</span> <span className="text-rose-400">*</span>
                      </label>
                      <select
                        name="student_id"
                        value={formData.student_id}
                        onChange={handleStudentChange}
                        required
                        className="w-full bg-slate-950 border border-emerald-500/50 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
                      >
                        <option value="">-- Choose Enrolled Student ({students.length} available) --</option>
                        {students.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.student_name} • {s.registration_number || `ID: #${s.id}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-semibold text-sky-400 mb-1.5 flex items-center gap-1.5">
                        <i className="bi bi-briefcase"></i>
                        <span>2. Link to Staff / Employee</span> <span className="text-rose-400">*</span>
                      </label>
                      <select
                        name="employee_id"
                        value={formData.employee_id}
                        onChange={handleEmployeeChange}
                        required
                        className="w-full bg-slate-950 border border-sky-500/50 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-400 cursor-pointer"
                      >
                        <option value="">-- Choose Employee ({employees.length} available) --</option>
                        {employees.map((emp) => (
                          <option key={emp.employeeId} value={emp.employeeId}>
                            {emp.employeeName} ({emp.department?.name || "Staff"} • {emp.designation?.name || "General"})
                          </option>
                        ))}
                      </select>
                    </div>
                  )
                ) : (
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-dashed border-slate-800 text-center text-xs text-slate-500">
                    Select a role above to choose an associated Student or Employee record.
                  </div>
                )}

                {/* 3. Login Identifier */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    3. Login Username / Handle <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder={isStudentRole ? "e.g. CNAT-00001-2627 or student@domain.com" : "e.g. username or staff@domain.com"}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    {isStudentRole
                      ? "Students can sign in using their registration number or email."
                      : "Staff can sign in using their username or official email."}
                  </span>
                </div>

                {/* 4. Password & Confirmation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Password (min 8 chars) <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength={8}
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-3.5 pr-8 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs cursor-pointer"
                      >
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Confirm Password <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password_confirmation"
                      placeholder="••••••••"
                      value={formData.password_confirmation}
                      onChange={handleInputChange}
                      required
                      minLength={8}
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Submit buttons */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 shadow-lg shadow-sky-500/20 transition cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>Provisioning...</span>
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check2-circle"></i>
                        <span>Create User &amp; Role</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;