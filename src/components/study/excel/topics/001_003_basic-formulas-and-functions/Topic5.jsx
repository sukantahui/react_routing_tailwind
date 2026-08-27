"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/basic_formulas_and_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic5() {
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
    link.download = "basic_formulas_practice.xlsx";
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
              ⚡ Formulas & Math · Topic 5
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 & 3: Understand & Apply
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            High-Speed AutoSum Mastery: Multi-Directional Summing and Keyboard Shortcuts
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master the fastest calculation shortcut in Microsoft Excel: Alt + = (AutoSum). Learn how AutoSum scans boundaries, inserts simultaneous row and column totals across 2D matrices in one single keystroke, and integrates with Table Total rows.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>BODMAS Precedence:</strong> Flawless Order of Ops</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Aggregation Stack:</strong> SUM, AVERAGE, COUNT</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Rounding Control:</strong> Statutory 2-Decimal Precision</span>
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
            Formula Anatomy & Function Syntax
          </h2>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            Alt + = (AutoSum Keytip)
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Alt + =</td>
                  <td className="py-3 px-4 text-teal-400">AutoSum Keytip</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Speed</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Instantly inserts =SUM() detecting contiguous numbers above or to the left.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">2D Block AutoSum</td>
                  <td className="py-3 px-4 text-teal-400">Matrix Sum</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Productivity</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Highlight data matrix + extra row + extra column &amp;rarr; Press Alt+= to populate all totals simultaneously.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Table Total Row</td>
                  <td className="py-3 px-4 text-teal-400">Structured Table</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Automation</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Ctrl+Shift+T adds dynamic aggregate total row with built-in formula drop-downs.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Return Evaluation: </strong>
              Returns a <span className="text-sky-300 font-semibold">Instant Summation Formula Array</span> directly to the active cell coordinate.
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
            Computational Mechanics & Calculation Engine
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>When Alt + = is pressed, Excel's lexical scanner inspects the cells immediately above the active cell. If numbers are found, it generates =SUM(Top:Bottom); otherwise, it scans to the left.</p>
            <p>If an entire rectangular matrix including blank perimeter total cells is pre-selected, pressing Alt + = injects row sums, column sums, and the grand cross-foot total simultaneously.</p>
            <p>Inside Excel Tables (Ctrl+T), AutoSum automatically generates =SUBTOTAL(109, [ColumnName]) which dynamically excludes filtered hidden rows.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">Expression Parse Tree</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Excel compiles formulas into an Abstract Syntax Tree (AST), executing operations in strict operator precedence order.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">Floating-Point Precision</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Calculations execute in 64-bit double precision registers. Explicit rounding (=ROUND) eliminates binary fractional drift.
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
            Visual Calculation Flow: 2D Matrix AutoSum: Simultaneous Row &amp; Column Aggregation
          </h2>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-x-auto">
            <svg viewBox="0 0 800 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="m3_input" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m3_calc" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m3_render" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <rect x="30" y="50" width="200" height="150" rx="12" fill="url(#m3_input)" stroke="#38bdf8" strokeWidth="2" />
              <text x="130" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">1. Operands & Ranges</text>
              <text x="130" y="115" textAnchor="middle" fill="#e0f2fe" fontSize="11">Cell References: A1:A50</text>
              <text x="130" y="135" textAnchor="middle" fill="#e0f2fe" fontSize="11">Constants: 0.18, 500</text>
              <text x="130" y="165" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">Input Coordinates</text>

              <path d="M 235 125 L 295 125" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="295,120 305,125 295,130" fill="#38bdf8" />

              <rect x="310" y="50" width="200" height="150" rx="12" fill="url(#m3_calc)" stroke="#34d399" strokeWidth="2" />
              <text x="410" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">2. Formula Engine</text>
              <text x="410" y="115" textAnchor="middle" fill="#d1fae5" fontSize="11">BODMAS Precedence</text>
              <text x="410" y="135" textAnchor="middle" fill="#d1fae5" fontSize="11">SUM, AVERAGE, ROUND</text>
              <text x="410" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">DAG Evaluation</text>

              <path d="M 515 125 L 575 125" stroke="#34d399" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="575,120 585,125 575,130" fill="#34d399" />

              <rect x="590" y="50" width="180" height="150" rx="12" fill="url(#m3_render)" stroke="#a78bfa" strokeWidth="2" />
              <text x="680" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">3. Calculated Result</text>
              <text x="680" y="115" textAnchor="middle" fill="#ede9fe" fontSize="11">₹ 14,850,000.00</text>
              <text x="680" y="135" textAnchor="middle" fill="#ede9fe" fontSize="11">Instant Cross-Footing</text>
              <text x="680" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="11" fontWeight="bold">Balanced Ledger</text>
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
              title="Download full .xlsx master workbook for Module 1.3"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic5_Copying_formulas_u"
            title="Module 1.3 - High-Speed AutoSum Mastery: Multi-Directional Summing and Keyboard Shortcuts"
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
                <h3 className="text-base font-bold text-white">Barrackpore Academy 4-Quarter Departmental Matrix Sum in 1 Keystroke</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Summing 5 department rows and 4 quarterly columns simultaneously.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Department</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Q1</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Q2</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Q3</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Q4</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Total_Dept (Alt+=)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Software Engg</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">120,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">145,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">135,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">160,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(B2:E2) (560,000)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Taxation &amp; GST</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">150,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">175,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">160,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">190,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(B3:E3) (675,000)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Total_Quarter (Alt+=)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(B2:B3)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(C2:C3)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(D2:D3)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(E2:E3)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(F2:F3) (1,235,000)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Select Range B2:F4 &amp;rarr; Press Alt + =</div>
                <div className="text-emerald-400 font-semibold">Result: All 5 row totals, 4 column totals, and grand total populated in 0.1 seconds.</div>
                <div className="text-slate-400 text-[11px]">Pre-selecting the bounding box allows Alt+= to populate the entire perimeter in 1 keystroke.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Kolkata Retail Daily Multi-Counter Settlement</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Inserting sub-totals under 10 cash counter registers instantly.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Step</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Action</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Time_Taken</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">1</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Select empty cells under each counter column</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">1 second</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">2</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Press Alt + =</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">0.1 second (All 10 column sums inserted)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Multi-Selection (Ctrl + Click) &amp;rarr; Alt + =</div>
                <div className="text-emerald-400 font-semibold">Result: 10 column sums inserted simultaneously.</div>
                <div className="text-slate-400 text-[11px]">AutoSum operates across non-contiguous multi-cell selections.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Regional Wholesale Table Total Row (Ctrl+Shift+T)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Enabling dynamic subtotal aggregation on a structured customer ledger table.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Table_Action</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Shortcut</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Formula_Generated</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Benefit</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Toggle Total Row</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Ctrl + Shift + T</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUBTOTAL(109, [Invoice_Amount])</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Automatically recalculates when table is filtered</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Ctrl + Shift + T (Table Total Row)</div>
                <div className="text-emerald-400 font-semibold">Result: Interactive total row with Average, Count, and Sum drop-downs.</div>
                <div className="text-slate-400 text-[11px]">SUBTOTAL(109) respects active filters, updating totals dynamically.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Ichapur Production Shift Total Output Check</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Auditing daily factory shift production totals.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Shift_Time</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Line_1_Output</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Line_2_Output</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Shift_Total_Formula</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Morning Shift</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">4,500</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">5,200</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(B2:C2) (9,700)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Evening Shift</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">3,800</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">4,100</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(B3:C3) (7,900)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Alt + = AutoSum</div>
                <div className="text-emerald-400 font-semibold">Result: Line totals and grand factory output reconciled.</div>
                <div className="text-slate-400 text-[11px]">AutoSum eliminates manual typing of simple addition ranges.</div>
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
                <h3 className="text-sm font-bold text-white">Trigger Formula Engine</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Click destination cell, type <code className="text-sky-300 font-mono">=</code>, and enter function name (e.g. <code className="text-amber-300 font-mono">=ROUND(SUM(</code>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <h3 className="text-sm font-bold text-white">Select Bounding Range & Lock Coordinates</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Highlight arguments with arrow keys or mouse. Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">F4</kbd> if parameter cell must be anchored (<code className="text-emerald-400 font-mono">$B$1</code>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <h3 className="text-sm font-bold text-white">Close Parentheses & Execute</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Close all opened parentheses <code className="text-purple-300 font-mono">))</code> and press Enter to commit calculation.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <h3 className="text-sm font-bold text-white">Audit Intermediate Expressions (F9)</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Highlight any nested sub-formula inside the formula bar and press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">F9</kbd> to inspect the live evaluated value.
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">AutoSum Stops at Blank Cell</td>
                  <td className="py-3 px-4 text-slate-300">A blank cell in the middle of a 100-row column breaks AutoSum's upward scan.</td>
                  <td className="py-3 px-4 text-amber-300">Formula sums only rows 50 to 100, missing rows 1 to 49.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Inspect column for blanks before AutoSumming, or manually verify coordinate range in formula bar.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">AutoSum Includes Header Year as a Number</td>
                  <td className="py-3 px-4 text-slate-300">Column header is '2026' (a numeric year) instead of 'FY2026' text.</td>
                  <td className="py-3 px-4 text-amber-300">AutoSum includes 2026 in the sum total.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Label year headers with text prefixes ('FY2026' or 'Yr_2026') or format as Text.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Double Counting with Subtotals</td>
                  <td className="py-3 px-4 text-slate-300">Using =SUM() on a column that already contains subtotal rows.</td>
                  <td className="py-3 px-4 text-amber-300">Grand total is exactly double the true amount.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Use =SUBTOTAL(9, range) or =AGGREGATE() which naturally ignores other nested subtotals.</td>
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
                Alt + =
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">AutoSum shortcut key.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Shift + T
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Toggle Table Total Row inside an Excel Table.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + `
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Formula View to verify AutoSum boundary ranges.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                F2
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Edit formula to adjust bounding coordinates.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why does AutoSum include the column header if the header is typed as the number 2026?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does =SUBTOTAL(109, range) differ from =SUM(range) when rows are filtered out?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is highlighting the entire matrix including the perimeter total row/col before pressing Alt+= considered the ultimate Excel power move?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="High-Speed AutoSum Mastery: Multi-Directional Summing and Keyboard Shortcuts - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Master the 2D Matrix AutoSum! Highlight your entire table PLUS one extra blank column on the right and one extra blank row at the bottom. Tap Alt + = and watch Excel populate all row totals, column totals, and the grand cross-foot total simultaneously in half a second!"
          />
        </div>
      </div>
    </div>
  );
}
