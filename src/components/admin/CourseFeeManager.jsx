// ============================================================================
// CourseFeeManager.jsx - Admin-Only Course Fee & Pricing Governance Console
// ============================================================================

import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  IndianRupee,
  ShieldCheck,
  Search,
  Filter,
  Save,
  Edit3,
  Calendar,
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Sparkles,
  QrCode,
  Layers,
  Lock,
  Clock,
  X,
  ExternalLink,
} from "lucide-react";
import { courseService } from "../../services/courseService";
import userService from "../../services/userService";

const FEE_PRESETS = [
  { label: "₹300", value: 300, desc: "School Junior" },
  { label: "₹500", value: 500, desc: "School Senior" },
  { label: "₹4,500", value: 4500, desc: "Tally Prime" },
  { label: "₹6,000", value: 6000, desc: "C Language" },
  { label: "₹7,000", value: 7000, desc: "Excel / RDBMS" },
  { label: "₹8,000", value: 8000, desc: "Python / Java / GST" },
  { label: "₹15,000", value: 15000, desc: "DFA / Adv Java" },
  { label: "₹18,000", value: 18000, desc: "DCA / ISC CS" },
  { label: "₹25,000", value: 25000, desc: "Web Bootcamp" },
  { label: "₹35,000", value: 35000, desc: "Full Stack" },
  { label: "₹45,000", value: 45000, desc: "Advanced FSD" },
];

