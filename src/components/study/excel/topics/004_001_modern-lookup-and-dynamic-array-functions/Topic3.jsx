"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_001_modern_lookup_and_dynamic_array_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic3() {
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
    link.download = "dynamic_arrays_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-sky-500/30 selection:text-sky-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Reactive Data Pipelines · Topic 3
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              The FILTER Function
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Boolean Matrix Algebra (* / +)
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
            Dynamic Multi-Condition Data Filtering with the FILTER Function (AND / OR Logic in Arrays)
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Forget manual AutoFilters that disrupt worksheet layouts and break formulas. 
            The <strong className="text-sky-300 font-mono">FILTER</strong> function dynamically extracts and spills matching rows to any reporting location in real time. 
            Master boolean array multiplication (<code className="text-emerald-300 font-mono">*</code> for AND), boolean array addition (<code className="text-amber-300 font-mono">+</code> for OR), 
            and handle zero-match results gracefully with <code className="text-rose-400 font-mono">[if_empty]</code>.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Live Data Streaming:</strong> Reactive updates with zero VBA</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Compound Logic:</strong> Seamless AND (<code className="font-mono text-emerald-300">*</code>) & OR (<code className="font-mono text-amber-300">+</code>)</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Zero-Match Protection:</strong> Built-in <code className="font-mono text-rose-300">[if_empty]</code> fallback</span>
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
              <span className="text-sky-400">⚡</span> Formula Anatomy: =FILTER()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Syntax Specification: FILTER(array, include, [if_empty])
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-sky-300">
            <span className="text-slate-500">// Modern FILTER Signature:</span>
            <div className="mt-1 text-white font-bold">
              =FILTER(<span className="text-amber-300">array</span>, <span className="text-emerald-400">include</span>, <span className="text-rose-300">[if_empty]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Compound Criteria Anatomy:</span>{" "}
              <code className="text-emerald-400">=(Range1="X") * (Range2&gt;100)</code> (AND Logic) |{" "}
              <code className="text-amber-300">=(Range1="A") + (Range1="B")</code> (OR Logic)
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Argument</th>
                  <th className="pb-3 px-4">Type</th>
                  <th className="pb-3 px-4">Required?</th>
                  <th className="pb-3 pl-4">Description & Evaluation Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="py-3 pr-4 text-amber-300 font-bold">array</td>
                  <td className="py-3 px-4 text-slate-400">Range / Array</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Required</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">The entire source table or range containing the columns and rows to be filtered.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-emerald-300 font-bold">include</td>
                  <td className="py-3 px-4 text-slate-400">Boolean Array</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Required</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">
                    A column (or row) of boolean TRUE/FALSE values. Must match the exact height (or width) of <code className="text-amber-300">array</code>.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-rose-300 font-bold">[if_empty]</td>
                  <td className="py-3 px-4 text-slate-400">Scalar / String</td>
                  <td className="py-3 px-4 text-slate-500 font-sans font-semibold">Optional</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">
                    Fallback value returned if 0 rows meet the criteria. If omitted and 0 rows match, Excel returns <code className="text-rose-400 font-mono">#CALC!</code>.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-sky-400">🔬</span> Why Standard AND() & OR() Fail in Array Formulas
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              A common beginner mistake is writing <code className="text-rose-400 font-mono">=FILTER(A2:D20, AND(B2:B20="Barrackpore", C2:C20&gt;50000))</code>. 
              This formula fails because Excel's native <code className="text-slate-400 font-mono">AND()</code> function reduces an entire array of values into a single scalar <code className="text-slate-300 font-mono">TRUE</code> or <code className="text-slate-300 font-mono">FALSE</code>. 
              It cannot evaluate rows independently.
            </p>
            <p>
              In dynamic array engineering, we use <strong>Boolean Algebra</strong>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h3 className="font-bold text-emerald-400 flex items-center gap-2 text-sm">
                  <span>*</span> AND Logic (Multiplication)
                </h3>
                <p className="text-xs text-slate-300">
                  <code className="text-emerald-300 font-mono">(Cond1) * (Cond2)</code><br />
                  • TRUE (1) × TRUE (1) = <strong>1 (Include)</strong><br />
                  • TRUE (1) × FALSE (0) = <strong>0 (Exclude)</strong><br />
                  • FALSE (0) × FALSE (0) = <strong>0 (Exclude)</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h3 className="font-bold text-amber-400 flex items-center gap-2 text-sm">
                  <span>+</span> OR Logic (Addition)
                </h3>
                <p className="text-xs text-slate-300">
                  <code className="text-amber-300 font-mono">(Cond1) + (Cond2)</code><br />
                  • TRUE (1) + FALSE (0) = <strong>1 (Include)</strong><br />
                  • TRUE (1) + TRUE (1) = <strong>2 (Include)</strong><br />
                  • FALSE (0) + FALSE (0) = <strong>0 (Exclude)</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">📐</span> Boolean Vector Multiplication Pipeline
            </h2>
            <span className="text-xs text-teal-300 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800">
              Row Filtering Engine
            </span>
          </div>

          <p className="text-sm text-slate-300">
            Visualizing how Excel evaluates <code className="text-emerald-400 font-mono">(Branch="Barrackpore") * (Revenue &gt;= 50000)</code> to stream matching rows.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-center items-center overflow-x-auto">
            <svg className="w-full max-w-2xl h-auto" viewBox="0 0 760 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="gridPattern4" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="760" height="300" fill="url(#gridPattern4)" rx="16" />

              {/* Vector A */}
              <g transform="translate(30, 25)">
                <rect x="0" y="0" width="130" height="245" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <rect x="8" y="8" width="114" height="26" rx="6" fill="#0c4a6e" />
                <text x="65" y="25" fill="#7dd3fc" fontSize="10" fontWeight="bold" textAnchor="middle">Branch="Barrackpore"</text>

                <text x="65" y="65" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">1 (TRUE)</text>
                <text x="65" y="105" fill="#f87171" fontSize="12" textAnchor="middle">0 (FALSE)</text>
                <text x="65" y="145" fill="#f87171" fontSize="12" textAnchor="middle">0 (FALSE)</text>
                <text x="65" y="185" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">1 (TRUE)</text>
                <text x="65" y="225" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">1 (TRUE)</text>
              </g>

              {/* Multiplication Symbol */}
              <text x="180" y="150" fill="#94a3b8" fontSize="24" fontWeight="bold" textAnchor="middle">×</text>

              {/* Vector B */}
              <g transform="translate(200, 25)">
                <rect x="0" y="0" width="130" height="245" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
                <rect x="8" y="8" width="114" height="26" rx="6" fill="#581c87" />
                <text x="65" y="25" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">Revenue &gt;= 50,000</text>

                <text x="65" y="65" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">1 (TRUE)</text>
                <text x="65" y="105" fill="#f87171" fontSize="12" textAnchor="middle">0 (FALSE)</text>
                <text x="65" y="145" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">1 (TRUE)</text>
                <text x="65" y="185" fill="#f87171" fontSize="12" textAnchor="middle">0 (FALSE)</text>
                <text x="65" y="225" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">1 (TRUE)</text>
              </g>

              {/* Equals Symbol */}
              <text x="350" y="150" fill="#94a3b8" fontSize="24" fontWeight="bold" textAnchor="middle">=</text>

              {/* Result Vector */}
              <g transform="translate(370, 25)">
                <rect x="0" y="0" width="110" height="245" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <rect x="8" y="8" width="94" height="26" rx="6" fill="#047857" />
                <text x="55" y="25" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Filter Mask</text>

                <text x="55" y="65" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">1 (KEEP)</text>
                <text x="55" y="105" fill="#6ee7b7" fontSize="11" textAnchor="middle">0 (Drop)</text>
                <text x="55" y="145" fill="#6ee7b7" fontSize="11" textAnchor="middle">0 (Drop)</text>
                <text x="55" y="185" fill="#6ee7b7" fontSize="11" textAnchor="middle">0 (Drop)</text>
                <text x="55" y="225" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">1 (KEEP)</text>
              </g>

              {/* Spilled Rows */}
              <g transform="translate(500, 25)">
                <rect x="0" y="0" width="230" height="245" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <rect x="8" y="8" width="214" height="26" rx="6" fill="#312e81" />
                <text x="115" y="25" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">Spilled Output (J2#)</text>

                <rect x="15" y="50" width="200" height="30" rx="4" fill="#4338ca" />
                <text x="25" y="70" fill="#ffffff" fontSize="10" fontWeight="bold">Row 1: Swadeep · ₹54,000</text>

                <rect x="15" y="210" width="200" height="30" rx="4" fill="#4338ca" />
                <text x="25" y="230" fill="#ffffff" fontSize="10" fontWeight="bold">Row 5: Priya · ₹84,000</text>

                <text x="115" y="140" fill="#a5b4fc" fontSize="10" textAnchor="middle">Rows with 0 are omitted</text>
                <text x="115" y="160" fill="#818cf8" fontSize="10" fontWeight="bold" textAnchor="middle">Clean 2-Row Spilled Table</text>
              </g>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet: Multi-Criteria Filtering
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the live dataset below or download the practice workbook to test compound AND/OR filtering in desktop Microsoft Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer"
              title="Download dynamic_arrays_master.xlsx practice file"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Workbook (.xlsx)</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
            <ExcelFileLoader
              fileModule={sampleWorkbookUrl}
              sheetName="EX1604"
              title="Master Billing & Course Invoice Register"
              rowsPerPage={10}
              showSheetSelector={true}
            />
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-amber-400">🏢</span> Real-World Business Applications of FILTER
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sky-300 text-base">Case 1: Branch-Specific Online Invoices (AND Logic)</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">Barrackpore Accounts</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Swadeep Roy</strong> needs all invoices for <em>Barrackpore Branch</em> that were paid via <em>UPI / Online</em>. In cell <code className="text-amber-300 font-mono">K2</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-sky-300 border border-slate-800">
                =FILTER(A2:I21, (C2:C21="Barrackpore") * (H2:H21="UPI / Online"), "No Records")
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Dynamically spills 4 matching rows across 9 columns.
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-emerald-300 text-base">Case 2: Multi-Branch Regional Consolidation (OR Logic)</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">North 24 Parganas Zone</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Tuhina Mukherjee</strong> consolidates invoices from <em>Shyamnagar</em> OR <em>Ichapur</em>. In cell <code className="text-amber-300 font-mono">K2</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400 border border-slate-800">
                =FILTER(A2:I21, (C2:C21="Shyamnagar") + (C2:C21="Ichapur"), "No Regional Data")
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Spills all 8 invoices belonging to either branch automatically.
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-indigo-300 text-base">Case 3: Interactive Keyword Search Box</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">Naihati Dashboard</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita Saha</strong> connects an input search box in cell <code className="text-amber-300 font-mono">M1</code>. If blank, shows all; if keyword typed, filters courses:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-indigo-300 border border-slate-800">
                =FILTER(A2:I21, (M1="") + ISNUMBER(SEARCH(M1, D2:D21)), "No Courses Match")
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Typing "Python" filters instantly to all 6 Python Data Science batches!
              </p>
            </div>

            {/* Scenario 4 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-purple-300 text-base">Case 4: High-Value Delivered Invoices (Compound AND/OR)</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">Corporate Audit</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Abhronila Das</strong> extracts delivered invoices for (Barrackpore OR Naihati) exceeding ₹60,000:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-purple-300 border border-slate-800">
                =FILTER(A2:I21, ((C2:C21="Barrackpore")+(C2:C21="Naihati")) * (I2:I21="Delivered") * (G2:G21&gt;=60000))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Isolate high-value delivered corporate revenue streams with 100% precision.
              </p>
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
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-sky-400">📋</span> Step-by-Step Multi-Condition Construction
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-sky-950 text-sky-400 font-bold flex items-center justify-center border border-sky-800 shrink-0">1</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Wrap Every Separate Condition in Parentheses</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Excel requires parentheses around each logical statement: <code className="text-emerald-400 font-mono">(C2:C20="Barrackpore")</code>. Without parentheses, operator precedence evaluates arithmetic before equality tests.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center border border-emerald-800 shrink-0">2</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Join with * (AND) or + (OR) Operators</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Multiply for simultaneous constraints (<code className="text-emerald-400 font-mono">*</code>); add for alternative options (<code className="text-amber-400 font-mono">+</code>).
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-indigo-950 text-indigo-400 font-bold flex items-center justify-center border border-indigo-800 shrink-0">3</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Always Provide the [if_empty] Safety String</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Always supply the 3rd parameter: <code className="text-rose-300 font-mono">"No Matching Records"</code> to ensure professional error handling when filters return zero rows.
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
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚠️</span> Common FILTER Pitfalls & Fixes
            </h2>
            <span className="text-xs text-rose-300 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800">
              Diagnostic Guide
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Frequent Error</th>
                  <th className="pb-3 px-4">Root Cause</th>
                  <th className="pb-3 pl-4">Corrective Best Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">#VALUE! Error</td>
                  <td className="py-3.5 px-4 text-slate-300">Dimension mismatch (e.g. source array is 20 rows, but include condition is 25 rows).</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Ensure the criteria range has the exact same start and end row numbers as the source array.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">#CALC! Error</td>
                  <td className="py-3.5 px-4 text-slate-300">Zero records meet the criteria and the <code className="text-slate-400">[if_empty]</code> argument was omitted.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Add the 3rd argument: <code className="text-sky-300 font-mono">=FILTER(..., ..., "No Records")</code>.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Formula Returns All / Zero Rows Incorrectly</td>
                  <td className="py-3.5 px-4 text-slate-300">Used <code className="text-rose-400">AND()</code> or <code className="text-rose-400">OR()</code> inside include.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Replace <code className="text-slate-400">AND</code> with <code className="text-emerald-400">*</code> and <code className="text-slate-400">OR</code> with <code className="text-amber-400">+</code>.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">#SPILL! Error on Output</td>
                  <td className="py-3.5 px-4 text-slate-300">Destination cells are blocked by existing values or merged cells.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Unmerge cells and clear all data in the spill perimeter.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & KEYBOARD SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-purple-400">💡</span> Pro Tips & Advanced Recipes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-xs">TAKE</span>
                <span>Top N Filtered Records</span>
              </div>
              <p className="text-slate-300">
                To extract the Top 3 highest revenue invoices: <code className="text-emerald-400 font-mono">=TAKE(SORT(FILTER(A2:I20, C2:C20="Barrackpore"), 7, -1), 3)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-xs">CHOOSECOLS</span>
                <span>Extract Specific Columns</span>
              </div>
              <p className="text-slate-300">
                To return only Invoice ID, Student Count, and Gross Total: <code className="text-emerald-400 font-mono">=CHOOSECOLS(FILTER(A2:I20, Criteria), 1, 5, 7)</code>.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-teal-400">🤔</span> Socratic Analytical Hints
          </h2>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-teal-500">
              <h3 className="font-bold text-teal-300 text-sm">Think About Why (M1="") + Works for Search Boxes</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                When cell <code className="text-amber-300 font-mono">M1</code> is empty, <code className="text-emerald-400 font-mono">(M1="")</code> evaluates to <code className="text-slate-300 font-mono">TRUE (1)</code>. Because <code className="text-slate-300 font-mono">1 + anything &gt;= 1</code>, every row evaluates to TRUE, displaying the entire table. When text is typed into M1, <code className="text-slate-300 font-mono">(M1="")</code> becomes 0, activating the search filter seamlessly!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-sky-500">
              <h3 className="font-bold text-sky-300 text-sm">Observe How SUM(FILTER()) Replaces Complex SUMIFS</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Notice how <code className="text-emerald-400 font-mono">=SUM(FILTER(G2:G20, ISNUMBER(SEARCH("Excel", D2:D20))))</code> calculates wildcard sums dynamically without requiring fragile criteria string concatenations like <code className="text-slate-400 font-mono">"*Excel*"</code>.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ (30 QUESTIONS VIA FAQTemplate)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="The FILTER Function & Multi-Condition Logic FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "The FILTER function is the single most transformative tool for corporate dashboard architecture in Barrackpore and Kolkata. Master boolean multiplication (*) for AND logic and addition (+) for OR logic. Always supply the [if_empty] argument so your executive financial summaries stay clean and error-free even during off-peak zero-sales periods!"
            }
          />
        </div>
      </div>
    </div>
  );
}
