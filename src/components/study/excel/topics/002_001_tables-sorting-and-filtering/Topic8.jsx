"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/002_001_tables_sorting_and_filtering_master.xlsx?url";
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
              📑 Structured Tables · Topic 8
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Intermediate
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 &amp; 3: Understand &amp; Apply
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Test Your Skill: Dynamic Tables, Sorting & Filtering Assessment
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Validate your mastery of Excel Tables (Ctrl + T), structured references, multi-level hierarchy sorting, AutoFilters, duplicate removal, and SUBTOTAL calculations across 20 workplace assessment scenarios.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Competency Level:</strong> Table Architect Certification</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Assessment Suite:</strong> 20 Practical Tasks & Solutions</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Data Integrity:</strong> 100% Verified Audit Calculations</span>
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
            Table Architect Assessment: Ctrl + T  |  Structured Syntax  |  Multi-Level Sort  |  SUBTOTAL(109)
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Table Creation</td>
                  <td className="py-3 px-4 text-teal-400">Skill Test 1</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Ctrl + T</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Convert static grid into dynamic Excel Table with clean name.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Structured Formula</td>
                  <td className="py-3 px-4 text-teal-400">Skill Test 2</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">[@Column]</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Write self-documenting current-row structured formulas.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">SUBTOTAL Audit</td>
                  <td className="py-3 px-4 text-teal-400">Skill Test 3</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">=SUBTOTAL(109)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Build filter-responsive summary total cards.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Structured Output: </strong>
              Complete each assessment task in your master workbook to test your practical skills.
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
            Table Architect Assessment Framework & Skill Verification
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>This assessment evaluates your practical ability to design, structure, sort, filter, and summarize complex enterprise data sets using official Excel Table tools.</p>
            <p>Mastering these core skills enables you to build automated, maintenance-free financial ledgers, customer registers, and executive dashboards.</p>
            <p>Review the 20 assessment tasks below, practice each formula in your master workbook, and verify your results against the solution outputs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">Dynamic Model Scalability</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Structured tables auto-expand ranges, ensuring formulas never require manual range adjustments.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">Executive Summary Accuracy</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Filter-aware SUBTOTAL formulas ensure summary cards reflect visible screen views accurately.
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
            Visual Architecture: Table Architect Skill Assessment & Workflow Mastery
          </h2>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-x-auto">
            <svg viewBox="0 0 800 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="m5_table_8" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m5_query_8" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m5_slicer_8" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <rect x="30" y="50" width="200" height="150" rx="12" fill="url(#m5_table_8)" stroke="#38bdf8" strokeWidth="2" />
              <text x="130" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">1. Table Creation</text>
              <text x="130" y="115" textAnchor="middle" fill="#e0f2fe" fontSize="11">Ctrl + T Conversion</text>
              <text x="130" y="135" textAnchor="middle" fill="#e0f2fe" fontSize="11">ListObjects Engine</text>
              <text x="130" y="165" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">Structure Data</text>

              <path d="M 235 125 L 295 125" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="295,120 305,125 295,130" fill="#38bdf8" />

              <rect x="310" y="50" width="200" height="150" rx="12" fill="url(#m5_query_8)" stroke="#34d399" strokeWidth="2" />
              <text x="410" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">2. Sort & Filter</text>
              <text x="410" y="115" textAnchor="middle" fill="#d1fae5" fontSize="11">Multi-Level Sort</text>
              <text x="410" y="135" textAnchor="middle" fill="#d1fae5" fontSize="11">AutoFilter Criteria</text>
              <text x="410" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Segment Data</text>

              <path d="M 515 125 L 575 125" stroke="#34d399" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="575,120 585,125 575,130" fill="#34d399" />

              <rect x="590" y="50" width="180" height="150" rx="12" fill="url(#m5_slicer_8)" stroke="#a78bfa" strokeWidth="2" />
              <text x="680" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">3. Subtotal Summary</text>
              <text x="680" y="115" textAnchor="middle" fill="#ede9fe" fontSize="11">=SUBTOTAL(109)</text>
              <text x="680" y="135" textAnchor="middle" fill="#ede9fe" fontSize="11">Dashboard Summary</text>
              <text x="680" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="11" fontWeight="bold">Mastered Model</text>
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
            sheetName="EX109"
            title="Module 2.1 - Test Your Skill: Dynamic Tables, Sorting & Filtering Assessment"
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
                <h3 className="text-base font-bold text-white">Multi-Level Sort Challenge</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Sort table by Region ascending, then Sales Amount descending.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Task</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Formula_Applied</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Outcome</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sort Hierarchy</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SORT(tblSales, {1, 3}, {1, -1})</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sorted Grid</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Alt + A + S + S -&gt; Multi-Level Sort</div>
                <div className="text-emerald-400 font-semibold">Result: Hierarchical tie-breaking achieved.</div>
                <div className="text-slate-400 text-[11px]">Multi-level sort establishes clear record precedence.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Top 10% Revenue Filter Task</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Extract top 10% performing transactions dynamically.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Task</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Criteria</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Result</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Top 10%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Number Filters -&gt; Top 10 Percent</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Spilled Subset</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: AutoFilter -&gt; Top 10 Percent</div>
                <div className="text-emerald-400 font-semibold">Result: High-value deals isolated.</div>
                <div className="text-slate-400 text-[11px]">Top 10% filter calculates threshold dynamically.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Structured Reference Payout Calculation</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Calculate total payout using current-row structured table syntax.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Task</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Formula</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Payout</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Payout Calculation</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=[@Base_Salary] * (1 + [@Bonus_Pct])</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 65,400.00</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Structured Table Syntax</div>
                <div className="text-emerald-400 font-semibold">Result: Self-documenting formula.</div>
                <div className="text-slate-400 text-[11px]">Structured references eliminate cell coordinate dependencies.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Filtered Subtotal Average Pay</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Compute average salary of visible filtered employees.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Task</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Formula</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Average</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Subtotal Average</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SUBTOTAL(101, tblEmployees[Salary])</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 54,200.00</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: SUBTOTAL Code 101</div>
                <div className="text-emerald-400 font-semibold">Result: Filter-responsive average.</div>
                <div className="text-slate-400 text-[11px]">Code 101 computes average of visible cells only.</div>
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
                <h3 className="text-sm font-bold text-white">Open Practice Workbook</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Download and open 002_001_tables_sorting_and_filtering_master.xlsx.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <h3 className="text-sm font-bold text-white">Navigate to Sheet EX109</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Click EX109 sheet tab or jump via Executive Overview landing sheet.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <h3 className="text-sm font-bold text-white">Execute Assessment Tasks</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Complete each of the 20 assessment tasks listed in the scenario table.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <h3 className="text-sm font-bold text-white">Verify Solution Formulas</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Check your formulas against the expected output values.
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Formula Fails to Update When New Rows Added</td>
                  <td className="py-3 px-4 text-slate-300">Range was not converted to an Excel Table.</td>
                  <td className="py-3 px-4 text-amber-300">Check for Table Design tab.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Press Ctrl + T to convert range to Excel Table.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Copying Filtered Data Copies Hidden Rows</td>
                  <td className="py-3 px-4 text-slate-300">Hidden rows were included during standard copy.</td>
                  <td className="py-3 px-4 text-amber-300">Check copied output.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Press Alt + ; (Select Visible Cells Only) before copying.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Total Row Shows #NAME? Error</td>
                  <td className="py-3 px-4 text-slate-300">Mismatched column reference name.</td>
                  <td className="py-3 px-4 text-amber-300">Check formula text.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Re-select column from dropdown selector.</td>
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
                Ctrl + T
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Convert raw range to structured Excel Table.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Shift + L
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Toggle AutoFilter arrows.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + ;
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Select Visible Cells Only before copying.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Shift + T
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Toggle Table Total Row.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why are structured table references superior to static cell coordinates in financial modeling?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does the SUBTOTAL function safeguard executive dashboards against double-counting?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">What is the key advantage of using relative Date Filters over hardcoded date thresholds?</p>
            </div>
          </div>
        </section>

        {/* SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS) */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Test Your Skill Assessment - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* SECTION 12: TEACHER'S NOTE & EXAM WISDOM */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            topicName="Test Your Skill: Dynamic Tables, Sorting & Filtering Assessment"
            noteTitle="Sukanta Hui's Master Mentor Guide"
            mentorAdvice="Congratulations on completing the Table Architect Skill Assessment! Always verify that your table formulas use structured column headers rather than hardcoded range coordinates to guarantee dynamic model scalability!"
            note="Master Table Architecture! Practice every assessment scenario to build confidence and excel in real-world corporate spreadsheet modeling!"
          />
        </div>
      </div>
    </div>
  );
}
