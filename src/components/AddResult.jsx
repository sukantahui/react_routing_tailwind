import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  BookOpen,
  Save,
  Search,
  CheckCircle2,
  XCircle,
  Sparkles,
  Calendar,
  Award,
  TrendingUp,
  Filter,
  Download,
  RefreshCw,
  Edit,
  Trash2,
  ExternalLink,
  ChevronDown,
  User,
  GraduationCap,
  Layers,
  FileCheck,
  Percent,
  Check,
  X,
  Code2,
  Eye,
  BarChart2,
  PlusCircle,
  FileText
} from "lucide-react";

import { resultService } from "../services/resultService";
import { admissionService } from "../services/admissionService";
import { courseService } from "../services/courseService";

const getAdmissionCourseName = (adm, coursesList = []) => {
  if (!adm) return "Certificate Course";

  // 1. Check nested course object
  const cObj = adm.course;
  if (cObj) {
    if (typeof cObj === "string" && cObj.trim() !== "") return cObj;
    const directName = cObj.course_name || cObj.courseName || cObj.name || cObj.title;
    if (directName) return directName;
  }

  // 2. Check direct property on admission
  const directAdmName = adm.course_name || adm.courseName || adm.courseTitle || adm.course_title;
  if (directAdmName) return directAdmName;

  // 3. Fallback lookup in courses catalog via course_id / courseId
  const cId = adm.course_id || adm.courseId || adm.courses_id || adm.course?.id;
  if (cId && Array.isArray(coursesList) && coursesList.length > 0) {
    const matched = coursesList.find((c) => String(c.id || c.course_id || c.courseId) === String(cId));
    if (matched) {
      return matched.course_name || matched.courseName || matched.name || matched.title || "";
    }
  }

  return "Certificate Course";
};

const defaultForm = {
  admissionId: "",
  theoryMarks: "",
  practicalMarks: "",
  totalTheoryMarks: "50",
  totalPracticalMarks: "50",
  resultDate: new Date().toISOString().split("T")[0],
};

