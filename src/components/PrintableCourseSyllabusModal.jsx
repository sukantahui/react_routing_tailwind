// ============================================================================
// PrintableCourseSyllabusModal.jsx
// Official Printable Course Curriculum & Syllabus Specification (A4 Format)
// Coder & AccoTax (AN ISO 9001:2015 CERTIFIED EDUCATIONAL INSTITUTION)
// Barrackpore, Kolkata - 700122 (W.B.)
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
        <strong key={index} className="font-bold text-slate-900">
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

  // Match: "Module X: [Title] – [Desc]" or "Module X: [Title] - [Desc]"
  const matchWithDash = String(moduleText).match(/^(Module\s+\d+:?)\s*(.*?)(?:\s*–\s*|\s*-\s*)(.*)$/i);
  if (matchWithDash) {
    return {
      number: matchWithDash[1].replace(/:$/, "").trim(),
      title: matchWithDash[2].trim(),
      topics: matchWithDash[3].trim(),
    };
  }

  // Match: "Module X: [Title]"
  const matchColon = String(moduleText).match(/^(Module\s+\d+):\s*(.*)$/i);
  if (matchColon) {
    return {
      number: matchColon[1].trim(),
      title: matchColon[2].trim(),
      topics: "",
    };
  }

  // Fallback
  return {
    number: `Module ${String(idx + 1).padStart(2, "0")}`,
    title: moduleText,
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
    <div className="printable-syllabus-modal-overlay fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
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
      <div className="printable-syllabus-content-wrapper relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col max-h-[94vh] z-10 overflow-hidden text-slate-100">
        
        {/* ===================================================================
            SCREEN TOOLBAR / ACTION BAR (HIDDEN IN PRINT)
        =================================================================== */}
        <div className="printable-syllabus-controls no-print p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
              <Printer size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base sm:text-lg tracking-tight">
                  Printable Course Syllabus
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                  Official A4 Spec
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 truncate max-w-md">
                {course.title} &bull; {parsedModules.length} Modules &bull; Ready for A4 Print &amp; PDF Download
              </p>
            </div>
          </div>

          {/* Action buttons & toggle options */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-end">
            {/* Quick section filters */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              <span className="text-slate-500 font-semibold mr-1">Include:</span>
              <label className="flex items-center gap-1 cursor-pointer hover:text-white select-none">
                <input
                  type="checkbox"
                  checked={includeOverview}
                  onChange={(e) => setIncludeOverview(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-0 w-3 h-3 cursor-pointer"
                />
                <span>Overview</span>
              </label>
              {projects.length > 0 && (
                <label className="flex items-center gap-1 cursor-pointer hover:text-white ml-2 select-none">
                  <input
                    type="checkbox"
                    checked={includeProjects}
                    onChange={(e) => setIncludeProjects(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-0 w-3 h-3 cursor-pointer"
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
                    className="rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-0 w-3 h-3 cursor-pointer"
                  />
                  <span>Outcomes</span>
                </label>
              )}
            </div>

            {/* Copy plain text */}
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition cursor-pointer"
              title="Copy formatted text to clipboard"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? "Copied!" : "Copy Text"}</span>
            </button>

            {/* Print / Save as PDF Primary Button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-sky-500/25 transition cursor-pointer"
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
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 bg-slate-950/90 flex justify-center">
          
          {/* A4 Printable Syllabus Sheet */}
          <div
            id="printable-syllabus-sheet"
            ref={printSheetRef}
            className="w-full max-w-[210mm] bg-white text-slate-900 rounded-lg sm:rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 font-sans print:p-0 print:m-0 print:shadow-none print:rounded-none"
            style={{ minHeight: "297mm" }}
          >
            {/* ---------------------------------------------------------------
                1. OFFICIAL HEADER (Branded Coder & AccoTax)
            --------------------------------------------------------------- */}
            <div className="flex items-start justify-between gap-4 border-b-2 border-slate-800 pb-4 mb-4 avoid-break">
              {/* Left: Spiral Logo */}
              <div className="flex flex-col items-center justify-center flex-shrink-0 pt-0.5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex items-center justify-center bg-white p-0.5">
                  <img
                    src={cnatLogo}
                    alt="Coder & AccoTax Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[10px] font-black tracking-widest text-slate-600 uppercase mt-1">
                  EST. 1998
                </span>
              </div>

              {/* Center: Institute Details */}
              <div className="flex-1 text-center px-1">
                <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-slate-700 block mb-0.5">
                  AN ISO 9001:2015 CERTIFIED EDUCATIONAL INSTITUTION
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-none uppercase">
                  CODER &amp; ACCOTAX
                </h1>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-700 mt-1 leading-tight">
                  Professional Institute of Software Engineering, Corporate Accounting &amp; Taxation
                </p>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-600 mt-1">
                  <MapPin size={11} className="text-slate-600 flex-shrink-0" />
                  <span>{INSTITUTE_ADDRESS}</span>
                </div>
                <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-slate-600 font-medium mt-0.5">
                  <span>📞 {PRIMARY_PHONE} / {SECONDARY_PHONE}</span>
                  <span>✉ {INSTITUTE_EMAIL}</span>
                  <span>🌐 {INSTITUTE_WEB}</span>
                </div>
              </div>

              {/* Right: Dynamic Verification QR Code */}
              <div className="flex flex-col items-center justify-center flex-shrink-0 text-center pt-0.5">
                <div className="p-1.5 bg-white border border-slate-300 rounded-lg shadow-sm">
                  <QRCode
                    value={verificationUrl}
                    size={64}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox={`0 0 64 64`}
                  />
                </div>
                <span className="text-[9px] font-bold text-slate-700 tracking-tight mt-1 leading-tight block">
                  Scan to Verify<br />Curriculum Online
                </span>
              </div>
            </div>

            {/* ---------------------------------------------------------------
                2. TITLE & DOCUMENT CLASSIFICATION BAR
            --------------------------------------------------------------- */}
            <div className="mb-4 avoid-break">
              <div className="bg-slate-900 text-white px-4 py-2 rounded-t-md flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-black tracking-wider uppercase">
                  OFFICIAL COURSE CURRICULUM &amp; SYLLABUS SPECIFICATION
                </span>
                <span className="text-[11px] font-bold text-sky-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  Academic Session: 2026 - 2027
                </span>
              </div>
              <div className="bg-slate-100 border-x border-b border-slate-300 px-4 py-1.5 rounded-b-md flex items-center justify-between text-[11px] text-slate-700 font-medium flex-wrap gap-2">
                <span><strong>Document Ref:</strong> {courseRefNo}</span>
                <span><strong>Revision:</strong> v2.4 (Industry Benchmark Aligned)</span>
                <span><strong>Issued:</strong> {currentDateStr}</span>
                <span className="text-emerald-700 font-bold">● ISO 9001:2015 Recognized</span>
              </div>
            </div>

            {/* ---------------------------------------------------------------
                3. COURSE SPECIFICATION SUMMARY TABLE
            --------------------------------------------------------------- */}
            <div className="mb-5 avoid-break border border-slate-300 rounded-md overflow-hidden text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-300">
                {/* Column 1 */}
                <div className="divide-y divide-slate-200">
                  <div className="p-2.5 bg-slate-50 flex items-start gap-2">
                    <span className="font-bold text-slate-600 w-28 flex-shrink-0 uppercase text-[10px]">
                      Course Title:
                    </span>
                    <span className="font-extrabold text-slate-950 text-sm">
                      {course.title}
                    </span>
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <span className="font-bold text-slate-600 w-28 flex-shrink-0 uppercase text-[10px]">
                      Domain / Stream:
                    </span>
                    <span className="font-semibold text-slate-800">
                      {courseCategory}
                    </span>
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <span className="font-bold text-slate-600 w-28 flex-shrink-0 uppercase text-[10px]">
                      Level:
                    </span>
                    <span className="font-semibold text-slate-800">
                      {course.level || "Beginner to Advanced"}
                    </span>
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <span className="font-bold text-slate-600 w-28 flex-shrink-0 uppercase text-[10px]">
                      Duration:
                    </span>
                    <span className="font-bold text-slate-950">
                      {course.duration || `${parsedModules.length} Modules / Comprehensive`}
                    </span>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="divide-y divide-slate-200">
                  <div className="p-2.5 bg-slate-50 flex items-center gap-2">
                    <span className="font-bold text-slate-600 w-28 flex-shrink-0 uppercase text-[10px]">
                      Training Mode:
                    </span>
                    <span className="font-semibold text-slate-800">
                      {course.mode || "Online / Offline (Hands-on Labs)"}
                    </span>
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <span className="font-bold text-slate-600 w-28 flex-shrink-0 uppercase text-[10px]">
                      Lead Mentor:
                    </span>
                    <span className="font-semibold text-slate-800">
                      {course.instructor || "Sukanta Hui"} (Senior Software Architect)
                    </span>
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <span className="font-bold text-slate-600 w-28 flex-shrink-0 uppercase text-[10px]">
                      Course Fee:
                    </span>
                    <span className="font-bold text-slate-950">
                      {course.fee ? `${course.fee} (Installments & Concession Available)` : "Standard Institute Fee Structure"}
                    </span>
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <span className="font-bold text-slate-600 w-28 flex-shrink-0 uppercase text-[10px]">
                      Certification:
                    </span>
                    <span className="font-semibold text-emerald-800">
                      ISO 9001:2015 Recognized Course Certificate
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------------
                4. COURSE OVERVIEW & PREREQUISITES (OPTIONAL ON SCREEN)
            --------------------------------------------------------------- */}
            {includeOverview && (
              <div className="mb-5 avoid-break">
                <div className="flex items-center gap-2 border-b border-slate-300 pb-1 mb-2">
                  <BookOpen size={14} className="text-slate-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Course Overview &amp; Learning Objectives
                  </h3>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-md text-xs text-slate-700 leading-relaxed space-y-2">
                  <p>
                    {renderBoldText(
                      details.overview ||
                        course.desc ||
                        `This program provides rigorous theoretical depth and extensive practical lab implementation for ${course.title}. Designed for students, job-seekers, and working professionals seeking hands-on mastery.`
                    )}
                  </p>
                  {details.prerequisites && (
                    <div className="pt-1 border-t border-slate-200 flex items-start gap-1.5 text-[11px] text-slate-600">
                      <strong className="text-slate-800">Prerequisites:</strong>
                      <span>{renderBoldText(details.prerequisites)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------------------
                5. DETAILED CURRICULUM & STRUCTURED MODULES
            --------------------------------------------------------------- */}
            <div className="mb-5">
              <div className="flex items-center justify-between border-b border-slate-300 pb-1 mb-2.5 avoid-break">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-slate-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Structured Modular Curriculum ({parsedModules.length} Modules)
                  </h3>
                </div>
                <span className="text-[10px] font-semibold text-slate-600">
                  Comprehensive Theory + Live Practical Labs
                </span>
              </div>

              {parsedModules.length > 0 ? (
                <div className="space-y-2">
                  {parsedModules.map((mod, idx) => (
                    <div
                      key={idx}
                      className="avoid-break border border-slate-200 rounded-md p-2.5 bg-white hover:border-slate-400 transition"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-900 text-white font-mono text-[10px] font-bold tracking-wider flex-shrink-0">
                          {mod.number}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-950 leading-snug">
                            {mod.title}
                          </h4>
                          {mod.topics && (
                            <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                              {renderBoldText(mod.topics)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 border border-slate-200 rounded-md text-xs text-slate-700">
                  <p>{course.more || course.desc || "Curriculum details available upon inquiry."}</p>
                </div>
              )}
            </div>

            {/* ---------------------------------------------------------------
                6. CAPSTONE PROJECTS (IF PRESENT & ENABLED)
            --------------------------------------------------------------- */}
            {includeProjects && projects.length > 0 && (
              <div className="mb-5 avoid-break">
                <div className="flex items-center gap-2 border-b border-slate-300 pb-1 mb-2">
                  <Code2 size={14} className="text-slate-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Real-World Practical Projects &amp; Lab Assignments ({projects.length})
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {projects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-md p-2 bg-slate-50 text-xs flex items-start gap-2"
                    >
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-slate-800 leading-snug">
                        {renderBoldText(proj)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------------------
                7. KEY LEARNING OUTCOMES (IF PRESENT & ENABLED)
            --------------------------------------------------------------- */}
            {includeOutcomes && outcomes.length > 0 && (
              <div className="mb-5 avoid-break">
                <div className="flex items-center gap-2 border-b border-slate-300 pb-1 mb-2">
                  <CheckCircle2 size={14} className="text-emerald-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Target Competencies &amp; Learning Outcomes
                  </h3>
                </div>
                <div className="border border-slate-200 rounded-md p-3 bg-slate-50 text-xs space-y-1.5">
                  {outcomes.map((out, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-700">
                      <span className="text-emerald-600 font-bold mt-0.5">✔</span>
                      <span className="leading-snug">{renderBoldText(out)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------------------
                8. OFFICIAL CERTIFICATION & CENTER ENDORSEMENT FOOTER
            --------------------------------------------------------------- */}
            <div className="border-t-2 border-slate-800 pt-4 mt-6 avoid-break">
              <div className="flex flex-col sm:flex-row items-end justify-between gap-4 text-xs">
                {/* Left: Institute Note */}
                <div className="max-w-md text-[10px] text-slate-600 leading-relaxed">
                  <p className="font-bold text-slate-800 uppercase tracking-wider mb-0.5">
                    Academic Accreditation &amp; Quality Standard
                  </p>
                  <p>
                    This is an authorized curriculum syllabus of Coder &amp; AccoTax. Course content is revised cyclically to meet contemporary IT software industry standards and corporate statutory frameworks.
                  </p>
                  <div className="mt-2 text-[9px] text-slate-500 font-mono">
                    Official Copy &bull; Ref: {courseRefNo} &bull; Generated: {currentDateStr} &bull; Page 1 of Official Spec
                  </div>
                </div>

                {/* Right: Signature & Stamp Box */}
                <div className="flex items-center gap-6 flex-shrink-0">
                  {/* Official Stamp */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                      <img
                        src={stampImg}
                        alt="Center Seal"
                        className="max-h-full max-w-full object-contain opacity-90"
                      />
                    </div>
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">
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
                    <div className="border-t border-slate-400 w-28 pt-1 text-center">
                      <span className="font-bold text-slate-900 text-[10px] block leading-tight">
                        Sukanta Hui
                      </span>
                      <span className="text-[9px] text-slate-600 block leading-tight">
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
