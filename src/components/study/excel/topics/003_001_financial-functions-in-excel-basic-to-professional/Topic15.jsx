"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/003_001_financial_functions_in_excel_basic_to_professional_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic15_files/topic15_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic15() {
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
    link.download = "financial_functions_master_practice.xlsx";
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
              {"🏢 Commercial Real Estate Valuation"} · Topic 15
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              {"Real Estate Private Equity Case Study"}
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              {"Ultra-Expert · Bloom Level 6: Evaluate"}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            {"Real-world case study: Commercial real estate investment appraisal model"}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            {"Comprehensive commercial real estate investment appraisal: Net Operating Income (NOI), Capitalization Rate valuation, debt service coverage, and Levered IRR & Equity Multiple"}. Master the complete mathematical foundation, Excel function syntax, operational mechanics, and Wall Street modeling standards.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Subject Code:</strong> EXCEL-PRO-901</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Module:</strong> Financial Functions &amp; Valuation</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Accreditation:</strong> Coder &amp; AccoTax Centre of Excellence</span>
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
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">⚡</span>
              Financial Formula Syntax &amp; Argument Breakdown
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Function Anatomy
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            {"Real Estate Appraisal Engine: Net Operating Income (NOI) / Cap Rate → DCF Levered Cash Flows → IRR & Equity Multiple"}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Parameter / Token</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Operational Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Rate / Discount Yield</td>
                  <td className="py-3 px-4 text-teal-400">Percentage / Decimal Float</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Required</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Periodic interest rate or cost of capital discount factor matching payment intervals.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Cash Flows / PV / FV / Periods</td>
                  <td className="py-3 px-4 text-teal-400">Numeric Values / Arrays</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Contextual</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Specifies cash flow streams (negative for outflows, positive for returns) and tenure periods.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Core Principle: </strong>
              Excel's financial engine requires strict adherence to the Cash Flow Sign Convention: Cash leaving your entity must be Negative (-), while cash entering must be Positive (+).
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
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">🔬</span>
              Financial Theory &amp; Calculation Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Under-The-Hood Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div key="0" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{"1. Net Operating Income (NOI) Waterfall"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"`Gross Potential Rent - Vacancy Loss + Other Income = Effective Gross Revenue`; `Effective Revenue - Operating Expenses (Opex) = Net Operating Income (NOI)`."}</p>
            </div>
            
            <div key="1" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{"2. Direct Capitalization Valuation"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"`Property Value = Year 1 NOI / Market Cap Rate`. Measures property valuation based on prevailing local market yields."}</p>
            </div>
            
            <div key="2" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{"3. Levered Cash Flow & Equity Multiple"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"`Levered Cash Flow = NOI - Annual Debt Service`. Evaluates equity return metrics: Levered IRR and Equity Multiple (`Total Cash Returned / Equity Invested`)."}</p>
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
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-base font-mono">📐</span>
              Visual Dataflow: {"Commercial Real Estate Valuation Engine: Gross Potential Rent → NOI → Debt Service → Levered Return"}
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              Financial Pipeline
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg viewBox="0 0 820 220" className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans">
              <defs>
                <linearGradient id="gradFlowMod7_15" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
                </linearGradient>
                <marker id="arrowMod7_15" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
                </marker>
              </defs>

              {/* Node 1: Financial Parameters */}
              <g transform="translate(30, 45)">
                <rect width="210" height="130" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <rect x="12" y="12" width="186" height="26" rx="6" fill="#1e293b" />
                <text x="105" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Input Financial Parameters</text>
                <text x="105" y="75" textAnchor="middle" fill="#38bdf8" fontSize="14" fontFamily="monospace" fontWeight="bold">Cash Outflows (-)</text>
                <text x="105" y="100" textAnchor="middle" fill="#64748b" fontSize="10">Discount Rate / WACC</text>
                <text x="105" y="118" textAnchor="middle" fill="#64748b" fontSize="10">Compounding Tenures</text>
              </g>

              <path d="M 245 110 L 305 110" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowMod7_15)" fill="none" />

              {/* Node 2: Valuation Calculation Engine */}
              <g transform="translate(315, 30)">
                <rect width="250" height="160" rx="14" fill="#0c4a6e" stroke="#0284c7" strokeWidth="2" />
                <rect x="14" y="14" width="222" height="28" rx="6" fill="#0369a1" />
                <text x="125" y="33" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Financial Valuation Engine</text>
                <text x="125" y="75" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontFamily="monospace" fontWeight="bold">{"Real Estate Private Equity Case Study"}</text>
                <text x="125" y="100" textAnchor="middle" fill="#bae6fd" fontSize="10">Discounting / Compounding Engine</text>
                <text x="125" y="120" textAnchor="middle" fill="#bae6fd" fontSize="10">Newton-Raphson Solver</text>
                <text x="125" y="140" textAnchor="middle" fill="#38bdf8" fontSize="9" fontStyle="italic">Native IEEE Floating Point</text>
              </g>

              <path d="M 570 110 L 630 110" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowMod7_15)" fill="none" />

              {/* Node 3: Valuation Metric Result */}
              <g transform="translate(640, 45)">
                <rect width="150" height="130" rx="12" fill="#064e3b" stroke="#059669" strokeWidth="2" />
                <rect x="10" y="12" width="130" height="26" rx="6" fill="#047857" />
                <text x="75" y="30" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Appraisal Output</text>
                <text x="75" y="75" textAnchor="middle" fill="#6ee7b7" fontSize="14" fontFamily="monospace" fontWeight="bold">Net Value / IRR</text>
                <text x="75" y="105" textAnchor="middle" fill="#a7f3d0" fontSize="10">Decision Grade</text>
              </g>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: INTERACTIVE SPREADSHEET & DIRECT DOWNLOAD PORTAL
        ========================================================================= */}
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
                Explore the dataset below live in the browser or download the full module workbook to practice in Microsoft Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download the full .xlsx practice workbook for this module"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="EX1216"
            title={"Real-world case study: Commercial real estate investment appraisal model - Interactive Practice Grid"}
            rowsPerPage={10}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
              Real-World Corporate Implementation Scenarios
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div key="0" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 1 · Real Estate Private Equity Partner"}</span>
                <span className="text-xs font-mono text-slate-400">{"Barrackpore HQ"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Swadeep Banerjee: Commercial IT Park Acquisition Appraisal"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Evaluates a ₹120 Crore Grade-A IT Business Park acquisition: Year 1 NOI ₹10.2 Crore @ 8.5% Cap Rate, 65% LTV senior debt, delivering a 19.4% 5-year Levered IRR and 2.1x Equity Multiple."}</p>
            </div>
            
            <div key="1" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 2 · Real Estate Fund Auditor"}</span>
                <span className="text-xs font-mono text-slate-400">{"Shyamnagar Plant"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Tuhina Mukherjee: Warehouse Logistics Park Yield Modeling"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Appraises modern Grade-A logistics warehouses factoring in 10-year tenant lease escalations."}</p>
            </div>
            
            <div key="2" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 3 · Industrial Land Valuation Lead"}</span>
                <span className="text-xs font-mono text-slate-400">{"Ichapur Works"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Abhronila Das: Manufacturing Special Economic Zone (SEZ) Appraisal"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Models industrial land parcel acquisition and factory lease development cash flows."}</p>
            </div>
            
            <div key="3" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 4 · Commercial Asset Manager"}</span>
                <span className="text-xs font-mono text-slate-400">{"Naihati Logistics"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Debangshu Roy: Freight Terminal Sale-and-Leaseback Model"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Structures institutional sale-and-leaseback transactions for regional logistics distribution centers."}</p>
            </div>
            
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP PRACTICAL CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">🛠️</span>
              Step-by-Step Implementation &amp; Execution Guide
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Execution Protocol
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-emerald-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center justify-center text-xs">1</span>
                Step 1: Set Up Assumptions Block &amp; Align Compounding Frequencies
              </div>
              <p className="text-slate-300 leading-relaxed">
                Place annual rates, debt amounts, and tenures in a dedicated Assumption Block. Divide annual rates by frequency (e.g. Rate/12) and multiply years (Years*12).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-sky-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center text-xs">2</span>
                Step 2: Enter the Core Financial Formula
              </div>
              <p className="text-slate-300 leading-relaxed">
                In the calculation cell, enter the formula <code className="text-cyan-300 font-mono font-bold">{"Real Estate Appraisal Engine: Net Operating Income (NOI) / Cap Rate → DCF Levered Cash Flows → IRR & Equity Multiple"}</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-teal-950 border border-teal-700 text-teal-300 flex items-center justify-center text-xs">3</span>
                Step 3: Verify Cash Flow Sign Discipline &amp; Day 0 Adjustments
              </div>
              <p className="text-slate-300 leading-relaxed">
                Confirm outflows are negative (-) and inflows positive (+). For standard NPV, verify that Year 0 capex is added outside the formula.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-indigo-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center text-xs">4</span>
                Step 4: Format with Accounting Alignment &amp; Add Sensitivity Tables
              </div>
              <p className="text-slate-300 leading-relaxed">
                Apply Wall Street custom number formatting and construct 2D What-If Data Tables across discount rates and growth assumptions.
              </p>
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
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 text-base font-mono">⚠️</span>
              Common Pitfalls &amp; Troubleshooting Matrix
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Diagnostic Fixes
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Problem / Error Signature</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Fix &amp; Prevention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                
                <tr key="0" className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">{"Deducting Debt Service Before Calculating NOI"}</td>
                  <td className="py-3 px-4">{"NOI must measure property operating profitability BEFORE financing costs; deducting debt service inside NOI distorts Cap Rate valuation."}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{"Keep NOI strictly unlevered: `NOI = Effective Revenue - Operating Expenses`."}</td>
                </tr>
                
                <tr key="1" className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">{"Ignoring Capital Expenditure Reserves"}</td>
                  <td className="py-3 px-4">{"Failing to budget for roof, HVAC, and structural replacement reserves inflates reported cash flows."}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{"Include Replacement Reserves below NOI to compute true Cash Flow Before Debt Service."}</td>
                </tr>
                
                <tr key="2" className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">{"Assuming Zero Vacancy in Long-Term Projections"}</td>
                  <td className="py-3 px-4">{"Modeling 100% occupancy for 10 consecutive years violates real estate underwriting standards."}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{"Underwrite a realistic structural vacancy allowance (typically 5% to 10%)."}</td>
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
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-base font-mono">💡</span>
              Pro Tips &amp; High-Speed Accelerators
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Productivity
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            
            <div key="0" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> {"Direct Cap Valuation"}
              </div>
              <p className="text-slate-300 leading-relaxed">{"Instant market valuation based on stabilized operating yield."}</p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">{"=Year1_NOI / CapRate"}</kbd>
            </div>
            
            <div key="1" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> {"Debt Service Coverage Ratio (DSCR)"}
              </div>
              <p className="text-slate-300 leading-relaxed">{"Key bank covenant: Ensure DSCR >= 1.25x for commercial mortgage approval."}</p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">{"=NOI / AnnualDebtService"}</kbd>
            </div>
            
            <div key="2" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> {"Equity Multiple Metric"}
              </div>
              <p className="text-slate-300 leading-relaxed">{"Measures total capital returned as a multiple of equity invested (e.g. 2.2x)."}</p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">{"=TotalCashDistributions / InitialEquityInvested"}</kbd>
            </div>
            
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC HINTS ("THINK ABOUT...")
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">🤔</span>
              Socratic Analytical Hints ("Think About...")
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Critical Thinking
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-300">
            
            <div key="0" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 1: {"Why must Net Operating Income (NOI) be calculated BEFORE subtracting loan interest and debt payments?"}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on the corporate finance and economic capital allocation implications.
              </p>
            </div>
            
            <div key="1" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 2: {"Why do commercial real estate lenders insist on a minimum Debt Service Coverage Ratio (DSCR) of 1.25x?"}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on the corporate finance and economic capital allocation implications.
              </p>
            </div>
            
            <div key="2" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 3: {"What does an Equity Multiple of 2.0x mean over a 5-year investment holding period?"}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on the corporate finance and economic capital allocation implications.
              </p>
            </div>
            
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title={"Real-world case study: Commercial real estate investment appraisal model - Frequently Asked Questions"}
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={"Real estate private equity uses two key metrics: Levered IRR (the annualized speed of return) and Equity Multiple (the total amount of cash returned). Always calculate both for your investment committee."}
          />
        </div>
      </div>
    </div>
  );
}
