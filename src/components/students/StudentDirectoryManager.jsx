// ============================================================================
// StudentDirectoryManager.jsx - Ultra-Modern Admin Student Management Workspace
// ============================================================================

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  User,
  Users,
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
  Shield,
  Download,
  RefreshCw,
  X,
  Check,
  ChevronRight,
  Sparkles,
  Award,
  BookOpen,
  Filter,
  CheckCircle2,
  AlertCircle,
  QrCode,
  CreditCard,
  KeyRound,
  ExternalLink,
  Layers,
  Clock,
} from "lucide-react";
import { studentService } from "../../services/studentService";
import { userService, DEFAULT_STUDENT_PASSWORD } from "../../services/userService";
import api from "../../api/api";
import EditAdmissionModal from "../common/EditAdmissionModal";
import AdmissionStatusModal from "../common/AdmissionStatusModal";

const DISTRICT_LIST = [
  { id: 1, name: "North 24 Parganas" },
  { id: 2, name: "South 24 Parganas" },
  { id: 3, name: "Kolkata" },
  { id: 4, name: "Howrah" },
  { id: 5, name: "Hooghly" },
  { id: 6, name: "Nadia" },
  { id: 7, name: "Murshidabad" },
  { id: 8, name: "Purba Medinipur" },
  { id: 9, name: "Paschim Medinipur" },
  { id: 10, name: "Bardhaman (East)" },
  { id: 11, name: "Bardhaman (West)" },
];

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function StudentDirectoryManager({ embedded = false }) {
  const navigate = useNavigate();

  // Core Data States
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all"); // 'all' | 'male' | 'female' | 'other'
  const [bloodGroupFilter, setBloodGroupFilter] = useState("all");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [accountFilter, setAccountFilter] = useState("all"); // 'all' | 'linked' | 'missing'
  const [sortBy, setSortBy] = useState("id_desc"); // 'id_desc' | 'id_asc' | 'name_asc' | 'name_desc'
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'cards'

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // Modal / Drawer States
  const [viewingStudent, setViewingStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Student Admissions & Course Alteration States
  const [studentAdmissionsHistory, setStudentAdmissionsHistory] = useState(null);
  const [loadingStudentAdmissions, setLoadingStudentAdmissions] = useState(false);
  const [selectedAdmissionForEdit, setSelectedAdmissionForEdit] = useState(null);
  const [isEditAdmissionModalOpen, setIsEditAdmissionModalOpen] = useState(false);
  const [selectedAdmissionForStatus, setSelectedAdmissionForStatus] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  // Fetch previous admissions whenever viewing student changes
  useEffect(() => {
    if (!viewingStudent?.id) {
      setStudentAdmissionsHistory(null);
      return;
    }
    let isMounted = true;
    setLoadingStudentAdmissions(true);
    studentService
      .getPreviousAdmissions(viewingStudent.id)
      .then((res) => {
        if (isMounted && res?.status && res?.data) {
          setStudentAdmissionsHistory(res.data);
        }
      })
      .catch((err) => {
        console.warn("Could not load student admissions for dossier:", err);
      })
      .finally(() => {
        if (isMounted) setLoadingStudentAdmissions(false);
      });
    return () => {
      isMounted = false;
    };
  }, [viewingStudent?.id]);

  const handleOpenEditAdmission = (adm) => {
    const enrichedAdm = {
      ...adm,
      studentId: adm.studentId || viewingStudent?.id,
      student: adm.student || viewingStudent,
    };
    setSelectedAdmissionForEdit(enrichedAdm);
    setIsEditAdmissionModalOpen(true);
  };

  const handleOpenStatusModal = (adm) => {
    setSelectedAdmissionForStatus({
      admissionId: adm.admissionId || adm.id,
      admissionNumber: adm.admissionNumber || adm.admissionNo,
      studentName: viewingStudent?.student_name || viewingStudent?.studentName,
      courseName: adm.course?.courseName || adm.course?.course_name || adm.courseName,
      admissionDate: adm.admissionDate,
      completionDate: adm.completionDate,
      courseStatusId: adm.courseStatusId || adm.courseStatus?.id || 1,
    });
    setIsStatusModalOpen(true);
  };

  const handleAdmissionUpdateSuccess = () => {
    if (viewingStudent?.id) {
      studentService.getPreviousAdmissions(viewingStudent.id).then((res) => {
        if (res?.status && res?.data) {
          setStudentAdmissionsHistory(res.data);
        }
      });
    }
    fetchData(false);
  };

  // Add / Edit Form State
  const initialFormState = {
    student_name: "",
    nickname: "",
    email: "",
    dob: "",
    blood_group: "",
    gender_id: 1,
    whatsapp: "",
    phone1: "",
    phone2: "",
    father_name: "",
    mother_name: "",
    guardian_name: "",
    guardian_relation: "",
    guardian_phone: "",
    address: "Barrackpore",
    city: "Barrackpore",
    pin: "700120",
    district_id: 1,
  };

  const [formData, setFormData] = useState(initialFormState);

  // Load all students and users data
  const fetchData = useCallback(async (showToast = false) => {
    setLoading(true);
    setError(null);
    try {
      const [studentsRes, usersRes] = await Promise.all([
        studentService.getAll(),
        api.get("/users").catch(() => ({ data: { data: [] } })),
      ]);

      const rawStudents =
        studentsRes?.data ||
        (Array.isArray(studentsRes) ? studentsRes : studentsRes?.students || []);
      const safeStudents = Array.isArray(rawStudents) ? rawStudents : [];

      const rawUsers =
        usersRes?.data?.data ||
        (Array.isArray(usersRes?.data) ? usersRes.data : usersRes?.data?.users || []);
      const safeUsers = Array.isArray(rawUsers) ? rawUsers : [];

      setStudents(safeStudents);
      setUsers(safeUsers);

      if (showToast) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `Loaded ${safeStudents.length} students`,
          showConfirmButton: false,
          timer: 2000,
          background: "#0f172a",
          color: "#f8fafc",
        });
      }
    } catch (err) {
      console.error("Failed to load student directory:", err);
      const msg = err.response?.data?.message || err.message || "Failed to load students.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(false);
  }, [fetchData]);

  // Copy helper
  const handleCopy = (text, label, idKey) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(idKey);
    setTimeout(() => setCopiedId(null), 2000);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `${label} copied!`,
      showConfirmButton: false,
      timer: 1500,
      background: "#0f172a",
      color: "#f8fafc",
    });
  };

  // Check if a student has a linked user account
  const getLinkedUser = useCallback(
    (studentId) => {
      if (!studentId) return null;
      return users.find((u) => String(u.student_id || u.studentId) === String(studentId)) || null;
    },
    [users]
  );

  // Statistics KPI computation
  const stats = useMemo(() => {
    const total = students.length;
    let males = 0;
    let females = 0;
    let withWp = 0;
    let linkedAccounts = 0;

    students.forEach((s) => {
      const gId = Number(s.gender_id || s.genderId || 0);
      const gName = (s.gender_name || s.gender || "").toLowerCase();
      if (gId === 2 || gName.includes("female") || gName === "f") {
        females++;
      } else if (gId === 1 || gName.includes("male") || gName === "m") {
        males++;
      }

      if (s.whatsapp && String(s.whatsapp).trim().length >= 10) {
        withWp++;
      }

      if (users.some((u) => String(u.student_id || u.studentId) === String(s.id))) {
        linkedAccounts++;
      }
    });

    return {
      total,
      males,
      females,
      withWp,
      withWpPct: total > 0 ? Math.round((withWp / total) * 100) : 0,
      linkedAccounts,
      missingAccounts: total - linkedAccounts,
    };
  }, [students, users]);

  // Filtered & Sorted Student List
  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const list = students.filter((student) => {
      const name = (student.student_name || student.studentName || "").toLowerCase();
      const nickname = (student.nickname || "").toLowerCase();
      const wp = (student.whatsapp || "").toLowerCase();
      const p1 = (student.phone1 || "").toLowerCase();
      const p2 = (student.phone2 || "").toLowerCase();
      const email = (student.email || "").toLowerCase();
      const regNo = (
        student.registration_number ||
        student.registrationNumber ||
        student.enrollment_number ||
        student.enrollmentNumber ||
        student.reg_no ||
        student.regNo ||
        ""
      ).toLowerCase();
      const id = String(student.id || "").toLowerCase();
      const city = (student.city || "").toLowerCase();
      const address = (student.address || "").toLowerCase();
      const guardian = (student.guardian_name || student.father_name || "").toLowerCase();

      // Search match
      const matchesSearch =
        !query ||
        name.includes(query) ||
        nickname.includes(query) ||
        wp.includes(query) ||
        p1.includes(query) ||
        p2.includes(query) ||
        email.includes(query) ||
        regNo.includes(query) ||
        id.includes(query) ||
        city.includes(query) ||
        address.includes(query) ||
        guardian.includes(query);

      if (!matchesSearch) return false;

      // Gender filter
      if (genderFilter !== "all") {
        const gId = Number(student.gender_id || student.genderId || 0);
        const gName = (student.gender_name || student.gender || "").toLowerCase();
        if (genderFilter === "male" && gId !== 1 && !gName.includes("male")) return false;
        if (genderFilter === "female" && gId !== 2 && !gName.includes("female")) return false;
      }

      // Blood Group filter
      if (bloodGroupFilter !== "all") {
        const bg = (student.blood_group || "").trim().toUpperCase();
        if (bg !== bloodGroupFilter.toUpperCase()) return false;
      }

      // District filter
      if (districtFilter !== "all") {
        const dId = Number(student.district_id || student.districtId || 0);
        if (dId !== Number(districtFilter)) return false;
      }

      // User account status filter
      if (accountFilter !== "all") {
        const hasAccount = users.some(
          (u) => String(u.student_id || u.studentId) === String(student.id)
        );
        if (accountFilter === "linked" && !hasAccount) return false;
        if (accountFilter === "missing" && hasAccount) return false;
      }

      return true;
    });

    // Sorting
    return list.sort((a, b) => {
      if (sortBy === "id_desc") return (b.id || 0) - (a.id || 0);
      if (sortBy === "id_asc") return (a.id || 0) - (b.id || 0);
      if (sortBy === "name_asc") {
        return (a.student_name || "").localeCompare(b.student_name || "");
      }
      if (sortBy === "name_desc") {
        return (b.student_name || "").localeCompare(a.student_name || "");
      }
      return 0;
    });
  }, [
    students,
    users,
    searchTerm,
    genderFilter,
    bloodGroupFilter,
    districtFilter,
    accountFilter,
    sortBy,
  ]);

  // Paginated records
  const totalPages = Math.ceil(filteredStudents.length / pageSize) || 1;
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredStudents.slice(start, start + pageSize);
  }, [filteredStudents, currentPage, pageSize]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, genderFilter, bloodGroupFilter, districtFilter, accountFilter, pageSize, sortBy]);

  // Open Edit Modal
  const handleOpenEdit = (student) => {
    setFormData({
      student_name: student.student_name || student.studentName || "",
      nickname: student.nickname || "",
      email: student.email || "",
      dob: student.dob || "",
      blood_group: student.blood_group || "",
      gender_id: Number(student.gender_id || student.genderId || 1),
      whatsapp: student.whatsapp || "",
      phone1: student.phone1 || "",
      phone2: student.phone2 || "",
      father_name: student.father_name || "",
      mother_name: student.mother_name || "",
      guardian_name: student.guardian_name || "",
      guardian_relation: student.guardian_relation || "",
      guardian_phone: student.guardian_phone || "",
      address: student.address || "Barrackpore",
      city: student.city || "Barrackpore",
      pin: student.pin || "700120",
      district_id: Number(student.district_id || student.districtId || 1),
    });
    setEditingStudent(student);
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setFormData(initialFormState);
    setIsAddModalOpen(true);
  };

  // Save / Update Student
  const handleSaveStudent = async (e) => {
    e.preventDefault();

    if (!formData.student_name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Student Name Required",
        text: "Please enter the student's full name.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    if (!formData.whatsapp || formData.whatsapp.trim().length !== 10) {
      Swal.fire({
        icon: "warning",
        title: "WhatsApp Number Required",
        text: "Please provide a valid 10-digit WhatsApp number.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    // Clean payload
    const cleanPayload = {};
    for (const key in formData) {
      const val = formData[key];
      if (typeof val === "string") {
        cleanPayload[key] = val.trim() === "" ? null : val.trim();
      } else {
        cleanPayload[key] = val;
      }
    }

    if (!cleanPayload.nickname && cleanPayload.student_name) {
      cleanPayload.nickname = cleanPayload.student_name;
    }

    setIsSubmitting(true);
    try {
      if (editingStudent) {
        // Update existing student
        const res = await studentService.update(editingStudent.id, cleanPayload);
        if (res?.status || res?.data) {
          Swal.fire({
            icon: "success",
            title: "Student Updated!",
            text: `Successfully updated record for ${formData.student_name}.`,
            background: "#0f172a",
            color: "#f8fafc",
            confirmButtonColor: "#0284c7",
          });
          setEditingStudent(null);
          await fetchData(false);
        } else {
          throw new Error(res?.message || "Failed to update student.");
        }
      } else {
        // Create new student
        const res = await studentService.create(cleanPayload);
        if (res?.status || res?.data) {
          const createdStudent = res.data?.student || res.data?.data || res.data || {};
          const studentId = createdStudent?.id || createdStudent?.studentId || res.data?.id;

          const regNo =
            createdStudent?.registration_number ||
            createdStudent?.enrollment_number ||
            res.data?.registration_number ||
            formData.whatsapp;

          // Auto-provision student portal account
          if (studentId) {
            await userService
              .createStudentUser(
                {
                  id: studentId,
                  student_name: formData.student_name,
                  email: cleanPayload.email,
                  whatsapp: formData.whatsapp,
                  enrollment_number: regNo,
                },
                DEFAULT_STUDENT_PASSWORD
              )
              .catch((e) => console.warn("Auto-provision error:", e));
          }

          Swal.fire({
            icon: "success",
            title: "Student Registered Successfully!",
            html: `
              <div class="text-left text-xs text-slate-300 space-y-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <p><b>Name:</b> <span class="text-white">${formData.student_name}</span></p>
                <p><b>WhatsApp:</b> <span class="text-emerald-400 font-mono">${formData.whatsapp}</span></p>
                <p><b>Portal Account:</b> <span class="text-sky-400">Created with default password (${DEFAULT_STUDENT_PASSWORD})</span></p>
              </div>
            `,
            showCancelButton: true,
            confirmButtonText: "🎓 Admit to Course",
            cancelButtonText: "Done",
            confirmButtonColor: "#0284c7",
            cancelButtonColor: "#475569",
            background: "#0f172a",
            color: "#f8fafc",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(studentId ? `/admission?studentId=${studentId}` : "/admission");
            }
          });

          setIsAddModalOpen(false);
          await fetchData(false);
        } else {
          throw new Error(res?.message || "Failed to create student.");
        }
      }
    } catch (err) {
      console.error("Save student failed:", err);
      const msg =
        err.response?.data?.message ||
        (err.response?.data?.data
          ? Object.values(err.response.data.data).flat().join(" ")
          : err.message || "Failed to save student.");

      Swal.fire({
        icon: "error",
        title: "Action Failed",
        text: msg,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete student with confirmation
  const handleDeleteStudent = async (student) => {
    const studentName = student.student_name || student.studentName || `Student #${student.id}`;
    const confirm = await Swal.fire({
      title: "Delete Student Record?",
      html: `
        <div class="text-left text-xs text-slate-300 space-y-2 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30">
          <p class="text-rose-300 font-bold">⚠️ Warning: Irreversible Action</p>
          <p>Are you sure you want to delete student: <b class="text-white">${studentName}</b> (ID: #${student.id})?</p>
          <p class="text-slate-400 text-[11px]">This will delete the student profile from the central database.</p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete Record",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#475569",
      background: "#0f172a",
      color: "#f8fafc",
    });

    if (!confirm.isConfirmed) return;

    setLoading(true);
    try {
      await studentService.delete(student.id);
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: `Student ${studentName} was deleted successfully.`,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      await fetchData(false);
    } catch (err) {
      console.error("Delete student failed:", err);
      Swal.fire({
        icon: "error",
        title: "Could Not Delete",
        text:
          err.response?.data?.message ||
          "Student could not be deleted because they may have active course admissions or fee ledger entries.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if admin access is available for student login preview
  const canAdminLoginAsStudent = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      const parsed = raw ? JSON.parse(raw) : null;
      const role = (parsed?.role || parsed?.roleName || parsed?.userTypeName || "").toLowerCase();
      const isAdmin = ["admin", "developer", "owner", "manager", "staff"].some((r) => role.includes(r));
      const isImp = userService.getImpersonationStatus().isImpersonating;
      return isAdmin || isImp;
    } catch {
      return false;
    }
  }, []);

  // Direct Login-As for Admins to view portal as this student
  const handleLoginAsStudent = async (student) => {
    const studentName = student.student_name || student.studentName || `Student #${student.id}`;
    const regNo =
      student.registration_number ||
      student.registrationNumber ||
      student.enrollment_number ||
      student.enrollmentNumber ||
      student.email ||
      `STU-${student.id}`;

    const confirm = await Swal.fire({
      title: `Login as Student?`,
      html: `
        <div class="text-left text-xs text-slate-300 space-y-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-bold text-white text-sm shadow-md">
              ${(studentName || "S").substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div class="font-bold text-white text-sm">${studentName}</div>
              <div class="text-slate-400 text-xs font-mono">${regNo}</div>
            </div>
          </div>
          <div class="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/20 text-sky-200">
            <i class="bi bi-info-circle mr-1"></i> You are switching your active portal session to <b>${studentName}</b>. Your Admin account remains securely saved in backup.
          </div>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, Login as ${studentName.split(" ")[0]}`,
      cancelButtonText: "Cancel",
      confirmButtonColor: "#059669",
      cancelButtonColor: "#334155",
      background: "#0f172a",
      color: "#f8fafc",
    });

    if (!confirm.isConfirmed) return;

    try {
      const targetUser = {
        id: `student_${student.id}`,
        student_id: student.id,
        studentId: student.id,
        name: studentName,
        userName: regNo,
        email: student.email || "",
        role: "Student",
        student: student,
        gender_id: student.gender_id,
        gender: Number(student.gender_id) === 2 ? "Female" : "Male",
      };

      const result = userService.impersonateUser(targetUser);
      if (result?.success) {
        await Swal.fire({
          icon: "success",
          title: "Logged in as Student!",
          text: `Active session switched to ${studentName}. Redirecting...`,
          timer: 1500,
          showConfirmButton: false,
          background: "#0f172a",
          color: "#f8fafc",
        });
        window.location.href = "/profile";
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login As Failed",
        text: err.message || "Could not switch to student account.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  // WhatsApp student details & login credentials sender
  const sendWhatsAppStudent = (student) => {
    const phone = student.whatsapp || student.phone1 || student.phone2;
    if (!phone) {
      Swal.fire({
        icon: "warning",
        title: "Missing WhatsApp Number",
        text: "This student does not have a WhatsApp or mobile number registered.",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    const cleanPhone = phone.startsWith("+") ? phone : "+91" + phone.replace(/[^0-9]/g, "");
    const name = student.student_name || student.studentName || "Student";
    const regNo =
      student.registration_number ||
      student.registrationNumber ||
      student.enrollment_number ||
      student.enrollmentNumber ||
      student.reg_no ||
      student.regNo ||
      (student.id ? `STU-${student.id}` : "STU-2026");

    const message =
`🎓 *CODER & ACCOTAX — STUDENT ADMISSION & PORTAL LOGIN DETAILS* 🎓
🏛️ *Campus:* Barrackpore, Kolkata | 🌐 ${window.location.origin}

Dear *${name}*,
Welcome to *Coder & AccoTax*! Your student profile and learning portal access credentials are provided below:

📋 *STUDENT PROFILE:*
━━━━━━━━━━━━━━━━━━━━━━━
👤 *Student Name:* ${name}
🆔 *Registration / Enrollment No:* *${regNo}*
${student.email ? `📧 *Registered Email:* ${student.email}\n` : ""}${student.dob ? `📅 *Date of Birth:* ${student.dob}\n` : ""}
🔐 *STUDENT PORTAL LOGIN CREDENTIALS:*
━━━━━━━━━━━━━━━━━━━━━━━
🌐 *Portal URL:* ${window.location.origin}/login
👤 *Login Username / ID:* *${regNo}*
🔑 *Initial Password:* *${DEFAULT_STUDENT_PASSWORD}*

✨ *WHAT YOU CAN ACCESS ON YOUR PORTAL:*
• Interactive Chapter Syllabus & Technology Roadmaps
• Online MCQ Question Bank & Mock Tests
• Fee Payment Receipts & Ledger
• Class Attendance & Academic Progress
• Course Completion Certificates

📞 *Academic Faculty & Support:*
Coder & AccoTax, Barrackpore
Contact: +91 98300 00000 | Email: info@coderaccotax.in

We wish you great success in your learning journey!
— *Academic Office, Coder & AccoTax*`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Export to CSV
  const exportStudentsToCSV = () => {
    if (!filteredStudents.length) {
      Swal.fire({
        icon: "info",
        title: "No Data to Export",
        text: "No student records match the active search/filters.",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    const headers = [
      "#ID",
      "Registration / Enrollment No",
      "Student Name",
      "Nickname",
      "Gender",
      "WhatsApp",
      "Primary Phone",
      "Alternate Phone",
      "Email",
      "Date of Birth",
      "Blood Group",
      "Father Name",
      "Mother Name",
      "Guardian Name",
      "Guardian Relation",
      "Guardian Phone",
      "Address",
      "City",
      "PIN",
      "District ID",
      "Portal User Linked",
    ];

    const escapeCell = (val) => {
      const str = String(val ?? "").replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = filteredStudents.map((s) => {
      const regNo =
        s.registration_number ||
        s.registrationNumber ||
        s.enrollment_number ||
        s.enrollmentNumber ||
        "";
      const hasAccount = users.some((u) => String(u.student_id || u.studentId) === String(s.id));
      const gName =
        Number(s.gender_id) === 2 ? "Female" : Number(s.gender_id) === 1 ? "Male" : "Other";

      return [
        s.id,
        regNo,
        s.student_name || s.studentName || "",
        s.nickname || "",
        gName,
        s.whatsapp || "",
        s.phone1 || "",
        s.phone2 || "",
        s.email || "",
        s.dob || "",
        s.blood_group || "",
        s.father_name || "",
        s.mother_name || "",
        s.guardian_name || "",
        s.guardian_relation || "",
        s.guardian_phone || "",
        s.address || "",
        s.city || "",
        s.pin || "",
        s.district_id || "",
        hasAccount ? "Yes (Active)" : "No",
      ];
    });

    const csvContent =
      [headers.map(escapeCell).join(","), ...rows.map((r) => r.map(escapeCell).join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStr = new Date().toISOString().split("T")[0];
    link.href = url;
    link.setAttribute("download", `coder_students_directory_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `Exported ${filteredStudents.length} student records to CSV`,
      showConfirmButton: false,
      timer: 2500,
      background: "#0f172a",
      color: "#f8fafc",
    });
  };

  return (
    <div className={`text-slate-100 ${embedded ? "" : "min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-black p-4 sm:p-6 lg:p-8 pt-20"}`}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* 1. TOP COMMAND HEADER */}
        {!embedded && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-xl shadow-lg shadow-sky-500/20">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                    <span>Students Directory &amp; Governance</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                      Admin Hub
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Comprehensive roster of all enrolled students: view profiles, alter credentials, add students, and link admissions.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={() => fetchData(true)}
                disabled={loading}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold shadow-sm transition active:scale-95 cursor-pointer disabled:opacity-50"
                title="Refresh student records"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-sky-400 ${loading ? "animate-spin" : ""}`} />
                <span>{loading ? "Refreshing..." : "Refresh"}</span>
              </button>

              <button
                type="button"
                onClick={exportStudentsToCSV}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition active:scale-95 cursor-pointer"
                title="Export student directory as CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              <button
                type="button"
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-sky-500/25 transition active:scale-95 cursor-pointer"
                title="Add new student"
              >
                <Plus className="w-4 h-4" />
                <span>Add Student</span>
              </button>

              <Link
                to="/students/student-admission"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white text-xs font-bold shadow-lg shadow-purple-600/25 transition active:scale-95"
                title="Register student with course and payment"
              >
                <BookOpen className="w-4 h-4" />
                <span>Add with Course &amp; Fee</span>
              </Link>
            </div>
          </div>
        )}

        {/* 2. KPI METRIC SUMMARY CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Enrolled Students
              </span>
              <span className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center text-sm">
                👥
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {loading ? "..." : stats.total}
              </span>
              <span className="text-xs text-slate-400">Enrolled</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {stats.males} Male • {stats.females} Female students
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                WhatsApp Reachable
              </span>
              <span className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-sm">
                💬
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                {loading ? "..." : stats.withWp}
              </span>
              <span className="text-xs font-bold text-emerald-400/80">
                ({stats.withWpPct}%)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Direct messaging active</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Portal User Logins
              </span>
              <span className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center text-sm">
                🛡️
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-400">
                {loading ? "..." : stats.linkedAccounts}
              </span>
              <span className="text-xs text-purple-400/80">Active</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {stats.missingAccounts > 0 ? `${stats.missingAccounts} missing portal logins` : "All accounts provisioned"}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Quick Actions
              </span>
              <span className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center text-sm">
                ⚡
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Link
                to="/admission"
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 text-xs font-semibold transition"
              >
                + Admit
              </Link>
              <Link
                to="/payments"
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs font-semibold transition"
              >
                + Fee
              </Link>
              <Link
                to="/certificates/issue"
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-semibold transition"
              >
                + Cert
              </Link>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Admissions, Fees &amp; Certs</p>
          </div>
        </div>

        {/* 3. SEARCH, FILTER & VIEW CONTROLS */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Name, Reg / Enrollment No, WhatsApp, Phone, Email, City..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 shadow-inner"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns & Pills */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            {/* Gender Filter */}
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-500 cursor-pointer"
            >
              <option value="all">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {/* Blood Group Filter */}
            <select
              value={bloodGroupFilter}
              onChange={(e) => setBloodGroupFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-500 cursor-pointer"
            >
              <option value="all">All Blood Groups</option>
              {BLOOD_GROUPS.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>

            {/* Portal Login Filter */}
            <select
              value={accountFilter}
              onChange={(e) => setAccountFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-500 cursor-pointer"
            >
              <option value="all">All Accounts</option>
              <option value="linked">Portal Account Active</option>
              <option value="missing">Missing Login Account</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-500 cursor-pointer"
            >
              <option value="id_desc">Newest First (ID ↓)</option>
              <option value="id_asc">Oldest First (ID ↑)</option>
              <option value="name_asc">Name (A → Z)</option>
              <option value="name_desc">Name (Z → A)</option>
            </select>

            {/* Table / Cards View Toggle */}
            <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 ml-auto lg:ml-0">
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  viewMode === "table" ? "bg-slate-800 text-sky-400 font-bold" : "text-slate-400 hover:text-white"
                }`}
                title="Table layout"
              >
                <i className="bi bi-table"></i>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("cards")}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  viewMode === "cards" ? "bg-slate-800 text-sky-400 font-bold" : "text-slate-400 hover:text-white"
                }`}
                title="Card grid layout"
              >
                <i className="bi bi-grid-fill"></i>
              </button>
            </div>
          </div>
        </div>

        {/* 4. ACTIVE STATUS & FILTER BADGE BAR */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span>
              Showing <strong className="text-white">{filteredStudents.length}</strong> of{" "}
              <strong className="text-white">{students.length}</strong> students
            </span>
            {(searchTerm ||
              genderFilter !== "all" ||
              bloodGroupFilter !== "all" ||
              districtFilter !== "all" ||
              accountFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setGenderFilter("all");
                  setBloodGroupFilter("all");
                  setDistrictFilter("all");
                  setAccountFilter("all");
                }}
                className="text-sky-400 hover:text-sky-300 font-medium underline cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>

          <div className="text-[11px] text-slate-500 hidden sm:flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> Direct WhatsApp
            </span>
            <span className="flex items-center gap-1 text-sky-400">
              <KeyRound className="w-3.5 h-3.5" /> Portal User Sync
            </span>
          </div>
        </div>

        {/* 5. ERROR NOTIFICATION */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={() => fetchData(true)}
              className="px-3 py-1 rounded-lg bg-rose-500 text-white font-semibold cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* 6. LOADING SKELETON */}
        {loading && students.length === 0 && (
          <div className="p-12 text-center bg-slate-900/60 rounded-2xl border border-slate-800/80">
            <div className="inline-block w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm font-semibold text-slate-300">Loading student directory...</p>
            <p className="text-xs text-slate-500">Connecting to secure database</p>
          </div>
        )}

        {/* 7. MAIN DATA DISPLAY: TABLE VIEW */}
        {!loading && viewMode === "table" && (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="p-3.5 w-12 text-center">#ID</th>
                    <th className="p-3.5">Student &amp; Reg No</th>
                    <th className="p-3.5">WhatsApp &amp; Phone</th>
                    <th className="p-3.5">Gender &amp; Blood</th>
                    <th className="p-3.5">Location / Address</th>
                    <th className="p-3.5">Portal Login</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {paginatedStudents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-500 text-sm">
                        <Users className="w-10 h-10 mx-auto mb-2 opacity-30" />
                        No students found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedStudents.map((student, idx) => {
                      const idKey = student.id || idx;
                      const regNo =
                        student.registration_number ||
                        student.registrationNumber ||
                        student.enrollment_number ||
                        student.enrollmentNumber ||
                        student.reg_no ||
                        student.regNo ||
                        `STU-${student.id}`;

                      const gId = Number(student.gender_id || student.genderId || 1);
                      const isFemale = gId === 2;
                      const linkedUser = getLinkedUser(student.id);

                      return (
                        <tr
                          key={idKey}
                          className="hover:bg-slate-800/50 transition-colors group"
                        >
                          <td className="p-3.5 text-center text-slate-500 font-mono text-[11px]">
                            #{student.id}
                          </td>

                          <td className="p-3.5">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center text-white shadow-sm flex-shrink-0 ${
                                  isFemale
                                    ? "bg-gradient-to-tr from-rose-500 to-pink-600"
                                    : "bg-gradient-to-tr from-sky-500 to-indigo-600"
                                }`}
                              >
                                {(student.student_name || "S").substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-bold text-white text-sm group-hover:text-sky-300 transition-colors flex items-center gap-1.5">
                                  <span>{student.student_name || student.studentName || "N/A"}</span>
                                  {student.nickname && student.nickname !== student.student_name && (
                                    <span className="text-[10px] text-slate-400 font-normal">
                                      ({student.nickname})
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="px-1.5 py-0.2 rounded font-mono text-[10px] font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30">
                                    {regNo}
                                  </span>
                                  {student.email && (
                                    <span className="text-[10px] text-slate-400 truncate max-w-[140px]" title={student.email}>
                                      {student.email}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="p-3.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-emerald-400 font-semibold">
                                {student.whatsapp || "—"}
                              </span>
                              {student.whatsapp && (
                                <button
                                  type="button"
                                  onClick={() => handleCopy(student.whatsapp, "WhatsApp", `wp-${idKey}`)}
                                  className="text-slate-500 hover:text-slate-200 transition cursor-pointer"
                                  title="Copy WhatsApp"
                                >
                                  <i className={`bi ${copiedId === `wp-${idKey}` ? "bi-check2 text-emerald-400" : "bi-clipboard"} text-xs`}></i>
                                </button>
                              )}
                            </div>
                            {student.phone1 && student.phone1 !== student.whatsapp && (
                              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                                Alt: {student.phone1}
                              </div>
                            )}
                          </td>

                          <td className="p-3.5">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                                  isFemale
                                    ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                                    : "bg-sky-500/15 text-sky-300 border-sky-500/30"
                                }`}
                              >
                                {isFemale ? "Female" : "Male"}
                              </span>
                              {student.blood_group && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-950/60 text-rose-400 border border-rose-800">
                                  {student.blood_group}
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="p-3.5">
                            <div className="text-xs text-slate-300 truncate max-w-[150px]">
                              {student.city || student.address || "Barrackpore"}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {student.pin ? `PIN: ${student.pin}` : "North 24 Parganas"}
                            </div>
                          </td>

                          <td className="p-3.5">
                            {linkedUser ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                <Check className="w-3 h-3 text-emerald-400" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
                                Unlinked
                              </span>
                            )}
                          </td>

                          <td className="p-3.5 text-right">
                            <div className="inline-flex items-center gap-1">
                              {/* View Details Modal */}
                              <button
                                type="button"
                                onClick={() => setViewingStudent(student)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 transition cursor-pointer"
                                title="View full student dossier"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {/* Edit / Alter Student */}
                              <button
                                type="button"
                                onClick={() => handleOpenEdit(student)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition cursor-pointer"
                                title="Alter / Edit Student Details"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {/* WhatsApp Message */}
                              <button
                                type="button"
                                onClick={() => sendWhatsAppStudent(student)}
                                className="p-1.5 rounded-lg bg-emerald-600/80 hover:bg-emerald-500 text-white transition cursor-pointer"
                                title="Send WhatsApp advice / greeting"
                              >
                                <i className="bi bi-whatsapp text-xs"></i>
                              </button>

                              {/* Direct Login as Student (Admin Only) */}
                              {canAdminLoginAsStudent && (
                                <button
                                  type="button"
                                  onClick={() => handleLoginAsStudent(student)}
                                  className="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 transition cursor-pointer"
                                  title={`Login as ${student.student_name} (Student Session)`}
                                >
                                  <i className="bi bi-box-arrow-in-right text-xs"></i>
                                </button>
                              )}

                              {/* Admit to Course */}
                              <Link
                                to={`/admission?studentId=${student.id}`}
                                className="p-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-500 text-white transition"
                                title="Course Admission"
                              >
                                <BookOpen className="w-3.5 h-3.5" />
                              </Link>

                              {/* Delete Student */}
                              <button
                                type="button"
                                onClick={() => handleDeleteStudent(student)}
                                className="p-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/80 text-rose-400 hover:text-white border border-rose-500/30 transition cursor-pointer"
                                title="Delete student record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {filteredStudents.length > 0 && (
              <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span>Show per page:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-sky-500"
                  >
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span>
                    Page <strong className="text-white">{currentPage}</strong> of{" "}
                    <strong className="text-white">{totalPages}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:hover:bg-slate-800 cursor-pointer text-xs"
                  >
                    Previous
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-7 h-7 rounded-lg text-xs font-semibold cursor-pointer ${
                          currentPage === pageNum
                            ? "bg-sky-500 text-white"
                            : "bg-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:hover:bg-slate-800 cursor-pointer text-xs"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 8. CARD GRID VIEW */}
        {!loading && viewMode === "cards" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedStudents.length === 0 ? (
                <div className="col-span-full py-16 text-center text-slate-500 text-sm bg-slate-900/60 rounded-2xl border border-slate-800">
                  <Users className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  No students found matching your criteria.
                </div>
              ) : (
                paginatedStudents.map((student, idx) => {
                  const idKey = student.id || idx;
                  const regNo =
                    student.registration_number ||
                    student.enrollment_number ||
                    `STU-${student.id}`;
                  const gId = Number(student.gender_id || 1);
                  const isFemale = gId === 2;

                  return (
                    <div
                      key={idKey}
                      className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 shadow-xl transition space-y-3 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl font-bold text-sm flex items-center justify-center text-white shadow-sm ${
                                isFemale
                                  ? "bg-gradient-to-tr from-rose-500 to-pink-600"
                                  : "bg-gradient-to-tr from-sky-500 to-indigo-600"
                              }`}
                            >
                              {(student.student_name || "S").substring(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-bold text-white text-sm truncate">
                                {student.student_name || student.studentName}
                              </h3>
                              <p className="text-[11px] text-slate-400 truncate">
                                {student.email || "No email"}
                              </p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 flex-shrink-0">
                            #{student.id}
                          </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Enrollment / Reg:</span>
                            <span className="font-mono font-semibold text-sky-300 text-[11px]">
                              {regNo}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">WhatsApp:</span>
                            <span className="font-mono font-semibold text-emerald-400">
                              {student.whatsapp || "—"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Gender / Blood:</span>
                            <span className="text-slate-300">
                              {isFemale ? "Female" : "Male"} {student.blood_group ? `• ${student.blood_group}` : ""}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Location:</span>
                            <span className="text-slate-300 truncate max-w-[140px]">
                              {student.city || student.address || "Barrackpore"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between gap-1.5 border-t border-slate-800/80">
                        <button
                          type="button"
                          onClick={() => setViewingStudent(student)}
                          className="flex-1 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEdit(student)}
                          className="flex-1 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Alter</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => sendWhatsAppStudent(student)}
                          className="p-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer"
                          title="WhatsApp"
                        >
                          <i className="bi bi-whatsapp text-sm"></i>
                        </button>

                        {/* Direct Login as Student (Admin Only) */}
                        {canAdminLoginAsStudent && (
                          <button
                            type="button"
                            onClick={() => handleLoginAsStudent(student)}
                            className="p-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 transition cursor-pointer"
                            title={`Login as ${student.student_name} (Student Session)`}
                          >
                            <i className="bi bi-box-arrow-in-right text-sm"></i>
                          </button>
                        )}

                        <Link
                          to={`/admission?studentId=${student.id}`}
                          className="p-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition"
                          title="Admit to Course"
                        >
                          <BookOpen className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination for cards */}
            {filteredStudents.length > pageSize && (
              <div className="mt-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 9. VIEW STUDENT DOSSIER MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {viewingStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 bg-slate-950/80 border-b border-slate-800 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl font-bold text-lg flex items-center justify-center text-white shadow-md ${
                      Number(viewingStudent.gender_id) === 2
                        ? "bg-gradient-to-tr from-rose-500 to-pink-600"
                        : "bg-gradient-to-tr from-sky-500 to-indigo-600"
                    }`}
                  >
                    {(viewingStudent.student_name || "S").substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>{viewingStudent.student_name || viewingStudent.studentName}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                        #{viewingStudent.id}
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400">
                      Enrollment: <strong className="font-mono text-sky-300">{viewingStudent.registration_number || viewingStudent.enrollment_number || "—"}</strong>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setViewingStudent(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
                {/* Contact & Bio Card */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                  <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-4 h-4" /> Personal &amp; Communication Details
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <p className="text-slate-500 text-[10px]">Gender</p>
                      <p className="font-semibold text-white">
                        {Number(viewingStudent.gender_id) === 2 ? "Female" : "Male"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px]">Date of Birth</p>
                      <p className="font-semibold text-white">{viewingStudent.dob || "—"}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px]">Blood Group</p>
                      <p className="font-semibold text-rose-400 font-mono">
                        {viewingStudent.blood_group || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px]">WhatsApp Number</p>
                      <p className="font-mono font-bold text-emerald-400">
                        {viewingStudent.whatsapp || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px]">Alternate Phone</p>
                      <p className="font-mono text-slate-300">
                        {viewingStudent.phone1 || viewingStudent.phone2 || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px]">Email Address</p>
                      <p className="text-slate-300 truncate" title={viewingStudent.email}>
                        {viewingStudent.email || "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Family & Guardian Card */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                  <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-4 h-4" /> Parents &amp; Guardian Information
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <p className="text-slate-500 text-[10px]">Father's Name</p>
                      <p className="font-semibold text-white">{viewingStudent.father_name || "—"}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px]">Mother's Name</p>
                      <p className="font-semibold text-white">{viewingStudent.mother_name || "—"}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px]">Guardian Name &amp; Relation</p>
                      <p className="font-semibold text-white">
                        {viewingStudent.guardian_name || "—"}{" "}
                        {viewingStudent.guardian_relation ? `(${viewingStudent.guardian_relation})` : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px]">Guardian Phone</p>
                      <p className="font-mono text-slate-300">{viewingStudent.guardian_phone || "—"}</p>
                    </div>
                  </div>
                </div>

                {/* Residential Address Card */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> Address &amp; Jurisdiction
                  </h3>
                  <p className="text-slate-200">
                    {viewingStudent.address || "Barrackpore"}, {viewingStudent.city || "Barrackpore"} -{" "}
                    <span className="font-mono font-bold text-amber-300">{viewingStudent.pin || "700120"}</span>
                  </p>
                </div>

                {/* Enrolled Academic Courses & Course Admissions History Card */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-sky-500/30 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-sky-400" />
                      <span>Enrolled Courses &amp; Admissions ({studentAdmissionsHistory?.admissions?.length || 0})</span>
                    </h3>
                    <Link
                      to={`/admission?studentId=${viewingStudent.id}`}
                      className="text-[11px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Admit to Another Course</span>
                    </Link>
                  </div>

                  {loadingStudentAdmissions ? (
                    <div className="py-6 text-center space-y-2">
                      <RefreshCw className="w-5 h-5 animate-spin text-sky-400 mx-auto" />
                      <p className="text-[11px] text-slate-400 font-semibold">Loading student's enrolled courses...</p>
                    </div>
                  ) : studentAdmissionsHistory?.hasPreviousAdmissions && studentAdmissionsHistory?.admissions?.length > 0 ? (
                    <div className="space-y-3">
                      {studentAdmissionsHistory.admissions.map((adm, idx) => {
                        const course = adm.course || {};
                        const fin = adm.financials || {};
                        const statusId = Number(adm.courseStatus?.id || adm.courseStatusId || 1);
                        const statusName = adm.courseStatus?.statusName || (adm.completionDate ? "Completed" : "Ongoing");
                        const feeModeName = adm.feeMode?.feeModesName || (adm.feeModesId === 2 ? "Course Fees (Lump Sum)" : "Monthly Plan");

                        return (
                          <div
                            key={adm.admissionId || idx}
                            className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition space-y-2.5 shadow-md"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                                  {course.courseCode ? course.courseCode.substring(0, 3) : "CRS"}
                                </span>
                                <span className="font-bold text-white text-sm">
                                  {course.courseName || "Academic Course"}
                                </span>
                                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                                  [{course.courseCode}]
                                </span>
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                    statusId === 2 || statusName === "Completed"
                                      ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                                      : statusId === 3 || statusName === "Incomplete"
                                      ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                                      : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                  }`}
                                >
                                  {statusName}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 self-end sm:self-center">
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditAdmission(adm)}
                                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition cursor-pointer flex items-center gap-1 shadow-sm active:scale-95"
                                  title="Alter / Edit Course, Fees, Fee Mode, Admission Date or Status"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Edit Admission</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleOpenStatusModal(adm)}
                                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 transition cursor-pointer flex items-center gap-1 shadow-sm active:scale-95"
                                  title="Update Status / Assign Closing Date"
                                >
                                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                                  <span>Status</span>
                                </button>
                              </div>
                            </div>

                            {/* Financial and Schedule details */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-0.5">
                              <div>
                                <span className="text-slate-500 block text-[10px]">Agreed Fee &amp; Mode</span>
                                <span className="font-bold text-emerald-400 font-mono">
                                  ₹{Number(adm.courseFees || course.courseFees || 0).toLocaleString()}
                                </span>
                                <span className="text-[10px] text-slate-400 block truncate">({feeModeName})</span>
                              </div>

                              <div>
                                <span className="text-slate-500 block text-[10px]">Admission Date</span>
                                <span className="font-mono text-slate-200">
                                  {adm.admissionDate ? new Date(adm.admissionDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                                </span>
                              </div>

                              <div>
                                <span className="text-slate-500 block text-[10px]">Total Paid to Date</span>
                                <span className="font-mono font-bold text-emerald-400">
                                  ₹{Number(fin.totalPaid || 0).toLocaleString()}
                                </span>
                              </div>

                              <div>
                                <span className="text-slate-500 block text-[10px]">Outstanding Balance</span>
                                <span className={`font-mono font-bold ${Number(fin.balanceDue || 0) > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                                  ₹{Number(fin.balanceDue || 0).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center space-y-1.5">
                      <p className="text-slate-400 text-xs">This student does not have any active or saved course admissions yet.</p>
                      <Link
                        to={`/admission?studentId=${viewingStudent.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs transition shadow-sm mt-1"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Admit to Course Now</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => sendWhatsAppStudent(viewingStudent)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition cursor-pointer"
                  >
                    <i className="bi bi-whatsapp"></i>
                    <span>WhatsApp</span>
                  </button>

                  <Link
                    to={`/admission?studentId=${viewingStudent.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Admit to Course</span>
                  </Link>

                  <Link
                    to={`/student-course-qr?studentId=${viewingStudent.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 font-semibold text-xs transition"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Course QR</span>
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const s = viewingStudent;
                      setViewingStudent(null);
                      handleOpenEdit(s);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Alter Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewingStudent(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 10. ADD / ALTER (EDIT) STUDENT MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {(isAddModalOpen || editingStudent) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Form Header */}
              <div className="p-6 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    {editingStudent ? <Edit3 className="w-5 h-5 text-amber-400" /> : <Plus className="w-5 h-5 text-sky-400" />}
                    <span>{editingStudent ? `Alter Student #${editingStudent.id}` : "Add New Student"}</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    {editingStudent
                      ? "Update central records for this student. Changes propagate across modules."
                      : "Create a new student entry in the institutional database with auto-provisioned login."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingStudent(null);
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSaveStudent} className="p-6 overflow-y-auto space-y-5 text-xs">
                
                {/* 1. PRIMARY IDENTITY */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> Primary Identity
                    </span>
                    <span className="text-[10px] text-amber-400 font-semibold">* Required Fields</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Student Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.student_name}
                        onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Nickname / Alias</label>
                      <input
                        type="text"
                        value={formData.nickname}
                        onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                        placeholder="e.g. Rahul"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        WhatsApp Number (10 digits) <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={formData.whatsapp}
                        onChange={(e) =>
                          setFormData({ ...formData, whatsapp: e.target.value.replace(/\D/g, "") })
                        }
                        placeholder="e.g. 9830012345"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-mono font-bold placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Gender <span className="text-rose-400">*</span>
                      </label>
                      <select
                        value={formData.gender_id}
                        onChange={(e) => setFormData({ ...formData, gender_id: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                      >
                        <option value={1}>Male</option>
                        <option value={2}>Female</option>
                        <option value={3}>Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 2. COMMUNICATION & BIO */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> Contact &amp; Physical Information
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="student@example.com"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Blood Group</label>
                      <select
                        value={formData.blood_group}
                        onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                      >
                        <option value="">Select Blood Group</option>
                        {BLOOD_GROUPS.map((bg) => (
                          <option key={bg} value={bg}>
                            {bg}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Primary Phone</label>
                      <input
                        type="tel"
                        value={formData.phone1}
                        onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                        placeholder="Alternative mobile"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Emergency Phone</label>
                      <input
                        type="tel"
                        value={formData.phone2}
                        onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                        placeholder="Emergency contact"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. PARENTS & GUARDIAN */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> Parents &amp; Guardian Info
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Father's Name</label>
                      <input
                        type="text"
                        value={formData.father_name}
                        onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                        placeholder="Father's full name"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Mother's Name</label>
                      <input
                        type="text"
                        value={formData.mother_name}
                        onChange={(e) => setFormData({ ...formData, mother_name: e.target.value })}
                        placeholder="Mother's full name"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Guardian Name</label>
                      <input
                        type="text"
                        value={formData.guardian_name}
                        onChange={(e) => setFormData({ ...formData, guardian_name: e.target.value })}
                        placeholder="Guardian if applicable"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Guardian Relation</label>
                      <input
                        type="text"
                        value={formData.guardian_relation}
                        onChange={(e) => setFormData({ ...formData, guardian_relation: e.target.value })}
                        placeholder="e.g. Uncle / Aunt / Sister"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. ADDRESS */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Address &amp; Location
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-3">
                      <label className="block text-slate-300 font-semibold mb-1">Street Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="e.g. 14, S.N. Banerjee Road, Barrackpore"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">City / Town</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Barrackpore"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">PIN Code</label>
                      <input
                        type="text"
                        value={formData.pin}
                        onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                        placeholder="700120"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">District</label>
                      <select
                        value={formData.district_id}
                        onChange={(e) => setFormData({ ...formData, district_id: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                      >
                        {DISTRICT_LIST.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Form Action Buttons */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setEditingStudent(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-sky-500/25 transition active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : editingStudent ? "Save Changes" : "Register Student"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Course Status & Closing Date Modal */}
      <AdmissionStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => {
          setIsStatusModalOpen(false);
          setSelectedAdmissionForStatus(null);
        }}
        admission={selectedAdmissionForStatus}
        onSuccess={handleAdmissionUpdateSuccess}
      />

      {/* Edit / Alter Admission Details Modal */}
      <EditAdmissionModal
        isOpen={isEditAdmissionModalOpen}
        onClose={() => {
          setIsEditAdmissionModalOpen(false);
          setSelectedAdmissionForEdit(null);
        }}
        admission={selectedAdmissionForEdit}
        onSuccess={handleAdmissionUpdateSuccess}
      />
    </div>
  );
}
