// src/components/common/AdmissionStatusModal.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  X,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Ban,
  GraduationCap,
  Save,
  Sparkles,
  Info,
  RefreshCw,
} from "lucide-react";
import { admissionService } from "../../services/admissionService";

/**
 * Status definitions:
 * ID 1: Ongoing
 * ID 2: Completed
 * ID 3: Incomplete / Discontinued
 */
const STATUS_OPTIONS = [
  {
    id: 1,
    name: "Ongoing",
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

export default function AdmissionStatusModal({
  isOpen,
  onClose,
  admission,
  onSuccess,
}) {
  const [courseStatusId, setCourseStatusId] = useState(1);
  const [completionDate, setCompletionDate] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (admission && isOpen) {
      const statusId = Number(
        admission.courseStatusId ||
        admission.course_status_id ||
        admission.courseStatus?.id ||
        1
      );
      setCourseStatusId(statusId);

      const existingDate =
        admission.completionDate ||
        admission.completion_date ||
        "";
      setCompletionDate(existingDate ? existingDate.split("T")[0] : "");
    }
  }, [admission, isOpen]);

  // Helper date preset buttons
  const setDatePreset = (preset) => {
    const today = new Date();
    if (preset === "today") {
      setCompletionDate(today.toISOString().split("T")[0]);
    } else if (preset === "endOfThisMonth") {
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      setCompletionDate(lastDay.toISOString().split("T")[0]);
    } else if (preset === "endOfLastMonth") {
      const lastDayPrev = new Date(today.getFullYear(), today.getMonth(), 0);
      setCompletionDate(lastDayPrev.toISOString().split("T")[0]);
    } else if (preset === "clear") {
      setCompletionDate("");
    }
  };

  const handleStatusChange = (newStatusId) => {
    setCourseStatusId(newStatusId);
    // If selecting Completed (2) or Discontinued (3) and no date is set, automatically populate today's date
    if ((newStatusId === 2 || newStatusId === 3) && !completionDate) {
      const todayStr = new Date().toISOString().split("T")[0];
      setCompletionDate(todayStr);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!admission) return;

    const admId = admission.admissionId || admission.id || admission.admission_id;
    if (!admId) {
      Swal.fire({
        icon: "error",
        title: "Missing Admission ID",
        text: "Could not identify the admission record to update.",
      });
      return;
    }

    // Validation: If completed or discontinued, require a closing date for accurate fee ledger freezing
    if ((courseStatusId === 2 || courseStatusId === 3) && !completionDate) {
      Swal.fire({
        icon: "warning",
        title: "Closing Date Required",
        text: "Please specify a closing/completion date so fees and dues calculate accurately.",
      });
      return;
    }

    // Validate date order if admissionDate is present
    const admDate = admission.admissionDate || admission.admission_date;
    if (admDate && completionDate && completionDate < admDate.split("T")[0]) {
      Swal.fire({
        icon: "error",
        title: "Invalid Closing Date",
        text: `The closing date (${completionDate}) cannot be earlier than the admission date (${admDate.split("T")[0]}).`,
      });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        courseStatusId: Number(courseStatusId),
        completionDate: (courseStatusId === 1 && !completionDate) ? null : completionDate,
      };

      const res = await admissionService.updateStatus(admId, payload);

      const statusName =
        STATUS_OPTIONS.find((s) => s.id === courseStatusId)?.name || "Updated";

      Swal.fire({
        icon: "success",
        title: "Status & Closing Date Saved",
        html: `Student course marked as <strong class="text-emerald-500">${statusName}</strong>.<br/>${
          completionDate ? `Closing Date: <strong>${completionDate}</strong>` : "Status: Active / Ongoing"
        }`,
        timer: 2000,
        showConfirmButton: false,
      });

      if (onSuccess) {
        onSuccess({
          admissionId: admId,
          courseStatusId,
          courseStatusName: statusName,
          completionDate: payload.completionDate,
          response: res,
        });
      }

      onClose();
    } catch (err) {
      console.error("Failed to update admission status:", err);
      const errMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Could not update the admission status and closing date.";

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: errMsg,
      });
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !admission) return null;

  const studentName =
    admission.studentName ||
    admission.student?.name ||
    admission.student?.student_name ||
    admission.student?.studentName ||
    "Student";

  const courseName =
    admission.courseName ||
    admission.course?.name ||
    admission.course?.course_name ||
    admission.course?.courseName ||
    "Course";

  const admissionNumber =
    admission.admissionNo ||
    admission.admissionNumber ||
    admission.admission_number ||
    `ID: ${admission.admissionId || admission.id}`;

  const admissionDateStr =
    admission.admissionDate || admission.admission_date
      ? new Date(admission.admissionDate || admission.admission_date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.15 }}
          className="bg-slate-900 border border-slate-700/90 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col my-auto"
        >
          {/* Header */}
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  Update Course Status & Closing Date
                </h3>
                <p className="text-xs text-slate-400">
                  Manage student course completion or discontinuation
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
            {/* Student & Course Summary Card */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between items-center flex-wrap gap-1">
                <span className="text-slate-400">Student:</span>
                <span className="font-bold text-white text-sm">{studentName}</span>
              </div>
              <div className="flex justify-between items-center flex-wrap gap-1">
                <span className="text-slate-400">Course:</span>
                <span className="font-semibold text-sky-300">{courseName}</span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                <span>Adm No: <strong className="font-mono text-slate-200">{admissionNumber}</strong></span>
                <span>Admitted on: <strong className="text-slate-200">{admissionDateStr}</strong></span>
              </div>
            </div>

            {/* Status Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Select Enrollment Status
              </label>
              <div className="grid grid-cols-1 gap-2">
                {STATUS_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = courseStatusId === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleStatusChange(opt.id)}
                      className={`p-3 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? "bg-slate-800/90 border-indigo-500 ring-1 ring-indigo-500 shadow-md"
                          : "bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-400"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`font-bold text-xs ${isSelected ? "text-white" : "text-slate-300"}`}>
                            {opt.name}
                          </span>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px]">
                              ✓
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          {opt.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Closing / Completion Date */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>
                    {courseStatusId === 2
                      ? "Course Completion Date"
                      : courseStatusId === 3
                      ? "Discontinuation / Closing Date"
                      : "Target / Closing Date (Optional)"}
                  </span>
                </label>
                {(courseStatusId === 2 || courseStatusId === 3) && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    Required for accurate dues
                  </span>
                )}
              </div>

              <div className="relative">
                <input
                  type="date"
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
                />
              </div>

              {/* Quick Presets */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span className="text-[10px] text-slate-500 font-semibold mr-1">Quick Presets:</span>
                <button
                  type="button"
                  onClick={() => setDatePreset("today")}
                  className="px-2 py-1 rounded-md text-[10px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setDatePreset("endOfThisMonth")}
                  className="px-2 py-1 rounded-md text-[10px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
                >
                  End of This Month
                </button>
                <button
                  type="button"
                  onClick={() => setDatePreset("endOfLastMonth")}
                  className="px-2 py-1 rounded-md text-[10px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
                >
                  End of Last Month
                </button>
                {completionDate && (
                  <button
                    type="button"
                    onClick={() => setDatePreset("clear")}
                    className="px-2 py-1 rounded-md text-[10px] font-medium bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 transition cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Impact Explanation Note */}
            <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-300 text-xs flex items-start gap-2.5">
              <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-[11px] leading-relaxed">
                {courseStatusId === 2 || courseStatusId === 3 ? (
                  <p>
                    <strong>Accounting Freeze Active:</strong> When marked as{" "}
                    <strong>{courseStatusId === 2 ? "Completed" : "Incomplete/Discontinued"}</strong> with a closing date,
                    the student fee ledger will calculate monthly installments strictly up to <strong>{completionDate || "the closing date"}</strong>. No additional dues will accumulate for later months.
                  </p>
                ) : (
                  <p>
                    <strong>Ongoing Enrollment:</strong> Monthly fees will continue to accrue dynamically month-by-month as time progresses.
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white transition flex items-center gap-1.5 shadow-lg shadow-indigo-600/25 cursor-pointer disabled:opacity-50"
              >
                {saving ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                <span>Save Status & Closing Date</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
