"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_003_custom_functions_with_lambda_and_helper_engines_master.xlsx?url";
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
              ⚡ API Design & Documentation · Topic 3
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Document
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Documenting LAMBDA Parameters & Syntax Hints for End-Users
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Building high-performance corporate calculation engines is only half the battle; ensuring non-technical team members 
            can discover, understand, and invoke your custom functions without errors is what separates amateur spreadsheets from 
            enterprise-grade software. 
            By leveraging <strong>self-documenting parameter identifiers</strong> and authoring structured 
            <strong>Name Manager Comment strings</strong>, you surface live autocomplete tooltips inside Excel's native formula bar.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Intellisense Autocomplete:</strong> Live in-formula tooltips</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Semantic Naming:</strong> Units & types in parameter names</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Ctrl+Shift+A:</strong> Auto-insert parameter placeholders</span>
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
              <span className="text-purple-400">⚡</span> Standardized Corporate Documentation Template
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Comment Box Format
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Structured Name Manager Comment Standard</span>
            <div className="mt-1 text-white font-bold">
              [<span className="text-amber-300">Purpose Summary</span>] | <span className="text-sky-300">Params:</span> [p1: desc], [p2: desc] | <span className="text-emerald-300">Returns:</span> [output format]
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Real-World Production Example:</span> <br />
              <span className="text-emerald-400 font-bold">
                "FX_GST_BREAKDOWN(amount, is_interstate) → Spills 3 columns: [CGST, SGST, IGST]. Set is_interstate=TRUE for IGST."
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Documentation Pillar</th>
                  <th className="py-3 px-4">Best Practice Rule</th>
                  <th className="py-3 px-4">Bad Practice (Anti-Pattern)</th>
                  <th className="py-3 px-4">Impact on End-User</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">Parameter Names</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans">amount_inr, da_pct, is_metro</td>
                  <td className="py-3 px-4 text-rose-400 font-sans">a, b, c, x, y</td>
                  <td className="py-3 px-4 font-sans text-slate-300">User instantly knows expected units (₹, %, Boolean).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-300">Name Manager Comment</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans">Clear summary + return structure</td>
                  <td className="py-3 px-4 text-rose-400 font-sans">Empty comment box</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Tooltip displays in formula autocomplete menu.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-300">Spilled Footprint</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans">"Spills 4 columns [A, B, C, D]"</td>
                  <td className="py-3 px-4 text-rose-400 font-sans">No mention of array dimensions</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Prevents unexpected #SPILL! cell collision errors.</td>
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
              <span className="text-emerald-400">🔬</span> Autocomplete Intellisense & Self-Documenting Design
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              API Usability Engineering
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> How Excel Surfaces Name Comments
              </h3>
              <p className="leading-relaxed">
                When a user starts typing <code className="text-amber-300 font-mono">=FX_</code> in any cell, 
                Excel's Intellisense dropdown highlights the function and creates a floating description card containing the exact text from the Name Manager Comment box.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                Formula Autocomplete → In-Place Contextual Documentation
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Shortcut: Ctrl+Shift+A Parameter Ingestion
              </h3>
              <p className="leading-relaxed">
                After typing a function name and opening parenthesis (e.g. <code className="text-emerald-300 font-mono">=FX_GROSS_SALARY(</code>), 
                pressing <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300 text-xs font-mono">Ctrl+Shift+A</kbd> automatically inserts all defined argument names as placeholders!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Ctrl+Shift+A → Injects: basic_pay, da_pct, hra_pct
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Semantic Parameter Suffix Conventions
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Adopt standard suffix conventions across your team to eliminate ambiguity:
              <br />
              • <code className="text-sky-300 font-mono">_inr</code> / <code className="text-sky-300 font-mono">_amt</code> → Currency amounts (e.g. <code className="text-slate-300 font-mono">principal_inr</code>)
              <br />
              • <code className="text-amber-300 font-mono">_pct</code> / <code className="text-amber-300 font-mono">_rate</code> → Percentage decimal values (e.g. <code className="text-slate-300 font-mono">gst_rate_pct</code> = 0.18)
              <br />
              • <code className="text-purple-300 font-mono">is_</code> / <code className="text-purple-300 font-mono">has_</code> → Boolean flags (e.g. <code className="text-slate-300 font-mono">is_interstate</code> = TRUE/FALSE)
              <br />
              • <code className="text-emerald-300 font-mono">_vector</code> / <code className="text-emerald-300 font-mono">_matrix</code> → Array inputs (e.g. <code className="text-slate-300 font-mono">movement_vector</code>)
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
              <span className="text-purple-400">📐</span> Visual Formula Autocomplete & Tooltip Card
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              User Experience Simulation
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Experience how a well-documented custom LAMBDA renders in Excel's formula autocomplete menu:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Formula Bar Simulation (Top) */}
              <rect x="25" y="30" width="800" height="60" rx="10" fill="#0F172A" stroke="#334155" strokeWidth="2" />
              <rect x="35" y="42" width="60" height="36" rx="6" fill="#1E293B" />
              <text x="65" y="65" fill="#94A3B8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">fx</text>

              <text x="110" y="66" fill="#E2E8F0" fontSize="13" fontFamily="monospace">
                =FX_GST_BREAKDOWN(
              </text>
              <rect x="280" y="45" width="2" height="28" fill="#38BDF8">
                <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
              </rect>

              {/* Autocomplete Popup (Bottom) */}
              <g transform="translate(105, 105)">
                <rect width="650" height="180" rx="12" fill="#020617" stroke="#7E22CE" strokeWidth="2" />
                <rect width="650" height="34" rx="12" fill="#6B21A8" fillOpacity="0.4" />
                <text x="20" y="22" fill="#FAF5FF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">EXCEL FORMULA INTELLISENSE TOOLTIP</text>

                {/* Function Header */}
                <rect x="20" y="45" width="610" height="34" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="35" y="67" fill="#FDE047" fontSize="11" fontWeight="bold" fontFamily="monospace">FX_GST_BREAKDOWN(taxable_value, is_interstate)</text>

                {/* Comment Text */}
                <rect x="20" y="90" width="610" height="70" rx="6" fill="#3B0764" fillOpacity="0.6" stroke="#A855F7" />
                <text x="35" y="112" fill="#A7F3D0" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                  Documentation: Computes GST tax schedules.
                </text>
                <text x="35" y="130" fill="#E2E8F0" fontSize="9.5" fontFamily="sans-serif">
                  • Params: taxable_value (₹ Amount), is_interstate (TRUE for IGST, FALSE for CGST+SGST)
                </text>
                <text x="35" y="148" fill="#38BDF8" fontSize="9.5" fontFamily="sans-serif">
                  • Returns: Spills 3-column array: [CGST, SGST, IGST] per Indian Tax Circular 183/2022.
                </text>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet & Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the corporate invoice dataset below or download the master workbook to test documented custom functions in Microsoft Excel.
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
            sheetName="EX1804"
            title="Corporate Invoicing Ledger (Taxable Value, Supply Type, GST Rate Grid)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Commercial GST Compliance</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore Steel Fab</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Self-Documenting Intra vs Inter-State GST
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Tax Consultant <strong>Swadeep Banerjee</strong> writes a custom function with clear boolean parameters: 
                <code className="text-emerald-300 font-mono">FX_GST_BREAKDOWN = LAMBDA(taxable_inr, is_interstate, ...)</code>. 
                Junior accountants simply look at the formula tooltip to know that <code className="text-purple-300 font-mono">is_interstate=TRUE</code> computes IGST and <code className="text-purple-300 font-mono">FALSE</code> splits CGST/SGST.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Tooltip Guidance → Zero Tax Classification Errors
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Banking Lending Department</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Agro Tools</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Documenting Loan Tenure Units (Months vs Years)
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Credit Analyst <strong>Tuhina Mukherjee</strong> names parameters <code className="text-amber-300 font-mono">principal_inr, annual_interest_pct, tenure_months</code>. 
                By specifying <code className="text-emerald-300 font-mono">tenure_months</code>, loan officers never make the costly mistake of entering 5 years instead of 60 months!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Semantic Parameter Naming → Prevents Unit Mismatch Errors
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Engineering Procurement</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Documenting Spilled Array Return Columns
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Procurement Manager <strong>Abhronila Sengupta</strong> documents her vendor price comparison function: 
                <code className="text-indigo-300 font-mono">"Spills 3 columns: [Base_Cost, Freight_5%, Landed_Total]"</code>. 
                Engineers know to keep adjacent columns empty, preventing <code className="text-rose-400 font-mono">#SPILL!</code> errors.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Comment: Spilled Columns [Base, Freight, Landed] → Zero #SPILL!
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Corporate Audit Compliance</span>
                <span className="text-xs font-mono text-slate-400">Naihati Jute Mills</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Statutory Regulatory Reference Tags
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Lead Auditor <strong>Susmita Roy</strong> adds statutory compliance notes in Name Manager: 
                <code className="text-amber-300 font-mono">"Complies with Gratuity Act 1972 Sec 4(2): 15/26 days per completed year"</code>. 
                External auditors verify formula compliance instantly without questioning model logic.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Statutory Audit Compliance → 100% Traceable Legal Logic
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
              <span className="text-purple-400">🪜</span> Step-by-Step Function Documentation Walkthrough
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Choose Descriptive Parameter Names</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Instead of <code className="text-rose-400 font-mono">=LAMBDA(x, y, ...)</code>, write: <code className="text-emerald-400 font-mono">=LAMBDA(taxable_value, is_interstate, ...)</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Open Name Manager & Fill the Comment Box</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300 text-xs font-mono">Ctrl+F3</kbd> → In the 'Comment' field, write: <br />
                  <code className="text-amber-300 font-mono text-xs">"Computes GST breakdown. Params: taxable_value (₹), is_interstate (TRUE=IGST, FALSE=CGST+SGST). Returns 3-column spilled array."</code>
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Test Tooltip in Empty Cell</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Click any cell, type <code className="text-emerald-300 font-mono">=FX_GST</code>, and observe the autocomplete popup showing your custom documentation!
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Use Ctrl+Shift+A for Argument Ingestion</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Type <code className="text-emerald-300 font-mono">=FX_GST_BREAKDOWN(</code> and press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300 text-xs font-mono">Ctrl+Shift+A</kbd> to insert placeholders. Replace with cell references.
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
              Documentation Quality Control
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Documentation Flaw</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Consequence for End-Users</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Empty Comment Field</td>
                  <td className="py-3 px-4 text-slate-300">Author neglected the Comment box in Name Manager.</td>
                  <td className="py-3 px-4 text-slate-400">Autocomplete shows no description; users guess argument roles.</td>
                  <td className="py-3 px-4 text-emerald-400">Add a 1-sentence summary and parameter definitions in Ctrl+F3.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Cryptic Param Names (x, y)</td>
                  <td className="py-3 px-4 text-slate-300">Used single-letter abbreviations in LAMBDA declaration.</td>
                  <td className="py-3 px-4 text-slate-400">Ctrl+Shift+A produces unhelpful placeholders: =FUNC(x, y).</td>
                  <td className="py-3 px-4 text-emerald-400">Rename parameters to <code className="text-emerald-400 font-mono">price_inr, tax_rate_pct</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Omitted Spilled Dimensions</td>
                  <td className="py-3 px-4 text-slate-300">Didn't mention that function returns a 3-column spilled matrix.</td>
                  <td className="py-3 px-4 text-slate-400">Users place formula next to populated columns, triggering #SPILL!.</td>
                  <td className="py-3 px-4 text-emerald-400">Explicitly note: "Spills 3 columns: [Col1, Col2, Col3]".</td>
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
              API Design Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">Ctrl+Shift+A</kbd>
                <span>Insert Arguments</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Type function name with open parenthesis and press <strong>Ctrl+Shift+A</strong> to inject argument placeholders!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Semantic Suffixes</span>
                <span>Self-Documenting</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use suffixes like <code className="text-emerald-300 font-mono">_inr</code>, <code className="text-emerald-300 font-mono">_pct</code>, and <code className="text-emerald-300 font-mono">_months</code> to make units unmistakable.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Version Metadata</span>
                <span>Audit Trails</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prefix comments with <code className="text-sky-300 font-mono">[v1.2 - Author Name]</code> for corporate version tracking.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-fuchsia-400 font-mono font-bold">AFE Add-In</span>
                <span>JSDoc Style</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use Microsoft's Advanced Formula Environment to author multi-line docstrings with syntax highlighting.
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
                <strong>Reflect on API usability:</strong> Why is providing clear documentation in the Name Manager Comment box just as important as writing mathematically correct formula logic?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine parameter naming:</strong> How does naming a parameter <code className="text-emerald-300 font-mono">annual_rate_pct</code> prevent catastrophic unit mismatch errors compared to generic letters like <code className="text-rose-400 font-mono">r</code>?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider team scalability:</strong> When 50 analysts share a centralized corporate function library, how do autocomplete tooltips eliminate training overhead and help-desk questions?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Documenting LAMBDAs & Syntax Hints — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "A formula that only you can understand is a liability; a function that your entire organization can use effortlessly is an asset. Always use self-documenting parameter names and write clear, structured comments in Name Manager detailing purpose, parameter units, and spilled return dimensions. That is the hallmark of true financial engineering excellence!"
            }
          />
        </div>
      </div>
    </div>
  );
}
