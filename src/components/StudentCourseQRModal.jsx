// ============================================================================
// StudentCourseQRModal.jsx - Dynamic Student Course QR Generator & WhatsApp Share
// ============================================================================
// Features:
// - Course selector pre-populated from courses.json (with category grouping & search)
// - Auto-fills standard fee, duration, mode, instructor & merit scholarship
// - Student details (Name, Phone/WhatsApp, Roll/ID, Batch timing, Remarks)
// - Dynamic fee calculator (Full fee, monthly installment chips, discount %, net payable)
// - Live high-contrast QR Code with Coder & AccoTax watermark
// - Generates NPCI-standard UPI URL with student name & course remark
// - Multi-mode QR toggle (UPI Payment, Course Card Summary, WhatsApp Direct QR)
// - Rich WhatsApp Detail Text formatter with 1-click share to official WhatsApp (+91 94324 56083)
// - 1-Click Send to Student's WhatsApp if student phone is provided
// - Copy QR Image to Clipboard (for direct Ctrl+V in WhatsApp chat)
// - Download High-Res Branded QR Card (PNG) & Print slip
// ============================================================================

import React, { useState, useEffect, useMemo } from "react";
import QRCode from "react-qr-code";
import QRCodeLib from "qrcode";
import {
  QrCode,
  Copy,
  Check,
  Download,
  Printer,
  ShieldCheck,
  User,
  Phone,
  BookOpen,
  Percent,
  X,
  MessageCircle,
  CreditCard,
  Send,
  Eye,
  Hash,
} from "lucide-react";
import coursesData from "../data/courses.json";
import cnatLogo from "../assets/cnat.png";

const OFFICIAL_WHATSAPP = "919432456083";
const UPI_ID = "9432456083@upi";
const MERCHANT_NAME = "Coder & AccoTax";

const INSTALLMENT_PRESETS = [
  { label: "₹1,000", value: 1000 },
  { label: "₹1,500", value: 1500 },
  { label: "₹2,000", value: 2000 },
  { label: "₹2,500", value: 2500 },
  { label: "₹3,000", value: 3000 },
  { label: "₹5,000", value: 5000 },
];

const BATCH_TIMINGS = [
  "Morning (08:00 AM - 10:00 AM)",
  "Morning (10:00 AM - 12:00 PM)",
  "Afternoon (02:00 PM - 04:00 PM)",
  "Evening (05:00 PM - 07:00 PM)",
  "Evening (07:00 PM - 09:00 PM)",
  "Weekend Saturday & Sunday (Special Batch)",
  "Flexible / Self-Paced (Online)",
];

