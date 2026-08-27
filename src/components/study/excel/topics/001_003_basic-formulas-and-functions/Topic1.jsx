"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/basic_formulas.xlsx?url";
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
              ⚡ Formulas & Math · Topic 1
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 & 3: Understand & Apply
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Core Arithmetic Operations: Addition (+), Subtraction (-), Multiplication (*), Division (/) and Powers (^)
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master fundamental spreadsheet arithmetic: Addition (+), Subtraction (-), Multiplication (*), Division (/), Integer Division with MOD, and Exponentiation (^). Learn best practices for unit conversions, percentage margins, and growth rate formulas.
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
            =A1 * B1 - C1 / D1
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Addition (+)</td>
                  <td className="py-3 px-4 text-teal-400">Sum</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Arithmetic</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Adds two numeric operands (=A1 + B1).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Subtraction (-)</td>
                  <td className="py-3 px-4 text-teal-400">Difference</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Arithmetic</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Subtracts subtrahend from minuend (=A1 - B1).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Multiplication (*)</td>
                  <td className="py-3 px-4 text-teal-400">Product</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Arithmetic</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Multiplies two factors (=A1 * B1).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Division (/)</td>
                  <td className="py-3 px-4 text-teal-400">Quotient</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Arithmetic</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Divides dividend by divisor (=A1 / B1).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Return Evaluation: </strong>
              Returns a <span className="text-sky-300 font-semibold">Calculated Numeric Float</span> directly to the active cell coordinate.
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
            <p>Arithmetic operators in Excel operate directly on numeric data types stored in 8-byte floating-point registers.</p>
            <p>Division by zero is mathematically undefined and returns the `#DIV/0!` error token.</p>
            <p>Percentage calculations in Excel do not require multiplying by 100 in formulas; formatting the cell as Percentage (Ctrl+Shift+%) automatically scales the decimal by 100.</p>
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
            Visual Calculation Flow: Arithmetic Subsystem &amp; Mathematical Operator Flow
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
            sheetName="Topic0_BODMAS_Order"
            title="Module 1.3 - Core Arithmetic Operations: Addition (+), Subtraction (-), Multiplication (*), Division (/) and Powers (^)"
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
                <h3 className="text-base font-bold text-white">Kolkata Retail Profit Margin &amp; Markup Calculation</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Computing gross profit and markup percentage on retail consumer electronics.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Product_Name</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Cost_Price</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Selling_Price</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Gross_Profit_Formula</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Margin_%_Formula</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Laptop Stand</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 800</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 1,200</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=C2 - B2 (₹ 400)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=(C2-B2)/C2 (33.3%)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Wireless Mouse</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 450</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 750</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=C3 - B3 (₹ 300)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=(C3-B3)/C3 (40.0%)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Profit: =C2-B2 | Margin: =(C2-B2)/C2</div>
                <div className="text-emerald-400 font-semibold">Result: Accurate gross profit and percentage margin derived.</div>
                <div className="text-slate-400 text-[11px]">Simple subtraction and division power core retail profitability analysis.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Barrackpore Wholesale Quantity Bulk Discount Tiering</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Multiplying quantity by tiered wholesale price per unit.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Item_Name</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Order_Qty</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Unit_Rate</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Total_Amount_Formula</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Copper Wire 100m</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">45</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 1,250</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=B2 * C2 (₹ 56,250.00)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: =B2 * C2</div>
                <div className="text-emerald-400 font-semibold">Result: ₹ 56,250.00 invoice line total calculated.</div>
                <div className="text-slate-400 text-[11px]">Multiplication formulas scale dynamically across thousands of invoice lines.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Annual Revenue Growth Percentage</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Calculating Year-over-Year (YoY) revenue growth between FY2025 and FY2026.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Branch</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">FY2025_Revenue</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">FY2026_Revenue</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">YoY_Growth_Formula</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Barrackpore</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 1,200,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 1,450,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=(C2 - B2) / B2 (+20.8%)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: =(C2 - B2) / B2 formatted as +0.0%</div>
                <div className="text-emerald-400 font-semibold">Result: +20.8% YoY growth calculated.</div>
                <div className="text-slate-400 text-[11px]">The standard growth formula (New - Old) / Old accurately reflects business expansion.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Ichapur Factory Batch Unit Cost Allocation</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Dividing total batch manufacturing overhead across units produced.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Total_Overhead</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Units_Produced</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Unit_Overhead_Formula</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 85,000</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">1,700</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">=A2 / B2 (₹ 50.00 / Unit)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: =A2 / B2</div>
                <div className="text-emerald-400 font-semibold">Result: ₹ 50.00 per unit overhead allocation.</div>
                <div className="text-slate-400 text-[11px]">Division arithmetic enables standard absorption costing in manufacturing.</div>
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">#DIV/0! Error</td>
                  <td className="py-3 px-4 text-slate-300">Dividing by zero or an empty blank cell.</td>
                  <td className="py-3 px-4 text-amber-300">Cell displays #DIV/0! when units produced is 0.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Wrap formula in =IFERROR(A1/B1, 0) or =IF(B1=0, 0, A1/B1).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Multiplying by 100 on % Formatted Cells</td>
                  <td className="py-3 px-4 text-slate-300">Writing =(C2-B2)/B2 * 100 and then applying % format.</td>
                  <td className="py-3 px-4 text-amber-300">Displays 2080% instead of 20.8%.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Omit *100 when cell is formatted as Percentage.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">#VALUE! on Text Addition</td>
                  <td className="py-3 px-4 text-slate-300">Writing =A1 + B1 where A1 contains text 'N/A'.</td>
                  <td className="py-3 px-4 text-amber-300">Direct addition operator fails on text.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Use =SUM(A1, B1) which ignores text strings.</td>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Insert AutoSum formula.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Shift + %
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Format active cell as Percentage (0%).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Shift + $
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Format active cell as Currency (₹).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                F4
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Toggle absolute referencing on cell coordinates.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why does =SUM(A1, B1) return a valid number when B1 contains text, whereas =A1 + B1 returns #VALUE!?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does the =IFERROR() wrapper safeguard financial models against division by zero (#DIV/0!)?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is multiplying by 100 redundant when a cell is formatted with the % number mask?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Core Arithmetic Operations: Addition (+), Subtraction (-), Multiplication (*), Division (/) and Powers (^) - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Never allow raw #DIV/0! errors to appear on executive dashboards! Always wrap division formulas in =IFERROR(A1/B1, 0) or =IF(B1>0, A1/B1, 0) to ensure your models remain clean and professional."
          />
        </div>
      </div>
    </div>
  );
}
