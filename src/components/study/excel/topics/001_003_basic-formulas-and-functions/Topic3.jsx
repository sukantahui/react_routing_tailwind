"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/basic_formulas_and_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic3() {
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
              ⚡ Formulas & Math · Topic 3
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 & 3: Understand & Apply
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Extreme Value and Positional Ranking Functions: MIN, MAX, LARGE and SMALL Analysis
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master statistical extreme value functions in Excel: MIN (minimum value), MAX (maximum value), LARGE(array, k) (k-th largest value, e.g. 1st, 2nd, 3rd highest sales), and SMALL(array, k) (k-th smallest value) for ranking and outlier detection.
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
            =LARGE(A1:A100, 1), =SMALL(A1:A100, 2)
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">MIN(range)</td>
                  <td className="py-3 px-4 text-teal-400">Minimum Value</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Boundary</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Finds the lowest numerical value in a range; skips text and blanks.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">MAX(range)</td>
                  <td className="py-3 px-4 text-teal-400">Maximum Value</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Boundary</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Finds the highest numerical value in a range.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">LARGE(range, k)</td>
                  <td className="py-3 px-4 text-teal-400">K-th Largest</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Rank</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Returns the k-th largest value (e.g. k=2 returns 2nd highest).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">SMALL(range, k)</td>
                  <td className="py-3 px-4 text-teal-400">K-th Smallest</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Rank</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Returns the k-th smallest value (e.g. k=1 equals MIN).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Return Evaluation: </strong>
              Returns a <span className="text-sky-300 font-semibold">Extreme / K-th Positional Scalar</span> directly to the active cell coordinate.
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
            <p>MIN and MAX scan the array in O(n) linear time to return the absolute mathematical boundary extrema.</p>
            <p>LARGE and SMALL perform partial array sorting or quick-select algorithms in memory to extract the k-th ordered positional value.</p>
            <p>LARGE(range, 1) is mathematically identical to MAX(range); SMALL(range, 1) is identical to MIN(range).</p>
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
            Visual Calculation Flow: Positional Ranking Hierarchy: MAX &amp;rarr; LARGE(k) &amp;rarr; SMALL(k) &amp;rarr; MIN
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
            sheetName="Topic3_Basic_functions__S"
            title="Module 1.3 - Extreme Value and Positional Ranking Functions: MIN, MAX, LARGE and SMALL Analysis"
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
                <h3 className="text-base font-bold text-white">Coder &amp; AccoTax Barrackpore Top 3 Academic Rank Awardees</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Extracting the 1st, 2nd, and 3rd highest exam scores across 50 diploma candidates.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Rank_Position</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Formula_Applied</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Extracted_Score</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Student_Awarded</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">1st Rank (Gold)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=LARGE(D2:D51, 1)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">98.5%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Swadeep Mukherjee</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">2nd Rank (Silver)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=LARGE(D2:D51, 2)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">96.0%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Tuhina Banerjee</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">3rd Rank (Bronze)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=LARGE(D2:D51, 3)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">94.5%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Abhronila Sengupta</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: =LARGE(D2:D51, 1), =LARGE(D2:D51, 2), =LARGE(D2:D51, 3)</div>
                <div className="text-emerald-400 font-semibold">Result: Top 3 merit scores extracted dynamically without manual sorting.</div>
                <div className="text-slate-400 text-[11px]">LARGE extracts top rankings dynamically even if data is completely unsorted.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Kolkata Logistics Fastest vs Slowest Delivery Route Identification</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Finding the minimum and maximum transit hours across 200 delivery routes.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Performance_Metric</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Formula_Applied</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Transit_Hours</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Fastest Route (MIN)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=MIN(C2:C201)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">1.5 Hours (Barrackpore Express)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Slowest Route (MAX)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=MAX(C2:C201)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">8.2 Hours (Heavy Traffic Corridor)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">2nd Fastest Route</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=SMALL(C2:C201, 2)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">1.8 Hours</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: =MIN(), =MAX(), =SMALL(range, 2)</div>
                <div className="text-emerald-400 font-semibold">Result: Operational route boundaries benchmarked for logistics management.</div>
                <div className="text-slate-400 text-[11px]">MIN and SMALL identify performance benchmarks and operational bottlenecks.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Supermarket Top 5 Best-Selling Products</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Extracting the top 5 highest sales revenues from a 1,000-SKU catalog.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Top_Rank</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Formula_Applied</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sales_Revenue_INR</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Top 1</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=LARGE(E2:E1001, 1)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 1,450,000.00</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Top 2</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=LARGE(E2:E1001, 2)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 1,120,000.00</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Top 3</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=LARGE(E2:E1001, 3)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 980,000.00</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: =LARGE($E$2:$E$1001, ROW(A1)) copied down</div>
                <div className="text-emerald-400 font-semibold">Result: Top 5 sales revenues extracted in automated descending order.</div>
                <div className="text-slate-400 text-[11px]">Using ROW(A1) as the k argument creates a dynamic formula that increments k as it is dragged down.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Ichapur Plant Machinery Minimum Operating Temperature Alert</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Monitoring sensor readings to flag coldest machine operating temperature.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sensor_ID</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Min_Temp_Recorded</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Safety_Threshold</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Safety_Status</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sensor-01 to 50</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=MIN(B2:B51) (42°C)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">40°C</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=IF(MIN(B2:B51)&gt;=40,"SAFE","ALERT")</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: =MIN(B2:B51)</div>
                <div className="text-emerald-400 font-semibold">Result: Minimum temperature 42°C verified safe.</div>
                <div className="text-slate-400 text-[11px]">MIN formulas act as automated safety tripwires in industrial monitoring.</div>
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">#NUM! Error in LARGE / SMALL</td>
                  <td className="py-3 px-4 text-slate-300">Passing a k value that exceeds the count of numbers in the range (e.g. =LARGE(A1:A10, 15)).</td>
                  <td className="py-3 px-4 text-amber-300">Range has 10 items; requesting 15th largest yields #NUM!.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Ensure k &lt;= COUNT(range).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Duplicate Values in LARGE Rankings</td>
                  <td className="py-3 px-4 text-slate-300">If two students tie for 1st place with 95, LARGE(range, 1) and LARGE(range, 2) both return 95.</td>
                  <td className="py-3 px-4 text-amber-300">2nd rank displays 95 instead of the next distinct value.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Combine with =UNIQUE() if distinct ranking is required: =LARGE(UNIQUE(range), 2).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">LARGE Failing on Text Numbers</td>
                  <td className="py-3 px-4 text-slate-300">Numbers stored as text are ignored by LARGE/SMALL.</td>
                  <td className="py-3 px-4 text-amber-300">Returns #NUM! or wrong values.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Convert column to pure numbers.</td>
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
                =LARGE(range, ROW(A1))
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Drag formula down to automatically extract 1st, 2nd, 3rd, 4th largest values dynamically.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                =SMALL(range, ROW(A1))
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Drag formula down to extract 1st, 2nd, 3rd smallest values in ascending order.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Shift + Enter
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Legacy CSE array entry (not needed in modern Excel 365).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + M + V
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Evaluate formula step-by-step.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is =LARGE(range, 1) computationally equivalent to =MAX(range)?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How can you combine LARGE() with INDEX/XLOOKUP to retrieve the name of the top-performing sales representative?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">What happens when LARGE() encounters duplicate identical numbers in the dataset?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Extreme Value and Positional Ranking Functions: MIN, MAX, LARGE and SMALL Analysis - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Pro tip for dynamic leaderboards: Write =LARGE($A$1:$A$100, ROW(A1)) and drag it down! ROW(A1) evaluates to 1, in the next row it becomes ROW(A2)=2, then ROW(A3)=3, generating an instant top-10 leaderboard without hardcoding numbers!"
          />
        </div>
      </div>
    </div>
  );
}
