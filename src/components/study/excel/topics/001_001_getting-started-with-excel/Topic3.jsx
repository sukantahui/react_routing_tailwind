"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_001_getting_started_with_excel_master.xlsx?url";
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
              📊 Excel Foundations · Topic 3
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 1 & 2: Remember & Understand
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Understanding Workbooks, Worksheets, Rows, Columns and Grid Coordinate Limits
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Explore the physical boundary constraints of Microsoft Excel: 1,048,576 rows by 16,384 columns (XFD), 17.17 billion cells per worksheet, workbook XML container parts, worksheet naming rules, and memory consumption dynamics.
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
            =ROWS(A1:A1048576)
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Max Rows</td>
                  <td className="py-3 px-4 text-teal-400">Grid Bound</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">2^20</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">1,048,576 rows per worksheet (Row index 1 to 1048576).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Max Columns</td>
                  <td className="py-3 px-4 text-teal-400">Grid Bound</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">2^14</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">16,384 columns per worksheet (Column A to XFD).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Max Characters / Cell</td>
                  <td className="py-3 px-4 text-teal-400">Buffer Limit</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">32,767 chars</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Maximum length of text stored in a single cell (1,024 displayed in formula bar).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Return Evaluation: </strong>
              Returns a <span className="text-sky-300 font-semibold">Numerical Dimension / Grid Coordinates</span> directly to the active cell coordinates.
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
            <p>Each Excel worksheet is a fixed 2D grid matrix consisting of exactly 2^20 (1,048,576) rows and 2^14 (16,384) columns.</p>
            <p>Worksheet tab names are limited to 31 characters and cannot contain forbidden characters: \ / ? * [ ] :.</p>
            <p>Excel uses the 'Used Range' concept in memory. If a user enters data in A1 and formats cell Z10000, Excel allocates memory for the entire rectangular boundary (A1:Z10000), increasing file size.</p>
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
            Visual Calculation Flow: Excel 2D Cartesian Coordinate Grid &amp; Boundary Limits
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
            sheetName="Topic3"
            title="Module 1.1 - Understanding Workbooks, Worksheets, Rows, Columns and Grid Coordinate Limits"
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
                20 Real-World Business Scenarios: Cell Referencing &amp; Grid Navigation
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                20 practical workplace scenarios detailing absolute/relative references, mouse cursor modes, keyboard jump shortcuts, and range pointers.
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
                  <th className="py-3 px-3">Reference / Cursor Mode</th>
                  <th className="py-3 px-3">Applied Syntax / Keyboard Action</th>
                  <th className="py-3 px-3">Calculated Output</th>
                  <th className="py-3 px-3">Key Structural Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-101</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kolkata CA Tax Commission Lock</td>
                  <td className="py-2.5 px-3 text-sky-300">Absolute Cell Reference</td>
                  <td className="py-2.5 px-3 text-amber-300">`=B2*$C$1` (C1 = 18% GST)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Locked to C1</td>
                  <td className="py-2.5 px-3 text-slate-300">Prevents tax rate cell drift when dragging formula down.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-102</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Barrackpore Payroll Line Multiplication</td>
                  <td className="py-2.5 px-3 text-sky-300">Relative Cell Reference</td>
                  <td className="py-2.5 px-3 text-amber-300">`=B2*C2` (Hours * Rate)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Shifted to B3*C3</td>
                  <td className="py-2.5 px-3 text-slate-300">Automatically adjusts row index relative to position.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-103</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Shyamnagar Supermarket Pricing Matrix</td>
                  <td className="py-2.5 px-3 text-sky-300">Mixed Column-Fixed Reference</td>
                  <td className="py-2.5 px-3 text-amber-300">`=$A2*B$1`</td>
                  <td className="py-2.5 px-3 text-emerald-400">Grid Product Matrix</td>
                  <td className="py-2.5 px-3 text-slate-300">Locks base product price column while allowing tier rates.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-104</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Salt Lake SaaS Discount Schedule</td>
                  <td className="py-2.5 px-3 text-sky-300">Mixed Row-Fixed Reference</td>
                  <td className="py-2.5 px-3 text-amber-300">`=B2*(1-B$1)`</td>
                  <td className="py-2.5 px-3 text-emerald-400">Locked to Row 1</td>
                  <td className="py-2.5 px-3 text-slate-300">Locks tier discount header row across multiple columns.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-105</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Ichapur Plant Weekly Revenue Sum</td>
                  <td className="py-2.5 px-3 text-sky-300">Contiguous Range Reference</td>
                  <td className="py-2.5 px-3 text-amber-300">`=SUM(C2:C50)`</td>
                  <td className="py-2.5 px-3 text-emerald-400">Range Total</td>
                  <td className="py-2.5 px-3 text-slate-300">Aggregates continuous vertical numeric array.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-106</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Titagarh Mill Non-Adjacent Accounts</td>
                  <td className="py-2.5 px-3 text-sky-300">Non-Contiguous Multi-Range</td>
                  <td className="py-2.5 px-3 text-amber-300">`=SUM(B2:B10, E2:E10)`</td>
                  <td className="py-2.5 px-3 text-emerald-400">Combined Total</td>
                  <td className="py-2.5 px-3 text-slate-300">Sums isolated blocks skipping intermediate columns.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-107</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Naihati Dynamic Invoice Totaling</td>
                  <td className="py-2.5 px-3 text-sky-300">Entire Column Reference</td>
                  <td className="py-2.5 px-3 text-amber-300">`=SUM(D:D)`</td>
                  <td className="py-2.5 px-3 text-emerald-400">Entire Col Sum</td>
                  <td className="py-2.5 px-3 text-slate-300">Automatically captures newly added rows at the bottom.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-108</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Sodepur Store Banner Header Total</td>
                  <td className="py-2.5 px-3 text-sky-300">Entire Row Reference</td>
                  <td className="py-2.5 px-3 text-amber-300">`=SUM(5:5)`</td>
                  <td className="py-2.5 px-3 text-emerald-400">Entire Row Sum</td>
                  <td className="py-2.5 px-3 text-slate-300">Sums horizontal store totals across all monthly columns.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-109</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Howrah Freight Range Highlighting</td>
                  <td className="py-2.5 px-3 text-sky-300">White Cross Pointer</td>
                  <td className="py-2.5 px-3 text-amber-300">Click B2 &amp; Drag to D20</td>
                  <td className="py-2.5 px-3 text-emerald-400">Range B2:D20 Selected</td>
                  <td className="py-2.5 px-3 text-slate-300">Standard range selection cursor mode.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-110</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Durgapur Steel AutoFill Series</td>
                  <td className="py-2.5 px-3 text-sky-300">Black Plus Fill Handle</td>
                  <td className="py-2.5 px-3 text-amber-300">Drag bottom-right cell corner</td>
                  <td className="py-2.5 px-3 text-emerald-400">Formulas Copied</td>
                  <td className="py-2.5 px-3 text-slate-300">Rapid replication of logic across adjacent cells.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-111</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Asansol Power Block Move Operation</td>
                  <td className="py-2.5 px-3 text-sky-300">4-Headed Arrow Pointer</td>
                  <td className="py-2.5 px-3 text-amber-300">Drag border of range D2:D10</td>
                  <td className="py-2.5 px-3 text-emerald-400">Block Relocated</td>
                  <td className="py-2.5 px-3 text-slate-300">Moves cell contents updating relative internal references.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-112</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Siliguri Tea Column Resizing</td>
                  <td className="py-2.5 px-3 text-sky-300">Double-Arrow Column Divider</td>
                  <td className="py-2.5 px-3 text-amber-300">Double-click between Col B &amp; C</td>
                  <td className="py-2.5 px-3 text-emerald-400">AutoFit Column B</td>
                  <td className="py-2.5 px-3 text-slate-300">Adjusts column width to fit longest text string.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-113</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Haldia Port 50,000-Row Navigation</td>
                  <td className="py-2.5 px-3 text-sky-300">Ctrl + Down Arrow Jump</td>
                  <td className="py-2.5 px-3 text-amber-300">Press Ctrl + Down Arrow</td>
                  <td className="py-2.5 px-3 text-emerald-400">Jumps to Row 50,000</td>
                  <td className="py-2.5 px-3 text-slate-300">Navigates instantly to end of continuous data region.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-114</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Malda Mango Rapid Block Selection</td>
                  <td className="py-2.5 px-3 text-sky-300">Ctrl + Shift + Down/Right</td>
                  <td className="py-2.5 px-3 text-amber-300">Press Ctrl + Shift + Down Arrow</td>
                  <td className="py-2.5 px-3 text-emerald-400">Entire Table Selected</td>
                  <td className="py-2.5 px-3 text-slate-300">Selects 10,000 data rows in under 0.1 seconds.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-115</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Midnapore Hospital Top-Left Return</td>
                  <td className="py-2.5 px-3 text-sky-300">Ctrl + Home Shortcut</td>
                  <td className="py-2.5 px-3 text-amber-300">Press Ctrl + Home</td>
                  <td className="py-2.5 px-3 text-emerald-400">Jumped to Cell A1</td>
                  <td className="py-2.5 px-3 text-slate-300">Returns cursor to top-left origin cell from anywhere.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-116</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kharagpur Library Used Range Check</td>
                  <td className="py-2.5 px-3 text-sky-300">Ctrl + End Shortcut</td>
                  <td className="py-2.5 px-3 text-amber-300">Press Ctrl + End</td>
                  <td className="py-2.5 px-3 text-emerald-400">Jumped to F1250</td>
                  <td className="py-2.5 px-3 text-slate-300">Audits actual bottom-right boundary of active grid.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-117</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Hooghly Jute Data Region Selection</td>
                  <td className="py-2.5 px-3 text-sky-300">Ctrl + A (Data Block Mode)</td>
                  <td className="py-2.5 px-3 text-amber-300">Press Ctrl + A inside table</td>
                  <td className="py-2.5 px-3 text-emerald-400">Table A1:F500 Selected</td>
                  <td className="py-2.5 px-3 text-slate-300">Selects current data region without highlighting entire sheet.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-118</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Burdwan Seed Specific Cell Jump</td>
                  <td className="py-2.5 px-3 text-sky-300">Name Box Direct Input</td>
                  <td className="py-2.5 px-3 text-amber-300">Type `X500` in Name Box + Enter</td>
                  <td className="py-2.5 px-3 text-emerald-400">Active Cell = X500</td>
                  <td className="py-2.5 px-3 text-slate-300">Direct coordinate jump skipping scroll bar dragging.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-119</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Purulia Solar Blank Cell Cleanup</td>
                  <td className="py-2.5 px-3 text-sky-300">Go To Special Blanks</td>
                  <td className="py-2.5 px-3 text-amber-300">F5 $\rightarrow$ Special $\rightarrow$ Blanks</td>
                  <td className="py-2.5 px-3 text-emerald-400">All Blank Cells Selected</td>
                  <td className="py-2.5 px-3 text-slate-300">Batch selects missing data cells for instant fill.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CA-120</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Bankura Craft External Sheet Reference</td>
                  <td className="py-2.5 px-3 text-sky-300">Cross-Sheet Range Syntax</td>
                  <td className="py-2.5 px-3 text-amber-300">`='Sales_Jan'!B2:B50`</td>
                  <td className="py-2.5 px-3 text-emerald-400">Foreign Range Array</td>
                  <td className="py-2.5 px-3 text-slate-300">References range arrays residing on different worksheets.</td>
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">File Size Bloating (MegaBytes)</td>
                  <td className="py-3 px-4 text-slate-300">Accidental formatting or spaces in far-off cells (e.g. row 500,000).</td>
                  <td className="py-3 px-4 text-amber-300">Press Ctrl + End; if active cell jumps far past actual data, used range is bloated.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Select empty rows/columns, right-click Delete (do not press Backspace), and Save.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Sheet Reference Syntax Error (#REF!)</td>
                  <td className="py-3 px-4 text-slate-300">Deleting a worksheet referenced by formulas in other sheets.</td>
                  <td className="py-3 px-4 text-amber-300">Formula changes to =SUM(#REF!A1:A10).</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Use Undo immediately or restore worksheet tab with identical name.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Illegal Sheet Name Dialog</td>
                  <td className="py-3 px-4 text-slate-300">Using characters like / \ ? * [ ] or exceeding 31 characters.</td>
                  <td className="py-3 px-4 text-amber-300">Excel blocks rename with error prompt.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Keep sheet names under 31 alphanumeric characters using underscores instead of slashes.</td>
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
                Ctrl + End
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Jump to the bottom-rightmost used cell in the active worksheet to verify Used Range.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Shift + F11
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Instantly insert a new blank worksheet tab into the workbook.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Page Down
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Switch viewport to the next worksheet tab on the right.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Page Up
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Switch viewport to the previous worksheet tab on the left.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is column 16,384 designated as 'XFD' in the alphabetical base-26 numbering scheme?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does Excel store cell formatting separately from cell values in the underlying XML structure?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">What is the memory difference between a workbook with 10 sheets of 1,000 rows vs 1 sheet of 10,000 rows?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Understanding Workbooks, Worksheets, Rows, Columns and Grid Coordinate Limits - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Keep your workbooks lean! Always audit your Used Range by pressing Ctrl+End before saving. Never format entire million-row columns with background fills—format only the active data table!"
          />
        </div>
      </div>
    </div>
  );
}
