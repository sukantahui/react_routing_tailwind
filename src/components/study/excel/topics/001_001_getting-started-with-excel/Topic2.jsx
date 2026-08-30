"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_001_getting_started_with_excel_master.xlsx?url";
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
              📊 Excel Foundations · Topic 2
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 1 & 2: Remember & Understand
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Exploring the Interface: Ribbon, Tabs, Formula Bar, Quick Access Toolbar &amp; Status Bar Ergonomics
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master Excel's visual workspace architecture: the Ribbon system (Home, Insert, Page Layout, Formulas, Data, Review, View), Formula Bar expansion, Name Box coordinates, Quick Access Toolbar customization, and live Status Bar summary aggregations.
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
            =INFO("release")
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Ribbon Tab</td>
                  <td className="py-3 px-4 text-teal-400">Command Category</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Core UI</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Context-sensitive command tabs grouping tools into logical task workflows.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Formula Bar</td>
                  <td className="py-3 px-4 text-teal-400">Editor Panel</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Core UI</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Displays underlying formula syntax or raw unformatted literal value of active cell.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Status Bar</td>
                  <td className="py-3 px-4 text-teal-400">Footer Metric Bar</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Core UI</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Displays instant live SUM, AVERAGE, COUNT, MIN, MAX of highlighted cell ranges.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Return Evaluation: </strong>
              Returns a <span className="text-sky-300 font-semibold">Interface Configuration / Application State</span> directly to the active cell coordinates.
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
            <p>The Excel user interface employs the Fluent Ribbon architecture. Keytips (activated via the Alt key) provide full keyboard accessibility to every command without touching the mouse.</p>
            <p>The Formula Bar acts as a bidirectional viewport: while the cell displays the evaluated presentation result, the Formula Bar displays the underlying expression.</p>
            <p>The Status Bar performs real-time, non-destructive background aggregation on selected cells, calculating instant metrics without modifying worksheet formulas.</p>
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
            Visual Calculation Flow: Excel Desktop Interface Anatomy &amp; Keytip Ergonomics
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
            sheetName="Topic2"
            title="Module 1.1 - Exploring the Interface: Ribbon, Tabs, Formula Bar, Quick Access Toolbar &amp; Status Bar Ergonomics"
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
                20 Real-World Business Scenarios: Workbook &amp; Worksheet Management
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                20 practical workplace scenarios detailing tab renaming, color coding, sheet protection, cross-sheet 3D formulas, and sheet security.
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
                  <th className="py-3 px-3">Sheet Management Action</th>
                  <th className="py-3 px-3">Applied Method / Shortcut</th>
                  <th className="py-3 px-3">Target Outcome</th>
                  <th className="py-3 px-3">Key Administrative Benefit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-101</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kolkata CA Annual Audit Master Workbook</td>
                  <td className="py-2.5 px-3 text-sky-300">Create Blank Workbook</td>
                  <td className="py-2.5 px-3 text-amber-300">Press Ctrl + N</td>
                  <td className="py-2.5 px-3 text-emerald-400">Book1 Created</td>
                  <td className="py-2.5 px-3 text-slate-300">Instantiates clean multi-tab working model.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-102</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Barrackpore Branch Monthly Budgeting</td>
                  <td className="py-2.5 px-3 text-sky-300">Rename Sheet Tab</td>
                  <td className="py-2.5 px-3 text-amber-300">Double-Click Tab $\rightarrow$ Type `BKP_Jan26`</td>
                  <td className="py-2.5 px-3 text-emerald-400">Sheet Renamed `BKP_Jan26`</td>
                  <td className="py-2.5 px-3 text-slate-300">Eliminates generic `Sheet1` default confusion.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-103</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Shyamnagar Supermarket Departmental Color Coding</td>
                  <td className="py-2.5 px-3 text-sky-300">Set Tab Color</td>
                  <td className="py-2.5 px-3 text-amber-300">Alt + H + O + T $\rightarrow$ Green</td>
                  <td className="py-2.5 px-3 text-emerald-400">Green Tab Accent</td>
                  <td className="py-2.5 px-3 text-slate-300">Visual demarcation of high-margin departments.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-104</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Salt Lake Tech HR Salary Protection</td>
                  <td className="py-2.5 px-3 text-sky-300">Protect Sheet with Password</td>
                  <td className="py-2.5 px-3 text-amber-300">Review $\rightarrow$ Protect Sheet (`sukantahui`)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Cells Locked</td>
                  <td className="py-2.5 px-3 text-slate-300">Prevents unauthorized salary adjustments.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-105</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Ichapur Plant Machine Maintenance Copy</td>
                  <td className="py-2.5 px-3 text-sky-300">Duplicate Worksheet Tab</td>
                  <td className="py-2.5 px-3 text-amber-300">Ctrl + Drag Sheet Tab</td>
                  <td className="py-2.5 px-3 text-emerald-400">`Maint_Log (2)` Created</td>
                  <td className="py-2.5 px-3 text-slate-300">Clones layout and formulas instantly for new month.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-106</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Titagarh Mill Executive Summary Hide</td>
                  <td className="py-2.5 px-3 text-sky-300">Hide Operational Sheet Tab</td>
                  <td className="py-2.5 px-3 text-amber-300">Alt + H + O + U + S</td>
                  <td className="py-2.5 px-3 text-emerald-400">Tab Hidden</td>
                  <td className="py-2.5 px-3 text-slate-300">Reduces clutter during C-suite presentations.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-107</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Naihati Pharmacy Audit Unhide</td>
                  <td className="py-2.5 px-3 text-sky-300">Unhide Hidden Sheet Tab</td>
                  <td className="py-2.5 px-3 text-amber-300">Alt + H + O + U + H</td>
                  <td className="py-2.5 px-3 text-emerald-400">Tax_Log Unhidden</td>
                  <td className="py-2.5 px-3 text-slate-300">Restores access to underlying tax calculation sheets.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-108</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Sodepur Retail Selective Data Entry</td>
                  <td className="py-2.5 px-3 text-sky-300">Unlock Input Cells</td>
                  <td className="py-2.5 px-3 text-amber-300">Ctrl+1 $\rightarrow$ Uncheck Locked $\rightarrow$ Protect Sheet</td>
                  <td className="py-2.5 px-3 text-emerald-400">B2:B10 Editable Only</td>
                  <td className="py-2.5 px-3 text-slate-300">Allows cashiers to type inputs while formulas stay locked.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-109</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Howrah Dock 12-Month Consolidation</td>
                  <td className="py-2.5 px-3 text-sky-300">Cross-Sheet 3D Formula Reference</td>
                  <td className="py-2.5 px-3 text-amber-300">`=SUM('Jan:Dec'!E20)`</td>
                  <td className="py-2.5 px-3 text-emerald-400">12-Month Total Summed</td>
                  <td className="py-2.5 px-3 text-slate-300">Aggregates identical cells across multiple month tabs.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-110</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Durgapur Steel Structure Lockdown</td>
                  <td className="py-2.5 px-3 text-sky-300">Protect Workbook Structure</td>
                  <td className="py-2.5 px-3 text-amber-300">Review $\rightarrow$ Protect Workbook</td>
                  <td className="py-2.5 px-3 text-emerald-400">Structure Locked</td>
                  <td className="py-2.5 px-3 text-slate-300">Prevents users from adding, deleting, or moving tabs.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-111</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Asansol Power Batch Tab Selection</td>
                  <td className="py-2.5 px-3 text-sky-300">Group Multiple Worksheets</td>
                  <td className="py-2.5 px-3 text-amber-300">Shift + Click First &amp; Last Tab</td>
                  <td className="py-2.5 px-3 text-emerald-400">Tabs Highlighted [Group]</td>
                  <td className="py-2.5 px-3 text-slate-300">Applies headers and formatting to all sheets at once.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-112</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Siliguri Tea Move Tab to External File</td>
                  <td className="py-2.5 px-3 text-sky-300">Move Sheet to New Workbook</td>
                  <td className="py-2.5 px-3 text-amber-300">Right-click $\rightarrow$ Move or Copy $\rightarrow$ (new book)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Sheet Extracted</td>
                  <td className="py-2.5 px-3 text-slate-300">Isolates specific department data for external email.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-113</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Haldia Port New Sheet Rapid Insert</td>
                  <td className="py-2.5 px-3 text-sky-300">Insert Blank Worksheet Tab</td>
                  <td className="py-2.5 px-3 text-amber-300">Press Shift + F11</td>
                  <td className="py-2.5 px-3 text-emerald-400">New Sheet Inserted</td>
                  <td className="py-2.5 px-3 text-slate-300">Instant sheet addition preceding active tab.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-114</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Malda Mango Accidental Sheet Delete</td>
                  <td className="py-2.5 px-3 text-sky-300">Delete Sheet with Warning</td>
                  <td className="py-2.5 px-3 text-amber-300">Alt + H + D + S</td>
                  <td className="py-2.5 px-3 text-rose-400">Permanent Removal</td>
                  <td className="py-2.5 px-3 text-slate-300">Note: Sheet deletion cannot be undone with Ctrl+Z!</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-115</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Midnapore Hospital Security Lock</td>
                  <td className="py-2.5 px-3 text-sky-300">Encrypt Entire File with Password</td>
                  <td className="py-2.5 px-3 text-amber-300">File $\rightarrow$ Info $\rightarrow$ Encrypt with Password</td>
                  <td className="py-2.5 px-3 text-emerald-400">File Encrypted</td>
                  <td className="py-2.5 px-3 text-slate-300">Secures patient medical records under AES-256.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-116</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kharagpur Library VeryHidden Sheet</td>
                  <td className="py-2.5 px-3 text-sky-300">VBA VeryHidden Sheet State</td>
                  <td className="py-2.5 px-3 text-amber-300">`Sheet1.Visible = xlSheetVeryHidden`</td>
                  <td className="py-2.5 px-3 text-emerald-400">Invisible in UI</td>
                  <td className="py-2.5 px-3 text-slate-300">Hides backend lookup arrays from standard unhide menu.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-117</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Hooghly Jute AutoSave Rollback</td>
                  <td className="py-2.5 px-3 text-sky-300">Version History Rollback</td>
                  <td className="py-2.5 px-3 text-amber-300">File $\rightarrow$ Info $\rightarrow$ Version History</td>
                  <td className="py-2.5 px-3 text-emerald-400">Restored 10:00 AM State</td>
                  <td className="py-2.5 px-3 text-slate-300">Recovers previous file versions after erroneous updates.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-118</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Burdwan Seed Read-Only Distribution</td>
                  <td className="py-2.5 px-3 text-sky-300">Save As Read-Only Recommended</td>
                  <td className="py-2.5 px-3 text-amber-300">Save As $\rightarrow$ Tools $\rightarrow$ General Options</td>
                  <td className="py-2.5 px-3 text-emerald-400">Read-Only Prompt</td>
                  <td className="py-2.5 px-3 text-slate-300">Warns recipients not to overwrite template formulas.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-119</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Purulia Solar Ungroup Worksheets</td>
                  <td className="py-2.5 px-3 text-sky-300">Ungroup Sheet Tabs</td>
                  <td className="py-2.5 px-3 text-amber-300">Right-click Tab $\rightarrow$ Ungroup Sheets</td>
                  <td className="py-2.5 px-3 text-emerald-400">Single Sheet Active</td>
                  <td className="py-2.5 px-3 text-slate-300">Prevents accidental simultaneous edits across tabs.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">WM-120</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Bankura Craft Tab Re-ordering</td>
                  <td className="py-2.5 px-3 text-sky-300">Drag Tab to Reposition</td>
                  <td className="py-2.5 px-3 text-amber-300">Click &amp; Drag Sheet Tab Left/Right</td>
                  <td className="py-2.5 px-3 text-emerald-400">New Order Established</td>
                  <td className="py-2.5 px-3 text-slate-300">Organizes tabs chronologically or logically.</td>
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Disappearing Ribbon</td>
                  <td className="py-3 px-4 text-slate-300">Accidentally double-clicking a ribbon tab collapses the ribbon into auto-hide mode.</td>
                  <td className="py-3 px-4 text-amber-300">Ribbon tabs only show headers, hiding commands until clicked.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Press Ctrl + F1 to toggle and permanently lock the ribbon in expanded mode.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Status Bar Shows Only Count</td>
                  <td className="py-3 px-4 text-slate-300">Selected cells contain numbers formatted as text, disabling numeric calculations (SUM/AVERAGE).</td>
                  <td className="py-3 px-4 text-amber-300">Status bar displays 'Count: 5' but no 'Sum' or 'Average'.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Convert text numbers to real numbers using Text to Columns or Paste Special Multiply by 1.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Formula Bar Truncating Text</td>
                  <td className="py-3 px-4 text-slate-300">Single-line formula bar cannot display multi-line formulas.</td>
                  <td className="py-3 px-4 text-amber-300">Long formula runs off-screen.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Press Ctrl + Shift + U to expand the formula bar to multi-line view.</td>
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
                Ctrl + F1
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Toggle expand/collapse of the command Ribbon.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Shift + U
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Expand or collapse the Formula Bar vertically for multi-line editing.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Display Keytips overlay on all ribbon tabs for keyboard navigation.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + Enter
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Insert a new line break inside a formula or text cell.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does the Alt key hierarchy enable full spreadsheet control without a mouse?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why does right-clicking the Status Bar reveal customizable aggregation metrics?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does the Name Box coordinate display differ when selecting a single cell vs a merged range?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Exploring the Interface: Ribbon, Tabs, Formula Bar, Quick Access Toolbar &amp; Status Bar Ergonomics - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Master the Ribbon keytips! Professional Excel modeling is keyboard-driven. Learn Alt+H for Home, Alt+N for Insert, Alt+M for Formulas, and Alt+A for Data to navigate at 5x the speed of a mouse user."
          />
        </div>
      </div>
    </div>
  );
}
