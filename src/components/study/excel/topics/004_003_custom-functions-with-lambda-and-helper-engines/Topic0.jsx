"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_003_custom_functions_with_lambda_and_helper_engines_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic0() {
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
              ⚡ Functional Excel Architecture · Topic 0
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 6: Evaluate & Create
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Introduction to LAMBDA: Native Custom Functions Without VBA
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            For three decades, building custom business functions in Excel required writing Visual Basic for Applications (VBA) 
            in macro-enabled workbooks (<code className="text-purple-300 font-mono">.xlsm</code>)—introducing IT security blockades, 
            sluggish COM execution, and broken compatibility on Excel for Web and Mobile. 
            The <code className="text-purple-300 font-mono font-bold">LAMBDA</code> function transforms Excel into a 
            <strong>Turing-complete functional programming language</strong>, enabling modelers to author, name, and deploy custom 
            worksheet functions natively in compiled C++ RAM with zero VBA code.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Pure Functional Programming:</strong> First-class closures & recursion</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>100% Zero-VBA:</strong> Macro-free cross-platform compatibility</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Helper Engine:</strong> MAP, SCAN, REDUCE, BYROW, BYCOL, MAKEARRAY</span>
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
              <span className="text-purple-400">⚡</span> Formula Anatomy: =LAMBDA()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Return: Callable Function Closure
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300">
            <span className="text-slate-500">// Standard Syntax Signature</span>
            <div className="mt-1 text-white font-bold">
              =LAMBDA([<span className="text-amber-300">parameter1</span>, <span className="text-yellow-300">parameter2</span>, ...], <span className="text-emerald-300">calculation</span>)
            </div>
            <div className="mt-3 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// In-Cell Immediate Execution Syntax (Testing in a worksheet cell):</span>{" "}
              <br />
              <span className="text-emerald-400 font-bold">=(LAMBDA(price, qty, price * qty * 1.18))(1500, 4)</span>{" "}
              <span className="text-slate-500">&rarr; Returns 7080</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Behavior & Definition Rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">parameter1..N</td>
                  <td className="py-3 px-4 text-slate-300">Identifier Name</td>
                  <td className="py-3 px-4 text-slate-400">Optional (0 to 253)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    Names given to inputs (e.g. <code className="text-amber-300 font-mono">price</code>, <code className="text-amber-300 font-mono">qty</code>). Wrap in brackets <code className="text-yellow-300 font-mono">[opt]</code> for optional parameters.
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">calculation</td>
                  <td className="py-3 px-4 text-slate-300">Excel Expression</td>
                  <td className="py-3 px-4 text-emerald-400">Required (Final Arg)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    The calculation expression evaluated and returned by the function. Can incorporate standard functions and <code className="text-purple-300 font-mono">LET</code>.
                  </td>
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
              <span className="text-emerald-400">🔬</span> Conceptual & Functional Programming Architecture
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Turing-Complete Excel
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Modern LAMBDA vs. Legacy VBA
              </h3>
              <p className="leading-relaxed">
                VBA functions execute outside Excel's native dependency calculation graph via slow COM interop. 
                LAMBDA compiles directly into Excel's multi-threaded C++ calculation engine. It runs on Excel for Web, Mac, and iOS with zero macro warnings.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                Native C++ RAM Execution · Cross-Platform · Macro-Free Security
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> The Helper Engine Synergy
              </h3>
              <p className="leading-relaxed">
                LAMBDA serves as the computational heart for Excel's higher-order helper functions:
                <code className="text-sky-300 font-mono">MAP</code> (element-wise), <code className="text-indigo-300 font-mono">BYROW</code>/<code className="text-indigo-300 font-mono">BYCOL</code> (vector aggregations), 
                <code className="text-teal-300 font-mono">SCAN</code> (accumulators), and <code className="text-fuchsia-300 font-mono">REDUCE</code> (folding).
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Higher-Order Functions + LAMBDA Closures
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> The Name Manager Deployment Pipeline
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Once you test your LAMBDA in an active worksheet cell using immediate execution syntax, copy the formula into Excel Name Manager 
              (<kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300 text-xs font-mono">Ctrl+F3</kbd>). 
              Save it with a clean corporate name (e.g. <code className="text-emerald-300 font-mono">CALC_GST</code>) and add parameter documentation in the Comment field. 
              Users can now call <code className="text-emerald-300 font-mono">=CALC_GST(A2, 0.18)</code> anywhere in the workbook!
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
              <span className="text-purple-400">📐</span> Visual Functional Closure & Execution Architecture
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Interactive Functional Pipeline
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Examine how LAMBDA encapsulates input parameters, evaluates calculations via LET in memory, and returns dynamic scalar or spilled array results:
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

              {/* Input Arguments (Left) */}
              <rect x="25" y="40" width="220" height="260" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="40" width="220" height="34" rx="14" fill="#7E22CE" fillOpacity="0.3" />
              <text x="135" y="62" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CALLER ARGUMENTS</text>

              <g transform="translate(40, 85)">
                <rect width="190" height="30" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="95" y="20" fill="#E2E8F0" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Arg 1: Price = ₹45,000</text>

                <rect y="38" width="190" height="30" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="95" y="58" fill="#E2E8F0" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Arg 2: Qty = 4 units</text>

                <rect y="76" width="190" height="30" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="95" y="96" fill="#E2E8F0" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Arg 3: GST_Rate = 18%</text>
              </g>

              <rect x="40" y="215" width="190" height="65" rx="8" fill="#7E22CE" fillOpacity="0.12" stroke="#7E22CE" strokeDasharray="3 3" />
              <text x="135" y="235" fill="#E9D5FF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Worksheet Call</text>
              <text x="135" y="253" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">=INVOICE_TOTAL(45k, 4, 18%)</text>
              <text x="135" y="269" fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Named or In-Cell (LAMBDA()())</text>

              {/* Arrow */}
              <path d="M 260 170 L 330 170" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="335,170 325,165 325,175" fill="#A855F7" />

              {/* Center Engine */}
              <rect x="340" y="50" width="240" height="240" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="340" y="50" width="240" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="460" y="72" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">LAMBDA CLOSURE (RAM)</text>

              <g transform="translate(350, 95)">
                <rect width="220" height="42" rx="6" fill="#3B0764" stroke="#A855F7" />
                <text x="110" y="18" fill="#F5D0FE" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=LAMBDA(p, q, r,</text>
                <text x="110" y="34" fill="#A7F3D0" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">LET(sub, p*q, HSTACK(sub, sub*r, sub*(1+r))))</text>
              </g>

              <text x="460" y="165" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Internal Execution Pipeline:</text>
              <text x="460" y="185" fill="#F5D0FE" fontSize="9.5" textAnchor="middle" fontFamily="monospace">1. Bind p=45k, q=4, r=0.18</text>
              <text x="460" y="203" fill="#F5D0FE" fontSize="9.5" textAnchor="middle" fontFamily="monospace">2. Evaluate LET(sub = ₹180k)</text>
              <text x="460" y="221" fill="#F5D0FE" fontSize="9.5" textAnchor="middle" fontFamily="monospace">3. Compute GST (₹32.4k) & Gross (₹212.4k)</text>
              <text x="460" y="245" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ 100% C++ Vectorized Execution</text>

              {/* Arrow */}
              <path d="M 595 170 L 655 170" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="660,170 650,165 650,175" fill="#10B981" />

              {/* Output Spilled Result (Right) */}
              <rect x="665" y="40" width="165" height="260" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="665" y="40" width="165" height="34" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="747" y="62" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">RETURNED VALUE</text>

              <g transform="translate(675, 85)">
                <rect width="145" height="28" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="72" y="18" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">Subtotal: ₹180,000</text>

                <rect y="36" width="145" height="28" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="72" y="54" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">GST @ 18%: ₹32,400</text>

                <rect y="72" width="145" height="28" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="72" y="90" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">Gross: ₹212,400</text>
              </g>

              <rect x="675" y="215" width="145" height="70" rx="6" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeDasharray="3 3" />
              <text x="747" y="240" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Spilled Array Output</text>
              <text x="747" y="260" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">1 Row x 3 Columns</text>
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
                Explore the functional Excel master directory below or download the practice workbook to test <code className="text-purple-300 font-mono">LAMBDA</code> in Microsoft Excel.
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
            sheetName="Topic0_Overview"
            title="Module 004_003 Master Architecture (LAMBDA & Functional Engine Overview)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Proprietary Tax Engine</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore Industrial Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Standardizing GST Calculations Across Campus Invoices
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Swadeep Banerjee</strong> creates a reusable corporate function in Name Manager: 
                <code className="text-emerald-300 font-mono">CALC_GST = LAMBDA(net, rate, HSTACK(net, net*rate, net*(1+rate)))</code>. 
                Accountants across the campus simply write <code className="text-purple-300 font-mono">=CALC_GST(A2, 0.18)</code>, ensuring uniform tax compliance.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =CALC_GST(A2, 0.18) &rarr; Standard 3-Column Spilled Tax Block
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Banking Treasury Operations</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Centre</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Dynamic Running Balance Accumulator
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Treasury Officer <strong>Tuhina Mukherjee</strong> calculates running daily cash balances without formula dragging. 
                Using <code className="text-amber-300 font-mono">=SCAN(0, MovementVector, LAMBDA(acc, v, acc + v))</code>, 
                she builds a self-updating running ledger that automatically resizes when new entries are added.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Formula: =SCAN(0, D2:D50, LAMBDA(a, v, a + v)) &rarr; Real-Time Balance Vector
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Financial Advisory & Loans</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Advisory</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Instant Monthly EMI & Amortization Schedules
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Consultant <strong>Abhronila Sengupta</strong> packages complex loan formulas into <code className="text-amber-300 font-mono">LOAN_EMI = LAMBDA(P, r, n, LET(rate, r/12, P*rate*(1+rate)^n / ((1+rate)^n - 1)))</code>. 
                Junior analysts evaluate customer mortgage quotes instantly with <code className="text-indigo-300 font-mono">=LOAN_EMI(500000, 0.085, 36)</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Formula: =LOAN_EMI(P, r, n) &rarr; Zero Formula Errors
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Automated Data Cleansing</span>
                <span className="text-xs font-mono text-slate-400">Naihati Software Lab</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Recursive Text Sanitization Without VBA
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                DevOps Engineer <strong>Debangshu Ghosh</strong> cleanses customer phone numbers containing noise characters (<code className="text-amber-300 font-mono">"()- ."</code>). 
                He creates a recursive LAMBDA <code className="text-amber-300 font-mono">CLEAN_STR = LAMBDA(txt, bad, IF(bad="", txt, CLEAN_STR(SUBSTITUTE(txt, LEFT(bad,1), ""), MID(bad,2,LEN(bad)))))</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Formula: =CLEAN_STR(PhoneCell, "()- .") &rarr; Pure 10-Digit Clean String
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
              <span className="text-purple-400">🪜</span> Step-by-Step Practical LAMBDA Authoring Walkthrough
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Prototype Logic in a Cell</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Start with a regular formula in cell <code className="text-amber-300 font-mono">D2</code>: <code className="text-amber-300 font-mono">=B2 * C2 * 1.18</code>. Confirm it calculates correctly for test numbers.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Wrap in LAMBDA & Test with Immediate Execution</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Transform into an anonymous function: <code className="text-emerald-400 font-mono">=(LAMBDA(price, qty, price * qty * 1.18))(B2, C2)</code>. 
                  Press Enter to verify in-cell calculation.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Register in Name Manager (Ctrl+F3)</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Open Name Manager (<kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300 text-xs font-mono">Ctrl+F3</kbd>) &rarr; Click 'New'. 
                  Set Name = <code className="text-emerald-300 font-mono">GROSS_INVOICE</code>, Refers To = <code className="text-emerald-300 font-mono">=LAMBDA(price, qty, price * qty * 1.18)</code>, and add Comment documentation.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Consume as Native Worksheet Function</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In any worksheet cell, type <code className="text-emerald-300 font-mono">=GROSS_INVOICE(B2, C2)</code>. 
                  Notice how Excel displays formula autocomplete tooltips just like built-in functions!
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#CALC! (Uninvoked LAMBDA)</td>
                  <td className="py-3 px-4 text-slate-300">Entering a bare <code className="text-amber-300 font-mono">=LAMBDA(x, x*2)</code> in a cell without trailing argument block.</td>
                  <td className="py-3 px-4 text-slate-400">Cell displays #CALC! tag.</td>
                  <td className="py-3 px-4 text-emerald-400">Append test arguments <code className="text-emerald-400 font-mono">(5)</code> or register in Name Manager.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (Argument Mismatch)</td>
                  <td className="py-3 px-4 text-slate-300">Passing fewer or more arguments than defined in the non-optional parameter list.</td>
                  <td className="py-3 px-4 text-slate-400">Argument count does not match signature.</td>
                  <td className="py-3 px-4 text-emerald-400">Provide all required arguments or mark optional parameters with <code className="text-emerald-400 font-mono">[ ]</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#NUM! (Infinite Recursion)</td>
                  <td className="py-3 px-4 text-slate-300">Recursive LAMBDA missing a base termination condition or exceeding 1,024 calls.</td>
                  <td className="py-3 px-4 text-slate-400">Formula halts and returns #NUM!.</td>
                  <td className="py-3 px-4 text-emerald-400">Add an explicit base-case check (e.g. <code className="text-emerald-400 font-mono">IF(n&lt;=1, 1, ...)</code>).</td>
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
              LAMBDA Secrets
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">Ctrl+F3</kbd>
                <span>Open Name Manager</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Directly open Excel Name Manager to create, edit, and document custom LAMBDA functions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">LET Inside LAMBDA</span>
                <span>Sub-Millisecond Speed</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always nest <code className="text-amber-300 font-mono">LET</code> inside LAMBDA to cache heavy calculation steps in memory.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">FX_ Prefix Standard</span>
                <span>Corporate Naming</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prefix custom function names with <code className="text-sky-300 font-mono">FX_</code> or <code className="text-sky-300 font-mono">CORP_</code> to distinguish them from native functions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Immediate Evaluation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight the immediate execution expression in the formula bar and press <strong>F9</strong> to test output before saving in Name Manager.
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
                <strong>Reflect on architectural paradigm:</strong> Why does creating custom business functions with <code className="text-purple-300 font-mono">LAMBDA</code> represent a massive leap forward over legacy VBA macros for modern enterprise data governance?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine testing ergonomics:</strong> Why is immediate execution syntax <code className="text-emerald-300 font-mono">=(LAMBDA(x, x*2))(5)</code> so vital during function authoring before saving in Name Manager?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider recursion limits:</strong> How does Excel prevent infinite loops in recursive LAMBDAs, and what error code is returned if recursion exceeds 1,024 calls?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Introduction to LAMBDA — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Welcome to Module 004_003: Custom Functions with LAMBDA & Helper Engines! The introduction of LAMBDA marks the single most important mathematical evolution in Excel's history. You can now package complex, proprietary business formulas into clean, named functions that anyone in your organization can use with zero macro security warnings. Master the four-step authoring workflow: Prototype in LET, test with (args), save in Name Manager, and document for end-users!"
            }
          />
        </div>
      </div>
    </div>
  );
}