export default function CourseFeeManager() {
  const navigate = useNavigate();

  // Authentication & Admin Verification
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw && (raw.startsWith("{") || raw.startsWith("["))) {
        return JSON.parse(raw);
      }
      return null;
    } catch {
      return null;
    }
  });

  const isAdmin = useMemo(() => {
    if (!currentUser) {
      // In dev environment, check if token is present or default to true for development
      return Boolean(import.meta.env?.DEV);
    }
    const role = (
      currentUser.role ||
      currentUser.roleName ||
      currentUser.userTypeName ||
      currentUser.userType?.userTypeName ||
      currentUser.user_type_name ||
      currentUser.user_type ||
      ""
    ).toLowerCase();
    return ["admin", "developer", "owner", "superadmin", "administrator"].some((r) =>
      role.includes(r)
    );
  }, [currentUser]);

  // Course Data State
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [modeFilter, setModeFilter] = useState("ALL"); // ALL | FULL | MONTHLY | MISSING

  // Inline Quick Edit Rows (map of courseId -> { course_fees, fee_modes_id, fees_valid_up_to, upcoming_fees })
  const [inlineEdits, setInlineEdits] = useState({});
  const [inlineMode, setInlineMode] = useState(false);

  // Dedicated Fee Edit Modal State
  const [modalCourse, setModalCourse] = useState(null);
  const [modalForm, setModalForm] = useState({
    course_fees: 0,
    fee_modes_id: 2,
    fees_valid_up_to: "",
    upcoming_fees: "",
  });

  const getSwalTheme = () => ({
    background: "#0f172a",
    color: "#f8fafc",
    confirmButtonColor: "#0284c7",
    cancelButtonColor: "#475569",
  });

  // Load courses from backend
  const loadCourses = async (showToast = false) => {
    setLoading(true);
    try {
      // First try standard getAll()
      let res = await courseService.getAll();
      let list = [];
      if (res?.status === true && Array.isArray(res.data)) {
        list = res.data;
      } else if (Array.isArray(res?.data)) {
        list = res.data;
      } else if (Array.isArray(res)) {
        list = res;
      }

      // If empty, try direct fetch fallback to cnat_api
      if (!list || list.length === 0) {
        const direct = await fetch("http://127.0.0.1/cnat_api/public/api/courses");
        if (direct.ok) {
          const directJson = await direct.json();
          if (Array.isArray(directJson?.data)) list = directJson.data;
        }
      }

      setCourses(list);

      // Pre-populate inline edits map
      const initialMap = {};
      list.forEach((c) => {
        const id = c.id || c.courseId;
        const fee = Number(c.course_fees ?? c.courseFees ?? 0);
        const mode = Number(c.fee_modes_id ?? c.feeModesId ?? (c.fee_mode === "Course Fees" ? 2 : 1));
        const valid = c.fees_valid_up_to || c.feesValidUpTo || "";
        const upcoming = c.upcoming_fees ?? c.upcomingFees ?? "";
        initialMap[id] = {
          course_fees: fee,
          fee_modes_id: mode,
          fees_valid_up_to: valid,
          upcoming_fees: upcoming,
        };
      });
      setInlineEdits(initialMap);

      if (showToast) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `Refreshed ${list.length} courses from Cnat API`,
          showConfirmButton: false,
          timer: 2000,
          background: "#0f172a",
          color: "#f8fafc",
        });
      }
    } catch (err) {
      console.error("Failed to load courses:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to Fetch Courses",
        text: "Could not retrieve courses from backend API (E:\\wamp64\\www\\cnat_api).",
        ...getSwalTheme(),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // Save single course fee update
  const saveFee = async (courseId, feeData) => {
    setSavingId(courseId);
    try {
      const payload = {
        course_fees: Number(feeData.course_fees) || 0,
        fee_modes_id: Number(feeData.fee_modes_id || 1),
        fees_valid_up_to: feeData.fees_valid_up_to || null,
        upcoming_fees: feeData.upcoming_fees ? Number(feeData.upcoming_fees) : null,
      };

      const res = await courseService.updateFees(courseId, payload);

      // Optimistically update courses list
      setCourses((prev) =>
        prev.map((c) => {
          if ((c.id || c.courseId) === courseId) {
            return {
              ...c,
              course_fees: payload.course_fees,
              courseFees: payload.course_fees,
              fee_modes_id: payload.fee_modes_id,
              feeModesId: payload.fee_modes_id,
              fee_mode: payload.fee_modes_id === 2 ? "Course Fees" : "Monthly",
              feeMode: payload.fee_modes_id === 2 ? "Course Fees" : "Monthly",
              fees_valid_up_to: payload.fees_valid_up_to,
              feesValidUpTo: payload.fees_valid_up_to,
              upcoming_fees: payload.upcoming_fees,
              upcomingFees: payload.upcoming_fees,
            };
          }
          return c;
        })
      );

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Fees saved: ₹${payload.course_fees.toLocaleString("en-IN")}`,
        showConfirmButton: false,
        timer: 2500,
        background: "#0f172a",
        color: "#38bdf8",
      });

      // Close modal if open for this course
      if (modalCourse && (modalCourse.id || modalCourse.courseId) === courseId) {
        setModalCourse(null);
      }
    } catch (err) {
      console.error("Failed to update course fees:", err);
      let errorMsg = "Unable to save fee changes to backend.";
      if (err.response?.data?.message) errorMsg = err.response.data.message;
      Swal.fire({
        icon: "error",
        title: "Fee Update Failed",
        html: `<p class="text-xs text-rose-300">${errorMsg}</p>`,
        ...getSwalTheme(),
      });
    } finally {
      setSavingId(null);
    }
  };

  // Open dedicated modal for a course
  const openEditModal = (course) => {
    const id = course.id || course.courseId;
    const current = inlineEdits[id] || {
      course_fees: Number(course.course_fees ?? course.courseFees ?? 0),
      fee_modes_id: Number(course.fee_modes_id ?? course.feeModesId ?? 2),
      fees_valid_up_to: course.fees_valid_up_to || course.feesValidUpTo || "",
      upcoming_fees: course.upcoming_fees ?? course.upcomingFees ?? "",
    };

    setModalCourse(course);
    setModalForm({
      course_fees: current.course_fees,
      fee_modes_id: current.fee_modes_id,
      fees_valid_up_to: current.fees_valid_up_to,
      upcoming_fees: current.upcoming_fees,
    });
  };

  // Handle inline changes in table
  const handleInlineChange = (courseId, field, value) => {
    setInlineEdits((prev) => ({
      ...prev,
      [courseId]: {
        ...(prev[courseId] || {}),
        [field]: value,
      },
    }));
  };

  // Filtered & Searched Course List
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const code = String(c.course_code || c.courseCode || "").toLowerCase();
      const name = String(c.course_name || c.courseName || "").toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || code.includes(query) || name.includes(query);

      const fee = Number(c.course_fees ?? c.courseFees ?? 0);
      const modeId = Number(c.fee_modes_id ?? c.feeModesId ?? (c.fee_mode === "Course Fees" ? 2 : 1));

      let matchesMode = true;
      if (modeFilter === "FULL") matchesMode = modeId === 2;
      else if (modeFilter === "MONTHLY") matchesMode = modeId === 1;
      else if (modeFilter === "MISSING") matchesMode = fee <= 0;

      return matchesSearch && matchesMode;
    });
  }, [courses, searchQuery, modeFilter]);

  // Metrics
  const stats = useMemo(() => {
    const total = courses.length;
    const priced = courses.filter((c) => Number(c.course_fees ?? c.courseFees ?? 0) > 0).length;
    const missing = total - priced;
    const fullFee = courses.filter((c) => Number(c.fee_modes_id ?? c.feeModesId) === 2).length;
    const monthlyFee = courses.filter((c) => Number(c.fee_modes_id ?? c.feeModesId) === 1).length;
    const feesList = courses
      .map((c) => Number(c.course_fees ?? c.courseFees ?? 0))
      .filter((f) => f > 0);
    const avgFee = feesList.length ? Math.round(feesList.reduce((a, b) => a + b, 0) / feesList.length) : 0;

    return { total, priced, missing, fullFee, monthlyFee, avgFee };
  }, [courses]);

  // Access Control Guard Screen if NOT Admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-rose-500/30 rounded-3xl p-8 text-center shadow-2xl space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center text-3xl mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Admin Clearance Required</h2>
            <p className="text-xs text-slate-400 mt-1">
              Only institutional Administrators, Owners, and authorized Developers can configure or alter official course fee schedules.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/login"
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition shadow-lg shadow-sky-600/20"
            >
              Sign In as Administrator
            </Link>
            <Link
              to="/"
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Ambient background glows */}
      <div className="fixed w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[160px] -top-32 -left-20 pointer-events-none" />
      <div className="fixed w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[150px] top-1/2 -right-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Breadcrumb & Header Card */}
        <div className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Link to="/admin" className="hover:text-white transition">Admin HQ</Link>
              <span>/</span>
              <Link to="/admin/courses" className="hover:text-white transition">Courses</Link>
              <span>/</span>
              <span className="text-emerald-400 font-semibold">Course Fees Provision</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ADMINISTRATIVE GOVERNANCE • TIER 1 ACCESS</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Course Fee &amp; Pricing Manager</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold">
                Live Cnat API
              </span>
            </h1>

            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
              Add and update official course fees, configure payment schemes (Lump Sum vs Monthly Duration), set validity offers, and automatically sync fees with student admission forms, receipts, and UPI QR codes.
            </p>
          </div>

          {/* Quick Actions & Navigation */}
          <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto">
            <button
              type="button"
              onClick={() => setInlineMode(!inlineMode)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer ${
                inlineMode
                  ? "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/20"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              }`}
              title="Toggle inline fee editing directly in table rows"
            >
              <Edit3 className="w-4 h-4" />
              <span>{inlineMode ? "Exit Inline Edit" : "Quick Inline Edit"}</span>
            </button>

            <button
              type="button"
              onClick={() => loadCourses(true)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition cursor-pointer disabled:opacity-50"
              title="Refresh course fees from backend MySQL database"
            >
              <RefreshCw className={`w-4 h-4 text-sky-400 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <Link
              to="/students/admission-form"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-600/20"
              title="Preview admission form with current course fees & UPI QR"
            >
              <QrCode className="w-4 h-4" />
              <span>Preview Admission A4</span>
            </Link>
          </div>
        </div>

        {/* Statistical Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
            <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Total Courses</p>
              <p className="text-xl font-black text-white">{stats.total}</p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Priced Courses</p>
              <p className="text-xl font-black text-emerald-400">{stats.priced}</p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Average Fee</p>
              <p className="text-xl font-black text-white">₹{stats.avgFee.toLocaleString("en-IN")}</p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Lump Sum (Full)</p>
              <p className="text-xl font-black text-purple-300">{stats.fullFee} courses</p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg col-span-2 lg:col-span-1">
            <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Monthly Duration</p>
              <p className="text-xl font-black text-teal-300">{stats.monthlyFee} courses</p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by course code or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            <span className="text-[11px] text-slate-400 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Fee Filter:</span>
            </span>

            {[
              { id: "ALL", label: `All (${courses.length})` },
              { id: "FULL", label: `Lump Sum (${stats.fullFee})` },
              { id: "MONTHLY", label: `Monthly (${stats.monthlyFee})` },
              { id: "MISSING", label: `Unpriced / ₹0 (${stats.missing})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setModeFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  modeFilter === tab.id
                    ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                    : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Course Fees Table */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-emerald-400 mx-auto" />
              <p className="text-xs text-slate-400 font-medium">Fetching real-time course pricing from Cnat API...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="text-sm font-bold text-white">No Courses Matching Search</p>
              <p className="text-xs text-slate-400">Try adjusting your search query or fee mode filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/70 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                    <th className="py-3.5 px-4 w-12 text-center">#</th>
                    <th className="py-3.5 px-4 w-28">Code</th>
                    <th className="py-3.5 px-4">Course Title</th>
                    <th className="py-3.5 px-4 w-44">Official Fee (₹)</th>
                    <th className="py-3.5 px-4 w-44">Payment Mode</th>
                    <th className="py-3.5 px-4 w-40">Offer Validity</th>
                    <th className="py-3.5 px-4 w-32 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {filteredCourses.map((crs, index) => {
                    const id = crs.id || crs.courseId;
                    const code = crs.course_code || crs.courseCode || "N/A";
                    const name = crs.course_name || crs.courseName || "Untitled Course";
                    const currentFee = Number(crs.course_fees ?? crs.courseFees ?? 0);
                    const currentModeId = Number(crs.fee_modes_id ?? crs.feeModesId ?? (crs.fee_mode === "Course Fees" ? 2 : 1));

                    const editState = inlineEdits[id] || {
                      course_fees: currentFee,
                      fee_modes_id: currentModeId,
                      fees_valid_up_to: crs.fees_valid_up_to || crs.feesValidUpTo || "",
                      upcoming_fees: crs.upcoming_fees ?? crs.upcomingFees ?? "",
                    };

                    const isSaving = savingId === id;
                    const hasChanged =
                      editState.course_fees !== currentFee ||
                      editState.fee_modes_id !== currentModeId ||
                      (editState.fees_valid_up_to || "") !== (crs.fees_valid_up_to || crs.feesValidUpTo || "") ||
                      (editState.upcoming_fees || "") !== (crs.upcoming_fees ?? crs.upcomingFees ?? "");

                    return (
                      <tr
                        key={id}
                        className={`transition hover:bg-slate-800/40 ${
                          hasChanged ? "bg-amber-500/5" : ""
                        }`}
                      >
                        {/* Index */}
                        <td className="py-3.5 px-4 text-center font-mono text-slate-500 font-bold">
                          {crs.id || index + 1}
                        </td>

                        {/* Code */}
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-sky-400 border border-slate-700 text-xs">
                            {code}
                          </span>
                        </td>

                        {/* Title */}
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-white group-hover:text-sky-300 transition">
                            {name}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            ID: {id} &bull; Synced with student admissions &amp; QR
                          </p>
                        </td>

                        {/* Fee Column */}
                        <td className="py-3.5 px-4">
                          {inlineMode ? (
                            <div className="relative">
                              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-emerald-400 font-bold text-xs">₹</span>
                              <input
                                type="number"
                                min="0"
                                value={editState.course_fees}
                                onChange={(e) =>
                                  handleInlineChange(id, "course_fees", Number(e.target.value) || 0)
                                }
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-6 pr-2 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-emerald-500 font-mono"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm font-extrabold font-mono px-2.5 py-1 rounded-xl border ${
                                  currentFee > 0
                                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                    : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                                }`}
                              >
                                {currentFee > 0 ? `₹ ${currentFee.toLocaleString("en-IN")}` : "Unpriced (₹ 0)"}
                              </span>
                            </div>
                          )}
                        </td>

                        {/* Payment Mode */}
                        <td className="py-3.5 px-4">
                          {inlineMode ? (
                            <select
                              value={editState.fee_modes_id}
                              onChange={(e) =>
                                handleInlineChange(id, "fee_modes_id", Number(e.target.value))
                              }
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                            >
                              <option value={2}>Course Fees (Full)</option>
                              <option value={1}>Monthly Duration</option>
                            </select>
                          ) : (
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
                                currentModeId === 2
                                  ? "bg-purple-500/15 text-purple-300 border-purple-500/30"
                                  : "bg-teal-500/15 text-teal-300 border-teal-500/30"
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                              <span>{currentModeId === 2 ? "Course Fees (Full)" : "Monthly Duration"}</span>
                            </span>
                          )}
                        </td>

                        {/* Validity & Upcoming Fee */}
                        <td className="py-3.5 px-4">
                          {crs.fees_valid_up_to || crs.feesValidUpTo ? (
                            <div className="space-y-0.5">
                              <span className="inline-flex items-center gap-1 text-[10px] text-amber-300 font-medium">
                                <Calendar className="w-3 h-3 text-amber-400" />
                                <span>Till {crs.fees_valid_up_to || crs.feesValidUpTo}</span>
                              </span>
                              {crs.upcoming_fees || crs.upcomingFees ? (
                                <p className="text-[10px] text-slate-400 font-mono">
                                  Hike: ₹{Number(crs.upcoming_fees || crs.upcomingFees).toLocaleString("en-IN")}
                                </p>
                              ) : null}
                            </div>
                          ) : (
                            <span className="text-slate-600 text-[11px] font-mono">Standard Price</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {inlineMode && hasChanged && (
                              <button
                                type="button"
                                onClick={() => saveFee(id, editState)}
                                disabled={isSaving}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
                                title="Save changes for this course"
                              >
                                <Save className={`w-3.5 h-3.5 ${isSaving ? "animate-spin" : ""}`} />
                                <span>{isSaving ? "..." : "Save"}</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => openEditModal(crs)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-white border border-slate-700 text-xs font-semibold transition cursor-pointer"
                              title="Open dedicated fee configuration modal"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit Fee</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: ADD / MODIFY COURSE FEE                                             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {modalCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-6"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 mb-1.5">
                    <ShieldCheck className="w-3 h-3" />
                    <span>ADMIN PRICING GOVERNANCE</span>
                  </div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <span>Configure Course Fee:</span>
                    <span className="text-sky-400 font-mono">
                      {modalCourse.course_code || modalCourse.courseCode}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {modalCourse.course_name || modalCourse.courseName}
                  </p>
                </div>

                <button
                  onClick={() => setModalCourse(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveFee(modalCourse.id || modalCourse.courseId, modalForm);
                }}
                className="p-6 space-y-6"
              >
                {/* 1. Fee Amount Input & Presets */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-transparent border border-emerald-500/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-white flex items-center gap-1.5">
                      <IndianRupee className="w-4 h-4 text-emerald-400" />
                      <span>Official Course Fee (₹) <span className="text-rose-400">*</span></span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Current: ₹{Number(modalCourse.course_fees ?? modalCourse.courseFees ?? 0).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 font-black text-xl">
                      ₹
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      required
                      placeholder="e.g. 7000"
                      value={modalForm.course_fees}
                      onChange={(e) =>
                        setModalForm((prev) => ({
                          ...prev,
                          course_fees: Number(e.target.value) || 0,
                        }))
                      }
                      className="w-full bg-slate-950 border border-emerald-500/50 rounded-2xl pl-10 pr-4 py-3 text-2xl font-black text-white focus:outline-none focus:border-emerald-400 font-mono shadow-inner"
                    />
                  </div>

                  {/* Quick Fee Presets */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      One-Click Standard Pricing Presets:
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {FEE_PRESETS.map((p) => (
                        <button
                          key={p.value}
                          type="button"
                          onClick={() =>
                            setModalForm((prev) => ({
                              ...prev,
                              course_fees: p.value,
                              upcoming_fees: Math.round(p.value * 1.2),
                            }))
                          }
                          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer border ${
                            modalForm.course_fees === p.value
                              ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20"
                              : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700/70"
                          }`}
                          title={`${p.label} — ${p.desc}`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Fee Mode (Lump Sum vs Monthly) */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-white">
                    Payment Mode &amp; Course Scheme:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setModalForm((prev) => ({ ...prev, fee_modes_id: 2 }))}
                      className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                        modalForm.fee_modes_id === 2
                          ? "bg-purple-500/20 border-purple-500 text-white ring-1 ring-purple-500/40 shadow-lg"
                          : "bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-purple-300">Course Fees (Full)</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-500/30 text-purple-200">
                          Mode ID: 2
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        One-time lump-sum payment for complete course (e.g. Tally Prime, Advance Excel, RDBMS, C).
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setModalForm((prev) => ({ ...prev, fee_modes_id: 1 }))}
                      className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                        modalForm.fee_modes_id === 1
                          ? "bg-teal-500/20 border-teal-500 text-white ring-1 ring-teal-500/40 shadow-lg"
                          : "bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-teal-300">Monthly Duration</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-500/30 text-teal-200">
                          Mode ID: 1
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Monthly recurring or multi-installment duration (e.g. Full Stack, DCA, DFA, Python).
                      </p>
                    </button>
                  </div>
                </div>

                {/* 3. Price Validity & Post-Validity Hike (Optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>Offer Valid Until (Optional):</span>
                    </label>
                    <input
                      type="date"
                      value={modalForm.fees_valid_up_to}
                      onChange={(e) =>
                        setModalForm((prev) => ({ ...prev, fees_valid_up_to: e.target.value }))
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                      <span>Post-Hike Fee (₹) (Optional):</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="e.g. 8500"
                      value={modalForm.upcoming_fees}
                      onChange={(e) =>
                        setModalForm((prev) => ({ ...prev, upcoming_fees: e.target.value }))
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>
                </div>

                {/* Live System Preview Callout */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                      <span>Live System Integration Preview:</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">Auto-calculated</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <p className="text-[10px] text-slate-400">Student Admission A4</p>
                      <p className="text-xs font-extrabold text-white mt-0.5">
                        ₹ {Number(modalForm.course_fees || 0).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <p className="text-[10px] text-slate-400">Dynamic Payment QR</p>
                      <p className="text-xs font-extrabold text-emerald-400 mt-0.5">
                        am={modalForm.course_fees}
                      </p>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <p className="text-[10px] text-slate-400">Payment Scheme</p>
                      <p className="text-xs font-extrabold text-purple-300 mt-0.5">
                        {modalForm.fee_modes_id === 2 ? "Lump Sum" : "Monthly"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setModalCourse(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={savingId === (modalCourse.id || modalCourse.courseId)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-sky-600 hover:from-emerald-400 hover:to-sky-500 text-white font-black text-xs transition shadow-lg shadow-emerald-600/25 cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>
                      {savingId === (modalCourse.id || modalCourse.courseId)
                        ? "Saving Changes..."
                        : `Save Fee: ₹${Number(modalForm.course_fees || 0).toLocaleString("en-IN")}`}
                    </span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
