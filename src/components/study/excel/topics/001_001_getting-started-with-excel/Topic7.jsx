"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/getting_started_with_excel_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic7() {
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
              📊 Excel Foundations · Topic 7
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 3 & 4: Apply & Analyze
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Comprehensive Laboratory Practice Session: Basic Navigation, Interface Ergonomics and Grid Mechanics
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Hands-on capstone laboratory practice for Module 1.1: Integrate interface shortcuts, navigation traversal, formula bar expansions, custom status bar monitoring, and relative/absolute cell referencing across a comprehensive 50-row enterprise trading dataset.
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
            =SUM(D2:D50) + AVERAGE(E2:E50)
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Lab Goal</td>
                  <td className="py-3 px-4 text-teal-400">Integrated Practice</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Mandatory</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Perform end-to-end data entry, navigation, absolute referencing, and status bar auditing.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Dataset</td>
                  <td className="py-3 px-4 text-teal-400">50-Row Trading Ledger</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Practical</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Authentic multi-branch transaction register covering Barrackpore, Shyamnagar, and Kolkata.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Verification</td>
                  <td className="py-3 px-4 text-teal-400">Cross-Footing Audit</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Mandatory</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Reconcile vertical column sums with horizontal row sums to verify mathematical integrity.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Return Evaluation: </strong>
              Returns a <span className="text-sky-300 font-semibold">Integrated Laboratory Workbook</span> directly to the active cell coordinates.
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
            <p>Practical mastery of spreadsheet fundamentals requires combining keyboard navigation speed with absolute mathematical precision.</p>
            <p>Cross-footing (auditing the sum of row totals against the sum of column totals) is the golden rule of corporate accounting and MIS reporting.</p>
            <p>Building clean spreadsheet models requires establishing consistent formatting rules: Blue text for hardcoded inputs, Black text for calculated formulas, and Green text for external links.</p>
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
            Visual Calculation Flow: Comprehensive Practical Lab Architecture &amp; Workflow
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
            sheetName="Topic7_Practice_Session"
            title="Module 1.1 - Comprehensive Laboratory Practice Session: Basic Navigation, Interface Ergonomics and Grid Mechanics"
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
                <h3 className="text-base font-bold text-white">Naihati Trading Enterprise 50-Row Full Ledger Construction</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Students construct a multi-product sales ledger with quantity, unit price, gross sales, 18% GST ($B$1), and net revenue.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Item_No</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Product_Name</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Qty</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Unit_Price</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Gross_Sales</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">GST_18%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Net_Total</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">1</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Industrial Cable 100m</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">25</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">1,200</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=C2*D2</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=E2*$B$1</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=E2+F2</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">2</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Circuit Breaker 32A</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">40</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">450</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=C3*D3</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=E3*$B$1</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=E3+F3</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">3</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Distribution Box 8-Way</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">15</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">2,800</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=C4*D4</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=E4*$B$1</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=E4+F4</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Relative unit pricing + Absolute GST tax parameter referencing ($B$1)</div>
                <div className="text-emerald-400 font-semibold">Result: Complete 50-row ledger constructed and audited in under 5 minutes.</div>
                <div className="text-slate-400 text-[11px]">Combining relative row calculations with absolute tax anchors ensures scalable financial models.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Barrackpore Academy Cross-Footing Mathematical Integrity Check</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Verifying total revenue across 3 departments using horizontal and vertical sum checks.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Department</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Q1_Sales</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Q2_Sales</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Q3_Sales</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Q4_Sales</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Total_Dept</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Software Engg</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">145,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">168,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">152,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">189,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(B2:E2)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Taxation &amp; Accounts</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">180,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">195,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">210,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">225,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(B3:E3)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Total_Quarter</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(B2:B3)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(C2:C3)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(D2:D3)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(E2:E3)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUM(F2:F3)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Cross-Footing: =SUM(F2:F3) must equal =SUM(B4:E4)</div>
                <div className="text-emerald-400 font-semibold">Result: INR 1,464,000 verified from both vertical and horizontal summation axes.</div>
                <div className="text-slate-400 text-[11px]">Cross-footing guarantees that zero calculation errors exist in multidimensional tables.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Regional Supermarket Missing Entry Auto-Audit</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Using F5 Go To Special &amp;rarr; Blanks to find unbilled items in a 500-line daily register.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Auditing_Action</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Keystrokes_Used</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Detected_Anomalies</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Resolution</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Scan for Blanks</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">F5 &amp;rarr; Alt + S &amp;rarr; K &amp;rarr; Enter</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">14 missing price tags highlighted</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Filled with default wholesale MRP</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Go To Special Blanks Audit</div>
                <div className="text-emerald-400 font-semibold">Result: 14 unbilled records flagged and corrected prior to day-end settlement.</div>
                <div className="text-slate-400 text-[11px]">Keyboard auditing prevents revenue leakage in retail point-of-sale datasets.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Kolkata Branch Final Model Freezing &amp; Presentation Packaging</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Freezing top 3 header rows and locking column A so employee names remain visible during horizontal scrolling.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Freeze_Action</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Ribbon_Command</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Active_Cell_Position</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Viewport_Behavior</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Freeze Panes</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Alt + W + F + F</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Cell B4</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Rows 1-3 locked; Column A locked; Grid scrolls smoothly</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: View Tab &amp;rarr; Freeze Panes with cursor at B4</div>
                <div className="text-emerald-400 font-semibold">Result: Professional executive spreadsheet ready for board review.</div>
                <div className="text-slate-400 text-[11px]">Proper pane freezing enables effortless review of wide 50-column corporate financial models.</div>
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Cross-Footing Discrepancy</td>
                  <td className="py-3 px-4 text-slate-300">Inconsistent range selections in horizontal vs vertical totals (e.g. Missing a row in column sum).</td>
                  <td className="py-3 px-4 text-amber-300">Sum of row totals does not equal sum of column totals.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Use Ctrl + ` to verify all SUM ranges span identical bounding coordinates.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Incorrect Freeze Panes Split</td>
                  <td className="py-3 px-4 text-slate-300">Cursor was placed in cell A1 before clicking Freeze Panes, freezing an arbitrary viewport.</td>
                  <td className="py-3 px-4 text-amber-300">Wrong rows or columns remain locked during scrolling.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Click Unfreeze Panes, place cursor in cell B2 (or B4), and click Freeze Panes.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Hardcoded Overwrites in Formula Columns</td>
                  <td className="py-3 px-4 text-slate-300">A user typed a raw number over a formula in row 15, breaking the calculation chain.</td>
                  <td className="py-3 px-4 text-amber-300">Row 15 does not update when input quantities change.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Highlight formula column, press F5 &amp;rarr; Special &amp;rarr; Constants to spot rogue hardcoded numbers!</td>
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
                Alt + W + F + F
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Freeze Panes based on the current active cell position.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                F5 &amp;rarr; Special &amp;rarr; Formulas
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Highlight all formula cells across the sheet to audit calculation coverage.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                F5 &amp;rarr; Special &amp;rarr; Constants
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Highlight all hardcoded literal cells to verify no formulas were accidentally overwritten.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Home
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Reset active cursor to cell A1 before saving and sharing workbooks.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is cross-footing considered a mandatory internal control requirement in corporate auditing?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does using F5 &amp;rarr; Special &amp;rarr; Formulas vs Constants protect against rogue hardcoding?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">What is the visual difference between Freezing Panes vs Splitting a Window in the View tab?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Comprehensive Laboratory Practice Session: Basic Navigation, Interface Ergonomics and Grid Mechanics - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Congratulations on completing the laboratory lab! In the corporate world, an analyst who knows how to audit their own spreadsheets with cross-footing and Go To Special is valued 10x higher than one who simply types formulas. Always verify your totals from two independent directions!"
          />
        </div>
      </div>
    </div>
  );
}
