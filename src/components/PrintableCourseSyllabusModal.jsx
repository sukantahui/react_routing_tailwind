// ============================================================================
// PrintableCourseSyllabusModal.jsx
// Official Printable Course Curriculum & Syllabus Specification (A4 Format)
// Coder & AccoTax (AN ISO 9001:2015 CERTIFIED EDUCATIONAL INSTITUTION)
// Barrackpore, Kolkata - 700122 (W.B.)
// Professional Executive Edition with Academic Navy, Royal Gold & Slate Palette
// ============================================================================

import React, { useState, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import QRCode from "react-qr-code";
import {
  Printer,
  Copy,
  Check,
  X,
  BookOpen,
  Calendar,
  Clock,
  Layers,
  Award,
  Phone,
  Mail,
  Globe,
  MapPin,
  CheckCircle2,
  FileText,
  Sparkles,
  Download,
  Info,
  ShieldCheck,
  Code2,
  Sliders,
  GraduationCap,
  Star,
  CheckCircle,
} from "lucide-react";
import cnatLogo from "../assets/cnat.png";
import signatureImg from "../assets/signature.png";
import stampImg from "../assets/stamp.png";

const PRIMARY_PHONE = "+91 70037 56860";
const SECONDARY_PHONE = "+91 94324 56083";
const INSTITUTE_EMAIL = "info@codernaccotax.co.in";
const INSTITUTE_WEB = "www.codernaccotax.co.in";
const INSTITUTE_ADDRESS = "25(10/A) Shibtala Road, P.O. Nonachandanpukur, Barrackpore, Kolkata - 700122 (W.B.)";

// Helper to safely format text containing markdown **bold** markers
const renderBoldText = (text) => {
  if (!text) return null;
  const parts = String(text).split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-slate-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

// Parse module string into structured { number, title, topics }
const parseModule = (moduleText, idx) => {
  if (!moduleText) return { number: `Module ${idx + 1}`, title: `Topic ${idx + 1}`, topics: "" };

  let text = String(moduleText).trim();
  let modNum = `Module ${String(idx + 1).padStart(2, "0")}`;

  // 1. Check if starts with 'Module X:' or 'Module X -'
  const modPrefixMatch = text.match(/^(Module\s+\d+)\s*[:\.\-]?\s*(.*)$/i);
  if (modPrefixMatch) {
    modNum = modPrefixMatch[1].replace(/module\s+/i, "Module ");
    text = modPrefixMatch[2].trim();
  } else {
    // Check if starts with a number e.g. "14 React.js Fundamentals..."
    const numPrefixMatch = text.match(/^(\d+)[\.\s:\-]+(.*)$/);
    if (numPrefixMatch && parseInt(numPrefixMatch[1], 10) < 100) {
      modNum = `Module ${String(numPrefixMatch[1]).padStart(2, "0")}`;
      text = numPrefixMatch[2].trim();
    }
  }

  // 2. Split title and topics by en-dash '–', em-dash '—', or ' - '
  const dashMatch = text.match(/^(.*?)(?:\s*[–—]\s*|\s+-\s+)(.*)$/);
  if (dashMatch) {
    return {
      number: modNum,
      title: dashMatch[1].trim(),
      topics: dashMatch[2].trim(),
    };
  }

  // 3. Fallback: entire text is title
  return {
    number: modNum,
    title: text,
    topics: "",
  };
};

export default function PrintableCourseSyllabusModal({
  isOpen,
  course,
  category = "",
  onClose,
}) {
  const [copied, setCopied] = useState(false);
  const [includeOverview, setIncludeOverview] = useState(true);
  const [includeProjects, setIncludeProjects] = useState(true);
  const [includeOutcomes, setIncludeOutcomes] = useState(true);
  const printSheetRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow || "hidden";
      };
    }
  }, [isOpen]);

  if (!isOpen || !course) return null;

  const details = course.details || {};
  const rawSyllabus = details.syllabus || [];
  const projects = details.projects || [];
  const outcomes = details.learningOutcomes || [];
  const skills = course.skills || [];
  const courseCategory = category || course.category || "Information Technology & Professional Training";
  const courseCode = course.course_code || course.code || course.id || "GEN";
  const courseRefNo = `CAT/SYL/${courseCode}`;
  const currentDateStr = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Parsed structured modules
  const parsedModules = rawSyllabus.map((mod, idx) => parseModule(mod, idx));

  // Trigger print dialog
  const handlePrint = () => {
    window.print();
  };

  // Copy plain text formatted syllabus for sharing
  const handleCopyText = () => {
    let plain = `====================================================\n`;
    plain += `CODER & ACCOTAX - OFFICIAL COURSE SYLLABUS\n`;
    plain += `AN ISO 9001:2015 CERTIFIED EDUCATIONAL INSTITUTION\n`;
    plain += `====================================================\n\n`;
    plain += `Course: ${course.title}\n`;
    plain += `Stream: ${courseCategory}\n`;
    plain += `Duration: ${course.duration || "Comprehensive"}\n`;
    plain += `Mode: ${course.mode || "Online / Offline"}\n`;
    plain += `Level: ${course.level || "All Levels"}\n`;
    plain += `Lead Mentor: ${course.instructor || "Sukanta Hui"}\n`;
    plain += `Course Fee: ${course.fee || "Contact for fee scheme"}\n\n`;

    if (details.overview) {
      plain += `--- COURSE OVERVIEW ---\n${details.overview}\n\n`;
    }

    plain += `--- DETAILED MODULES (${parsedModules.length} Modules) ---\n`;
    parsedModules.forEach((m) => {
      plain += `[${m.number}] ${m.title}\n`;
      if (m.topics) plain += `  Topics: ${m.topics}\n`;
    });
    plain += `\n`;

    if (projects.length > 0) {
      plain += `--- CAPSTONE PROJECTS ---\n`;
      projects.forEach((p, i) => {
        plain += `${i + 1}. ${p}\n`;
      });
      plain += `\n`;
    }

    if (outcomes.length > 0) {
      plain += `--- KEY LEARNING OUTCOMES ---\n`;
      outcomes.forEach((o, i) => {
        plain += `• ${o}\n`;
      });
      plain += `\n`;
    }

    plain += `Contact & Admissions:\n`;
    plain += `Phone: ${PRIMARY_PHONE} / ${SECONDARY_PHONE}\n`;
    plain += `Website: https://${INSTITUTE_WEB}\n`;
    plain += `Address: ${INSTITUTE_ADDRESS}\n`;

    navigator.clipboard?.writeText(plain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const verificationUrl = `https://${INSTITUTE_WEB}/#courses`;

  return createPortal(
    <div className="printable-syllabus-modal-overlay fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      {/* =========================================================================
          PRINT-ONLY CSS ENFORCEMENT FOR CLEAN A4 SYLLABUS PRINTING
      ========================================================================= */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm 7mm 7mm 7mm;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            background-color: #ffffff !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
          }
          /* Eliminate all screen app elements from print */
          #root {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            min-height: 0 !important;
            max-height: 0 !important;
            overflow: hidden !important;
            position: absolute !important;
            top: -9999px !important;
            left: -9999px !important;
          }
          header,
          nav,
          footer,
          .no-print,
          [role="navigation"],
          .navbar,
          .printable-syllabus-controls {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            opacity: 0 !important;
          }
          /* Reset overlay constraints to allow clean multi-page document flow */
          .printable-syllabus-modal-overlay {
            position: static !important;
            display: block !important;
            padding: 0 !important;
            margin: 0 !important;
            background: #ffffff !important;
            background-color: #ffffff !important;
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            max-height: none !important;
            overflow: visible !important;
          }
          .printable-syllabus-content-wrapper {
            position: static !important;
            max-width: 100% !important;
            width: 100% !important;
            height: auto !important;
            max-height: none !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            background: #ffffff !important;
            background-color: #ffffff !important;
            overflow: visible !important;
          }
          #printable-syllabus-sheet {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: #ffffff !important;
            background-color: #ffffff !important;
            color: #0f172a !important;
          }
          .avoid-break {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>

      {/* Backdrop click to close */}
      <div
        className="fixed inset-0 no-print"
        onClick={onClose}
        aria-label="Close modal backdrop"
      />

      {/* Main Modal Wrapper */}
      <div className="printable-syllabus-content-wrapper relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col max-h-[94vh] z-10 overflow-hidden text-slate-100">
        
        {/* ===================================================================
            SCREEN TOOLBAR / ACTION BAR (HIDDEN IN PRINT)
        =================================================================== */}
        <div className="printable-syllabus-controls no-print p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 flex-shrink-0">
              <Printer size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-white text-base sm:text-lg tracking-tight">
                  Official Printable Syllabus
                </h3>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                  Academic A4 Spec
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  ISO 9001:2015
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 truncate max-w-md">
                {course.title} &bull; {parsedModules.length} Modules &bull; High-Contrast Print &amp; PDF
              </p>
            </div>
          </div>

          {/* Action buttons & toggle options */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-end">
            {/* Quick section filters */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 shadow-inner">
              <span className="text-slate-500 font-semibold mr-1">Include:</span>
              <label className="flex items-center gap-1 cursor-pointer hover:text-white select-none">
                <input
                  type="checkbox"
                  checked={includeOverview}
                  onChange={(e) => setIncludeOverview(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-0 w-3 h-3 cursor-pointer"
                />
                <span>Overview</span>
              </label>
              {projects.length > 0 && (
                <label className="flex items-center gap-1 cursor-pointer hover:text-white ml-2 select-none">
                  <input
                    type="checkbox"
                    checked={includeProjects}
                    onChange={(e) => setIncludeProjects(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-0 w-3 h-3 cursor-pointer"
                  />
                  <span>Projects</span>
                </label>
              )}
              {outcomes.length > 0 && (
                <label className="flex items-center gap-1 cursor-pointer hover:text-white ml-2 select-none">
                  <input
                    type="checkbox"
                    checked={includeOutcomes}
                    onChange={(e) => setIncludeOutcomes(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-0 w-3 h-3 cursor-pointer"
                  />
                  <span>Outcomes</span>
                </label>
              )}
            </div>

            {/* Copy plain text */}
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition cursor-pointer"
              title="Copy formatted syllabus text to clipboard"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? "Copied!" : "Copy Text"}</span>
            </button>

            {/* Print / Save as PDF Primary Button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 border border-blue-400/30 transition cursor-pointer"
              title="Open browser print dialog to print or save as PDF"
            >
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 transition cursor-pointer"
              title="Close syllabus view"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ===================================================================
            SCROLLABLE A4 DOCUMENT PREVIEW CONTAINER
        =================================================================== */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 bg-slate-950 flex justify-center">
          
          {/* A4 Printable Syllabus Sheet */}
          <div
            id="printable-syllabus-sheet"
            ref={printSheetRef}
            className="w-full max-w-[210mm] bg-white text-slate-900 rounded-lg sm:rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 font-sans print:p-0 print:m-0 print:shadow-none print:rounded-none"
            style={{ minHeight: "297mm" }}
          >
            {/* ---------------------------------------------------------------
                1. OFFICIAL INSTITUTIONAL HEADER (Executive Navy & Gold Identity)
            --------------------------------------------------------------- */}
            <div className="flex items-start justify-between gap-4 border-b-2 border-[#0a2540] pb-4 mb-4 avoid-break">
              {/* Left: Spiral Logo with badge */}
              <div className="flex flex-col items-center justify-center flex-shrink-0 pt-0.5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden flex items-center justify-center bg-white p-1 border border-slate-200 shadow-sm">
                  <img
                    src={cnatLogo}
                    alt="Coder & AccoTax Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[10px] font-black tracking-widest text-[#0a2540] uppercase mt-1">
                  EST. 1998
                </span>
              </div>

              {/* Center: Institute Details */}
              <div className="flex-1 text-center px-1">
                {/* ISO Certified Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10 border border-amber-600/30 text-amber-900 font-extrabold text-[10px] tracking-wider uppercase mb-1 shadow-sm">
                  <Award size={11} className="text-amber-700" />
                  <span>AN ISO 9001:2015 CERTIFIED EDUCATIONAL INSTITUTION</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-[#0a2540] tracking-tight leading-none uppercase">
                  CODER &amp; ACCOTAX
                </h1>
                <p className="text-[11px] sm:text-xs font-bold text-[#1e3a8a] mt-1 leading-tight tracking-wide">
                  Professional Institute of Software Engineering, Corporate Accounting &amp; Taxation
                </p>

                {/* Address */}
                <div className="flex items-center justify-center gap-1 text-[10px] text-slate-600 mt-1.5">
                  <MapPin size={11} className="text-[#0a2540] flex-shrink-0" />
                  <span>{INSTITUTE_ADDRESS}</span>
                </div>

                {/* Contact Pill Row */}
                <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-slate-700 font-semibold mt-1">
                  <span className="inline-flex items-center gap-1 text-[#0284c7]">
                    <Phone size={10} /> {PRIMARY_PHONE} / {SECONDARY_PHONE}
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="inline-flex items-center gap-1 text-[#4f46e5]">
                    <Mail size={10} /> {INSTITUTE_EMAIL}
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="inline-flex items-center gap-1 text-[#059669]">
                    <Globe size={10} /> {INSTITUTE_WEB}
                  </span>
                </div>
              </div>

              {/* Right: Dynamic Verification QR Code */}
              <div className="flex flex-col items-center justify-center flex-shrink-0 text-center pt-0.5">
                <div className="p-1.5 bg-white border-2 border-blue-100 rounded-xl shadow-sm">
                  <QRCode
                    value={verificationUrl}
                    size={64}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox={`0 0 64 64`}
                  />
                </div>
                <div className="flex items-center justify-center gap-0.5 mt-1 text-[#0a2540]">
                  <ShieldCheck size={10} className="text-emerald-600" />
                  <span className="text-[9px] font-bold tracking-tight leading-tight block">
                    Verify Online
                  </span>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------------
                2. TITLE & DOCUMENT CLASSIFICATION BAR (Navy & Gold Accent)
            --------------------------------------------------------------- */}
            <div className="mb-4 avoid-break shadow-sm">
              <div className="bg-gradient-to-r from-[#0b2545] via-[#133e6f] to-[#0b2545] text-white px-4 py-2.5 rounded-t-lg flex items-center justify-between gap-2 flex-wrap border-b border-blue-400/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs sm:text-sm font-black tracking-wider uppercase">
                    OFFICIAL COURSE CURRICULUM &amp; SYLLABUS SPECIFICATION
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-400 px-3 py-0.5 rounded-md shadow-sm">
                  Session: 2026 - 2027
                </span>
              </div>
              <div className="bg-gradient-to-r from-blue-50/80 via-slate-50 to-blue-50/80 border-x border-b border-blue-200 px-4 py-1.5 rounded-b-lg flex items-center justify-between text-[11px] text-slate-700 font-medium flex-wrap gap-2">
                <span><strong className="text-[#0a2540]">Document Ref:</strong> {courseRefNo}</span>
                <span><strong className="text-[#0a2540]">Standard Revision:</strong> v2.4 (Industry Aligned)</span>
                <span><strong className="text-[#0a2540]">Date of Issue:</strong> {currentDateStr}</span>
                <span className="text-emerald-800 font-bold inline-flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-emerald-600" />
                  ISO 9001:2015 Recognized
                </span>
              </div>
            </div>

            {/* ---------------------------------------------------------------
                3. COURSE SPECIFICATION SUMMARY TABLE (Executive Academic Card)
            --------------------------------------------------------------- */}
            <div className="mb-5 avoid-break border border-blue-200/90 rounded-lg overflow-hidden text-xs shadow-sm bg-white">
              <div className="bg-gradient-to-r from-[#0f2d59] to-[#1e3a8a] text-white px-3.5 py-1.5 font-bold text-[11px] uppercase tracking-wider flex items-center justify-between">
                <span>Course Program Specification</span>
                <span className="text-[10px] text-blue-200 font-medium">Standard Academic Track</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-blue-100">
                {/* Column 1 */}
                <div className="divide-y divide-slate-100">
                  <div className="p-2.5 bg-blue-50/40 flex items-start gap-2">
                    <span className="font-bold text-[#0a2540] w-28 flex-shrink-0 uppercase text-[10px]">
                      Course Title:
                    </span>
                    <span className="font-extrabold text-[#0a2540] text-sm tracking-tight">
                      {course.title}
                    </span>
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <span className="font-bold text-slate-600 w-28 flex-shrink-0 uppercase text-[10px]">
                      Domain / Stream:
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-sky-100 text-sky-900 border border-sky-200 font-semibold text-[11px]">
                      {courseCategory}
                    </span>
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <span className="font-bold text-slate-600 w-28 flex-shrink-0 uppercase text-[10px]">
                      Level:
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 border border-indigo-200 font-semibold text-[11px]">
                      {course.level || "Beginner to Advanced"}
                    </span>
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <span className="font-bold text-slate-600 w-28 flex-shrink-0 uppercase text-[10px]">
                      Total Duration:
                    </span>
                    <span className="font-bold text-[#0a2540] text-xs">
                      {course.duration || `${parsedModules.length} Modules / Comprehensive`}
                    </span>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="divide-y divide-slate-100">
                  <div className="p-2.5 bg-blue-50/40 flex items-center gap-2">
                    <span className="font-bold text-[#0a2540] w-28 flex-shrink-0 uppercase text-[10px]">
                      Training Mode:
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200 font-semibold text-[11px]">
                      {course.mode || "Online / Offline (Hands-on Practical Labs)"}
                    </span>
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <span className="font-bold text-slate-600 w-28 flex-shrink-0 uppercase text-[10px]">
                      Lead Mentor:
                    </span>
                    <span className="font-bold text-slate-900">
                      {course.instructor || "Sukanta Hui"} <span className="text-[10px] text-slate-500 font-normal">(Senior Software Architect)</span>
                    </span>
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <span className="font-bold text-slate-600 w-28 flex-shrink-0 uppercase text-[10px]">
                      Course Fee:
                    </span>
                    <span className="font-bold text-[#0a2540]">
                      {course.fee ? `${course.fee}` : "Standard Fee"} <span className="text-[10px] text-emerald-700 font-medium">(Concession &amp; Installments Available)</span>
                    </span>
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <span className="font-bold text-slate-600 w-28 flex-shrink-0 uppercase text-[10px]">
                      Certification:
                    </span>
                    <span className="font-bold text-emerald-800 flex items-center gap-1">
                      <Award size={13} className="text-amber-600" />
                      ISO 9001:2015 Recognized Course Certificate
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------------
                4. COURSE OVERVIEW & PREREQUISITES (Executive Border Accent)
            --------------------------------------------------------------- */}
            {includeOverview && (
              <div className="mb-5 avoid-break">
                <div className="flex items-center gap-2 border-b-2 border-[#1e3a8a] pb-1 mb-2">
                  <BookOpen size={14} className="text-[#1e3a8a]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0a2540]">
                    Course Overview &amp; Learning Objectives
                  </h3>
                </div>
                <div className="bg-gradient-to-r from-blue-50/60 to-slate-50 border-l-4 border-[#1e3a8a] border-y border-r border-blue-100 p-3.5 rounded-r-lg text-xs text-slate-800 leading-relaxed space-y-2">
                  <p>
                    {renderBoldText(
                      details.overview ||
                        course.desc ||
                        `This program provides rigorous theoretical depth and extensive practical lab implementation for ${course.title}. Designed for students, job-seekers, and working professionals seeking hands-on mastery.`
                    )}
                  </p>
                  {details.prerequisites && (
                    <div className="pt-2 border-t border-blue-100/80 flex items-start gap-2 text-[11px] text-slate-700">
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] uppercase flex-shrink-0">
                        Prerequisites
                      </span>
                      <span className="pt-0.5">{renderBoldText(details.prerequisites)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------------------
                5. DETAILED CURRICULUM & STRUCTURED MODULES (Modern Clean Cards)
            --------------------------------------------------------------- */}
            <div className="mb-5">
              <div className="flex items-center justify-between border-b-2 border-[#0a2540] pb-1.5 mb-3 avoid-break">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-[#0a2540]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0a2540]">
                    Structured Modular Curriculum ({parsedModules.length} Modules)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#0a2540] text-white">
                    {parsedModules.length} Modules
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600 hidden sm:inline">
                    Theory + Hands-on Lab Work
                  </span>
                </div>
              </div>

              {parsedModules.length > 0 ? (
                <div className="space-y-2.5">
                  {parsedModules.map((mod, idx) => (
                    <div
                      key={idx}
                      className="avoid-break border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm hover:border-blue-300 transition"
                    >
                      {/* Module Header Bar with Navy Tint */}
                      <div className="bg-gradient-to-r from-slate-50 via-blue-50/40 to-white px-3 py-1.5 border-b border-slate-200/80 flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2.5">
                          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded bg-gradient-to-r from-[#0d2a52] to-[#1e40af] text-white font-mono text-[10px] font-bold tracking-wide shadow-sm flex-shrink-0">
                            {mod.number}
                          </span>
                          <h4 className="text-xs sm:text-[13px] font-bold text-[#0a2540] leading-snug">
                            {mod.title}
                          </h4>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                          Topic #{idx + 1}
                        </span>
                      </div>

                      {/* Module Topics / Description */}
                      {mod.topics && (
                        <div className="px-3.5 py-2 text-[11px] text-slate-700 leading-relaxed bg-white">
                          <div className="border-l-2 border-blue-500 pl-2.5 py-1 bg-blue-50/25 rounded-r">
                            <span className="font-bold text-[#0a2540] mr-1.5">Key Topics &amp; Practice:</span>
                            {renderBoldText(mod.topics)}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 border border-slate-200 rounded-lg text-xs text-slate-700 bg-slate-50">
                  <p>{course.more || course.desc || "Curriculum details available upon inquiry."}</p>
                </div>
              )}
            </div>

            {/* ---------------------------------------------------------------
                6. CAPSTONE PROJECTS (Rich Indigo Theme)
            --------------------------------------------------------------- */}
            {includeProjects && projects.length > 0 && (
              <div className="mb-5 avoid-break">
                <div className="flex items-center gap-2 border-b-2 border-indigo-900 pb-1.5 mb-2.5">
                  <Code2 size={14} className="text-indigo-900" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-950">
                    Real-World Practical Projects &amp; Lab Assignments ({projects.length})
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {projects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="border border-indigo-200/90 rounded-lg p-2.5 bg-gradient-to-br from-indigo-50/60 to-purple-50/30 text-xs flex items-start gap-2.5 shadow-sm"
                    >
                      <span className="w-5 h-5 rounded-md bg-indigo-700 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5 shadow-sm">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-indigo-950 leading-snug block">
                          {renderBoldText(proj)}
                        </span>
                        <span className="text-[10px] text-indigo-700/80 font-medium block mt-0.5">
                          Industry Grade Evaluation
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------------------
                7. KEY LEARNING OUTCOMES (Emerald / Teal Theme)
            --------------------------------------------------------------- */}
            {includeOutcomes && outcomes.length > 0 && (
              <div className="mb-5 avoid-break">
                <div className="flex items-center gap-2 border-b-2 border-emerald-800 pb-1.5 mb-2.5">
                  <CheckCircle2 size={14} className="text-emerald-800" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                    Target Competencies &amp; Industry Learning Outcomes
                  </h3>
                </div>
                <div className="border border-emerald-200/90 rounded-lg p-3 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 text-xs space-y-2 shadow-sm">
                  {outcomes.map((out, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-slate-800">
                      <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5 shadow-sm">
                        ✓
                      </div>
                      <span className="leading-snug font-medium">{renderBoldText(out)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------------------
                8. OFFICIAL CERTIFICATION & CENTER ENDORSEMENT FOOTER
            --------------------------------------------------------------- */}
            <div className="border-t-2 border-[#0a2540] pt-4 mt-6 avoid-break">
              <div className="flex flex-col sm:flex-row items-end justify-between gap-4 text-xs">
                {/* Left: Institute Note */}
                <div className="max-w-md text-[10px] text-slate-600 leading-relaxed">
                  <p className="font-bold text-[#0a2540] uppercase tracking-wider mb-0.5 flex items-center gap-1">
                    <ShieldCheck size={12} className="text-emerald-600" />
                    Academic Accreditation &amp; Quality Standard
                  </p>
                  <p>
                    This is an authorized curriculum syllabus of Coder &amp; AccoTax. Course content is revised cyclically to meet contemporary IT software industry standards and corporate statutory frameworks.
                  </p>
                  <div className="mt-2 text-[9px] text-slate-500 font-mono">
                    Official Spec &bull; Ref: {courseRefNo} &bull; Issue: {currentDateStr} &bull; Page 1 of Official Spec
                  </div>
                </div>

                {/* Right: Signature & Stamp Box */}
                <div className="flex items-center gap-6 flex-shrink-0">
                  {/* Official Stamp */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center p-0.5">
                      <img
                        src={stampImg}
                        alt="Center Seal"
                        className="max-h-full max-w-full object-contain opacity-95"
                      />
                    </div>
                    <span className="text-[9px] font-bold text-[#0a2540] uppercase tracking-wider mt-0.5">
                      Center Official Seal
                    </span>
                  </div>

                  {/* Signatory */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-12 flex items-center justify-center">
                      <img
                        src={signatureImg}
                        alt="Authorized Signatory"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="border-t-2 border-[#0a2540] w-32 pt-1 text-center">
                      <span className="font-bold text-[#0a2540] text-[11px] block leading-tight">
                        Sukanta Hui
                      </span>
                      <span className="text-[9px] text-slate-600 font-semibold block leading-tight">
                        Academic Director
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
