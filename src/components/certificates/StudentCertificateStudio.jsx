import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  Award,
  Sparkles,
  Download,
  Printer,
  FileText,
  Search,
  User,
  Calendar,
  Clock,
  RefreshCw,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Sliders,
  Check,
  X,
  ArrowLeft,
  GraduationCap,
  Code2,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  ChevronRight,
  Layers,
  Save
} from "lucide-react";

import CertificateCanvas from "../../common/CertificateCanvas";
import { studentService } from "../../services/studentService";
import { admissionService } from "../../services/admissionService";
import { resultService } from "../../services/resultService";
import { certificateService } from "../../services/certificateService";
import { courseService } from "../../services/courseService";

// Helper robust extractors
const getAdmissionId = (adm) => {
  if (!adm) return "";
  return String(
    adm.admission_id ||
    adm.admissionId ||
    adm.admissions_id ||
    adm.id ||
    adm._id ||
    ""
  );
};

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

const getResultAdmissionId = (r) => {
  if (!r) return "";
  return String(
    r.admission_id ||
    r.admissionId ||
    r.admissions_id ||
    r.admission?.id ||
    r.admission?.admission_id ||
    r.admission?.admissionId ||
    r.admission?.admissions_id ||
    (typeof r.admission === "number" ? r.admission : "") ||
    ""
  );
};

const getStudentId = (stu) => {
  if (!stu) return "";
  return String(
    stu.student_id ||
    stu.studentId ||
    stu.id ||
    stu._id ||
    ""
  );
};

const getAdmissionStudentId = (adm) => {
  if (!adm) return "";
  return String(
    adm.student_id ||
    adm.studentId ||
    adm.student?.id ||
    adm.student?.student_id ||
    adm.student?.studentId ||
    (typeof adm.student === "number" ? adm.student : "") ||
    ""
  );
};

// Helper function to generate certificate number
const generateCertificateNo = (admissionId) => {
  const prefix = "CNAT";
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;
  return admissionId ? `${prefix}-${admissionId}-${year}` : `${prefix}-${timestamp}`;
};

