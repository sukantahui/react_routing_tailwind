// src/components/certificates/AdminCertificatesList.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import {
  Award,
  Search,
  Printer,
  Download,
  RefreshCw,
  FileText,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Filter,
  Copy,
  Check,
  Eye,
  Calendar,
  User,
  BookOpen,
  Sparkles,
  ArrowUpDown,
  ChevronDown,
  X,
  SlidersHorizontal,
  GraduationCap
} from "lucide-react";
import { certificateService } from "../../services/certificateService";
import CertificateCanvas from "../../common/CertificateCanvas";
import CNATLogo from "../../assets/cnat.png";

export default function AdminCertificatesList() {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("ALL");
  const [gradeFilter, setGradeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortField, setSortField] = useState("issueDate"); // 'issueDate' | 'studentName' | 'certNo' | 'grade'
  const [sortOrder, setSortOrder] = useState("desc"); // 'desc' | 'asc'
  const [copiedId, setCopiedId] = useState(null);
  const [previewCert, setPreviewCert] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Original Diploma Certificate Modal State
  const [originalCertModal, setOriginalCertModal] = useState(null);
  const originalCertCanvasRef = useRef(null);

  // Canvas Assets
  const [bgImage, setBgImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [instructorSignImage, setInstructorSignImage] = useState(null);
  const [directorSignImage, setDirectorSignImage] = useState(null);

  useEffect(() => {
    const bg = new Image();
    bg.onload = () => setBgImage(bg);
    bg.src = "/assets/certificate-bg.png";

    const logo = new Image();
    logo.onload = () => setLogoImage(logo);
    logo.src = "/assets/cnat.png";

    const s1 = new Image();
    s1.onload = () => setInstructorSignImage(s1);
    s1.src = "/assets/instructor-sign.png";

    const s2 = new Image();
    s2.onload = () => setDirectorSignImage(s2);
    s2.src = "/assets/director-sign.png";
  }, []);

  // Fetch all certificates
  const loadCertificates = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await certificateService.getAll();
      const list = Array.isArray(res) ? res : res?.data || [];
      setCertificates(list);
    } catch (err) {
      console.error("Failed to load certificates:", err);
      setError("Failed to load certificate records from the server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  // Helper getters for robust field extraction (dual camelCase / snake_case)
  const getCertNo = (c) => c?.certificateNumber || c?.certificate_number || c?.code || `CERT-${c?.id || ""}`;
  const getStudentName = (c) => c?.student?.studentName || c?.student?.student_name || c?.admission?.student?.studentName || c?.admission?.student?.student_name || "—";
  const getRegNo = (c) => c?.student?.registrationNumber || c?.student?.registration_no || c?.admission?.student?.registrationNumber || c?.admission?.student?.registration_no || "—";
  const getCourseName = (c) => c?.course?.courseName || c?.course?.course_name || c?.admission?.course?.courseName || c?.admission?.course?.course_name || "—";
  const getCourseCode = (c) => c?.course?.courseCode || c?.course?.course_code || c?.admission?.course?.courseCode || c?.admission?.course?.course_code || "—";
  const getIssueDate = (c) => c?.issueDate || c?.issue_date || c?.createdAt || c?.created_at || "—";
  const getAdmissionNo = (c) => c?.admission?.admissionNumber || c?.admission?.admission_number || c?.admissionNumber || "—";

  const getBestResult = (c) => {
    const results = c?.results || c?.result || c?.admission?.results || [];
    if (!results || !Array.isArray(results) || results.length === 0) {
      if (typeof results === "object" && results !== null && (results.grade || results.theoryMarks)) {
        return results;
      }
      return null;
    }
    return results[results.length - 1]; // Latest/highest attempt
  };

  const getGrade = (c) => {
    const res = getBestResult(c);
    return res?.grade || c?.grade || "A";
  };

  const isPassed = (c) => {
    const res = getBestResult(c);
    if (res && res.isPassed !== undefined) return Boolean(res.isPassed);
    if (res && res.is_passed !== undefined) return Boolean(res.is_passed);
    return true; // Default authentic certificates are passing
  };

  // Distinct courses for dropdown
  const uniqueCourses = useMemo(() => {
    const set = new Set();
    certificates.forEach((c) => {
      const cName = getCourseName(c);
      if (cName && cName !== "—") set.add(cName);
    });
    return Array.from(set).sort();
  }, [certificates]);

  // Distinct grades for dropdown
  const uniqueGrades = useMemo(() => {
    const set = new Set();
    certificates.forEach((c) => {
      const g = getGrade(c);
      if (g && g !== "—") set.add(g);
    });
    return Array.from(set).sort();
  }, [certificates]);

  // Filtered & Sorted Certificates
  const filteredCertificates = useMemo(() => {
    return certificates
      .filter((c) => {
        const certNo = getCertNo(c).toLowerCase();
        const sName = getStudentName(c).toLowerCase();
        const regNo = getRegNo(c).toLowerCase();
        const admNo = getAdmissionNo(c).toLowerCase();
        const cName = getCourseName(c).toLowerCase();
        const term = searchTerm.trim().toLowerCase();

        const matchesSearch =
          !term ||
          certNo.includes(term) ||
          sName.includes(term) ||
          regNo.includes(term) ||
          admNo.includes(term) ||
          cName.includes(term);

        const matchesCourse = courseFilter === "ALL" || getCourseName(c) === courseFilter;
        const matchesGrade = gradeFilter === "ALL" || getGrade(c) === gradeFilter;
        const matchesStatus =
          statusFilter === "ALL" ||
          (statusFilter === "PASSED" && isPassed(c)) ||
          (statusFilter === "FAILED" && !isPassed(c));

        return matchesSearch && matchesCourse && matchesGrade && matchesStatus;
      })
      .sort((a, b) => {
        let valA = "";
        let valB = "";

        if (sortField === "issueDate") {
          valA = getIssueDate(a);
          valB = getIssueDate(b);
        } else if (sortField === "studentName") {
          valA = getStudentName(a).toLowerCase();
          valB = getStudentName(b).toLowerCase();
        } else if (sortField === "certNo") {
          valA = getCertNo(a).toLowerCase();
          valB = getCertNo(b).toLowerCase();
        } else if (sortField === "grade") {
          valA = getGrade(a);
          valB = getGrade(b);
        }

        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [certificates, searchTerm, courseFilter, gradeFilter, statusFilter, sortField, sortOrder]);

  // KPI Metrics
  const metrics = useMemo(() => {
    const total = certificates.length;
    const passedCount = certificates.filter((c) => isPassed(c)).length;
    const topGradeCount = certificates.filter((c) => ["A+", "A", "Distinction"].includes(getGrade(c))).length;
    const distinctCourses = uniqueCourses.length;

    return {
      total,
      passedCount,
      passRate: total > 0 ? Math.round((passedCount / total) * 100) : 100,
      topGradeCount,
      distinctCourses,
    };
  }, [certificates, uniqueCourses]);

  // Copy share link
  const handleCopyLink = (certNo) => {
    const url = `${window.location.origin}/certificates/${certNo}`;
    navigator.clipboard.writeText(url);
    setCopiedId(certNo);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Open Preview Modal
  const handleOpenPreview = async (cert) => {
    const certCode = getCertNo(cert);
    setPreviewLoading(true);
    setPreviewCert(cert);
    try {
      // Try fetching deep details if needed
      const full = await certificateService.getByCode(certCode);
      if (full?.data || full?.certificateNumber || full?.student) {
        setPreviewCert(full?.data || full);
      }
    } catch (e) {
      console.warn("Using baseline preview cert data:", e);
    } finally {
      setPreviewLoading(false);
    }
  };

  // Export to Excel
  const handleExportExcel = () => {
    if (filteredCertificates.length === 0) {
      Swal.fire({ icon: "info", title: "No Data", text: "There are no certificate records to export." });
      return;
    }

    const dataToExport = filteredCertificates.map((c, idx) => {
      const best = getBestResult(c);
      return {
        "SL No": idx + 1,
        "Certificate No": getCertNo(c),
        "Student Name": getStudentName(c),
        "Registration No": getRegNo(c),
        "Admission No": getAdmissionNo(c),
        "Course Name": getCourseName(c),
        "Course Code": getCourseCode(c),
        "Issue Date": getIssueDate(c),
        "Theory Marks": best ? `${best.theoryMarks ?? best.theory_marks ?? 0} / ${best.totalTheoryMarks ?? best.total_theory_marks ?? 50}` : "—",
        "Practical Marks": best ? `${best.practicalMarks ?? best.practical_marks ?? 0} / ${best.totalPracticalMarks ?? best.total_practical_marks ?? 50}` : "—",
        "Final Grade": getGrade(c),
        "Status": isPassed(c) ? "Passed / Authentic" : "Failed",
        "Verification Link": `${window.location.origin}/certificates/${getCertNo(c)}`,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Certificates Register");
    XLSX.writeFile(workbook, `CNAT_Certificates_Register_${new Date().toISOString().slice(0, 10)}.xlsx`);

    Swal.fire({
      icon: "success",
      title: "Excel Exported!",
      text: `Exported ${filteredCertificates.length} certificate entries successfully.`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Print Master Register
  const handlePrintMasterRegister = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      
      {/* ── PRINT MEDIA STYLES FOR MASTER AUDIT REGISTER ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          html, body {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 11px !important;
          }
          
          body * {
            visibility: hidden !important;
          }

          #admin-printable-register,
          #admin-printable-register * {
            visibility: visible !important;
          }

          #admin-printable-register {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 10px !important;
            display: block !important;
          }

          nav, header, footer, form, button, .print\\:hidden, [role="navigation"] {
            display: none !important;
            visibility: hidden !important;
          }

          @page {
            size: A4 landscape;
            margin: 8mm;
          }
        }
      `}} />

      {/* ── SCREEN VIEW WRAPPER ── */}
      <div className="max-w-7xl mx-auto space-y-6 print:hidden">

        {/* 1. Header & Quick Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900/90 border border-slate-800 p-5 rounded-3xl backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 flex-shrink-0">
              <Award className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Certificates Master Register
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  Admin Audit
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                Official institutional log of student completion certificates, grades &amp; credentials
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={loadCertificates}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Refresh certificate list"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-amber-400" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              onClick={handleExportExcel}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Download Excel spreadsheet"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Excel</span>
            </button>

            <button
              type="button"
              onClick={handlePrintMasterRegister}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/20 transition flex items-center gap-1.5 cursor-pointer"
              title="Print master register table"
            >
              <Printer className="w-4 h-4" />
              <span>Print Register</span>
            </button>

            <Link
              to="/certificates/issue"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/40 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Issue New</span>
            </Link>
          </div>
        </div>

        {/* Error Alert Banner */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={loadCertificates}
              className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-semibold cursor-pointer transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* 2. KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Total Registered</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white font-mono">{metrics.total}</span>
              <span className="text-[10px] text-amber-400 font-semibold">Certificates</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Authentic &amp; Passed</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-emerald-400 font-mono">{metrics.passedCount}</span>
              <span className="text-[10px] text-emerald-400/80 font-semibold">({metrics.passRate}%)</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Grade A+ / A</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-amber-300 font-mono">{metrics.topGradeCount}</span>
              <span className="text-[10px] text-slate-400 font-semibold">Excellence</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Courses Covered</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-sky-400 font-mono">{metrics.distinctCourses}</span>
              <span className="text-[10px] text-sky-400/80 font-semibold">Curriculums</span>
            </div>
          </div>
        </div>

        {/* 3. Search & Filter Controls */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex flex-col lg:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Certificate No (CNAT-...), Student Name, Reg No, or Admission No..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 font-mono transition"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Course Filter Dropdown */}
            <div className="w-full lg:w-48">
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700/80 text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="ALL">All Courses ({uniqueCourses.length})</option>
                {uniqueCourses.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Grade Filter Dropdown */}
            <div className="w-full lg:w-36">
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700/80 text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="ALL">All Grades</option>
                {uniqueGrades.map((g) => (
                  <option key={g} value={g}>Grade: {g}</option>
                ))}
              </select>
            </div>

            {/* Sort Field & Order */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="flex-1 lg:flex-initial px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700/80 text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="issueDate">Sort: Issue Date</option>
                <option value="studentName">Sort: Student Name</option>
                <option value="certNo">Sort: Certificate No</option>
                <option value="grade">Sort: Grade</option>
              </select>

              <button
                type="button"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="p-2 rounded-xl bg-slate-950 border border-slate-700/80 hover:bg-slate-800 text-slate-300 transition cursor-pointer"
                title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Quick Active Filter Chips */}
          {(searchTerm || courseFilter !== "ALL" || gradeFilter !== "ALL") && (
            <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap pt-1 border-t border-slate-800/80">
              <span className="font-semibold text-slate-500">Active Filters:</span>
              {searchTerm && (
                <span className="px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                  Query: {searchTerm}
                  <button type="button" onClick={() => setSearchTerm("")}><X className="w-3 h-3 cursor-pointer" /></button>
                </span>
              )}
              {courseFilter !== "ALL" && (
                <span className="px-2 py-0.5 rounded-lg bg-sky-500/10 text-sky-300 border border-sky-500/20 flex items-center gap-1">
                  Course: {courseFilter}
                  <button type="button" onClick={() => setCourseFilter("ALL")}><X className="w-3 h-3 cursor-pointer" /></button>
                </span>
              )}
              {gradeFilter !== "ALL" && (
                <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                  Grade: {gradeFilter}
                  <button type="button" onClick={() => setGradeFilter("ALL")}><X className="w-3 h-3 cursor-pointer" /></button>
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setCourseFilter("ALL");
                  setGradeFilter("ALL");
                }}
                className="text-amber-400 hover:underline ml-auto font-medium cursor-pointer"
              >
                Reset all
              </button>
            </div>
          )}
        </div>

        {/* 4. Main Registry Table */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-2xl">
          
          {/* Table Header Bar */}
          <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Certificate Entries</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-slate-800 text-amber-400">
                {filteredCertificates.length} records
              </span>
            </div>
            <span className="text-xs text-slate-400">
              Showing {filteredCertificates.length} of {certificates.length} total entries
            </span>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800 text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-3.5 text-center font-bold">#</th>
                  <th className="px-4 py-3.5 text-left font-bold">Certificate Number</th>
                  <th className="px-4 py-3.5 text-left font-bold">Student Name &amp; Reg No</th>
                  <th className="px-4 py-3.5 text-left font-bold">Course / Program</th>
                  <th className="px-4 py-3.5 text-center font-bold">Grade &amp; Result</th>
                  <th className="px-4 py-3.5 text-center font-bold">Issue Date</th>
                  <th className="px-4 py-3.5 text-right font-bold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <RefreshCw className="w-7 h-7 animate-spin text-amber-400" />
                        <span className="font-semibold text-sm">Loading certificate database...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredCertificates.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Award className="w-10 h-10 text-slate-600" />
                        <span className="font-semibold text-base text-slate-300">No certificates found</span>
                        <p className="text-xs text-slate-500 max-w-sm">
                          {searchTerm || courseFilter !== "ALL" || gradeFilter !== "ALL"
                            ? "Try adjusting your search terms or filters."
                            : "No certificates have been issued yet. Click 'Issue New' to generate the first certificate."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCertificates.map((cert, idx) => {
                    const certNo = getCertNo(cert);
                    const sName = getStudentName(cert);
                    const regNo = getRegNo(cert);
                    const cName = getCourseName(cert);
                    const cCode = getCourseCode(cert);
                    const issueDate = getIssueDate(cert);
                    const grade = getGrade(cert);
                    const passed = isPassed(cert);
                    const best = getBestResult(cert);
                    const th = best ? (best.theoryMarks ?? best.theory_marks ?? "—") : "—";
                    const pr = best ? (best.practicalMarks ?? best.practical_marks ?? "—") : "—";

                    return (
                      <tr key={cert.id || certNo || idx} className="hover:bg-slate-800/50 transition">
                        
                        {/* 1. SL Index */}
                        <td className="px-4 py-3.5 text-center font-mono text-slate-500">
                          {idx + 1}
                        </td>

                        {/* 2. Certificate Serial */}
                        <td className="px-4 py-3.5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 font-mono font-bold text-amber-300">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                              <span>{certNo}</span>
                              <button
                                type="button"
                                onClick={() => handleCopyLink(certNo)}
                                className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
                                title="Copy public verification link"
                              >
                                {copiedId === certNo ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              Adm: {getAdmissionNo(cert)}
                            </span>
                          </div>
                        </td>

                        {/* 3. Student Details */}
                        <td className="px-4 py-3.5">
                          <div className="space-y-0.5">
                            <span className="font-bold text-white text-sm block">{sName}</span>
                            <span className="text-[11px] text-slate-400 font-mono block">
                              Reg: <span className="text-slate-300">{regNo}</span>
                            </span>
                          </div>
                        </td>

                        {/* 4. Course Program */}
                        <td className="px-4 py-3.5">
                          <div className="space-y-0.5 max-w-xs">
                            <span className="font-semibold text-slate-200 block truncate" title={cName}>
                              {cName}
                            </span>
                            {cCode && cCode !== "—" && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono inline-block">
                                {cCode}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* 5. Grade & Score */}
                        <td className="px-4 py-3.5 text-center">
                          <div className="inline-flex flex-col items-center gap-0.5">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-black font-mono bg-amber-400 text-slate-950 shadow-sm">
                              Grade {grade}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              Th: {th} | Pr: {pr}
                            </span>
                          </div>
                        </td>

                        {/* 6. Issue Date */}
                        <td className="px-4 py-3.5 text-center text-slate-300 font-mono text-[11px]">
                          {issueDate}
                        </td>

                        {/* 7. Action Buttons */}
                        <td className="px-4 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            
                            {/* Preview Modal Button */}
                            <button
                              type="button"
                              onClick={() => handleOpenPreview(cert)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
                              title="Quick Inspect Certificate"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {/* Direct Public Verification Link */}
                            <Link
                              to={`/certificates/${encodeURIComponent(certNo)}`}
                              target="_blank"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition"
                              title="Open Public Verification Page"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>

                            {/* Direct Print Verification Link */}
                            <Link
                              to={`/certificates/${encodeURIComponent(certNo)}`}
                              target="_blank"
                              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-sky-300 border border-slate-700 transition flex items-center gap-1 text-[11px]"
                              title="Print Verification Statement & Evaluation Results"
                            >
                              <FileText className="w-3 h-3" />
                              <span>Verify</span>
                            </Link>

                            {/* Direct Original Diploma Certificate Print Button */}
                            <button
                              type="button"
                              onClick={() => setOriginalCertModal(cert)}
                              className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold transition flex items-center gap-1 text-[11px] cursor-pointer"
                              title="Print Official Original Diploma Certificate"
                            >
                              <Award className="w-3 h-3" />
                              <span>Original</span>
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
        </div>

      </div>

      {/* ── MASTER PRINTABLE REGISTER (Rendered only on print) ── */}
      <div id="admin-printable-register" className="hidden print:block text-black bg-white">
        
        {/* Official Header */}
        <div className="border-b-2 border-amber-800 pb-3 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={CNATLogo} alt="CNAT Logo" className="h-10 w-auto object-contain" />
            <div>
              <h1 className="text-xl font-bold font-serif text-amber-900 tracking-wide uppercase">
                Coder &amp; AccoTax
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                An ISO 9001:2015 Certified Educational Institution • Barrackpore, Kolkata
              </p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Master Certificates Registry &amp; Audit Log
            </h2>
            <p className="text-[10px] text-slate-500">
              Generated on: {new Date().toLocaleString()} • Total Records: {filteredCertificates.length}
            </p>
          </div>
        </div>

        {/* Audit Table */}
        <table className="min-w-full border-collapse border border-slate-400 text-[10px]">
          <thead>
            <tr className="bg-amber-100/80 text-slate-900 font-bold">
              <th className="border border-slate-400 px-2 py-1.5 text-center">SL</th>
              <th className="border border-slate-400 px-2 py-1.5 text-left">Certificate No.</th>
              <th className="border border-slate-400 px-2 py-1.5 text-left">Student Name</th>
              <th className="border border-slate-400 px-2 py-1.5 text-left">Reg. No</th>
              <th className="border border-slate-400 px-2 py-1.5 text-left">Course Name</th>
              <th className="border border-slate-400 px-2 py-1.5 text-center">Theory</th>
              <th className="border border-slate-400 px-2 py-1.5 text-center">Practical</th>
              <th className="border border-slate-400 px-2 py-1.5 text-center">Grade</th>
              <th className="border border-slate-400 px-2 py-1.5 text-center">Issue Date</th>
              <th className="border border-slate-400 px-2 py-1.5 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCertificates.map((c, idx) => {
              const best = getBestResult(c);
              const th = best ? `${best.theoryMarks ?? best.theory_marks ?? 0}/${best.totalTheoryMarks ?? best.total_theory_marks ?? 50}` : "—";
              const pr = best ? `${best.practicalMarks ?? best.practical_marks ?? 0}/${best.totalPracticalMarks ?? best.total_practical_marks ?? 50}` : "—";
              return (
                <tr key={idx} className={idx % 2 === 1 ? "bg-slate-50" : "bg-white"}>
                  <td className="border border-slate-300 px-2 py-1 text-center font-mono">{idx + 1}</td>
                  <td className="border border-slate-300 px-2 py-1 font-mono font-bold text-slate-900">{getCertNo(c)}</td>
                  <td className="border border-slate-300 px-2 py-1 font-bold">{getStudentName(c)}</td>
                  <td className="border border-slate-300 px-2 py-1 font-mono">{getRegNo(c)}</td>
                  <td className="border border-slate-300 px-2 py-1">{getCourseName(c)}</td>
                  <td className="border border-slate-300 px-2 py-1 text-center font-mono">{th}</td>
                  <td className="border border-slate-300 px-2 py-1 text-center font-mono">{pr}</td>
                  <td className="border border-slate-300 px-2 py-1 text-center font-bold font-mono">{getGrade(c)}</td>
                  <td className="border border-slate-300 px-2 py-1 text-center font-mono">{getIssueDate(c)}</td>
                  <td className="border border-slate-300 px-2 py-1 text-center font-semibold text-emerald-800">
                    {isPassed(c) ? "Passed" : "Failed"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Audit Signature Section */}
        <div className="grid grid-cols-3 gap-8 pt-10 mt-6 border-t border-slate-300 text-center text-xs">
          <div>
            <div className="border-t border-slate-500 pt-1 font-semibold">Prepared By (Admin)</div>
            <p className="text-[10px] text-slate-500">Registry Controller</p>
          </div>
          <div>
            <div className="border-t border-slate-500 pt-1 font-semibold">Verified By (Faculty)</div>
            <p className="text-[10px] text-slate-500">Department of Examination</p>
          </div>
          <div>
            <div className="border-t border-slate-500 pt-1 font-semibold">Authorized Signatory</div>
            <p className="text-[10px] text-slate-500">Director, Coder &amp; AccoTax</p>
          </div>
        </div>

      </div>

      {/* ── MODAL 1: QUICK INSPECTION & VERIFICATION PREVIEW ── */}
      {previewCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150 print:hidden"
          onClick={() => setPreviewCert(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Certificate Inspection: <span className="font-mono text-amber-300">{getCertNo(previewCert)}</span>
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewCert(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase font-semibold text-[10px]">Student Name</span>
                <p className="text-white font-bold text-sm">{getStudentName(previewCert)}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase font-semibold text-[10px]">Registration No</span>
                <p className="text-amber-300 font-mono font-bold">{getRegNo(previewCert)}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase font-semibold text-[10px]">Course Title</span>
                <p className="text-slate-200 font-semibold">{getCourseName(previewCert)}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase font-semibold text-[10px]">Certified Grade</span>
                <p className="text-emerald-400 font-black font-mono text-sm">Grade {getGrade(previewCert)} (Passed)</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase font-semibold text-[10px]">Admission No</span>
                <p className="text-slate-300 font-mono">{getAdmissionNo(previewCert)}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase font-semibold text-[10px]">Issue Date</span>
                <p className="text-slate-300 font-mono">{getIssueDate(previewCert)}</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800 flex-wrap">
              <button
                type="button"
                onClick={() => handleCopyLink(getCertNo(previewCert))}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedId === getCertNo(previewCert) ? "Link Copied!" : "Copy Verification Link"}</span>
              </button>

              <div className="flex items-center gap-2">
                <Link
                  to={`/certificates/${encodeURIComponent(getCertNo(previewCert))}`}
                  target="_blank"
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Print Verification &amp; Result</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    const certToOpen = previewCert;
                    setPreviewCert(null);
                    setOriginalCertModal(certToOpen);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-md shadow-amber-500/20 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Print Original Certificate</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── MODAL 2: ORIGINAL DIPLOMA CERTIFICATE PRINT / EXPORT MODAL ── */}
      {originalCertModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150 print:hidden overflow-y-auto"
          onClick={() => setOriginalCertModal(null)}
        >
          <div
            className="relative max-w-xl w-full bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl space-y-4 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Original Student Certificate</h3>
                  <p className="text-[11px] text-slate-400">Formal ISO 9001:2015 Diploma Document</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOriginalCertModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Canvas Preview Container */}
            <div className="bg-black/60 rounded-2xl p-2 border border-slate-800 flex justify-center max-h-[60vh] overflow-y-auto">
              <CertificateCanvas
                ref={originalCertCanvasRef}
                name={getStudentName(originalCertModal)}
                course={getCourseName(originalCertModal)}
                date={getIssueDate(originalCertModal)}
                duration={originalCertModal?.course?.duration || "120 Hours"}
                instructor="Sukanta Hui"
                director="Tanusree Hui"
                certNumber={getCertNo(originalCertModal)}
                bgImage={bgImage}
                logoImage={logoImage}
                instructorSignImage={instructorSignImage}
                directorSignImage={directorSignImage}
              />
            </div>

            {/* Modal Action Buttons */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => originalCertCanvasRef.current?.downloadPdf()}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                  title="Download A4 PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => originalCertCanvasRef.current?.downloadJpg()}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                  title="Download High-Res JPG"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Image</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => originalCertCanvasRef.current?.print()}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/20 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Original Certificate</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
