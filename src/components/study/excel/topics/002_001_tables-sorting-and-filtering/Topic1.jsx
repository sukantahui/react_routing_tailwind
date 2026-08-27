"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/tables_sorting_filtering.xlsx?url";
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
    link.download = "tables_sorting_filtering_practice.xlsx";
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
              📑 Structured Tables · Topic 1
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Intermediate
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 & 3: Understand & Apply
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Table Advanced Features: Total Row, Dynamic Calculated Columns and Auto-Expansion
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master advanced Table features: The Total Row (Ctrl+Shift+T) with built-in aggregate functions (Sum, Average, Count, Min, Max), automatic column formula propagation, dynamic formula expansion, and integrating Tables with charts and PivotTables.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Structured Syntax:</strong> [@Column] Relational Math</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Filter Subtotals:</strong> SUBTOTAL(109) Recalculation</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Interactive Slicers:</strong> 1-Click Dashboard UI</span>
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
            Structured Referencing & Table Syntax
          </h2>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            =SUBTOTAL(109, [Invoice_Amount])
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Total Row (Ctrl+Shift+T)</td>
                  <td className="py-3 px-4 text-teal-400">Filter Subtotal</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Aggregation</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Appends bottom summary row with built-in aggregate dropdowns per column.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Calculated Column</td>
                  <td className="py-3 px-4 text-teal-400">Auto-Fill Engine</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Automation</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Entering a formula in one cell instantly cascades it down the entire column.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Auto-Expansion</td>
                  <td className="py-3 px-4 text-teal-400">Dynamic Boundary</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Data Hygiene</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Absorbs newly typed adjacent rows and columns into the table structure.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Structured Output: </strong>
              Evaluates to a <span className="text-sky-300 font-semibold">Filter-Aware Aggregate Total Row</span> that expands dynamically with data volume.
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
            Relational Data Architecture & Query Mechanics
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>The Table Total Row uses =SUBTOTAL(109, [ColumnName]) which automatically recalculates when rows are filtered out, displaying only visible row totals.</p>
            <p>Calculated columns eliminate formula inconsistency: every cell in the column is guaranteed to use the exact same logic.</p>
            <p>Dynamic tables eliminate manual range adjustments in downstream PivotTables and charts, as they automatically source `tblName` instead of static ranges.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">Dynamic Boundary Self-Healing</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Excel Tables automatically expand their coordinate boundaries upon row entry, extending formulas and formats without manual drag.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">Filter-Aware Subtotals</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Total Rows leverage =SUBTOTAL(109) to ignore hidden filtered rows, guaranteeing that visible summaries match screen views.
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
            Visual Architecture: Table Total Row &amp; Dynamic Auto-Expansion Architecture
          </h2>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-x-auto">
            <svg viewBox="0 0 800 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="m5_table" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m5_query" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m5_slicer" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <rect x="30" y="50" width="200" height="150" rx="12" fill="url(#m5_table)" stroke="#38bdf8" strokeWidth="2" />
              <text x="130" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">1. Excel Table (Ctrl+T)</text>
              <text x="130" y="115" textAnchor="middle" fill="#e0f2fe" fontSize="11">Headers: tblStudents</text>
              <text x="130" y="135" textAnchor="middle" fill="#e0f2fe" fontSize="11">Syntax: [@Course_Fee]</text>
              <text x="130" y="165" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">Auto-Expanding Grid</text>

              <path d="M 235 125 L 295 125" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="295,120 305,125 295,130" fill="#38bdf8" />

              <rect x="310" y="50" width="200" height="150" rx="12" fill="url(#m5_query)" stroke="#34d399" strokeWidth="2" />
              <text x="410" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">2. Filter & Sort Engine</text>
              <text x="410" y="115" textAnchor="middle" fill="#d1fae5" fontSize="11">Multi-Level Sorting</text>
              <text x="410" y="135" textAnchor="middle" fill="#d1fae5" fontSize="11">Advanced Boolean Logic</text>
              <text x="410" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">SUBTOTAL(109)</text>

              <path d="M 515 125 L 575 125" stroke="#34d399" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="575,120 585,125 575,130" fill="#34d399" />

              <rect x="590" y="50" width="180" height="150" rx="12" fill="url(#m5_slicer)" stroke="#a78bfa" strokeWidth="2" />
              <text x="680" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">3. Interactive UI</text>
              <text x="680" y="115" textAnchor="middle" fill="#ede9fe" fontSize="11">1-Click Slicer Buttons</text>
              <text x="680" y="135" textAnchor="middle" fill="#ede9fe" fontSize="11">Multi-Select Filtering</text>
              <text x="680" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="11" fontWeight="bold">No-Code Dashboard</text>
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
              title="Download full .xlsx master workbook for Module 2.1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic0_Excel_Tables"
            title="Module 2.1 - Table Advanced Features: Total Row, Dynamic Calculated Columns and Auto-Expansion"
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
                <h3 className="text-base font-bold text-white">Kolkata Retail Filtered Category Subtotal Auditing</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Auditing total sales for 'Consumer Electronics' when table contains 10 categories.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Filter_Applied</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Total_Row_Formula</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Displayed_Total</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">All 10 Categories</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUBTOTAL(109, [Sales_INR])</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 1,48,50,000.00 (Grand Total)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Filter: 'Consumer Electronics'</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUBTOTAL(109, [Sales_INR])</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 45,000,00.00 (Filtered Total)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Table Total Row (Ctrl + Shift + T)</div>
                <div className="text-emerald-400 font-semibold">Result: Total updates dynamically when filters are clicked.</div>
                <div className="text-slate-400 text-[11px]">SUBTOTAL(109) ignores rows hidden by AutoFilter.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Barrackpore Staff Payroll Calculated Column Addition</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Adding a 'Dearness Allowance (DA 12%)' column to an existing 100-employee table.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Action</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Input_Formula</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Result</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Type 'DA_12%' in Header G1 -&gt; Type '=[@Basic_Pay]*0.12'</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=[@Basic_Pay]*0.12</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">All 100 rows populate with DA formula in 0.1 seconds</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Dynamic Calculated Column</div>
                <div className="text-emerald-400 font-semibold">Result: 100 employee DA calculations generated instantly.</div>
                <div className="text-slate-400 text-[11px]">Excel Tables enforce column-wide formula consistency.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Regional Wholesale PivotTable Source Hygiene</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Connecting a PivotTable to `tblWholesale` instead of `$A$1:$H$500`.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Pivot_Data_Source</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">When 50 New Rows Added</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">PivotTable_Refresh</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">tblWholesale</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Table expands to row 550</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Right-click Refresh includes all 50 new rows instantly!</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Table Object as PivotTable Source</div>
                <div className="text-emerald-400 font-semibold">Result: Zero maintenance PivotTable pipeline.</div>
                <div className="text-slate-400 text-[11px]">Referencing Table names ensures PivotTables never miss newly added rows.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Ichapur Plant Defect Rate Metric Drop-Down Selection</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Switching Total Row metric from SUM to AVERAGE for defect tracking.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Column</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Selected_Dropdown_Option</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Generated_Formula</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Defect_Count</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Average</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUBTOTAL(101, [Defect_Count]) (5.68 Average Defects)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Total Row Dropdown Menu</div>
                <div className="text-emerald-400 font-semibold">Result: Instant aggregate function switching without typing formulas.</div>
                <div className="text-slate-400 text-[11px]">Built-in dropdowns provide instant statistical summaries.</div>
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
                <h3 className="text-sm font-bold text-white">Convert Range to Structured Table</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Click inside dataset. Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Ctrl + T</kbd> &rarr; Check 'My table has headers' &rarr; Click OK. Rename table in Table Design tab.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <h3 className="text-sm font-bold text-white">Input Structured Formula & Enable Total Row</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Type <code className="text-amber-300 font-mono">=[@Fee] * 0.18</code> in calculated column. Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Ctrl + Shift + T</kbd> to activate Total Row.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <h3 className="text-sm font-bold text-white">Configure Multi-Level Sort Hierarchy</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Alt + D + S</kbd> to open Sort dialog. Add Level 1 (Branch), Level 2 (Department), and Level 3 (Total Marks Descending).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <h3 className="text-sm font-bold text-white">Insert & Format Interactive Slicers</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Go to Table Design &rarr; <strong>Insert Slicer</strong> &rarr; Select Branch and Department. Set Slicer Columns to 4 and align horizontally.
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Table Total Row Blocking New Data Entry</td>
                  <td className="py-3 px-4 text-slate-300">Typing new rows directly below the Total Row without using Tab key.</td>
                  <td className="py-3 px-4 text-amber-300">New row is outside the table boundary.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Click the last data cell before Total Row and press Tab to insert a new table row.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Calculated Column Inconsistency Warning</td>
                  <td className="py-3 px-4 text-slate-300">Manually editing a single cell in a calculated column.</td>
                  <td className="py-3 px-4 text-amber-300">Excel displays 'Inconsistent Calculated Column Formula' alert.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Restore uniform formula by clicking the smart tag and selecting 'Restore to Calculated Column Formula'.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Double Counting with External SUM()</td>
                  <td className="py-3 px-4 text-slate-300">Applying =SUM(A:A) on an entire sheet column containing a Table and its Total Row.</td>
                  <td className="py-3 px-4 text-amber-300">Grand total is doubled.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Reference the table data vector directly: =SUM(tblData[ColumnName]).</td>
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
                Ctrl + Shift + T
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Toggle Table Total Row on/off.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Tab (in bottom-right cell)
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Instantly insert new blank row inside Table boundary.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + J + T + B
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Toggle Table Banded Rows styling.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + J + T + G
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Convert Table back to standard range.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why does =SUBTOTAL(109, [Sales]) change its calculated value when an AutoFilter is applied, while =SUM([Sales]) does not?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does the Tab key in the bottom-right cell of a Table ensure clean data ingestion without breaking the Total Row?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is feeding `tblData` into PivotTables considered the universal best practice in database architecture?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Table Advanced Features: Total Row, Dynamic Calculated Columns and Auto-Expansion - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Always enable the Table Total Row with Ctrl + Shift + T! It uses SUBTOTAL(109) so when you filter your table by branch or department, the total dynamically recalculates to show only the visible records. Press Tab in the last cell to add new rows smoothly!"
          />
        </div>
      </div>
    </div>
  );
}