export default function StudentCourseQRModal({
  isOpen = true,
  onClose,
  initialCourse = null,
  initialStudentName = "",
  initialStudentPhone = "",
}) {
  // Flatten all courses from courses.json
  const allCourses = useMemo(() => {
    const list = [];
    if (Array.isArray(coursesData)) {
      coursesData.forEach((group) => {
        if (Array.isArray(group.courses)) {
          group.courses.forEach((c) => {
            list.push({
              ...c,
              category: group.category,
              groupImage: group.groupImage,
            });
          });
        }
      });
    }
    return list;
  }, []);

  // Selected course state
  const [selectedCourseId, setSelectedCourseId] = useState(
    initialCourse?.courseID || allCourses[0]?.courseID || "custom"
  );
  const [isCustomCourse, setIsCustomCourse] = useState(false);
  const [customCourseTitle, setCustomCourseTitle] = useState("");
  const [customCourseCategory, setCustomCourseCategory] = useState("General Programming");
  const [customCourseFee, setCustomCourseFee] = useState("1500");

  // Student inputs
  const [studentName, setStudentName] = useState(initialStudentName || "");
  const [studentPhone, setStudentPhone] = useState(initialStudentPhone || "");
  const [studentRollNo, setStudentRollNo] = useState("");
  const [batchTiming, setBatchTiming] = useState(BATCH_TIMINGS[3]);
  const [classMode, setClassMode] = useState("Online / Offline (Hybrid)");
  const [studentRemarks, setStudentRemarks] = useState("");

  // Payment / Fee states
  const [paymentType, setPaymentType] = useState("installment"); // 'full' | 'installment' | 'custom'
  const [customPayAmount, setCustomPayAmount] = useState("1500");
  const [discountPercent, setDiscountPercent] = useState(0); // 0 to 50%
  const [qrType, setQrType] = useState("upi"); // 'upi' | 'summary' | 'wa'

  // Copy / Download feedback states
  const [copiedText, setCopiedText] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [previewCard, setPreviewCard] = useState(false);

  // Sync initialCourse prop when passed
  useEffect(() => {
    if (initialCourse) {
      if (typeof initialCourse === "string") {
        const found = allCourses.find(
          (c) => c.courseID === initialCourse || c.title.toLowerCase() === initialCourse.toLowerCase()
        );
        if (found) {
          setSelectedCourseId(found.courseID);
          setIsCustomCourse(false);
        } else {
          setIsCustomCourse(true);
          setCustomCourseTitle(initialCourse);
        }
      } else if (initialCourse.courseID) {
        setSelectedCourseId(initialCourse.courseID);
        setIsCustomCourse(false);
      }
    }
  }, [initialCourse, allCourses]);

  // Selected course object
  const activeCourse = useMemo(() => {
    if (isCustomCourse || selectedCourseId === "custom") {
      const numFee = parseFloat(customCourseFee.replace(/[^0-9.]/g, "")) || 0;
      return {
        courseID: "CUSTOM-" + Math.floor(1000 + Math.random() * 9000),
        title: customCourseTitle || "Custom Course / Tuition",
        category: customCourseCategory || "Special Course",
        fee: `₹${numFee.toLocaleString("en-IN")}`,
        numericFee: numFee,
        duration: "Flexible",
        mode: classMode || "Online / Offline",
        level: "All Levels",
        instructor: "Sukanta Hui",
        meritDiscount: { available: true, actualDiscountPercent: 10 },
      };
    }
    const found = allCourses.find((c) => c.courseID === selectedCourseId) || allCourses[0];
    const numFee = found?.fee ? parseFloat(String(found.fee).replace(/[^0-9.]/g, "")) || 0 : 0;
    return {
      ...found,
      numericFee: numFee,
    };
  }, [
    isCustomCourse,
    selectedCourseId,
    customCourseTitle,
    customCourseCategory,
    customCourseFee,
    classMode,
    allCourses,
  ]);

  // Set default discount from course meritDiscount when course changes
  const courseDiscount = activeCourse?.meritDiscount?.actualDiscountPercent;
  useEffect(() => {
    if (courseDiscount) {
      setDiscountPercent(courseDiscount);
    } else {
      setDiscountPercent(0);
    }
  }, [courseDiscount, selectedCourseId]);

  // Fee computations
  const feeSummary = useMemo(() => {
    const originalFee = activeCourse?.numericFee || 0;
    const discountAmt = Math.round((originalFee * (discountPercent || 0)) / 100);
    const netPayable = Math.max(0, originalFee - discountAmt);

    let payingNow = 0;
    if (paymentType === "full") {
      payingNow = netPayable > 0 ? netPayable : 0;
    } else if (paymentType === "installment") {
      const parsed = parseFloat(customPayAmount) || 1500;
      payingNow = parsed > 0 ? parsed : 1500;
    } else {
      const parsed = parseFloat(customPayAmount) || 0;
      payingNow = parsed > 0 ? parsed : 0;
    }

    const remainingBalance = Math.max(0, netPayable - payingNow);

    return {
      originalFee,
      discountPercent,
      discountAmt,
      netPayable,
      payingNow,
      remainingBalance,
    };
  }, [activeCourse, discountPercent, paymentType, customPayAmount]);

  // Auto-generate a clean Student Ref / Token ID
  const studentRef = useMemo(() => {
    if (studentRollNo.trim()) return studentRollNo.trim().toUpperCase();
    const prefix = "CNAT";
    const namePart = (studentName || "STU")
      .trim()
      .replace(/[^a-zA-Z]/g, "")
      .slice(0, 3)
      .toUpperCase();
    const coursePart = (activeCourse?.courseID || "CRS").slice(-3).toUpperCase();
    return `${prefix}-${namePart}-${coursePart}`;
  }, [studentName, studentRollNo, activeCourse]);

  // Clean UPI Payload
  const upiPayload = useMemo(() => {
    const cleanPa = "9432456083@upi";
    const cleanPn = MERCHANT_NAME;
    let uri = `upi://pay?pa=${cleanPa}&pn=${encodeURIComponent(cleanPn)}&cu=INR`;

    if (feeSummary.payingNow > 0) {
      uri += `&am=${feeSummary.payingNow.toFixed(2)}`;
    }

    const noteWords = [];
    if (studentName.trim()) noteWords.push(studentName.trim());
    if (activeCourse?.title) noteWords.push(activeCourse.title);
    noteWords.push("Fee");

    const cleanNote = noteWords
      .join(" ")
      .replace(/[^a-zA-Z0-9 ]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 50);

    if (cleanNote) {
      uri += `&tn=${encodeURIComponent(cleanNote)}`;
    }

    return uri;
  }, [feeSummary.payingNow, studentName, activeCourse]);

  // Structured Detailed WhatsApp Message
  const whatsappDetailText = useMemo(() => {
    const dateStr = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const lines = [
      `🎓 *CODER & ACCOTAX - STUDENT COURSE ADMISSION & FEE ADVICE*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *STUDENT DETAILS:*`,
      `• *Student Name:* ${studentName.trim() || "Prospective Student"}`,
      studentPhone.trim() ? `• *Contact Phone:* ${studentPhone.trim()}` : null,
      `• *Enrollment Ref:* ${studentRef}`,
      ``,
      `📚 *COURSE SELECTED:*`,
      `• *Course Title:* ${activeCourse.title}`,
      `• *Category:* ${activeCourse.category || "Professional Training"}`,
      `• *Duration:* ${activeCourse.duration || "Standard Track"}`,
      `• *Preferred Mode:* ${classMode || activeCourse.mode || "Online / Offline"}`,
      `• *Preferred Batch:* ${batchTiming}`,
      `• *Faculty Mentor:* ${activeCourse.instructor || "Sukanta Hui"}`,
      ``,
      `💰 *FEE STRUCTURE & PAYMENT DETAILS:*`,
      `• *Standard Course Fee:* ₹${feeSummary.originalFee.toLocaleString("en-IN")}`,
      feeSummary.discountAmt > 0
        ? `• *Merit Discount (${feeSummary.discountPercent}%):* -₹${feeSummary.discountAmt.toLocaleString("en-IN")}`
        : null,
      `• *Net Payable Fee:* *₹${feeSummary.netPayable.toLocaleString("en-IN")}*`,
      `• *Amount Paying Today / Advice:* *₹${feeSummary.payingNow.toLocaleString("en-IN")}*`,
      feeSummary.remainingBalance > 0
        ? `• *Balance Due:* ₹${feeSummary.remainingBalance.toLocaleString("en-IN")}`
        : `• *Payment Status:* Full Fee Settlement`,
      ``,
      `💳 *UPI PAYMENT CREDENTIALS:*`,
      `• *Official UPI ID:* ${UPI_ID}`,
      `• *Payee Merchant:* ${MERCHANT_NAME}`,
      `• *UPI Note / Remark:* ${studentName.trim() || "Student"} ${activeCourse.title} Fee`,
      ``,
      studentRemarks.trim() ? `📝 *Student Remarks / Requests:*\n"${studentRemarks.trim()}"\n` : null,
      `🗓️ *Generated On:* ${dateStr}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `_Please acknowledge this course enrollment advice and issue the official digital stamped receipt upon fee realization._`,
    ].filter(Boolean);

    return lines.join("\n");
  }, [
    studentName,
    studentPhone,
    studentRef,
    activeCourse,
    classMode,
    batchTiming,
    feeSummary,
    studentRemarks,
  ]);

  // Official WhatsApp Link
  const officialWhatsAppUrl = useMemo(() => {
    return `https://wa.me/${OFFICIAL_WHATSAPP}?text=${encodeURIComponent(whatsappDetailText)}`;
  }, [whatsappDetailText]);

  // Student WhatsApp Direct Link (if student phone provided)
  const studentWhatsAppUrl = useMemo(() => {
    const cleanNum = studentPhone.replace(/[^0-9]/g, "");
    if (!cleanNum || cleanNum.length < 10) return null;
    const fullNum = cleanNum.length === 10 ? `91${cleanNum}` : cleanNum;
    return `https://wa.me/${fullNum}?text=${encodeURIComponent(whatsappDetailText)}`;
  }, [studentPhone, whatsappDetailText]);

  // Active QR payload based on qrType
  const activeQrCodeValue = useMemo(() => {
    if (qrType === "wa") {
      return officialWhatsAppUrl;
    }
    if (qrType === "summary") {
      return JSON.stringify({
        institute: "Coder & AccoTax",
        upi: UPI_ID,
        student: studentName.trim() || "Student",
        course: activeCourse.title,
        ref: studentRef,
        amount: feeSummary.payingNow,
        netFee: feeSummary.netPayable,
        date: new Date().toISOString().split("T")[0],
      });
    }
    return upiPayload;
  }, [qrType, officialWhatsAppUrl, studentName, activeCourse, studentRef, feeSummary, upiPayload]);

  // Copy Detail Text
  const handleCopyDetailText = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(whatsappDetailText);
      } else {
        const ta = document.createElement("textarea");
        ta.value = whatsappDetailText;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch (err) {
      console.error("Failed to copy detail text:", err);
    }
  };

  // Download High-Resolution Branded QR Card
  const handleDownloadQRCard = async () => {
    try {
      setIsDownloading(true);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const width = 1000;
      const height = 1350;
      canvas.width = width;
      canvas.height = height;

      // Dark Gradient Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#030712");
      bgGrad.addColorStop(0.5, "#0b1329");
      bgGrad.addColorStop(1, "#030712");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Card Border & Glow
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 4;
      ctx.strokeRect(30, 30, width - 60, height - 60);

      // Header Banner
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(34, 34, width - 68, 160);

      // Header Accent line
      const lineGrad = ctx.createLinearGradient(34, 194, width - 34, 194);
      lineGrad.addColorStop(0, "#0284c7");
      lineGrad.addColorStop(0.5, "#10b981");
      lineGrad.addColorStop(1, "#8b5cf6");
      ctx.fillStyle = lineGrad;
      ctx.fillRect(34, 190, width - 68, 6);

      // Institute Name & Title
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 38px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(MERCHANT_NAME.toUpperCase(), width / 2, 95);

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("STUDENT COURSE ENROLLMENT & FEE PAYMENT QR", width / 2, 135);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "16px sans-serif";
      ctx.fillText(`Ref: ${studentRef} • Official UPI: ${UPI_ID}`, width / 2, 168);

      // Student & Course Info Box
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(70, 230, width - 140, 210);
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 2;
      ctx.strokeRect(70, 230, width - 140, 210);

      ctx.textAlign = "left";
      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText(`Student: ${studentName.trim() || "Prospective Student"}`, 100, 275);

      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(`Course: ${activeCourse.title}`, 100, 320);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "18px sans-serif";
      ctx.fillText(
        `Batch: ${batchTiming} • Mode: ${classMode || "Online / Offline"}`,
        100,
        360
      );

      ctx.fillStyle = "#10b981";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText(
        `Payable Amount: ₹${feeSummary.payingNow.toLocaleString("en-IN")}  (Net Fee: ₹${feeSummary.netPayable.toLocaleString("en-IN")})`,
        100,
        405
      );

      // Generate QR Data URL
      const qrDataUrl = await QRCodeLib.toDataURL(activeQrCodeValue, {
        width: 540,
        margin: 2,
        errorCorrectionLevel: "H",
        color: {
          dark: "#090d16",
          light: "#ffffff",
        },
      });

      const qrImg = new Image();
      qrImg.src = qrDataUrl;
      await new Promise((resolve) => {
        qrImg.onload = resolve;
      });

      // White QR Container Card
      const qrBoxX = 220;
      const qrBoxY = 480;
      const qrBoxSize = 560;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize);
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 6;
      ctx.strokeRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize);

      ctx.drawImage(qrImg, qrBoxX + 10, qrBoxY + 10, qrBoxSize - 20, qrBoxSize - 20);

      // Bottom Instructions
      ctx.textAlign = "center";
      ctx.fillStyle = "#f8fafc";
      ctx.font = "bold 26px sans-serif";
      ctx.fillText("SCAN WITH ANY UPI APP TO PAY DIRECTLY", width / 2, 1100);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "18px sans-serif";
      ctx.fillText(
        "Google Pay • PhonePe • Paytm • BHIM • Amazon Pay • Cred",
        width / 2,
        1140
      );

      // WhatsApp Help Footer Box
      ctx.fillStyle = "#064e3b";
      ctx.fillRect(70, 1180, width - 140, 100);
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      ctx.strokeRect(70, 1180, width - 140, 100);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(
        "Official WhatsApp Desk: +91 94324 56083",
        width / 2,
        1225
      );

      ctx.fillStyle = "#6ee7b7";
      ctx.font = "16px sans-serif";
      ctx.fillText(
        "Share payment screenshot or admission advice on WhatsApp for instant receipt.",
        width / 2,
        1255
      );

      // Download file
      const downloadLink = document.createElement("a");
      const safeName = (studentName.trim() || "Student").replace(/[^a-zA-Z0-9]/g, "_");
      const safeCourse = activeCourse.title.replace(/[^a-zA-Z0-9]/g, "_");
      downloadLink.href = canvas.toDataURL("image/png");
      downloadLink.download = `CNAT_QR_${safeName}_${safeCourse}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.error("Failed to generate QR card:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Copy QR Image to Clipboard (PNG Blob)
  const handleCopyQRImage = async () => {
    try {
      const qrDataUrl = await QRCodeLib.toDataURL(activeQrCodeValue, {
        width: 800,
        margin: 2,
        errorCorrectionLevel: "H",
        color: {
          dark: "#090d16",
          light: "#ffffff",
        },
      });

      const blob = await (await fetch(qrDataUrl)).blob();

      if (navigator?.clipboard?.write && window.ClipboardItem) {
        await navigator.clipboard.write([
          new window.ClipboardItem({
            "image/png": blob,
          }),
        ]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2500);
      } else {
        await navigator.clipboard.writeText(qrDataUrl);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2500);
      }
    } catch (err) {
      console.error("Failed to copy image to clipboard:", err);
      handleDownloadQRCard();
    }
  };

  // Print Slip
  const handlePrintSlip = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto text-slate-100">
        
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500/20 to-emerald-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 p-1.5 shadow-inner">
              <img src={cnatLogo} alt="CNAT" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Student Course QR &amp; WhatsApp Share
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                  <ShieldCheck size={12} />
                  Official +91 94324 56083
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Generate student payment advice QR and send structured detail message directly to WhatsApp.
              </p>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close modal"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Modal Body: Two Columns (Left Form 7 cols | Right QR & Share 5 cols) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: STUDENT & COURSE INPUT FORM (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Step 1: Course Selection Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen size={14} />
                  <span>1. Select Course &amp; Track</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsCustomCourse(!isCustomCourse)}
                  className="text-[11px] text-sky-400 hover:text-sky-300 underline font-medium cursor-pointer"
                >
                  {isCustomCourse ? "Select from Catalog" : "+ Custom Subject / Topic"}
                </button>
              </div>

              {!isCustomCourse ? (
                <div className="space-y-2">
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                  >
                    {allCourses.map((c) => (
                      <option key={c.courseID} value={c.courseID}>
                        [{c.category}] {c.title} — {c.fee || "Standard Fee"} ({c.duration || "Course"})
                      </option>
                    ))}
                  </select>

                  {/* Course Quick Summary Pill */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-300">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700">
                      ⏱️ {activeCourse.duration || "40-60 Classes"}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700">
                      📍 {activeCourse.mode || "Online / Offline"}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700">
                      👨‍🏫 {activeCourse.instructor || "Sukanta Hui"}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
                      Fee: {activeCourse.fee || "₹1,500"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Custom Course / Subject (e.g. ICSE Class 10 Java, Python Django)"
                      value={customCourseTitle}
                      onChange={(e) => setCustomCourseTitle(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Category (e.g. High School Computer)"
                      value={customCourseCategory}
                      onChange={(e) => setCustomCourseCategory(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Course Fee (₹ e.g. 2000)"
                      value={customCourseFee}
                      onChange={(e) => setCustomCourseFee(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Student Details Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <User size={14} />
                <span>2. Student Particulars</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Student Full Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sen / Sneha Das"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Student WhatsApp / Mobile (Optional)
                  </label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="tel"
                      placeholder="e.g. 9830012345"
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Roll No / Student ID (Optional)
                  </label>
                  <div className="relative">
                    <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="e.g. CNAT-2026-042"
                      value={studentRollNo}
                      onChange={(e) => setStudentRollNo(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Preferred Batch Timing
                  </label>
                  <select
                    value={batchTiming}
                    onChange={(e) => setBatchTiming(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    {BATCH_TIMINGS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Mode of Class
                  </label>
                  <select
                    value={classMode}
                    onChange={(e) => setClassMode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="Online / Offline (Hybrid)">Online / Offline (Hybrid)</option>
                    <option value="Offline Classroom Lab">Offline Classroom Lab</option>
                    <option value="100% Live Interactive Online">100% Live Interactive Online</option>
                    <option value="1-on-1 Fast Track Mentorship">1-on-1 Fast Track Mentorship</option>
                  </select>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Additional note / requirement (e.g. College 3rd sem project support, laptop required)"
                  value={studentRemarks}
                  onChange={(e) => setStudentRemarks(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Step 3: Fee Breakdown & Payment Type */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard size={14} />
                <span>3. Fee Structure &amp; Paying Advice</span>
              </label>

              {/* Payment Type Tabs */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "installment", label: "Monthly / Token", desc: "Pay initial installment" },
                  { id: "full", label: "Full Course Fee", desc: "One-time complete fee" },
                  { id: "custom", label: "Custom Amount", desc: "Enter specific ₹" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setPaymentType(tab.id)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      paymentType === tab.id
                        ? "bg-emerald-500/20 border-emerald-500/50 text-white shadow-sm"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="block text-xs font-bold text-white">{tab.label}</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{tab.desc}</span>
                  </button>
                ))}
              </div>

              {/* Quick Amount Chips for Installment / Custom */}
              {paymentType !== "full" && (
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1.5">
                    Select Quick Installment Preset or Enter Custom:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {INSTALLMENT_PRESETS.map((p) => {
                      const isActive = customPayAmount === String(p.value);
                      return (
                        <button
                          key={p.value}
                          type="button"
                          onClick={() => setCustomPayAmount(String(p.value))}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                            isActive
                              ? "bg-emerald-500 text-white scale-105"
                              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      placeholder="e.g. 1500"
                      value={customPayAmount}
                      onChange={(e) => setCustomPayAmount(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white font-mono font-bold focus:outline-none focus:border-emerald-500"
                      min="1"
                    />
                  </div>
                </div>
              )}

              {/* Merit Discount Selector */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-amber-300">
                  <Percent size={14} className="text-amber-400" />
                  <span>Merit / Concession Discount:</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {[0, 5, 10, 15, 20, 25].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setDiscountPercent(pct)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold cursor-pointer transition ${
                        discountPercent === pct
                          ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                          : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                      }`}
                    >
                      {pct === 0 ? "0%" : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Summary Box */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Course Fee</span>
                  <span className="font-bold text-slate-200">
                    ₹{feeSummary.originalFee.toLocaleString("en-IN")}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Discount</span>
                  <span className="font-bold text-amber-400">
                    {feeSummary.discountAmt > 0 ? `-₹${feeSummary.discountAmt.toLocaleString("en-IN")}` : "0"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase block">Net Payable</span>
                  <span className="font-bold text-emerald-300">
                    ₹{feeSummary.netPayable.toLocaleString("en-IN")}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-sky-400 uppercase block">Advice / Paying</span>
                  <span className="font-bold text-sky-300 text-sm">
                    ₹{feeSummary.payingNow.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: LIVE DYNAMIC QR CODE & WHATSAPP ACTIONS (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            
            {/* Live QR Code Box */}
            <div className="p-5 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl flex flex-col items-center text-center relative">
              
              {/* QR Mode Toggle */}
              <div className="w-full flex items-center justify-center p-1 bg-slate-900 rounded-xl border border-slate-800 mb-4 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setQrType("upi")}
                  className={`flex-1 py-1 px-2 rounded-lg transition cursor-pointer ${
                    qrType === "upi" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
                  }`}
                >
                  UPI Pay QR
                </button>
                <button
                  type="button"
                  onClick={() => setQrType("wa")}
                  className={`flex-1 py-1 px-2 rounded-lg transition cursor-pointer ${
                    qrType === "wa" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                  }`}
                >
                  WhatsApp QR
                </button>
                <button
                  type="button"
                  onClick={() => setQrType("summary")}
                  className={`flex-1 py-1 px-2 rounded-lg transition cursor-pointer ${
                    qrType === "summary" ? "bg-sky-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Summary QR
                </button>
              </div>

              {/* White High-Contrast QR Code */}
              <div className="p-4 bg-white rounded-2xl shadow-xl flex flex-col items-center relative group">
                <div className="w-[190px] h-[190px] flex items-center justify-center relative">
                  <QRCode
                    value={activeQrCodeValue}
                    size={190}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox="0 0 256 256"
                    level="H"
                    fgColor="#090d16"
                    bgColor="#ffffff"
                  />
                  {/* Center Logo */}
                  <div className="absolute inset-0 m-auto w-9 h-9 rounded-full bg-white p-0.5 shadow-md flex items-center justify-center border border-slate-200 pointer-events-none">
                    <img src={cnatLogo} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <span className="text-[11px] font-bold text-slate-800 flex items-center justify-center gap-1">
                    <QrCode size={13} className="text-emerald-600" />
                    {qrType === "upi" ? "Scan with Any UPI App" : qrType === "wa" ? "Scan to Chat on WhatsApp" : "Student Verification Card"}
                  </span>
                  {feeSummary.payingNow > 0 && qrType === "upi" && (
                    <span className="text-xs font-black text-emerald-700 block">
                      ₹{feeSummary.payingNow.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>

              {/* Student & Course Badge Below QR */}
              <div className="mt-3 w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-left">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span className="truncate">{studentName.trim() || "Student"}</span>
                  <span className="text-emerald-400">₹{feeSummary.payingNow.toLocaleString("en-IN")}</span>
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  {activeCourse.title} • {studentRef}
                </div>
              </div>

              {/* Copy Image & Download Buttons */}
              <div className="grid grid-cols-2 gap-2 w-full mt-3">
                <button
                  type="button"
                  onClick={handleCopyQRImage}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    copiedImage
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                  }`}
                  title="Copy QR Code image to clipboard to paste directly in WhatsApp"
                >
                  {copiedImage ? (
                    <>
                      <Check size={14} />
                      <span>Image Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy QR Image</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadQRCard}
                  disabled={isDownloading}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Download size={14} />
                  <span>{isDownloading ? "Creating..." : "Save QR Card"}</span>
                </button>
              </div>

            </div>

            {/* Step 4: Direct WhatsApp Share Actions */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <MessageCircle size={14} />
                  </div>
                  <span>Official WhatsApp Share</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-mono font-bold">+91 94324 56083</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Click below to send the full enrollment &amp; fee breakdown to the official WhatsApp number for admission acknowledgment.
              </p>

              {/* PRIMARY ACTION: SHARE ON OFFICIAL WHATSAPP */}
              <a
                href={officialWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all duration-200"
              >
                <i className="bi bi-whatsapp text-base"></i>
                <span>Share to Official WhatsApp (+91 94324 56083)</span>
              </a>

              {/* Secondary WhatsApp: Send to Student */}
              {studentWhatsAppUrl && (
                <a
                  href={studentWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-sky-300 hover:text-sky-200 border border-sky-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <Send size={13} />
                  <span>Send Advice to Student's WhatsApp ({studentPhone})</span>
                </a>
              )}

              {/* Utility Row: Copy Detail Text & Print */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyDetailText}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    copiedText
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80"
                  }`}
                >
                  {copiedText ? (
                    <>
                      <Check size={14} />
                      <span>Text Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Detail Text</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewCard(!previewCard)}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  title="Preview structured WhatsApp message text"
                >
                  <Eye size={14} />
                  <span>{previewCard ? "Hide Text" : "Preview"}</span>
                </button>
              </div>

              {/* Expandable Text Preview */}
              {previewCard && (
                <div className="mt-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
                  {whatsappDetailText}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Modal Footer Bar */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>NPCI UPI Verified Merchant: <strong>Coder &amp; AccoTax</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintSlip}
              className="text-slate-400 hover:text-white flex items-center gap-1 transition cursor-pointer"
            >
              <Printer size={14} />
              <span>Print Slip</span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer font-semibold"
              >
                Done
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
