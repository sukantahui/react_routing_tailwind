"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_003_custom_functions_with_lambda_and_helper_engines_master.xlsx?url";
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

  // Direct workbook download handler
  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "lambda_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-purple-500/30 selection:text-purple-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Function Syntax & Testing · Topic 1
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Prototype
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            LAMBDA Syntax & In-Cell Immediate Execution `(LAMBDA(...)(...))`
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Before deploying a custom function into Excel Name Manager for organization-wide use, analysts require a safe, 
            rapid sandbox to test calculations on live worksheet data. 
            Understanding <code className="text-purple-300 font-mono font-bold">LAMBDA</code> parameters and mastering 
            <strong>immediate execution syntax</strong>—appending argument parentheses directly to the function expression 
            <code className="text-emerald-300 font-mono font-bold">=(LAMBDA(x, x*2))(5)</code>—allows instant formula validation 
            without triggering <code className="text-rose-400 font-mono">#CALC!</code> errors.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Parameter Rules:</strong> Up to 253 input identifiers</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Immediate Execution:</strong> In-cell function prototyping</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>#CALC! Prevention:</strong> Understand function pointer mechanics</span>
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
              <span className="text-purple-400">⚡</span> Formula Anatomy: Immediate Execution Syntax
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pattern: =(LAMBDA(params, calc))(test_arguments)
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300">
            <span className="text-slate-500">// In-Cell Testing Formula Structure</span>
            <div className="mt-1 text-white font-bold">
              =(LAMBDA(<span className="text-amber-300">p1</span>, <span className="text-yellow-300">p2</span>, <span className="text-emerald-300">calc_expression</span>))(<span className="text-cyan-300">arg1</span>, <span className="text-sky-300">arg2</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example (Price, Qty, Discount Rate):</span>{" "}
              <span className="text-emerald-400 font-bold">=(LAMBDA(p, q, d, p * q * (1 - d)))(12500, 4, 0.05)</span>{" "}
              <span className="text-slate-500">→ 47,500</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Component</th>
                  <th className="py-3 px-4">Syntax Role</th>
                  <th className="py-3 px-4">Rules & Constraints</th>
                  <th className="py-3 px-4">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">LAMBDA(params...)</td>
                  <td className="py-3 px-4 text-purple-300">Function Declaration</td>
                  <td className="py-3 px-4 font-sans text-slate-300">0 to 253 parameter names. No spaces, no cell names (e.g. A1).</td>
                  <td className="py-3 px-4 text-slate-400">LAMBDA(price, qty, disc, ...)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">calc_expression</td>
                  <td className="py-3 px-4 text-emerald-400">Final Calculation</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Final mandatory argument evaluated and returned by the function.</td>
                  <td className="py-3 px-4 text-slate-400">price * qty * (1 - disc)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-cyan-300">(arg1, arg2...)</td>
                  <td className="py-3 px-4 text-sky-300">Invocation Block</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Trailing parentheses passing live values or cell coordinates to parameters.</td>
                  <td className="py-3 px-4 text-slate-400">(C5, D5, E5)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & CALCULATION MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">🔬</span> Conceptual & In-Memory Execution Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Positional Binding in RAM
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Why Bare LAMBDAs Return #CALC!
              </h3>
              <p className="leading-relaxed">
                In computer science, a function without arguments is an unevaluated function pointer. 
                When Excel sees <code className="text-amber-300 font-mono">=LAMBDA(x, x*2)</code> in a cell, it cannot display an abstract code pointer in a numeric grid—so it returns <code className="text-rose-400 font-mono">#CALC!</code>. 
                Adding <code className="text-emerald-400 font-mono">(5)</code> triggers evaluation.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-rose-300">
                Bare =LAMBDA() → #CALC! | =(LAMBDA())(5) → 10
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Left-to-Right Positional Argument Mapping
              </h3>
              <p className="leading-relaxed">
                When arguments are passed in trailing parentheses <code className="text-cyan-300 font-mono">(C5, D5, E5)</code>, 
                Excel maps the 1st argument to the 1st parameter, the 2nd to the 2nd parameter, and so on. Data types (numbers, dates, text, spilled arrays) are passed with full precision.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Arg 1 → Param 1 | Arg 2 → Param 2 | Arg 3 → Param 3
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Dynamic Spilled Returns from Immediate LAMBDAs
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Immediate execution LAMBDAs are not limited to single numbers. 
              By nesting <code className="text-violet-300 font-mono">HSTACK</code> or <code className="text-violet-300 font-mono">VSTACK</code> in the calculation expression, 
              you can return a complete multi-column dynamic spilled block directly in your worksheet:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                =(LAMBDA(p, q, d, LET(net, p*q*(1-d), HSTACK(net, net*0.18, net*1.18))))(12500, 4, 0.05)
              </code>
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">📐</span> Visual In-Cell Prototyping & Execution Flow
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Interactive Execution Pipeline
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how immediate execution binds test arguments into LAMBDA parameters and evaluates in memory:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glows */}
              <circle cx="150" cy="170" r="80" fill="#9333EA" fillOpacity="0.05" />
              <circle cx="440" cy="170" r="80" fill="#0284C7" fillOpacity="0.05" />
              <circle cx="710" cy="170" r="80" fill="#10B981" fillOpacity="0.05" />

              {/* Arguments (Left) */}
              <rect x="25" y="40" width="220" height="260" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="40" width="220" height="34" rx="14" fill="#7E22CE" fillOpacity="0.3" />
              <text x="135" y="62" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">TEST VALUES (ARGUMENTS)</text>

              <g transform="translate(40, 85)">
                <rect width="190" height="30" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="95" y="20" fill="#E2E8F0" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Arg 1: C5 = ₹12,500 (Price)</text>

                <rect y="38" width="190" height="30" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="95" y="58" fill="#E2E8F0" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Arg 2: D5 = 4 (Qty)</text>

                <rect y="76" width="190" height="30" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="95" y="96" fill="#E2E8F0" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Arg 3: E5 = 0.05 (Disc)</text>
              </g>

              <rect x="40" y="215" width="190" height="65" rx="8" fill="#7E22CE" fillOpacity="0.12" stroke="#7E22CE" strokeDasharray="3 3" />
              <text x="135" y="235" fill="#E9D5FF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Trailing Argument Block</text>
              <text x="135" y="253" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">(C5, D5, E5)</text>
              <text x="135" y="269" fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Passed directly to closure</text>

              {/* Arrow */}
              <path d="M 260 170 L 330 170" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="335,170 325,165 325,175" fill="#A855F7" />

              {/* Center Engine */}
              <rect x="340" y="50" width="240" height="240" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="340" y="50" width="240" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="460" y="72" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">LAMBDA CLOSURE (IN CELL)</text>

              <g transform="translate(350, 95)">
                <rect width="220" height="42" rx="6" fill="#3B0764" stroke="#A855F7" />
                <text x="110" y="18" fill="#F5D0FE" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=(LAMBDA(p, q, d,</text>
                <text x="110" y="34" fill="#A7F3D0" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">p * q * (1 - d)))(C5, D5, E5)</text>
              </g>

              <text x="460" y="165" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Evaluation Steps:</text>
              <text x="460" y="185" fill="#F5D0FE" fontSize="9.5" textAnchor="middle" fontFamily="monospace">p = 12500, q = 4, d = 0.05</text>
              <text x="460" y="203" fill="#F5D0FE" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Gross = 12500 * 4 = 50,000</text>
              <text x="460" y="221" fill="#F5D0FE" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Net = 50,000 * 0.95 = 47,500</text>
              <text x="460" y="245" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Evaluated in 0.1ms</text>

              {/* Arrow */}
              <path d="M 595 170 L 655 170" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="660,170 650,165 650,175" fill="#10B981" />

              {/* Output (Right) */}
              <rect x="665" y="40" width="165" height="260" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="665" y="40" width="165" height="34" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="747" y="62" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CELL RESULT</text>

              <g transform="translate(675, 95)">
                <rect width="145" height="36" rx="6" fill="#064E3B" stroke="#10B981" />
                <text x="72" y="22" fill="#A7F3D0" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">₹47,500.00</text>
              </g>

              <rect x="675" y="195" width="145" height="90" rx="6" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeDasharray="3 3" />
              <text x="747" y="220" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Instant Verification</text>
              <text x="747" y="240" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">Zero #CALC! Errors</text>
              <text x="747" y="258" fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Ready for Name Manager</text>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet & Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the product billing dataset below or download the master workbook to test immediate execution LAMBDAs in Microsoft Excel.
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
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="EX1802"
            title="Commercial Billing Dataset (Price, Qty, Discount Testing Grid)"
            rowsPerPage={10}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-amber-400">🏢</span> Real-World Corporate Business Scenarios
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Corporate Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Commercial Discount Pricing</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore Solar Store</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Instant Multi-Variable Discount Invoicing
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Swadeep Banerjee</strong> prototypes a net invoice formula for high-value solar inverters (<code className="text-amber-300 font-mono">C5:E5</code>). 
                Writing <code className="text-emerald-300 font-mono">=(LAMBDA(p, q, d, p * q * (1 - d)))(C5, D5, E5)</code> evaluates in-cell instantly, verifying that a 5% discount on ₹50,000 gross yields ₹47,500.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =(LAMBDA(p, q, d, p * q * (1 - d)))(C5, D5, E5) → ₹47,500.00
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Payroll Incentive Prototyping</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Facility</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Multi-Tier Commission Band Testing
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                HR Manager <strong>Tuhina Mukherjee</strong> tests a tiered commission formula on sales achievements. 
                Using <code className="text-amber-300 font-mono">=(LAMBDA(sales, IF(sales>500000, sales*0.08, sales*0.05)))(F5)</code>, 
                she tests tier transitions directly in the cell before registering the commission rule in Name Manager.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Formula: =(LAMBDA(s, IF(s>500k, s*8%, s*5%)))(F5)
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Financial Compound Interest</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Advisory</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Prototyping Future Value of Fixed Deposits
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Wealth Manager <strong>Abhronila Sengupta</strong> prototypes compound interest for client investment portfolios: 
                <code className="text-amber-300 font-mono">=(LAMBDA(P, r, n, t, P * (1 + r/n)^(n*t)))(100000, 0.075, 4, 3)</code>, confirming maturity value of ₹124,972 in 1 formula cell.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Formula: =(LAMBDA(P, r, n, t, P*(1+r/n)^(n*t)))(...) → Verified Return
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Multi-Column Spilled Tax Block</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Prototyping Spilled CGST + SGST Breakdown
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Tax Auditor <strong>Susmita Roy</strong> prototypes a 3-column dynamic spilled tax breakdown: 
                <code className="text-amber-300 font-mono">=(LAMBDA(amt, HSTACK(amt, amt*0.09, amt*0.09, amt*1.18)))(45000)</code>, spilling [Taxable, CGST 9%, SGST 9%, Gross Total] across 4 columns.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Formula: =(LAMBDA(a, HSTACK(a, a*0.09, a*0.09, a*1.18)))(45k) → Spills 4 Columns
              </div>
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
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">🪜</span> Step-by-Step Immediate Execution Walkthrough
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Write the Core LAMBDA Expression</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">G5</code>, write: <code className="text-amber-300 font-mono">=LAMBDA(p, q, d, p * q * (1 - d))</code>. Notice that pressing Enter immediately triggers a <code className="text-rose-400 font-mono">#CALC!</code> error.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Wrap LAMBDA in Enclosing Parentheses</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Enclose the entire LAMBDA block in parentheses: <code className="text-purple-300 font-mono">=(LAMBDA(p, q, d, p * q * (1 - d)))</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Append the Trailing Argument Block</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Add <code className="text-emerald-400 font-mono">(C5, D5, E5)</code> directly after the closing parenthesis: <br />
                  <code className="text-emerald-400 font-mono">=(LAMBDA(p, q, d, p * q * (1 - d)))(C5, D5, E5)</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Press Enter & Verify Output</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. The cell immediately calculates <code className="text-emerald-300 font-mono">47500</code>. Double-click the fill handle or drag down to evaluate all rows.
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
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚠️</span> Common Errors & Troubleshooting Matrix
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Error Diagnostic Protocol
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Error Code</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#CALC! (Uninvoked)</td>
                  <td className="py-3 px-4 text-slate-300">Omitted the trailing argument block <code className="text-amber-300 font-mono">(args)</code> in cell.</td>
                  <td className="py-3 px-4 text-slate-400">Cell contains raw LAMBDA without invocation.</td>
                  <td className="py-3 px-4 text-emerald-400">Append test arguments <code className="text-emerald-400 font-mono">(C5, D5, E5)</code> or register in Name Manager.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (Argument Mismatch)</td>
                  <td className="py-3 px-4 text-slate-300">Passed fewer or more arguments than parameters defined in the signature.</td>
                  <td className="py-3 px-4 text-slate-400">Count arguments in trailing parentheses vs parameters.</td>
                  <td className="py-3 px-4 text-emerald-400">Ensure parameter count matches argument count exactly.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Syntax Error on Param Names</td>
                  <td className="py-3 px-4 text-slate-300">Named a parameter like 'C2', 'SUM', or used spaces.</td>
                  <td className="py-3 px-4 text-slate-400">Excel highlights parameter with formula error alert.</td>
                  <td className="py-3 px-4 text-emerald-400">Use valid variable names like <code className="text-emerald-400 font-mono">price</code>, <code className="text-emerald-400 font-mono">qty</code>, <code className="text-emerald-400 font-mono">rate</code>.</td>
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
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">💡</span> High-Speed Keyboard Shortcuts & Pro Tips
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Prototyping Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Evaluate In-Place</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight the entire =(LAMBDA(...))(...) in the formula bar and press <strong>F9</strong> to view the evaluated result in RAM.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Copy to Name Manager</span>
                <span>Production Deployment</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Once validated with immediate execution, copy everything except the trailing argument block into Name Manager!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Wrap in HSTACK</span>
                <span>Multi-Metric Spills</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Return multiple calculated values: <code className="text-amber-300 font-mono">=(LAMBDA(x, HSTACK(x, x*1.18)))(500)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-fuchsia-400 font-mono font-bold">Nullary Execution</span>
                <span>0 Parameters</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Call a 0-parameter LAMBDA using empty trailing parentheses: <code className="text-emerald-300 font-mono">=(LAMBDA(TODAY()))()</code>.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">🤔</span> Socratic Analytical Reflection
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Critical Thinking Prompts
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Reflect on immediate execution syntax:</strong> Why is appending trailing parentheses <code className="text-purple-300 font-mono">(C5, D5, E5)</code> directly after the LAMBDA closure essential for testing in active worksheet cells?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine parameter naming hazards:</strong> What happens if an analyst names a parameter <code className="text-rose-400 font-mono">C2</code> or <code className="text-rose-400 font-mono">R1C1</code>? Why does Excel block these names?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider deployment workflow:</strong> Once you have verified your formula with immediate execution, what exact portion of the formula is pasted into Name Manager?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="LAMBDA Syntax & Testing — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Mastering in-cell immediate execution syntax =(LAMBDA(params, calc))(args) is the fundamental prerequisite for functional Excel programming. Always use immediate execution as your testing sandbox to verify edge cases, inspect intermediate outputs with F9, and ensure mathematical accuracy on real data before publishing to Name Manager!"
            }
          />
        </div>
      </div>
    </div>
  );
}
