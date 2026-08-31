"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_004_modern_text_intelligence_and_regular_expressions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic9() {
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
              ⚡ Vectorized Regex Pipelines · Topic 9
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 5: Synthesize & Orchestrate
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Combining Regex Functions with Dynamic Arrays (FILTER, BYROW, TOCOL)
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            The true power of modern Excel is unlocked when <strong>Native Regular Expression Functions</strong> 
            (<code className="text-purple-300 font-mono font-bold">REGEXTEST</code>, <code className="text-sky-300 font-mono font-bold">REGEXEXTRACT</code>, <code className="text-emerald-300 font-mono font-bold">REGEXREPLACE</code>) 
            are orchestrated alongside <strong>Dynamic Array Engines</strong> 
            (<code className="text-amber-300 font-mono font-bold">FILTER</code>, <code className="text-indigo-300 font-mono font-bold">BYROW</code>, <code className="text-fuchsia-300 font-mono font-bold">TOCOL</code>, <code className="text-emerald-300 font-mono font-bold">MAP</code>). 
            This creates 100% automated, formulaic ETL data pipelines that validate, parse, and cleanse tens of thousands of corporate records in pure RAM with zero VBA macros!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>FILTER + REGEXTEST:</strong> Instant record segregation</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>BYROW + REGEXEXTRACT:</strong> 2D Multi-group table parsing</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>TOCOL + UNIQUE:</strong> Global keyword deduplication</span>
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
              <span className="text-purple-400">⚡</span> Vectorized Regex Pipeline Combinations
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pipeline Architectures
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs sm:text-sm">
            {/* 1. FILTER + REGEXTEST */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold uppercase tracking-wider text-xs">1. FILTER + REGEXTEST</span>
              <div className="text-white font-bold">
                =FILTER(Data, REGEXTEST(Col, pat))
              </div>
              <p className="font-sans text-xs text-slate-400">
                Filters rows where a text column strictly satisfies the regular expression pattern.
              </p>
              <div className="p-2 bg-slate-900 rounded-lg text-purple-300 text-xs">
                =FILTER(A5:E20, REGEXTEST(C5:C20, "^[A-Z]{"{5}"}\d{"{4}"}[A-Z]$"))
              </div>
            </div>

            {/* 2. BYROW + REGEXEXTRACT */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-xs">2. BYROW + REGEXEXTRACT</span>
              <div className="text-white font-bold">
                =BYROW(Range, LAMBDA(r, REGEXEXTRACT(r, pat, 2)))
              </div>
              <p className="font-sans text-xs text-slate-400">
                Decomposes composite strings across each row into multi-column capturing groups.
              </p>
              <div className="p-2 bg-slate-900 rounded-lg text-sky-300 text-xs">
                =BYROW(A5:A20, LAMBDA(r, REGEXEXTRACT(r, "^(\w+)\s+(.+)$", 2)))
              </div>
            </div>

            {/* 3. TOCOL + UNIQUE */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs">3. TOCOL + UNIQUE</span>
              <div className="text-white font-bold">
                =SORT(UNIQUE(TOCOL(REGEXEXTRACT(Range, pat, 1), 3)))
              </div>
              <p className="font-sans text-xs text-slate-400">
                Pulls all global matches across rows, flattens to 1D, deduplicates and sorts.
              </p>
              <div className="p-2 bg-slate-900 rounded-lg text-emerald-300 text-xs">
                =SORT(UNIQUE(TOCOL(REGEXEXTRACT(B5:B100, "INV-\d+", 1), 3)))
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Pipeline Combination</th>
                  <th className="py-3 px-4">Dynamic Array Engine</th>
                  <th className="py-3 px-4">Output Structure</th>
                  <th className="py-3 px-4">Enterprise Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-400 font-sans">FILTER + REGEXTEST</td>
                  <td className="py-3 px-4 text-purple-300">FILTER(array, include)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Filtered Table Records</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Isolating valid tax IDs, filtering corporate email accounts.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">BYROW + REGEXEXTRACT</td>
                  <td className="py-3 px-4 text-sky-300">BYROW(array, lambda)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">2D Decomposed Matrix</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Splitting full names and phone components across thousands of rows.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">TOCOL + UNIQUE</td>
                  <td className="py-3 px-4 text-emerald-300">TOCOL(array, 3)</td>
                  <td className="py-3 px-4 text-amber-300 font-bold">1D Deduplicated Vector</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Creating master inventories of invoice codes, SKUs, and IP addresses.</td>
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
              <span className="text-emerald-400">🔬</span> SIMD RAM Vectorization & Multi-Criteria Filtering
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Compiled Array Calculations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> SIMD Array Vectorization
              </h3>
              <p className="leading-relaxed">
                When you pass a column range to <code className="text-purple-300 font-mono">REGEXTEST(C5:C1000, pattern)</code>, 
                Excel 365 calculates all 1,000 matches concurrently in SIMD multi-threaded memory. 
                This boolean vector plugs directly into <code className="text-emerald-300 font-mono">FILTER</code> without helper columns!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                10,000 Rows Filtered in Under 15 Milliseconds
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Multi-Criteria Regex Filtering (AND / OR)
              </h3>
              <p className="leading-relaxed">
                Combine multiple regex conditions using boolean arithmetic:
                <br />
                • <strong>AND:</strong> <code className="text-emerald-300 font-mono">REGEXTEST(PAN, ...) * REGEXTEST(Email, ...)</code>
                <br />
                • <strong>OR:</strong> <code className="text-emerald-300 font-mono">REGEXTEST(PAN, ...) + REGEXTEST(GST, ...)</code>
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                =FILTER(Data, ValidPAN * ValidEmail * ValidPhone)
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Mass Cleansing Across 2D Grids with MAP
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Cleanse non-alphanumeric noise across multiple columns simultaneously:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                =MAP(B5:D20, LAMBDA(cell, TRIM(REGEXREPLACE(cell, "[^a-zA-Z0-9\s]", ""))))
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
              <span className="text-purple-400">📐</span> Visual Dynamic Array Regex Segregation Pipeline
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Vectorized Segregation Engine
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how FILTER + REGEXTEST partitions a raw customer roster into Clean vs Corrupt tables in pure RAM:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 330"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Raw Ingestion Data (Left) */}
              <rect x="25" y="30" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="30" width="220" height="34" rx="12" fill="#7E22CE" fillOpacity="0.3" />
              <text x="135" y="52" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">RAW CUSTOMER ROSTER</text>

              <g transform="translate(35, 75)">
                <rect width="200" height="32" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="20" fill="#A7F3D0" fontSize="9" fontFamily="monospace">Swadeep | ABCDE1234F</text>

                <rect y="40" width="200" height="32" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="60" fill="#A7F3D0" fontSize="9" fontFamily="monospace">Tuhina  | BCDEF5678G</text>

                <rect y="80" width="200" height="32" rx="4" fill="#7F1D1D" stroke="#EF4444" />
                <text x="10" y="100" fill="#FECACA" fontSize="9" fontFamily="monospace">Corrupt | INVALID_PAN</text>

                <rect y="120" width="200" height="32" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="140" fill="#A7F3D0" fontSize="9" fontFamily="monospace">Susmita | CDEFG9012H</text>
              </g>

              <rect x="35" y="240" width="200" height="45" rx="6" fill="#1E1B4B" stroke="#6366F1" />
              <text x="135" y="260" fill="#E0E7FF" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Mixed Dataset Ingestion</text>
              <text x="135" y="275" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Barrackpore Advisory Records</text>

              {/* Arrow */}
              <path d="M 260 165 L 315 165" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,165 310,160 310,170" fill="#A855F7" />

              {/* Dynamic Array Router (Center) */}
              <rect x="325" y="30" width="250" height="270" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="325" y="30" width="250" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="450" y="52" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">FILTER + REGEXTEST ENGINE</text>

              <g transform="translate(340, 75)">
                <rect width="220" height="50" rx="6" fill="#3B0764" stroke="#A855F7" />
                <text x="110" y="20" fill="#F5D0FE" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=FILTER(CustomerTable,</text>
                <text x="110" y="38" fill="#A7F3D0" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">REGEXTEST(PAN, "^[A-Z]{"{5}"}\d{"{4}"}[A-Z]$"))</text>
              </g>

              <g transform="translate(340, 140)" fontFamily="monospace" fontSize="8.5" fill="#E2E8F0">
                <text x="0" y="15">Vector Evaluation:</text>
                <text x="0" y="35" fill="#34D399">{`{TRUE; TRUE; FALSE; TRUE}`}</text>
                <text x="0" y="55">Auto-Segregates Records in RAM</text>
              </g>

              <text x="450" y="275" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Sub-Millisecond SIMD Slicing</text>

              {/* Arrow */}
              <path d="M 590 165 L 620 165" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,165 615,160 615,170" fill="#10B981" />

              {/* Clean Output Table (Right) */}
              <rect x="630" y="30" width="195" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="630" y="30" width="195" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="727" y="50" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CLEAN SPILLED TABLE</text>

              <g transform="translate(640, 75)">
                <rect width="175" height="30" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="8" y="19" fill="#A7F3D0" fontSize="8.5" fontFamily="monospace">Swadeep | ABCDE1234F</text>

                <rect y="36" width="175" height="30" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="8" y="55" fill="#A7F3D0" fontSize="8.5" fontFamily="monospace">Tuhina  | BCDEF5678G</text>

                <rect y="72" width="175" height="30" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="8" y="91" fill="#A7F3D0" fontSize="8.5" fontFamily="monospace">Susmita | CDEFG9012H</text>
              </g>

              <rect x="640" y="235" width="175" height="50" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="727" y="255" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">100% Tax Compliant</text>
              <text x="727" y="271" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Ready for TDS Filing</text>
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
                Explore the dynamic array regex dataset below or download the practice workbook to test <code className="text-purple-300 font-mono">FILTER</code>, <code className="text-purple-300 font-mono">BYROW</code>, and <code className="text-purple-300 font-mono">TOCOL</code> pipelines in Microsoft Excel.
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
            sheetName="EX1910"
            title="Dynamic Array Regex Pipeline Dataset (Record ID, Customer Name, PAN Code, Email, Phone, Status)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Statutory Tax Segregation</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Instant Compliant Record Segregation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Tax Consultant <strong>Swadeep Banerjee</strong> partitions 10,000 vendor records: 
                <code className="text-emerald-300 font-mono">=FILTER(A5:F20, REGEXTEST(C5:C20, "^[A-Z]{"{5}"}\d{"{4}"}[A-Z]$"))</code>. 
                Isolates compliant records for tax filing and flags non-compliant entries in an audit table.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                FILTER + REGEXTEST: Separates 10,000 records in 12 milliseconds
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Banking Invoice Ledger</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Unique Master Invoice Code Extraction
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Accountant <strong>Tuhina Mukherjee</strong> extracts all distinct invoice numbers from narrative blocks: 
                <code className="text-amber-300 font-mono">=SORT(UNIQUE(TOCOL(REGEXEXTRACT(B5:B100, "INV-\d+", 1), 3)))</code>, 
                generating a clean 1D list of invoiced IDs.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                TOCOL + UNIQUE + SORT: Complete Master Invoice Inventory
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · HR Full Name Decomposition</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                2D Row-Wise Multi-Group Splitting
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                HR Lead <strong>Abhronila Sengupta</strong> parses 5,000 employee names: 
                <code className="text-indigo-300 font-mono">=BYROW(A5:A50, LAMBDA(r, REGEXEXTRACT(r, "^(\w+)\s+(.+)$", 2)))</code>, 
                spilling First and Last Name columns simultaneously down the worksheet!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                BYROW + Mode 2: Spills 2 Columns Across 5,000 Rows in 1 Formula
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Web Feedback Cleansing</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Mass 2D Cleansing with MAP & REGEXREPLACE
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Systems Engineer <strong>Debangshu Ghosh</strong> strips HTML tags across a 3-column feedback table: 
                <code className="text-amber-300 font-mono">=MAP(B5:D20, LAMBDA(c, TRIM(REGEXREPLACE(c, "<[^>]+>", ""))))</code>, 
                cleansing entire 2D grids in pure RAM.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                MAP + REGEXREPLACE: 2D Grid Cleansing with Zero Macros
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
              <span className="text-purple-400">🪜</span> Step-by-Step Dynamic Array Regex Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Identify Input Table and Target Criteria Column</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Source dataset: <code className="text-amber-300 font-mono">A5:F20</code>. Target PAN column: <code className="text-amber-300 font-mono">C5:C20</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Construct Anchored Regex Pattern</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pattern: <code className="text-emerald-400 font-mono">"^[A-Z]{"{5}"}\d{"{4}"}[A-Z]$"</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Wrap in FILTER Dynamic Array Engine</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">H5</code>, write: <code className="text-purple-300 font-mono">=FILTER(A5:F20, REGEXTEST(C5:C20, "^[A-Z]{"{5}"}\d{"{4}"}[A-Z]$"))</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Press Enter & Verify Spilled Relational Table</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. The filtered compliant customer records spill dynamically across rows and columns in pure RAM!
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#CALC!</td>
                  <td className="py-3 px-4 text-slate-300">FILTER found zero records matching the REGEXTEST pattern.</td>
                  <td className="py-3 px-4 text-slate-400">No rows meet validation criteria.</td>
                  <td className="py-3 px-4 text-emerald-400">Supply 3rd argument to FILTER: <code className="text-emerald-400 font-mono">=FILTER(..., "No Records Found")</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Destination array cells contain data or merged cells.</td>
                  <td className="py-3 px-4 text-slate-400">Check the spill footprint below and to the right.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing cells to permit automatic array spill.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">#VALUE! in BYROW</td>
                  <td className="py-3 px-4 text-slate-300">LAMBDA in BYROW returned a 2D array instead of a row vector or scalar.</td>
                  <td className="py-3 px-4 text-slate-400">Inspect the return dimensions of the LAMBDA function.</td>
                  <td className="py-3 px-4 text-emerald-400">Ensure REGEXEXTRACT returns only a 1D row vector (mode 2).</td>
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
              Pipeline Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">TOCOL(..., 3)</span>
                <span>Ignore Errors & Blanks</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clean array flattening: <code className="text-emerald-300 font-mono">=TOCOL(REGEXEXTRACT(Range, pat, 1), 3)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">SORTBY + REGEX</span>
                <span>Compliance Sorting</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Put valid rows at top: <code className="text-sky-300 font-mono">=SORTBY(Data, REGEXTEST(Col, pat), -1)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">SUM(--REGEXTEST)</span>
                <span>Compliance KPI</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Count valid records: <code className="text-purple-300 font-mono">=SUM(--REGEXTEST(Range, pat))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Vector RAM Inspection</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight your dynamic array regex pipeline and press <strong>F9</strong> to inspect the spilled table in RAM.
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
                <strong>Reflect on vectorized ETL pipelines:</strong> Why does combining native regex functions with dynamic arrays (<code className="text-purple-300 font-mono">FILTER</code>, <code className="text-sky-300 font-mono">BYROW</code>, <code className="text-emerald-300 font-mono">TOCOL</code>) eliminate the need for external Python scripts or slow VBA macros?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine multi-criteria Boolean vector math:</strong> How does multiplying boolean vectors (<code className="text-emerald-300 font-mono">REGEXTEST(PAN, ...) * REGEXTEST(Email, ...)</code>) create high-speed AND filtering in compiled RAM?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider array unrolling:</strong> Why is wrapping <code className="text-sky-300 font-mono">REGEXEXTRACT(Range, pat, 1)</code> inside <code className="text-emerald-300 font-mono">TOCOL(..., 3)</code> and <code className="text-purple-300 font-mono">UNIQUE</code> the most elegant way to compile master keyword registries?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Regex & Dynamic Array Integration — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Combining native Regex functions with Dynamic Arrays (FILTER, BYROW, TOCOL, MAP) is the pinnacle of modern spreadsheet data engineering. You can validate 50,000 corporate records, isolate exceptions, and restructure multi-column composite databases in a single, lightning-fast formula in pure formula RAM!"
            }
          />
        </div>
      </div>
    </div>
  );
}
