"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/002_001_tables_sorting_and_filtering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic6() {
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
    link.download = "002_001_tables_sorting_and_filtering_master.xlsx";
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
        {/* SECTION 1: HERO HEADER & OVERVIEW */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              📑 Structured Tables · Topic 6
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Intermediate
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 &amp; 3: Understand &amp; Apply
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Total Row Integration: Automated Aggregations & Dynamic Summaries
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master official Excel Table Total Rows (Ctrl + Shift + T). Explore built-in drop-down summary functions (SUM, AVERAGE, COUNT, MAX, MIN), structured Total Row syntax, and dynamic SUBTOTAL(109) recalculation.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Total Row Shortcut:</strong> Ctrl + Shift + T Toggle</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>DropDown Summary:</strong> SUM, AVERAGE, COUNT, MAX, MIN</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Filter Aware:</strong> =SUBTOTAL(109, [Column]) Auto-Injected</span>
            </div>
          </div>
        </header>

        {/* SECTION 2: FORMULA & SYNTAX ANATOMY CARD */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">⚡</span>
            Structured Referencing &amp; Table Syntax
          </h2>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            Table Total Row Shortcut: Ctrl + Shift + T  |  Injected Formula: =SUBTOTAL(109, tblSales[Sales_Amount])
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Total Row Checkbox</td>
                  <td className="py-3 px-4 text-teal-400">Table Feature</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Toggle Option</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Appends dedicated summary row at bottom of table bound to ListObjects.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Cell Drop-Down</td>
                  <td className="py-3 px-4 text-teal-400">UI Control</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">1-Click Summary</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Provides instant dropdown selector for SUM, AVERAGE, COUNT, MAX, MIN, STDEV, VAR.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">SUBTOTAL(109, [Col])</td>
                  <td className="py-3 px-4 text-teal-400">Auto-Injected Formula</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Filter-Aware</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Calculates total of strictly visible filtered rows, ignoring hidden data.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Structured Output: </strong>
              Total Row updates automatically when new rows are inserted above it, preserving summary integrity.
            </div>
          </div>
        </section>

        {/* SECTION 3: DEEP CONCEPTUAL & THEORETICAL MECHANICS */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">🔬</span>
            Total Row Mechanics & Auto-Injected SUBTOTAL Engine
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>In standard Excel ranges, users manually type =SUM(E4:E50) at the bottom. Adding new rows below row 50 breaks the sum formula.</p>
            <p>Official Excel Tables solve this via the Total Row (Ctrl + Shift + T). Enabling Total Row appends a dedicated summary row bound to the table.</p>
            <p>Total Row automatically injects =SUBTOTAL(109, [Column]) formulas. When filters are applied, the Total Row updates instantly to display visible row totals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">Dynamic Boundary Protection</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Inserting rows inside or above the Total Row automatically expands the table and updates summary totals.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">Filter-Responsive Calculations</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Total Row formulas use SUBTOTAL(109), ensuring summary cards reflect visible filtered data subsets.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-base font-mono">📐</span>
            Visual Architecture: Excel Table Total Row & Injected SUBTOTAL Engine
          </h2>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-x-auto">
            <svg viewBox="0 0 800 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="m5_table_6" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m5_query_6" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m5_slicer_6" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <rect x="30" y="50" width="200" height="150" rx="12" fill="url(#m5_table_6)" stroke="#38bdf8" strokeWidth="2" />
              <text x="130" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">1. Table Data Body</text>
              <text x="130" y="115" textAnchor="middle" fill="#e0f2fe" fontSize="11">tblEmployees</text>
              <text x="130" y="135" textAnchor="middle" fill="#e0f2fe" fontSize="11">Dynamic Records</text>
              <text x="130" y="165" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">ListObjects Grid</text>

              <path d="M 235 125 L 295 125" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="295,120 305,125 295,130" fill="#38bdf8" />

              <rect x="310" y="50" width="200" height="150" rx="12" fill="url(#m5_query_6)" stroke="#34d399" strokeWidth="2" />
              <text x="410" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">2. Ctrl + Shift + T</text>
              <text x="410" y="115" textAnchor="middle" fill="#d1fae5" fontSize="11">Total Row Enabled</text>
              <text x="410" y="135" textAnchor="middle" fill="#d1fae5" fontSize="11">Cell Dropdowns</text>
              <text x="410" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Summary Bar</text>

              <path d="M 515 125 L 575 125" stroke="#34d399" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="575,120 585,125 575,130" fill="#34d399" />

              <rect x="590" y="50" width="180" height="150" rx="12" fill="url(#m5_slicer_6)" stroke="#a78bfa" strokeWidth="2" />
              <text x="680" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">3. Auto SUBTOTAL</text>
              <text x="680" y="115" textAnchor="middle" fill="#ede9fe" fontSize="11">=SUBTOTAL(109, [Salary])</text>
              <text x="680" y="135" textAnchor="middle" fill="#ede9fe" fontSize="11">Filter Responsive</text>
              <text x="680" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="11" fontWeight="bold">Live Total</text>
            </svg>
          </div>
        </section>

        {/* SECTION 5: LIVE EXCEL PRACTICE GRID & DOWNLOAD PORTAL */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">📥</span>
                Interactive Spreadsheet &amp; Practice Workbook
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
            sheetName="EX107"
            title="Module 2.1 - Total Row Integration: Automated Aggregations & Dynamic Summaries"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* SECTION 6: REAL-WORLD BUSINESS SCENARIOS (4+ CASES) */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
            Real-World Business Scenarios (Bengal &amp; Corporate Applications)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">01</span>
                <h3 className="text-base font-bold text-white">Sodepur Retail Store Revenue Summary</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Enabling Total Row to compute total daily turnover.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Table_Name</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Total_Row_Action</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Summary_Result</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">tblSales</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Ctrl+Shift+T → Dropdown 'SUM'</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 14,80,000.00</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Table Design → Total Row Checkbox</div>
                <div className="text-emerald-400 font-semibold">Result: Instant total turnover calculation.</div>
                <div className="text-slate-400 text-[11px]">Total Row uses =SUBTOTAL(109, [Sales]) automatically.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Kolkata Corporate Payroll Average Audit</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Adding average salary and employee count to Total Row.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Column</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Dropdown_Choice</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Calculated_Value</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Salary Column</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">AVERAGE</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 52,100.00 Average</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Total Row Cell Dropdown</div>
                <div className="text-emerald-400 font-semibold">Result: Multi-metric executive summary.</div>
                <div className="text-slate-400 text-[11px]">Select different summary functions for each column.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Barrackpore Student Fee Total Row Verification</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Verifying total row recalculation when filtering by Department='Finance'.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Filter_State</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Total_Row_Formula</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Displayed_Total</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Filtered (Finance)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUBTOTAL(109, [Fee])</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 4,20,000.00 (Visible Only)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: AutoFilter + Total Row</div>
                <div className="text-emerald-400 font-semibold">Result: Filtered subtotal summary.</div>
                <div className="text-slate-400 text-[11px]">Subtotal excludes filtered-out rows automatically.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Ichapur Equipment Maintenance Cost Aggregation</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Finding maximum maintenance cost in Total Row.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Asset_Table</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Total_Cell_Dropdown</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Highest_Cost</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">tblAssets</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">MAX</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 1,85,000.00</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Total Row Dropdown → MAX</div>
                <div className="text-emerald-400 font-semibold">Result: Highest cost asset identified.</div>
                <div className="text-slate-400 text-[11px]">Total row dropdown eliminates manual formula typing.</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH */}
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
                <h3 className="text-sm font-bold text-white">Click Inside Excel Table</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Select any cell inside the target table (e.g. tblSales).
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <h3 className="text-sm font-bold text-white">Toggle Total Row Shortcut (Ctrl + Shift + T)</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Press Ctrl + Shift + T or check 'Total Row' in Table Design tab.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <h3 className="text-sm font-bold text-white">Select Column Drop-Down Arrow</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Click the summary cell at the bottom of the target column.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <h3 className="text-sm font-bold text-white">Choose Summary Function (Sum, Average, Count)</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Select SUM, AVERAGE, COUNT, MAX, or MIN from the drop-down menu.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: COMMON PITFALLS & TROUBLESHOOTING MATRIX */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 text-base font-mono">⚠️</span>
            Common Pitfalls &amp; Diagnostic Troubleshooting
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Typing Below Table Overwrites Total Row</td>
                  <td className="py-3 px-4 text-slate-300">User typed directly underneath Total Row instead of inserting row inside table.</td>
                  <td className="py-3 px-4 text-amber-300">Check if row is inside table border.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Right-click total row → Insert → Table Row Above.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Total Row Disappears Upon Table Conversion</td>
                  <td className="py-3 px-4 text-slate-300">Total Row checkbox was unchecked in Table Design tab.</td>
                  <td className="py-3 px-4 text-amber-300">Check Table Design tab options.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Press Ctrl + Shift + T to toggle Total Row back on.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Total Row Formula Shows #NAME? Error</td>
                  <td className="py-3 px-4 text-slate-300">Structured column name was corrupted.</td>
                  <td className="py-3 px-4 text-amber-300">Inspect total row formula.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Re-select summary function from dropdown menu.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 9: PRO TIPS & PRODUCTIVITY SHORTCUTS */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-base font-mono">💡</span>
            Classroom Pro Tips &amp; High-Speed Shortcuts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Shift + T
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Toggle Table Total Row on/off instantly.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 flex-wrap"><kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">Right Click -</kbd><span className="text-purple-300 font-mono text-xs font-semibold">→ Insert</span></div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Insert new Table Row Above total row.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + Down Arrow
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Open summary function dropdown in Total Row cell.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Tab Key
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Press Tab in bottom-right cell to append new table row.</p>
            </div>
          </div>
        </section>

        {/* SECTION 10: SOCRATIC ANALYTICAL HINTS ("THINK ABOUT...") */}
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why does the Total Row use =SUBTOTAL(109, ...) instead of standard =SUM(...)?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">What happens to the Total Row when you press Tab in the last cell of an Excel Table?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does the Total Row prevent double-counting when nested subtotals exist inside the dataset?</p>
            </div>
          </div>
        </section>

        {/* SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS) */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Total Row Integration & Dynamic Summaries - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* SECTION 12: TEACHER'S NOTE & EXAM WISDOM */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            topicName="Total Row Integration: Automated Aggregations & Dynamic Summaries"
            noteTitle="Sukanta Hui's Master Mentor Guide"
            mentorAdvice="Always enable the Total Row via Ctrl + Shift + T! Total Row uses filter-aware SUBTOTAL formulas, ensuring your executive totals always reflect strictly visible data rows!"
            note="Master Table Total Rows! Learn how Ctrl + Shift + T auto-injects SUBTOTAL(109) formulas to build boardroom-ready financial models!"
          />
        </div>
      </div>
    </div>
  );
}