export default function AddResult() {
  const [activeTab, setActiveTab] = useState("form"); // 'form' | 'directory'
  const [formData, setFormData] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);

  // Data states
  const [results, setResults] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [courses, setCourses] = useState([]);

  // Loading states
  const [loading, setLoading] = useState({
    results: false,
    admissions: false,
    saving: false,
  });

  // Search & Filter in Directory
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("ALL");
  const [gradeFilter, setGradeFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");

  // Admission Selector Search Modal / Dropdown state
  const [admissionSearch, setAdmissionSearch] = useState("");
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const selectorRef = useRef(null);

  // Developer Tools toggle
  const [showDevTools, setShowDevTools] = useState(false);

  const getSwalTheme = () => ({
    background: "#0f172a",
    color: "#f8fafc",
    confirmButtonColor: "#0284c7",
    cancelButtonColor: "#475569",
    customClass: {
      popup: "border border-slate-700 rounded-2xl shadow-2xl",
    },
  });

  // Close admission dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectorRef.current && !selectorRef.current.contains(e.target)) {
        setIsSelectorOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch initial data
  const fetchData = async () => {
    setLoading((prev) => ({ ...prev, results: true, admissions: true }));
    try {
      const [resData, admData, crsData] = await Promise.allSettled([
        resultService.getAll(),
        admissionService.getAll(),
        courseService.getAll(),
      ]);

      if (resData.status === "fulfilled") {
        const rawResults = resData.value?.data || resData.value || [];
        setResults(Array.isArray(rawResults) ? rawResults : []);
      }
      if (admData.status === "fulfilled") {
        const rawAdm = admData.value?.data || admData.value || [];
        setAdmissions(Array.isArray(rawAdm) ? rawAdm : []);
      }
      if (crsData.status === "fulfilled") {
        const rawCrs = crsData.value?.data || crsData.value || [];
        setCourses(Array.isArray(rawCrs) ? rawCrs : []);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading((prev) => ({ ...prev, results: false, admissions: false }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Helper map for quick admission details lookup
  const admissionMap = useMemo(() => {
    const map = new Map();
    admissions.forEach((adm) => {
      const id = adm.admission_id || adm.admissionId || adm.id;
      if (id) map.set(String(id), adm);
    });
    return map;
  }, [admissions]);

  // Currently selected admission details
  const selectedAdmission = useMemo(() => {
    if (!formData.admissionId) return null;
    return admissionMap.get(String(formData.admissionId)) || null;
  }, [formData.admissionId, admissionMap]);

  // Filtered Admissions for the smart search dropdown
  const filteredAdmissions = useMemo(() => {
    if (!admissionSearch.trim()) return admissions.slice(0, 50);
    const q = admissionSearch.toLowerCase().trim();
    return admissions
      .filter((adm) => {
        const studentName = (adm.student_name || adm.student?.student_name || adm.studentName || "").toLowerCase();
        const courseName = getAdmissionCourseName(adm, courses).toLowerCase();
        const phone = (adm.phone1 || adm.student?.phone1 || adm.whatsapp || adm.student?.whatsapp || "").toLowerCase();
        const id = String(adm.admission_id || adm.admissionId || adm.id || "");
        return (
          studentName.includes(q) ||
          courseName.includes(q) ||
          phone.includes(q) ||
          id.includes(q)
        );
      })
      .slice(0, 50);
  }, [admissions, admissionSearch, courses]);

  // Handle standard input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Select admission from quick-picker
  const handleSelectAdmission = (adm) => {
    const id = adm.admission_id || adm.admissionId || adm.id;
    setFormData((prev) => ({
      ...prev,
      admissionId: id,
    }));
    setIsSelectorOpen(false);
    setAdmissionSearch("");
  };

  // Real-time calculation for live score card
  const calculation = useMemo(() => {
    const th = parseFloat(formData.theoryMarks);
    const pr = parseFloat(formData.practicalMarks);
    const totTh = parseFloat(formData.totalTheoryMarks) || 50;
    const totPr = parseFloat(formData.totalPracticalMarks) || 50;

    const hasMarks = !isNaN(th) || !isNaN(pr);
    const validTh = isNaN(th) ? 0 : Math.max(0, th);
    const validPr = isNaN(pr) ? 0 : Math.max(0, pr);

    const totalObtained = validTh + validPr;
    const maxTotal = totTh + totPr;

    if (!hasMarks || maxTotal <= 0) {
      return {
        hasMarks: false,
        totalObtained: 0,
        maxTotal: 100,
        percentage: null,
        grade: "N/A",
        gradeColor: "text-slate-400 border-slate-700 bg-slate-800/40",
        badgeBg: "bg-slate-800 text-slate-400",
        status: "N/A",
        statusColor: "text-slate-400",
        passed: false,
      };
    }

    const pct = Number(((totalObtained / maxTotal) * 100).toFixed(2));

    let grade = "F";
    let gradeColor = "text-rose-400 border-rose-500/40 bg-rose-500/10";
    let badgeBg = "bg-rose-500/20 text-rose-300 border border-rose-500/30";
    let status = "Fail";
    let statusColor = "text-rose-400";
    let passed = false;

    if (pct >= 90) {
      grade = "O (Outstanding)";
      gradeColor = "text-amber-300 border-amber-400/50 bg-amber-400/10";
      badgeBg = "bg-amber-500/20 text-amber-300 border border-amber-500/30";
      status = "Distinction";
      statusColor = "text-amber-300";
      passed = true;
    } else if (pct >= 80) {
      grade = "A+ (Excellent)";
      gradeColor = "text-emerald-300 border-emerald-400/50 bg-emerald-400/10";
      badgeBg = "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
      status = "First Class with Distinction";
      statusColor = "text-emerald-300";
      passed = true;
    } else if (pct >= 70) {
      grade = "A (Very Good)";
      gradeColor = "text-sky-300 border-sky-400/50 bg-sky-400/10";
      badgeBg = "bg-sky-500/20 text-sky-300 border border-sky-500/30";
      status = "First Class";
      statusColor = "text-sky-300";
      passed = true;
    } else if (pct >= 60) {
      grade = "B+ (Good)";
      gradeColor = "text-cyan-300 border-cyan-400/50 bg-cyan-400/10";
      badgeBg = "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30";
      status = "First Class";
      statusColor = "text-cyan-300";
      passed = true;
    } else if (pct >= 50) {
      grade = "B (Fair)";
      gradeColor = "text-indigo-300 border-indigo-400/50 bg-indigo-400/10";
      badgeBg = "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30";
      status = "Second Class";
      statusColor = "text-indigo-300";
      passed = true;
    } else if (pct >= 40) {
      grade = "C (Pass)";
      gradeColor = "text-yellow-300 border-yellow-400/50 bg-yellow-400/10";
      badgeBg = "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";
      status = "Pass";
      statusColor = "text-yellow-300";
      passed = true;
    }

    return {
      hasMarks: true,
      totalObtained,
      maxTotal,
      percentage: pct,
      grade,
      gradeColor,
      badgeBg,
      status,
      statusColor,
      passed,
    };
  }, [formData]);

  // Submit Handler (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.admissionId) {
      Swal.fire({
        icon: "warning",
        title: "Admission Required",
        text: "Please select or enter an Admission ID for the student.",
        ...getSwalTheme(),
      });
      return;
    }

    const actionText = editingId ? "Update Result" : "Save Result";
    const confirm = await Swal.fire({
      title: `${actionText}?`,
      html: `
        <div class="text-left text-sm text-slate-300 space-y-1.5 py-2">
          <p><strong>Admission ID:</strong> #${formData.admissionId}</p>
          <p><strong>Total Marks:</strong> ${calculation.totalObtained} / ${calculation.maxTotal}</p>
          <p><strong>Percentage:</strong> ${calculation.percentage ?? "0"}%</p>
          <p><strong>Grade:</strong> ${calculation.grade}</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: actionText,
      cancelButtonText: "Cancel",
      ...getSwalTheme(),
    });

    if (!confirm.isConfirmed) return;

    setLoading((prev) => ({ ...prev, saving: true }));

    try {
      const payload = {
        admissionId: Number(formData.admissionId),
        admission_id: Number(formData.admissionId),
        theoryMarks: formData.theoryMarks !== "" ? Number(formData.theoryMarks) : 0,
        theory_marks: formData.theoryMarks !== "" ? Number(formData.theoryMarks) : 0,
        practicalMarks: formData.practicalMarks !== "" ? Number(formData.practicalMarks) : 0,
        practical_marks: formData.practicalMarks !== "" ? Number(formData.practicalMarks) : 0,
        totalTheoryMarks: Number(formData.totalTheoryMarks || 50),
        total_theory_marks: Number(formData.totalTheoryMarks || 50),
        totalPracticalMarks: Number(formData.totalPracticalMarks || 50),
        total_practical_marks: Number(formData.totalPracticalMarks || 50),
        resultDate: formData.resultDate || new Date().toISOString().split("T")[0],
        result_date: formData.resultDate || new Date().toISOString().split("T")[0],
      };

      if (editingId) {
        await resultService.update(editingId, payload);
        Swal.fire({
          icon: "success",
          title: "Result Updated",
          text: "Student evaluation has been successfully updated.",
          timer: 2000,
          showConfirmButton: false,
          ...getSwalTheme(),
        });
      } else {
        await resultService.create(payload);
        Swal.fire({
          icon: "success",
          title: "Result Recorded",
          text: "Student result has been successfully saved.",
          timer: 2000,
          showConfirmButton: false,
          ...getSwalTheme(),
        });
      }

      handleResetForm();
      fetchData();
      setActiveTab("directory");
    } catch (error) {
      console.error("Save error:", error);
      Swal.fire({
        icon: "error",
        title: "Error Saving Result",
        text: error.response?.data?.message || error.message || "An unexpected error occurred",
        ...getSwalTheme(),
      });
    } finally {
      setLoading((prev) => ({ ...prev, saving: false }));
    }
  };

  // Reset Form
  const handleResetForm = () => {
    setFormData(defaultForm);
    setEditingId(null);
    setAdmissionSearch("");
  };

  // Load Result for Editing
  const handleEditResult = (item) => {
    const admId = item.admission_id || item.admissionId || item.admission?.id || "";
    setFormData({
      admissionId: String(admId),
      theoryMarks: String(item.theory_marks ?? item.theoryMarks ?? ""),
      practicalMarks: String(item.practical_marks ?? item.practicalMarks ?? ""),
      totalTheoryMarks: String(item.total_theory_marks ?? item.totalTheoryMarks ?? 50),
      totalPracticalMarks: String(item.total_practical_marks ?? item.totalPracticalMarks ?? 50),
      resultDate: item.result_date || item.resultDate || new Date().toISOString().split("T")[0],
    });
    setEditingId(item.id || item.result_id || item.resultId);
    setActiveTab("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete Result
  const handleDeleteResult = async (item) => {
    const id = item.id || item.result_id || item.resultId;
    const confirm = await Swal.fire({
      title: "Delete Result?",
      text: "Are you sure you want to delete this result record? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      confirmButtonColor: "#e11d48",
      ...getSwalTheme(),
    });

    if (!confirm.isConfirmed) return;

    try {
      await resultService.delete(id);
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Result has been deleted.",
        timer: 1500,
        showConfirmButton: false,
        ...getSwalTheme(),
      });
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err.response?.data?.message || err.message,
        ...getSwalTheme(),
      });
    }
  };

  // Compute stats across all results
  const stats = useMemo(() => {
    if (!results.length) {
      return { total: 0, avgPct: 0, passedCount: 0, passRate: 0, distinctions: 0 };
    }

    let sumPct = 0;
    let passedCount = 0;
    let distinctions = 0;

    results.forEach((r) => {
      const th = Number(r.theory_marks ?? r.theoryMarks ?? 0);
      const pr = Number(r.practical_marks ?? r.practicalMarks ?? 0);
      const totTh = Number(r.total_theory_marks ?? r.totalTheoryMarks ?? 50);
      const totPr = Number(r.total_practical_marks ?? r.totalPracticalMarks ?? 50);
      const tot = totTh + totPr;
      const pct = tot > 0 ? ((th + pr) / tot) * 100 : 0;

      sumPct += pct;
      if (pct >= 40) passedCount++;
      if (pct >= 75) distinctions++;
    });

    const avgPct = (sumPct / results.length).toFixed(1);
    const passRate = ((passedCount / results.length) * 100).toFixed(1);

    return {
      total: results.length,
      avgPct,
      passedCount,
      passRate,
      distinctions,
    };
  }, [results]);

  // Process and Filter Directory List
  const processedResults = useMemo(() => {
    return results.map((item) => {
      const admId = item.admission_id || item.admissionId || item.admission?.id;
      const adm = admissionMap.get(String(admId)) || item.admission || {};

      const studentName =
        item.student_name ||
        item.studentName ||
        adm.student_name ||
        adm.student?.student_name ||
        adm.studentName ||
        `Admission #${admId || "N/A"}`;

      const courseName =
        item.course_name ||
        item.courseName ||
        getAdmissionCourseName(adm, courses);

      const th = Number(item.theory_marks ?? item.theoryMarks ?? 0);
      const pr = Number(item.practical_marks ?? item.practicalMarks ?? 0);
      const totTh = Number(item.total_theory_marks ?? item.totalTheoryMarks ?? 50);
      const totPr = Number(item.total_practical_marks ?? item.totalPracticalMarks ?? 50);
      const totalObtained = th + pr;
      const maxTotal = totTh + totPr;
      const pct = maxTotal > 0 ? Number(((totalObtained / maxTotal) * 100).toFixed(2)) : 0;

      let grade = "F";
      let passed = false;
      if (pct >= 90) { grade = "O"; passed = true; }
      else if (pct >= 80) { grade = "A+"; passed = true; }
      else if (pct >= 70) { grade = "A"; passed = true; }
      else if (pct >= 60) { grade = "B+"; passed = true; }
      else if (pct >= 50) { grade = "B"; passed = true; }
      else if (pct >= 40) { grade = "C"; passed = true; }

      return {
        ...item,
        admId,
        studentName,
        courseName,
        theoryMarks: th,
        practicalMarks: pr,
        totalTheoryMarks: totTh,
        totalPracticalMarks: totPr,
        totalObtained,
        maxTotal,
        percentage: pct,
        grade,
        passed,
        resultDate: item.result_date || item.resultDate || "N/A",
        phone: adm.phone1 || adm.student?.phone1 || adm.whatsapp || "N/A",
      };
    });
  }, [results, admissionMap]);

  // Filter & Sort Results
  const filteredResults = useMemo(() => {
    let list = [...processedResults];

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter((r) =>
        r.studentName.toLowerCase().includes(q) ||
        r.courseName.toLowerCase().includes(q) ||
        String(r.admId).toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q)
      );
    }

    // Course filter
    if (courseFilter !== "ALL") {
      list = list.filter((r) => r.courseName === courseFilter);
    }

    // Grade filter
    if (gradeFilter !== "ALL") {
      list = list.filter((r) => r.grade === gradeFilter);
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.resultDate || 0) - new Date(a.resultDate || 0);
      if (sortBy === "oldest") return new Date(a.resultDate || 0) - new Date(b.resultDate || 0);
      if (sortBy === "highest") return b.percentage - a.percentage;
      if (sortBy === "lowest") return a.percentage - b.percentage;
      if (sortBy === "name") return a.studentName.localeCompare(b.studentName);
      return 0;
    });

    return list;
  }, [processedResults, searchTerm, courseFilter, gradeFilter, sortBy]);

  // Export to Excel
  const handleExportExcel = () => {
    if (!filteredResults.length) {
      Swal.fire({
        icon: "info",
        title: "No Records",
        text: "There are no results available to export.",
        ...getSwalTheme(),
      });
      return;
    }

    const exportRows = filteredResults.map((r, idx) => ({
      "Sl No": idx + 1,
      "Admission ID": r.admId,
      "Student Name": r.studentName,
      "Contact": r.phone,
      "Course": r.courseName,
      "Theory Marks": `${r.theoryMarks}/${r.totalTheoryMarks}`,
      "Practical Marks": `${r.practicalMarks}/${r.totalPracticalMarks}`,
      "Total Marks": `${r.totalObtained}/${r.maxTotal}`,
      "Percentage (%)": r.percentage,
      "Grade": r.grade,
      "Status": r.passed ? "Pass" : "Fail",
      "Result Date": r.resultDate,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Results");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `CNAT_Student_Results_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-6 lg:p-8 selection:bg-sky-500/30 selection:text-sky-300">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900/90 to-sky-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles size={14} className="animate-pulse" />
                Examination &amp; Academic Assessment
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <Award className="text-sky-400 shrink-0" size={36} />
                Results Management Suite
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
                Record theory and practical scores, compute instant grades with real-time analytics, and publish verifiable student certificates.
              </p>
            </div>

            {/* Quick Action Navigation */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/certificates/issue"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-sm font-medium transition-all shadow hover:shadow-sky-500/10 hover:border-slate-600"
              >
                <FileCheck size={16} className="text-amber-400" />
                Issue Certificate
              </Link>
              <button
                onClick={fetchData}
                disabled={loading.results || loading.admissions}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/30 text-sky-300 text-sm font-medium transition-all cursor-pointer"
                title="Refresh Data"
              >
                <RefreshCw size={16} className={loading.results ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Global Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center gap-4 relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-105 transition-transform">
              <Layers size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Evaluated</p>
              <h3 className="text-2xl font-bold text-white mt-0.5">{stats.total}</h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center gap-4 relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Pass Rate</p>
              <h3 className="text-2xl font-bold text-emerald-400 mt-0.5">{stats.passRate}%</h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center gap-4 relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
              <Percent size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Average Score</p>
              <h3 className="text-2xl font-bold text-cyan-300 mt-0.5">{stats.avgPct}%</h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center gap-4 relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Distinctions (≥75%)</p>
              <h3 className="text-2xl font-bold text-amber-300 mt-0.5">{stats.distinctions}</h3>
            </div>
          </motion.div>
        </div>

        {/* Main Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-1">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm rounded-t-xl transition-all border-b-2 cursor-pointer ${
              activeTab === "form"
                ? "bg-slate-800/60 text-sky-400 border-sky-400 shadow-sm"
                : "text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-800/30"
            }`}
          >
            <PlusCircle size={17} />
            {editingId ? "Edit Evaluation" : "Record New Result"}
          </button>
          <button
            onClick={() => setActiveTab("directory")}
            className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm rounded-t-xl transition-all border-b-2 cursor-pointer ${
              activeTab === "directory"
                ? "bg-slate-800/60 text-sky-400 border-sky-400 shadow-sm"
                : "text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-800/30"
            }`}
          >
            <BarChart2 size={17} />
            Results Directory ({results.length})
          </button>
        </div>

        {/* Tab 1: Record / Edit Form */}
        {activeTab === "form" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left Form Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {editingId ? `Update Result #${editingId}` : "Student Examination Score Entry"}
                      </h2>
                      <p className="text-xs text-slate-400">Fill in marks to automatically calculate grades &amp; percentages</p>
                    </div>
                  </div>

                  {editingId && (
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-medium transition cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Student & Admission Smart Selector */}
                  <div className="relative" ref={selectorRef}>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Student &amp; Admission <span className="text-rose-400">*</span>
                    </label>

                    {/* Trigger Button / Display */}
                    <div
                      onClick={() => setIsSelectorOpen(!isSelectorOpen)}
                      className={`w-full min-h-[46px] px-3.5 py-2.5 rounded-xl bg-slate-800/80 border ${
                        formData.admissionId ? "border-sky-500/40" : "border-slate-700"
                      } hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 cursor-pointer flex items-center justify-between transition-all`}
                    >
                      {selectedAdmission ? (
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center font-bold text-xs shrink-0">
                            #{formData.admissionId}
                          </div>
                          <div className="truncate">
                            <span className="font-semibold text-white text-sm">
                              {selectedAdmission.student_name ||
                                selectedAdmission.student?.student_name ||
                                selectedAdmission.studentName ||
                                `Student #${selectedAdmission.student_id || ""}`}
                            </span>
                            <span className="text-xs text-slate-400 ml-2">
                              • {selectedAdmission.course_name || selectedAdmission.course?.course_name || selectedAdmission.courseName || "Course"}
                            </span>
                          </div>
                        </div>
                      ) : formData.admissionId ? (
                        <div className="text-sm text-slate-200">
                          Admission ID: <span className="font-mono text-sky-400">#{formData.admissionId}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-sm flex items-center gap-2">
                          <Search size={16} className="text-slate-500" />
                          Click to search and select student admission...
                        </span>
                      )}

                      <div className="flex items-center gap-2">
                        {formData.admissionId && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData((prev) => ({ ...prev, admissionId: "" }));
                            }}
                            className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white"
                          >
                            <X size={14} />
                          </button>
                        )}
                        <ChevronDown size={16} className={`text-slate-400 transition-transform ${isSelectorOpen ? "rotate-180" : ""}`} />
                      </div>
                    </div>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isSelectorOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden"
                        >
                          {/* Search bar inside dropdown */}
                          <div className="p-3 border-b border-slate-800 bg-slate-950/60 sticky top-0">
                            <div className="relative">
                              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                              <input
                                type="text"
                                autoFocus
                                placeholder="Search by name, phone, course, or ID..."
                                value={admissionSearch}
                                onChange={(e) => setAdmissionSearch(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                              />
                            </div>
                          </div>

                          {/* Options list */}
                          <div className="max-h-64 overflow-y-auto divide-y divide-slate-800/60">
                            {filteredAdmissions.length > 0 ? (
                              filteredAdmissions.map((adm) => {
                                const id = adm.admission_id || adm.admissionId || adm.id;
                                const isSelected = String(formData.admissionId) === String(id);
                                const name =
                                  adm.student_name ||
                                  adm.student?.student_name ||
                                  adm.studentName ||
                                  `Student #${adm.student_id || ""}`;
                                const course =
                                  adm.course_name ||
                                  adm.course?.course_name ||
                                  adm.courseName ||
                                  "Standard Course";
                                const contact = adm.phone1 || adm.student?.phone1 || adm.whatsapp || "";

                                return (
                                  <div
                                    key={id}
                                    onClick={() => handleSelectAdmission(adm)}
                                    className={`p-3 px-4 flex items-center justify-between cursor-pointer transition ${
                                      isSelected
                                        ? "bg-sky-500/20 text-sky-200"
                                        : "hover:bg-slate-800/60 text-slate-200"
                                    }`}
                                  >
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="font-semibold text-sm text-white truncate">{name}</span>
                                        <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-sky-400 font-mono">
                                          #{id}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                                        <span className="truncate">{course}</span>
                                        {contact && <span>• {contact}</span>}
                                      </div>
                                    </div>
                                    {isSelected && <Check size={16} className="text-sky-400 shrink-0 ml-2" />}
                                  </div>
                                );
                              })
                            ) : (
                              <div className="p-6 text-center text-slate-400 text-sm">
                                No admissions found matching "{admissionSearch}"
                              </div>
                            )}
                          </div>

                          {/* Fallback Direct ID Input */}
                          <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                            <span>Or enter raw ID manually:</span>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                placeholder="ID"
                                value={formData.admissionId}
                                onChange={(e) => setFormData((p) => ({ ...p, admissionId: e.target.value }))}
                                className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs focus:border-sky-500 focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => setIsSelectorOpen(false)}
                                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Selected Student Information Card */}
                  {selectedAdmission && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between text-slate-400 font-medium">
                        <span className="flex items-center gap-1.5 text-sky-400">
                          <User size={14} /> Student Profile
                        </span>
                        <span>Admission #{formData.admissionId}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-slate-300">
                        <div>
                          <span className="text-slate-500">Name:</span>{" "}
                          <strong className="text-white">
                            {selectedAdmission.student_name || selectedAdmission.student?.student_name || "N/A"}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-500">Course:</span>{" "}
                          <span className="text-sky-300">
                            {selectedAdmission.course_name || selectedAdmission.course?.course_name || "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500">Phone:</span>{" "}
                          {selectedAdmission.phone1 || selectedAdmission.whatsapp || "N/A"}
                        </div>
                        <div>
                          <span className="text-slate-500">Admission Date:</span>{" "}
                          {selectedAdmission.admission_date || selectedAdmission.admissionDate || "N/A"}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Marks Entry Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Theory Marks */}
                    <div className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800/80 space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                        Theory Marks
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[11px] text-slate-400 block mb-1">Obtained</span>
                          <input
                            type="number"
                            name="theoryMarks"
                            placeholder="e.g. 42"
                            value={formData.theoryMarks}
                            onChange={handleChange}
                            min="0"
                            max={formData.totalTheoryMarks || "100"}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                          />
                        </div>
                        <div>
                          <span className="text-[11px] text-slate-400 block mb-1">Out of (Max)</span>
                          <input
                            type="number"
                            name="totalTheoryMarks"
                            placeholder="50"
                            value={formData.totalTheoryMarks}
                            onChange={handleChange}
                            min="1"
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Practical Marks */}
                    <div className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800/80 space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                        Practical Marks
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[11px] text-slate-400 block mb-1">Obtained</span>
                          <input
                            type="number"
                            name="practicalMarks"
                            placeholder="e.g. 45"
                            value={formData.practicalMarks}
                            onChange={handleChange}
                            min="0"
                            max={formData.totalPracticalMarks || "100"}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                          />
                        </div>
                        <div>
                          <span className="text-[11px] text-slate-400 block mb-1">Out of (Max)</span>
                          <input
                            type="number"
                            name="totalPracticalMarks"
                            placeholder="50"
                            value={formData.totalPracticalMarks}
                            onChange={handleChange}
                            min="1"
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Result Date */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Result / Evaluation Date
                    </label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="date"
                        name="resultDate"
                        value={formData.resultDate}
                        onChange={handleChange}
                        className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  {/* Form Action Buttons */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={loading.saving}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-sky-500/20 cursor-pointer disabled:opacity-50"
                    >
                      <Save size={18} />
                      {loading.saving
                        ? "Processing..."
                        : editingId
                        ? "Update Result Record"
                        : "Save Examination Result"}
                    </button>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-medium transition cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Live Performance & Grade Preview (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
                    <Sparkles size={18} />
                    Live Performance Preview
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    Real-time
                  </span>
                </div>

                {/* Main Grade & Score Card */}
                <div className={`p-6 rounded-2xl border ${calculation.gradeColor} transition-all space-y-4 text-center`}>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Computed Grade</p>
                  <div className="text-4xl font-extrabold tracking-tight">
                    {calculation.grade}
                  </div>

                  {calculation.hasMarks && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/60 border border-slate-700/50">
                      {calculation.passed ? (
                        <CheckCircle2 size={14} className="text-emerald-400" />
                      ) : (
                        <XCircle size={14} className="text-rose-400" />
                      )}
                      <span className={calculation.statusColor}>{calculation.status}</span>
                    </div>
                  )}
                </div>

                {/* Score Breakdown Metrics */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400">Total Marks Obtained</span>
                    <span className="font-bold text-white text-base">
                      {calculation.totalObtained}{" "}
                      <span className="text-xs text-slate-500 font-normal">/ {calculation.maxTotal}</span>
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400">Overall Percentage</span>
                    <span className="font-bold text-sky-300 text-base">
                      {calculation.percentage !== null ? `${calculation.percentage}%` : "—"}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  {calculation.percentage !== null && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Score Progress</span>
                        <span>{calculation.percentage}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            calculation.percentage >= 75
                              ? "bg-gradient-to-r from-sky-400 to-emerald-400"
                              : calculation.percentage >= 40
                              ? "bg-gradient-to-r from-sky-400 to-cyan-400"
                              : "bg-rose-500"
                          }`}
                          style={{ width: `${Math.min(100, Math.max(0, calculation.percentage))}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* CNAT Standard Grading Scale Reference */}
                <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-800/60 space-y-2.5">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap size={14} className="text-sky-400" /> Grading Scale Reference
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-400">
                    <div><strong className="text-amber-400 font-mono">O:</strong> 90% - 100%</div>
                    <div><strong className="text-emerald-400 font-mono">A+:</strong> 80% - 89.9%</div>
                    <div><strong className="text-sky-400 font-mono">A:</strong> 70% - 79.9%</div>
                    <div><strong className="text-cyan-400 font-mono">B+:</strong> 60% - 69.9%</div>
                    <div><strong className="text-indigo-400 font-mono">B:</strong> 50% - 59.9%</div>
                    <div><strong className="text-yellow-400 font-mono">C:</strong> 40% - 49.9% (Pass)</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Results Directory & Analytics Table */}
        {activeTab === "directory" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Filter and Control Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by student name, admission ID, course, or contact..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Filters & Export */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Course Filter */}
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer"
                >
                  <option value="ALL">All Courses</option>
                  {courses.map((c) => (
                    <option key={c.id || c.course_name} value={c.course_name || c.name}>
                      {c.course_name || c.name}
                    </option>
                  ))}
                </select>

                {/* Grade Filter */}
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer"
                >
                  <option value="ALL">All Grades</option>
                  <option value="O">O (Outstanding)</option>
                  <option value="A+">A+ (Excellent)</option>
                  <option value="A">A (Very Good)</option>
                  <option value="B+">B+ (Good)</option>
                  <option value="B">B (Fair)</option>
                  <option value="C">C (Pass)</option>
                  <option value="F">F (Fail)</option>
                </select>

                {/* Sort Order */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer"
                >
                  <option value="newest">Date: Newest First</option>
                  <option value="oldest">Date: Oldest First</option>
                  <option value="highest">Percentage: Highest</option>
                  <option value="lowest">Percentage: Lowest</option>
                  <option value="name">Student Name (A-Z)</option>
                </select>

                {/* Export Excel Button */}
                <button
                  onClick={handleExportExcel}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-sm font-medium transition cursor-pointer"
                  title="Export to Excel"
                >
                  <Download size={15} />
                  Excel
                </button>
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              {loading.results ? (
                <div className="py-20 text-center text-slate-400 space-y-3">
                  <RefreshCw size={32} className="animate-spin text-sky-400 mx-auto" />
                  <p className="text-sm">Loading examination results...</p>
                </div>
              ) : filteredResults.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-950 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="py-3.5 px-4"># ID</th>
                        <th className="py-3.5 px-4">Student &amp; Course</th>
                        <th className="py-3.5 px-4">Theory</th>
                        <th className="py-3.5 px-4">Practical</th>
                        <th className="py-3.5 px-4">Total Marks</th>
                        <th className="py-3.5 px-4">Percentage</th>
                        <th className="py-3.5 px-4">Grade</th>
                        <th className="py-3.5 px-4">Date</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredResults.map((item) => (
                        <tr key={item.id || item.result_id || `${item.admId}_${item.resultDate}`} className="hover:bg-slate-800/40 transition">
                          <td className="py-3.5 px-4 font-mono font-bold text-sky-400">
                            #{item.admId}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-white">{item.studentName}</div>
                            <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>{item.courseName}</span>
                              {item.phone !== "N/A" && <span>• {item.phone}</span>}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="text-white font-medium">{item.theoryMarks}</span>
                            <span className="text-xs text-slate-500"> / {item.totalTheoryMarks}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="text-white font-medium">{item.practicalMarks}</span>
                            <span className="text-xs text-slate-500"> / {item.totalPracticalMarks}</span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-white">
                            {item.totalObtained}
                            <span className="text-xs text-slate-500 font-normal"> / {item.maxTotal}</span>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-sky-300">
                            {item.percentage}%
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                item.grade === "O"
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                  : item.grade === "A+"
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                  : item.grade === "A"
                                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                                  : item.grade === "B+" || item.grade === "B"
                                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                                  : item.grade === "C"
                                  ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                                  : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                              }`}
                            >
                              {item.grade}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-400">
                            {item.resultDate}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              {/* Direct Certificate Generator / View Link */}
                              <Link
                                to={`/certificates/${item.admId}`}
                                className="p-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 transition"
                                title="View Certificate"
                              >
                                <FileText size={15} />
                              </Link>
                              <button
                                onClick={() => handleEditResult(item)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                                title="Edit Result"
                              >
                                <Edit size={15} />
                              </button>
                              <button
                                onClick={() => handleDeleteResult(item)}
                                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition cursor-pointer"
                                title="Delete Result"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-16 text-center space-y-3">
                  <BookOpen size={36} className="text-slate-600 mx-auto" />
                  <h3 className="text-lg font-semibold text-slate-300">No results found</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    {searchTerm || courseFilter !== "ALL" || gradeFilter !== "ALL"
                      ? "No records matched your search filters. Try adjusting your query."
                      : "Start by recording examination marks in the 'Record New Result' tab."}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Developer Tools / JSON Inspector */}
        <div className="pt-4 border-t border-slate-800/80">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
                <Code2 size={15} />
                Developer Debugging Console
              </div>
              <button
                onClick={() => setShowDevTools(!showDevTools)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer"
              >
                {showDevTools ? "Hide Console" : "Inspect Payload & State"}
              </button>
            </div>

            {showDevTools && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="grid md:grid-cols-3 gap-4 text-xs mt-3 pt-3 border-t border-slate-800"
              >
                <div>
                  <div className="text-slate-400 font-semibold mb-1">Active Form State</div>
                  <pre className="bg-black/80 border border-slate-800 p-3 rounded-xl text-emerald-400 overflow-x-auto max-h-48 font-mono text-[11px]">
                    {JSON.stringify(formData, null, 2)}
                  </pre>
                </div>

                <div>
                  <div className="text-slate-400 font-semibold mb-1">Calculated Metrics</div>
                  <pre className="bg-black/80 border border-slate-800 p-3 rounded-xl text-cyan-400 overflow-x-auto max-h-48 font-mono text-[11px]">
                    {JSON.stringify(calculation, null, 2)}
                  </pre>
                </div>

                <div>
                  <div className="text-slate-400 font-semibold mb-1">Selected Admission Record</div>
                  <pre className="bg-black/80 border border-slate-800 p-3 rounded-xl text-amber-400 overflow-x-auto max-h-48 font-mono text-[11px]">
                    {JSON.stringify(selectedAdmission || { info: "No admission selected" }, null, 2)}
                  </pre>
                </div>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
