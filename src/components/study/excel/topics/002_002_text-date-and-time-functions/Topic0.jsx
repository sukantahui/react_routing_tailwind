"use client";

import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/002_002_text_date_and_time_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import practicalQuestions from "./topic0_files/topic0_practical_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic0() {
  const sectionsRef = useRef([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedIds, setExpandedIds] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "002_002_practical_questions_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyFormula = (id, formulaText) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(formulaText);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2200);
    }
  };

  const toggleQuestion = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleRevealSolution = (id) => {
    setRevealedSolutions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setExpandedIds(practicalQuestions.map((q) => q.id));
  };

  const collapseAll = () => {
    setExpandedIds([]);
  };

  const revealAllSolutions = () => {
    setRevealedSolutions(practicalQuestions.map((q) => q.id));
  };

  const hideAllSolutions = () => {
    setRevealedSolutions([]);
  };

  const categories = [
    "All",
    "Case Normalization",
    "Data Standardization",
    "System Identity",
    "ETL Cleansing",
    "Advanced Hygiene"
  ];

  const filteredQuestions =
    activeCategory === "All"
      ? practicalQuestions
      : practicalQuestions.filter((q) => q.category === activeCategory);

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <style>{`
        @keyframes fadeInSlide {
          from { transform: translateY(18px); }
          to { transform: translateY(0); }
        }
        .reveal-section {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* =========================================================================
            SECTION 1: HERO HEADER & OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              🧹 Text Cleansing Core · Topic 0
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Text Cleaning &amp; Case Normalization
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Intermediate · Bloom Level 3: Apply
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Text manipulation essentials: UPPER, LOWER, PROPER, TRIM, and CLEAN
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Standardizing messy corporate text data with case conversion (UPPER, LOWER, PROPER) and whitespace/character hygiene (TRIM, CLEAN). Master the complete syntax, formulas, operational mechanics, and enterprise data hygiene protocols.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Subject Code:</strong> EXCEL-PRO-901</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Module:</strong> Text, Date &amp; Time Functions</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Accreditation:</strong> Coder &amp; AccoTax Centre of Excellence</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">⚡</span>
              Formula Syntax &amp; Argument Breakdown
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Function Anatomy
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            =TRIM(CLEAN(PROPER(text))) | =UPPER(text) | =LOWER(text)
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Function</th>
                  <th className="py-3 px-4">Syntax</th>
                  <th className="py-3 px-4">Input Type</th>
                  <th className="py-3 px-4">Operational Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">TRIM</td>
                  <td className="py-3 px-4 text-cyan-400">=TRIM(text)</td>
                  <td className="py-3 px-4 text-teal-400">String / Cell</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Removes all leading/trailing spaces and condenses multiple internal spaces to a single space.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">CLEAN</td>
                  <td className="py-3 px-4 text-cyan-400">=CLEAN(text)</td>
                  <td className="py-3 px-4 text-teal-400">String / Cell</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Strips non-printable ASCII characters 0–31 (e.g. carriage returns, line feeds from SQL/web exports).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">PROPER</td>
                  <td className="py-3 px-4 text-cyan-400">=PROPER(text)</td>
                  <td className="py-3 px-4 text-teal-400">String / Cell</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Capitalizes the first letter of each word and converts all other letters to lowercase.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">UPPER</td>
                  <td className="py-3 px-4 text-cyan-400">=UPPER(text)</td>
                  <td className="py-3 px-4 text-teal-400">String / Cell</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Converts all characters in the text string to uppercase for standardized database matching.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">LOWER</td>
                  <td className="py-3 px-4 text-cyan-400">=LOWER(text)</td>
                  <td className="py-3 px-4 text-teal-400">String / Cell</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Converts all letters in the text string to lowercase (ideal for email address formatting).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Core Principle: </strong>
              Text functions transform character sequences and case formatting. Combining TRIM, CLEAN, and PROPER forms the ultimate data hygiene triad for cleaning raw imports.
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: PRACTICAL FORMULA EXAMPLES MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">📊</span>
              Practical Formula Showcase &amp; Real-World Examples
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Comprehensive Matrix
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Review detailed, concrete input-to-output formula evaluations across real corporate data scenarios.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Pattern / Function</th>
                  <th className="py-3 px-4">Raw Input Data (A2)</th>
                  <th className="py-3 px-4">Excel Formula</th>
                  <th className="py-3 px-4">Evaluated Output</th>
                  <th className="py-3 px-4">Operational Mechanics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Whitespace Cleanup</td>
                  <td className="py-3 px-4 text-amber-300">"  Kolkata   Plant  "</td>
                  <td className="py-3 px-4 text-cyan-300">=TRIM(A2)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"Kolkata Plant"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Removes 2 leading, 2 trailing spaces &amp; condenses inner 3 spaces into 1 space.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Line Break Stripping</td>
                  <td className="py-3 px-4 text-amber-300">"Vendor" &amp; CHAR(10) &amp; "Master"</td>
                  <td className="py-3 px-4 text-cyan-300">=CLEAN(A2)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"VendorMaster"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Strips non-printable line feed (ASCII 10) inherited from mainframe database export.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Proper Case Title</td>
                  <td className="py-3 px-4 text-amber-300">"ACCOTAX SERVICES PVT LTD"</td>
                  <td className="py-3 px-4 text-cyan-300">=PROPER(A2)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"Accotax Services Pvt Ltd"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Capitalizes the first character of each word; forces all remaining letters to lowercase.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Uppercase Standard</td>
                  <td className="py-3 px-4 text-amber-300">"gstin19abcde1234f1z5"</td>
                  <td className="py-3 px-4 text-cyan-300">=UPPER(A2)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"GSTIN19ABCDE1234F1Z5"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Normalizes lowercase GST / Tax registration codes to uppercase for exact VLOOKUP matching.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Lowercase Email</td>
                  <td className="py-3 px-4 text-amber-300">"Swadeep.Hui@ACCOTAX.COM"</td>
                  <td className="py-3 px-4 text-cyan-300">=LOWER(A2)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"swadeep.hui@accotax.com"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Ensures user emails are standardized to lowercase for authentication systems.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Industrial Triad</td>
                  <td className="py-3 px-4 text-amber-300">"  tuhina   das  " &amp; CHAR(13)</td>
                  <td className="py-3 px-4 text-cyan-300">=TRIM(CLEAN(PROPER(A2)))</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"Tuhina Das"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Strips carriage return (CHAR 13), trims outer/inner spaces, and capitalizes names in one formula.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Web Non-Break Space</td>
                  <td className="py-3 px-4 text-amber-300">"Raw" &amp; CHAR(160) &amp; "Data"</td>
                  <td className="py-3 px-4 text-cyan-300">=TRIM(SUBSTITUTE(A2, CHAR(160), " "))</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"Raw Data"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Replaces web non-breaking space (ASCII 160) with standard space (ASCII 32) before trimming.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: DEEP CONCEPTUAL & THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">🔬</span>
              Engine Mechanics &amp; Evaluation Pipeline
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Under-The-Hood Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div key="0" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">1. Non-Printable Character Stripping (CLEAN)</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">CLEAN() removes ASCII 0-31 control characters and line breaks often inherited from legacy mainframe or SQL exports.</p>
            </div>
            
            <div key="1" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">2. Whitespace Normalization (TRIM)</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">TRIM() eliminates leading/trailing spaces and condenses multi-space gaps down to single spaces. (Note: does not remove ASCII 160 non-breaking spaces).</p>
            </div>
            
            <div key="2" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">3. Case Transformation Engine</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">PROPER() capitalizes the first letter of each word; UPPER() converts all letters to uppercase; LOWER() converts to lowercase for clean database joins.</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-base font-mono">📐</span>
              Visual Dataflow: Text Hygiene Pipeline: Non-Printable Strip → Whitespace Normalization → Case Standardization
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              SVG Pipeline
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg viewBox="0 0 820 220" className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans">
              <defs>
                <linearGradient id="gradFlowMod2_0" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
                </linearGradient>
                <marker id="arrowMod2_0" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
                </marker>
              </defs>

              {/* Node 1: Raw Input Data */}
              <g transform="translate(30, 45)">
                <rect width="210" height="130" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <rect x="12" y="12" width="186" height="26" rx="6" fill="#1e293b" />
                <text x="105" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Raw Input Data / Serial</text>
                <text x="105" y="75" textAnchor="middle" fill="#38bdf8" fontSize="14" fontFamily="monospace" fontWeight="bold">Unstructured Source</text>
                <text x="105" y="100" textAnchor="middle" fill="#64748b" fontSize="10">CSV, ERP &amp; Sensor Strings</text>
                <text x="105" y="118" textAnchor="middle" fill="#64748b" fontSize="10">Raw Data State</text>
              </g>

              <path d="M 245 110 L 305 110" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowMod2_0)" fill="none" />

              {/* Node 2: Transformation Engine */}
              <g transform="translate(315, 30)">
                <rect width="250" height="160" rx="14" fill="#0c4a6e" stroke="#0284c7" strokeWidth="2" />
                <rect x="14" y="14" width="222" height="28" rx="6" fill="#0369a1" />
                <text x="125" y="33" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Formula Transformation Engine</text>
                <text x="125" y="75" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontFamily="monospace" fontWeight="bold">Text Cleaning &amp; Case Normalization</text>
                <text x="125" y="100" textAnchor="middle" fill="#bae6fd" fontSize="10">Delimiter Parsing &amp; String Slicing</text>
                <text x="125" y="120" textAnchor="middle" fill="#bae6fd" fontSize="10">Temporal Serial Calculations</text>
                <text x="125" y="140" textAnchor="middle" fill="#38bdf8" fontSize="9" fontStyle="italic">Native C++ Excel Engine</text>
              </g>

              <path d="M 570 110 L 630 110" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowMod2_0)" fill="none" />

              {/* Node 3: Structured Result */}
              <g transform="translate(640, 45)">
                <rect width="150" height="130" rx="12" fill="#064e3b" stroke="#059669" strokeWidth="2" />
                <rect x="10" y="12" width="130" height="26" rx="6" fill="#047857" />
                <text x="75" y="30" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Clean Normalized Data</text>
                <text x="75" y="75" textAnchor="middle" fill="#6ee7b7" fontSize="14" fontFamily="monospace" fontWeight="bold">Ready for Math</text>
                <text x="75" y="105" textAnchor="middle" fill="#a7f3d0" fontSize="10">Analytics Ready</text>
              </g>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: INTERACTIVE SPREADSHEET & DIRECT DOWNLOAD PORTAL
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">📥</span>
                Interactive Spreadsheet &amp; Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the dataset below live in the browser or download the full module workbook to practice in Microsoft Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download the full .xlsx practice workbook for this module"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="T00 - Text Clean & Case"
            title="Text manipulation essentials: UPPER, LOWER, PROPER, TRIM, and CLEAN - Interactive Practice Grid"
            rowsPerPage={10}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 7: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
              Real-World Corporate Implementation Scenarios
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div key="0" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Case 1 · KYC Compliance Lead</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">Swadeep Banerjee: Customer Name Normalization</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Transforms erratic customer names ('  swadeep   banerjee ') into standardized 'Swadeep Banerjee' across 50,000 banking records.</p>
            </div>
            
            <div key="1" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Case 2 · Tax Auditor</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Plant</span>
              </div>
              <h3 className="font-bold text-white text-base">Tuhina Mukherjee: Vendor Master Code Standardization</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Applies =UPPER(TRIM(A2)) on vendor tax IDs to guarantee exact case-insensitive matches during VLOOKUP tax audits.</p>
            </div>
            
            <div key="2" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Case 3 · Inventory Supervisor</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Works</span>
              </div>
              <h3 className="font-bold text-white text-base">Abhronila Das: Scrap Batch Code Cleaning</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Uses =CLEAN(TRIM(B2)) to strip hidden carriage returns imported from factory barcode scanners.</p>
            </div>
            
            <div key="3" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Case 4 · Logistics Coordinator</span>
                <span className="text-xs font-mono text-slate-400">Naihati Logistics Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">Debangshu Roy: Dispatch City Name Hygiene</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Standardizes mixed-case dispatch notes ('KOLKATA', 'kolkata', 'Kolkata ') into uniform proper-case city labels.</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: STEP-BY-STEP PRACTICAL CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">🛠️</span>
              Step-by-Step Implementation &amp; Execution Guide
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Execution Protocol
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-emerald-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center justify-center text-xs">1</span>
                Step 1: Identify Input Data Types &amp; Delimiters
              </div>
              <p className="text-slate-300 leading-relaxed">
                Inspect raw source columns to confirm whether inputs are text strings, numbers stored as text, or serial dates.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-sky-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center text-xs">2</span>
                Step 2: Construct the Core Formula Expression
              </div>
              <p className="text-slate-300 leading-relaxed">
                In the adjacent calculation column, enter the formula <code className="text-cyan-300 font-mono font-bold">=TRIM(CLEAN(PROPER(text))) | =UPPER(text) | =LOWER(text)</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-teal-950 border border-teal-700 text-teal-300 flex items-center justify-center text-xs">3</span>
                Step 3: Test Boundary Conditions &amp; Error Trapping
              </div>
              <p className="text-slate-300 leading-relaxed">
                Evaluate formula behavior with missing values, blank cells, non-breaking spaces, or overnight timestamp crossovers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-indigo-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center text-xs">4</span>
                Step 4: Propagate Across Dataset &amp; Audit Downstream Logic
              </div>
              <p className="text-slate-300 leading-relaxed">
                Double-click fill handle to propagate formulas down the column and verify that summary lookups and PivotTables calculate without #VALUE! errors.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: COMMON PITFALLS & TROUBLESHOOTING MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 text-base font-mono">⚠️</span>
              Common Pitfalls &amp; Troubleshooting Matrix
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Diagnostic Fixes
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Problem / Error Signature</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Fix &amp; Prevention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr key="0" className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">Non-Breaking Space (ASCII 160) Trap</td>
                  <td className="py-3 px-4">TRIM() only removes ASCII 32 regular spaces; web-scraped ASCII 160 spaces remain untouched.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">=TRIM(CLEAN(SUBSTITUTE(A2, CHAR(160), " ")))</td>
                </tr>
                <tr key="1" className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">PROPER() Hyphen / Apostrophe Anomaly</td>
                  <td className="py-3 px-4">PROPER("o'connor") capitalizes after apostrophes resulting in "O'Connor" but "abc-corp" becomes "Abc-Corp".</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Inspect names with special prefixes (e.g. McDonald) for post-processing adjustments.</td>
                </tr>
                <tr key="2" className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">Formula Reference Replacement</td>
                  <td className="py-3 px-4">Overwriting source columns directly without Copy &gt; Paste as Values deletes dynamic formula logic.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Always copy cleaned output and Paste Special &gt; Values (Alt + E + S + V).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: PRO TIPS & PRODUCTIVITY SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-base font-mono">💡</span>
              Pro Tips &amp; High-Speed Accelerators
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Productivity
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div key="0" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> Triple Clean Combo
              </div>
              <p className="text-slate-300 leading-relaxed">The industrial gold standard for one-shot data cleansing.</p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">=TRIM(CLEAN(PROPER(A2)))</kbd>
            </div>
            
            <div key="1" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> Strip Web Spaces
              </div>
              <p className="text-slate-300 leading-relaxed">Replaces stubborn non-breaking web spaces with normal spaces.</p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">SUBSTITUTE(A2, CHAR(160), " ")</kbd>
            </div>
            
            <div key="2" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> Paste Values Shortcut
              </div>
              <p className="text-slate-300 leading-relaxed">Instantly convert formula transformations into static text.</p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">Ctrl + Alt + V → V</kbd>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: SOCRATIC HINTS ("THINK ABOUT...")
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[10] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">🤔</span>
              Socratic Analytical Hints ("Think About...")
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Critical Thinking
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-300">
            <div key="0" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 1: Why does TRIM() sometimes fail to remove trailing spaces from web-copied tables?
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on the computational and data engineering implications in large-scale enterprise models.
              </p>
            </div>
            
            <div key="1" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 2: How do non-printable ASCII characters affect VLOOKUP or XLOOKUP matching?
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on the computational and data engineering implications in large-scale enterprise models.
              </p>
            </div>
            
            <div key="2" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 3: What is the mathematical difference between ASCII character 32 and ASCII character 160?
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on the computational and data engineering implications in large-scale enterprise models.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: 10 DEDICATED PRACTICAL QUESTIONS (STRICTLY PRACTICAL LAB)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[11] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl space-y-8"
        >
          {/* Header & Badges */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-inner">
                  🎯 Hands-On Practical Lab
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-sky-950/60 border border-sky-800 text-sky-300 text-xs font-mono">
                  10 Real-World Tasks
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 text-lg font-mono">🧪</span>
                10 Practical Questions: Text Cleansing &amp; Standardization Lab
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                Strictly practical enterprise problems testing case transformations, whitespace stripping, non-breaking web space purging, and SQL control character hygiene.
              </p>
            </div>

            {/* Quick Action Controls */}
            <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-950/40 transition-all duration-150 active:scale-95 cursor-pointer"
                title="Download complete 120-question practice workbook in Microsoft Excel format"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Workbook (.xlsx)</span>
              </button>
              <button
                onClick={expandAll}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
              >
                Collapse All
              </button>
              <button
                onClick={revealAllSolutions}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>👁️</span> Reveal All Solutions
              </button>
              <button
                onClick={hideAllSolutions}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>🔒</span> Hide All Solutions
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-xl font-bold text-amber-400 font-mono">10</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Practical Questions</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-xl font-bold text-sky-400 font-mono">5</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Functions Tested</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-xl font-bold text-emerald-400 font-mono">100%</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Formula Verified</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-xl font-bold text-purple-400 font-mono">3 Tiers</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Basic → Advanced</div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1">Filter by Skill:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer",
                  activeCategory === cat
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 scale-[1.02]"
                    : "bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700"
                )}
              >
                {cat}
                {cat === "All" ? ` (${practicalQuestions.length})` : ` (${practicalQuestions.filter((q) => q.category === cat).length})`}
              </button>
            ))}
          </div>

          {/* Practical Questions Accordion List */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const isExpanded = expandedIds.includes(q.id);
              const isRevealed = revealedSolutions.includes(q.id);
              const isCopied = copiedId === q.id;

              const badgeColors = {
                emerald: "bg-emerald-950/80 border-emerald-700/60 text-emerald-300",
                sky: "bg-sky-950/80 border-sky-700/60 text-sky-300",
                amber: "bg-amber-950/80 border-amber-700/60 text-amber-300",
                rose: "bg-rose-950/80 border-rose-700/60 text-rose-300"
              };

              return (
                <div
                  key={q.id}
                  className="rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-slate-700 transition-all duration-200 overflow-hidden shadow-lg"
                >
                  {/* Card Header Bar */}
                  <div
                    onClick={() => toggleQuestion(q.id)}
                    className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-900/60 transition-colors select-none"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 border border-slate-700/80 text-amber-400 font-mono text-xs font-bold shrink-0">
                        #{q.id < 10 ? `0${q.id}` : q.id}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className={clsx(
                              "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
                              badgeColors[q.difficultyColor] || badgeColors.sky
                            )}
                          >
                            {q.difficulty}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700/70 text-cyan-300 font-mono text-[11px] font-semibold">
                            {q.functionUsed}
                          </span>
                          <span className="text-[11px] text-slate-400 hidden md:inline">
                            · {q.category}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                          {q.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-400 hidden sm:inline">
                        {isExpanded ? "Collapse" : "View Question"}
                      </span>
                      <div
                        className={clsx(
                          "w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 text-xs transition-transform duration-200",
                          isExpanded && "rotate-180 text-amber-400"
                        )}
                      >
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Card Expanded Content */}
                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-slate-800/80 space-y-5 bg-slate-900/30">
                      {/* Scenario Narrative */}
                      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/90 space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                          <span>🏢</span> Business Practical Scenario
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {q.scenario}
                        </p>
                      </div>

                      {/* Source Input Data Reference */}
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                          <span>Source Input Data</span>
                          <span className="text-[11px] text-slate-400 font-normal">
                            Target Formula Cell: <span className="font-mono text-cyan-300 font-bold">{q.targetCell}</span>
                          </span>
                        </div>
                        <div className="font-mono text-xs sm:text-sm text-amber-300 bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-800/80 break-all">
                          {q.inputCell}
                        </div>
                      </div>

                      {/* Solution Area: On-Demand Reveal or Full Solution */}
                      {!isRevealed ? (
                        <div className="p-4 rounded-xl bg-slate-900/80 border border-dashed border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-inner">
                          <div className="space-y-0.5">
                            <div className="text-xs font-bold text-amber-400 flex items-center justify-center sm:justify-start gap-1.5">
                              <span>🎯</span> Solution Hidden for Self-Practice
                            </div>
                            <p className="text-xs text-slate-300">
                              Try writing your formula in <span className="font-mono text-cyan-300 font-semibold">{q.targetCell}</span> first. Click reveal when ready to check your output and mechanics.
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRevealSolution(q.id);
                            }}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md hover:shadow-amber-500/20 transition-all cursor-pointer shrink-0"
                          >
                            <span>👁️</span> Show Solution &amp; Formula
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-5 pt-1">
                          {/* Solution Revealed Top Bar */}
                          <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-800/40 px-3.5 py-2 rounded-xl">
                            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                              <span>✓</span> Solution &amp; Verified Mechanics
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleRevealSolution(q.id);
                              }}
                              className="text-[11px] font-semibold text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <span>🔒</span> Hide Solution
                            </button>
                          </div>

                          {/* Evaluated Output */}
                          <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-950/60 space-y-1">
                            <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                              <span>Evaluated Output</span>
                              <span className="text-[10px] font-normal text-emerald-400/80">({q.outputType})</span>
                            </div>
                            <div className="font-mono text-xs sm:text-sm text-emerald-300 font-bold bg-slate-900/90 px-3 py-2 rounded-lg border border-emerald-800/40 break-all">
                              {q.evaluatedOutput}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-1">Ground Truth Value Verified ✓</div>
                          </div>

                          {/* Formula Block with Copy Action */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                              <span className="flex items-center gap-1.5 text-cyan-300">
                                <span>💻</span> Production Excel Formula
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyFormula(q.id, q.formula);
                                }}
                                className={clsx(
                                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-200 cursor-pointer",
                                  isCopied
                                    ? "bg-emerald-600 text-white font-bold shadow-md"
                                    : "bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
                                )}
                              >
                                {isCopied ? "✓ Copied!" : "📋 Copy Formula"}
                              </button>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-950/60 font-mono text-xs sm:text-sm text-cyan-300 shadow-inner overflow-x-auto">
                              {q.formula}
                            </div>

                            {q.alternativeFormula && (
                              <div className="text-xs text-slate-400 font-mono pt-1">
                                <span className="text-slate-400">Alternative Syntax: </span>
                                <code className="text-teal-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                                  {q.alternativeFormula}
                                </code>
                              </div>
                            )}
                          </div>

                          {/* Step-by-Step Logic Breakdown */}
                          <div className="space-y-2">
                            <div className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                              <span>📐</span> Step-by-Step Practical Mechanics
                            </div>
                            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                              {q.stepByStepLogic.map((step, idx) => (
                                <li key={idx} className="flex items-start gap-2.5">
                                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-teal-950 border border-teal-700 text-teal-300 text-[11px] font-bold shrink-0 mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <span className="leading-relaxed">{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Pro-Tip & Corporate Guardrail */}
                          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-900/50 flex items-start gap-3">
                            <span className="text-purple-400 text-base shrink-0">💡</span>
                            <div className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
                              <strong className="text-purple-300 font-semibold">Enterprise Guardrail: </strong>
                              {q.proTip}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Text manipulation essentials: UPPER, LOWER, PROPER, TRIM, and CLEAN - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            note="Data cleaning represents 80% of real-world analytics work. Master the TRIM + CLEAN + SUBSTITUTE(CHAR(160)) triad to solve data import glitches effortlessly."
          />
        </div>
      </div>
    </div>
  );
}
