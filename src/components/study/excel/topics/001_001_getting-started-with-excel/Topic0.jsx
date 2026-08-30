"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_001_getting_started_with_excel_master.xlsx?url";
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

  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "getting_started_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              📊 Excel Foundations · Topic 0
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 1 & 2: Remember & Understand
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            What Excel Is and Where It Is Used in Study and Work
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Understand Microsoft Excel's fundamental architecture, computational grid structure, and why it is the primary industry standard tool for accounting, data analysis, GST reconciliation, MIS reporting, and corporate decision making.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Grid Precision:</strong> 1,048,576 Rows × 16,384 Columns</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Calculation:</strong> Multi-Threaded Engine</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Industrial:</strong> Accounting & MIS Standard</span>
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
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">⚡</span>
            Formula Anatomy & Structure
          </h2>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            =CELL("address", A1)
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Component</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Workbook</td>
                  <td className="py-3 px-4 text-teal-400">Container (.xlsx)</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Required</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Top-level container file holding multiple sheets, styles, and calculation chains.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Worksheet</td>
                  <td className="py-3 px-4 text-teal-400">2D Matrix</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Required</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Grid made of 1,048,576 rows by 16,384 columns (17.17 billion cells).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Cell Coordinate</td>
                  <td className="py-3 px-4 text-teal-400">Address (A1)</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Required</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Intersection of column letter and row number storing data or dynamic formula.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Return Evaluation: </strong>
              Returns a <span className="text-sky-300 font-semibold">Grid Matrix / Calculated Scalar</span> directly to the active cell coordinates.
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">🔬</span>
            Deep Theoretical Mechanics & Grid Architecture
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>Excel organizes computational data in a structured 2D Cartesian grid. Each cell is uniquely addressed by its column header (A to XFD) and row index (1 to 1,048,576).</p>
            <p>The workbook container (.xlsx) uses the OpenXML compressed package architecture. When opened, Excel parses cell data into high-speed memory buffers for instant recalculation.</p>
            <p>The calculation engine distinguishes between constant values (literals, strings, timestamps) and active calculation dependencies (starting with '='). Dependent cells are registered into a dependency tree for multi-threaded background recalculation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">Memory Allocation Model</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Excel uses sparse array memory storage. Only cells with explicit data or formula entries consume RAM, keeping 1M-row sheets lightweight.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">Calculation Dependency Chain</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Formulas are compiled into a Directed Acyclic Graph (DAG). When an input cell changes, only its downstream dependents recalculate.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-base font-mono">📐</span>
            Visual Calculation Flow: Spreadsheet Computation &amp; Grid Memory Architecture
          </h2>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-x-auto">
            <svg viewBox="0 0 800 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="calcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="outGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Node 1: Grid Input */}
              <rect x="30" y="50" width="200" height="150" rx="12" fill="url(#gridGrad)" stroke="#38bdf8" strokeWidth="2" />
              <text x="130" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">1. Grid Architecture</text>
              <text x="130" y="115" textAnchor="middle" fill="#e0f2fe" fontSize="11">Rows: 1 to 1,048,576</text>
              <text x="130" y="135" textAnchor="middle" fill="#e0f2fe" fontSize="11">Columns: A to XFD (16,384)</text>
              <text x="130" y="165" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">Cell Address: A1, B2, C10</text>

              {/* Arrow 1 */}
              <path d="M 235 125 L 295 125" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="295,120 305,125 295,130" fill="#38bdf8" />

              {/* Node 2: Calculation Engine */}
              <rect x="310" y="50" width="200" height="150" rx="12" fill="url(#calcGrad)" stroke="#34d399" strokeWidth="2" />
              <text x="410" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">2. Calculation Engine</text>
              <text x="410" y="115" textAnchor="middle" fill="#d1fae5" fontSize="11">Lexical Parser & Formula Tree</text>
              <text x="410" y="135" textAnchor="middle" fill="#d1fae5" fontSize="11">Multi-Threaded Evaluation</text>
              <text x="410" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">DAG Dependency Chain</text>

              {/* Arrow 2 */}
              <path d="M 515 125 L 575 125" stroke="#34d399" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="575,120 585,125 575,130" fill="#34d399" />

              {/* Node 3: Result Rendering */}
              <rect x="590" y="50" width="180" height="150" rx="12" fill="url(#outGrad)" stroke="#a78bfa" strokeWidth="2" />
              <text x="680" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">3. Screen Render</text>
              <text x="680" y="115" textAnchor="middle" fill="#ede9fe" fontSize="11">Formatted Number / Currency</text>
              <text x="680" y="135" textAnchor="middle" fill="#ede9fe" fontSize="11">Instant KPI Display</text>
              <text x="680" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="11" fontWeight="bold">Dynamic Sheet Updates</text>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LIVE EXCEL PRACTICE GRID & DOWNLOAD PORTAL
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">📥</span>
                Interactive Spreadsheet & Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Interact with the dataset live below or download the master chapter workbook to practice locally in desktop Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download full .xlsx master workbook for Module 1.1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic0_What_Excel_is_and_"
            title="Module 1.1 - What Excel Is and Where It Is Used in Study and Work"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS (4+ CASES)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
            Real-World Business Scenarios (Bengal & Corporate Applications)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">01</span>
                <h3 className="text-base font-bold text-white">Coder &amp; AccoTax Barrackpore Academic Cohort Registry</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Instructor Sukanta Hui tracks diploma student performance and attendance across 35 enrolled students.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Student_ID</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Student_Name</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Department</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Attendance_%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Score</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Status</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">STD-1001</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Swadeep</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Software Engg</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">92%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">88</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=IF(E2&gt;=75,"Passed","Review")</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">STD-1002</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Tuhina</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Corporate Accounts</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">96%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">94</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=IF(E3&gt;=75,"Passed","Review")</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">STD-1003</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Abhronila</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Taxation &amp; GST</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">88%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">91</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=IF(E4&gt;=75,"Passed","Review")</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">STD-1004</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Susmita</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Data Analytics</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">94%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">86</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=IF(E5&gt;=75,"Passed","Review")</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: =AVERAGE(E2:E35)</div>
                <div className="text-emerald-400 font-semibold">Result: Class average score of 89.4 calculated instantly.</div>
                <div className="text-slate-400 text-[11px]">Grid coordinates enable automatic statistical aggregation across entire batches without manual calculator errors.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Multi-Counter Retail Supermarket Daily Reconciliation</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">A busy departmental store in Shyamnagar reconciles counter-wise cash, card, and UPI collections.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Counter_No</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Cash_Sales</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">UPI_Sales</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Card_Sales</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Total_Collection</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Counter-01</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">45,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">78,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">32,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(B2:D2)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Counter-02</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">38,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">62,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">29,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(B3:D3)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Counter-03</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">52,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">91,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">41,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(B4:D4)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: =SUM(E2:E4)</div>
                <div className="text-emerald-400 font-semibold">Result: INR 437,000 reconciled across all registers.</div>
                <div className="text-slate-400 text-[11px]">Formulas automatically reflect real-time updates as individual counter clerks enter closing balances.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Ichapur Engineering Works Machine Maintenance &amp; Oil Replacement Log</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">A factory in Ichapur logs CNC lathe running hours to trigger preventive servicing.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Machine_ID</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Machine_Type</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Operating_Hours</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Threshold_Hours</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Maintenance_Alert</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">MCH-101</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">CNC Lathe</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">480</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">500</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=IF(C2&gt;=D2,"DUE","OK")</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">MCH-102</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Hydraulic Press</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">520</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">500</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=IF(C3&gt;=D3,"DUE","OK")</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">MCH-103</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Milling Unit</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">505</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">500</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=IF(C4&gt;=D4,"DUE","OK")</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: =COUNTIF(E2:E25, "DUE")</div>
                <div className="text-emerald-400 font-semibold">Result: 3 machines flagged for urgent maintenance.</div>
                <div className="text-slate-400 text-[11px]">Automated logic eliminates equipment downtime through proactive preventative threshold alerting.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Kolkata Freight Logistics Fleet Diesel Mileage Audit</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">A transportation operator running trucks between Barrackpore and Kolkata Port audits fuel efficiency.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Vehicle_No</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Driver_Name</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">KM_Covered</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Diesel_Litres</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Mileage_KM_per_L</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">WB-24-1102</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Debangshu</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">1,450</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">210</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=C2/D2</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">WB-24-3389</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Rahul</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">1,820</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">255</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=C3/D3</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: =AVERAGE(E2:E15)</div>
                <div className="text-emerald-400 font-semibold">Result: 6.98 KM/L fleet average economy verified.</div>
                <div className="text-slate-400 text-[11px]">Division arithmetic inside cells provides instant operational cost metrics for management.</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">🪜</span>
            Step-by-Step Practical Implementation Guide
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <h3 className="text-sm font-bold text-white">Data Entry & Coordinate Setup</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Enter student/customer raw transaction values into clean column headers starting at cell A1. Ensure numbers contain no rogue text spaces.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <h3 className="text-sm font-bold text-white">Engage Calculation Engine</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Type <code className="text-sky-300 font-mono">=</code> followed by the target formula (e.g. <code className="text-amber-300 font-mono">=SUM(B2:D2)</code>). Observe syntax tooltips.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <h3 className="text-sm font-bold text-white">Autofill & Relative Drag</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Double-click the fill handle at the bottom-right corner of the active cell to copy the formula down the entire dataset column.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <h3 className="text-sm font-bold text-white">Audit & Reconcile Totals</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Ctrl + `</kbd> to inspect all formula definitions and verify aggregate consistency.
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
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 text-base font-mono">⚠️</span>
            Common Pitfalls & Diagnostic Troubleshooting
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Error / Symptom</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Check</th>
                  <th className="py-3 px-4">Foolproof Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Formula Treated as Text</td>
                  <td className="py-3 px-4 text-slate-300">Cell format was set to 'Text' prior to typing the formula, or a leading space exists before '='.</td>
                  <td className="py-3 px-4 text-amber-300">Cell shows '=SUM(A1:B1)' as literal text.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Set number format to General (Ctrl+Shift+~), press F2, then press Enter.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">#VALUE! Error</td>
                  <td className="py-3 px-4 text-slate-300">Performing math operators (+, -, *) on text strings or labels.</td>
                  <td className="py-3 px-4 text-amber-300">Cell displays #VALUE! when summing cells containing letters or spaces.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Use =SUM() function which ignores text, or clean inputs with =VALUE().</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Circular Reference</td>
                  <td className="py-3 px-4 text-slate-300">Formula includes its own cell coordinate in its calculation range.</td>
                  <td className="py-3 px-4 text-amber-300">Excel displays circular reference warning dialog and status bar shows circular cell.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Adjust calculation range to exclude the formula's own address.</td>
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
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-base font-mono">💡</span>
            Classroom Pro Tips & High-Speed Shortcuts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + `
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Toggle formula view across the entire worksheet to inspect underlying equations.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                F2
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Enter cell edit mode directly with cursor at end of text.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + =
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Instantly insert intelligent AutoSum formula for adjacent rows/columns.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Home
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Jump directly to the top-left origin cell (A1).</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS ("THINK ABOUT...")
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">🤔</span>
            Socratic Analytical Hints ("Think About...")
          </h2>

          <div className="space-y-3">
            
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why does Excel store dates as sequential integers (1 = Jan 1, 1900) instead of plain text?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">What is the mathematical difference between entering =SUM(A1:A5) vs =A1+A2+A3+A4+A5 when cell A3 contains a text string?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does the used range in memory affect spreadsheet performance and file size?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="What Excel Is and Where It Is Used in Study and Work - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Remember: Spreadsheet structure is the foundation of data integrity. Always design your workbooks with clean separation between Raw Inputs, Calculation Models, and Presentation Reports. Never hardcode static numbers directly inside computational formulas!"
          />
        </div>
      </div>
    </div>
  );
}
