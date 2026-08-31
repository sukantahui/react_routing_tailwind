"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_003_basic_formulas_and_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic8() {
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
              ⚡ Formulas & Math · Topic 8
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 1 & 2: Remember & Understand
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Quick Check Quiz: Core Mathematical Functions, BODMAS &amp; Aggregation Foundations
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Final foundational checkpoint quiz for Module 1.3: Consolidate your mathematical formula reflexes, BODMAS precedence mastery, aggregation functions (SUM/AVERAGE/COUNT), ranking (LARGE/SMALL), and rounding precision control before advancing to Module 1.4 (Basic Charts and Visualizations).
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
            =QUIZ_SCORE(Module_1_3)
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Checkpoint</td>
                  <td className="py-3 px-4 text-teal-400">Final Quiz</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Mandatory</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Verify complete mastery across all Module 1.3 mathematical formula topics.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Next Step</td>
                  <td className="py-3 px-4 text-teal-400">Module 1.4 Unlock</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Progression</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Advance to Basic Charts: Column, Bar, Line, Pie, Formatting, and Visual Ergonomics.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Mentorship</td>
                  <td className="py-3 px-4 text-teal-400">Teacher Advice</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Guidance</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Pedagogical advice and exam memory tips from instructor Sukanta Hui.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Return Evaluation: </strong>
              Returns a <span className="text-sky-300 font-semibold">Final Module 1.3 Mastery Evaluation</span> directly to the active cell coordinate.
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
            <p>Formulas are the computational engine of Microsoft Excel. With a rock-solid foundation in BODMAS, absolute referencing, aggregation, and rounding, you are now equipped to build professional financial models.</p>
            <p>The next step is visual communication: transforming raw numbers into compelling, executive-ready charts and visual dashboards in Module 1.4.</p>
            <p>Review the comprehensive FAQ and Teacher's Note below to finalize your Module 1.3 certification milestone.</p>
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
            Visual Calculation Flow: Module 1.3 Graduation &amp; Pathway to Visualizations &amp; Analytics
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
            sheetName="Topic8"
            title="Module 1.3 - Quick Check Quiz: Core Mathematical Functions, BODMAS &amp; Aggregation Foundations"
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
                <h3 className="text-base font-bold text-white">Graduation Assessment: Advancing from Module 1.3 to Module 1.4</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Coder &amp; AccoTax students transition from mathematical formulas to visual charts and graphs.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Module_1_3_Skill_Mastered</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Mathematical_Outcome</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Module_1_4_Target_Chart</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Aggregation (SUM, AVERAGE)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Monthly sales totals &amp; averages</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Column &amp; Bar Charts</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Time-Series Math (YoY Growth)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Trend percentage calculations</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Line &amp; Area Charts</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Part-to-Whole Ratios (Proportions)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Category percentage breakdowns</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Pie &amp; Doughnut Charts</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Module 1.3 Certification Milestone</div>
                <div className="text-emerald-400 font-semibold">Result: Ready for advanced business data visualization.</div>
                <div className="text-slate-400 text-[11px]">Accurate formulas produce the clean aggregated datasets required for high-impact charts.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Barrackpore Corporate Placement Technical Demonstration</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">A student demonstrates instant 2D Matrix AutoSum and mathematical formula authoring.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Demonstration_Task</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Time_Taken</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Recruiter_Verdict</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">2D Matrix AutoSum (Rows &amp; Cols)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">0.1 seconds (Alt + =)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Outstanding Practical Fluency</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Top 3 Sales Leaderboard with LARGE</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">10 seconds</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Immediate Job Placement Offer</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Speed Ergonomics Execution</div>
                <div className="text-emerald-400 font-semibold">Result: Selected for Financial Analyst role.</div>
                <div className="text-slate-400 text-[11px]">Instant execution of mathematical shortcuts demonstrates true professional capability.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Corporate Multi-Branch Model Final Quality Sign-Off</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Auditing a 12-month multi-department financial model for cross-footing balance.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">QC_Step</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Verification_Method</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Status</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Cross-Footing Audit</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Row Sums vs Column Sums</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">100% Balanced (Zero Error)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Statutory Rounding Check</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=ROUND(tax, 2)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">100% Verified</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Comprehensive Quality Assurance</div>
                <div className="text-emerald-400 font-semibold">Result: Audited financial model certified for corporate board review.</div>
                <div className="text-slate-400 text-[11px]">Systematic auditing guarantees 100% mathematical integrity.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Kolkata Auditing Quality Control Sign-Off</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Final verification that zero hardcoded text strings exist in calculation columns.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">QC_Step</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Verification_Method</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Status</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Formula Coverage</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">F5 → Special → Formulas</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">100% Dynamic Formulas</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Error Check</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Status Bar / Formulas → Error Checking</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">0 #DIV/0! or #VALUE! Errors</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Automated QA Verification</div>
                <div className="text-emerald-400 font-semibold">Result: Flawless mathematical workbook approved.</div>
                <div className="text-slate-400 text-[11px]">Quality assurance ensures robust model operation.</div>
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Hardcoding Calculations in Calculator</td>
                  <td className="py-3 px-4 text-slate-300">Typing numbers calculated on an external phone calculator into cells.</td>
                  <td className="py-3 px-4 text-amber-300">Data does not update when inputs change.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Always write dynamic formulas in Excel so calculations update automatically.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Ignoring Operator Precedence</td>
                  <td className="py-3 px-4 text-slate-300">Writing formulas without brackets and trusting default math.</td>
                  <td className="py-3 px-4 text-amber-300">Math errors in complex profit and tax calculations.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Always use explicit brackets to control evaluation order.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Unprotected Parameter Cells</td>
                  <td className="py-3 px-4 text-slate-300">Leaving tax rate cells editable by general users.</td>
                  <td className="py-3 px-4 text-amber-300">Accidental overwrite corrupts all downstream calculations.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Lock parameter cells and protect worksheet with password.</td>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">AutoSum shortcut.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + `
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Toggle Formula View mode.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                F9
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Evaluate highlighted expression.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Shift + %
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Percentage format.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does mastering BODMAS precedence prevent multi-million-dollar financial model errors?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is cross-footing considered the ultimate internal control in accounting?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How will the aggregation and ranking functions learned in this module empower you when creating visual charts in Module 1.4?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Quick Check Quiz: Core Mathematical Functions, BODMAS &amp; Aggregation Foundations - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Bravo! You have mastered Module 1.3: Basic Formulas and Functions. You now possess the computational foundation of a professional financial modeler: BODMAS mastery, aggregation fluency, ranking intelligence, and mathematical precision control. Let us advance to Module 1.4: Basic Charts and Visualizations!"
          />
        </div>
      </div>
    </div>
  );
}
