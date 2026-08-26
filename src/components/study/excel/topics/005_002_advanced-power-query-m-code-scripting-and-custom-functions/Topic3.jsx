"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/m_code_master.xlsx?url";
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
              ⚡ Custom Lambdas · Topic 3
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Reusable Custom M Functions
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 5: Create &amp; Automate
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Writing Custom M Functions to Automate Repetitive Transformations
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            When identical multi-step data cleansing routines must be repeated across dozens of reports, copying and 
            pasting Applied Steps creates brittle technical debt. 
            By writing <strong>Reusable Custom M Functions</strong> (<code className="text-teal-300 font-mono">fx_CleanAndConvert</code>), 
            you encapsulate complex string parsing, debit/credit logic, currency conversions, and error handling into 
            modular, typed lambda blocks with rich <strong>UI Documentation Metadata</strong> (<code className="text-emerald-300 font-mono">Value.ReplaceType</code>)!
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Lambda Function Syntax:</strong> <code className="text-teal-300">(param as type) as returnType =&gt; let...in</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>UI Documentation:</strong> Attach parameter descriptions and examples via <code className="text-emerald-300">meta [Documentation.*]</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Column Invocation:</strong> Streamline row-by-row transforms via <code className="text-sky-300">Table.AddColumn</code></span>
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
              <span className="text-teal-400">⚡</span> Custom M Function Anatomy &amp; Invocation
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Custom M Lambdas
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300 space-y-3">
            <span className="text-slate-500">// 1. Complete Custom Currency Parsing &amp; FX Converter Function (fx_CleanAndConvert)</span>
            <div className="text-white font-bold text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
{`(rawString as nullable text, optional customRate as nullable number) as nullable number =>
let
    txt = if rawString = null then "" else Text.Trim(rawString),
    digits = Text.Select(txt, {"0".."9", "."}),
    amt = if digits = "" then 0 else Number.FromText(digits),
    isDebit = Text.Contains(Text.Upper(txt), "DR"),
    signedAmt = if isDebit then -amt else amt,
    rate = customRate ?? 83.50,
    usd = Number.Round(signedAmt / rate, 2)
in
    usd`}
            </div>
            <span className="text-slate-500">// 2. Invoking the Function Across a Table Column</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.AddColumn(Source, "USD_Amount", each fx_CleanAndConvert([Raw_Amount], 83.50), type number)'}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Syntax Element</th>
                  <th className="py-3 px-4">M Code Representation</th>
                  <th className="py-3 px-4">Functional Behavior</th>
                  <th className="py-3 px-4">Enterprise Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">Parameter List</td>
                  <td className="py-3 px-4 text-teal-300">{' (x as nullable text)'}</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Declares named typed input variables.</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Ensures input type safety before evaluating logic.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">optional Keyword</td>
                  <td className="py-3 px-4 text-emerald-300">{'optional r as nullable number'}</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Allows the caller to omit the parameter (evaluates to null).</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Enables sensible default rate fallbacks via <code className="text-emerald-300 font-mono">r ?? 83.50</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">Return Type</td>
                  <td className="py-3 px-4 text-sky-300">{'as nullable number'}</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Asserts the data type returned by the function.</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Guarantees schema type consistency in destination tables.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-400 font-sans">Documentation Meta</td>
                  <td className="py-3 px-4 text-amber-300">{'meta [Documentation.Name="..."]'}</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Attaches human-readable metadata schema to function type.</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Renders interactive parameter boxes &amp; descriptions in Power Query UI.</td>
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
              <span className="text-emerald-400">🔬</span> Null Safety, Closures &amp; UI Metadata Documentation
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Function Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> Bulletproof Null Safety in Functions
              </h3>
              <p className="leading-relaxed">
                If a table column contains empty or missing values, a function expecting strictly <code className="text-teal-300 font-mono">text</code> will crash with a type error. 
                Always declare parameters as <code className="text-teal-300 font-mono">nullable text</code> and guard internal parsing with 
                <code className="text-teal-300 font-mono">if rawInput = null then null else ...</code>!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                Rule: Use nullable types + explicit null guards
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Value.ReplaceType Documentation
              </h3>
              <p className="leading-relaxed">
                You can make custom functions feel like official Microsoft built-ins! 
                By declaring a <code className="text-emerald-300 font-mono">type function (...) meta [...]</code> record and attaching it with 
                <code className="text-emerald-300 font-mono">Value.ReplaceType</code>, non-technical business users get friendly parameter labels and code examples in the UI dialog!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Value.ReplaceType(fx_Core, fx_DocumentedType)
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Recursive Functions in M (@FunctionName)
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              To write recursive functions (e.g. hierarchical bill-of-materials traversal or factorial math), 
              M uses the scoping prefix <code className="text-teal-300 font-mono">@</code> to allow a function to invoke itself inside its own body: 
              <code className="text-teal-300 font-mono">fx_BOM = (parentID) =&gt; ... @fx_BOM(childID)</code>.
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
              <span className="text-teal-400">📐</span> Visual Custom M Function Execution Pipeline
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Lambda Transformation Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how dirty strings pass through the custom M function to produce sanitized, signed numeric outputs in USD:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Raw Input Stream (Left) */}
              <rect x="25" y="25" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="25" width="220" height="34" rx="12" fill="#BE123C" fillOpacity="0.3" />
              <text x="135" y="47" fill="#FECDD3" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. DIRTY INPUT TEXT</text>

              <g transform="translate(35, 75)" fontSize="8.5" fontFamily="monospace" fill="#CBD5E1">
                <rect width="200" height="28" fill="#1E293B" />
                <text x="8" y="18" fill="#FCA5A5">"₹ 45,250.00 Cr"</text>

                <rect y="32" width="200" height="28" fill="#1E293B" />
                <text x="8" y="50" fill="#FCA5A5">"INR 12,800.50"</text>

                <rect y="64" width="200" height="28" fill="#1E293B" />
                <text x="8" y="82" fill="#FCA5A5">"₹ 5,000.00 Dr" (Debit)</text>

                <rect y="96" width="200" height="28" fill="#1E293B" />
                <text x="8" y="114" fill="#FCA5A5">"Rs. 98,400.00"</text>
              </g>

              <rect x="35" y="225" width="200" height="55" rx="6" fill="#881337" fillOpacity="0.4" stroke="#F43F5E" />
              <text x="135" y="245" fill="#FDA4AF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Legacy Dirty Text</text>
              <text x="135" y="262" fill="#FECDD3" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Mixed currency &amp; signs</text>

              {/* Arrow */}
              <path d="M 260 160 L 315 160" stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,160 310,155 310,165" fill="#14B8A6" />

              {/* Custom Function Lambda (Center) */}
              <rect x="325" y="25" width="250" height="270" rx="14" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="325" y="25" width="250" height="34" rx="14" fill="#115E59" fillOpacity="0.4" />
              <text x="450" y="47" fill="#F0FDFA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. fx_CleanAndConvert (LAMBDA)</text>

              <g transform="translate(340, 70)" fontSize="8.5" fontFamily="sans-serif">
                <rect width="220" height="32" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="10" y="20" fill="#5EEAD4" fontWeight="bold">{'1. Text.Select(..., {"0".."9", "."})'}</text>

                <rect y="38" width="220" height="32" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="58" fill="#BAE6FD" fontWeight="bold">2. Debit Sign Check (Dr = -Amt)</text>

                <rect y="76" width="220" height="32" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="96" fill="#A7F3D0" fontWeight="bold">3. Divide by FX Rate (customRate ?? 83.5)</text>

                <rect y="114" width="220" height="32" rx="4" fill="#854D0E" fillOpacity="0.3" stroke="#EAB308" />
                <text x="10" y="134" fill="#FEF08A" fontWeight="bold">4. Number.Round(..., 2)</text>
              </g>

              <text x="450" y="270" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Modular, Reusable M Function</text>

              {/* Arrow */}
              <path d="M 590 160 L 620 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,160 615,155 615,165" fill="#10B981" />

              {/* Output Stream (Right) */}
              <rect x="630" y="25" width="195" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="630" y="25" width="195" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="727" y="45" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. CLEAN USD FLOATS</text>

              <g transform="translate(640, 75)" fontSize="8" fontFamily="monospace" fill="#E2E8F0">
                <rect width="175" height="22" fill="#064E3B" stroke="#10B981" />
                <text x="6" y="15" fill="#34D399" fontWeight="bold">$ 541.92 USD (Credit)</text>

                <rect y="25" width="175" height="20" fill="#1E293B" />
                <text x="6" y="39">$ 153.30 USD</text>

                <rect y="48" width="175" height="20" fill="#1E293B" />
                <text x="6" y="62" fill="#FCA5A5">-$ 59.88 USD (Debit)</text>

                <rect y="71" width="175" height="20" fill="#1E293B" />
                <text x="6" y="85">$ 1,178.44 USD</text>
              </g>

              <rect x="640" y="225" width="175" height="55" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="727" y="245" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Typed Number Column</text>
              <text x="727" y="262" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Ready for Power BI Modeling</text>
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
                Explore the custom function calculation dataset below or download the practice workbook to test custom M functions in Microsoft Excel.
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
            sheetName="Topic3_Custom_M_Functions"
            title="Custom Function Ingestion Test Pipeline (Transaction ID, Raw Dirty String, Clean Parsed Amount, USD FX Rate, Converted USD Amount, Custom M Function Invoked)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · Currency &amp; Sign Standardization</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                fx_CleanAndConvert on 100,000 POS Receipts
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> writes a custom function <code className="text-teal-300 font-mono">fx_CleanAndConvert</code> that strips rupee symbols, parses Dr/Cr polarity, and applies live FX rates, invoking it across 100k rows in 1.4 seconds.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                fx_CleanAndConvert &rarr; 100k Multi-Currency Rows Standardized
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · UI Documented Functions</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Value.ReplaceType for Business Users
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> attaches <code className="text-emerald-300 font-mono">Documentation.Name</code> and sample code records to <code className="text-emerald-300 font-mono">fx_ComputeGST</code>, allowing junior accountants to invoke it through the graphical UI without writing code.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Documentation Meta &rarr; Graphical UI Parameter Dialog
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Parameterized Workbook Extractor</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                fx_ExtractBranchSheet Table Generator
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> authors a custom function that accepts an Excel file binary and returns a clean normalized table, transforming multi-workbook ingestion into a single <code className="text-indigo-300 font-mono">Table.AddColumn</code> step!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                (binary) as table =&gt; &rarr; 1-Line Multi-Workbook Ingestion
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Recursive Category Hierarchy</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                @fx_GetParentCategory Recursion
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> writes a recursive M function using <code className="text-fuchsia-300 font-mono">@fx_GetParentCategory</code> to traverse multi-level product subcategories up to the top root department.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                @fx_Recursion &rarr; Full Multi-Tier Hierarchy Flattening
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
              <span className="text-teal-400">🪜</span> Step-by-Step Custom Function Creation Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Declare Parameters with Nullable Types</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Start with typed parameters: <code className="text-teal-300 font-mono">(input as nullable text, optional rate as nullable number) as nullable number =&gt;</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Build Nested 'let...in' Body with Null Guards</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Check <code className="text-indigo-300 font-mono">if input = null then 0 else ...</code> and resolve optional fallbacks with <code className="text-indigo-300 font-mono">rate ?? 83.50</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Attach UI Documentation Metadata</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Use <code className="text-cyan-300 font-mono">Value.ReplaceType</code> to bind <code className="text-cyan-300 font-mono">[Documentation.Name = "..."]</code> for user-friendly UI integration.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Invoke Across Table Columns</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In target queries, invoke via <code className="text-emerald-300 font-mono">Table.AddColumn(Source, "Result", each fx_Name([Field]), type number)</code>!
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
              Custom Function Error Protocol
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Cell [Error] on Nulls</td>
                  <td className="py-3 px-4 text-slate-300">Function parameter was declared as strict <code className="text-rose-400 font-mono">type text</code> instead of <code className="text-emerald-400 font-mono">nullable text</code>.</td>
                  <td className="py-3 px-4 text-slate-400">Cell displays red error tag when input row is blank.</td>
                  <td className="py-3 px-4 text-emerald-400">Change parameter type to <code className="text-emerald-400 font-mono">nullable text</code> and add null check.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Too Few Arguments Error</td>
                  <td className="py-3 px-4 text-slate-300">Caller omitted an argument that was not marked with the <code className="text-amber-300 font-mono">optional</code> keyword.</td>
                  <td className="py-3 px-4 text-slate-400">Error: <em>"2 arguments were passed to a function which expects 3"</em>.</td>
                  <td className="py-3 px-4 text-emerald-400">Prefix optional parameters with <code className="text-emerald-400 font-mono">optional</code> in signature.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Row-by-Row Web Scraping Freeze</td>
                  <td className="py-3 px-4 text-slate-300">Invoked a custom function containing unbuffered <code className="text-rose-400 font-mono">Web.Contents</code> across 5,000 rows.</td>
                  <td className="py-3 px-4 text-slate-400">Query hangs and triggers API rate limit 429 errors.</td>
                  <td className="py-3 px-4 text-emerald-400">Extract rates in a single batched query and merge with <code className="text-emerald-400 font-mono">Table.Buffer</code>.</td>
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
              Lambda Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">optional + ??</span>
                <span>Default Parameters</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use <code className="text-emerald-300 font-mono">optional rate as nullable number</code> with <code className="text-emerald-300 font-mono">rate ?? 83.50</code> for smart fallbacks.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">fx_ Naming Prefix</span>
                <span>Visual Organization</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always prefix custom functions with <code className="text-sky-300 font-mono">fx_</code> to keep the Queries pane clearly structured.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">Value.ReplaceType</span>
                <span>UI Documentation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Attach descriptions and sample code to custom functions so teammates can invoke them graphically.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">@ Scoping Prefix</span>
                <span>Recursive Self-Calls</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prefix function name with <code className="text-amber-300 font-mono">@</code> to call the function recursively inside its own body.
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
                <strong>Reflect on code reusability:</strong> Why is encapsulating dirty currency parsing inside a dedicated <code className="text-teal-300 font-mono">fx_CleanAndConvert</code> function superior to recording 8 Applied Steps on every single monthly report query?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine defensive null handling:</strong> What happens to a custom function expecting <code className="text-rose-400 font-mono">type text</code> when a cell containing <code className="text-rose-400 font-mono">null</code> is passed into it during row-by-row invocation?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider Query Folding implications:</strong> Why does invoking a custom M function on an external SQL Server table force Power Query to download all raw rows and compute locally in RAM?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Custom M Functions & Automation — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Modularize, document, and defend against nulls! Prefix function queries with fx_, always declare parameter types with nullable fallbacks (taxRate ?? 0.18), attach rich documentation metadata ([Documentation.Name]), and buffer lookup dimensions with Table.Buffer before invoking across millions of fact table rows!"
            }
          />
        </div>
      </div>
    </div>
  );
}
