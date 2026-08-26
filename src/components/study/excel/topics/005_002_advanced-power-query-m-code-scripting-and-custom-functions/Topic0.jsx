"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/m_code_master.xlsx?url";
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
    link.download = "m_code_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-teal-500/30 selection:text-teal-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Advanced M Code · Topic 0
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Power Query M Language
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze &amp; Understand
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Introduction to the Power Query M Formula Language: Syntax, Case Sensitivity &amp; Let...In Blocks
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Behind every mouse click and ribbon button in the Power Query interface lies a powerful, declarative, 
            and pure functional programming language: <strong>Power Query M</strong>. 
            By peeling back the graphical UI and mastering the <strong>Advanced Editor</strong>, you unlock the ability 
            to write custom <code className="text-teal-300 font-mono">let...in</code> blocks, navigate strict 
            <strong>case sensitivity</strong>, exploit <strong>call-by-need lazy evaluation</strong>, and manipulate 
            immutable data structures with precision!
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>The Let...In Paradigm:</strong> Immutable step variable bindings and final return output</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Strict Case Sensitivity:</strong> Distinct naming for functions, variables, and columns</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Lazy Evaluation:</strong> Evaluates only expressions strictly required by the output</span>
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
              <span className="text-teal-400">⚡</span> M Formula Anatomy &amp; Core Structural Rules
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              M Language Syntax
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300 space-y-2">
            <span className="text-slate-500">// Standard Canonical M Query Architecture</span>
            <div className="text-white font-bold text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
{`let
    Source = Csv.Document(File.Contents("E:\\Sales_2026.csv"), [Delimiter=",", Columns=5]),
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Changed Type" = Table.TransformColumnTypes(#"Promoted Headers", {{"Amount", type number}}),
    #"Filtered High Value" = Table.SelectRows(#"Changed Type", each [Amount] >= 25000)
in
    #"Filtered High Value"`}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Syntax Element</th>
                  <th className="py-3 px-4">M Code Representation</th>
                  <th className="py-3 px-4">Syntactical Behavior</th>
                  <th className="py-3 px-4">Crucial Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">let Keyword</td>
                  <td className="py-3 px-4 text-teal-300">let Step1 = ..., Step2 = ...</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Defines the scope for intermediate step variable bindings.</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Every step ends with a comma, except the last step before 'in'.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">in Keyword</td>
                  <td className="py-3 px-4 text-emerald-300">in StepName</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Specifies the final return expression evaluated by the engine.</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Determines the query output (can be a Table, List, Record, or Scalar).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">Quoted Identifiers</td>
                  <td className="py-3 px-4 text-sky-300">#{'"Promoted Headers"'}</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Escapes variable names containing spaces or special characters.</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Must include the leading hash symbol <code className="text-sky-300">#</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-400 font-sans">each Keyword</td>
                  <td className="py-3 px-4 text-amber-300">each [Amount] * 1.18</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Syntactic sugar for single-argument lambda: <code className="text-amber-300">(_) =&gt; _[Amount] * 1.18</code>.</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Represents row context in column generation and filtering.</td>
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
              <span className="text-emerald-400">🔬</span> Functional Immutability &amp; Call-by-Need Lazy Evaluation
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              M Engine Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> Immutable Step Bindings
              </h3>
              <p className="leading-relaxed">
                In procedural languages (like Python or VBA), variables can be reassigned. 
                In M, <strong>variables are strictly immutable</strong>. 
                Every transformation creates a brand-new table object by passing the previous step as an argument: 
                <code className="text-teal-300 font-mono">Step_2 = Table.SelectRows(Step_1, ...)</code>.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                Rule: Variables Cannot Be Mutated In-Place
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Lazy Evaluation (Call-by-Need)
              </h3>
              <p className="leading-relaxed">
                The Mashup engine does not execute steps in top-down sequential order. 
                Instead, it constructs a <strong>Directed Acyclic Graph (DAG)</strong> and evaluates only the steps 
                and columns strictly referenced by the final <code className="text-emerald-300 font-mono">in</code> clause. 
                Unreferenced steps consume 0 CPU cycles!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Only Steps Traversed by 'in' Are Executed
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Strict Case Sensitivity
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Unlike Excel worksheet formulas (where <code className="text-slate-400 font-mono">=sum()</code> and <code className="text-slate-400 font-mono">=SUM()</code> are identical), 
              M is strictly case-sensitive. <code className="text-emerald-400 font-mono">Table.SelectRows</code> is recognized, while <code className="text-rose-400 font-mono">table.selectrows</code> or <code className="text-rose-400 font-mono">TABLE.SELECTROWS</code> will throw a fatal <em>"The name wasn't recognized"</em> error!
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
              <span className="text-teal-400">📐</span> Visual M Execution Pipeline &amp; Step Chaining
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              let...in Execution Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how raw data passes through immutable step variables in the `let` block before being returned by the `in` expression:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* let Block Container (Left) */}
              <rect x="25" y="25" width="550" height="270" rx="14" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="25" y="25" width="550" height="34" rx="14" fill="#115E59" fillOpacity="0.4" />
              <text x="300" y="47" fill="#F0FDFA" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">let BLOCK: IMMUTABLE STEP VARIABLE BINDINGS</text>

              <g transform="translate(45, 75)" fontSize="9" fontFamily="monospace">
                {/* Step 1 */}
                <rect width="510" height="34" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="12" y="21" fill="#5EEAD4" fontWeight="bold">Source</text>
                <text x="75" y="21" fill="#94A3B8">= Csv.Document(File.Contents("Sales.csv")),</text>

                {/* Step 2 */}
                <rect y="44" width="510" height="34" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="12" y="65" fill="#38BDF8" fontWeight="bold">#{'"Promoted Headers"'}</text>
                <text x="160" y="65" fill="#94A3B8">= Table.PromoteHeaders(</text>
                <text x="315" y="65" fill="#5EEAD4" fontWeight="bold">Source</text>
                <text x="360" y="65" fill="#94A3B8">),</text>

                {/* Step 3 */}
                <rect y="88" width="510" height="34" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="12" y="109" fill="#818CF8" fontWeight="bold">#{'"Changed Type"'}</text>
                <text x="135" y="109" fill="#94A3B8">= Table.TransformColumnTypes(</text>
                <text x="325" y="109" fill="#38BDF8" fontWeight="bold">#{'"Promoted Headers"'}</text>
                <text x="475" y="109" fill="#94A3B8">),</text>

                {/* Step 4 */}
                <rect y="132" width="510" height="34" rx="6" fill="#134E4A" stroke="#14B8A6" />
                <text x="12" y="153" fill="#A7F3D0" fontWeight="bold">#{'"Filtered High Value"'}</text>
                <text x="175" y="153" fill="#CCFBF1">= Table.SelectRows(</text>
                <text x="305" y="153" fill="#818CF8" fontWeight="bold">#{'"Changed Type"'}</text>
                <text x="415" y="153" fill="#CCFBF1">, each [Amt] &gt;= 25000)</text>
              </g>

              {/* Arrow from let to in */}
              <path d="M 590 160 L 630 160" stroke="#14B8A6" strokeWidth="3" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="635,160 625,155 625,165" fill="#14B8A6" />

              {/* in Block (Right) */}
              <rect x="640" y="25" width="185" height="270" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="640" y="25" width="185" height="34" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="732" y="47" fill="#34D399" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">in RETURN BLOCK</text>

              <g transform="translate(655, 80)" fontSize="9" fontFamily="monospace">
                <text x="10" y="20" fill="#94A3B8">in</text>
                <rect y="35" width="155" height="40" rx="6" fill="#064E3B" stroke="#10B981" />
                <text x="8" y="58" fill="#34D399" fontWeight="bold" fontSize="8">#{'"Filtered High Value"'}</text>

                <rect y="100" width="155" height="75" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="8" y="120" fill="#94A3B8" fontSize="8">Final Evaluated Result:</text>
                <text x="8" y="138" fill="#5EEAD4" fontSize="8.5" fontWeight="bold">8,420 Filtered Rows</text>
                <text x="8" y="154" fill="#CBD5E1" fontSize="7.5">Output Loaded to Excel</text>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet &amp; Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the M code syntax step evaluation master dataset below or download the practice workbook to test M scripting in Microsoft Excel.
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
            sheetName="Topic0_M_Syntax_Overview"
            title="M Code Step Execution Catalog (Step Number, Step Identifier, M Expression Formula, Evaluated Type, Return Value, Evaluation Model)"
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
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · Custom Step Injection</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Injecting Custom M Code in Advanced Editor
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> opens the Advanced Editor to insert a custom step <code className="text-teal-300 font-mono">Table.TransformColumns</code> that strips currency symbols, bypassing 5 cumbersome UI button clicks.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Advanced Editor Injection &rarr; 80% Reduction in Query Steps
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Scalar Reduction Return</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Returning a Scalar Total from 'in' Clause
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> changes the final return in M from a table to <code className="text-emerald-300 font-mono">List.Sum(Filtered[Tax])</code>, creating a dynamic scalar KPI metric that feeds directly into a financial card.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                'in List.Sum(...)' &rarr; Returns Single Scalar KPI Value
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Lazy Evaluation Verification</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Skipping Unused Web Scrape Steps
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> tests lazy evaluation by creating an unused test web scrape step in the <code className="text-indigo-300 font-mono">let</code> block; because it is omitted from <code className="text-indigo-300 font-mono">in</code>, the engine executes in 0.2 seconds with zero network lag!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Lazy Evaluation &rarr; Zero CPU Overhead for Unused Steps
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Quoted Identifier Repair</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Fixing Multi-Word Step References
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> resolves a broken script by wrapping a custom step containing spaces in <code className="text-fuchsia-300 font-mono">#{'"Cleaned Monthly Invoices"'}</code>, restoring pipeline execution immediately.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                #{'"Step Name"'} &rarr; Eliminates Identifier Token Syntax Errors
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
              <span className="text-teal-400">🪜</span> Step-by-Step Advanced Editor Scripting Protocol
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-teal-950 border border-teal-700 text-teal-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Open the Advanced Editor Window</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In Power Query Editor, navigate to <strong>Home &rarr; Advanced Editor</strong> (or <strong>View &rarr; Advanced Editor</strong>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Inspect Variable Declarations in 'let'</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Observe how each step assigns a result to an identifier and passes the previous identifier as its first input parameter.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Insert Custom Step &amp; Verify Comma Delimiters</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Write your custom transformation step. Ensure every line in the <code className="text-cyan-300 font-mono">let</code> block ends with a comma, except the final line.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Update 'in' Return &amp; Check Syntax Message</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Set the <code className="text-emerald-300 font-mono">in</code> clause to your final step identifier. Verify the green check: <em>"No syntax errors have been detected"</em>.
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
              M Syntax Error Protocol
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Error / Pitfall</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Token Comma Expected</td>
                  <td className="py-3 px-4 text-slate-300">Omitted comma between step definitions in the 'let' block.</td>
                  <td className="py-3 px-4 text-slate-400">Advanced Editor shows red squiggle on the next line identifier.</td>
                  <td className="py-3 px-4 text-emerald-400">Add a trailing comma to the preceding step line.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Name Wasn't Recognized</td>
                  <td className="py-3 px-4 text-slate-300">Case-sensitivity typo in function name (e.g. 'table.selectrows').</td>
                  <td className="py-3 px-4 text-slate-400">Error popup: <em>"The name 'table.selectrows' wasn't recognized"</em>.</td>
                  <td className="py-3 px-4 text-emerald-400">Correct casing to PascalCase: <code className="text-emerald-400 font-mono">Table.SelectRows</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Missing Quoted Identifier Hash</td>
                  <td className="py-3 px-4 text-slate-300">Wrote <code className="text-rose-400">"Step Name"</code> instead of <code className="text-emerald-400">#{'"Step Name"'}</code> for step reference.</td>
                  <td className="py-3 px-4 text-slate-400">Function receives literal text string rather than table object.</td>
                  <td className="py-3 px-4 text-emerald-400">Prefix quoted step names with hash: <code className="text-emerald-400 font-mono">#{'"..."'}</code>.</td>
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
              <span className="text-teal-400">💡</span> High-Speed Keyboard Shortcuts & Pro Tips
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              M Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Alt + H + V + A</span>
                <span>Open Advanced Editor</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Instant keyboard shortcut to open the full M code editor window.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Ctrl + Space</span>
                <span>IntelliSense Autocomplete</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Trigger parameter suggestions and function signatures inside Advanced Editor.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">Quoted Identifiers</span>
                <span>#{'"Step Name"'}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Escape spaces and special characters cleanly across variable bindings.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">Lazy Evaluation</span>
                <span>Call-by-Need Speed</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Omit unnecessary steps from the return clause to eliminate redundant processing.
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
                <strong>Reflect on functional immutability:</strong> Why does Power Query create a brand-new table variable on every step rather than modifying the existing table in memory like Python or VBA?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine call-by-need lazy evaluation:</strong> What happens if you define 10 heavy database extraction steps in the <code className="text-teal-300 font-mono">let</code> block but reference only the 1st step in the <code className="text-teal-300 font-mono">in</code> clause?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider syntactic sugar:</strong> How does understanding that <code className="text-emerald-400 font-mono">each [Amt] * 1.18</code> is literally <code className="text-sky-300 font-mono">(_) =&gt; _[Amt] * 1.18</code> clarify multi-parameter function writing in M?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="M Formula Language Syntax & Architecture — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Master the let...in dependency chain, treat data as immutable, and respect strict case sensitivity! Every Applied Step in the UI is just an M variable assignment; by understanding lazy evaluation, quoted identifiers (#\"...\"), and functional chaining in the Advanced Editor, you unlock 100% control over enterprise ETL pipelines that no graphical button can match!"
            }
          />
        </div>
      </div>
    </div>
  );
}
