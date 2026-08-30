"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/002_001_tables_sorting_and_filtering_master.xlsx?url";
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
              📑 Structured Tables · Topic 1
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Intermediate
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 &amp; 3: Understand &amp; Apply
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Benefits of Tables: Structured References, Auto-Expansion & Built-In Filters
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Explore structured table syntax [@ColumnName], auto-expanding data ranges, and built-in header filter drop-downs. Learn how self-documenting formulas eliminate cell coordinate dependencies.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Structured Syntax:</strong> tblName[@ColumnName] Current Row</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Vector Scope:</strong> tblName[ColumnName] Full Vector</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Auto-Expansion:</strong> Self-Healing Coordinate Scope</span>
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
            Current Row Reference: =[@Base_Salary] * (1 + [@Bonus_Pct])  |  Vector Reference: =SUM(tblPayroll[Gross_Pay])
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">[@ColumnName]</td>
                  <td className="py-3 px-4 text-teal-400">Structured Item Specifier</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Current Row</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Evaluates value in specified column on the exact same row as formula.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Table[ColumnName]</td>
                  <td className="py-3 px-4 text-teal-400">Vector Reference</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Full Column</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Refers to the entire data body range of the specified column.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Table[#Headers]</td>
                  <td className="py-3 px-4 text-teal-400">Special Item Specifier</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Header Row</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Refers exclusively to top header cells in the table.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Structured Output: </strong>
              Structured formulas update automatically when columns are renamed or relocated, guaranteeing formula immunity.
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
            Structured Syntax Mechanics & Auto-Expanding Scope
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>Structured references replace arbitrary cell addresses like D4*E4 with human-readable column names like [@Quantity]*[@Unit_Price].</p>
            <p>Because structured formulas reference column headers rather than fixed grid coordinates, moving columns or adding new rows never breaks calculations.</p>
            <p>Excel Tables automatically propagate structured formulas down the entire column upon entry, preventing partial column calculation errors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">Self-Documenting Formulas</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Formulas explain their business logic directly ([@Gross_Sales] - [@Discount]) without needing external cell mapping documentation.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">Automatic Formula Propagation</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Typing a formula in any single cell automatically fills the entire column data body instantly.
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
            Visual Architecture: Structured Table Syntax & Formula Propagation Engine
          </h2>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-x-auto">
            <svg viewBox="0 0 800 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="m5_table_1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m5_query_1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m5_slicer_1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <rect x="30" y="50" width="200" height="150" rx="12" fill="url(#m5_table_1)" stroke="#38bdf8" strokeWidth="2" />
              <text x="130" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">1. Structured Formula</text>
              <text x="130" y="115" textAnchor="middle" fill="#e0f2fe" fontSize="11">=[@Sales] * 0.18</text>
              <text x="130" y="135" textAnchor="middle" fill="#e0f2fe" fontSize="11">Self-Documenting Syntax</text>
              <text x="130" y="165" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">Current Row</text>

              <path d="M 235 125 L 295 125" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="295,120 305,125 295,130" fill="#38bdf8" />

              <rect x="310" y="50" width="200" height="150" rx="12" fill="url(#m5_query_1)" stroke="#34d399" strokeWidth="2" />
              <text x="410" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">2. Table Propagation</text>
              <text x="410" y="115" textAnchor="middle" fill="#d1fae5" fontSize="11">Automatic Column Fill</text>
              <text x="410" y="135" textAnchor="middle" fill="#d1fae5" fontSize="11">Zero Drag Required</text>
              <text x="410" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Calculated Column</text>

              <path d="M 515 125 L 575 125" stroke="#34d399" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="575,120 585,125 575,130" fill="#34d399" />

              <rect x="590" y="50" width="180" height="150" rx="12" fill="url(#m5_slicer_1)" stroke="#a78bfa" strokeWidth="2" />
              <text x="680" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">3. Dynamic Bounds</text>
              <text x="680" y="115" textAnchor="middle" fill="#ede9fe" fontSize="11">New Row Auto-Calculated</text>
              <text x="680" y="135" textAnchor="middle" fill="#ede9fe" fontSize="11">Vector Scope =SUM(tbl[Tax])</text>
              <text x="680" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="11" fontWeight="bold">Robust Scope</text>
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
            sheetName="EX102"
            title="Module 2.1 - Benefits of Tables: Structured References, Auto-Expansion & Built-In Filters"
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
                <h3 className="text-base font-bold text-white">Kolkata HR Payroll Tax Calculation</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Computing 18% GST tax deduction across 30 employee records using structured syntax.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Employee</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Structured_Formula</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Computed_Tax</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Swadeep Hui</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=[@Salary] * 0.18</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 8,100.00</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Calculated Column -&gt; Structured Syntax</div>
                <div className="text-emerald-400 font-semibold">Result: Automatic calculation across all rows.</div>
                <div className="text-slate-400 text-[11px]">Structured references evaluate current row context automatically.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Barrackpore Inventory Valuation Model</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Calculating total inventory value = Quantity * Unit Cost.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">SKU_ID</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Formula</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Total_Value</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">SKU-101</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=[@Qty] * [@Unit_Cost]</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 45,000.00</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Table Column Calculation</div>
                <div className="text-emerald-400 font-semibold">Result: Instant stock valuation.</div>
                <div className="text-slate-400 text-[11px]">Adding new SKUs auto-extends formula to new rows.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Wholesale Sales Margin Analysis</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Calculating gross profit margin percentage.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Item</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Formula_Applied</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Margin_Pct</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Laptop Pro</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=([@Selling_Price] - [@Cost]) / [@Selling_Price]</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">24.5%</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Percentage Calculation</div>
                <div className="text-emerald-400 font-semibold">Result: Calculated column updated for all inventory.</div>
                <div className="text-slate-400 text-[11px]">Format column as percentage once for all rows.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Ichapur Plant Machine Cost Audit</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Summing total equipment maintenance cost using column vector reference.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Table_Reference</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Formula</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Total_Cost</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">tblEquipment[Cost]</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(tblEquipment[Cost])</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 12,80,000.00</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Vector Reference =SUM(tbl[Column])</div>
                <div className="text-emerald-400 font-semibold">Result: Dynamic summary total.</div>
                <div className="text-slate-400 text-[11px]">Vector references expand automatically when new rows are added.</div>
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
                <h3 className="text-sm font-bold text-white">Click Target Cell in Table</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Click empty cell in new column inside Excel Table.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <h3 className="text-sm font-bold text-white">Type Formula with Column Headers</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Type '=' and click cell in same row to auto-insert [@ColumnName].
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <h3 className="text-sm font-bold text-white">Press Enter to Propagate</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Press Enter. Excel automatically fills the formula down all rows.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <h3 className="text-sm font-bold text-white">Verify Vector Aggregation</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Use =SUM(tblName[ColumnName]) in summary card to verify total.
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">#REF! Error in Structured Formula</td>
                  <td className="py-3 px-4 text-slate-300">Renamed column title was deleted or misspelled.</td>
                  <td className="py-3 px-4 text-amber-300">Check formula text for missing column name.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Re-select cell to re-insert correct [@ColumnName].</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Formula Shows Cell Reference A2 Instead of [@Column]</td>
                  <td className="py-3 px-4 text-slate-300">Table range converted back to normal range.</td>
                  <td className="py-3 px-4 text-amber-300">Check if table design tab is visible.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Re-convert range to Excel Table (Ctrl + T).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Spill Error in Structured Table Formula</td>
                  <td className="py-3 px-4 text-slate-300">Dynamic array formula typed inside structured table.</td>
                  <td className="py-3 px-4 text-amber-300">Check if formula returns array vector.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Use single-cell structured references [@Col] inside tables.</td>
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
                Ctrl + Space
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Select entire structured table column.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Shift + Space
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Select active structured table row.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                F2
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Edit structured reference formula.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Esc
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Cancel formula editing.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How do structured references make spreadsheet models resilient against column insertions?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">What is the exact syntax difference between current-row reference [@Salary] vs vector reference tblEmployees[Salary]?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why does Excel disallow dynamic spilling arrays inside structured table cells?</p>
            </div>
          </div>
        </section>

        {/* SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS) */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Benefits of Tables: Structured References & Auto-Expansion - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* SECTION 12: TEACHER'S NOTE & EXAM WISDOM */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            topicName="Benefits of Tables: Structured References, Auto-Expansion & Built-In Filters"
            noteTitle="Sukanta Hui's Master Mentor Guide"
            mentorAdvice="Always use structured references like [@Salary] * [@Tax_Rate] when modeling inside tables! Structured syntax makes your formulas self-documenting, eliminating cryptic cell coordinates!"
            note="Master structured table syntax! Learn the difference between current-row [@Col] and full-column Table[Col] vector references to build robust financial models!"
          />
        </div>
      </div>
    </div>
  );
}
