"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/getting_started.xlsx?url";
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
              📊 Excel Foundations · Topic 6
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 & 3: Understand & Apply
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Cell Referencing Fundamentals: Relative, Absolute ($), Mixed ($A1 vs A$1) and 3D Sheet References
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master the mathematical cornerstone of spreadsheet calculation: Relative referencing (A1), Absolute referencing ($A$1), Mixed column/row freezing ($A1 vs A$1), and 3D cross-sheet references. Learn how formulas adapt dynamically during drag-fill operations.
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
            =A1 + $B$1 + $C1 + D$1
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Relative (A1)</td>
                  <td className="py-3 px-4 text-teal-400">Offset Vector</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Default</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Row and column shift automatically by the exact offset distance when copied/dragged.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Absolute ($A$1)</td>
                  <td className="py-3 px-4 text-teal-400">Fixed Coordinate</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Frozen</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Both column letter and row number are locked with '$'. Remains fixed wherever copied.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Mixed ($A1 / A$1)</td>
                  <td className="py-3 px-4 text-teal-400">Half-Locked</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Hybrid</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">$A1 freezes Column A while row changes; A$1 freezes Row 1 while column changes.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Return Evaluation: </strong>
              Returns a <span className="text-sky-300 font-semibold">Calculated Value / Dynamic Coordinate Reference</span> directly to the active cell coordinates.
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
            <p>Under the hood, Excel stores relative references as vector offsets (e.g. 'same row, 2 columns to the left') rather than hardcoded coordinate strings.</p>
            <p>The dollar sign ($) is an anchor token that instructs the formula compiler to treat that specific coordinate dimension as an absolute index rather than a relative offset.</p>
            <p>The F4 shortcut key cycles through all 4 reference states: A1 &amp;rarr; $A$1 &amp;rarr; A$1 &amp;rarr; $A1 &amp;rarr; A1 in sequence.</p>
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
            Visual Calculation Flow: Relative vs Absolute ($) Vector Offset Mechanics
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
            sheetName="Topic6_Cell_References"
            title="Module 1.1 - Cell Referencing Fundamentals: Relative, Absolute ($), Mixed ($A1 vs A$1) and 3D Sheet References"
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
                <h3 className="text-base font-bold text-white">Coder &amp; AccoTax Barrackpore Staff Payroll Model with Fixed GST Rate</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Calculating 18% GST and 40% HRA on employee salaries referencing fixed parameter cells.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Emp_ID</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Employee_Name</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Basic_Salary</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">HRA_Formula (Fixed 40% in $B$1)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">GST_Formula (Fixed 18% in $B$2)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">EMP-2001</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Swadeep</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">45,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=C2*$B$1</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=C2*$B$2</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">EMP-2002</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Tuhina</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">52,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=C3*$B$1</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=C3*$B$2</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">EMP-2003</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Abhronila</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">38,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=C4*$B$1</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=C4*$B$2</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Formula: =C2*$B$1 copied down</div>
                <div className="text-emerald-400 font-semibold">Result: Relative cell C2 shifts to C3, C4; Parameter $B$1 remains securely locked.</div>
                <div className="text-slate-400 text-[11px]">Absolute referencing ($) prevents parameter drift when formulas are dragged down hundreds of rows.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Kolkata Retail 10x10 Price Multiplier Table (Mixed Referencing)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Building a 2D matrix multiplying product base prices (Column A) by quantity discounts (Row 1).</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Base_Price</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Qty: 10 (B$1)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Qty: 20 (C$1)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Qty: 50 (D$1)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Item A ($A2: 500)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=$A2*B$1 (5,000)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=$A2*C$1 (10,000)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=$A2*D$1 (25,000)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Item B ($A3: 800)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=$A3*B$1 (8,000)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=$A3*C$1 (16,000)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=$A3*D$1 (40,000)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Single Formula: =$A2*B$1 copied across entire 10x10 grid</div>
                <div className="text-emerald-400 font-semibold">Result: 100 table cells populated correctly using 1 formula without manual adjustments.</div>
                <div className="text-slate-400 text-[11px]">Mixed referencing ($A2 locks column, B$1 locks row) enables multi-dimensional matrix modeling.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Multi-Branch 3D Cross-Sheet Consolidation</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Summing total revenue across 4 quarterly sheets (Q1, Q2, Q3, Q4) into an Annual Master sheet.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Consolidation_Cell</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Formula_Applied</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Source_Sheets</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Calculated_Metric</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Master!B5</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(Q1:Q4!B5)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Q1, Q2, Q3, Q4</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sum of revenue across all 4 quarters</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: =SUM('Q1:Q4'!B5)</div>
                <div className="text-emerald-400 font-semibold">Result: Accurate corporate annual total consolidated across all quarterly tabs.</div>
                <div className="text-slate-400 text-[11px]">3D referencing sums identical 2D coordinates across a physical stack of worksheet tabs.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Ichapur Machinery Depreciation with Fixed Scrap Value</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Computing straight-line depreciation where asset cost is relative but scrap value and life are absolute.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Asset_ID</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Cost (Relative)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Scrap_Val ($E$1)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Life_Years ($E$2)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Annual_Depreciation</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">MCH-01</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">250,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">25,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">10</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=(B2-$E$1)/$E$2</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">MCH-02</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">420,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">25,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">10</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=(B3-$E$1)/$E$2</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: =(B2-$E$1)/$E$2 copied down</div>
                <div className="text-emerald-400 font-semibold">Result: Annual depreciation calculated accurately for all machinery assets.</div>
                <div className="text-slate-400 text-[11px]">Combining relative and absolute coordinates allows building standardized accounting amortization models.</div>
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Formula Drift / #VALUE! on Drag Down</td>
                  <td className="py-3 px-4 text-slate-300">Forgetting to lock the tax rate parameter cell (e.g. writing =C2*B1 instead of =C2*$B$1).</td>
                  <td className="py-3 px-4 text-amber-300">First row calculates correctly, but row 2 multiplies by cell B2 (a text label), yielding #VALUE! or 0.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Select parameter coordinate B1 and press F4 to add dollar signs ($B$1).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Accidental Absolute Locking in Matrices</td>
                  <td className="py-3 px-4 text-slate-300">Using $A$1 instead of $A1 or A$1 in 2D lookup or multiplication tables.</td>
                  <td className="py-3 px-4 text-amber-300">All table cells display identical values because coordinates cannot shift.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Press F4 to cycle to the proper mixed reference state ($A1 or A$1).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">#REF! After Deleting Source Cells</td>
                  <td className="py-3 px-4 text-slate-300">Physically deleting a row or column that is referenced by an absolute formula.</td>
                  <td className="py-3 px-4 text-amber-300">Formula changes to =#REF!*$B$1.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Avoid deleting referenced cells; clear contents or update formula dependencies first.</td>
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
                F4
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Cycle active cell reference through: A1 &amp;rarr; $A$1 &amp;rarr; A$1 &amp;rarr; $A1 &amp;rarr; A1.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + D
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Fill Down: Copy formula and formatting from cell directly above to selected cells.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + R
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Fill Right: Copy formula and formatting from cell directly to the left to selected cells.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + [
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Trace Precedents: Jump directly to the cell(s) referenced by the active formula.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why does Excel use offset vectors internally rather than hardcoded coordinate strings for relative formulas?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does cutting and pasting a formula preserve exact cell addresses while copying and pasting adjusts them?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">In a 3D sheet reference =SUM(Sheet1:Sheet3!A1), what happens when a new sheet is inserted between Sheet1 and Sheet3?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Cell Referencing Fundamentals: Relative, Absolute ($), Mixed ($A1 vs A$1) and 3D Sheet References - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="The F4 key is your best friend in financial modeling! Never type dollar signs manually. Position your cursor on the cell reference and tap F4 until you reach the exact reference mode you need. Always test your formulas by dragging 2 rows down and checking the formula bar!"
          />
        </div>
      </div>
    </div>
  );
}
