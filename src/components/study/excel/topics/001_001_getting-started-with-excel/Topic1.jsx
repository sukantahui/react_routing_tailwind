"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_001_getting_started_with_excel_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic1() {
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
              📊 Excel Foundations · Topic 1
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 & 4: Understand & Analyze
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Excel vs Google Sheets vs Other Modern Spreadsheet Engines: Architectural Feature Comparison
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Deep technical comparison between Microsoft Excel 365, Google Sheets, LibreOffice Calc, and modern database-backed spreadsheet engines. Learn grid capacities, calculation multi-threading, Power Query ETL, DAX modeling, and corporate suitability.
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
            =IF(engine="Excel", "Desktop Powerhouse", "Cloud Collaborative")
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Capacity</td>
                  <td className="py-3 px-4 text-teal-400">Row/Col Limit</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Mandatory</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Excel supports 1,048,576 rows by 16,384 columns per sheet vs Google Sheets 10M total cell limit.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Engine</td>
                  <td className="py-3 px-4 text-teal-400">Compute Subsystem</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Mandatory</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Multi-threaded native desktop C++ execution vs browser-based JavaScript virtual machine.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">ETL &amp; Modeling</td>
                  <td className="py-3 px-4 text-teal-400">Power Pivot / Query</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Mandatory</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Built-in Power Query (M) and Power Pivot (DAX) star schema dimensional modeling.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Return Evaluation: </strong>
              Returns a <span className="text-sky-300 font-semibold">Categorical Comparison Matrix</span> directly to the active cell coordinates.
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
            <p>Microsoft Excel operates on an optimized native desktop C++ calculation engine with multi-core multi-threading support (up to 64 physical cores).</p>
            <p>Google Sheets executes in a cloud sandbox using JavaScript V8 engines, prioritizing simultaneous real-time multi-user collaboration over raw million-row dataset processing.</p>
            <p>For financial modeling, regulatory taxation, and large corporate auditing, Excel 365's combination of 64-bit memory addressing, Power Query, and native Python makes it the definitive enterprise platform.</p>
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
            Visual Calculation Flow: Desktop Native vs Cloud Spreadsheet Architecture
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
            sheetName="Topic1"
            title="Module 1.1 - Excel vs Google Sheets vs Other Modern Spreadsheet Engines: Architectural Feature Comparison"
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
                20 Real-World Business Scenarios: Excel Interface &amp; Navigation Operations
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                20 practical workplace scenarios detailing Title Bar, Ribbon, QAT, Name Box, Formula Bar, and Status Bar efficiency.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/80 px-3 py-1.5 rounded-full border border-amber-800 shrink-0 font-bold">
              20 Real-World Examples
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                  <th className="py-3 px-3 w-16">ID</th>
                  <th className="py-3 px-3">Business Application</th>
                  <th className="py-3 px-3">Interface Element Used</th>
                  <th className="py-3 px-3">Applied Action / Shortcut</th>
                  <th className="py-3 px-3">Resulting UI State</th>
                  <th className="py-3 px-3">Key Design &amp; Efficiency Benefit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-101</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kolkata Corporate Financial Model Audit</td>
                  <td className="py-2.5 px-3 text-sky-300">Title Bar &amp; AutoSave</td>
                  <td className="py-2.5 px-3 text-amber-300">Toggle AutoSave (OneDrive)</td>
                  <td className="py-2.5 px-3 text-emerald-400">AutoSave: ON</td>
                  <td className="py-2.5 px-3 text-slate-300">Prevents data loss during sudden power outages.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-102</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Barrackpore Data Entry Screen Real Estate</td>
                  <td className="py-2.5 px-3 text-sky-300">Ribbon Display Mode</td>
                  <td className="py-2.5 px-3 text-amber-300">Press Ctrl + F1</td>
                  <td className="py-2.5 px-3 text-emerald-400">Ribbon Collapsed</td>
                  <td className="py-2.5 px-3 text-slate-300">Gains 4 extra visible data rows on laptop screens.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-103</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Shyamnagar Supermarket Daily Reconciliation</td>
                  <td className="py-2.5 px-3 text-sky-300">Quick Access Toolbar (QAT)</td>
                  <td className="py-2.5 px-3 text-amber-300">Add Freeze Panes &amp; Filter to QAT</td>
                  <td className="py-2.5 px-3 text-emerald-400">1-Click Access Icons</td>
                  <td className="py-2.5 px-3 text-slate-300">Bypasses deep ribbon tab searching.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-104</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Salt Lake SaaS Multi-Tab Financial Jump</td>
                  <td className="py-2.5 px-3 text-sky-300">Name Box Navigation</td>
                  <td className="py-2.5 px-3 text-amber-300">Type `TOTAL_ARR` in Name Box</td>
                  <td className="py-2.5 px-3 text-emerald-400">Jumps to Sheet3!E150</td>
                  <td className="py-2.5 px-3 text-slate-300">Instant navigation across 50,000-cell workbooks.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-105</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Ichapur Plant Complex Nested IF Debugging</td>
                  <td className="py-2.5 px-3 text-sky-300">Formula Bar Expansion</td>
                  <td className="py-2.5 px-3 text-amber-300">Press Ctrl + Shift + U</td>
                  <td className="py-2.5 px-3 text-emerald-400">Formula Bar 5-Lines Tall</td>
                  <td className="py-2.5 px-3 text-slate-300">Exposes entire multi-line logic without truncation.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-106</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Titagarh Jute Mill Quick Cash Audit</td>
                  <td className="py-2.5 px-3 text-sky-300">Status Bar Auto-Calculate</td>
                  <td className="py-2.5 px-3 text-amber-300">Highlight Range E4:E50</td>
                  <td className="py-2.5 px-3 text-emerald-400">Sum: ₹4.8L, Avg: ₹10K</td>
                  <td className="py-2.5 px-3 text-slate-300">Instant validation without writing `=SUM()` formulas.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-107</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Naihati Pharmacy Departmental Tabs</td>
                  <td className="py-2.5 px-3 text-sky-300">Sheet Tab Color Coding</td>
                  <td className="py-2.5 px-3 text-amber-300">Alt + H + O + T (Tab Color)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Red (Sales), Blue (Tax)</td>
                  <td className="py-2.5 px-3 text-slate-300">Visual demarcation of functional workbook areas.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-108</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Sodepur Retail Coordinate Alignment</td>
                  <td className="py-2.5 px-3 text-sky-300">Name Box Active Indicator</td>
                  <td className="py-2.5 px-3 text-amber-300">Select Cell D45</td>
                  <td className="py-2.5 px-3 text-emerald-400">Displays `D45`</td>
                  <td className="py-2.5 px-3 text-slate-300">Ensures accurate cell referencing in formulas.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-109</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Howrah Freight Keyboard Access Mode</td>
                  <td className="py-2.5 px-3 text-sky-300">Ribbon KeyTips Engine</td>
                  <td className="py-2.5 px-3 text-amber-300">Press Alt Key</td>
                  <td className="py-2.5 px-3 text-emerald-400">Letters H, N, P Overlay</td>
                  <td className="py-2.5 px-3 text-slate-300">Mouseless ribbon command execution.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-110</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Durgapur Steel Formula Tooltip Check</td>
                  <td className="py-2.5 px-3 text-sky-300">Formula Bar Function ScreenTip</td>
                  <td className="py-2.5 px-3 text-amber-300">Type `=XLOOKUP(`</td>
                  <td className="py-2.5 px-3 text-emerald-400">Shows lookup_value hint</td>
                  <td className="py-2.5 px-3 text-slate-300">Guides argument entry to prevent syntax errors.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-111</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Asansol Energy Grid Row Dragging</td>
                  <td className="py-2.5 px-3 text-sky-300">Vertical Scrollbar Thumb</td>
                  <td className="py-2.5 px-3 text-amber-300">Drag scroll thumb to Row 5,000</td>
                  <td className="py-2.5 px-3 text-emerald-400">Row 5000 Visible</td>
                  <td className="py-2.5 px-3 text-slate-300">Rapid vertical navigation in large logs.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-112</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Siliguri Tea Estate QAT Below Ribbon</td>
                  <td className="py-2.5 px-3 text-sky-300">QAT Position Toggle</td>
                  <td className="py-2.5 px-3 text-amber-300">Show QAT Below Ribbon</td>
                  <td className="py-2.5 px-3 text-emerald-400">QAT Below Tabs</td>
                  <td className="py-2.5 px-3 text-slate-300">Places favorite tools closer to grid cells.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-113</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Haldia Port 30-Tab Navigation</td>
                  <td className="py-2.5 px-3 text-sky-300">Sheet Tab Scroll Buttons</td>
                  <td className="py-2.5 px-3 text-amber-300">Right-click Tab Scroll Arrows</td>
                  <td className="py-2.5 px-3 text-emerald-400">All-Sheets Popup List</td>
                  <td className="py-2.5 px-3 text-slate-300">Lists all worksheet tabs in a searchable menu.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-114</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Malda Mango Boardroom Presentation</td>
                  <td className="py-2.5 px-3 text-sky-300">Status Bar Zoom Control</td>
                  <td className="py-2.5 px-3 text-amber-300">Set Zoom to 140%</td>
                  <td className="py-2.5 px-3 text-emerald-400">Enlarged Grid Text</td>
                  <td className="py-2.5 px-3 text-slate-300">Enhances visibility on overhead projectors.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-115</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Midnapore Hospital Pivot Tooling</td>
                  <td className="py-2.5 px-3 text-sky-300">Contextual Ribbon Tab</td>
                  <td className="py-2.5 px-3 text-amber-300">Select PivotTable Cell</td>
                  <td className="py-2.5 px-3 text-emerald-400">PivotTable Analyze Tab</td>
                  <td className="py-2.5 px-3 text-slate-300">Dynamically exposes specialized object controls.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-116</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kharagpur Library Font Customization</td>
                  <td className="py-2.5 px-3 text-sky-300">Dialog Box Launcher</td>
                  <td className="py-2.5 px-3 text-amber-300">Click Font Group Arrow</td>
                  <td className="py-2.5 px-3 text-emerald-400">Format Cells Popup</td>
                  <td className="py-2.5 px-3 text-slate-300">Accesses detailed formatting properties.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-117</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Hooghly Jute Print Setup Audit</td>
                  <td className="py-2.5 px-3 text-sky-300">View Mode Buttons</td>
                  <td className="py-2.5 px-3 text-amber-300">Click Page Break Preview</td>
                  <td className="py-2.5 px-3 text-emerald-400">Blue Page Margins Shown</td>
                  <td className="py-2.5 px-3 text-slate-300">Verifies print pagination boundaries.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-118</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Burdwan Seed Grant Named Range</td>
                  <td className="py-2.5 px-3 text-sky-300">Name Box Creation</td>
                  <td className="py-2.5 px-3 text-amber-300">Select C2:C50 → Type `RICE_DATA`</td>
                  <td className="py-2.5 px-3 text-emerald-400">Range Named `RICE_DATA`</td>
                  <td className="py-2.5 px-3 text-slate-300">Simplifies formula syntax readability.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-119</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Purulia Solar Grant Cancel Input</td>
                  <td className="py-2.5 px-3 text-sky-300">Formula Bar Cancel Button (X)</td>
                  <td className="py-2.5 px-3 text-amber-300">Click Red X in Formula Bar</td>
                  <td className="py-2.5 px-3 text-emerald-400">Edit Cancelled</td>
                  <td className="py-2.5 px-3 text-slate-300">Restores previous cell state cleanly.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">UI-120</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Bankura Craft Executive Full Screen</td>
                  <td className="py-2.5 px-3 text-sky-300">Full Screen Mode</td>
                  <td className="py-2.5 px-3 text-amber-300">Click Ribbon Options → Auto-Hide</td>
                  <td className="py-2.5 px-3 text-emerald-400">100% Grid Screen Area</td>
                  <td className="py-2.5 px-3 text-slate-300">Maximizes workspace for executive dashboards.</td>
                </tr>
              </tbody>
            </table>
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Browser Tab Crash</td>
                  <td className="py-3 px-4 text-slate-300">Opening 200,000+ row datasets in cloud-only spreadsheet tools.</td>
                  <td className="py-3 px-4 text-amber-300">Web browser displays 'Out of Memory' or freezes.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Migrate large datasets to Microsoft Excel 64-bit desktop edition.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">VBA Incompatibility in Cloud</td>
                  <td className="py-3 px-4 text-slate-300">Attempting to run .xlsm VBA macros inside Google Sheets or browser Excel.</td>
                  <td className="py-3 px-4 text-amber-300">Macros do not trigger or show script error.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Run VBA models in desktop Excel, or convert automation to modern TypeScript Office Scripts.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Formula Syntax Differences</td>
                  <td className="py-3 px-4 text-slate-300">Using Excel-specific dynamic array functions in legacy spreadsheet tools.</td>
                  <td className="py-3 px-4 text-amber-300">Legacy tool displays #NAME? error.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Verify recipient software version before using Excel 365 formulas.</td>
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
                Alt + F11
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Open the Visual Basic for Applications (VBA) macro development environment in Excel.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Alt + F9
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Force full rebuild and recalculation of all formulas in all open workbooks.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + A + P + N
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Open the Power Query Get Data dialog for high-speed automated ETL.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Shift + F9
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Recalculate only the currently active worksheet.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is multi-threading in spreadsheet calculation critical for Monte Carlo financial simulations?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">When is a relational database (SQL) preferred over a spreadsheet, and how does Excel bridge both via Power Query?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does Excel 64-bit eliminate the 2GB virtual memory barrier of legacy 32-bit software?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Excel vs Google Sheets vs Other Modern Spreadsheet Engines: Architectural Feature Comparison - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="In corporate finance and data analytics, never compromise on computing power. Use Excel 365 64-bit desktop for mission-critical financial models, while leveraging cloud co-authoring when quick team input is required."
          />
        </div>
      </div>
    </div>
  );
}
