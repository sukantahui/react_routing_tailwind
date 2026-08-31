"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_001_modern_lookup_and_dynamic_array_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic12_files/topic12_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic12() {
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
              🚀 Flagship Project · Topic 12
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Live Search Portal Engine
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300 text-xs font-semibold">
              100% Zero VBA Code
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
            Real-World Project: Building an Automated Live Search and Filter Table Without VBA
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Synthesize all dynamic array principles into a complete, enterprise-grade transaction search portal. 
            Connect live text keyword search, multi-branch dropdown filters with an <strong className="text-emerald-300">"All"</strong> option, 
            and sorting order toggles into a unified master <code className="text-amber-300 font-mono">LET()</code> engine. 
            Enjoy sub-15ms recalculation speed, live KPI counter banners, and complete freedom from macro security blocks.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Live Multi-Control UI:</strong> Keyword + Branch + Sort Toggle</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Zero VBA Security Blocks:</strong> 100% cloud & mobile ready</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Reactive KPI Cards:</strong> Live row counts and revenue totals</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: MASTER FORMULA ANATOMY & UI BLUEPRINT
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-sky-400">⚡</span> Master Portal Formula Anatomy
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Engine: LET + FILTER + SORT + SEARCH
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-sky-300 space-y-2">
            <span className="text-slate-500">// Complete Unified Search Engine Formula (Placed in Cell A6):</span>
            <pre className="text-slate-200 overflow-x-auto">
{`=LET(
  raw, Table1[#Data],
  filtered, FILTER(raw,
    ((J1="") + ISNUMBER(SEARCH(J1, Table1[Sales_Officer])) + ISNUMBER(SEARCH(J1, Table1[Course_Program]))) *
    ((J2="All") + (Table1[Branch_Office]=J2)),
    "No Matching Invoices Found"
  ),
  IF(ISARRAY(filtered), SORT(filtered, 7, IF(J3="Highest First", -1, 1)), filtered)
)`}
            </pre>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Control Cell</th>
                  <th className="pb-3 px-4">Control Type</th>
                  <th className="pb-3 pl-4">Operational Responsibility in Formula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="py-3 pr-4 text-amber-300 font-bold">Cell J1</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Free-Text Keyword Box</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Wildcard search across Sales Officer & Course Program (<code className="text-emerald-300 font-mono">SEARCH</code>).</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sky-300 font-bold">Cell J2</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Branch Dropdown (with "All")</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Filters designated branch or bypasses filter when "All" is selected.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-purple-300 font-bold">Cell J3</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Sort Order Dropdown</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Toggles revenue sorting between Highest First (<code className="text-emerald-300 font-mono">-1</code>) and Lowest First (<code className="text-sky-300 font-mono">1</code>).</td>
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
            <span className="text-sky-400">🔬</span> Project Architectural Mechanics: Why It Never Breaks
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              Traditional search tools in Excel relied on VBA userforms or macro event listeners (<code className="text-slate-400 font-mono">Private Sub Worksheet_Change</code>). 
              These tools frequently broke when users enabled filters, crashed on Mac and mobile devices, and were flagged by antivirus firewalls.
            </p>
            <p>
              Our modern dynamic array search engine is 100% declarative:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-200">
              <li><strong>Zero Macro Warnings:</strong> Stored in standard <code className="text-emerald-300 font-mono">.xlsx</code> workbooks, guaranteeing cloud compatibility on Excel for the Web and iPad.</li>
              <li><strong>Sub-15ms Recalculation:</strong> Leveraging vectorized boolean multiplication <code className="text-amber-300 font-mono">(A) * (B)</code> in memory.</li>
              <li><strong>Dynamic Boundary Protection:</strong> Placing control cells in rows 1 to 4 and starting the spill formula in row 6 provides an open, collision-free downward path.</li>
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
              <span className="text-teal-400">📐</span> Complete Search Portal Architecture Map
            </h2>
            <span className="text-xs text-teal-300 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800">
              End-to-End Pipeline
            </span>
          </div>

          <p className="text-sm text-slate-300">
            Visualizing the data flow: User Controls → LET Engine → Spilled Grid & KPI Banners.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-center items-center overflow-x-auto">
            <svg className="w-full max-w-2xl h-auto" viewBox="0 0 760 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="gridPattern13" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="760" height="280" fill="url(#gridPattern13)" rx="16" />

              {/* UI Control Panel */}
              <g transform="translate(30, 20)">
                <rect x="0" y="0" width="220" height="240" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <rect x="8" y="8" width="204" height="26" rx="6" fill="#0c4a6e" />
                <text x="110" y="25" fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">1. User Control Panel</text>

                <rect x="15" y="42" width="190" height="48" rx="6" fill="#1e293b" />
                <text x="25" y="58" fill="#94a3b8" fontSize="9">Keyword Search (J1):</text>
                <text x="25" y="78" fill="#38bdf8" fontSize="12" fontWeight="bold">"Python"</text>

                <rect x="15" y="98" width="190" height="48" rx="6" fill="#1e293b" />
                <text x="25" y="114" fill="#94a3b8" fontSize="9">Branch Filter (J2):</text>
                <text x="25" y="134" fill="#34d399" fontSize="12" fontWeight="bold">"Barrackpore"</text>

                <rect x="15" y="154" width="190" height="48" rx="6" fill="#1e293b" />
                <text x="25" y="170" fill="#94a3b8" fontSize="9">Sort Order (J3):</text>
                <text x="25" y="190" fill="#f59e0b" fontSize="12" fontWeight="bold">"Highest First"</text>
              </g>

              {/* Arrow */}
              <g stroke="#38bdf8" strokeWidth="2" fill="none" strokeDasharray="3 3">
                <path d="M 260 140 L 300 140" />
              </g>

              {/* LET Processing Engine */}
              <g transform="translate(310, 20)">
                <rect x="0" y="0" width="200" height="240" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <rect x="8" y="8" width="184" height="26" rx="6" fill="#312e81" />
                <text x="100" y="25" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">2. Master LET Engine</text>

                <rect x="15" y="45" width="170" height="40" rx="4" fill="#4338ca" />
                <text x="100" y="62" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">SEARCH Wildcard</text>
                <text x="100" y="76" fill="#c7d2fe" fontSize="8" textAnchor="middle">Matches Officer / Course</text>

                <rect x="15" y="95" width="170" height="40" rx="4" fill="#4338ca" />
                <text x="100" y="112" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Boolean Multiplier</text>
                <text x="100" y="126" fill="#c7d2fe" fontSize="8" textAnchor="middle">AND Logic with Branch</text>

                <rect x="15" y="145" width="170" height="40" rx="4" fill="#4338ca" />
                <text x="100" y="162" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Dynamic SORT</text>
                <text x="100" y="176" fill="#c7d2fe" fontSize="8" textAnchor="middle">Orders by Gross Revenue</text>

                <text x="100" y="215" fill="#a5b4fc" fontSize="9" textAnchor="middle">Calculates in < 15ms</text>
              </g>

              {/* Arrow */}
              <g stroke="#34d399" strokeWidth="2" fill="none" strokeDasharray="3 3">
                <path d="M 520 140 L 550 140" />
              </g>

              {/* Presentation Layer */}
              <g transform="translate(560, 20)">
                <rect x="0" y="0" width="170" height="240" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <rect x="8" y="8" width="154" height="26" rx="6" fill="#047857" />
                <text x="85" y="25" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">3. Presentation UI</text>

                <rect x="12" y="45" width="146" height="50" rx="4" fill="#022c22" stroke="#34d399" strokeWidth="1" />
                <text x="85" y="65" fill="#6ee7b7" fontSize="8" textAnchor="middle">KPI Count:</text>
                <text x="85" y="84" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2 Invoices</text>

                <rect x="12" y="105" width="146" height="50" rx="4" fill="#022c22" stroke="#34d399" strokeWidth="1" />
                <text x="85" y="125" fill="#6ee7b7" fontSize="8" textAnchor="middle">Total Revenue:</text>
                <text x="85" y="144" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">₹1,80,000</text>

                <rect x="12" y="165" width="146" height="60" rx="4" fill="#059669" />
                <text x="85" y="188" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Spilled Output (A6#)</text>
                <text x="85" y="208" fill="#e2e8f0" fontSize="8" textAnchor="middle">Auto-Formatted Grid</text>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet: Project Master Register
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the project invoice dataset below or download the practice workbook to test the live search portal in Microsoft Excel.
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
              sheetName="EX1613"
              title="Enterprise Billing & Invoice Search Register"
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
            <span className="text-amber-400">🏢</span> Real-World Enterprise Portal Applications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sky-300 text-base">Case 1: Live Keyword Search on Invoices</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">Barrackpore Helpdesk</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Swadeep Roy</strong> types "Python" into search box <code className="text-amber-300 font-mono">J1</code>. The portal instantly filters to all Python invoices across branches.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-sky-300 border border-slate-800">
                Formula: (J1="") + ISNUMBER(SEARCH(J1, Table1[Course_Program]))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Filters 6 transactions in < 10ms with zero manual clicking!
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-emerald-300 text-base">Case 2: Branch Filter with "All" Option</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Shyamnagar Regional Hub</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Tuhina Mukherjee</strong> selects "Shyamnagar" in dropdown <code className="text-amber-300 font-mono">J2</code>, then toggles back to "All".
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400 border border-slate-800">
                Formula: (J2="All") + (Table1[Branch_Office]=J2)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Seamlessly displays regional invoices or restores the full 20-row master register.
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-indigo-300 text-base">Case 3: Interactive Sorting Toggle</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">Ichapur Accounts Office</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita Saha</strong> flips dropdown <code className="text-amber-300 font-mono">J3</code> to "Lowest First" to audit micro-transactions:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-indigo-300 border border-slate-800">
                Formula: SORT(filtered, 7, IF(J3="Highest First", -1, 1))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Instantly inverts transaction ranking from lowest revenue (₹18,000) upward.
              </p>
            </div>

            {/* Scenario 4 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-purple-300 text-base">Case 4: Dynamic Revenue & Count KPI Cards</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">Naihati Management</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Abhronila Das</strong> connects executive summary cards directly to the search table in cell <code className="text-amber-300 font-mono">A6#</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-purple-300 border border-slate-800">
                Count: =ROWS(A6#) | Revenue: =SUM(CHOOSECOLS(A6#, 7))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Summary numbers recalculate live with every keystroke typed into search!
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
            <span className="text-sky-400">📋</span> 3-Step Assembly Blueprint
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-sky-950 text-sky-400 font-bold flex items-center justify-center border border-sky-800 shrink-0">1</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Build the UI Control Block (Rows 1 to 3)</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Place Search Keyword Box in <code className="text-amber-300 font-mono">J1</code>, Branch Dropdown in <code className="text-amber-300 font-mono">J2</code> (with "All"), and Sort Toggle in <code className="text-amber-300 font-mono">J3</code>.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center border border-emerald-800 shrink-0">2</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Place Master LET Formula in Cell A6</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Enter the unified formula in cell <code className="text-emerald-400 font-mono">A6</code>, leaving all rows below row 6 completely unobstructed.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-purple-950 text-purple-400 font-bold flex items-center justify-center border border-purple-800 shrink-0">3</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Connect Executive KPI Banners</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  In top summary cards, bind <code className="text-sky-300 font-mono">=ROWS(A6#)</code> and <code className="text-emerald-400 font-mono">=SUM(CHOOSECOLS(A6#, 7))</code> to complete the application!
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
              <span className="text-rose-400">⚠️</span> Project Diagnostic Troubleshooting Matrix
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
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">#SPILL! Error in Cell A6</td>
                  <td className="py-3.5 px-4 text-slate-300">Cells below row 6 contain old formulas or merged summary blocks.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Clear all rows below row 6 in columns A to I.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">#VALUE! Error When Sorting Fallback</td>
                  <td className="py-3.5 px-4 text-slate-300">Attempted to SORT the string "No Matching Invoices Found".</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Use <code className="text-sky-300 font-mono">IF(ISARRAY(filtered), SORT(filtered, ...), filtered)</code>.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Search Ignores Single-Character Inputs</td>
                  <td className="py-3.5 px-4 text-slate-300">Used EXACT instead of SEARCH.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Always use <code className="text-sky-300 font-mono">ISNUMBER(SEARCH(J1, Col))</code> for substring matching.</td>
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
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-xs">CONDITIONAL</span>
                <span>Highlight Top 3 Invoices</span>
              </div>
              <p className="text-slate-300">
                Apply Conditional Formatting to the revenue column: <code className="text-emerald-400 font-mono">=$G6 >= LARGE($G$6#, 3)</code> to highlight top transactions dynamically!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-xs">CHOOSECOLS</span>
                <span>Display Sliced Dashboard View</span>
              </div>
              <p className="text-slate-300">
                To output only Invoice ID, Officer Name, and Gross Total: <code className="text-emerald-400 font-mono">=CHOOSECOLS(MasterFormula, 1, 2, 7)</code>.
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
              <h3 className="font-bold text-teal-300 text-sm">Think About Why ISARRAY() is Critical</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                When zero matches are found, FILTER returns a 1×1 text string <code className="text-slate-400 font-mono">"No Matching Invoices Found"</code>. Attempting to sort a 1×1 scalar on column 7 triggers <code className="text-rose-400 font-mono">#VALUE!</code>. Why does <code className="text-emerald-400 font-mono">IF(ISARRAY(filtered), SORT(...), filtered)</code> protect your application?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-sky-500">
              <h3 className="font-bold text-sky-300 text-sm">Observe How Zero-VBA Portals Scale</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Notice that because all logic is contained in a single dynamic array formula, the workbook can be emailed to clients in Barrackpore or uploaded to SharePoint without any macro security warnings!
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ (30 QUESTIONS VIA FAQTemplate)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Real-World Live Search Portal Project FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "This live search portal project is the pinnacle of modern formula-driven spreadsheet engineering in Barrackpore and Kolkata. Build your dashboards with zero VBA macros using LET, FILTER, and SORT. Your corporate clients will love the lightning-fast responsiveness, bulletproof reliability, and seamless cloud compatibility!"
            }
          />
        </div>
      </div>
    </div>
  );
}
