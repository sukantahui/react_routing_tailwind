"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/dynamic_arrays_master.xlsx?url";
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

  // Direct workbook download handler
  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "dynamic_arrays_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-rose-500/30 selection:text-rose-200">
      {/* Scoped CSS Keyframes for Smooth Reveal Animation */}
      <style>{`
        @keyframes fadeInSlide {
          from {
            transform: translateY(18px);
          }
          to {
            transform: translateY(0);
          }
        }
        .reveal-section {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* =========================================================================
            SECTION 1: HERO HEADER & EXECUTIVE OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-rose-950/80 border border-rose-700/60 text-rose-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Stochastic Simulations · Topic 7
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              The RANDARRAY Function
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-semibold">
              Monte Carlo Risk Modeling
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
            Generating Random Datasets and Monte Carlo Inputs with RANDARRAY
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Power sophisticated risk modeling and synthetic dataset creation natively in Excel. 
            The <strong className="text-rose-300 font-mono">RANDARRAY</strong> function generates uniform random numbers (discrete integers or continuous floats) 
            across custom matrix dimensions. Master Monte Carlo cashflow stress testing, fair random lottery draws with <code className="text-amber-300 font-mono">SORTBY()</code>, 
            and volatile recalculation management with Paste Values.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-rose-400 text-base">✓</span>
              <span><strong>Custom Bounds:</strong> Set min & max limits directly</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Integers or Floats:</strong> Whole numbers or continuous decimals</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-amber-400 text-base">✓</span>
              <span><strong>Monte Carlo Ready:</strong> 10,000 scenario stress testing</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚡</span> Formula Anatomy: =RANDARRAY()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Syntax Specification: RANDARRAY([rows], [columns], [min], [max], [whole_number])
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-rose-300">
            <span className="text-slate-500">// Modern RANDARRAY Signature:</span>
            <div className="mt-1 text-white font-bold">
              =RANDARRAY(<span className="text-amber-300">[rows]</span>, <span className="text-sky-300">[columns]</span>, <span className="text-emerald-400">[min]</span>, <span className="text-purple-300">[max]</span>, <span className="text-rose-400">[whole_number]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Real-World Usages:</span>{" "}
              <code className="text-emerald-400">=RANDARRAY(30, 1, 50, 200, TRUE)</code> (Footfall Integers) |{" "}
              <code className="text-sky-300">=RANDARRAY(30, 1, 0.08, 0.15, FALSE)</code> (Discount Rates)
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Argument</th>
                  <th className="pb-3 px-4">Type</th>
                  <th className="pb-3 px-4">Required?</th>
                  <th className="pb-3 pl-4">Description & Evaluation Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="py-3 pr-4 text-amber-300 font-bold">[rows]</td>
                  <td className="py-3 px-4 text-slate-400">Integer</td>
                  <td className="py-3 px-4 text-slate-500 font-sans font-semibold">Optional (Default: 1)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Number of rows to generate down vertically.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sky-300 font-bold">[columns]</td>
                  <td className="py-3 px-4 text-slate-400">Integer</td>
                  <td className="py-3 px-4 text-slate-500 font-sans font-semibold">Optional (Default: 1)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Number of columns to generate across horizontally.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-emerald-300 font-bold">[min]</td>
                  <td className="py-3 px-4 text-slate-400">Number</td>
                  <td className="py-3 px-4 text-slate-500 font-sans font-semibold">Optional (Default: 0)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Minimum lower bound for the generated random numbers.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-purple-300 font-bold">[max]</td>
                  <td className="py-3 px-4 text-slate-400">Number</td>
                  <td className="py-3 px-4 text-slate-500 font-sans font-semibold">Optional (Default: 1)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Maximum upper bound for the generated random numbers.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-rose-300 font-bold">[whole_number]</td>
                  <td className="py-3 px-4 text-slate-400">Boolean</td>
                  <td className="py-3 px-4 text-slate-500 font-sans font-semibold">Optional (Default: FALSE)</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">
                    <strong className="text-white">FALSE / Omitted:</strong> Returns continuous floating-point decimals.<br />
                    <strong className="text-white">TRUE:</strong> Returns discrete whole integers within bounds.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-rose-400">🔬</span> Conceptual Mechanics: Stochastic Modeling & Volatility
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              In corporate risk management, financial returns are not deterministic numbers—they follow stochastic distributions.
            </p>
            <p>
              <code className="text-rose-300 font-mono">RANDARRAY</code> utilizes a high-performance pseudo-random number generator (PRNG) implemented in Excel's compiled core:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-200">
              <li><strong>Continuous Float Mode (<code className="text-sky-300 font-mono">FALSE</code>):</strong> Samples from a uniform continuous distribution between min and max bounds, ideal for interest rate perturbations, WACC sensitivity, and currency volatility.</li>
              <li><strong>Discrete Integer Mode (<code className="text-emerald-300 font-mono">TRUE</code>):</strong> Samples from a discrete uniform distribution, ideal for daily customer arrivals, inventory units, and lotteries.</li>
              <li><strong>Volatile Calculation Lifecycle:</strong> Because RANDARRAY recalculates on every sheet edit, freeze mock datasets with <em>Copy → Paste Special → Values</em> when static training tables are required.</li>
            </ol>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-pink-400">📐</span> Monte Carlo Simulation Distribution Bounds
            </h2>
            <span className="text-xs text-pink-300 bg-pink-950/80 px-3 py-1 rounded-full border border-pink-800">
              Uniform Stochastic Model
            </span>
          </div>

          <p className="text-sm text-slate-300">
            Visualizing discrete integer footfall bounds vs continuous float interest rate distributions.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-center items-center overflow-x-auto">
            <svg className="w-full max-w-2xl h-auto" viewBox="0 0 760 270" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="gridPattern8" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="760" height="270" fill="url(#gridPattern8)" rx="16" />

              {/* Integer Simulation Card */}
              <g transform="translate(40, 25)">
                <rect x="0" y="0" width="310" height="220" rx="10" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                <rect x="8" y="8" width="294" height="26" rx="6" fill="#881337" />
                <text x="155" y="25" fill="#fecdd3" fontSize="11" fontWeight="bold" textAnchor="middle">=RANDARRAY(5, 1, 50, 200, TRUE)</text>

                <rect x="20" y="45" width="270" height="26" rx="4" fill="#4c0519" />
                <text x="35" y="62" fill="#ffffff" fontSize="11" fontWeight="bold">Trial 1: 142 Visitors (Integer)</text>

                <rect x="20" y="78" width="270" height="26" rx="4" fill="#4c0519" />
                <text x="35" y="95" fill="#ffffff" fontSize="11">Trial 2: 87 Visitors</text>

                <rect x="20" y="111" width="270" height="26" rx="4" fill="#4c0519" />
                <text x="35" y="128" fill="#ffffff" fontSize="11">Trial 3: 195 Visitors</text>

                <rect x="20" y="144" width="270" height="26" rx="4" fill="#4c0519" />
                <text x="35" y="161" fill="#ffffff" fontSize="11">Trial 4: 63 Visitors</text>

                <rect x="20" y="177" width="270" height="26" rx="4" fill="#4c0519" />
                <text x="35" y="194" fill="#ffffff" fontSize="11">Trial 5: 118 Visitors</text>
              </g>

              {/* Float Simulation Card */}
              <g transform="translate(410, 25)">
                <rect x="0" y="0" width="310" height="220" rx="10" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <rect x="8" y="8" width="294" height="26" rx="6" fill="#0c4a6e" />
                <text x="155" y="25" fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle">=RANDARRAY(5, 1, 0.08, 0.15, FALSE)</text>

                <rect x="20" y="45" width="270" height="26" rx="4" fill="#0369a1" />
                <text x="35" y="62" fill="#ffffff" fontSize="11" fontWeight="bold">Trial 1: 11.42% (Float Decimal)</text>

                <rect x="20" y="78" width="270" height="26" rx="4" fill="#0369a1" />
                <text x="35" y="95" fill="#ffffff" fontSize="11">Trial 2: 9.18%</text>

                <rect x="20" y="111" width="270" height="26" rx="4" fill="#0369a1" />
                <text x="35" y="128" fill="#ffffff" fontSize="11">Trial 3: 14.85%</text>

                <rect x="20" y="144" width="270" height="26" rx="4" fill="#0369a1" />
                <text x="35" y="161" fill="#ffffff" fontSize="11">Trial 4: 8.35%</text>

                <rect x="20" y="177" width="270" height="26" rx="4" fill="#0369a1" />
                <text x="35" y="194" fill="#ffffff" fontSize="11">Trial 5: 12.70%</text>
              </g>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LIVE EXCEL FILE LOADER & DIRECT DOWNLOAD BAR
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet: RANDARRAY Lab
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the stochastic simulation models below or download the practice workbook to test live Monte Carlo modeling in Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer"
              title="Download dynamic_arrays_master.xlsx practice file"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Workbook (.xlsx)</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
            <ExcelFileLoader
              fileModule={sampleWorkbookUrl}
              sheetName="Topic7_RandArray_Simulations"
              title="Monte Carlo & Stochastic Simulation Matrix"
              rowsPerPage={10}
              showSheetSelector={true}
            />
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-amber-400">🏢</span> Real-World Business Applications of RANDARRAY
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-rose-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-rose-300 text-base">Case 1: Daily Branch Footfall Simulation</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800">Barrackpore Center</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Swadeep Roy</strong> models 30 days of expected daily student inquiries between 50 and 200 visitors:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-rose-300 border border-slate-800">
                =RANDARRAY(30, 1, 50, 200, TRUE)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Spills 30 realistic daily integers to stress-test admissions counter capacity.
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-emerald-300 text-base">Case 2: Monte Carlo WACC Sensitivity</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Shyamnagar Treasury</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Tuhina Mukherjee</strong> simulates discount rate perturbations between 8.0% and 15.0%:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400 border border-slate-800">
                =RANDARRAY(1000, 1, 0.08, 0.15, FALSE)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Feeds 1,000 stochastic discount rates into DCF valuation models.
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sky-300 text-base">Case 3: Fair Lucky Draw Winner Selection</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">Ichapur Annual Fest</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita Saha</strong> selects 3 unbiased prize winners from 50 registered candidates:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-sky-300 border border-slate-800">
                =TAKE(SORTBY(A2:A50, RANDARRAY(ROWS(A2:A50))), 3)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Randomizes student order and grabs 3 unique winners without duplicate draws.
              </p>
            </div>

            {/* Scenario 4 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-purple-300 text-base">Case 4: Synthetic Staff Training Dataset</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">Naihati Training Lab</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Abhronila Das</strong> generates 50 mock invoice sales figures between ₹25,000 and ₹1,50,000:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-purple-300 border border-slate-800">
                =RANDARRAY(50, 1, 25000, 150000, TRUE)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Instantly constructs realistic practice test data without risking real financial privacy.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-sky-400">📋</span> 3-Step Procedure for Monte Carlo Simulations
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-rose-950 text-rose-400 font-bold flex items-center justify-center border border-rose-800 shrink-0">1</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Define Trial Sample Size and Bounds</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Decide the number of trials (e.g. <code className="text-amber-300 font-mono">rows = 1000</code>) and set realistic business limits (<code className="text-emerald-400 font-mono">min = 0.08, max = 0.15</code>).
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center border border-emerald-800 shrink-0">2</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Select Integer vs Floating Point Mode</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Pass <code className="text-sky-300 font-mono">TRUE</code> for whole numbers (units, counts) or <code className="text-rose-300 font-mono">FALSE</code> for continuous metrics (rates, prices).
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-indigo-950 text-indigo-400 font-bold flex items-center justify-center border border-indigo-800 shrink-0">3</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Freeze Values When Publishing Reports</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  When final calculations are completed, select the spilled array and press <code className="text-amber-300 font-mono">Ctrl+C</code> → <code className="text-emerald-400 font-mono">Paste Values</code> to prevent volatile fluctuations.
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
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚠️</span> Common RANDARRAY Pitfalls & Fixes
            </h2>
            <span className="text-xs text-rose-300 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800">
              Troubleshooting Guide
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Frequent Mistake</th>
                  <th className="pb-3 px-4">Error / Symptom</th>
                  <th className="pb-3 pl-4">Corrective Best Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Minimum Exceeds Maximum</td>
                  <td className="py-3.5 px-4 text-rose-400 font-mono">#VALUE! Error</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Ensure <code className="text-sky-300 font-mono">min &lt;= max</code> in all formula parameters.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Unwanted Recalculation on Every Click</td>
                  <td className="py-3.5 px-4 text-slate-300">Numbers change spontaneously during meetings.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Copy the spilled array and <code className="text-sky-300 font-mono">Paste Special as Values</code> to lock data.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">#SPILL! Collision</td>
                  <td className="py-3.5 px-4 text-rose-400 font-mono">#SPILL! Error</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Clear all data in the spill perimeter to allow the array to expand.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & KEYBOARD SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-purple-400">💡</span> Pro Tips & Advanced Recipes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-xs">NORM.INV</span>
                <span>Gaussian Bell Curves</span>
              </div>
              <p className="text-slate-300">
                To transform uniform randoms into a normal bell curve: <code className="text-emerald-400 font-mono">=NORM.INV(RANDARRAY(1000, 1), Mean, StDev)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-xs">PERCENTILE</span>
                <span>95% Value at Risk (VaR)</span>
              </div>
              <p className="text-slate-300">
                To compute the 5th percentile worst-case loss: <code className="text-emerald-400 font-mono">=PERCENTILE.INC(SimulatedLosses#, 0.05)</code>.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-teal-400">🤔</span> Socratic Analytical Hints
          </h2>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-teal-500">
              <h3 className="font-bold text-teal-300 text-sm">Think About Why RANDARRAY Replaces 10,000 Cells</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                In legacy Excel, filling 10,000 individual <code className="text-rose-300 font-mono">=RANDBETWEEN()</code> cells caused severe recalculation lag. Why does a single vectorized <code className="text-emerald-400 font-mono">=RANDARRAY(10000, 1)</code> formula calculate in under 10 milliseconds?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-sky-500">
              <h3 className="font-bold text-sky-300 text-sm">Observe How Lottery Shuffling Works</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Notice that <code className="text-emerald-400 font-mono">=TAKE(SORTBY(Names, RANDARRAY(ROWS(Names))), 3)</code> guarantees that no single candidate can be selected twice in the winning draw!
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ (30 QUESTIONS VIA FAQTemplate)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="The RANDARRAY Function & Stochastic Simulation FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "RANDARRAY brings Wall Street Monte Carlo simulation capabilities natively into your corporate Excel workbooks across Barrackpore and Kolkata! Use whole_number = TRUE for discrete operational units and FALSE for interest rate perturbations. Always remember to copy and Paste Values when preparing static client presentations!"
            }
          />
        </div>
      </div>
    </div>
  );
}