// Formats YYYY-MM-DD or date string to "Month DD, YYYY"
const formatHumanDate = (dateStr) => {
  if (!dateStr) return "March 15, 2026";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

export default function StudentCertificateStudio() {
  const [searchParams] = useSearchParams();
  const urlAdmissionId = searchParams.get("admissionId");
  const urlStudentId = searchParams.get("studentId");

  const canvasRef = useRef(null);

  // Stepper State (1: Student, 2: Course Admission, 3: Result & Formalities, 4: Issue & Preview)
  const [currentStep, setCurrentStep] = useState(1);

  // Selected Entities
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedAdmission, setSelectedAdmission] = useState(null);

  // External Data Lists
  const [students, setStudents] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [results, setResults] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // Student Search input
  const [studentSearch, setStudentSearch] = useState("");
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
  const studentPickerRef = useRef(null);

  // Inline Quick "Add Result" Modal state
  const [isAddResultOpen, setIsAddResultOpen] = useState(false);
  const [newResultForm, setNewResultForm] = useState({
    theoryMarks: "",
    practicalMarks: "",
    totalTheoryMarks: "50",
    totalPracticalMarks: "50",
    resultDate: new Date().toISOString().split("T")[0],
  });
  const [savingResult, setSavingResult] = useState(false);

  // Certificate Formalities Form
  const [certForm, setCertForm] = useState({
    name: "Ritaja Ghosh",
    course: "React Development",
    date: "March 15, 2026",
    rawDate: new Date().toISOString().split("T")[0],
    duration: "4 Weeks",
    instructor: "Sukanta Hui",
    director: "Tanusree Hui",
    certNumber: generateCertificateNo(),
  });

  // Canvas Assets
  const [bgImage, setBgImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [instructorSignImage, setInstructorSignImage] = useState(null);
  const [directorSignImage, setDirectorSignImage] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Preview & Zoom controls
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  // Close student dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (studentPickerRef.current && !studentPickerRef.current.contains(e.target)) {
        setIsStudentDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Preload Original Certificate Images
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = 4;
    let hasError = false;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        if (hasError) setLoadError(true);
        setImagesLoaded(true);
      }
    };

    const handleError = (imgName) => {
      console.error(`Failed to load asset: ${imgName}`);
      hasError = true;
      checkAllLoaded();
    };

    const bg = new Image();
    bg.onload = () => { setBgImage(bg); checkAllLoaded(); };
    bg.onerror = () => handleError("/assets/certificate-bg.png");
    bg.src = "/assets/certificate-bg.png";

    const logo = new Image();
    logo.onload = () => { setLogoImage(logo); checkAllLoaded(); };
    logo.onerror = () => handleError("/assets/cnat.png");
    logo.src = "/assets/cnat.png";

    const s1 = new Image();
    s1.onload = () => { setInstructorSignImage(s1); checkAllLoaded(); };
    s1.onerror = () => handleError("/assets/instructor-sign.png");
    s1.src = "/assets/instructor-sign.png";

    const s2 = new Image();
    s2.onload = () => { setDirectorSignImage(s2); checkAllLoaded(); };
    s2.onerror = () => handleError("/assets/director-sign.png");
    s2.src = "/assets/director-sign.png";
  }, []);

  // Fetch live students, admissions, results, courses
  const fetchAllData = async () => {
    setLoadingData(true);
    try {
      const [stuRes, admRes, resRes, crsRes] = await Promise.allSettled([
        studentService.getAll(),
        admissionService.getAll(),
        resultService.getAll(),
        courseService.getAll(),
      ]);

      if (stuRes.status === "fulfilled") {
        const raw = stuRes.value?.data || stuRes.value || [];
        setStudents(Array.isArray(raw) ? raw : (raw.data || []));
      }
      if (admRes.status === "fulfilled") {
        const raw = admRes.value?.data || admRes.value || [];
        setAdmissions(Array.isArray(raw) ? raw : (raw.data || []));
      }
      if (resRes.status === "fulfilled") {
        const raw = resRes.value?.data || resRes.value || [];
        setResults(Array.isArray(raw) ? raw : (raw.data || []));
      }
      if (crsRes.status === "fulfilled") {
        const raw = crsRes.value?.data || crsRes.value || [];
        setCourses(Array.isArray(raw) ? raw : (raw.data || []));
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Auto-select from URL search parameters (?admissionId=... or ?studentId=...)
  useEffect(() => {
    if (!students.length || !admissions.length) return;

    if (urlAdmissionId) {
      const matchedAdm = admissions.find(
        (a) => String(a.id || a.admission_id || a.admissionId) === String(urlAdmissionId)
      );
      if (matchedAdm) {
        const stuId = getAdmissionStudentId(matchedAdm);
        const matchedStu = students.find(
          (s) => String(getStudentId(s)) === String(stuId)
        );
        if (matchedStu) setSelectedStudent(matchedStu);
        setSelectedAdmission(matchedAdm);

        const admId = getAdmissionId(matchedAdm);
        const courseName = getAdmissionCourseName(matchedAdm, courses);
        const admDate = matchedAdm.admission_date || matchedAdm.admissionDate || "";

        const matchedRes = results.find((r) => {
          const rAdmId = getResultAdmissionId(r);
          return String(rAdmId) === String(admId);
        });

        const completionDate =
          matchedRes?.result_date ||
          matchedRes?.resultDate ||
          admDate ||
          new Date().toISOString().split("T")[0];

        const sName = matchedStu
          ? matchedStu.student_name || matchedStu.studentName || matchedStu.name || "Student"
          : "Student";

        setCertForm((prev) => ({
          ...prev,
          name: sName,
          course: courseName || "Certificate Course",
          rawDate: completionDate,
          date: formatHumanDate(completionDate),
          certNumber: generateCertificateNo(admId),
        }));

        setCurrentStep(3);
      }
    } else if (urlStudentId) {
      const matchedStu = students.find(
        (s) => String(getStudentId(s)) === String(urlStudentId)
      );
      if (matchedStu) {
        setSelectedStudent(matchedStu);
        const sName =
          matchedStu.student_name || matchedStu.studentName || matchedStu.name || "Student";
        setCertForm((prev) => ({
          ...prev,
          name: sName,
        }));
        setCurrentStep(2);
      }
    }
  }, [admissions, students, courses, results, urlAdmissionId, urlStudentId]);

  // Filtered students for search dropdown
  const filteredStudents = useMemo(() => {
    if (!studentSearch.trim()) return students.slice(0, 30);
    const q = studentSearch.toLowerCase().trim();
    return students
      .filter((s) => {
        const name = (s.student_name || s.studentName || s.name || "").toLowerCase();
        const phone = (s.phone1 || s.phone || s.whatsapp || "").toLowerCase();
        const id = getStudentId(s);
        return name.includes(q) || phone.includes(q) || id.includes(q);
      })
      .slice(0, 30);
  }, [students, studentSearch]);

  // Admissions list for the currently selected student
  const studentAdmissions = useMemo(() => {
    if (!selectedStudent) return [];
    const stuId = getStudentId(selectedStudent);
    return admissions.filter((adm) => {
      const admStuId = getAdmissionStudentId(adm);
      return admStuId === stuId && stuId !== "";
    });
  }, [selectedStudent, admissions]);

  // Results for the currently selected admission
  const admissionResults = useMemo(() => {
    if (!selectedAdmission) return [];
    const admId = getAdmissionId(selectedAdmission);
    return results.filter((r) => {
      const rAdmId = getResultAdmissionId(r);
      return rAdmId === admId && admId !== "";
    });
  }, [selectedAdmission, results]);

  const hasResult = admissionResults.length > 0;
  const primaryResult = hasResult ? admissionResults[0] : null;

  // Grade & percentage for primary result
  const resultMetrics = useMemo(() => {
    if (!primaryResult) return null;
    const th = Number(primaryResult.theory_marks ?? primaryResult.theoryMarks ?? 0);
    const pr = Number(primaryResult.practical_marks ?? primaryResult.practicalMarks ?? 0);
    const totTh = Number(primaryResult.total_theory_marks ?? primaryResult.totalTheoryMarks ?? 50);
    const totPr = Number(primaryResult.total_practical_marks ?? primaryResult.totalPracticalMarks ?? 50);
    const totalObtained = th + pr;
    const maxTotal = totTh + totPr;
    const percentage = maxTotal > 0 ? Number(((totalObtained / maxTotal) * 100).toFixed(2)) : 0;

    let grade = "F";
    let passed = false;
    if (percentage >= 90) { grade = "O (Outstanding)"; passed = true; }
    else if (percentage >= 80) { grade = "A+ (Excellent)"; passed = true; }
    else if (percentage >= 70) { grade = "A (Very Good)"; passed = true; }
    else if (percentage >= 60) { grade = "B+ (Good)"; passed = true; }
    else if (percentage >= 50) { grade = "B (Fair)"; passed = true; }
    else if (percentage >= 40) { grade = "C (Pass)"; passed = true; }

    return {
      theoryMarks: th,
      practicalMarks: pr,
      totalTheoryMarks: totTh,
      totalPracticalMarks: totPr,
      totalObtained,
      maxTotal,
      percentage,
      grade,
      passed,
      resultDate: primaryResult.result_date || primaryResult.resultDate || "N/A",
    };
  }, [primaryResult]);

  // Handle selecting a student
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setSelectedAdmission(null);
    setIsStudentDropdownOpen(false);
    setStudentSearch("");
    setCurrentStep(2);

    const sName = student.student_name || student.studentName || student.name || "Student";
    setCertForm((prev) => ({
      ...prev,
      name: sName,
    }));
  };

  // Handle selecting an admission record
  const handleSelectAdmission = (adm) => {
    setSelectedAdmission(adm);
    const admId = getAdmissionId(adm);
    const courseName = getAdmissionCourseName(adm, courses);
    const admDate = adm.admission_date || adm.admissionDate || "";

    const matchedRes = results.find((r) => {
      const rAdmId = getResultAdmissionId(r);
      return String(rAdmId) === String(admId);
    });

    const completionDate = matchedRes?.result_date || matchedRes?.resultDate || admDate || new Date().toISOString().split("T")[0];

    setCertForm((prev) => ({
      ...prev,
      course: courseName,
      rawDate: completionDate,
      date: formatHumanDate(completionDate),
      certNumber: generateCertificateNo(admId),
    }));

    setCurrentStep(3);
  };

  // Inline Quick Add Result submission
  const handleSaveInlineResult = async (e) => {
    e.preventDefault();
    if (!selectedAdmission) return;

    const admId = getAdmissionId(selectedAdmission);

    setSavingResult(true);
    try {
      const payload = {
        admissionId: Number(admId),
        admission_id: Number(admId),
        theoryMarks: newResultForm.theoryMarks !== "" ? Number(newResultForm.theoryMarks) : 0,
        theory_marks: newResultForm.theoryMarks !== "" ? Number(newResultForm.theoryMarks) : 0,
        practicalMarks: newResultForm.practicalMarks !== "" ? Number(newResultForm.practicalMarks) : 0,
        practical_marks: newResultForm.practicalMarks !== "" ? Number(newResultForm.practicalMarks) : 0,
        totalTheoryMarks: Number(newResultForm.totalTheoryMarks || 50),
        total_theory_marks: Number(newResultForm.totalTheoryMarks || 50),
        totalPracticalMarks: Number(newResultForm.totalPracticalMarks || 50),
        total_practical_marks: Number(newResultForm.totalPracticalMarks || 50),
        resultDate: newResultForm.resultDate || new Date().toISOString().split("T")[0],
        result_date: newResultForm.resultDate || new Date().toISOString().split("T")[0],
      };

      const savedRes = await resultService.create(payload);

      // Create an immediate normalized record to guarantee instant UI response
      const immediateRecord = {
        id: savedRes?.data?.id || savedRes?.id || Date.now(),
        admission_id: Number(admId),
        admissionId: Number(admId),
        theory_marks: payload.theoryMarks,
        theoryMarks: payload.theoryMarks,
        practical_marks: payload.practicalMarks,
        practicalMarks: payload.practicalMarks,
        total_theory_marks: payload.totalTheoryMarks,
        totalTheoryMarks: payload.totalTheoryMarks,
        total_practical_marks: payload.totalPracticalMarks,
        totalPracticalMarks: payload.totalPracticalMarks,
        result_date: payload.resultDate,
        resultDate: payload.resultDate,
        student_name: certForm.name,
        course_name: certForm.course,
        ...((savedRes && savedRes.data) ? savedRes.data : (savedRes || {})),
      };

      // Immediately prepend to local results
      setResults((prev) => {
        const filtered = prev.filter((r) => getResultAdmissionId(r) !== String(admId));
        return [immediateRecord, ...filtered];
      });

      // Update date in certificate form to match result date
      setCertForm((prev) => ({
        ...prev,
        rawDate: payload.resultDate,
        date: formatHumanDate(payload.resultDate),
      }));

      setIsAddResultOpen(false);

      Swal.fire({
        icon: "success",
        title: "Examination Result Recorded",
        text: "Result has been successfully linked to this course admission.",
        timer: 2000,
        showConfirmButton: false,
        ...getSwalTheme(),
      });

      // Background sync from backend
      try {
        const resData = await resultService.getAll();
        const raw = resData?.data || resData || [];
        const fetchedList = Array.isArray(raw) ? raw : (raw.data || []);
        if (fetchedList.length > 0) {
          setResults((prev) => {
            const hasSaved = fetchedList.some((r) => getResultAdmissionId(r) === String(admId));
            return hasSaved ? fetchedList : [immediateRecord, ...fetchedList];
          });
        }
      } catch {
        // keep optimistic immediateRecord
      }
    } catch (err) {
      console.error("Save result error:", err);
      Swal.fire({
        icon: "error",
        title: "Could not save result",
        text: err.response?.data?.message || err.message,
        ...getSwalTheme(),
      });
    } finally {
      setSavingResult(false);
    }
  };

  // Formalities Form Change
  const handleCertFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "rawDate") {
      setCertForm((prev) => ({
        ...prev,
        rawDate: value,
        date: formatHumanDate(value),
      }));
    } else {
      setCertForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Record & Issue Certificate
  const handleRecordCertificate = async () => {
    if (!hasResult) {
      Swal.fire({
        icon: "warning",
        title: "Result Required",
        text: "Cannot issue certificate: An examination result must be recorded for this course admission first.",
        ...getSwalTheme(),
      });
      return;
    }

    const admId = getAdmissionId(selectedAdmission);

    const confirm = await Swal.fire({
      title: "Issue & Record Certificate?",
      html: `
        <div class="text-left text-sm text-slate-300 space-y-1.5 py-2">
          <p><strong>Student:</strong> ${certForm.name}</p>
          <p><strong>Course:</strong> ${certForm.course}</p>
          <p><strong>Certificate No:</strong> ${certForm.certNumber}</p>
          <p><strong>Completion Date:</strong> ${certForm.date}</p>
          <p><strong>Duration:</strong> ${certForm.duration}</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Issue Certificate",
      cancelButtonText: "Cancel",
      ...getSwalTheme(),
    });

    if (!confirm.isConfirmed) return;

    try {
      const payload = {
        studentId: getStudentId(selectedStudent),
        admissionId: admId,
        studentName: certForm.name,
        courseName: certForm.course,
        issueDate: certForm.rawDate,
        duration: certForm.duration,
        instructor: certForm.instructor,
        director: certForm.director,
        certificateCode: certForm.certNumber,
        resultPercentage: resultMetrics?.percentage,
        grade: resultMetrics?.grade,
      };

      try {
        await certificateService.create(payload);
      } catch (err) {
        console.warn("Backend certificate API notice:", err);
      }

      Swal.fire({
        icon: "success",
        title: "Certificate Issued Successfully",
        text: `Official certificate #${certForm.certNumber} is ready for export and print.`,
        timer: 2500,
        showConfirmButton: false,
        ...getSwalTheme(),
      });

      setCurrentStep(4);
    } catch (e) {
      console.error(e);
    }
  };

  // Export handlers
  const handleExportPdf = () => {
    if (canvasRef.current) canvasRef.current.downloadPdf();
  };
  const handleDownloadJpg = () => {
    if (canvasRef.current) canvasRef.current.downloadJpg();
  };
  const handleDownloadPng = () => {
    if (canvasRef.current) canvasRef.current.downloadPng();
  };
  const handlePrint = () => {
    if (canvasRef.current) canvasRef.current.print();
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-6 lg:p-8 selection:bg-sky-500/30 selection:text-sky-300">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/30 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles size={14} className="animate-pulse" />
                ISO 9001:2025 Certified Academic Credential Workflow
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <Award className="text-amber-400 shrink-0" size={36} />
                Student Certificate Issuance Studio
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
                Enforce course enrollment and examination result criteria before issuing verifiable certificates with exact institutional layout, QR validation, and PDF export.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/results"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-sm font-medium transition-all shadow hover:border-slate-600"
              >
                <ArrowLeft size={16} className="text-sky-400" />
                Results Suite
              </Link>
              <button
                onClick={fetchAllData}
                disabled={loadingData}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/30 text-sky-300 text-sm font-medium transition-all cursor-pointer"
                title="Refresh Database Resources"
              >
                <RefreshCw size={16} className={loadingData ? "animate-spin" : ""} />
                Sync Data
              </button>
            </div>
          </div>
        </div>

        {/* Guided Step-by-Step Progress Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div
            onClick={() => setCurrentStep(1)}
            className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center gap-3 ${
              currentStep === 1
                ? "bg-sky-500/10 border-sky-500/40 text-white"
                : selectedStudent
                ? "bg-slate-900 border-emerald-500/30 text-emerald-300"
                : "bg-slate-900/60 border-slate-800 text-slate-400"
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
              selectedStudent ? "bg-emerald-500/20 text-emerald-300" : "bg-sky-500/20 text-sky-300"
            }`}>
              {selectedStudent ? <Check size={16} /> : "1"}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Step 1</p>
              <p className="text-sm font-bold truncate">
                {selectedStudent ? selectedStudent.student_name || selectedStudent.name : "Select Student"}
              </p>
            </div>
          </div>

          <div
            onClick={() => selectedStudent && setCurrentStep(2)}
            className={`p-3.5 rounded-2xl border transition ${
              selectedStudent ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
            } flex items-center gap-3 ${
              currentStep === 2
                ? "bg-sky-500/10 border-sky-500/40 text-white"
                : selectedAdmission
                ? "bg-slate-900 border-emerald-500/30 text-emerald-300"
                : "bg-slate-900/60 border-slate-800 text-slate-400"
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
              selectedAdmission ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-400"
            }`}>
              {selectedAdmission ? <Check size={16} /> : "2"}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Step 2</p>
              <p className="text-sm font-bold truncate">
                {selectedAdmission ? getAdmissionCourseName(selectedAdmission, courses) : "Course Admission"}
              </p>
            </div>
          </div>

          <div
            onClick={() => selectedAdmission && setCurrentStep(3)}
            className={`p-3.5 rounded-2xl border transition ${
              selectedAdmission ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
            } flex items-center gap-3 ${
              currentStep === 3
                ? "bg-sky-500/10 border-sky-500/40 text-white"
                : hasResult
                ? "bg-slate-900 border-emerald-500/30 text-emerald-300"
                : "bg-slate-900/60 border-slate-800 text-slate-400"
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
              hasResult ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-400"
            }`}>
              {hasResult ? <Check size={16} /> : "3"}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Step 3</p>
              <p className="text-sm font-bold truncate">
                {hasResult ? `Verified (${resultMetrics?.grade})` : "Result Status"}
              </p>
            </div>
          </div>

          <div
            onClick={() => hasResult && setCurrentStep(4)}
            className={`p-3.5 rounded-2xl border transition ${
              hasResult ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
            } flex items-center gap-3 ${
              currentStep === 4
                ? "bg-sky-500/10 border-sky-500/40 text-white"
                : "bg-slate-900/60 border-slate-800 text-slate-400"
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
              currentStep === 4 ? "bg-amber-500/20 text-amber-300" : "bg-slate-800 text-slate-400"
            }`}>
              4
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Step 4</p>
              <p className="text-sm font-bold truncate">Certificate Formalities</p>
            </div>
          </div>
        </div>

        {/* Studio Main Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Multi-Step Interactive Form */}
          <div className="lg:col-span-6 space-y-6">
            {/* STEP 1: Select Student */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5 text-sky-400 font-bold text-base">
                  <User size={18} />
                  1. Select Student for Certification
                </div>
                <span className="text-xs text-slate-400">
                  {students.length} Registered Students
                </span>
              </div>

              {/* Student Search Picker */}
              <div ref={studentPickerRef} className="relative space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Search Student by Name, Phone, or ID
                </label>
                <div
                  onClick={() => setIsStudentDropdownOpen(!isStudentDropdownOpen)}
                  className={`w-full min-h-[46px] px-3.5 py-2.5 rounded-xl bg-slate-950/70 border ${
                    selectedStudent ? "border-sky-500/50" : "border-slate-700"
                  } hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 cursor-pointer flex items-center justify-between transition-all`}
                >
                  {selectedStudent ? (
                    <div className="flex items-center gap-3 truncate">
                      <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center font-bold text-xs shrink-0">
                        #{getStudentId(selectedStudent)}
                      </div>
                      <span className="font-semibold text-white text-sm truncate">
                        {selectedStudent.student_name || selectedStudent.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({selectedStudent.phone1 || selectedStudent.whatsapp || "No Contact"})
                      </span>
                    </div>
                  ) : (
                    <span className="text-slate-400 text-sm flex items-center gap-2">
                      <Search size={16} className="text-slate-500" />
                      Click or type to search student...
                    </span>
                  )}

                  <Sliders size={16} className="text-slate-400 shrink-0" />
                </div>

                {/* Dropdown list */}
                <AnimatePresence>
                  {isStudentDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="p-3 border-b border-slate-800 bg-slate-950/60 sticky top-0">
                        <div className="relative">
                          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            autoFocus
                            placeholder="Type student name, phone, or ID..."
                            value={studentSearch}
                            onChange={(e) => setStudentSearch(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                          />
                        </div>
                      </div>

                      <div className="max-h-60 overflow-y-auto divide-y divide-slate-800/60">
                        {filteredStudents.length > 0 ? (
                          filteredStudents.map((stu) => {
                            const id = getStudentId(stu);
                            const name = stu.student_name || stu.name || `Student #${id}`;
                            const contact = stu.phone1 || stu.whatsapp || "";
                            const isSelected = selectedStudent && getStudentId(selectedStudent) === id;

                            return (
                              <div
                                key={id}
                                onClick={() => handleSelectStudent(stu)}
                                className={`p-3 px-4 flex items-center justify-between cursor-pointer transition ${
                                  isSelected ? "bg-sky-500/20 text-sky-200" : "hover:bg-slate-800/60 text-slate-200"
                                }`}
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm text-white">{name}</span>
                                    <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-sky-400 font-mono">
                                      #{id}
                                    </span>
                                  </div>
                                  <div className="text-xs text-slate-400 mt-0.5">
                                    {contact && <span>Phone: {contact}</span>}
                                  </div>
                                </div>
                                {isSelected && <Check size={16} className="text-sky-400 shrink-0 ml-2" />}
                              </div>
                            );
                          })
                        ) : (
                          <div className="p-6 text-center text-slate-400 text-sm">
                            No students found matching "{studentSearch}"
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Selected Student Profile Badge */}
              {selectedStudent && (
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="font-semibold text-white text-sm">
                      {selectedStudent.student_name || selectedStudent.name}
                    </span>
                    <span className="text-sky-400 font-mono">Student ID: #{getStudentId(selectedStudent)}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-300 pt-1">
                    <div>
                      <span className="text-slate-500">Contact:</span> {selectedStudent.phone1 || selectedStudent.whatsapp || "N/A"}
                    </div>
                    <div>
                      <span className="text-slate-500">City:</span> {selectedStudent.city || "Barrackpore"}
                    </div>
                    <div>
                      <span className="text-slate-500">Admissions:</span>{" "}
                      <strong className="text-amber-400">{studentAdmissions.length} Courses</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2: Course Admissions List */}
            {selectedStudent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5 text-sky-400 font-bold text-base">
                    <BookOpen size={18} />
                    2. Enrolled Course Admissions ({studentAdmissions.length})
                  </div>
                  <span className="text-xs text-slate-400">Select course to certify</span>
                </div>

                {studentAdmissions.length > 0 ? (
                  <div className="space-y-3">
                    {studentAdmissions.map((adm) => {
                      const admId = getAdmissionId(adm);
                      const courseName = getAdmissionCourseName(adm, courses);
                      const isSelected = selectedAdmission && getAdmissionId(selectedAdmission) === admId;

                      // Check if result exists for this admission
                      const hasAdmResult = results.some((r) => {
                        const rAdmId = getResultAdmissionId(r);
                        return String(rAdmId) === String(admId);
                      });

                      return (
                        <div
                          key={admId}
                          onClick={() => handleSelectAdmission(adm)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isSelected
                              ? "bg-sky-500/15 border-sky-500/60 shadow-lg shadow-sky-500/10"
                              : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-base">{courseName}</span>
                              <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-sky-400 font-mono">
                                Admission #{admId}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                              <span>Admitted: {adm.admission_date || adm.admissionDate || "N/A"}</span>
                              {adm.fee_modes_name && <span>• {adm.fee_modes_name}</span>}
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 shrink-0">
                            {hasAdmResult ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                <CheckCircle2 size={13} /> Result Evaluated
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                <AlertTriangle size={13} /> No Result Yet
                              </span>
                            )}

                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                              isSelected ? "bg-sky-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-400"
                            }`}>
                              <ChevronRight size={16} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-slate-950/40 rounded-2xl border border-dashed border-slate-800 text-slate-400 space-y-2">
                    <BookOpen size={32} className="text-slate-600 mx-auto" />
                    <p className="text-sm font-semibold">No course admissions found for this student.</p>
                    <p className="text-xs text-slate-500">To generate a certificate, please first admit the student to a course via Admission portal.</p>
                    <Link
                      to="/admission"
                      className="inline-flex items-center gap-1.5 px-4 py-2 mt-2 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/30 text-sky-300 text-xs font-semibold"
                    >
                      <PlusCircle size={14} /> Go to Student Admission
                    </Link>
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 3: Examination Result Verification & Inline Add Result */}
            {selectedAdmission && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5 text-sky-400 font-bold text-base">
                    <GraduationCap size={18} />
                    3. Examination Result Verification
                  </div>
                  <span className="text-xs text-sky-300 font-mono">
                    Admission #{getAdmissionId(selectedAdmission)}
                  </span>
                </div>

                {hasResult && resultMetrics ? (
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                        <CheckCircle2 size={18} />
                        Academic Result Verified &amp; Approved
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        Grade: {resultMetrics.grade}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                        <span className="text-slate-400 block mb-0.5">Theory Score</span>
                        <strong className="text-white text-sm">{resultMetrics.theoryMarks}</strong>
                        <span className="text-slate-500 text-[11px]"> / {resultMetrics.totalTheoryMarks}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                        <span className="text-slate-400 block mb-0.5">Practical Score</span>
                        <strong className="text-white text-sm">{resultMetrics.practicalMarks}</strong>
                        <span className="text-slate-500 text-[11px]"> / {resultMetrics.totalPracticalMarks}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                        <span className="text-slate-400 block mb-0.5">Total Marks</span>
                        <strong className="text-sky-300 text-sm">{resultMetrics.totalObtained}</strong>
                        <span className="text-slate-500 text-[11px]"> / {resultMetrics.maxTotal}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                        <span className="text-slate-400 block mb-0.5">Percentage</span>
                        <strong className="text-emerald-300 text-sm">{resultMetrics.percentage}%</strong>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={22} />
                      <div className="space-y-1">
                        <h4 className="font-bold text-amber-300 text-sm">
                          No Examination Result Recorded for Admission #{getAdmissionId(selectedAdmission)}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          To generate a valid certificate, the student must have at least one evaluated examination result recorded for this course admission.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAddResultOpen(true)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20 cursor-pointer text-xs"
                    >
                      <PlusCircle size={16} />
                      Add Result for this Admission Now
                    </button>
                  </div>
                )}

                {/* Inline Quick Add Result Modal / Drawer */}
                <AnimatePresence>
                  {isAddResultOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-5 rounded-2xl bg-slate-950 border border-sky-500/40 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h4 className="text-sm font-bold text-sky-400 flex items-center gap-2">
                          <PlusCircle size={16} /> Record Examination Result for Admission #{getAdmissionId(selectedAdmission)}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setIsAddResultOpen(false)}
                          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <form onSubmit={handleSaveInlineResult} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Theory Marks */}
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                            <label className="text-xs font-semibold text-slate-300 block">Theory Marks</label>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-[10px] text-slate-400 block">Obtained</span>
                                <input
                                  type="number"
                                  required
                                  value={newResultForm.theoryMarks}
                                  onChange={(e) => setNewResultForm((p) => ({ ...p, theoryMarks: e.target.value }))}
                                  placeholder="e.g. 42"
                                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-sky-500 focus:outline-none"
                                />
                              </div>
                              <div>
                                <span className="text-[10px] text-slate-400 block">Out of (Max)</span>
                                <input
                                  type="number"
                                  required
                                  value={newResultForm.totalTheoryMarks}
                                  onChange={(e) => setNewResultForm((p) => ({ ...p, totalTheoryMarks: e.target.value }))}
                                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-sky-500 focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Practical Marks */}
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                            <label className="text-xs font-semibold text-slate-300 block">Practical Marks</label>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-[10px] text-slate-400 block">Obtained</span>
                                <input
                                  type="number"
                                  required
                                  value={newResultForm.practicalMarks}
                                  onChange={(e) => setNewResultForm((p) => ({ ...p, practicalMarks: e.target.value }))}
                                  placeholder="e.g. 46"
                                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-sky-500 focus:outline-none"
                                />
                              </div>
                              <div>
                                <span className="text-[10px] text-slate-400 block">Out of (Max)</span>
                                <input
                                  type="number"
                                  required
                                  value={newResultForm.totalPracticalMarks}
                                  onChange={(e) => setNewResultForm((p) => ({ ...p, totalPracticalMarks: e.target.value }))}
                                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-sky-500 focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Result Date */}
                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">Evaluation / Exam Date</label>
                          <input
                            type="date"
                            required
                            value={newResultForm.resultDate}
                            onChange={(e) => setNewResultForm((p) => ({ ...p, resultDate: e.target.value }))}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                          />
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <button
                            type="submit"
                            disabled={savingResult}
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition text-xs cursor-pointer disabled:opacity-50"
                          >
                            <Save size={15} />
                            {savingResult ? "Saving Result..." : "Save Result & Unlock Certificate"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsAddResultOpen(false)}
                            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* STEP 4: Completion Date & Formalities */}
            {hasResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5 text-amber-400 font-bold text-base">
                    <Award size={18} />
                    4. Completion Date &amp; Certificate Formalities
                  </div>
                  <span className="text-xs text-slate-400">Formal Details</span>
                </div>

                <div className="space-y-4">
                  {/* Recipient Full Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Student Name on Certificate <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={certForm.name}
                      onChange={handleCertFormChange}
                      className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  {/* Certified Course Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Course Program on Certificate <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="course"
                      value={certForm.course}
                      onChange={handleCertFormChange}
                      className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  {/* Completion Date & Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Official Completion Date <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="date"
                          name="rawDate"
                          value={certForm.rawDate}
                          onChange={handleCertFormChange}
                          className="w-full bg-slate-950/70 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-sky-500 focus:outline-none"
                        />
                      </div>
                      <span className="text-[11px] text-slate-500 mt-1 block">Renders as: {certForm.date}</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Duration
                      </label>
                      <div className="relative">
                        <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          name="duration"
                          value={certForm.duration}
                          onChange={handleCertFormChange}
                          placeholder="e.g., 4 Weeks / 6 Months"
                          className="w-full bg-slate-950/70 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-sky-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Signatories */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Instructor Name
                      </label>
                      <input
                        type="text"
                        name="instructor"
                        value={certForm.instructor}
                        onChange={handleCertFormChange}
                        className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-sky-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Director Name
                      </label>
                      <input
                        type="text"
                        name="director"
                        value={certForm.director}
                        onChange={handleCertFormChange}
                        className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Certificate Verification Code */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                        Certificate Verification Code <span className="text-rose-400">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setCertForm((p) => ({ ...p, certNumber: generateCertificateNo(getAdmissionId(selectedAdmission)) }))}
                        className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw size={12} /> Regenerate
                      </button>
                    </div>
                    <input
                      type="text"
                      name="certNumber"
                      value={certForm.certNumber}
                      onChange={handleCertFormChange}
                      className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono text-amber-300 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Primary Action Button: Record & Issue Certificate */}
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={handleRecordCertificate}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-extrabold px-6 py-3.5 rounded-2xl transition shadow-xl shadow-amber-500/20 cursor-pointer text-base"
                    >
                      <Award size={20} />
                      Record &amp; Issue Official Certificate
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </div>

          {/* Right Column: Live Certificate Canvas & Export Actions (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Export Toolbar Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                  <Download size={18} />
                  Export &amp; Print Suite
                </div>
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                  title="Fullscreen Preview"
                >
                  <Maximize2 size={16} />
                </button>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleDownloadJpg}
                  disabled={!imagesLoaded}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-3 rounded-xl transition shadow-lg shadow-amber-500/20 cursor-pointer text-sm disabled:opacity-50"
                >
                  <Download size={16} />
                  Download JPG
                </button>

                <button
                  onClick={handleExportPdf}
                  disabled={!imagesLoaded}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-bold px-4 py-3 rounded-xl transition shadow-lg shadow-sky-500/20 cursor-pointer text-sm disabled:opacity-50"
                >
                  <FileText size={16} />
                  Export PDF
                </button>

                <button
                  onClick={handleDownloadPng}
                  disabled={!imagesLoaded}
                  className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer text-sm disabled:opacity-50"
                >
                  <Layers size={16} className="text-emerald-400" />
                  Download PNG
                </button>

                <button
                  onClick={handlePrint}
                  disabled={!imagesLoaded}
                  className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer text-sm disabled:opacity-50"
                >
                  <Printer size={16} className="text-purple-400" />
                  Print Direct
                </button>
              </div>
            </div>

            {/* Live Canvas Preview Panel (Exact Print Style Intact) */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-400" />
                  Certificate Print Preview
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-normal ${imagesLoaded ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 animate-pulse"}`}>
                    {imagesLoaded ? "Assets Ready" : "Loading..."}
                  </span>
                </h3>

                {/* Zoom Controls */}
                <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 text-xs text-slate-400">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.1))}
                    className="p-1 hover:text-white cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="w-12 text-center font-mono">{Math.round(zoomLevel * 100)}%</span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                    className="p-1 hover:text-white cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn size={14} />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Canvas Container with zoom scale */}
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800/80 overflow-hidden flex justify-center items-center min-h-[460px]">
                {!imagesLoaded ? (
                  <div className="text-center text-slate-400 p-8 space-y-2">
                    <RefreshCw size={24} className="animate-spin text-amber-400 mx-auto" />
                    <p className="text-xs">Loading certificate background &amp; seals...</p>
                  </div>
                ) : loadError ? (
                  <div className="text-center text-rose-400 p-8">
                    Failed to load certificate background assets.
                  </div>
                ) : (
                  <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center top", transition: "transform 0.15s ease" }} className="w-full">
                    <CertificateCanvas
                      ref={canvasRef}
                      name={certForm.name}
                      course={certForm.course}
                      date={certForm.date}
                      duration={certForm.duration}
                      instructor={certForm.instructor}
                      director={certForm.director}
                      certNumber={certForm.certNumber}
                      bgImage={bgImage}
                      logoImage={logoImage}
                      instructorSignImage={instructorSignImage}
                      directorSignImage={directorSignImage}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Fullscreen Preview Modal */}
        <AnimatePresence>
          {isFullscreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
            >
              <div className="w-full max-w-5xl flex items-center justify-between mb-3 text-white">
                <div className="flex items-center gap-3">
                  <Award className="text-amber-400" size={24} />
                  <span className="font-bold text-lg">{certForm.name} — Certificate Preview</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExportPdf}
                    className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText size={14} /> PDF
                  </button>
                  <button
                    onClick={handleDownloadJpg}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download size={14} /> JPG
                  </button>
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                  >
                    <Minimize2 size={18} />
                  </button>
                </div>
              </div>

              <div className="max-h-[85vh] overflow-auto p-4 flex justify-center items-center w-full">
                <div className="w-full max-w-2xl">
                  <CertificateCanvas
                    name={certForm.name}
                    course={certForm.course}
                    date={certForm.date}
                    duration={certForm.duration}
                    instructor={certForm.instructor}
                    director={certForm.director}
                    certNumber={certForm.certNumber}
                    bgImage={bgImage}
                    logoImage={logoImage}
                    instructorSignImage={instructorSignImage}
                    directorSignImage={directorSignImage}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Developer Console */}
        <div className="pt-4 border-t border-slate-800/80">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <Code2 size={15} />
                Certificate Academic State &amp; Verification Payload
              </div>
              <button
                onClick={() => setShowDevTools(!showDevTools)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer"
              >
                {showDevTools ? "Hide Console" : "Inspect Payload"}
              </button>
            </div>

            {showDevTools && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="grid md:grid-cols-3 gap-4 text-xs mt-3 pt-3 border-t border-slate-800"
              >
                <div>
                  <div className="text-slate-400 font-semibold mb-1">Selected Student &amp; Admission</div>
                  <pre className="bg-black/80 border border-slate-800 p-3 rounded-xl text-amber-400 overflow-x-auto max-h-48 font-mono text-[11px]">
                    {JSON.stringify({ student: selectedStudent, admission: selectedAdmission }, null, 2)}
                  </pre>
                </div>

                <div>
                  <div className="text-slate-400 font-semibold mb-1">Attached Examination Result</div>
                  <pre className="bg-black/80 border border-slate-800 p-3 rounded-xl text-emerald-400 overflow-x-auto max-h-48 font-mono text-[11px]">
                    {JSON.stringify(resultMetrics || { status: "No result recorded" }, null, 2)}
                  </pre>
                </div>

                <div>
                  <div className="text-slate-400 font-semibold mb-1">Issued Certificate Payload</div>
                  <pre className="bg-black/80 border border-slate-800 p-3 rounded-xl text-sky-400 overflow-x-auto max-h-48 font-mono text-[11px]">
                    {JSON.stringify(certForm, null, 2)}
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
