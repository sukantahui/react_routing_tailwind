"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/lambda_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic10() {
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
              ⚡ Progressive Accumulator Engine · Topic 10
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Accumulate
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Accumulator Algorithms: Running Balances & Progressive Totals with SCAN
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In corporate accounting, inventory management, and trading analytics, calculating running balances 
            using legacy dragged formulas like <code className="text-rose-400 font-mono">=SUM($D$5:D5)</code> leads to 
            crippling <code className="text-amber-300 font-mono">O(N^2)</code> quadratic calculation slowdowns across large tables. 
            The <code className="text-purple-300 font-mono font-bold">SCAN</code> helper function provides a true 
            <strong>linear O(N) accumulator engine</strong> in compiled memory, computing progressive ledger balances, 
            peak watermarks, streak counters, and compounding returns in a single spilled formula.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Linear O(N) Speed:</strong> ~15ms for 100,000 rows</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>State Preservation:</strong> Returns every progressive step</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Zero Dragged Formulas:</strong> Single top-cell dynamic spill</span>
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
              <span className="text-purple-400">⚡</span> Formula Anatomy: =SCAN()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pattern: =SCAN([initial_val], array, LAMBDA(acc, val, calc))
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Running Accumulator Structure</span>
            <div className="mt-1 text-white font-bold">
              =SCAN(<span className="text-amber-300">[initial_value]</span>, <span className="text-yellow-300">array</span>, <span className="text-purple-300">LAMBDA</span>(<span className="text-sky-300">accumulator</span>, <span className="text-cyan-300">value</span>, <span className="text-emerald-300">calculation</span>))
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Bank Ledger Running Balance (Opening Balance ₹50,000):</span> <br />
              <span className="text-emerald-400 font-bold">
                =SCAN(50000, D5:D10, LAMBDA(balance, txn, balance + txn))
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Syntax Role</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Accumulator Mechanics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">[initial_value]</td>
                  <td className="py-3 px-4 text-slate-300">Seed State</td>
                  <td className="py-3 px-4 text-slate-400">Optional (Defaults to 0)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The starting seed passed into <code className="text-sky-300 font-mono">acc</code> for the very first item evaluation.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-yellow-300">array</td>
                  <td className="py-3 px-4 text-slate-300">Input Data Sequence</td>
                  <td className="py-3 px-4 text-emerald-400">Mandatory</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The array or range to scan element-by-element. Output dimensions match this array.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-300">LAMBDA(acc, val)</td>
                  <td className="py-3 px-4 text-purple-300">Accumulator Closure</td>
                  <td className="py-3 px-4 text-emerald-400">Strictly 2 Params</td>
                  <td className="py-3 px-4 font-sans text-slate-300"><code className="text-sky-300 font-mono">acc</code> is previous step output; <code className="text-cyan-300 font-mono">val</code> is current array element.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">calculation</td>
                  <td className="py-3 px-4 text-emerald-400">Updated State</td>
                  <td className="py-3 px-4 text-emerald-400">Scalar Output</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Returns updated accumulator state, which is spilled into the result cell and passed to the next step.</td>
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
              <span className="text-emerald-400">🔬</span> Mathematical Recurrence & Linear Complexity O(N)
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              State Machine Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Mathematical Recurrence Model
              </h3>
              <p className="leading-relaxed">
                SCAN operates as a formal finite-state machine. Given seed <code className="text-amber-300 font-mono">s₀</code> and input sequence <code className="text-cyan-300 font-mono">[x₁, x₂, ... xₙ]</code>:
                <br />
                • <code className="text-emerald-300 font-mono">s₁ = f(s₀, x₁)</code> &rarr; Spills to Cell 1
                <br />
                • <code className="text-emerald-300 font-mono">s₂ = f(s₁, x₂)</code> &rarr; Spills to Cell 2
                <br />
                • <code className="text-emerald-300 font-mono">sₙ = f(sₙ₋₁, xₙ)</code> &rarr; Spills to Cell N
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                Pure Recurrence Relation Evaluated in Contiguous RAM
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Why Legacy SUM($D$5:D5) Freezes Excel
              </h3>
              <p className="leading-relaxed">
                When formula <code className="text-rose-400 font-mono">=SUM($D$5:D5)</code> is dragged down 100,000 rows, row 100,000 sums 100k cells. Total calculations: 
                <code className="text-amber-300 font-mono">N*(N+1)/2 = 5 Billion operations (O(N²))</code>! 
                <code className="text-emerald-300 font-mono">SCAN</code> only performs 1 operation per row (<code className="text-emerald-300 font-mono">O(N) = 100,000 operations</code>).
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                50,000x Speedup: 100k Rows Calculated in 15 Milliseconds
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Combining SCAN with HSTACK for Self-Balancing Ledgers
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              You can attach a SCAN calculated running balance directly to your ledger transactions table:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                =HSTACK(TransactionRecords, SCAN(50000, CHOOSECOLS(TransactionRecords, 4), LAMBDA(b, t, b + t)))
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
              <span className="text-purple-400">📐</span> Visual SCAN State Machine & Running Balance Progression
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              State Progression Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how SCAN updates its internal accumulator state across 6 bank ledger transactions starting at ₹50,000:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Transactions (Left) */}
              <rect x="25" y="30" width="220" height="280" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="30" width="220" height="34" rx="12" fill="#7E22CE" fillOpacity="0.3" />
              <text x="135" y="52" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">TXN AMOUNTS (array)</text>

              <g transform="translate(35, 75)">
                <rect width="200" height="24" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="16" fill="#A7F3D0" fontSize="9" fontFamily="monospace">1. +₹15,000 (Client Fee)</text>

                <rect y="30" width="200" height="24" rx="4" fill="#7F1D1D" stroke="#EF4444" />
                <text x="10" y="46" fill="#FECACA" fontSize="9" fontFamily="monospace">2. -₹8,000  (Rent)</text>

                <rect y="60" width="200" height="24" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="76" fill="#A7F3D0" fontSize="9" fontFamily="monospace">3. +₹22,000 (Consulting)</text>

                <rect y="90" width="200" height="24" rx="4" fill="#7F1D1D" stroke="#EF4444" />
                <text x="10" y="106" fill="#FECACA" fontSize="9" fontFamily="monospace">4. -₹12,000 (Tax Advance)</text>

                <rect y="120" width="200" height="24" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="136" fill="#A7F3D0" fontSize="9" fontFamily="monospace">5. +₹30,000 (Project Milestone)</text>

                <rect y="150" width="200" height="24" rx="4" fill="#7F1D1D" stroke="#EF4444" />
                <text x="10" y="166" fill="#FECACA" fontSize="9" fontFamily="monospace">6. -₹5,000  (Utilities)</text>
              </g>

              <rect x="35" y="260" width="200" height="38" rx="6" fill="#1E293B" stroke="#334155" />
              <text x="135" y="277" fill="#FDE047" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Seed: Initial Value = ₹50,000</text>
              <text x="135" y="291" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Opening Ledger Balance</text>

              {/* Arrow */}
              <path d="M 260 170 L 315 170" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,170 310,165 310,175" fill="#A855F7" />

              {/* Accumulator Engine (Center) */}
              <rect x="325" y="30" width="270" height="280" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="325" y="30" width="270" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="460" y="52" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SCAN ACCUMULATOR CLOSURE</text>

              <g transform="translate(340, 75)">
                <rect width="240" height="46" rx="6" fill="#3B0764" stroke="#A855F7" />
                <text x="120" y="18" fill="#F5D0FE" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">LAMBDA(balance, txn,</text>
                <text x="120" y="34" fill="#A7F3D0" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">balance + txn)</text>
              </g>

              <g transform="translate(340, 130)" fontFamily="monospace" fontSize="8.5" fill="#E2E8F0">
                <text x="0" y="15">s₁ = 50k + 15k = ₹65,000</text>
                <text x="0" y="32">s₂ = 65k - 8k  = ₹57,000</text>
                <text x="0" y="49">s₃ = 57k + 22k = ₹79,000</text>
                <text x="0" y="66">s₄ = 79k - 12k = ₹67,000</text>
                <text x="0" y="83">s₅ = 67k + 30k = ₹97,000</text>
                <text x="0" y="100">s₆ = 97k - 5k  = ₹92,000</text>
              </g>

              <text x="460" y="285" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ 6 Steps Evaluated Sequentially</text>

              {/* Arrow */}
              <path d="M 610 170 L 645 170" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="650,170 640,165 640,175" fill="#10B981" />

              {/* Spilled Result (Right) */}
              <rect x="655" y="30" width="170" height="280" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="655" y="30" width="170" height="34" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="740" y="52" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">RUNNING BALANCE</text>

              <g transform="translate(665, 75)">
                <rect width="150" height="24" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="75" y="16" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">₹65,000</text>

                <rect y="30" width="150" height="24" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="75" y="46" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">₹57,000</text>

                <rect y="60" width="150" height="24" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="75" y="76" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">₹79,000</text>

                <rect y="90" width="150" height="24" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="75" y="106" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">₹67,000</text>

                <rect y="120" width="150" height="24" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="75" y="136" fill="#FDE047" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">₹97,000 (Peak)</text>

                <rect y="150" width="150" height="24" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="75" y="166" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">₹92,000</text>
              </g>

              <text x="740" y="280" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">6 Rows Spilled</text>
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
                Explore the bank transactions ledger dataset below or download the master workbook to test <code className="text-purple-300 font-mono">SCAN</code> in Microsoft Excel.
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
            sheetName="Topic10_SCAN"
            title="Corporate Bank Account Ledger (Txn ID, Description, Category, Net Amount ₹)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Banking Cash Flow</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore Branch</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Single-Cell Real-Time Ledger Balance
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Swadeep Banerjee</strong> replaces 20,000 dragged formulas with: 
                <code className="text-emerald-300 font-mono">=SCAN(50000, D5:D20000, LAMBDA(bal, txn, bal + txn))</code>. 
                Computes the entire bank running balance in 3ms and completely prevents broken formula references.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =SCAN(50000, D5:D20000, ...) &rarr; 20,000 Balances Spilled
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Trading Peak & Drawdown</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                High-Water Mark Portfolio Tracker
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Portfolio Manager <strong>Tuhina Mukherjee</strong> calculates peak portfolio value: 
                <code className="text-amber-300 font-mono">=SCAN(100000, DailyValues, LAMBDA(peak, val, MAX(peak, val)))</code>, 
                monitoring maximum drawdown and performance milestones in pure memory.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Running High-Water Mark: Tracks Portfolio All-Time Highs
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Inventory Warehouse Logistics</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Stock-on-Hand Dispatches & Receipts Tracker
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Warehouse Controller <strong>Abhronila Sengupta</strong> tracks available inventory: 
                <code className="text-indigo-300 font-mono">=SCAN(1500, StockMovements, LAMBDA(stock, move, stock + move))</code>, 
                ensuring real-time stock visibility and safety reorder alerts.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Formula: =SCAN(1500, Movements, ...) &rarr; Real-Time Inventory Ledger
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · HR Consecutive Streak Counter</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Zero-Defect Production Streak Tracking
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                HR Lead <strong>Debangshu Ghosh</strong> monitors consecutive perfect attendance: 
                <code className="text-amber-300 font-mono">=SCAN(0, AttendanceColumn, LAMBDA(streak, status, IF(status="Present", streak+1, 0)))</code>, 
                automatically resetting streak counters upon any missed shift.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Automatic Self-Resetting Attendance Streak Engine
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
              <span className="text-purple-400">🪜</span> Step-by-Step SCAN Implementation Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Identify Initial State and Transaction Column</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Opening ledger balance: <code className="text-amber-300 font-mono">₹50,000</code>. Transaction column: <code className="text-amber-300 font-mono">D5:D10</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Declare SCAN with Initial Value and Array</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">E5</code>, write: <code className="text-purple-300 font-mono">=SCAN(50000, D5:D10, ...)</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Insert 2-Parameter Accumulator LAMBDA</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Add the recurrence closure: <code className="text-emerald-400 font-mono">LAMBDA(balance, txn, balance + txn)</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Press Enter & Verify Progressive Column Spill</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. The 6 running balances spill down <code className="text-emerald-300 font-mono">E5:E10</code>: ₹65,000 &rarr; ₹57,000 &rarr; ₹79,000 &rarr; ₹67,000 &rarr; ₹97,000 &rarr; ₹92,000!
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#CALC! (Nested Array)</td>
                  <td className="py-3 px-4 text-slate-300">LAMBDA inside SCAN returned an array instead of a single scalar accumulator value.</td>
                  <td className="py-3 px-4 text-slate-400">Check if calculation returns ranges or HSTACK.</td>
                  <td className="py-3 px-4 text-emerald-400">Ensure each iteration returns a single scalar number or text.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (Parameter Count)</td>
                  <td className="py-3 px-4 text-slate-300">LAMBDA declared 1 or 3+ parameters instead of exactly 2 (acc, val).</td>
                  <td className="py-3 px-4 text-slate-400">SCAN strictly requires LAMBDA(acc, val).</td>
                  <td className="py-3 px-4 text-emerald-400">Declare exactly 2 parameters: <code className="text-emerald-400 font-mono">LAMBDA(acc, val, ...)</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Error Cascade</td>
                  <td className="py-3 px-4 text-slate-300">A single corrupt cell (#N/A) at row 5 propagates down all subsequent rows.</td>
                  <td className="py-3 px-4 text-slate-400">Check where the error first appears in the input column.</td>
                  <td className="py-3 px-4 text-emerald-400">Wrap input in IFERROR: <code className="text-emerald-400 font-mono">a + IFERROR(v, 0)</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Destination cells below formula contain existing data or merged cells.</td>
                  <td className="py-3 px-4 text-slate-400">Inspect the vertical spill path.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing cells to permit automatic dynamic vertical spill.</td>
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
              Accumulator Optimization Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">HSTACK Integration</span>
                <span>Self-Totaling Ledgers</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Join running balance directly: <code className="text-emerald-300 font-mono">=HSTACK(Ledger, SCAN(50k, Amounts, LAMBDA(a,v,a+v)))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Defensive IFERROR</span>
                <span>No Error Cascades</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sanitize array inputs: <code className="text-sky-300 font-mono">LAMBDA(a, v, a + IFERROR(v, 0))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">High-Water Peak</span>
                <span>MAX Tracking</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Track running maximums: <code className="text-purple-300 font-mono">=SCAN(0, Values, LAMBDA(m, v, MAX(m, v)))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Vector Inspection</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight =SCAN(...) and press <strong>F9</strong> to inspect the calculated running vector in RAM.
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
                <strong>Reflect on algorithmic complexity:</strong> Why does legacy <code className="text-rose-400 font-mono">=SUM($D$5:D5)</code> take quadratic O(N²) time across 100,000 rows, and how does <code className="text-purple-300 font-mono">SCAN</code> achieve pure linear O(N) execution?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine state preservation:</strong> What is the core difference between <code className="text-purple-300 font-mono">SCAN</code> (which returns all intermediate progressive states) and <code className="text-emerald-300 font-mono">REDUCE</code> (which returns only 1 final collapsed value)?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider defensive programming:</strong> If an error occurs in row 10 of a SCAN formula, why does it cascade down all remaining 990 rows, and how does <code className="text-cyan-300 font-mono">IFERROR</code> prevent contamination?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Accumulator Algorithms with SCAN — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Never use legacy dragged formulas like =SUM($D$5:D5) for running balances in large production spreadsheets! The SCAN helper function executes in pure linear O(N) time in compiled C++ RAM, eliminating millions of redundant calculations, preventing broken cell ranges, and delivering sub-millisecond calculation speeds across enterprise financial ledgers!"
            }
          />
        </div>
      </div>
    </div>
  );
}
