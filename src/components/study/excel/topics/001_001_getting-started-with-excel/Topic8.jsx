"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/getting_started.xlsx?url";
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
              📊 Excel Foundations · Topic 8
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 1 & 2: Remember & Understand
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Practice Multiple Choice Questions (MCQ): Comprehensive Interface &amp; Navigation Mastery
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Test your theoretical and practical comprehension across all foundational concepts of Microsoft Excel: Interface architecture, Ribbon systems, 2D Cartesian grid limits, file formats (.xlsx, .xlsm, .xlsb), keyboard traversal, and cell referencing.
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
            =MCQ_EVALUATION(Q1:Q30)
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">30 Questions</td>
                  <td className="py-3 px-4 text-teal-400">Structured MCQ</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Assessment</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">In-depth questions testing interface, navigation, file formats, and formulas.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Explanations</td>
                  <td className="py-3 px-4 text-teal-400">Deep Rationale</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Pedagogical</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Comprehensive conceptual explanation for every question option.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Teacher Wisdom</td>
                  <td className="py-3 px-4 text-teal-400">Exam Hook</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Exam Tip</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Practical industry memory hooks from instructor Sukanta Hui.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Return Evaluation: </strong>
              Returns a <span className="text-sky-300 font-semibold">Self-Assessment Knowledge Score</span> directly to the active cell coordinates.
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
            <p>Regular retrieval practice solidifies cognitive pathways for keyboard shortcuts and spreadsheet architecture.</p>
            <p>Understanding the exact mechanics behind grid limits, OpenXML containers, and calculation chains prepares students for Microsoft Office Specialist (MOS) and corporate MIS certification exams.</p>
            <p>Review both the short answer and deep explanation for every question to identify subtle edge-case behaviors.</p>
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
            Visual Calculation Flow: Diagnostic Assessment &amp; Skill Competency Matrix
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
            sheetName="Topic0_Excel_Overview"
            title="Module 1.1 - Practice Multiple Choice Questions (MCQ): Comprehensive Interface &amp; Navigation Mastery"
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
                <h3 className="text-base font-bold text-white">MOS Certification Exam Preparation Scenario</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">A student prepares for the Microsoft Office Specialist Excel Associate examination.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Domain_Area</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Topic_Coverage</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Target_Score</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Readiness_Check</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Manage Worksheets &amp; Workbooks</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Creating, Saving (.xlsx/.xlsb), Tab Naming</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">100%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Mastered</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Navigate Cells &amp; Ranges</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Ctrl+Arrows, Name Box, Go To Special</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">100%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Mastered</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Formulas &amp; Referencing</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Relative, Absolute ($), Mixed ($A1/A$1)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">100%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Mastered</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Complete 30 Structured FAQ Questions below</div>
                <div className="text-emerald-400 font-semibold">Result: 100% readiness for corporate MIS interviews.</div>
                <div className="text-slate-400 text-[11px]">Comprehensive MCQ practice ensures thorough theoretical and practical grounding.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Corporate MIS Executive Technical Interview Screening</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">A multinational company tests candidates on spreadsheet memory models and shortcuts.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Interview_Question</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Weak_Answer</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Elite_Mastery_Answer</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">What is the row limit in Excel?</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">'Around 10 lakh rows'</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Exactly 1,048,576 rows (2^20) and 16,384 columns (2^14, XFD)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Why use .xlsb instead of .xlsx?</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">'It is another format'</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Stores binary streams directly, cutting file size by 50% and load times by 3x</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Mastery of Technical Specifications</div>
                <div className="text-emerald-400 font-semibold">Result: Candidate passes technical interview with distinction.</div>
                <div className="text-slate-400 text-[11px]">Precise technical vocabulary separates amateur spreadsheet users from certified professionals.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Auditing Firm Junior Accountant Onboarding Check</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">New trainees are assessed on finding hidden formula errors before touching live client books.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Audit_Task</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Shortcut_Applied</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Time_Taken</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Show all formulas</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Ctrl + `</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">1 second</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Find uncalculated constants in formula columns</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">F5 &amp;rarr; Special &amp;rarr; Constants</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">2 seconds</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Keyboard-driven error detection</div>
                <div className="text-emerald-400 font-semibold">Result: Zero undetected calculation anomalies in audited ledgers.</div>
                <div className="text-slate-400 text-[11px]">Shortcut-based auditing prevents costly financial misstatements.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Taxation Specialist GSTR-1 Data Preparation Screening</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Validating GST ledger tables for proper column data types before portal upload.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Validation_Check</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Tool_Used</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Status</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Confirm numeric invoice values (no text spaces)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Status Bar SUM check / =ISNUMBER()</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">100% Verified</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Data Type Hygiene Check</div>
                <div className="text-emerald-400 font-semibold">Result: Zero portal JSON validation rejections during monthly GST filing.</div>
                <div className="text-slate-400 text-[11px]">Proper data type formatting is essential for regulatory tax compliance.</div>
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Confusing Absolute and Relative Defaults</td>
                  <td className="py-3 px-4 text-slate-300">Assuming Excel formulas are absolute by default.</td>
                  <td className="py-3 px-4 text-amber-300">Formulas in Excel are 100% relative by default unless anchored with $.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Always explicitly apply F4 to lock parameter coordinates.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Misunderstanding .csv Storage</td>
                  <td className="py-3 px-4 text-slate-300">Believing CSV files store cell colors, fonts, or multiple worksheet tabs.</td>
                  <td className="py-3 px-4 text-amber-300">Opening CSV reveals raw plain text with zero formatting.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Always save master design files as .xlsx or .xlsm.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Thinking Ctrl+C Copies Formulas as Constants</td>
                  <td className="py-3 px-4 text-slate-300">Expecting regular paste to fix calculated values.</td>
                  <td className="py-3 px-4 text-amber-300">Pasted formulas recalculate based on new relative coordinates.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Use Paste Special &amp;rarr; Values (Alt + E + S + V) to freeze numbers as static constants.</td>
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
                Alt + E + S + V
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Paste Special Values: Convert dynamic formulas into static permanent numbers.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + A
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Select All: Highlight the active contiguous table or entire worksheet.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Z
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Undo the last spreadsheet action (up to 100 undo levels).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Y
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Redo or repeat the last action.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is understanding the binary representation of spreadsheet numbers crucial when handling floating-point rounding?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does Excel maintain backwards compatibility with 1980s Lotus 1-2-3 date calculation quirks?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">What is the architectural reason why .xlsx files cannot store executable VBA macros?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Practice Multiple Choice Questions (MCQ): Comprehensive Interface &amp; Navigation Mastery - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Test yourself thoroughly with the 30 FAQ questions below! Review every single explanation carefully. If you score above 27/30, you have mastered Module 1.1 with excellence."
          />
        </div>
      </div>
    </div>
  );
}
