// src/components/common/EditAdmissionModal.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  X,
  GraduationCap,
  BookOpen,
  Calendar,
  IndianRupee,
  Clock,
  CheckCircle2,
  AlertCircle,
  Save,
  Sparkles,
  RefreshCw,
  Search,
  ChevronDown,
  User,
  Layers,
  ArrowRight,
  Info,
  Check,
  Ban,
} from "lucide-react";
import { admissionService } from "../../services/admissionService";
import { courseService } from "../../services/courseService";
import { studentService } from "../../services/studentService";
import api from "../../api/api";

const STATUS_OPTIONS = [
  {
    id: 1,
    name: "Ongoing (Active)",
    description: "Student is actively taking classes. Monthly fees accrue normally.",
    badgeClass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    icon: Clock,
    color: "emerald",
  },
  {
    id: 2,
    name: "Completed",
    description: "Student has successfully completed the entire syllabus/course.",
    badgeClass: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    icon: GraduationCap,
    color: "blue",
  },
  {
    id: 3,
    name: "Incomplete / Discontinued",
    description: "Student has dropped out or discontinued classes. Closing date stops future dues.",
    badgeClass: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    icon: Ban,
    color: "rose",
  },
];

export default function EditAdmissionModal({
  isOpen,
  onClose,
  admission,
  onSuccess,
}) {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [feeModes, setFeeModes] = useState([
    { id: 1, fee_modes_name: "Monthly" },
    { id: 2, fee_modes_name: "Course Fees (Full / Lump sum)" },
  ]);
  const [loadingResources, setLoadingResources] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
    feeModesId: 1,
    courseFees: "",
    admissionDate: "",
    completionDate: "",
    courseStatusId: 1,
    remarks: "",
  });

  // Keep copy of original data for live diff comparison
  const [originalData, setOriginalData] = useState(null);

  // Parse Laravel backend validation errors cleanly
  const parseValidationErrors = (err) => {
    if (!err) return { message: "An unknown error occurred.", details: [], fieldMap: {} };
    const resData = err.response?.data;
    if (!resData) {
      return { message: err.message || "Network error. Please check connection.", details: [], fieldMap: {} };
    }

    const valErrors = resData.errors || (resData.data && typeof resData.data === "object" ? resData.data : null);
    if (valErrors && typeof valErrors === "object" && Object.keys(valErrors).length > 0) {
      const details = [];
      const fieldMap = {};
      Object.entries(valErrors).forEach(([field, msgs]) => {
        const msgList = Array.isArray(msgs) ? msgs : [String(msgs)];
        const cleanMsg = msgList.join(", ");
        fieldMap[field] = cleanMsg;
        const label = field
          .replace(/([A-Z])/g, " $1")
          .replace(/_/g, " ")
          .replace(/^student\.|^admission\./, "")
          .trim();
        details.push({ field: label, message: cleanMsg });
      });
      return {
        message: resData.message || "Validation failed for the submitted admission data.",
        details,
        fieldMap,
      };
    }

    const message =
      (typeof resData.data === "string" && resData.data) ||
      resData.message ||
      resData.error ||
      err.message ||
      "Could not update admission details.";

    return { message, details: [], fieldMap: {} };
  };

  // Load courses and fee modes if not already loaded
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const loadResources = async () => {
      setLoadingResources(true);
      try {
        const [cRes, fmRes, stRes] = await Promise.all([
          courseService.getAll().catch(() => ({ data: [] })),
          api.get("/fee-modes").catch(() => null),
          studentService.getAll().catch(() => ({ data: [] })),
        ]);

        if (isMounted) {
          let cList = [];
          if (cRes?.status && Array.isArray(cRes.data)) cList = cRes.data;
          else if (Array.isArray(cRes?.data)) cList = cRes.data;
          else if (Array.isArray(cRes)) cList = cRes;
          setCourses(cList);

          if (fmRes?.data?.status && Array.isArray(fmRes.data.data)) {
            setFeeModes(fmRes.data.data);
          }

          let stList = [];
          if (stRes?.status && Array.isArray(stRes.data)) stList = stRes.data;
          else if (Array.isArray(stRes?.data)) stList = stRes.data;
          else if (Array.isArray(stRes)) stList = stRes;
          setStudents(stList);
        }
      } catch (err) {
        console.warn("Failed to load edit resources:", err);
      } finally {
        if (isMounted) setLoadingResources(false);
      }
    };

    loadResources();
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Pre-fill form when admission prop changes
  useEffect(() => {
    if (admission && isOpen) {
      const studentId =
        admission.studentId ||
        admission.student_id ||
        admission.student?.id ||
        admission.student?.studentId ||
        "";

      const courseId =
        admission.courseId ||
        admission.course_id ||
        admission.course?.id ||
        admission.course?.courseId ||
        "";

      const feeModesId = Number(
        admission.feeModesId ||
        admission.fee_modes_id ||
        admission.feeMode?.id ||
        (admission.feeModeName?.toLowerCase().includes("lump") || admission.feeModeName?.toLowerCase().includes("course") ? 2 : 1) ||
        1
      );

      const courseFees =
        admission.courseFees !== undefined && admission.courseFees !== null
          ? admission.courseFees
          : admission.course_fees !== undefined && admission.course_fees !== null
          ? admission.course_fees
          : admission.course?.courseFees || "";

      const rawAdmDate =
        admission.admissionDate || admission.admission_date || "";
      const admissionDate = rawAdmDate
        ? rawAdmDate.split("T")[0]
        : new Date().toISOString().split("T")[0];

      const rawCompDate =
        admission.completionDate || admission.completion_date || "";
      const completionDate = rawCompDate ? rawCompDate.split("T")[0] : "";

      const courseStatusId = Number(
        admission.courseStatusId ||
        admission.course_status_id ||
        admission.courseStatus?.id ||
        (admission.courseStatus?.courseStatusName === "Completed" ? 2 : admission.courseStatus?.courseStatusName === "Incomplete" ? 3 : 1) ||
        1
      );

      const remarks = admission.remarks || "";

      const populated = {
        studentId: String(studentId),
        courseId: String(courseId),
        feeModesId,
        courseFees: String(courseFees),
        admissionDate,
        completionDate,
        courseStatusId,
        remarks,
      };

      setFormData(populated);
      setOriginalData(populated);
      setFieldErrors({});
    }
  }, [admission, isOpen]);

  // Selected student object
  const selectedStudent = useMemo(() => {
    const sId = formData.studentId;
    if (!sId) return admission?.student || null;
    return (
      students.find((s) => String(s.id || s.studentId) === String(sId)) ||
      admission?.student ||
      null
    );
  }, [students, formData.studentId, admission]);

  // Selected course object
  const selectedCourse = useMemo(() => {
    const cId = formData.courseId;
    if (!cId) return admission?.course || null;
    return (
      courses.find((c) => String(c.id || c.courseId) === String(cId)) ||
      admission?.course ||
      null
    );
  }, [courses, formData.courseId, admission]);

  // Handle course change
  const handleCourseChange = (e) => {
    const newCourseId = e.target.value;
    const foundCourse = courses.find(
      (c) => String(c.id || c.courseId) === String(newCourseId)
    );

    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next.courseId;
      delete next.course_id;
      return next;
    });

    setFormData((prev) => {
      const updated = { ...prev, courseId: newCourseId };
      if (foundCourse) {
        // If course fee was empty or user switches course, suggest catalog fee
        const catalogFee = foundCourse.courseFees || foundCourse.course_fees || "";
        if (catalogFee) {
          updated.courseFees = String(catalogFee);
        }
        const defaultMode = foundCourse.feeModesId || foundCourse.fee_modes_id;
        if (defaultMode) {
          updated.feeModesId = Number(defaultMode);
        }
      }
      return updated;
    });
  };

  // Handle status change
  const handleStatusChange = (newStatusId) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next.courseStatusId;
      delete next.course_status_id;
      return next;
    });

    setFormData((prev) => {
      const updated = { ...prev, courseStatusId: newStatusId };
      if ((newStatusId === 2 || newStatusId === 3) && !prev.completionDate) {
        updated.completionDate = new Date().toISOString().split("T")[0];
      }
      return updated;
    });
  };

  // Date preset helper
  const setDatePreset = (name, preset) => {
    const today = new Date();
    let val = "";
    if (preset === "today") {
      val = today.toISOString().split("T")[0];
    } else if (preset === "startOfMonth") {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      val = start.toISOString().split("T")[0];
    } else if (preset === "endOfMonth") {
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      val = end.toISOString().split("T")[0];
    } else if (preset === "clear") {
      val = "";
    }
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      delete next[name === "admissionDate" ? "admission_date" : "completion_date"];
      return next;
    });
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  // Live Diff Calculations
  const diffSummary = useMemo(() => {
    if (!originalData) return [];
    const diffs = [];

    if (String(formData.courseId) !== String(originalData.courseId)) {
      const oldCourse = courses.find((c) => String(c.id || c.courseId) === String(originalData.courseId)) || admission?.course;
      diffs.push({
        label: "Course",
        oldVal: oldCourse?.courseName || oldCourse?.course_name || "Old Course",
        newVal: selectedCourse?.courseName || selectedCourse?.course_name || "New Course",
      });
    }

    if (Number(formData.courseFees) !== Number(originalData.courseFees)) {
      diffs.push({
        label: "Agreed Fees",
        oldVal: `₹${Number(originalData.courseFees || 0).toLocaleString()}`,
        newVal: `₹${Number(formData.courseFees || 0).toLocaleString()}`,
      });
    }

    if (Number(formData.feeModesId) !== Number(originalData.feeModesId)) {
      diffs.push({
        label: "Fee Mode",
        oldVal: Number(originalData.feeModesId) === 2 ? "Lump Sum" : "Monthly",
        newVal: Number(formData.feeModesId) === 2 ? "Lump Sum" : "Monthly",
      });
    }

    if (formData.admissionDate !== originalData.admissionDate) {
      diffs.push({
        label: "Admission Date",
        oldVal: originalData.admissionDate,
        newVal: formData.admissionDate,
      });
    }

    if (formData.completionDate !== originalData.completionDate) {
      diffs.push({
        label: "Closing Date",
        oldVal: originalData.completionDate || "None",
        newVal: formData.completionDate || "None",
      });
    }

    if (Number(formData.courseStatusId) !== Number(originalData.courseStatusId)) {
      const oldStatus = STATUS_OPTIONS.find((s) => s.id === Number(originalData.courseStatusId))?.name || "Ongoing";
      const newStatus = STATUS_OPTIONS.find((s) => s.id === Number(formData.courseStatusId))?.name || "Ongoing";
      diffs.push({
        label: "Status",
        oldVal: oldStatus,
        newVal: newStatus,
      });
    }

    return diffs;
  }, [formData, originalData, courses, selectedCourse, admission]);

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!admission) return;

    setFieldErrors({});

    const admId =
      admission.admissionId || admission.id || admission.admission_id;

    if (!admId) {
      Swal.fire({
        icon: "error",
        title: "Missing ID",
        text: "Could not identify the admission record to update.",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    if (!formData.courseId) {
      setFieldErrors((prev) => ({ ...prev, courseId: "Academic course is required." }));
      Swal.fire({
        icon: "warning",
        title: "Course Required",
        text: "Please select an academic course for this admission record.",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    if (formData.courseFees === "" || isNaN(Number(formData.courseFees)) || Number(formData.courseFees) < 0) {
      setFieldErrors((prev) => ({ ...prev, courseFees: "Course fee must be a valid non-negative number." }));
      Swal.fire({
        icon: "warning",
        title: "Invalid Fees",
        text: "Please enter a valid agreed course fee amount.",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    if (!formData.admissionDate) {
      setFieldErrors((prev) => ({ ...prev, admissionDate: "Admission date is required." }));
      Swal.fire({
        icon: "warning",
        title: "Admission Date Required",
        text: "Please provide a valid admission start date.",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    // Validate completion date is after admission date if provided
    if (
      formData.admissionDate &&
      formData.completionDate &&
      formData.completionDate < formData.admissionDate
    ) {
      setFieldErrors((prev) => ({
        ...prev,
        completionDate: `Closing date (${formData.completionDate}) cannot be before Admission date (${formData.admissionDate}).`,
      }));
      Swal.fire({
        icon: "error",
        title: "Invalid Date Sequence",
        text: `Closing date (${formData.completionDate}) cannot be before Admission date (${formData.admissionDate}).`,
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    // Require completion date for completed / incomplete
    if (
      (Number(formData.courseStatusId) === 2 || Number(formData.courseStatusId) === 3) &&
      !formData.completionDate
    ) {
      setFieldErrors((prev) => ({
        ...prev,
        completionDate: "Closing date is required when course is marked as Completed or Discontinued.",
      }));
      Swal.fire({
        icon: "warning",
        title: "Closing Date Required",
        text: "Please specify a closing date when marking a course as Completed or Incomplete.",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    // Confirm dialog with changes diff preview
    const confirmRes = await Swal.fire({
      title: "Save Updated Admission Details?",
      html: `
        <div class="text-left text-xs text-slate-300 space-y-2 p-3 bg-slate-950/80 rounded-xl border border-slate-800">
          <p class="font-bold text-white text-sm">Admission #${admId} — ${selectedStudent?.student_name || selectedStudent?.studentName || "Student"}</p>
          <div class="space-y-1 pt-1">
            <p>• Course: <strong class="text-sky-400">${selectedCourse?.course_name || selectedCourse?.courseName}</strong></p>
            <p>• Agreed Fee: <strong class="text-emerald-400">₹${Number(formData.courseFees).toLocaleString()}</strong> (${formData.feeModesId === 2 ? "Lump Sum" : "Monthly"})</p>
            <p>• Admission Date: <strong class="text-slate-200">${formData.admissionDate}</strong></p>
            <p>• Status: <strong class="text-indigo-400">${STATUS_OPTIONS.find((s) => s.id === Number(formData.courseStatusId))?.name}</strong></p>
            ${formData.completionDate ? `<p>• Closing Date: <strong class="text-amber-300">${formData.completionDate}</strong></p>` : ""}
          </div>
          ${diffSummary.length > 0 ? `<div class="mt-2 pt-2 border-t border-slate-800 text-[11px] text-amber-300"><b>${diffSummary.length} parameter(s) modified.</b></div>` : ""}
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update Admission",
      cancelButtonText: "Keep Reviewing",
      confirmButtonColor: "#0284c7",
      cancelButtonColor: "#475569",
      background: "#0f172a",
      color: "#f8fafc",
    });

    if (!confirmRes.isConfirmed) return;

    setSaving(true);
    try {
      const cleanAdmissionDate = formData.admissionDate
        ? formData.admissionDate.split("T")[0]
        : new Date().toISOString().split("T")[0];

      const cleanCompletionDate = formData.completionDate
        ? formData.completionDate.split("T")[0]
        : null;

      // Dual-cased, strictly sanitized payload for Laravel validation (excluding studentId)
      const payload = {
        courseId: Number(formData.courseId),
        course_id: Number(formData.courseId),
        courseStatusId: Number(formData.courseStatusId),
        course_status_id: Number(formData.courseStatusId),
        feeModesId: Number(formData.feeModesId),
        fee_modes_id: Number(formData.feeModesId),
        courseFees: Number(formData.courseFees),
        course_fees: Number(formData.courseFees),
        admissionDate: cleanAdmissionDate,
        admission_date: cleanAdmissionDate,
        completionDate: cleanCompletionDate,
        completion_date: cleanCompletionDate,
        remarks: formData.remarks && formData.remarks.trim() ? formData.remarks.trim() : null,
      };

      const res = await admissionService.update(admId, payload);

      Swal.fire({
        icon: "success",
        title: "Admission Updated Successfully! 🎓",
        text: `The admission record #${admId} has been updated.`,
        timer: 2200,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#f8fafc",
      });

      if (onSuccess) {
        onSuccess({
          admissionId: admId,
          studentId: Number(formData.studentId),
          ...payload,
          student: selectedStudent,
          course: selectedCourse,
          courseStatus: {
            id: Number(formData.courseStatusId),
            courseStatusName: STATUS_OPTIONS.find((s) => s.id === Number(formData.courseStatusId))?.name || "Ongoing",
          },
          feeMode: {
            id: Number(formData.feeModesId),
            feeModesName: Number(formData.feeModesId) === 2 ? "Course Fees (Full / Lump sum)" : "Monthly",
          },
          response: res,
        });
      }

      onClose();
    } catch (err) {
      console.error("Failed to update admission details:", err);
      const { message, details, fieldMap } = parseValidationErrors(err);
      if (fieldMap) {
        setFieldErrors(fieldMap);
      }

      let errorHtml = `<div class="text-left text-xs space-y-2 mt-2">`;
      if (details.length > 0) {
        errorHtml += `
          <div class="p-2.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 font-semibold mb-2">
            ${message}
          </div>
          <div class="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            ${details
              .map(
                (d) => `
              <div class="p-2 rounded-lg bg-slate-900/90 border border-rose-500/40 flex items-start gap-2 text-slate-200">
                <span class="w-2 h-2 rounded-full bg-rose-400 mt-1.5 shrink-0"></span>
                <div>
                  <b class="capitalize text-rose-300">${d.field}:</b>
                  <span class="text-slate-300 ml-1">${d.message}</span>
                </div>
              </div>`
              )
              .join("")}
          </div>
        `;
      } else {
        errorHtml += `<p class="p-3 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-200 font-medium">${message}</p>`;
      }
      errorHtml += `</div>`;

      Swal.fire({
        icon: "error",
        title: "Validation Error / Update Failed",
        html: errorHtml,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "I'll Correct The Data",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !admission) return null;

  const admNo =
    admission.admissionNumber ||
    admission.admissionNo ||
    admission.admission_number ||
    `ADM-${admission.admissionId || admission.id}`;

  const studentName =
    selectedStudent?.student_name ||
    selectedStudent?.studentName ||
    "Student";

  const regNo =
    selectedStudent?.registration_number ||
    selectedStudent?.registrationNumber ||
    selectedStudent?.enrollment_number ||
    (selectedStudent?.id ? `STU-${selectedStudent.id}` : "STU-2026");

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-900 border border-slate-700/90 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[94vh]"
        >
          {/* Top Modal Header */}
          <div className="p-5 sm:p-6 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 border border-sky-400/40 flex items-center justify-center text-white text-xl shadow-lg shadow-sky-500/20 shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg sm:text-xl font-extrabold text-white truncate">
                    Update Admission Details
                  </h2>
                  <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    {admNo}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Alter course assignment, agreed fees, fee plan, admission date, and status.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer shrink-0"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Form Content */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-200">
            
            {/* 1. STUDENT IDENTITY CARD */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-md">
                  {studentName.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Admitted Student:</span>
                    <span className="font-mono text-[10px] font-bold text-sky-400 bg-sky-500/10 px-1.5 py-0.2 rounded border border-sky-500/20">
                      {regNo}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white truncate mt-0.5">
                    {studentName}
                  </h3>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 flex-wrap mt-0.5">
                    {selectedStudent?.whatsapp && (
                      <span className="text-emerald-400 font-mono">📱 {selectedStudent.whatsapp}</span>
                    )}
                    {selectedStudent?.email && (
                      <span className="text-slate-400 truncate max-w-[200px]">✉️ {selectedStudent.email}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="shrink-0 self-end sm:self-center">
                <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 text-[10px] font-semibold border border-slate-700">
                  Student ID: #{formData.studentId || "—"}
                </span>
              </div>
            </div>

            {/* 2. ACADEMIC COURSE SELECTION */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                  <span>Enrolled Academic Course <span className="text-rose-400">*</span></span>
                </label>
                {selectedCourse && (
                  <span className="text-[11px] text-slate-400">
                    Standard Catalog Fee: <strong className="text-emerald-400 font-mono">₹{Number(selectedCourse.courseFees || selectedCourse.course_fees || 0).toLocaleString()}</strong>
                  </span>
                )}
              </div>

              <div className="relative">
                <select
                  value={formData.courseId}
                  onChange={handleCourseChange}
                  required
                  disabled={loadingResources}
                  className={`w-full bg-slate-950 border rounded-xl px-3.5 py-3 text-xs sm:text-sm text-white font-medium focus:outline-none focus:ring-2 cursor-pointer shadow-inner appearance-none pr-10 ${
                    fieldErrors.courseId || fieldErrors.course_id
                      ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30 ring-1 ring-rose-500"
                      : "border-slate-700 hover:border-slate-600 focus:border-sky-500 focus:ring-sky-500"
                  }`}
                >
                  <option value="">{loadingResources ? "Loading courses..." : "-- Select Academic Course --"}</option>
                  {courses.map((c) => {
                    const cId = c.id || c.courseId;
                    const code = c.course_code || c.courseCode || "CRS";
                    const name = c.course_name || c.courseName || "Course";
                    const fee = c.courseFees || c.course_fees || 0;
                    return (
                      <option key={cId} value={String(cId)}>
                        [{code}] {name} — Standard: ₹{Number(fee).toLocaleString()}
                      </option>
                    );
                  })}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {(fieldErrors.courseId || fieldErrors.course_id) && (
                <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  {fieldErrors.courseId || fieldErrors.course_id}
                </p>
              )}
            </div>

            {/* 3. FEE MODE & AGREED COURSE FEES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Fee Mode */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Payment Schedule / Fee Mode <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {feeModes.map((fm) => {
                    const isSelected = Number(formData.feeModesId) === Number(fm.id);
                    const isMonthly = Number(fm.id) === 1;
                    return (
                      <button
                        key={fm.id}
                        type="button"
                        onClick={() => {
                          setFieldErrors((prev) => {
                            const next = { ...prev };
                            delete next.feeModesId;
                            delete next.fee_modes_id;
                            return next;
                          });
                          setFormData((prev) => ({ ...prev, feeModesId: Number(fm.id) }));
                        }}
                        className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                          isSelected
                            ? "bg-sky-500/20 border-sky-500 text-white ring-1 ring-sky-500 shadow-md"
                            : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs">{isMonthly ? "Monthly" : "Course Fees"}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-sky-400" />}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {isMonthly ? "Accrues every month" : "Full lump sum payment"}
                        </p>
                      </button>
                    );
                  })}
                </div>
                {(fieldErrors.feeModesId || fieldErrors.fee_modes_id) && (
                  <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {fieldErrors.feeModesId || fieldErrors.fee_modes_id}
                  </p>
                )}
              </div>

              {/* Agreed Course Fees */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Agreed Course Fees (₹) <span className="text-rose-400">*</span>
                  </label>
                  {selectedCourse && (
                    <button
                      type="button"
                      onClick={() => {
                        setFieldErrors((prev) => {
                          const next = { ...prev };
                          delete next.courseFees;
                          delete next.course_fees;
                          return next;
                        });
                        setFormData((prev) => ({
                          ...prev,
                          courseFees: String(selectedCourse.courseFees || selectedCourse.course_fees || ""),
                        }));
                      }}
                      className="text-[10px] text-sky-400 hover:text-sky-300 underline font-semibold cursor-pointer"
                    >
                      Reset to Catalog Fee
                    </button>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 font-extrabold text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    required
                    min="0"
                    step="any"
                    value={formData.courseFees}
                    onChange={(e) => {
                      setFieldErrors((prev) => {
                        const next = { ...prev };
                        delete next.courseFees;
                        delete next.course_fees;
                        return next;
                      });
                      setFormData((prev) => ({ ...prev, courseFees: e.target.value }));
                    }}
                    placeholder="e.g. 12000"
                    className={`w-full bg-slate-950 border rounded-xl pl-8 pr-3.5 py-2.5 text-sm font-bold text-white focus:outline-none focus:ring-2 shadow-inner font-mono ${
                      fieldErrors.courseFees || fieldErrors.course_fees
                        ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30 ring-1 ring-rose-500"
                        : "border-slate-700 hover:border-slate-600 focus:border-sky-500 focus:ring-sky-500"
                    }`}
                  />
                </div>
                {(fieldErrors.courseFees || fieldErrors.course_fees) && (
                  <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {fieldErrors.courseFees || fieldErrors.course_fees}
                  </p>
                )}
              </div>
            </div>

            {/* 4. ADMISSION DATE & CLOSING DATE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Admission Date */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>Admission Date <span className="text-rose-400">*</span></span>
                  </label>
                  <div className="flex items-center gap-1 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setDatePreset("admissionDate", "today")}
                      className="text-sky-400 hover:underline"
                    >
                      Today
                    </button>
                    <span className="text-slate-600">•</span>
                    <button
                      type="button"
                      onClick={() => setDatePreset("admissionDate", "startOfMonth")}
                      className="text-sky-400 hover:underline"
                    >
                      1st of Mo
                    </button>
                  </div>
                </div>
                <input
                  type="date"
                  required
                  value={formData.admissionDate}
                  onChange={(e) => {
                    setFieldErrors((prev) => {
                      const next = { ...prev };
                      delete next.admissionDate;
                      delete next.admission_date;
                      return next;
                    });
                    setFormData((prev) => ({ ...prev, admissionDate: e.target.value }));
                  }}
                  className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:ring-2 cursor-pointer shadow-inner [&::-webkit-calendar-picker-indicator]:invert ${
                    fieldErrors.admissionDate || fieldErrors.admission_date
                      ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30 ring-1 ring-rose-500"
                      : "border-slate-700 hover:border-slate-600 focus:border-sky-500 focus:ring-sky-500"
                  }`}
                />
                {(fieldErrors.admissionDate || fieldErrors.admission_date) && (
                  <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {fieldErrors.admissionDate || fieldErrors.admission_date}
                  </p>
                )}
              </div>

              {/* Completion / Closing Date */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Closing / Completion Date</span>
                  </label>
                  <div className="flex items-center gap-1 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setDatePreset("completionDate", "today")}
                      className="text-amber-400 hover:underline"
                    >
                      Today
                    </button>
                    <span className="text-slate-600">•</span>
                    <button
                      type="button"
                      onClick={() => setDatePreset("completionDate", "clear")}
                      className="text-rose-400 hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <input
                  type="date"
                  value={formData.completionDate || ""}
                  onChange={(e) => {
                    setFieldErrors((prev) => {
                      const next = { ...prev };
                      delete next.completionDate;
                      delete next.completion_date;
                      return next;
                    });
                    setFormData((prev) => ({ ...prev, completionDate: e.target.value }));
                  }}
                  className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:ring-2 cursor-pointer shadow-inner [&::-webkit-calendar-picker-indicator]:invert ${
                    fieldErrors.completionDate || fieldErrors.completion_date
                      ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30 ring-1 ring-rose-500"
                      : "border-slate-700 hover:border-slate-600 focus:border-sky-500 focus:ring-sky-500"
                  }`}
                />
                {(fieldErrors.completionDate || fieldErrors.completion_date) && (
                  <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {fieldErrors.completionDate || fieldErrors.completion_date}
                  </p>
                )}
              </div>
            </div>

            {/* 5. COURSE ENROLLMENT STATUS */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Academic Course Status <span className="text-rose-400">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {STATUS_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = Number(formData.courseStatusId) === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleStatusChange(opt.id)}
                      className={`p-3 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-slate-800/90 border-indigo-500 ring-1 ring-indigo-500 shadow-md"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                          isSelected ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40" : "bg-slate-800 text-slate-400"
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                      </div>
                      <div>
                        <h4 className={`font-bold text-xs ${isSelected ? "text-white" : "text-slate-300"}`}>
                          {opt.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-snug line-clamp-2">
                          {opt.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {(fieldErrors.courseStatusId || fieldErrors.course_status_id) && (
                <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  {fieldErrors.courseStatusId || fieldErrors.course_status_id}
                </p>
              )}
            </div>

            {/* 6. ADMINISTRATIVE REMARKS */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Administrative Remarks / Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={formData.remarks}
                onChange={(e) => setFormData((prev) => ({ ...prev, remarks: e.target.value }))}
                placeholder="e.g. Course fee adjusted as per special scholarship / Batch timing changed..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 shadow-inner"
              />
            </div>

            {/* 7. LIVE AUDIT / CHANGE DIFF PREVIEW */}
            {diffSummary.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Summary of Modifications to be Saved ({diffSummary.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {diffSummary.map((diff, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between gap-2"
                    >
                      <span className="text-slate-400 font-semibold">{diff.label}:</span>
                      <div className="flex items-center gap-1.5 text-right font-mono truncate">
                        <span className="text-rose-400 line-through opacity-70 truncate max-w-[90px]">{diff.oldVal}</span>
                        <ArrowRight className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="text-emerald-400 font-bold truncate max-w-[100px]">{diff.newVal}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form>

          {/* Modal Footer Actions */}
          <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 flex-wrap">
            <div className="text-[11px] text-slate-400 hidden sm:block">
              * Updating admission propagates immediately across ledgers &amp; receipts.
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-sky-500/25 transition flex items-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
              >
                {saving ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save &amp; Update Admission</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
