"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_001_modern_lookup_and_dynamic_array_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic10() {
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
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Multi-Dimensional Lookups · Topic 10
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              XLOOKUP Spilling Engine
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              Two-Way 2D Matrix Intersections
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
            Dynamic Two-Way Lookups with XLOOKUP Spilling Entire Rows or Columns
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Retire fragile legacy <code className="text-slate-400 font-mono">INDEX/MATCH/MATCH</code> and repeated VLOOKUP formulas. 
            With <strong className="text-cyan-300 font-mono">XLOOKUP</strong>, you can spill complete multi-column records in a single formula, 
            vectorize thousands of lookups simultaneously with <code className="text-amber-300 font-mono">A2#</code>, 
            and nest XLOOKUP inside XLOOKUP to extract dynamic 2D matrix intersections (Row & Column) with built-in error handling.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-cyan-400 text-base">✓</span>
              <span><strong>Multi-Column Spilling:</strong> Retrieve complete rows in 1 cell</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Two-Way Intersections:</strong> Dynamic matrix row & column lookup</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Vectorized Lookups:</strong> Bulk processing with <code className="font-mono text-amber-300">KeyOrigin#</code></span>
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
              <span className="text-cyan-400">⚡</span> Two-Way & Spilled XLOOKUP Anatomy
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pattern: =XLOOKUP(RowVal, RowHeaders, XLOOKUP(ColVal, ColHeaders, Matrix))
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-cyan-300">
            <span className="text-slate-500">// Pattern 1: Multi-Column Spilled Row Lookup:</span>
            <div className="mt-1 text-white font-bold">
              =XLOOKUP(<span className="text-amber-300">lookup_key</span>, <span className="text-sky-300">key_column</span>, <span className="text-emerald-400">multi_column_return_matrix</span>)
            </div>
            <div className="mt-3 text-slate-500">// Pattern 2: Dynamic Two-Way Matrix Intersection:</div>
            <div className="mt-1 text-white font-bold">
              =XLOOKUP(<span className="text-amber-300">SelectedCourse</span>, <span className="text-sky-300">CourseRows</span>, <span className="text-purple-300">XLOOKUP</span>(<span className="text-amber-300">SelectedBranch</span>, <span className="text-sky-300">BranchCols</span>, <span className="text-emerald-400">PriceMatrix</span>), <span className="text-rose-400">"Not Found"</span>)
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Component</th>
                  <th className="pb-3 px-4">Role</th>
                  <th className="pb-3 pl-4">Operational Mechanics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="py-3 pr-4 text-purple-300 font-bold">Inner XLOOKUP</td>
                  <td className="py-3 px-4 font-sans text-slate-400">Column Selector</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Locates the branch header horizontally and returns that entire branch column vector in memory.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-cyan-300 font-bold">Outer XLOOKUP</td>
                  <td className="py-3 px-4 font-sans text-slate-400">Row Intersector</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Searches for the course name within the returned column vector, isolating the exact price cell.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-rose-300 font-bold">[if_not_found]</td>
                  <td className="py-3 px-4 font-sans text-slate-400">Error Trap</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Supplies clean fallback text if either course or branch is invalid, avoiding `#N/A`.</td>
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
            <span className="text-cyan-400">🔬</span> Conceptual Mechanics: 2D Matrix Intersection Architecture
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              In traditional spreadsheets, querying a 2D matrix (rows = Products, columns = Regions) required <code className="text-slate-400 font-mono">=INDEX(Matrix, MATCH(RowVal, RowCol, 0), MATCH(ColVal, ColRow, 0))</code>. 
              This legacy formula was error-prone, required 3 separate function calls, and crashed with <code className="text-rose-400 font-mono">#REF!</code> if matrix boundary coordinates mismatched.
            </p>
            <p>
              With Modern XLOOKUP:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-200">
              <li><strong>First Dimension Isolation:</strong> The inner XLOOKUP evaluates <code className="text-sky-300 font-mono">XLOOKUP("Barrackpore", B1:F1, B2:F6)</code>. Because the return array is a 2D matrix, XLOOKUP extracts the 5-element vertical column vector for Barrackpore into memory.</li>
              <li><strong>Second Dimension Pinpoint:</strong> The outer XLOOKUP scans <code className="text-amber-300 font-mono">A2:A6</code> for "Python Data Science" within that returned vector, extracting the exact fee (₹6,000).</li>
              <li><strong>Bulk Multi-Key Vectorization:</strong> If you pass an array of keys <code className="text-emerald-400 font-mono">InvoiceIDs#</code> into XLOOKUP, Excel executes lookups for all rows in parallel, spilling the complete result set simultaneously!</li>
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
              <span className="text-teal-400">📐</span> 2-Way Matrix Intersection Architecture
            </h2>
            <span className="text-xs text-teal-300 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800">
              Row & Column Matrix Pinpoint
            </span>
          </div>

          <p className="text-sm text-slate-300">
            Visualizing how nested XLOOKUP pinpoints the exact price intersection for (Python Data Science × Barrackpore).
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-center items-center overflow-x-auto">
            <svg className="w-full max-w-2xl h-auto" viewBox="0 0 760 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="gridPattern11" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="760" height="280" fill="url(#gridPattern11)" rx="16" />

              {/* 2D Matrix Table */}
              <g transform="translate(30, 25)">
                <rect x="0" y="0" width="440" height="225" rx="10" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
                
                {/* Header Row */}
                <rect x="10" y="10" width="130" height="26" rx="4" fill="#1e293b" />
                <text x="75" y="27" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">Course Program</text>

                {/* Column Highlight: Barrackpore */}
                <rect x="150" y="10" width="85" height="26" rx="4" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="192" y="27" fill="#7dd3fc" fontSize="10" fontWeight="bold" textAnchor="middle">Barrackpore ↓</text>

                <rect x="245" y="10" width="85" height="26" rx="4" fill="#1e293b" />
                <text x="287" y="27" fill="#94a3b8" fontSize="10" textAnchor="middle">Shyamnagar</text>

                <rect x="340" y="10" width="85" height="26" rx="4" fill="#1e293b" />
                <text x="382" y="27" fill="#94a3b8" fontSize="10" textAnchor="middle">Ichapur</text>

                {/* Row 1 */}
                <text x="20" y="65" fill="#e2e8f0" fontSize="10">Advanced Excel</text>
                <text x="192" y="65" fill="#94a3b8" fontSize="10" textAnchor="middle">₹4,500</text>
                <text x="287" y="65" fill="#94a3b8" fontSize="10" textAnchor="middle">₹4,200</text>
                <text x="382" y="65" fill="#94a3b8" fontSize="10" textAnchor="middle">₹4,000</text>

                {/* Row 2 */}
                <text x="20" y="100" fill="#e2e8f0" fontSize="10">Financial Modeling</text>
                <text x="192" y="100" fill="#94a3b8" fontSize="10" textAnchor="middle">₹5,500</text>
                <text x="287" y="100" fill="#94a3b8" fontSize="10" textAnchor="middle">₹5,200</text>
                <text x="382" y="100" fill="#94a3b8" fontSize="10" textAnchor="middle">₹5,000</text>

                {/* Row 3: Highlight Target */}
                <rect x="10" y="115" width="420" height="32" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                <text x="20" y="135" fill="#c7d2fe" fontSize="10" fontWeight="bold">Python Data Science →</text>
                
                {/* Target Intersection Cell */}
                <rect x="150" y="118" width="85" height="26" rx="4" fill="#047857" stroke="#34d399" strokeWidth="2" />
                <text x="192" y="135" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">₹6,000 ★</text>

                <text x="287" y="135" fill="#e0e7ff" fontSize="10" textAnchor="middle">₹5,800</text>
                <text x="382" y="135" fill="#e0e7ff" fontSize="10" textAnchor="middle">₹5,500</text>

                {/* Row 4 */}
                <text x="20" y="175" fill="#e2e8f0" fontSize="10">Full Stack Dev</text>
                <text x="192" y="175" fill="#94a3b8" fontSize="10" textAnchor="middle">₹7,500</text>
                <text x="287" y="175" fill="#94a3b8" fontSize="10" textAnchor="middle">₹7,200</text>
                <text x="382" y="175" fill="#94a3b8" fontSize="10" textAnchor="middle">₹7,000</text>

                {/* Row 5 */}
                <text x="20" y="210" fill="#e2e8f0" fontSize="10">Power BI Stack</text>
                <text x="192" y="210" fill="#94a3b8" fontSize="10" textAnchor="middle">₹6,500</text>
                <text x="287" y="210" fill="#94a3b8" fontSize="10" textAnchor="middle">₹6,200</text>
                <text x="382" y="210" fill="#94a3b8" fontSize="10" textAnchor="middle">₹6,000</text>
              </g>

              {/* Formula & Result Card */}
              <g transform="translate(490, 25)">
                <rect x="0" y="0" width="240" height="225" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <rect x="8" y="8" width="224" height="26" rx="6" fill="#047857" />
                <text x="120" y="25" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">Dynamic Intersection Pinpoint</text>

                <rect x="15" y="45" width="210" height="45" rx="6" fill="#0f172a" />
                <text x="25" y="63" fill="#94a3b8" fontSize="9">Course: <tspan fill="#38bdf8" fontWeight="bold">Python Data Science</tspan></text>
                <text x="25" y="80" fill="#94a3b8" fontSize="9">Branch: <tspan fill="#34d399" fontWeight="bold">Barrackpore</tspan></text>

                <rect x="15" y="105" width="210" height="60" rx="6" fill="#059669" />
                <text x="120" y="128" fill="#ffffff" fontSize="11" textAnchor="middle">Calculated Rate:</text>
                <text x="120" y="152" fill="#ffffff" fontSize="18" fontWeight="bold" textAnchor="middle">₹6,000 / Student</text>

                <text x="120" y="195" fill="#6ee7b7" fontSize="9" textAnchor="middle">Zero INDEX/MATCH clutter!</text>
                <text x="120" y="210" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">100% Dynamic & Error-Proof</text>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet: 2D Matrix Price Lab
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the branch fee matrix below or download the practice workbook to test two-way lookups in desktop Excel.
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
              sheetName="EX1611"
              title="Regional Course Pricing 2D Matrix"
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
            <span className="text-amber-400">🏢</span> Real-World Business Applications of 2-Way & Spilled XLOOKUP
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-cyan-300 text-base">Case 1: Dynamic Two-Way Rate Card</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">Barrackpore Admissions</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Swadeep Roy</strong> connects Course dropdown in <code className="text-amber-300 font-mono">H1</code> and Branch dropdown in <code className="text-amber-300 font-mono">H2</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-cyan-300 border border-slate-800">
                =XLOOKUP(H1, A2:A6, XLOOKUP(H2, B1:F1, B2:F6), "Rate Not Found")
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Retrieves the exact branch fee instantaneously on dropdown selection.
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-emerald-300 text-base">Case 2: 6-Column Student Profile Spilling</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Shyamnagar Registrar</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Tuhina Mukherjee</strong> enters an Invoice ID in <code className="text-amber-300 font-mono">J1</code> and spills the full student transaction row:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400 border border-slate-800">
                =XLOOKUP(J1, Topic3_Filter_MultiCriteria!A2:A21, Topic3_Filter_MultiCriteria!B2:I21)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Spills all 8 columns (Officer, Branch, Course, Fee, Status) in 1 single formula!
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sky-300 text-base">Case 3: Vectorized Spilled Key Lookup</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">Ichapur Accounts</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita Saha</strong> performs lookups for all filtered candidate IDs in <code className="text-amber-300 font-mono">A2#</code> simultaneously:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-sky-300 border border-slate-800">
                =XLOOKUP(A2#, MasterTable[ID], MasterTable[Fee])
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Evaluates all 50 IDs in parallel with zero formula dragging.
              </p>
            </div>

            {/* Scenario 4 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-purple-300 text-base">Case 4: Reverse Bottom-to-Top Most Recent Log</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">Naihati Audit</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Abhronila Das</strong> fetches the most recent transaction entry for Swadeep Roy by searching backwards (<code className="text-purple-300 font-mono">search_mode = -1</code>):
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-purple-300 border border-slate-800">
                =XLOOKUP("Swadeep Roy", B2:B50, G2:G50, "No Records", 0, -1)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Retrieves the latest revenue voucher without sorting the table!
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
            <span className="text-sky-400">📋</span> 3-Step Procedure for Two-Way Matrix Lookups
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-cyan-950 text-cyan-400 font-bold flex items-center justify-center border border-cyan-800 shrink-0">1</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Construct Inner Column Vector Lookup</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Write <code className="text-cyan-300 font-mono">=XLOOKUP(BranchCell, BranchHeaders, PriceMatrix)</code> to verify that the target column vector is extracted.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center border border-emerald-800 shrink-0">2</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Wrap with Outer Row Value Lookup</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Nest the column vector inside the outer lookup: <code className="text-emerald-400 font-mono">=XLOOKUP(CourseCell, CourseRows, InnerLookup)</code>.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-indigo-950 text-indigo-400 font-bold flex items-center justify-center border border-indigo-800 shrink-0">3</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Supply the [if_not_found] Safety Fallback</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Add <code className="text-rose-300 font-mono">"Selection Not Available"</code> to handle invalid dropdown choices cleanly.
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
              <span className="text-rose-400">⚠️</span> Common XLOOKUP Pitfalls & Fixes
            </h2>
            <span className="text-xs text-rose-300 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800">
              Troubleshooting Guide
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Frequent Mistake</th>
                  <th className="pb-3 px-4">Error / Symptom</th>
                  <th className="pb-3 pl-4">Corrective Best Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Mismatched Array Dimensions</td>
                  <td className="py-3.5 px-4 text-rose-400 font-mono">#VALUE! Error</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Ensure <code className="text-sky-300 font-mono">lookup_array</code> and <code className="text-sky-300 font-mono">return_array</code> have the same number of rows/columns.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Horizontal #SPILL! Collision</td>
                  <td className="py-3.5 px-4 text-rose-400 font-mono">#SPILL! Error</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Clear all cells to the right of the formula origin cell.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">#N/A Displayed for Unmatched Key</td>
                  <td className="py-3.5 px-4 text-rose-400 font-mono">#N/A Error</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Supply the 4th argument: <code className="text-sky-300 font-mono">=XLOOKUP(..., ..., ..., "Not Found")</code>.</td>
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
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-xs">DYNAMIC RANGE</span>
                <span>Two-Way Colon Construction</span>
              </div>
              <p className="text-slate-300">
                Sum across dynamic monthly ranges: <code className="text-emerald-400 font-mono">=SUM(XLOOKUP("Jan", Months, Sales):XLOOKUP("Jun", Months, Sales))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-xs">CHOOSECOLS</span>
                <span>Extract Custom Sliced Columns</span>
              </div>
              <p className="text-slate-300">
                To extract only columns 1, 3, and 7: <code className="text-emerald-400 font-mono">=CHOOSECOLS(XLOOKUP(Key, Keys, FullMatrix), 1, 3, 7)</code>.
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
              <h3 className="font-bold text-teal-300 text-sm">Think About Why Nested XLOOKUP Beats INDEX/MATCH</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                In legacy Excel, <code className="text-slate-400 font-mono">=INDEX(Matrix, MATCH(Row, ...), MATCH(Col, ...))</code> required specifying index dimensions. Why is nested XLOOKUP inherently safer when columns are rearranged?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-sky-500">
              <h3 className="font-bold text-sky-300 text-sm">Observe How Multi-Key Vectorization Spills</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Notice that passing <code className="text-amber-300 font-mono">A2#</code> (an array of 20 IDs) into XLOOKUP causes it to calculate lookups for all 20 rows in parallel, producing a 20-row spilled output in a single cell!
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ (30 QUESTIONS VIA FAQTemplate)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Dynamic Two-Way & Spilled XLOOKUP FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "XLOOKUP is the undisputed king of lookup functions. In Barrackpore and Kolkata corporate ERP systems, use nested XLOOKUP for 2D price cards and pass multi-column return matrices to spill complete customer profiles in 1 single equation. It is faster, cleaner, and completely immune to column-insertion bugs!"
            }
          />
        </div>
      </div>
    </div>
  );
}
