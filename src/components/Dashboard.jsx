// src/components/Dashboard.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { visitorService } from "../services/visitorService";
import { studentService } from "../services/studentService";
import { admissionService } from "../services/admissionService";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [students, setStudents] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for updating student profile later
  const [editingStudent, setEditingStudent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [savingStudent, setSavingStudent] = useState(false);
  const [editForm, setEditForm] = useState({
    student_name: "",
    whatsapp: "",
    phone1: "",
    email: "",
    dob: "",
    blood_group: "",
    father_name: "",
    mother_name: "",
    guardian_phone: "",
    address: "",
    city: "",
    pin: "",
  });

  const openEditModal = (student) => {
    setEditingStudent(student);
    setEditForm({
      student_name: student.student_name || student.studentName || "",
      whatsapp: student.whatsapp || "",
      phone1: student.phone1 || "",
      email: student.email || "",
      dob: student.dob ? student.dob.split("T")[0] : "",
      blood_group: student.blood_group || student.bloodGroup || "",
      father_name: student.father_name || student.fatherName || "",
      mother_name: student.mother_name || student.motherName || "",
      guardian_phone: student.guardian_phone || student.guardianPhone || "",
      address: student.address || "",
      city: student.city || "",
      pin: student.pin || "",
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveStudent = async (e) => {
    e.preventDefault();
    if (!editingStudent?.id) return;

    setSavingStudent(true);
    try {
      const res = await studentService.update(editingStudent.id, editForm);
      const updated = res?.data || res;

      // Update state in-place
      setStudents((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? { ...s, ...editForm, ...updated } : s))
      );

      Swal.fire({
        icon: "success",
        title: "Student Profile Updated!",
        text: `${editForm.student_name}'s profile has been updated successfully.`,
        confirmButtonColor: "#2563eb",
        background: "#111827",
        color: "#f9fafb",
      });

      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Failed to update student:", err);
      let errorMsg = err.response?.data?.message || "Failed to update student profile.";
      if (err.response?.data?.errors) {
        errorMsg = Object.values(err.response.data.errors).flat().join("<br>");
      }
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        html: `<div style="text-align:left;font-size:12px">${errorMsg}</div>`,
        background: "#111827",
        color: "#f9fafb",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setSavingStudent(false);
    }
  };

  // ✅ Load all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!storedUser || !token) {
          Swal.fire({
            title: "Session Expired",
            text: "Please log in again.",
            icon: "warning",
            confirmButtonColor: "#2563eb",
            background: "#111827",
            color: "#f9fafb",
          }).then(() => navigate("/login"));
          return;
        }

        setUser(storedUser);

        // Fetch visitors and students independently with fallback
        try {
          const vRes = await visitorService.getAll();
          if (vRes?.status && Array.isArray(vRes.data)) {
            setVisitors(vRes.data);
          }
        } catch (err) {
          console.warn("Visitors could not be loaded:", err);
        }

        try {
          const sRes = await studentService.getAll();
          const sList = sRes?.data || (Array.isArray(sRes) ? sRes : []);
          if (Array.isArray(sList)) {
            setStudents(sList);
          }
        } catch (err) {
          console.error("Students could not be loaded:", err);
        }

        try {
          const admRes = await admissionService.getAll();
          const admList = admRes?.data || (Array.isArray(admRes) ? admRes : []);
          if (Array.isArray(admList)) {
            setAdmissions(admList);
          }
        } catch (err) {
          console.warn("Admissions could not be loaded:", err);
        }
      } catch {
        Swal.fire({
          title: "Error",
          text: "Failed to load dashboard data.",
          icon: "error",
          confirmButtonColor: "#2563eb",
          background: "#111827",
          color: "#f9fafb",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  // Helper to extract enrolled course names for a student
  const getStudentCourses = (student) => {
    // 1. Check direct attached courses array
    if (Array.isArray(student.courses) && student.courses.length > 0) {
      return student.courses
        .map((c) => c.courseName || c.course_name || c.name || "Course")
        .filter(Boolean);
    }
    // 2. Check direct attached admissions array
    if (Array.isArray(student.admissions) && student.admissions.length > 0) {
      return student.admissions
        .map((adm) => adm.courseName || adm.course_name || adm.course?.courseName || adm.course?.course_name || "Course")
        .filter(Boolean);
    }
    // 3. Fallback: match from admissions state by studentId
    const stuId = String(student.id || student.studentId || student.student_id || "");
    if (stuId && admissions.length > 0) {
      const matched = admissions.filter((adm) => {
        const admStuId = String(
          adm.student_id || adm.studentId || adm.student?.id || adm.student?.student_id || adm.student?.studentId || ""
        );
        return admStuId === stuId;
      });
      if (matched.length > 0) {
        return matched
          .map((adm) => adm.courseName || adm.course_name || adm.course?.courseName || adm.course?.course_name || adm.courseTitle || "Course")
          .filter(Boolean);
      }
    }
    return [];
  };

  // ✅ Derived visitor stats
  const stats = useMemo(() => {
    const total = visitors.length;
    const today = visitors.filter((v) => {
      const rawDate = v.createdAt || v.created_at;
      const date = rawDate ? new Date(rawDate) : null;
      const now = new Date();
      return (
        date &&
        !isNaN(date) &&
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }).length;

    const month = visitors.filter((v) => {
      const rawDate = v.createdAt || v.created_at;
      const date = rawDate ? new Date(rawDate) : null;
      const now = new Date();
      return (
        date &&
        !isNaN(date) &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }).length;

    const uniquePages = new Set(visitors.map((v) => v.pageUrl || v.page_url).filter(Boolean)).size;

    return { total, today, month, uniquePages };
  }, [visitors]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-400">
        Fetching Dashboard Data...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 p-6 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <h1 className="text-3xl font-bold text-sky-400">
            Welcome, {user?.name || user?.userName}
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            {user?.role || user?.userType?.userTypeName} Dashboard
          </p>
        </motion.div>

        {/* Event Quick Access Banner: Bijoya 2026 Guest Management */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-600/20 border border-amber-500/30 p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/30 flex-shrink-0">
              🌸
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-amber-100">
                  Maitri Mahotsav 2026 • Bijoya Guest Portal
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Admin Active
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Manage attendee passes, perform admin edits, delete registrations, and broadcast WhatsApp invitation & custom messages.
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/bijoya")}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition cursor-pointer whitespace-nowrap"
          >
            <i className="bi bi-people-fill"></i>
            <span>Manage Guests & Passes</span>
            <i className="bi bi-arrow-right"></i>
          </motion.button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          <StatCard title="Total Visitors" value={stats.total} icon="👥" color="text-sky-400" />
          <StatCard title="Today’s Visitors" value={stats.today} icon="☀️" color="text-emerald-400" />
          <StatCard title="This Month" value={stats.month} icon="🗓️" color="text-purple-400" />
          <StatCard title="Unique Pages" value={stats.uniquePages} icon="🌐" color="text-pink-400" />
          <StatCard title="Total Students" value={students.length} icon="🎓" color="text-amber-400" />
        </motion.div>

        {/* 5-Pillar Academic Operations Pipeline Hub */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-5 shadow-2xl space-y-4"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-1">
                <i className="bi bi-diagram-3-fill"></i>
                ACADEMIC OPERATIONS PIPELINE
              </div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Unified 5-Step Academic Workflow</span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-xl">
              Seamlessly execute student lifecycle from onboarding to official diploma certification & verification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Step 1: Register */}
            <div
              onClick={() => navigate("/students/add")}
              className="p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 hover:border-sky-500/50 transition cursor-pointer group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 font-bold text-xs flex items-center justify-center border border-sky-500/30">
                  1
                </span>
                <i className="bi bi-people text-sky-400 text-lg group-hover:scale-110 transition-transform"></i>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition">
                  1. Student Registration
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                  Add student personal & contact records to directory.
                </p>
              </div>
              <div className="text-[10px] font-semibold text-sky-400 flex items-center gap-1">
                <span>Open Directory</span>
                <i className="bi bi-arrow-right"></i>
              </div>
            </div>

            {/* Step 2: Course Admission */}
            <div
              onClick={() => navigate("/admission")}
              className="p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/50 transition cursor-pointer group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center border border-blue-500/30">
                  2
                </span>
                <i className="bi bi-mortarboard text-blue-400 text-lg group-hover:scale-110 transition-transform"></i>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition">
                  2. Course Admission
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                  Assign curriculum, fee structure & official enrollment.
                </p>
              </div>
              <div className="text-[10px] font-semibold text-blue-400 flex items-center gap-1">
                <span>Assign Course</span>
                <i className="bi bi-arrow-right"></i>
              </div>
            </div>

            {/* Step 3: Fee Payments */}
            <div
              onClick={() => navigate("/payments")}
              className="p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/50 transition cursor-pointer group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
                  3
                </span>
                <i className="bi bi-receipt-cutoff text-emerald-400 text-lg group-hover:scale-110 transition-transform"></i>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition">
                  3. Fees & Receipts
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                  Record payments, print vouchers, dues & ledger.
                </p>
              </div>
              <div className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                <span>Fee Counter</span>
                <i className="bi bi-arrow-right"></i>
              </div>
            </div>

            {/* Step 4: Results */}
            <div
              onClick={() => navigate("/results")}
              className="p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/50 transition cursor-pointer group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center border border-indigo-500/30">
                  4
                </span>
                <i className="bi bi-bar-chart-steps text-indigo-400 text-lg group-hover:scale-110 transition-transform"></i>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition">
                  4. Exam Results
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                  Enter theory & practical scores, grade & evaluation.
                </p>
              </div>
              <div className="text-[10px] font-semibold text-indigo-400 flex items-center gap-1">
                <span>Record Marks</span>
                <i className="bi bi-arrow-right"></i>
              </div>
            </div>

            {/* Step 5: Certificates */}
            <div
              onClick={() => navigate("/admin/certificates")}
              className="p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/50 transition cursor-pointer group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/30">
                  5
                </span>
                <i className="bi bi-award text-amber-400 text-lg group-hover:scale-110 transition-transform"></i>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                  5. Certificate Master
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                  Issue, audit, export & print original diplomas.
                </p>
              </div>
              <div className="text-[10px] font-semibold text-amber-400 flex items-center gap-1">
                <span>Certificates Register</span>
                <i className="bi bi-arrow-right"></i>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Visitors Section */}
        <DataTable
          title="Recent Visitors"
          color="text-sky-400"
          data={visitors}
          headers={["#", "Name", "Email", "Interest", "Device", "Page URL", "Date"]}
          renderRow={(v, i) => (
            <>
              <td className="p-3">{i + 1}</td>
              <td className="p-3 font-medium text-sky-300">{v.name}</td>
              <td className="p-3">{v.email}</td>
              <td className="p-3">{v.interest}</td>
              <td className="p-3 hidden md:table-cell">{v.deviceType || v.device_type || "—"}</td>
              <td className="p-3 hidden lg:table-cell truncate max-w-[220px]">{v.pageUrl || v.page_url || "—"}</td>
              <td className="p-3 text-gray-400">
                {v.createdAt || v.created_at ? new Date(v.createdAt || v.created_at).toLocaleString() : "—"}
              </td>
            </>
          )}
        />

        {/* Students Section */}
        <div className="flex items-center justify-between mb-2 mt-12">
          <h2 className="text-2xl font-semibold text-amber-400">Registered Students</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/admission")}
              className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl shadow-lg shadow-sky-600/25 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ring-1 ring-white/10"
              title="Assign academic course to an existing student (Official Admission)"
            >
              <i className="bi bi-mortarboard-fill text-sky-200"></i>
              <span>Assign Course (Admit)</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/students/student-admission")}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white px-4 py-2 rounded-xl shadow-md text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>⚡ Fast Enroll Student</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/payments")}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl shadow-md text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="View all student fee receipts & payments"
            >
              <i className="bi bi-receipt-cutoff text-emerald-400"></i>
              <span>Fee Payments</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/students/add")}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              + Full Registration
            </motion.button>
          </div>
        </div>
        <DataTable
          title="Registered Students"
          color="text-amber-400"
          data={students}
          headers={["#", "Reg No", "Name", "Enrolled Courses", "WhatsApp", "Phone", "City", "Joined", "Academic Actions"]}
          renderRow={(s, i) => {
            const enrolledCourses = getStudentCourses(s);
            const stuId = s.id || s.studentId || s.student_id;
            return (
              <>
                <td className="p-3">{i + 1}</td>
                <td className="p-3 font-medium text-amber-300">
                  {s.registration_number || s.registrationNumber || "—"}
                </td>
                <td className="p-3 font-semibold text-white">
                  {s.student_name || s.studentName || "—"}
                </td>
                <td className="p-3">
                  {enrolledCourses.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 max-w-xs">
                      {enrolledCourses.map((cName, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-sm inline-flex items-center gap-1"
                        >
                          <i className="bi bi-mortarboard text-[10px] text-sky-400"></i>
                          <span>{cName}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-500 italic flex items-center gap-1">
                      <span>Not Enrolled</span>
                    </span>
                  )}
                </td>
                <td className="p-3 font-mono text-emerald-400">{s.whatsapp || "—"}</td>
                <td className="p-3 font-mono">{s.phone1 || "—"}</td>
                <td className="p-3">{s.city || "—"}</td>
                <td className="p-3 text-gray-400">
                  {s.created_at ? new Date(s.created_at).toLocaleDateString() : "—"}
                </td>
                <td className="p-3 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1.5 flex-wrap justify-end">
                    {/* Step 2: Course Admission */}
                    <button
                      onClick={() => navigate(`/admission?studentId=${stuId}`)}
                      className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-sky-500/15 hover:bg-sky-500 text-sky-300 hover:text-white border border-sky-500/30 transition-all duration-150 cursor-pointer inline-flex items-center gap-1"
                      title="Assign / Admit to Course (Step 2)"
                    >
                      <i className="bi bi-mortarboard-fill"></i>
                      <span>Admit</span>
                    </button>

                    {/* Step 3: Collect Fees / Ledger */}
                    <button
                      onClick={() => navigate(`/payments?studentId=${stuId}`)}
                      className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-white border border-emerald-500/30 transition-all duration-150 cursor-pointer inline-flex items-center gap-1"
                      title="Fee Ledger & Payments (Step 3)"
                    >
                      <i className="bi bi-receipt"></i>
                      <span>Fees</span>
                    </button>

                    {/* Step 4: Record Results */}
                    <button
                      onClick={() => navigate(`/results?studentId=${stuId}`)}
                      className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-indigo-500/15 hover:bg-indigo-500 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all duration-150 cursor-pointer inline-flex items-center gap-1"
                      title="Record Exam Results (Step 4)"
                    >
                      <i className="bi bi-bar-chart-steps"></i>
                      <span>Result</span>
                    </button>

                    {/* Step 5: Issue Certificate */}
                    <button
                      onClick={() => navigate(`/certificates/issue?studentId=${stuId}`)}
                      className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-white border border-amber-500/30 transition-all duration-150 cursor-pointer inline-flex items-center gap-1"
                      title="Issue Certificate (Step 5)"
                    >
                      <i className="bi bi-award-fill"></i>
                      <span>Cert</span>
                    </button>

                    {/* Edit Profile Modal */}
                    <button
                      onClick={() => openEditModal(s)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
                      title="Edit Student Profile"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                  </div>
                </td>
              </>
            );
          }}
        />

        {/* ========================================================================= */}
        {/* MODAL: UPDATE STUDENT PROFILE LATER                                      */}
        {/* ========================================================================= */}
        {isEditModalOpen && editingStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-6">
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-1">
                    STUDENT PROFILE GOVERNANCE
                  </div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>Edit Profile:</span>
                    <span className="text-amber-300">{editingStudent.student_name || editingStudent.studentName}</span>
                    <span className="text-xs font-mono text-slate-400">({editingStudent.registration_number || editingStudent.registrationNumber})</span>
                  </h3>
                </div>

                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSaveStudent} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-300">
                  💡 Complete any missing address, parent, or identity details whenever the student provides them!
                </div>

                {/* Name & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Student Full Name *</label>
                    <input
                      type="text"
                      name="student_name"
                      value={editForm.student_name}
                      onChange={handleEditChange}
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp (10 digits) *</label>
                    <input
                      type="tel"
                      name="whatsapp"
                      maxLength="10"
                      value={editForm.whatsapp}
                      onChange={handleEditChange}
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Email & Calling Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="student@example.com"
                      value={editForm.email}
                      onChange={handleEditChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Calling Phone</label>
                    <input
                      type="tel"
                      name="phone1"
                      value={editForm.phone1}
                      onChange={handleEditChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* DOB & Blood Group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={editForm.dob}
                      onChange={handleEditChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Blood Group</label>
                    <select
                      name="blood_group"
                      value={editForm.blood_group}
                      onChange={handleEditChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="">-- Not Available / Unknown --</option>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Parents' Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Father's Name</label>
                    <input
                      type="text"
                      name="father_name"
                      value={editForm.father_name}
                      onChange={handleEditChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Mother's Name</label>
                    <input
                      type="text"
                      name="mother_name"
                      value={editForm.mother_name}
                      onChange={handleEditChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Guardian Phone</label>
                    <input
                      type="tel"
                      name="guardian_phone"
                      value={editForm.guardian_phone}
                      onChange={handleEditChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Address & City */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Residential Address</label>
                    <input
                      type="text"
                      name="address"
                      value={editForm.address}
                      onChange={handleEditChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">City / Town</label>
                    <input
                      type="text"
                      name="city"
                      value={editForm.city}
                      onChange={handleEditChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={savingStudent}
                    className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-md transition cursor-pointer disabled:opacity-50"
                  >
                    {savingStudent ? "Saving..." : "Save Profile Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* 📊 Reusable StatCard */
function StatCard({ title, value, icon, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-gray-900/70 border border-gray-800 rounded-2xl shadow-lg p-5 flex items-center justify-between"
    >
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
      </div>
      <div className="text-4xl opacity-70">{icon}</div>
    </motion.div>
  );
}

/* 📋 Reusable DataTable */
function DataTable({ title, color, data, headers, renderRow }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
      className="bg-gray-900/70 border border-gray-800 rounded-3xl shadow-xl p-6 overflow-x-auto"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-2xl font-semibold ${color}`}>{title}</h2>
        <span className="text-gray-400 text-sm">Total: {data.length}</span>
      </div>

      {data.length === 0 ? (
        <p className="text-gray-400 text-center py-10">No records found.</p>
      ) : (
        <table className="w-full text-sm text-gray-300 border-collapse">
          <thead className="bg-gray-800/80 text-gray-300">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="p-3 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-gray-800/40 transition-all"
              >
                {renderRow(item, index)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </motion.div>
  );
}
