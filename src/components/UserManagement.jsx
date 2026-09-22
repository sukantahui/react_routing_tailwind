// ============================================================================
// UserManagement.jsx - Ultra-Modern Admin User & Role Governance Portal
// ============================================================================

import React, { useState, useEffect, useMemo } from "react";
import api from "../api/api";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { userService, DEFAULT_STUDENT_PASSWORD } from "../services/userService";

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

  // Grouping and View states
  const [activeGroupTab, setActiveGroupTab] = useState("grouped"); // "grouped" | "staff" | "students" | "flat"
  const [isStudentGroupOpen, setIsStudentGroupOpen] = useState(false); // default collapsed so list is simple
  const [studentPage, setStudentPage] = useState(1);
  const [studentPageSize, setStudentPageSize] = useState(10);

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

      const rawUsers =
        usersRes?.data?.data ||
        (Array.isArray(usersRes?.data) ? usersRes.data : usersRes?.data?.users || []);
      const rawEmployees =
        employeesRes?.data?.data ||
        (Array.isArray(employeesRes?.data) ? employeesRes.data : employeesRes?.data?.employees || []);
      const rawStudents =
        studentsRes?.data?.data ||
        (Array.isArray(studentsRes?.data) ? studentsRes.data : studentsRes?.data?.students || []);
      const rawRoles =
        rolesRes?.data?.data ||
        (Array.isArray(rolesRes?.data) ? rolesRes.data : rolesRes?.data?.userTypes || []);

      const safeUsers = Array.isArray(rawUsers) ? rawUsers : [];
      const safeEmployees = Array.isArray(rawEmployees) ? rawEmployees : [];
      const safeStudents = Array.isArray(rawStudents) ? rawStudents : [];
      const safeRoles = Array.isArray(rawRoles) ? rawRoles : [];

      setEmployees(safeEmployees);
      setStudents(safeStudents);
      setUserTypes(safeRoles);

      // Deeply enrich user objects with associated student, employee, and role data
      const enrichedUsers = safeUsers.map((u) => {
        const studentId = u.student_id || u.studentId;
        const employeeId = u.employee_id || u.employeeId;
        const roleId = u.user_type_id || u.userTypeId;

        const stu = studentId
          ? safeStudents.find((s) => String(s.id) === String(studentId))
          : null;

        const emp = employeeId
          ? safeEmployees.find((e) => String(e.employeeId || e.id) === String(employeeId))
          : null;

        const roleObj = safeRoles.find(
          (r) => String(r.userTypeId || r.id) === String(roleId)
        );

        const roleName =
          u.role ||
          u.roleName ||
          u.userTypeName ||
          roleObj?.userTypeName ||
          (stu ? "Student" : emp ? "Staff" : "User");

        const fullName =
          u.name ||
          stu?.student_name ||
          stu?.studentName ||
          emp?.employeeName ||
          (stu ? `Student #${stu.id}` : emp ? `Staff #${emp.employeeId}` : u.email || "User");

        const loginHandle =
          u.userName ||
          u.user_name ||
          stu?.registration_number ||
          stu?.registrationNumber ||
          stu?.enrollment_number ||
          u.email;

        const mobileNo =
          u.mobile ||
          u.phone ||
          stu?.whatsapp ||
          stu?.phone1 ||
          emp?.phone ||
          emp?.mobile ||
          "—";

        const departmentName =
          u.department ||
          emp?.department?.name ||
          (stu ? "Student Community" : "General");

        const designationName =
          u.designation ||
          emp?.designation?.name ||
          (stu ? "Enrolled Student" : "Staff");

        return {
          ...u,
          name: fullName,
          userName: loginHandle,
          role: roleName,
          mobile: mobileNo,
          department: departmentName,
          designation: designationName,
          student: stu || u.student,
          employee: emp || u.employee,
          userType: roleObj || u.userType,
        };
      });

      setUsers(enrichedUsers);
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

  // Enrolled students who don't have a linked portal user account yet
  const unlinkedStudents = useMemo(() => {
    return students.filter(
      (s) => !users.some((u) => String(u.student_id || u.studentId) === String(s.id))
    );
  }, [students, users]);

  // Batch auto-provision all unlinked students
  const handleProvisionAllMissing = async () => {
    if (unlinkedStudents.length === 0) return;
    const confirm = await Swal.fire({
      title: "Provision Student Accounts?",
      html: `
        <div class="text-left text-xs text-slate-300 space-y-2 p-3 rounded-lg bg-slate-950 border border-slate-800">
          <p>This will generate portal login accounts for <b>${unlinkedStudents.length}</b> enrolled student(s).</p>
          <p>• <b>Username:</b> Student Enrollment / Reg Number</p>
          <p>• <b>Role:</b> Student</p>
          <p>• <b>Default Password:</b> <span class="font-mono text-amber-300">${DEFAULT_STUDENT_PASSWORD}</span></p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, Auto-Provision (${unlinkedStudents.length})`,
      cancelButtonText: "Cancel",
      background: "#0f172a",
      color: "#f8fafc",
      confirmButtonColor: "#0284c7",
      cancelButtonColor: "#475569",
    });

    if (!confirm.isConfirmed) return;

    setLoading(true);
    try {
      const results = await userService.provisionMissingStudentAccounts(unlinkedStudents, users);
      const successful = results.filter((r) => r.success).length;
      Swal.fire({
        icon: "success",
        title: "Provisioning Complete!",
        text: `Successfully provisioned ${successful} of ${unlinkedStudents.length} student account(s).`,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      await fetchData();
    } catch (err) {
      console.error("Batch provisioning error:", err);
      Swal.fire({
        icon: "error",
        title: "Provisioning Failed",
        text: err.message,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if current selected role is Student
  const selectedRoleObj = useMemo(() => {
    return userTypes.find((t) => String(t.userTypeId) === String(formData.user_type_id));
  }, [userTypes, formData.user_type_id]);

  const selectedStudentObj = useMemo(() => {
    return students.find((s) => String(s.id) === String(formData.student_id));
  }, [students, formData.student_id]);

  const selectedEmployeeObj = useMemo(() => {
    return employees.find((e) => String(e.employeeId || e.id) === String(formData.employee_id));
  }, [employees, formData.employee_id]);

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
      password: isStudent ? "India2day@2026" : (prev.password || ""),
      password_confirmation: isStudent ? "India2day@2026" : (prev.password_confirmation || ""),
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

    const enrollmentNo =
      selectedStudent?.enrollment_number ||
      selectedStudent?.enrollmentNumber ||
      selectedStudent?.enrollment_no ||
      selectedStudent?.enrollmentNo ||
      selectedStudent?.registration_number ||
      selectedStudent?.registrationNumber ||
      selectedStudent?.reg_no ||
      selectedStudent?.regNo ||
      selectedStudent?.email ||
      "";

    setFormData((prev) => ({
      ...prev,
      student_id: sId,
      employee_id: "",
      email: enrollmentNo || prev.email,
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
      const resolvedName = isStudentRole
        ? (selectedStudentObj?.student_name || formData.email.trim())
        : (selectedEmployeeObj?.employeeName || formData.email.trim());

      const payload = {
        name: resolvedName,
        user_name: formData.email.trim(),
        userName: formData.email.trim(),
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

  // Distinguish Student accounts vs Staff / System accounts
  const isStudentUser = (u) => {
    return (
      (u.role || "").toLowerCase() === "student" ||
      Boolean(u.student_id || u.studentId || u.student)
    );
  };

  const staffUsers = useMemo(() => {
    return filteredUsers.filter((u) => !isStudentUser(u));
  }, [filteredUsers]);

  const studentUsers = useMemo(() => {
    return filteredUsers.filter((u) => isStudentUser(u));
  }, [filteredUsers]);

  // Paginated students for the student group table
  const totalStudentPages = Math.ceil(studentUsers.length / studentPageSize) || 1;
  const paginatedStudents = useMemo(() => {
    const start = (studentPage - 1) * studentPageSize;
    return studentUsers.slice(start, start + studentPageSize);
  }, [studentUsers, studentPage, studentPageSize]);

  // Auto-expand student group if user is searching and matches are found
  useEffect(() => {
    if (searchTerm.trim().length > 0 && studentUsers.length > 0) {
      setIsStudentGroupOpen(true);
    }
  }, [searchTerm, studentUsers.length]);

  // Auto-expand if role filter is set to Student
  useEffect(() => {
    if (selectedRoleFilter.toLowerCase() === "student") {
      setIsStudentGroupOpen(true);
    }
  }, [selectedRoleFilter]);

  // Reset student page on search or filter change
  useEffect(() => {
    setStudentPage(1);
  }, [searchTerm, selectedRoleFilter, studentPageSize]);

  // Clipboard copy helper with feedback
  const handleCopy = (text, label = "Item") => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `${label} copied!`,
      showConfirmButton: false,
      timer: 1800,
      background: "#0f172a",
      color: "#f8fafc",
    });
  };

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

  // Reusable Table Header
  const renderTableHeader = () => (
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
  );

  // Reusable Table Row
  const renderUserRow = (u, isStudentRow = false) => {
    const isStu = isStudentRow || isStudentUser(u);
    return (
      <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
        <td className="py-3.5 px-4 font-mono text-slate-400 text-xs">#{u.id}</td>

        <td className="py-3.5 px-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shadow-inner text-white ${
                isStu
                  ? "bg-gradient-to-tr from-emerald-600 to-teal-500"
                  : "bg-gradient-to-tr from-sky-600 to-indigo-600"
              }`}
            >
              {(u.name || u.userName || "U").substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2">
                <span>{u.name || "N/A"}</span>
                {isStu && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                    Student
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span>{u.email || "No email"}</span>
                {u.email && (
                  <button
                    type="button"
                    onClick={() => handleCopy(u.email, "Email")}
                    title="Copy Email"
                    className="hover:text-sky-400 transition cursor-pointer text-[10px]"
                  >
                    <i className="bi bi-clipboard"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </td>

        <td className="py-3.5 px-4">
          <div className="inline-flex items-center gap-1.5 font-mono text-slate-300 text-xs bg-slate-950/80 px-2 py-1 rounded-md border border-slate-800">
            <span>{u.userName || u.user_name || u.email}</span>
            <button
              type="button"
              onClick={() => handleCopy(u.userName || u.user_name || u.email, "Username / Login Handle")}
              title="Copy Login Handle"
              className="text-slate-500 hover:text-sky-400 transition cursor-pointer"
            >
              <i className="bi bi-copy text-[10px]"></i>
            </button>
          </div>
        </td>

        <td className="py-3.5 px-4">{getRoleBadge(u.role)}</td>

        <td className="py-3.5 px-4">
          <div className="text-xs text-slate-300">{u.department || (isStu ? "Enrolled Student" : "General")}</div>
          <div className="text-[11px] text-slate-500">
            {u.designation || (isStu ? "Student Community" : "Staff")}
          </div>
        </td>

        <td className="py-3.5 px-4 text-xs font-mono text-slate-400">
          {u.mobile && u.mobile !== "—" ? (
            <span className="flex items-center gap-1">
              <i className="bi bi-telephone text-[10px] text-slate-500"></i>
              {u.mobile}
            </span>
          ) : (
            "—"
          )}
        </td>

        <td className="py-3.5 px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Active
          </span>
        </td>
      </tr>
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

        {/* Quick Stats Grid (Clickable Category Filters) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => {
              setActiveGroupTab("grouped");
              setSelectedRoleFilter("all");
            }}
            className={`text-left bg-slate-900/50 border rounded-xl p-4 flex items-center gap-4 transition cursor-pointer hover:border-sky-500/40 hover:bg-slate-900/80 ${
              activeGroupTab === "grouped" ? "border-sky-500/40 ring-1 ring-sky-500/20" : "border-slate-800/80"
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <i className="bi bi-people-fill text-lg"></i>
            </div>
            <div>
              <p className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Total Users</p>
              <p className="text-xl font-bold text-white">{users.length}</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveGroupTab("students");
              setIsStudentGroupOpen(true);
            }}
            className={`text-left bg-slate-900/50 border rounded-xl p-4 flex items-center gap-4 transition cursor-pointer hover:border-emerald-500/40 hover:bg-slate-900/80 ${
              activeGroupTab === "students" ? "border-emerald-500/40 ring-1 ring-emerald-500/20" : "border-slate-800/80"
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <i className="bi bi-mortarboard text-lg"></i>
            </div>
            <div>
              <p className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Students Group</p>
              <p className="text-xl font-bold text-emerald-400">
                {users.filter((u) => isStudentUser(u)).length}
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveGroupTab("staff");
              setSelectedRoleFilter("Teacher");
            }}
            className="text-left bg-slate-900/50 border border-slate-800/80 hover:border-amber-500/40 hover:bg-slate-900/80 rounded-xl p-4 flex items-center gap-4 transition cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <i className="bi bi-person-video3 text-lg"></i>
            </div>
            <div>
              <p className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Teachers</p>
              <p className="text-xl font-bold text-white">
                {users.filter((u) => (u.role || "").toLowerCase() === "teacher").length}
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveGroupTab("staff");
              setSelectedRoleFilter("all");
            }}
            className={`text-left bg-slate-900/50 border rounded-xl p-4 flex items-center gap-4 transition cursor-pointer hover:border-purple-500/40 hover:bg-slate-900/80 ${
              activeGroupTab === "staff" ? "border-purple-500/40 ring-1 ring-purple-500/20" : "border-slate-800/80"
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <i className="bi bi-shield-check text-lg"></i>
            </div>
            <div>
              <p className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Staff &amp; Admins</p>
              <p className="text-xl font-bold text-white">
                {users.filter((u) => !isStudentUser(u)).length}
              </p>
            </div>
          </button>
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
                className="text-xs text-slate-400 hover:text-white px-2.5 py-2 hover:bg-slate-800 rounded-lg transition cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Unlinked Students Alert Banner (if any enrolled students lack a login account) */}
        {unlinkedStudents.length > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-lg">
            <div className="flex items-center gap-2.5 text-amber-300">
              <i className="bi bi-person-exclamation text-lg flex-shrink-0"></i>
              <div>
                <span className="font-bold">{unlinkedStudents.length} enrolled student(s)</span> do not have a portal login account yet.
                <div className="text-[11px] text-amber-200/70">
                  They can be auto-provisioned with their enrollment number and default password <span className="font-mono text-amber-300">India2day@2026</span>.
                </div>
              </div>
            </div>
            <button
              onClick={handleProvisionAllMissing}
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition cursor-pointer shadow-md flex-shrink-0 disabled:opacity-50"
            >
              <i className="bi bi-magic"></i>
              <span>Auto-Provision All ({unlinkedStudents.length})</span>
            </button>
          </div>
        )}

        {/* Navigation Tabs for Categories & Groups */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/40 p-2 rounded-2xl border border-slate-800/80">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveGroupTab("grouped")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeGroupTab === "grouped"
                  ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20"
                  : "bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/60"
              }`}
            >
              <i className="bi bi-collection-fill"></i>
              <span>Grouped Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveGroupTab("staff")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeGroupTab === "staff"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/60"
              }`}
            >
              <i className="bi bi-shield-lock-fill"></i>
              <span>Staff &amp; System Users ({staffUsers.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveGroupTab("students");
                setIsStudentGroupOpen(true);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeGroupTab === "students"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20"
                  : "bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/60"
              }`}
            >
              <i className="bi bi-mortarboard-fill"></i>
              <span>Students Group ({studentUsers.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveGroupTab("flat")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeGroupTab === "flat"
                  ? "bg-slate-700 text-white shadow-md"
                  : "bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/60"
              }`}
            >
              <i className="bi bi-list-ul"></i>
              <span>Flat List ({filteredUsers.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2 justify-end text-xs text-slate-400 px-2">
            <span>Current View:</span>
            <span className="font-semibold text-white">
              {activeGroupTab === "staff"
                ? `${staffUsers.length} Staff Users`
                : activeGroupTab === "students"
                ? `${studentUsers.length} Students`
                : `${staffUsers.length} Staff + ${studentUsers.length} Grouped Students`}
            </span>
          </div>
        </div>

        {/* Main Content Area based on View Tab & Grouping */}
        {loading ? (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-12 text-center text-slate-400 shadow-xl">
            <svg className="animate-spin h-8 w-8 text-sky-400 mx-auto mb-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <p className="text-sm">Loading user directory...</p>
          </div>
        ) : error ? (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 text-center text-rose-400 shadow-xl">
            <i className="bi bi-exclamation-triangle text-2xl mb-2 block"></i>
            <p className="text-sm font-semibold">{error}</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-12 text-center text-slate-500 shadow-xl">
            <i className="bi bi-people text-3xl mb-2 block"></i>
            <p className="text-sm">No users matched your search criteria.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 1. FLAT LIST VIEW (If user specifically chooses flat list) */}
            {activeGroupTab === "flat" && (
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-white">All Users Flat Directory ({filteredUsers.length})</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    {renderTableHeader()}
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredUsers.map((u) => renderUserRow(u))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2. STAFF & SYSTEM USERS TABLE (Shown in 'grouped' and 'staff' views) */}
            {(activeGroupTab === "grouped" || activeGroupTab === "staff") && (
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 sm:p-5 bg-slate-950/50 border-b border-slate-800/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                      <i className="bi bi-shield-lock-fill text-base"></i>
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        Staff &amp; System Administration Accounts
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                          {staffUsers.length} Users
                        </span>
                      </h2>
                      <p className="text-[11px] text-slate-400">
                        Administrators, teachers, department managers, and staff accounts.
                      </p>
                    </div>
                  </div>
                </div>

                {staffUsers.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    <i className="bi bi-people text-2xl mb-1.5 block text-slate-600"></i>
                    No staff or administrative users match the filter.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      {renderTableHeader()}
                      <tbody className="divide-y divide-slate-800/60">
                        {staffUsers.map((u) => renderUserRow(u, false))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* 3. ENROLLED STUDENTS GROUP ACCORDION (Shown in 'grouped' and 'students' views) */}
            {(activeGroupTab === "grouped" || activeGroupTab === "students") && (
              <div className="bg-slate-900/70 border border-emerald-500/30 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
                {/* Group Header (Interactive) */}
                <div
                  onClick={() => setIsStudentGroupOpen((prev) => !prev)}
                  className="p-5 sm:p-6 bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-slate-950/80 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-emerald-500/20 hover:bg-emerald-950/50 transition"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/10 flex-shrink-0">
                      <i className="bi bi-mortarboard-fill text-2xl"></i>
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                          Enrolled Students Group
                        </h2>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          <i className="bi bi-people-fill text-[11px]"></i>
                          {studentUsers.length} Student Accounts
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Consolidated student accounts • Username is Enrollment Number
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto justify-between md:justify-end">
                    {/* Default Password Quick-Copy pill */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(DEFAULT_STUDENT_PASSWORD, "Default student password");
                      }}
                      title="Click to copy default student password"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-950 border border-emerald-500/30 text-emerald-300 hover:border-emerald-400 hover:bg-emerald-950/40 transition cursor-pointer shadow-sm"
                    >
                      <i className="bi bi-key-fill text-emerald-400 text-xs"></i>
                      <span className="text-[11px] text-slate-400 font-sans">Default Pwd:</span>
                      <span className="font-semibold">{DEFAULT_STUDENT_PASSWORD}</span>
                      <i className="bi bi-clipboard text-[10px] text-slate-400 hover:text-white ml-0.5"></i>
                    </div>

                    {/* Expand / Collapse Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsStudentGroupOpen((prev) => !prev);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition cursor-pointer shadow-sm"
                    >
                      <span>{isStudentGroupOpen ? "Collapse Group" : `Expand Group (${studentUsers.length})`}</span>
                      <i className={`bi bi-chevron-${isStudentGroupOpen ? "up" : "down"} text-xs transition-transform duration-200`}></i>
                    </button>
                  </div>
                </div>

                {/* Collapsed State Preview Teaser */}
                {!isStudentGroupOpen && (
                  <div
                    onClick={() => setIsStudentGroupOpen(true)}
                    className="px-6 py-3.5 bg-slate-950/40 flex items-center justify-between gap-4 text-xs text-slate-400 cursor-pointer hover:text-slate-300 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2 overflow-hidden">
                        {studentUsers.slice(0, 5).map((s) => (
                          <div
                            key={s.id}
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 bg-emerald-700 text-[10px] font-bold text-white flex items-center justify-center"
                          >
                            {(s.name || "S").substring(0, 1).toUpperCase()}
                          </div>
                        ))}
                      </div>
                      <span>
                        {studentUsers.length > 5
                          ? `+ ${studentUsers.length - 5} other enrolled students grouped here`
                          : `${studentUsers.length} enrolled students grouped`}
                        {" — "}
                        <span className="text-emerald-400 underline decoration-emerald-500/40">
                          Click to expand and view student logins
                        </span>
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 hidden sm:inline">
                      Main list kept clean &amp; simple
                    </span>
                  </div>
                )}

                {/* Expanded State: Students Table + Pagination */}
                <AnimatePresence>
                  {isStudentGroupOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {studentUsers.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 text-xs">
                          <i className="bi bi-mortarboard text-3xl mb-2 block text-slate-600"></i>
                          No student accounts match your filter or search.
                        </div>
                      ) : (
                        <div>
                          {/* Student Toolbar */}
                          <div className="px-5 py-3 bg-slate-950/60 border-b border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400">
                            <div>
                              Showing <span className="font-semibold text-white">{(studentPage - 1) * studentPageSize + 1}</span> to{" "}
                              <span className="font-semibold text-white">
                                {Math.min(studentPage * studentPageSize, studentUsers.length)}
                              </span>{" "}
                              of <span className="font-semibold text-emerald-400">{studentUsers.length}</span> students
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1.5">
                                <span>Per page:</span>
                                <select
                                  value={studentPageSize}
                                  onChange={(e) => setStudentPageSize(Number(e.target.value))}
                                  className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 cursor-pointer"
                                >
                                  <option value={10}>10</option>
                                  <option value={25}>25</option>
                                  <option value={50}>50</option>
                                  <option value={100}>100</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Table */}
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs sm:text-sm">
                              {renderTableHeader()}
                              <tbody className="divide-y divide-slate-800/60">
                                {paginatedStudents.map((u) => renderUserRow(u, true))}
                              </tbody>
                            </table>
                          </div>

                          {/* Pagination Footer */}
                          {totalStudentPages > 1 && (
                            <div className="px-5 py-3.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between gap-2">
                              <button
                                type="button"
                                onClick={() => setStudentPage((p) => Math.max(1, p - 1))}
                                disabled={studentPage === 1}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-750 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                              >
                                <i className="bi bi-chevron-left mr-1"></i> Prev
                              </button>

                              <div className="flex items-center gap-1 text-xs text-slate-400">
                                <span>Page</span>
                                <span className="font-bold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                                  {studentPage}
                                </span>
                                <span>of {totalStudentPages}</span>
                              </div>

                              <button
                                type="button"
                                onClick={() => setStudentPage((p) => Math.min(totalStudentPages, p + 1))}
                                disabled={studentPage === totalStudentPages}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-750 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                              >
                                Next <i className="bi bi-chevron-right ml-1"></i>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
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
                            {s.student_name} • {s.enrollment_number || s.enrollmentNumber || s.registration_number || s.registrationNumber || `ID: #${s.id}`}
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
                    {isStudentRole ? "3. Username / Enrollment Number (saved in users table email field)" : "3. Login Username / Handle"} <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder={isStudentRole ? "e.g. Enrollment / Reg No (e.g. CNAT-00001-2627)" : "e.g. username or staff@domain.com"}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    {isStudentRole
                      ? "Enrollment number is saved into the users 'email' column and used for student login."
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