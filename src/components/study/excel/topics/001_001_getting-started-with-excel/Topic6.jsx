"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_001_getting_started_with_excel_master.xlsx?url";
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

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
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
            <p>The F4 shortcut key cycles through all 4 reference states: A1 → $A$1 → A$1 → $A1 → A1 in sequence.</p>
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
            sheetName="Topic6"
            title="Module 1.1 - Cell Referencing Fundamentals: Relative, Absolute ($), Mixed ($A1 vs A$1) and 3D Sheet References"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: COMPREHENSIVE CELL REFERENCING TYPES & REAL-WORLD SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-8"
        >
          {/* Part A: Master Reference Types Catalog */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">📚</span>
                  Complete Catalog: All 10 Types of Cell References with Examples &amp; Detailed Descriptions
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Comprehensive breakdown of every cell referencing mechanism in Microsoft Excel, including formula syntax, drag behavior, detailed description, and real-world enterprise applications.
                </p>
              </div>
              <span className="text-xs font-mono text-sky-300 bg-sky-950/80 px-3 py-1.5 rounded-full border border-sky-800 shrink-0 font-bold">
                10 Reference Types
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                    <th className="py-3.5 px-4 w-44">Reference Type</th>
                    <th className="py-3.5 px-4 w-36 font-mono">Syntax Pattern</th>
                    <th className="py-3.5 px-4 w-48 font-mono">Formula Example &amp; Drag Behavior</th>
                    <th className="py-3.5 px-4">Detailed Description &amp; Underlying Engine Behavior</th>
                    <th className="py-3.5 px-4 w-52">Real-World Business Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {/* 1. Relative */}
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 text-sky-300 font-bold font-sans">
                      1. Relative Reference
                      <span className="block text-[11px] text-slate-400 font-normal font-mono">Offset Vector</span>
                    </td>
                    <td className="py-3.5 px-4 text-amber-300 font-mono">A1</td>
                    <td className="py-3.5 px-4 font-mono text-xs space-y-1">
                      <div className="text-emerald-400">=B2 * C2 <span className="text-slate-400">(in D2)</span></div>
                      <div className="text-slate-400">&darr; Drag down →</div>
                      <div className="text-sky-300">=B3 * C3 <span className="text-slate-400">(in D3)</span></div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                      Default Excel referencing mode. Stores target address as a relative directional vector offset from the current active cell. Adjusts both column letter and row number automatically when copied or filled horizontally or vertically.
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-sans text-xs">
                      Itemized invoice line totals (Quantity &times; Unit Price), row-by-row expense subtotals.
                    </td>
                  </tr>

                  {/* 2. Absolute */}
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 text-sky-300 font-bold font-sans">
                      2. Absolute Reference
                      <span className="block text-[11px] text-slate-400 font-normal font-mono">Fixed Coordinate ($)</span>
                    </td>
                    <td className="py-3.5 px-4 text-amber-300 font-mono">$A$1</td>
                    <td className="py-3.5 px-4 font-mono text-xs space-y-1">
                      <div className="text-emerald-400">=C2 * $B$1 <span className="text-slate-400">(in D2)</span></div>
                      <div className="text-slate-400">&darr; Drag down →</div>
                      <div className="text-sky-300">=C3 * $B$1 <span className="text-slate-400">(in D3)</span></div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                      Locks both column letter ($A) and row number ($1) using dollar sign ($) anchor tokens. Remains 100% frozen to the exact coordinate regardless of where the formula is moved or copied. Cycle using shortcut key <kbd className="px-1 py-0.5 bg-slate-800 rounded font-mono text-[10px]">F4</kbd>.
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-sans text-xs">
                      Universal assumption drivers: fixed 18% GST tax rate, corporate interest benchmark, USD/INR conversion rate.
                    </td>
                  </tr>

                  {/* 3. Mixed Column Locked */}
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 text-sky-300 font-bold font-sans">
                      3. Mixed Reference (Column Locked)
                      <span className="block text-[11px] text-slate-400 font-normal font-mono">Frozen Column ($A1)</span>
                    </td>
                    <td className="py-3.5 px-4 text-amber-300 font-mono">$A1</td>
                    <td className="py-3.5 px-4 font-mono text-xs space-y-1">
                      <div className="text-emerald-400">=$A2 * B$1 <span className="text-slate-400">(in B2)</span></div>
                      <div className="text-slate-400">→ Drag right →</div>
                      <div className="text-sky-300">=$A2 * C$1 <span className="text-slate-400">(in C2)</span></div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                      Freezes Column A ($A) while allowing Row number (1) to adjust relatively when dragged vertically down rows. Ideal when baseline category labels or unit costs reside strictly in Column A.
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-sans text-xs">
                      2D multiplication tables, product pricing grids where product base cost is fixed in Column A.
                    </td>
                  </tr>

                  {/* 4. Mixed Row Locked */}
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 text-sky-300 font-bold font-sans">
                      4. Mixed Reference (Row Locked)
                      <span className="block text-[11px] text-slate-400 font-normal font-mono">Frozen Row (A$1)</span>
                    </td>
                    <td className="py-3.5 px-4 text-amber-300 font-mono">A$1</td>
                    <td className="py-3.5 px-4 font-mono text-xs space-y-1">
                      <div className="text-emerald-400">=$A2 * B$1 <span className="text-slate-400">(in B2)</span></div>
                      <div className="text-slate-400">&darr; Drag down →</div>
                      <div className="text-sky-300">=$A3 * B$1 <span className="text-slate-400">(in B3)</span></div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                      Freezes Row number ($1) while allowing Column letter (A) to adjust relatively when dragged horizontally across columns. Essential when parameter headers or percentage rates reside in Row 1.
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-sans text-xs">
                      Multi-column volume discount tables, annual growth projection headers residing in Row 1.
                    </td>
                  </tr>

                  {/* 5. 3D Cross-Sheet */}
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 text-sky-300 font-bold font-sans">
                      5. 3D Cross-Sheet Reference
                      <span className="block text-[11px] text-slate-400 font-normal font-mono">Multi-Tab Stack</span>
                    </td>
                    <td className="py-3.5 px-4 text-amber-300 font-mono">'Sheet1:Sheet4'!A1</td>
                    <td className="py-3.5 px-4 font-mono text-xs space-y-1">
                      <div className="text-emerald-400">=SUM('Q1:Q4'!B5)</div>
                      <div className="text-slate-400">&uarr; Consolidate 4 Tabs &uarr;</div>
                      <div className="text-sky-300">Sum of B5 across Q1..Q4</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                      Refers to the same cell coordinate across a contiguous range of multiple stacked worksheets. Automatically incorporates any new worksheets inserted physically between the start and end boundary tabs.
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-sans text-xs">
                      Annual corporate consolidation (summing Q1, Q2, Q3, Q4 tabs into Annual Summary tab).
                    </td>
                  </tr>

                  {/* 6. External Linked Workbook */}
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 text-sky-300 font-bold font-sans">
                      6. External Reference (Linked File)
                      <span className="block text-[11px] text-slate-400 font-normal font-mono">Inter-Workbook Link</span>
                    </td>
                    <td className="py-3.5 px-4 text-amber-300 font-mono">'[Book.xlsx]Sheet'!$A$1</td>
                    <td className="py-3.5 px-4 font-mono text-xs space-y-1">
                      <div className="text-emerald-400 font-mono text-[11px]">='[2026_Audit.xlsx]Tax'!$E$5</div>
                      <div className="text-slate-400">&harr; Linked File Reference &harr;</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                      Links formulas to cells inside an external saved Excel file. Stores a cached value when the source workbook is closed, and prompts to update links when opened. Includes file name in square brackets.
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-sans text-xs">
                      Executive reporting dashboards linking to monthly departmental ledger files on network drives.
                    </td>
                  </tr>

                  {/* 7. Structured Table Reference */}
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 text-sky-300 font-bold font-sans">
                      7. Structured Table Reference
                      <span className="block text-[11px] text-slate-400 font-normal font-mono">ListObject Field Specifier</span>
                    </td>
                    <td className="py-3.5 px-4 text-amber-300 font-mono">Table1[Column] / [@Col]</td>
                    <td className="py-3.5 px-4 font-mono text-xs space-y-1">
                      <div className="text-emerald-400">=[@UnitPrice] * [@Qty]</div>
                      <div className="text-sky-300">=SUM(SalesTable[Amount])</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                      Uses human-readable column header names inside formatted Excel Tables (<kbd className="px-1 py-0.5 bg-slate-800 rounded font-mono text-[10px]">Ctrl+T</kbd>). Automatically expands formula scope dynamically when new data rows are appended.
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-sans text-xs">
                      Modern Excel data models, automated HR inventory lists, self-expanding transaction tables.
                    </td>
                  </tr>

                  {/* 8. Named Range Reference */}
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 text-sky-300 font-bold font-sans">
                      8. Named Range Reference
                      <span className="block text-[11px] text-slate-400 font-normal font-mono">Defined Name (Name Manager)</span>
                    </td>
                    <td className="py-3.5 px-4 text-amber-300 font-mono">Global_Tax_Rate</td>
                    <td className="py-3.5 px-4 font-mono text-xs space-y-1">
                      <div className="text-emerald-400">=Subtotal * Corporate_Tax</div>
                      <div className="text-slate-400">(Points to $B$1 globally)</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                      Replaces abstract grid coordinates with meaningful text labels created via Name Manager (<kbd className="px-1 py-0.5 bg-slate-800 rounded font-mono text-[10px]">Ctrl+F3</kbd>). Evaluates with absolute behavior and drastically improves formula readability and auditability.
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-sans text-xs">
                      Financial modeling assumptions, hurdle rate benchmarks, central currency exchange constants.
                    </td>
                  </tr>

                  {/* 9. Dynamic Array Spill Reference */}
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 text-sky-300 font-bold font-sans">
                      9. Dynamic Array Spill Reference
                      <span className="block text-[11px] text-slate-400 font-normal font-mono">Spill Operator (#)</span>
                    </td>
                    <td className="py-3.5 px-4 text-amber-300 font-mono">A2#</td>
                    <td className="py-3.5 px-4 font-mono text-xs space-y-1">
                      <div className="text-emerald-400">=SUM(A2#)</div>
                      <div className="text-slate-400">(Where A2 contains =UNIQUE(..))</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                      Introduced in modern Excel (365 / 2021). The hash symbol (<code className="text-sky-300 font-mono">#</code>) appended to a cell coordinate references the entire dynamic array spilled from that anchor cell. Automatically contracts or expands.
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-sans text-xs">
                      Dynamic dependent dropdown lists, live filtered dashboard totals, dynamic unique customer summaries.
                    </td>
                  </tr>

                  {/* 10. Circular Reference */}
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 text-sky-300 font-bold font-sans">
                      10. Circular Reference
                      <span className="block text-[11px] text-slate-400 font-normal font-mono">Self-Referential Loop</span>
                    </td>
                    <td className="py-3.5 px-4 text-amber-300 font-mono">A1 = A1 + 1</td>
                    <td className="py-3.5 px-4 font-mono text-xs space-y-1">
                      <div className="text-rose-400">=B10 + 5 <span className="text-slate-400">(in cell B10)</span></div>
                      <div className="text-amber-400">Triggers Warning Dialog</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                      Occurs when a formula directly or indirectly depends on its own cell's output value. Causes a warning dialog unless Iterative Calculation is enabled in Excel Options (File → Options → Formulas).
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-sans text-xs">
                      Corporate debt interest modeling (interest expense depends on cash balance, which depends on interest expense).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Part B: 20 Real-World Business Scenarios Table */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
                  20 Real-World Business Scenarios: Cell Referencing &amp; Coordinate System Applications
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Practical enterprise scenarios detailing Relative, Absolute ($), Mixed ($A1 vs A$1), 3D Sheet, Structured Table, and Dynamic Spill reference implementations.
                </p>
              </div>
              <span className="text-xs font-mono text-amber-300 bg-amber-950/80 px-3 py-1.5 rounded-full border border-amber-800 shrink-0 font-bold">
                20 Case Studies
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                    <th className="py-3 px-3 w-16">ID</th>
                    <th className="py-3 px-3">Business Application</th>
                    <th className="py-3 px-3">Cell Reference Type</th>
                    <th className="py-3 px-3">Applied Formula Logic</th>
                    <th className="py-3 px-3">Target Cell Behavior</th>
                    <th className="py-3 px-3">Key Technical Benefit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-101</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Kolkata CA Staff Payroll Model</td>
                    <td className="py-2.5 px-3 text-sky-300">Absolute Reference ($A$1)</td>
                    <td className="py-2.5 px-3 text-amber-300">=C2 * $B$1</td>
                    <td className="py-2.5 px-3 text-emerald-400">Parameter $B$1 Locked</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Locks fixed 18% GST tax rate across 5,000 employee salary rows.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-102</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Barrackpore Retail 2D Price Matrix</td>
                    <td className="py-2.5 px-3 text-sky-300">Mixed Reference ($A1 &amp; A$1)</td>
                    <td className="py-2.5 px-3 text-amber-300">=$A2 * B$1</td>
                    <td className="py-2.5 px-3 text-emerald-400">Dual-Axis Grid Lock</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Populates 100-cell price matrix using a single copied formula.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-103</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Shyamnagar Corporate HQ Financials</td>
                    <td className="py-2.5 px-3 text-sky-300">3D Cross-Sheet Range</td>
                    <td className="py-2.5 px-3 text-amber-300">=SUM('Q1:Q4'!B5)</td>
                    <td className="py-2.5 px-3 text-emerald-400">Stacked Tabs Aggregation</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Aggregates revenue across Q1 to Q4 quarterly sheets seamlessly.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-104</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Salt Lake SaaS Board Reporting</td>
                    <td className="py-2.5 px-3 text-sky-300">External Linked Workbook</td>
                    <td className="py-2.5 px-3 text-amber-300">='[2026_Rev.xlsx]SaaS'!$C$10</td>
                    <td className="py-2.5 px-3 text-emerald-400">Inter-File Reference</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Links executive presentation slides directly to monthly audit workbooks.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-105</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Titagarh Jute Mill HR Database</td>
                    <td className="py-2.5 px-3 text-sky-300">Structured Table Specifier</td>
                    <td className="py-2.5 px-3 text-amber-300">=[@BasicPay] * [@DA_Rate]</td>
                    <td className="py-2.5 px-3 text-emerald-400">Auto-Expanding Column</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Self-documents formulas and auto-calculates when new rows are added.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-106</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Naihati Pharmacy GST Billing</td>
                    <td className="py-2.5 px-3 text-sky-300">Named Range Reference</td>
                    <td className="py-2.5 px-3 text-amber-300 font-sans">=BillAmount * Tax_Slab_A</td>
                    <td className="py-2.5 px-3 text-emerald-400">Name Manager Scope</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Replaces cryptic cell coordinates with human-readable tax variables.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-107</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Sodepur Store Inventory Summary</td>
                    <td className="py-2.5 px-3 text-sky-300">Dynamic Array Spill (#)</td>
                    <td className="py-2.5 px-3 text-amber-300">=SUM(E2#)</td>
                    <td className="py-2.5 px-3 text-emerald-400">Variable Range Spill</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Automatically resizes summation range as filtered array size shifts.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-108</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Howrah Logistics Credit Facility</td>
                    <td className="py-2.5 px-3 text-sky-300">Circular Iterative Loop</td>
                    <td className="py-2.5 px-3 text-amber-300">=B12 + Line_Of_Credit</td>
                    <td className="py-2.5 px-3 text-emerald-400">Iterative Convergence</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Solves cash-debt interest circularity in corporate treasury modeling.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-109</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Durgapur Steel Stock Inventory</td>
                    <td className="py-2.5 px-3 text-sky-300">Relative Reference (A1)</td>
                    <td className="py-2.5 px-3 text-amber-300">=C2 - D2</td>
                    <td className="py-2.5 px-3 text-emerald-400">Row Vector Shift</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Calculates net available stock per SKU dynamically on drag-fill.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-110</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Asansol Power Tariff Escalation</td>
                    <td className="py-2.5 px-3 text-sky-300">Mixed Column Lock ($A1)</td>
                    <td className="py-2.5 px-3 text-amber-300">=$A5 * 1.10</td>
                    <td className="py-2.5 px-3 text-emerald-400">Column A Pinned</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Locks base tariff in Column A while applying annual 10% inflation.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-111</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Siliguri Tea Yield Forecasting</td>
                    <td className="py-2.5 px-3 text-sky-300">Mixed Row Lock (A$1)</td>
                    <td className="py-2.5 px-3 text-amber-300">=B$2 * C5</td>
                    <td className="py-2.5 px-3 text-emerald-400">Row 2 Header Pinned</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Pins seasonal weather multiplier header in Row 2 across block rows.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-112</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Haldia Petrochem Multi-Plant Audit</td>
                    <td className="py-2.5 px-3 text-sky-300">3D Average Range</td>
                    <td className="py-2.5 px-3 text-amber-300">=AVERAGE('Plant1:Plant5'!D12)</td>
                    <td className="py-2.5 px-3 text-emerald-400">Multi-Sheet Mean</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Computes mean chemical yield across 5 regional plant worksheets.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-113</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Malda Fruit FX Export Pricing</td>
                    <td className="py-2.5 px-3 text-sky-300">External Absolute Link</td>
                    <td className="py-2.5 px-3 text-amber-300">='[FX_Rates.xlsx]Daily'!$B$3</td>
                    <td className="py-2.5 px-3 text-emerald-400">Live Forex Lock</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Converts Rupee prices into USD based on external daily Forex workbook.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-114</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Midnapore Hospital Receipts</td>
                    <td className="py-2.5 px-3 text-sky-300">Structured Table Column Total</td>
                    <td className="py-2.5 px-3 text-amber-300">=SUM(PatientData[BillAmount])</td>
                    <td className="py-2.5 px-3 text-emerald-400">Column Scope Lock</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Sums entire patient billing column without selecting grid coordinates.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-115</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Kharagpur Tech Merit Scholarships</td>
                    <td className="py-2.5 px-3 text-sky-300">Named Range Formula</td>
                    <td className="py-2.5 px-3 text-amber-300 font-sans">=TuitionFee * Merit_Discount</td>
                    <td className="py-2.5 px-3 text-emerald-400">Global Variable Scope</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Calculates student net fees using centrally managed discount constants.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-116</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Hooghly Paper Mill Client Roster</td>
                    <td className="py-2.5 px-3 text-sky-300">Dynamic Array Spill (#)</td>
                    <td className="py-2.5 px-3 text-amber-300">=UNIQUE(Orders[Customer])#</td>
                    <td className="py-2.5 px-3 text-emerald-400">Dynamic List Array</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Generates auto-updating unique client list spilt down active column.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-117</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Burdwan Seed Fertilizer Calculator</td>
                    <td className="py-2.5 px-3 text-sky-300">Mixed Reference ($B4*C$3)</td>
                    <td className="py-2.5 px-3 text-amber-300">=$B4 * C$3</td>
                    <td className="py-2.5 px-3 text-emerald-400">Crop-Soil Matrix Lock</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Computes dosage across 50 crop rows and 10 soil type columns.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-118</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Purulia Solar Power Generation</td>
                    <td className="py-2.5 px-3 text-sky-300">3D Sheet Average</td>
                    <td className="py-2.5 px-3 text-amber-300">=AVERAGE('Jan:Dec'!E8)</td>
                    <td className="py-2.5 px-3 text-emerald-400">12-Month Depth Average</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Calculates mean kWh generation across 12 monthly log sheets.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-119</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Bankura Handicrafts Margin Analysis</td>
                    <td className="py-2.5 px-3 text-sky-300">Relative Reference (A1)</td>
                    <td className="py-2.5 px-3 text-amber-300">=(B2 - C2) / B2</td>
                    <td className="py-2.5 px-3 text-emerald-400">Line-Item Margin Offset</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Evaluates profit margin percentage per artisan item when dragged down.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-amber-400 font-bold">CR-120</td>
                    <td className="py-2.5 px-3 text-white font-sans font-medium">Raniganj Coal Treasury Liquidity</td>
                    <td className="py-2.5 px-3 text-sky-300">Iterative Circular Model</td>
                    <td className="py-2.5 px-3 text-amber-300">=Closing_Cash + Revolver_Draw</td>
                    <td className="py-2.5 px-3 text-emerald-400">Feedback Loop Solver</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">Computes dynamic revolving credit line balances based on cash needs.</td>
                  </tr>
                </tbody>
              </table>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Cycle active cell reference through: A1 → $A$1 → A$1 → $A1 → A1.</p>
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
