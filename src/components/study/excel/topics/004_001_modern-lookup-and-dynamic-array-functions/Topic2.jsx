"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_001_modern_lookup_and_dynamic_array_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic2() {
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Dynamic Extraction · Topic 2
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              The UNIQUE Function
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              Deduplication Engine
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
            Extracting Distinct Data with the UNIQUE Function (Single & Multi-Column Unique Rows)
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Manual and destructive deduplication with 'Remove Duplicates' is a thing of the past. 
            The <strong className="text-purple-300 font-mono">UNIQUE</strong> function non-destructively extracts distinct elements, 
            multi-column composite records, and single-occurrence items in memory. Master vertical row vs. horizontal column deduplication (<code className="text-sky-300 font-mono">[by_col]</code>) 
            and isolate one-time transaction anomalies with <code className="text-amber-300 font-mono">[exactly_once]</code>.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Non-Destructive:</strong> Raw transaction data remains untouched</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Multi-Column Tuples:</strong> Distinct (Student + City + Course) rows</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Anomaly Detection:</strong> Filter items appearing strictly once</span>
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
              <span className="text-purple-400">⚡</span> Formula Anatomy: =UNIQUE()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Syntax Specification: UNIQUE(array, [by_col], [exactly_once])
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300">
            <span className="text-slate-500">// Modern UNIQUE Signature:</span>
            <div className="mt-1 text-white font-bold">
              =UNIQUE(<span className="text-amber-300">array</span>, <span className="text-sky-300">[by_col]</span>, <span className="text-emerald-400">[exactly_once]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Typical Industrial Usages:</span>{" "}
              <code className="text-sky-300">=UNIQUE(B2:B50)</code>,{" "}
              <code className="text-amber-300">=SORT(UNIQUE(CityList))</code>,{" "}
              <code className="text-emerald-400">=UNIQUE(CustIDs, FALSE, TRUE)</code>
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
                  <td className="py-3 pl-4 font-sans text-slate-300">The source range, table column, or dynamic array from which distinct values or unique rows will be extracted.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sky-300 font-bold">[by_col]</td>
                  <td className="py-3 px-4 text-slate-400">Boolean</td>
                  <td className="py-3 px-4 text-slate-500 font-sans font-semibold">Optional (Default: FALSE)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">
                    <strong className="text-white">FALSE / Omitted:</strong> Compares row-by-row vertically (standard tables).<br />
                    <strong className="text-white">TRUE:</strong> Compares column-by-column horizontally across a single or multi-row range.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-emerald-300 font-bold">[exactly_once]</td>
                  <td className="py-3 px-4 text-slate-400">Boolean</td>
                  <td className="py-3 px-4 text-slate-500 font-sans font-semibold">Optional (Default: FALSE)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">
                    <strong className="text-white">FALSE / Omitted:</strong> Returns every distinct item (first occurrence of each).<br />
                    <strong className="text-white">TRUE:</strong> Returns strictly values that appear <em>exactly one time</em> in the dataset.
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
            <span className="text-purple-400">🔬</span> Conceptual Mechanics: How UNIQUE Deduplicates in Memory
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              In legacy Excel, deduplicating data required destructive ribbon actions or complex $O(N^2)$ quadratic array formulas: <code className="text-slate-400 font-mono">{`{=INDEX(A2:A100, MATCH(0, COUNTIF(B$1:B1, A2:A100), 0))}`}</code>. On 10,000 rows, this caused significant calculation lag.
            </p>
            <p>
              Modern Excel's <code className="text-purple-300 font-mono">UNIQUE</code> engine uses an internal compiled C++ hash set that executes in linear $O(N)$ time:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-200">
              <li><strong>Sequential Hash Traversal:</strong> Excel iterates through the input rows, computing a 64-bit hash code for each element or multi-column composite tuple.</li>
              <li><strong>Duplicate Detection:</strong> If a hash collision matches an existing record under case-insensitive string equality, it is skipped.</li>
              <li><strong>Dynamic Memory Output:</strong> The resulting unique items are compiled into a contiguous matrix and spilled starting at the formula origin cell.</li>
              <li><strong>[exactly_once] Mode:</strong> In anomaly mode (<code className="text-amber-300 font-mono">TRUE</code>), Excel uses a frequency occurrence map, omitting all items with count &gt; 1.</li>
            </ol>
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
              <span className="text-pink-400">📐</span> Single-Column vs. Multi-Column Composite Deduplication
            </h2>
            <span className="text-xs text-pink-300 bg-pink-950/80 px-3 py-1 rounded-full border border-pink-800">
              Tuple Deduplication Model
            </span>
          </div>

          <p className="text-sm text-slate-300">
            Observe the difference between extracting distinct single-column student names versus distinct multi-column (Student + Course) tuples.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-center items-center overflow-x-auto">
            <svg className="w-full max-w-2xl h-auto" viewBox="0 0 760 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="gridPattern3" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="760" height="300" fill="url(#gridPattern3)" rx="16" />

              {/* Raw Input Table */}
              <g transform="translate(30, 25)">
                <rect x="0" y="0" width="220" height="245" rx="10" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
                <rect x="8" y="8" width="204" height="28" rx="6" fill="#1e293b" />
                <text x="110" y="27" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Raw Student Enrolment Log</text>

                <rect x="15" y="45" width="190" height="24" rx="4" fill="#1e293b" />
                <text x="25" y="61" fill="#e2e8f0" fontSize="10">Swadeep · Barrackpore · Excel</text>

                <rect x="15" y="75" width="190" height="24" rx="4" fill="#1e293b" />
                <text x="25" y="91" fill="#e2e8f0" fontSize="10">Tuhina · Shyamnagar · FinMod</text>

                <rect x="15" y="105" width="190" height="24" rx="4" fill="#1e293b" />
                <text x="25" y="121" fill="#e2e8f0" fontSize="10">Swadeep · Barrackpore · Excel (Dup)</text>

                <rect x="15" y="135" width="190" height="24" rx="4" fill="#1e293b" />
                <text x="25" y="151" fill="#e2e8f0" fontSize="10">Swadeep · Kolkata · Python</text>

                <rect x="15" y="165" width="190" height="24" rx="4" fill="#1e293b" />
                <text x="25" y="181" fill="#e2e8f0" fontSize="10">Susmita · Ichapur · Python</text>

                <rect x="15" y="195" width="190" height="24" rx="4" fill="#1e293b" />
                <text x="25" y="211" fill="#e2e8f0" fontSize="10">Tuhina · Shyamnagar · FinMod (Dup)</text>
              </g>

              {/* Mode A: Single Column UNIQUE */}
              <g transform="translate(280, 25)">
                <rect x="0" y="0" width="200" height="245" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <rect x="8" y="8" width="184" height="28" rx="6" fill="#312e81" />
                <text x="100" y="27" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">=UNIQUE(Student_Names)</text>

                <rect x="15" y="45" width="170" height="26" rx="4" fill="#4338ca" />
                <text x="25" y="62" fill="#ffffff" fontSize="11" fontWeight="bold">1. Swadeep Roy</text>

                <rect x="15" y="80" width="170" height="26" rx="4" fill="#3730a3" />
                <text x="25" y="97" fill="#e0e7ff" fontSize="11">2. Tuhina Mukherjee</text>

                <rect x="15" y="115" width="170" height="26" rx="4" fill="#3730a3" />
                <text x="25" y="132" fill="#e0e7ff" fontSize="11">3. Susmita Saha</text>

                <rect x="15" y="155" width="170" height="70" rx="6" fill="#0f172a" stroke="#6366f1" strokeDasharray="3 3" />
                <text x="100" y="180" fill="#a5b4fc" fontSize="10" textAnchor="middle">Distinct Names Only</text>
                <text x="100" y="198" fill="#818cf8" fontSize="10" fontWeight="bold" textAnchor="middle">Result: 3 Distinct Names</text>
              </g>

              {/* Mode B: Multi-Column Composite UNIQUE */}
              <g transform="translate(510, 25)">
                <rect x="0" y="0" width="220" height="245" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <rect x="8" y="8" width="204" height="28" rx="6" fill="#047857" />
                <text x="110" y="27" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">=UNIQUE(Name:Course)</text>

                <rect x="15" y="45" width="190" height="26" rx="4" fill="#059669" />
                <text x="25" y="62" fill="#ffffff" fontSize="9" fontWeight="bold">Swadeep · Barrackpore · Excel</text>

                <rect x="15" y="80" width="190" height="26" rx="4" fill="#047857" />
                <text x="25" y="97" fill="#e2e8f0" fontSize="9">Tuhina · Shyamnagar · FinMod</text>

                <rect x="15" y="115" width="190" height="26" rx="4" fill="#047857" />
                <text x="25" y="132" fill="#e2e8f0" fontSize="9">Swadeep · Kolkata · Python</text>

                <rect x="15" y="150" width="190" height="26" rx="4" fill="#047857" />
                <text x="25" y="167" fill="#e2e8f0" fontSize="9">Susmita · Ichapur · Python</text>

                <rect x="15" y="185" width="190" height="45" rx="6" fill="#0f172a" stroke="#10b981" strokeDasharray="3 3" />
                <text x="110" y="205" fill="#6ee7b7" fontSize="9" textAnchor="middle">Preserves Swadeep's 2nd course!</text>
                <text x="110" y="220" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">Result: 4 Distinct Tuples</text>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet: UNIQUE Laboratory
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Test single-column and multi-column deduplication live in the grid below or download the practice workbook for Microsoft Excel.
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
              sheetName="Topic2_Unique_Deduplication"
              title="Master Student Enrollment & Deduplication Log"
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
            <span className="text-amber-400">🏢</span> Real-World Business Applications of UNIQUE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-purple-300 text-base">Case 1: Alphabetical Student Roster</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">Barrackpore HQ</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Swadeep Roy</strong> needs an alphabetized list of all enrolled students without duplicate rows. In cell <code className="text-amber-300 font-mono">I2</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-purple-300 border border-slate-800">
                =SORT(UNIQUE(B2:B21))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Spills 9 distinct student names alphabetized cleanly from Abhronila Das to Tuhina Mukherjee.
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-emerald-300 text-base">Case 2: Multi-Course Composite Records</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Shyamnagar Academic Office</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Tuhina Mukherjee</strong> tracks student-course pairings. Students taking multiple tracks must not be collapsed into one row. In cell <code className="text-amber-300 font-mono">K2</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400 border border-slate-800">
                =UNIQUE(B2:D21)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Spills 17 distinct (Name, City, Course) tuples while removing 3 identical duplicate logs.
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-amber-300 text-base">Case 3: Audit Single-Course Enrollees</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">Ichapur Accounts</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita Saha</strong> audits students who enrolled in strictly <em>one</em> course and haven't signed up for a second track. In cell <code className="text-amber-300 font-mono">N2</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-amber-300 border border-slate-800">
                =UNIQUE(B2:B21, FALSE, TRUE)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Returns strictly the students who have exactly 1 record in the log (`[exactly_once] = TRUE`).
              </p>
            </div>

            {/* Scenario 4 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sky-300 text-base">Case 4: Whitespace-Proof Dropdowns</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">Naihati Branch</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Abhronila Das</strong> builds a validation dropdown list for Cities. To prevent stray spaces from generating false duplicate entries:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-sky-300 border border-slate-800">
                =SORT(UNIQUE(TRIM(C2:C21)))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Produces a flawless 4-city master list fed into Data Validation as <code className="text-emerald-400 font-mono">=P2#</code>.
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
            <span className="text-sky-400">📋</span> Step-by-Step Practical Deduplication Guide
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-purple-950 text-purple-400 font-bold flex items-center justify-center border border-purple-800 shrink-0">1</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Determine Single-Column vs. Composite Scope</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Decide whether you want a distinct list of one column (e.g. <code className="text-amber-300 font-mono">B2:B20</code> for Student Names) or distinct multi-column records (e.g. <code className="text-amber-300 font-mono">B2:D20</code> for Student + City + Course).
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center border border-emerald-800 shrink-0">2</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Wrap with TRIM & SORT for Production Polish</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Always sanitize raw user entries by pairing with TRIM and SORT: <code className="text-emerald-400 font-mono">=SORT(UNIQUE(TRIM(B2:B20)))</code>.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-sky-950 text-sky-400 font-bold flex items-center justify-center border border-sky-800 shrink-0">3</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Link to Downstream KPI Cards with '#'</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  To count unique students in an executive card, write <code className="text-sky-300 font-mono">=COUNTA(I2#)</code> or <code className="text-emerald-400 font-mono">=ROWS(I2#)</code>.
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
              <span className="text-rose-400">⚠️</span> Common UNIQUE Pitfalls & Fixes
            </h2>
            <span className="text-xs text-rose-300 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800">
              Data Cleaning Matrix
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Issue / Error</th>
                  <th className="pb-3 px-4">Why It Happens</th>
                  <th className="pb-3 pl-4">Solution & Best Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Duplicate Text Still Appearing</td>
                  <td className="py-3.5 px-4 text-slate-300">Invisible trailing/leading spaces (e.g. <code className="text-slate-400">"Barrackpore "</code> vs <code className="text-slate-400">"Barrackpore"</code>).</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Wrap the input range in <code className="text-sky-300 font-mono">=UNIQUE(TRIM(A2:A50))</code>.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Zero (0) Appearing in Unique Output</td>
                  <td className="py-3.5 px-4 text-slate-300">The source column contains empty blank cells which Excel converts to 0.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Filter blanks first: <code className="text-sky-300 font-mono">=UNIQUE(FILTER(A2:A50, A2:A50&lt;&gt;""))</code>.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">#CALC! Error Returned</td>
                  <td className="py-3.5 px-4 text-slate-300">An upstream FILTER passed zero rows to UNIQUE.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Supply the 3rd argument in FILTER: <code className="text-sky-300 font-mono">FILTER(..., ..., "No Records")</code>.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">#SPILL! Error on Output</td>
                  <td className="py-3.5 px-4 text-slate-300">Cells in the required output path are occupied by existing text or formatting.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Click the warning icon → 'Select Obstructing Cell' → Delete obstruction.</td>
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
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-xs">VSTACK</span>
                <span>Multi-Sheet Deduplication</span>
              </div>
              <p className="text-slate-300">
                Consolidate records across branch worksheets before deduplicating: <code className="text-emerald-400 font-mono">=SORT(UNIQUE(VSTACK(Barrackpore!B2:B30, Shyamnagar!B2:B30)))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-xs">COUNTIF</span>
                <span>Sort by Popularity / Frequency</span>
              </div>
              <p className="text-slate-300">
                To sort unique items by their occurrence count descending: <code className="text-emerald-400 font-mono">=SORTBY(I2#, COUNTIF(B2:B20, I2#), -1)</code>.
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
              <h3 className="font-bold text-teal-300 text-sm">Think About Distinct vs. Exactly Once</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                If an attendance list has 5 records for Swadeep and 1 for Susmita, what does <code className="text-amber-300 font-mono">=UNIQUE(list, FALSE, FALSE)</code> return vs <code className="text-emerald-400 font-mono">=UNIQUE(list, FALSE, TRUE)</code>? Why is the 3rd argument critical for fraud and anomaly audits?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-sky-500">
              <h3 className="font-bold text-sky-300 text-sm">Observe How UNIQUE Preserves Casing</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Notice that Excel is case-insensitive during comparison, but returns the exact text casing of the <em>first</em> occurrence it encounters in the source column.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ (30 QUESTIONS VIA FAQTemplate)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="The UNIQUE Function & Deduplication FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Never use the destructive 'Remove Duplicates' tool on primary raw transactional sheets! Always preserve raw logs intact and use =SORT(UNIQUE(TRIM(SourceColumn))) on calculation or reporting sheets to drive dynamic dropdowns, KPI cards, and financial statements across your Barrackpore and regional business operations."
            }
          />
        </div>
      </div>
    </div>
  );
}
