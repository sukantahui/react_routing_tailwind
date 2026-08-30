"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_004_modern_text_intelligence_and_regular_expressions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic0() {
  const sectionsRef = useRef([]);

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

  // Direct workbook download handler
  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "regex_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-purple-500/30 selection:text-purple-200">
      {/* Scoped CSS Keyframes for Smooth Reveal Animation */}
      <style>{`
        @keyframes fadeInSlide {
          from {
            transform: translateY(18px);
          }
          to {
            transform: translateY(0);
          }
        }
        .reveal-section {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* =========================================================================
            SECTION 1: HERO HEADER & EXECUTIVE OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Modern Text Intelligence · Topic 0
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2: Understand & Discover
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Introduction to Excel's Native Regular Expression Functions
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            For decades, corporate data analysts had to rely on brittle, unmaintainable nested formulas 
            like <code className="text-rose-400 font-mono">MID(SEARCH(...))</code> or slow, security-blocked 
            VBA <code className="text-amber-300 font-mono">VBScript.RegExp</code> COM macros to parse unstructured text. 
            Microsoft Excel 365 natively introduces three ultra-fast, multi-threaded <strong>Regular Expression functions</strong>: 
            <code className="text-purple-300 font-mono font-bold">REGEXTEST</code>, <code className="text-sky-300 font-mono font-bold">REGEXEXTRACT</code>, and <code className="text-emerald-300 font-mono font-bold">REGEXREPLACE</code>, 
            bringing industry-standard PCRE pattern matching directly into worksheet formula memory!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Native PCRE Syntax:</strong> No VBA macros or add-ins required</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>50x Faster SIMD RAM:</strong> Sub-millisecond string parsing</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Dynamic Array Ready:</strong> Spills tokens & integrates with FILTER</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">⚡</span> The 3 Native Regex Functions: Syntax Anatomy
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Excel 365 Core Regex Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs sm:text-sm">
            {/* 1. REGEXTEST */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold uppercase tracking-wider text-xs">1. REGEXTEST</span>
              <div className="text-white font-bold">
                =REGEXTEST(<span className="text-sky-300">text</span>, <span className="text-amber-300">pattern</span>, <span className="text-slate-400">[case_sens]</span>)
              </div>
              <p className="font-sans text-xs text-slate-400">
                Returns <code className="text-emerald-400 font-mono">TRUE</code> if pattern matches, else <code className="text-rose-400 font-mono">FALSE</code>.
              </p>
              <div className="p-2 bg-slate-900 rounded-lg text-emerald-300 text-xs">
                =REGEXTEST(A2, "^[A-Z]{5}\d{4}[A-Z]$")
              </div>
            </div>

            {/* 2. REGEXEXTRACT */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-xs">2. REGEXEXTRACT</span>
              <div className="text-white font-bold">
                =REGEXEXTRACT(<span className="text-sky-300">text</span>, <span className="text-amber-300">pattern</span>, <span className="text-yellow-300">[mode]</span>, <span className="text-slate-400">[case]</span>)
              </div>
              <p className="font-sans text-xs text-slate-400">
                Extracts matched substring(s) or capturing groups (<code className="text-yellow-300 font-mono">0=First, 1=All, 2=Groups</code>).
              </p>
              <div className="p-2 bg-slate-900 rounded-lg text-sky-300 text-xs">
                =REGEXEXTRACT(A2, "INV-\d{5}")
              </div>
            </div>

            {/* 3. REGEXREPLACE */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs">3. REGEXREPLACE</span>
              <div className="text-white font-bold">
                =REGEXREPLACE(<span className="text-sky-300">text</span>, <span className="text-amber-300">pattern</span>, <span className="text-emerald-300">replacement</span>)
              </div>
              <p className="font-sans text-xs text-slate-400">
                Replaces pattern matches with new text or backreferences (<code className="text-emerald-300 font-mono">$1, $2</code>).
              </p>
              <div className="p-2 bg-slate-900 rounded-lg text-amber-300 text-xs">
                =REGEXREPLACE(A2, "&lt;[^&gt;]+&gt;", "")
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Function</th>
                  <th className="py-3 px-4">Primary Purpose</th>
                  <th className="py-3 px-4">Return Type</th>
                  <th className="py-3 px-4">Common Corporate Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-400">REGEXTEST</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Input Validation & Quality Control</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Boolean (TRUE / FALSE)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Verifying statutory Tax IDs (PAN, GSTIN) and Email syntax.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400">REGEXEXTRACT</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Token & Pattern Extraction</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">Text / Spilled Array</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Extracting Invoice IDs, transaction dates, and currency amounts.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400">REGEXREPLACE</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Data Cleansing & Masking</td>
                  <td className="py-3 px-4 text-amber-300 font-bold">Sanitized Text String</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Masking confidential Aadhaar/card numbers and stripping HTML tags.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & CALCULATION MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">🔬</span> PCRE Engine Mechanics & SIMD RAM Architecture
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              High-Speed C++ Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Native SIMD Execution vs Legacy VBA
              </h3>
              <p className="leading-relaxed">
                Traditional VBA <code className="text-rose-400 font-mono">RegExp</code> ran on a single thread through COM interop boundaries, taking 450ms for 10,000 strings. 
                Native Excel 365 Regex runs inside compiled C++ multi-threaded calculation cores, evaluating 10,000 records in <strong>under 8 milliseconds</strong>!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                50x Calculation Speedup with Zero Macro Security Warnings
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Character Classes & Anchors
              </h3>
              <p className="leading-relaxed">
                Regular expressions test abstract patterns rather than fixed characters. 
                <code className="text-sky-300 font-mono">\d</code> matches any digit (0-9), <code className="text-sky-300 font-mono">\w</code> matches letters/numbers, 
                and anchors <code className="text-amber-300 font-mono">^</code> (start) and <code className="text-amber-300 font-mono">$</code> (end) enforce full-string conformity!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Precise Field Validation without Brittle String Formulas
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Dynamic Array Integration with FILTER
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Combine REGEXTEST directly with dynamic array filtering to isolate valid records automatically:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                =FILTER(CustomerRecords, REGEXTEST(CHOOSECOLS(CustomerRecords, 3), "^[A-Z]{"{5}"}\d{"{4}"}[A-Z]$"))
              </code>
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">📐</span> Visual Excel 365 Regex Pipeline Architecture
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Regex Engine Execution Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how raw unstructured business text is processed through the three native regex engines:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 330"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Input String (Left) */}
              <rect x="25" y="30" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="30" width="220" height="34" rx="12" fill="#7E22CE" fillOpacity="0.3" />
              <text x="135" y="52" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">RAW INPUT STRING</text>

              <g transform="translate(35, 75)">
                <rect width="200" height="42" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="16" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">Narration Text:</text>
                <text x="10" y="32" fill="#FDE047" fontSize="8.5" fontFamily="monospace">"INV-2026-88421: Swadeep"</text>

                <rect y="50" width="200" height="42" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="66" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">Confidential Card:</text>
                <text x="10" y="82" fill="#38BDF8" fontSize="8.5" fontFamily="monospace">"5482-9921-3344-8821"</text>

                <rect y="100" width="200" height="42" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="116" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">Customer Tax ID:</text>
                <text x="10" y="132" fill="#A7F3D0" fontSize="8.5" fontFamily="monospace">"ABCDE1234F"</text>
              </g>

              <rect x="35" y="240" width="200" height="45" rx="6" fill="#1E1B4B" stroke="#6366F1" />
              <text x="135" y="260" fill="#E0E7FF" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Unstructured Business Data</text>
              <text x="135" y="275" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Messy ERP / CRM Strings</text>

              {/* Arrow */}
              <path d="M 260 165 L 315 165" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,165 310,160 310,170" fill="#A855F7" />

              {/* Engine Block (Center) */}
              <rect x="325" y="30" width="240" height="270" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="325" y="30" width="240" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="445" y="52" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">EXCEL 365 REGEX ENGINE</text>

              <g transform="translate(340, 75)">
                <rect width="210" height="42" rx="4" fill="#3B0764" stroke="#A855F7" />
                <text x="10" y="16" fill="#F5D0FE" fontSize="9" fontWeight="bold" fontFamily="monospace">1. REGEXTEST</text>
                <text x="10" y="32" fill="#A7F3D0" fontSize="8" fontFamily="sans-serif">^[A-Z]{"{5}"}\d{"{4}"}[A-Z]$ &rarr; Matches?</text>

                <rect y="50" width="210" height="42" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="66" fill="#BAE6FD" fontSize="9" fontWeight="bold" fontFamily="monospace">2. REGEXEXTRACT</text>
                <text x="10" y="82" fill="#FDE047" fontSize="8" fontFamily="sans-serif">INV-\d{"{4,5}"} &rarr; Token Extract</text>

                <rect y="100" width="210" height="42" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="116" fill="#A7F3D0" fontSize="9" fontWeight="bold" fontFamily="monospace">3. REGEXREPLACE</text>
                <text x="10" y="132" fill="#E2E8F0" fontSize="8" fontFamily="sans-serif">\d{"{4}"}-\d{"{4}"}-... &rarr; Mask String</text>
              </g>

              <text x="445" y="275" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Native Multi-Threaded SIMD</text>

              {/* Arrow */}
              <path d="M 580 165 L 610 165" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="615,165 605,160 605,170" fill="#10B981" />

              {/* Output Results (Right) */}
              <rect x="620" y="30" width="205" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="620" y="30" width="205" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="722" y="50" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">PROCESSED OUTPUT</text>

              <g transform="translate(635, 75)">
                <rect width="175" height="42" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="16" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">REGEXTEST Result:</text>
                <text x="10" y="32" fill="#34D399" fontSize="10" fontWeight="bold" fontFamily="monospace">TRUE (PAN Valid)</text>

                <rect y="50" width="175" height="42" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="66" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">REGEXEXTRACT Result:</text>
                <text x="10" y="82" fill="#FDE047" fontSize="9.5" fontWeight="bold" fontFamily="monospace">"INV-2026-88421"</text>

                <rect y="100" width="175" height="42" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="116" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">REGEXREPLACE Result:</text>
                <text x="10" y="132" fill="#38BDF8" fontSize="8.5" fontWeight="bold" fontFamily="monospace">"XXXX-XXXX-XXXX-8821"</text>
              </g>

              <rect x="635" y="240" width="175" height="45" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="722" y="260" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">100% Audit-Ready</text>
              <text x="722" y="275" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Instant Spreadsheet Quality</text>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LIVE EXCEL FILE LOADER & DIRECT DOWNLOAD BAR
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet & Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the raw business text samples below or download the master practice workbook to test native Regex in Microsoft Excel.
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
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic0_Overview"
            title="Raw Business Text & Regex Goals (ID, Business Narration, Sample Target, Pattern Goal)"
            rowsPerPage={10}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-amber-400">🏢</span> Real-World Corporate Business Scenarios
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Corporate Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Statutory Taxation</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore Advisory</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Automated PAN & GSTIN Validation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Tax Consultant <strong>Swadeep Banerjee</strong> verifies 5,000 vendor files using: 
                <code className="text-emerald-300 font-mono">=REGEXTEST(C5, "^[A-Z]{"{5}"}\d{"{4}"}[A-Z]$")</code>. 
                Instantly flags incorrect tax records before filing statutory returns.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =REGEXTEST(PAN, "^[A-Z]{5}\d{4}[A-Z]$") &rarr; TRUE/FALSE
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Banking Reconciliations</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Single-Step Invoice ID Extraction
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Accountant <strong>Tuhina Mukherjee</strong> extracts invoice codes from messy bank narration strings: 
                <code className="text-amber-300 font-mono">=REGEXEXTRACT(B5, "INV-\d{"{4,6}"}")</code>, 
                eliminating 5 nested SEARCH/MID formula errors.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Extracts: "INV-2026-88421" from 100-character bank narration
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Data Privacy & Security</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Aadhaar & Card Number Masking
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Compliance Officer <strong>Abhronila Sengupta</strong> masks sensitive identification digits: 
                <code className="text-indigo-300 font-mono">=REGEXREPLACE(D5, "\d{"{4}"}-\d{"{4}"}-\d{"{4}"}-(\d{"{4}"})", "XXXX-XXXX-XXXX-$1")</code>, 
                meeting statutory data privacy compliance.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Formula: =REGEXREPLACE(Card, ..., "XXXX-XXXX-XXXX-$1")
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Web Scraping & CRM Cleaning</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Stripping Unwanted HTML & XML Tags
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Systems Engineer <strong>Debangshu Ghosh</strong> cleans web portal customer comments: 
                <code className="text-amber-300 font-mono">=REGEXREPLACE(RawHTML, "&lt;[^&gt;]+&gt;", "")</code>, 
                converting rich text tags into clean plain text in 1 millisecond.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Instant HTML Tag Stripping: Clean Plain Text Output
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">🪜</span> Step-by-Step Regex Implementation Protocol
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Identify Text Target & Regex Objective</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Determine whether you need to <strong>validate</strong> (REGEXTEST), <strong>extract</strong> (REGEXEXTRACT), or <strong>replace</strong> (REGEXREPLACE).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Construct the Regular Expression Pattern</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Use character classes (<code className="text-amber-300 font-mono">\d</code>, <code className="text-amber-300 font-mono">\w</code>, <code className="text-amber-300 font-mono">[A-Z]</code>) and quantifiers (<code className="text-amber-300 font-mono">+</code>, <code className="text-amber-300 font-mono">{"{5}"}</code>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Enter the Formula in Target Cell</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">D5</code>, write: <code className="text-emerald-400 font-mono">=REGEXEXTRACT(B5, "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{"{2,}"}")</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Press Enter & Verify Result in Memory</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. The extracted email address appears instantly in pure formula RAM!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: COMMON PITFALLS & TROUBLESHOOTING MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚠️</span> Common Errors & Troubleshooting Matrix
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Error Diagnostic Protocol
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Error Code</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE!</td>
                  <td className="py-3 px-4 text-slate-300">Invalid regex pattern syntax (e.g. unclosed parenthesis or bracket).</td>
                  <td className="py-3 px-4 text-slate-400">Check pattern syntax for unmatched brackets or unescaped characters.</td>
                  <td className="py-3 px-4 text-emerald-400">Correct the regex pattern string syntax.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#N/A</td>
                  <td className="py-3 px-4 text-slate-300">REGEXEXTRACT found zero matches matching the pattern in the target text.</td>
                  <td className="py-3 px-4 text-slate-400">Confirm whether pattern strictly matches input data.</td>
                  <td className="py-3 px-4 text-emerald-400">Wrap formula in <code className="text-emerald-400 font-mono">IFNA(REGEXEXTRACT(...), "")</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Case Sensitivity Miss</td>
                  <td className="py-3 px-4 text-slate-300">Default matching is case-sensitive (case_sensitivity = 0).</td>
                  <td className="py-3 px-4 text-slate-400">Input has lowercase letters but pattern used [A-Z].</td>
                  <td className="py-3 px-4 text-emerald-400">Pass <code className="text-emerald-400 font-mono">1</code> for the optional case_sensitivity argument.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & PRODUCTIVITY SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">💡</span> High-Speed Keyboard Shortcuts & Pro Tips
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Regex Productivity Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Anchoring with ^ and $</span>
                <span>Full String Validation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always use <code className="text-emerald-300 font-mono">^...$</code> to prevent partial substring matches from passing validation!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">IFNA Protective Wrapper</span>
                <span>Clean UI Displays</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Wrap REGEXEXTRACT: <code className="text-sky-300 font-mono">=IFNA(REGEXEXTRACT(...), "Not Found")</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">Escape Special Tokens</span>
                <span>Literal Matching</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Escape dots and plus signs: <code className="text-purple-300 font-mono">\.</code> and <code className="text-purple-300 font-mono">\+</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Pattern Evaluation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight your regex formula in the formula bar and press <strong>F9</strong> to inspect matched tokens in RAM.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">🤔</span> Socratic Analytical Reflection
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Critical Thinking Prompts
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Reflect on pattern intelligence:</strong> Why are regular expressions vastly superior to traditional <code className="text-rose-400 font-mono">MID/SEARCH</code> formulas when parsing strings with unpredictable spacing or variable formats?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine validation anchoring:</strong> If you validate a PAN code without anchors as <code className="text-amber-300 font-mono">[A-Z]{"{5}"}\d{"{4}"}[A-Z]</code>, why will the string <code className="text-rose-400 font-mono">"XYZABCDE1234F999"</code> mistakenly return TRUE?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider pipeline performance:</strong> How does native C++ SIMD evaluation in Excel 365 allow corporate spreadsheets to validate 50,000 tax records in 20 milliseconds without macros?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Native Regular Expression Functions in Excel 365 — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Welcome to Module 004_004: Modern Text Intelligence & Regular Expressions! The arrival of native Regex functions in Excel 365 (REGEXTEST, REGEXEXTRACT, REGEXREPLACE) eliminates the fragile nested string formulas and slow VBA macros of the past. Always anchor your patterns, validate input data at the boundary, and harness sub-millisecond pattern matching to build bulletproof corporate data pipelines!"
            }
          />
        </div>
      </div>
    </div>
  );
}
