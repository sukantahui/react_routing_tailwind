// src/components/common/EditFeePaymentModal.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  X,
  Receipt,
  IndianRupee,
  Calendar,
  CreditCard,
  Clock,
  Sparkles,
  Save,
  RefreshCw,
  AlertCircle,
  Check,
  ArrowRight,
  User,
  BookOpen,
  FileText,
  Smartphone,
  Building2,
  Banknote,
  Layers,
} from "lucide-react";
import { simpleFeesReceiptService } from "../../services/simpleFeesReceiptService";

const PAYMENT_MODES = [
  { id: "UPI", label: "UPI (GPay / PhonePe / Paytm / BHIM)", icon: Smartphone, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
  { id: "Cash", label: "Cash (Direct Counter Payment)", icon: Banknote, color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
  { id: "Bank Transfer", label: "Bank Transfer (NEFT / RTGS / IMPS)", icon: Building2, color: "text-sky-400 bg-sky-500/10 border-sky-500/30" },
  { id: "Cheque", label: "Cheque / Demand Draft", icon: FileText, color: "text-purple-400 bg-purple-500/10 border-purple-500/30" },
  { id: "Card", label: "Debit / Credit Card (POS)", icon: CreditCard, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30" },
  { id: "Other", label: "Other / Scholarship / Adjustment", icon: Layers, color: "text-slate-400 bg-slate-500/10 border-slate-500/30" },
];

export default function EditFeePaymentModal({
  isOpen,
  onClose,
  receipt,
  onSuccess,
}) {
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Form state
  const [formData, setFormData] = useState({
    amountPaid: "",
    paymentMode: "UPI",
    paymentDate: "",
    periodFrom: "",
    periodTo: "",
    remarks: "",
    feeType: "monthly",
  });

  // Keep original for diff calculation
  const [originalData, setOriginalData] = useState(null);

  // Parse validation errors from backend
  const parseValidationErrors = (err) => {
    if (!err) return { message: "An unknown error occurred.", details: [], fieldMap: {} };
    const resData = err.response?.data;
    if (!resData) {
      return { message: err.message || "Network connection issue. Please try again.", details: [], fieldMap: {} };
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
          .trim();
        details.push({ field: label, message: cleanMsg });
      });
      return {
        message: resData.message || "Validation failed for the fee payment data.",
        details,
        fieldMap,
      };
    }

    const message =
      (typeof resData.data === "string" && resData.data) ||
      resData.message ||
      resData.error ||
      err.message ||
      "Could not update fee receipt.";

    return { message, details: [], fieldMap: {} };
  };

  // Populate data when receipt prop opens
  useEffect(() => {
    if (receipt && isOpen) {
      const rawDate = receipt.paymentDate || receipt.payment_date || "";
      const paymentDate = rawDate ? rawDate.split("T")[0] : new Date().toISOString().split("T")[0];

      const rawFrom = receipt.periodFrom || receipt.period_from || "";
      const periodFrom = rawFrom ? rawFrom.split("T")[0] : "";

      const rawTo = receipt.periodTo || receipt.period_to || "";
      const periodTo = rawTo ? rawTo.split("T")[0] : "";

      const amt =
        receipt.amountPaid !== undefined && receipt.amountPaid !== null
          ? receipt.amountPaid
          : receipt.amount_paid !== undefined && receipt.amount_paid !== null
          ? receipt.amount_paid
          : "";

      const mode = receipt.paymentMode || receipt.payment_mode || "UPI";
      const remarks = receipt.remarks || "";
      const feeType = receipt.feeType || receipt.fee_type || "monthly";

      const populated = {
        amountPaid: String(amt),
        paymentMode: mode,
        paymentDate,
        periodFrom,
        periodTo,
        remarks,
        feeType,
      };

      setFormData(populated);
      setOriginalData(populated);
      setFieldErrors({});
    }
  }, [receipt, isOpen]);

  // Date Preset Helpers
  const setDatePreset = (field, preset) => {
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
      delete next[field];
      delete next[field === "paymentDate" ? "payment_date" : field === "periodFrom" ? "period_from" : "period_to"];
      return next;
    });

    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  // Set coverage period presets
  const setPeriodPreset = (preset) => {
    const today = new Date();
    if (preset === "thisMonth") {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      setFormData((prev) => ({
        ...prev,
        periodFrom: start.toISOString().split("T")[0],
        periodTo: end.toISOString().split("T")[0],
      }));
    } else if (preset === "lastMonth") {
      const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const end = new Date(today.getFullYear(), today.getMonth(), 0);
      setFormData((prev) => ({
        ...prev,
        periodFrom: start.toISOString().split("T")[0],
        periodTo: end.toISOString().split("T")[0],
      }));
    } else if (preset === "clear") {
      setFormData((prev) => ({
        ...prev,
        periodFrom: "",
        periodTo: "",
      }));
    }

    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next.periodFrom;
      delete next.period_from;
      delete next.periodTo;
      delete next.period_to;
      return next;
    });
  };

  // Live Diff Calculations
  const diffSummary = useMemo(() => {
    if (!originalData) return [];
    const diffs = [];

    if (Number(formData.amountPaid) !== Number(originalData.amountPaid)) {
      diffs.push({
        label: "Amount Paid",
        oldVal: `₹${Number(originalData.amountPaid || 0).toLocaleString()}`,
        newVal: `₹${Number(formData.amountPaid || 0).toLocaleString()}`,
      });
    }

    if (formData.paymentMode !== originalData.paymentMode) {
      diffs.push({
        label: "Payment Mode",
        oldVal: originalData.paymentMode,
        newVal: formData.paymentMode,
      });
    }

    if (formData.paymentDate !== originalData.paymentDate) {
      diffs.push({
        label: "Payment Date",
        oldVal: originalData.paymentDate,
        newVal: formData.paymentDate,
      });
    }

    if (formData.periodFrom !== originalData.periodFrom || formData.periodTo !== originalData.periodTo) {
      diffs.push({
        label: "Coverage Period",
        oldVal: originalData.periodFrom ? `${originalData.periodFrom} to ${originalData.periodTo || "—"}` : "None",
        newVal: formData.periodFrom ? `${formData.periodFrom} to ${formData.periodTo || "—"}` : "None",
      });
    }

    if (formData.remarks !== originalData.remarks) {
      diffs.push({
        label: "Remarks",
        oldVal: originalData.remarks || "(empty)",
        newVal: formData.remarks || "(empty)",
      });
    }

    return diffs;
  }, [formData, originalData]);

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!receipt) return;

    setFieldErrors({});

    const receiptId = receipt.id || receipt.receiptId || receipt.receipt_id;
    if (!receiptId) {
      Swal.fire({
        icon: "error",
        title: "Missing Receipt ID",
        text: "Could not identify the fee receipt record to update.",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    if (formData.amountPaid === "" || isNaN(Number(formData.amountPaid)) || Number(formData.amountPaid) <= 0) {
      setFieldErrors((prev) => ({ ...prev, amountPaid: "Amount paid must be a positive number greater than 0." }));
      Swal.fire({
        icon: "warning",
        title: "Invalid Amount",
        text: "Please enter a valid amount paid (greater than ₹0).",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    if (!formData.paymentDate) {
      setFieldErrors((prev) => ({ ...prev, paymentDate: "Payment date is required." }));
      Swal.fire({
        icon: "warning",
        title: "Payment Date Required",
        text: "Please provide the official transaction payment date.",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    // Validate period date order if provided
    if (formData.periodFrom && formData.periodTo && formData.periodTo < formData.periodFrom) {
      setFieldErrors((prev) => ({
        ...prev,
        periodTo: `Period end date (${formData.periodTo}) cannot be earlier than period start (${formData.periodFrom}).`,
      }));
      Swal.fire({
        icon: "error",
        title: "Invalid Period Order",
        text: `Period To (${formData.periodTo}) cannot be before Period From (${formData.periodFrom}).`,
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    // Confirm dialog with changes preview
    const receiptNo = receipt.receiptNo || receipt.receipt_no || `RCP-${receiptId}`;
    const studentName =
      receipt.studentName ||
      receipt.student?.studentName ||
      receipt.student?.student_name ||
      "Student";

    const confirmRes = await Swal.fire({
      title: "Save Fee Payment Modifications?",
      html: `
        <div class="text-left text-xs text-slate-300 space-y-2 p-3 bg-slate-950/80 rounded-xl border border-slate-800">
          <p class="font-bold text-white text-sm">Receipt ${receiptNo} — ${studentName}</p>
          <div class="space-y-1 pt-1">
            <p>• Amount: <strong class="text-emerald-400">₹${Number(formData.amountPaid).toLocaleString()}</strong></p>
            <p>• Mode: <strong class="text-sky-400">${formData.paymentMode}</strong></p>
            <p>• Date: <strong class="text-slate-200">${formData.paymentDate}</strong></p>
            ${formData.periodFrom ? `<p>• Coverage: <strong class="text-amber-300">${formData.periodFrom} to ${formData.periodTo || "—"}</strong></p>` : ""}
          </div>
          ${diffSummary.length > 0 ? `<div class="mt-2 pt-2 border-t border-slate-800 text-[11px] text-amber-300"><b>${diffSummary.length} parameter(s) modified.</b></div>` : ""}
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update Receipt",
      cancelButtonText: "Review Changes",
      confirmButtonColor: "#059669",
      cancelButtonColor: "#475569",
      background: "#0f172a",
      color: "#f8fafc",
    });

    if (!confirmRes.isConfirmed) return;

    setSaving(true);
    try {
      const admissionId =
        receipt.admissionId ||
        receipt.admission_id ||
        receipt.admission?.admissionId ||
        receipt.admission?.id;

      const studentId =
        receipt.studentId ||
        receipt.student_id ||
        receipt.student?.studentId ||
        receipt.student?.id;

      const courseId =
        receipt.courseId ||
        receipt.course_id ||
        receipt.course?.courseId ||
        receipt.course?.id;

      const payload = {
        amountPaid: Number(formData.amountPaid),
        amount_paid: Number(formData.amountPaid),
        paymentMode: formData.paymentMode,
        payment_mode: formData.paymentMode,
        paymentDate: formData.paymentDate.split("T")[0],
        payment_date: formData.paymentDate.split("T")[0],
        periodFrom: formData.periodFrom ? formData.periodFrom.split("T")[0] : null,
        period_from: formData.periodFrom ? formData.periodFrom.split("T")[0] : null,
        periodTo: formData.periodTo ? formData.periodTo.split("T")[0] : null,
        period_to: formData.periodTo ? formData.periodTo.split("T")[0] : null,
        remarks: formData.remarks && formData.remarks.trim() ? formData.remarks.trim() : null,
        feeType: formData.feeType,
        fee_type: formData.feeType,
        receiptNo: receiptNo,
        receipt_no: receiptNo,
      };

      if (admissionId) {
        payload.admissionId = Number(admissionId);
        payload.admission_id = Number(admissionId);
      }
      if (studentId) {
        payload.studentId = Number(studentId);
        payload.student_id = Number(studentId);
      }
      if (courseId) {
        payload.courseId = Number(courseId);
        payload.course_id = Number(courseId);
      }

      const res = await simpleFeesReceiptService.update(receiptId, payload);

      Swal.fire({
        icon: "success",
        title: "Fee Payment Updated! 💳",
        text: `Receipt #${receiptNo} has been updated successfully.`,
        timer: 2000,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#f8fafc",
      });

      if (onSuccess) {
        onSuccess({
          ...receipt,
          id: receiptId,
          receiptId,
          ...payload,
          amount_paid: payload.amountPaid,
          payment_mode: payload.paymentMode,
          payment_date: payload.paymentDate,
          period_from: payload.periodFrom,
          period_to: payload.periodTo,
          fee_type: payload.feeType,
          response: res,
        });
      }

      onClose();
    } catch (err) {
      console.error("Failed to update fee receipt:", err);
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
        title: "Update Failed",
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

  if (!isOpen || !receipt) return null;

  const receiptNo =
    receipt.receiptNo ||
    receipt.receipt_no ||
    `RCP-${receipt.id || receipt.receiptId}`;

  const studentName =
    receipt.studentName ||
    receipt.student?.studentName ||
    receipt.student?.student_name ||
    receipt.student?.name ||
    "Student";

  const courseName =
    receipt.courseName ||
    receipt.course?.courseName ||
    receipt.course?.course_name ||
    receipt.course?.name ||
    "Course";

  const regNo =
    receipt.student?.registrationNumber ||
    receipt.student?.registration_number ||
    (receipt.studentId ? `STU-${receipt.studentId}` : "STU-2026");

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-900 border border-slate-700/90 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[94vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-600 to-sky-600 border border-emerald-400/40 flex items-center justify-center text-white text-xl shadow-lg shadow-emerald-500/20 shrink-0">
                <Receipt className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg sm:text-xl font-extrabold text-white truncate">
                    Edit Fee Receipt
                  </h2>
                  <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {receiptNo}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update payment installment amount, mode, transaction date, or period coverage.
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-200">
            {/* Student & Course Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-md">
                  {studentName.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Student:</span>
                    <span className="font-mono text-[10px] font-bold text-sky-400 bg-sky-500/10 px-1.5 py-0.2 rounded border border-sky-500/20">
                      {regNo}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white truncate mt-0.5">
                    {studentName}
                  </h3>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 flex-wrap mt-0.5">
                    <span className="text-sky-300 font-medium">📚 {courseName}</span>
                    {receipt.admissionId && (
                      <span className="text-slate-500">| Adm #{receipt.admissionId}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="shrink-0 self-end sm:self-center">
                <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 text-[10px] font-semibold border border-slate-700">
                  Receipt #{receipt.id || receipt.receiptId || receipt.receiptNo}
                </span>
              </div>
            </div>

            {/* 1. Amount Paid & Payment Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Amount Paid */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Amount Paid (₹) <span className="text-rose-400">*</span>
                  </label>
                  {originalData && (
                    <button
                      type="button"
                      onClick={() => {
                        setFieldErrors((prev) => {
                          const next = { ...prev };
                          delete next.amountPaid;
                          delete next.amount_paid;
                          return next;
                        });
                        setFormData((prev) => ({ ...prev, amountPaid: originalData.amountPaid }));
                      }}
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 underline font-semibold cursor-pointer"
                    >
                      Reset (₹{Number(originalData.amountPaid).toLocaleString()})
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
                    min="1"
                    step="any"
                    value={formData.amountPaid}
                    onChange={(e) => {
                      setFieldErrors((prev) => {
                        const next = { ...prev };
                        delete next.amountPaid;
                        delete next.amount_paid;
                        return next;
                      });
                      setFormData((prev) => ({ ...prev, amountPaid: e.target.value }));
                    }}
                    placeholder="e.g. 1500"
                    className={`w-full bg-slate-950 border rounded-xl pl-8 pr-3.5 py-2.5 text-sm font-bold text-white focus:outline-none focus:ring-2 shadow-inner font-mono ${
                      fieldErrors.amountPaid || fieldErrors.amount_paid
                        ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30 ring-1 ring-rose-500"
                        : "border-slate-700 hover:border-slate-600 focus:border-emerald-500 focus:ring-emerald-500"
                    }`}
                  />
                </div>
                {(fieldErrors.amountPaid || fieldErrors.amount_paid) && (
                  <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {fieldErrors.amountPaid || fieldErrors.amount_paid}
                  </p>
                )}
              </div>

              {/* Payment Date */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Payment Date <span className="text-rose-400">*</span></span>
                  </label>
                  <div className="flex items-center gap-1 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setDatePreset("paymentDate", "today")}
                      className="text-emerald-400 hover:underline"
                    >
                      Today
                    </button>
                    <span className="text-slate-600">•</span>
                    <button
                      type="button"
                      onClick={() => setDatePreset("paymentDate", "startOfMonth")}
                      className="text-emerald-400 hover:underline"
                    >
                      1st of Mo
                    </button>
                  </div>
                </div>
                <input
                  type="date"
                  required
                  value={formData.paymentDate}
                  onChange={(e) => {
                    setFieldErrors((prev) => {
                      const next = { ...prev };
                      delete next.paymentDate;
                      delete next.payment_date;
                      return next;
                    });
                    setFormData((prev) => ({ ...prev, paymentDate: e.target.value }));
                  }}
                  className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:ring-2 cursor-pointer shadow-inner [&::-webkit-calendar-picker-indicator]:invert ${
                    fieldErrors.paymentDate || fieldErrors.payment_date
                      ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30 ring-1 ring-rose-500"
                      : "border-slate-700 hover:border-slate-600 focus:border-emerald-500 focus:ring-emerald-500"
                  }`}
                />
                {(fieldErrors.paymentDate || fieldErrors.payment_date) && (
                  <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {fieldErrors.paymentDate || fieldErrors.payment_date}
                  </p>
                )}
              </div>
            </div>

            {/* 2. Payment Mode Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Payment Channel / Mode <span className="text-rose-400">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PAYMENT_MODES.map((pm) => {
                  const Icon = pm.icon;
                  const isSelected = formData.paymentMode?.toLowerCase() === pm.id.toLowerCase();
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => {
                        setFieldErrors((prev) => {
                          const next = { ...prev };
                          delete next.paymentMode;
                          delete next.payment_mode;
                          return next;
                        });
                        setFormData((prev) => ({ ...prev, paymentMode: pm.id }));
                      }}
                      className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? "bg-emerald-500/20 border-emerald-500 text-white ring-1 ring-emerald-500 shadow-md"
                          : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${pm.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs truncate">{pm.id}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {(fieldErrors.paymentMode || fieldErrors.payment_mode) && (
                <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  {fieldErrors.paymentMode || fieldErrors.payment_mode}
                </p>
              )}
            </div>

            {/* 3. Coverage Period (Optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Period From */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    <span>Coverage Period From</span>
                  </label>
                  <div className="flex items-center gap-1 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setPeriodPreset("thisMonth")}
                      className="text-sky-400 hover:underline"
                    >
                      This Mo
                    </button>
                    <span className="text-slate-600">•</span>
                    <button
                      type="button"
                      onClick={() => setPeriodPreset("lastMonth")}
                      className="text-sky-400 hover:underline"
                    >
                      Last Mo
                    </button>
                  </div>
                </div>
                <input
                  type="date"
                  value={formData.periodFrom || ""}
                  onChange={(e) => {
                    setFieldErrors((prev) => {
                      const next = { ...prev };
                      delete next.periodFrom;
                      delete next.period_from;
                      return next;
                    });
                    setFormData((prev) => ({ ...prev, periodFrom: e.target.value }));
                  }}
                  className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:ring-2 cursor-pointer shadow-inner [&::-webkit-calendar-picker-indicator]:invert ${
                    fieldErrors.periodFrom || fieldErrors.period_from
                      ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30 ring-1 ring-rose-500"
                      : "border-slate-700 hover:border-slate-600 focus:border-sky-500 focus:ring-sky-500"
                  }`}
                />
                {(fieldErrors.periodFrom || fieldErrors.period_from) && (
                  <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {fieldErrors.periodFrom || fieldErrors.period_from}
                  </p>
                )}
              </div>

              {/* Period To */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    <span>Coverage Period To</span>
                  </label>
                  <div className="flex items-center gap-1 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setPeriodPreset("clear")}
                      className="text-rose-400 hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <input
                  type="date"
                  value={formData.periodTo || ""}
                  onChange={(e) => {
                    setFieldErrors((prev) => {
                      const next = { ...prev };
                      delete next.periodTo;
                      delete next.period_to;
                      return next;
                    });
                    setFormData((prev) => ({ ...prev, periodTo: e.target.value }));
                  }}
                  className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:ring-2 cursor-pointer shadow-inner [&::-webkit-calendar-picker-indicator]:invert ${
                    fieldErrors.periodTo || fieldErrors.period_to
                      ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30 ring-1 ring-rose-500"
                      : "border-slate-700 hover:border-slate-600 focus:border-sky-500 focus:ring-sky-500"
                  }`}
                />
                {(fieldErrors.periodTo || fieldErrors.period_to) && (
                  <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {fieldErrors.periodTo || fieldErrors.period_to}
                  </p>
                )}
              </div>
            </div>

            {/* 4. Narration & Remarks */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Administrative Remarks / Transaction Narration
              </label>
              <textarea
                rows={2}
                value={formData.remarks}
                onChange={(e) => setFormData((prev) => ({ ...prev, remarks: e.target.value }))}
                placeholder="e.g. September 2026 monthly installment / UPI Txn ID: 4293849283..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 shadow-inner"
              />
            </div>

            {/* 5. Live Modifications Audit Diff */}
            {diffSummary.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Modifications to be Saved ({diffSummary.length})</span>
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

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 flex-wrap">
            <div className="text-[11px] text-slate-400 hidden sm:block">
              * Updating receipt updates student ledger &amp; voucher immediately.
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
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-sky-600 hover:from-emerald-400 hover:to-sky-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition flex items-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
              >
                {saving ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving Receipt...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save &amp; Update Receipt</span>
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
