"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/power_query_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic4() {
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
    link.download = "power_query_master_practice.xlsx";
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
              ⚡ Core Transformations · Topic 4
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Headers, Type Coercion &amp; Cleaning
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 3: Apply &amp; Transform
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Core Transformations: Promoting Headers, Changing Data Types &amp; Replacing Values
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Raw corporate data dumps are notoriously messy: column headers trapped as row 1 records, numbers disguised 
            as text with currency symbols, international dates inverted by Windows regional settings, and nulls corrupting math formulas. 
            Power Query's <strong>Core Transformation Suite</strong> provides bulletproof building blocks—from 
            <strong>Header Promotion</strong> and <strong>Locale-Aware Type Coercion</strong> to 
            <strong>Null Value Replacement</strong>—establishing pristine relational schemas ready for Power Pivot!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Promote Headers:</strong> Elevates row 1 into official schema column names</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Locale Type Coercion:</strong> Immune international date and decimal parsing</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Value Replacement:</strong> Exact null-to-zero substitution with Replacer.ReplaceValue</span>
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
              <span className="text-teal-400">⚡</span> Power Query Core M Transformation Syntax
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              M Core Operations
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300 space-y-2">
            <span className="text-slate-500">// 1. Promote Headers</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.PromoteHeaders(Source, [PromoteAllScalars=true])'}
            </div>
            <span className="text-slate-500">// 2. Locale-Aware Date Type Coercion</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.TransformColumnTypes(#"Promoted", {{"Invoice_Date", type date}}, "en-GB")'}
            </div>
            <span className="text-slate-500">// 3. Exact Null Replacement</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.ReplaceValue(#"Changed Type", null, 0, Replacer.ReplaceValue, {"Gross_Amount"})'}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Transformation</th>
                  <th className="py-3 px-4">Core M Expression</th>
                  <th className="py-3 px-4">Replacer / Options</th>
                  <th className="py-3 px-4">Enterprise Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">Promote Headers</td>
                  <td className="py-3 px-4 text-teal-300">Table.PromoteHeaders(tbl)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">[PromoteAllScalars=true]</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Elevates row 1 into official schema headers.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">Changed Type (Locale)</td>
                  <td className="py-3 px-4 text-sky-300">Table.TransformColumnTypes(tbl, list, culture)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">"en-GB" / "de-DE"</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Parses UK DD/MM/YYYY dates and EU comma decimals.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">Replace Value</td>
                  <td className="py-3 px-4 text-emerald-300">Table.ReplaceValue(tbl, old, new, replacer, cols)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Replacer.ReplaceValue</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Replaces nulls with 0 across numeric columns.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-indigo-400 font-sans">Remove Blank Rows</td>
                  <td className="py-3 px-4 text-indigo-300">Table.SelectRows(tbl, condition)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Record.FieldValues</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Purges 100% blank rows from spreadsheet dumps.</td>
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
              <span className="text-emerald-400">🔬</span> Locale-Aware Type Coercion &amp; Replacer Engine Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Type &amp; Replacer Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> "Using Locale..." Global Date Immunity
              </h3>
              <p className="leading-relaxed">
                When importing text dates formatted as <code className="text-teal-300 font-mono">05/08/2026</code> (5th August), 
                standard US Windows systems mistakenly parse it as May 8th! 
                Using <strong>Change Type &rarr; Using Locale &rarr; English (United Kingdom / India)</strong> 
                forces Power Query to parse day-first with 100% geographic immunity.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                Culture: "en-GB" (DD/MM/YYYY Guaranteed)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Replacer.ReplaceText vs Replacer.ReplaceValue
              </h3>
              <p className="leading-relaxed">
                • <code className="text-sky-300 font-mono">Replacer.ReplaceText:</code> Performs substring search and replace within text strings.
                <br />
                • <code className="text-emerald-300 font-mono">Replacer.ReplaceValue:</code> Performs strict exact equality comparison; mandatory when replacing <code className="text-amber-300 font-mono">null</code> or numeric values!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                {'Replacer.ReplaceValue(tbl, null, 0, {"Amount"})'}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Stripping Currency Symbols Before Numeric Coercion
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              If an imported ERP column contains formatted currency strings like <code className="text-rose-400 font-mono">"₹ 45,000.00"</code> or <code className="text-rose-400 font-mono">"$ 12,500.50"</code>, 
              directly casting to Decimal Number produces red cell Errors. 
              Always apply: <strong>Replace "₹ " with "" &rarr; Replace "," with "" &rarr; Trim &rarr; Changed Type to Number</strong>.
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
              <span className="text-teal-400">📐</span> Visual Core Transformation Pipeline
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Data Cleaning Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how dirty unformatted spreadsheet rows pass through the 4 core transformations into a clean typed table:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Raw Messy Grid (Left) */}
              <rect x="25" y="25" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="25" width="220" height="34" rx="12" fill="#BE123C" fillOpacity="0.3" />
              <text x="135" y="47" fill="#FECDD3" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. RAW UNTYPED SOURCE</text>

              <g transform="translate(35, 75)" fontSize="8.5" fontFamily="monospace" fill="#CBD5E1">
                <rect width="200" height="28" fill="#334155" />
                <text x="8" y="18" fill="#FCA5A5" fontWeight="bold">Row 1: Cust_Name | Amount</text>

                <rect y="32" width="200" height="28" fill="#1E293B" />
                <text x="8" y="50">Swadeep | ₹ 45,000.00</text>

                <rect y="64" width="200" height="28" fill="#1E293B" />
                <text x="8" y="82">Tuhina  | null</text>

                <rect y="96" width="200" height="28" fill="#1E293B" />
                <text x="8" y="114">null    | null (Blank)</text>
              </g>

              <rect x="35" y="225" width="200" height="55" rx="6" fill="#881337" fillOpacity="0.4" stroke="#F43F5E" />
              <text x="135" y="245" fill="#FDA4AF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Dirty Untyped Grid</text>
              <text x="135" y="262" fill="#FECDD3" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Headers Trapped in Row 1</text>

              {/* Arrow */}
              <path d="M 260 160 L 315 160" stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,160 310,155 310,165" fill="#14B8A6" />

              {/* Core Transforms Engine (Center) */}
              <rect x="325" y="25" width="250" height="270" rx="14" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="325" y="25" width="250" height="34" rx="14" fill="#115E59" fillOpacity="0.4" />
              <text x="450" y="47" fill="#F0FDFA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. CORE TRANSFORMATIONS</text>

              <g transform="translate(340, 70)" fontSize="8.5" fontFamily="sans-serif">
                <rect width="220" height="32" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="10" y="20" fill="#5EEAD4" fontWeight="bold">1. Table.PromoteHeaders</text>

                <rect y="38" width="220" height="32" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="58" fill="#BAE6FD" fontWeight="bold">2. Remove Blank Rows</text>

                <rect y="76" width="220" height="32" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="96" fill="#A7F3D0" fontWeight="bold">3. Strip '₹ ' &amp; Cast to Number</text>

                <rect y="114" width="220" height="32" rx="4" fill="#854D0E" fillOpacity="0.3" stroke="#EAB308" />
                <text x="10" y="134" fill="#FEF08A" fontWeight="bold">4. Replace null with 0</text>
              </g>

              <text x="450" y="270" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Sequential In-Memory Recipe</text>

              {/* Arrow */}
              <path d="M 590 160 L 620 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,160 615,155 615,165" fill="#10B981" />

              {/* Clean Output Schema (Right) */}
              <rect x="630" y="25" width="195" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="630" y="25" width="195" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="727" y="45" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. PRISTINE TYPED TABLE</text>

              <g transform="translate(640, 75)" fontSize="8.5" fontFamily="monospace" fill="#E2E8F0">
                <rect width="175" height="28" fill="#064E3B" stroke="#10B981" />
                <text x="8" y="18" fill="#34D399" fontWeight="bold">ABC Cust | 1.2 Amount</text>

                <rect y="32" width="175" height="28" fill="#1E293B" />
                <text x="8" y="50">Swadeep  | 45000.00</text>

                <rect y="64" width="175" height="28" fill="#1E293B" />
                <text x="8" y="82">Tuhina   | 0.00</text>
              </g>

              <rect x="640" y="225" width="175" height="55" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="727" y="245" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">100% Clean Schema</text>
              <text x="727" y="262" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Ready for DAX Analytics</text>
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
                Explore the core transformations dataset below or download the practice workbook to test header promotion and type coercion in Microsoft Excel.
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
            sheetName="Topic4_Core_Transforms"
            title="Core Transformations Pipeline (Raw ID, Raw Name, Raw Amount Str, Promoted Status, Cleaned Type, Final Amount Val)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · Legacy ERP Text Strip</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Currency Symbol Stripping &amp; Numeric Coercion
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> cleans raw ERP revenue strings: 
                <code className="text-teal-300 font-mono">{'Table.ReplaceValue(Source, "₹ ", "", Replacer.ReplaceText, {"Amount"})'}</code>, 
                converting text strings into genuine Decimal Numbers ready for immediate DAX aggregation!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Replaces '₹ ' &rarr; Coerces to Decimal Number
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Cross-Border Invoicing</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                UK vs US Locale-Aware Date Parsing
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> parses UK supplier invoices formatted as <code className="text-amber-300 font-mono">DD/MM/YYYY</code> 
                using <code className="text-emerald-300 font-mono">Using Locale... English (United Kingdom)</code>, preventing May 8th vs August 5th date swaps.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Culture 'en-GB' &rarr; 100% Date Integrity
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Zero-Fill Financial Modeling</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Exact Null Replacement via Replacer.ReplaceValue
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> replaces all null discounts with 0: 
                <code className="text-indigo-300 font-mono">{'=Table.ReplaceValue(Source, null, 0, Replacer.ReplaceValue, {"Discount"})'}</code>, 
                eliminating blank propagation errors in profit margin formulas.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Exact Null &rarr; 0 Substitution
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Title Noise Elimination</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Remove Top Rows &amp; Promote Headers
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> strips 4 rows of company banner noise: 
                <code className="text-amber-300 font-mono">=Table.Skip(Source, 4)</code>, 
                then promotes the true column titles into official table headers in 1 click.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Table.Skip(4) &rarr; Table.PromoteHeaders
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
              <span className="text-teal-400">🪜</span> Step-by-Step Core Transformation Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Promote First Row to Headers</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Click <strong>Use First Row as Headers</strong> on the Home tab (<code className="text-teal-300 font-mono">Table.PromoteHeaders</code>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Remove Entirely Blank Rows</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Click <strong>Remove Rows</strong> &rarr; <strong>Remove Blank Rows</strong> to purge empty spreadsheet spacer rows.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Replace Currency Symbols &amp; Replace Nulls with 0</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Replace <code className="text-rose-300 font-mono">₹ </code> and <code className="text-rose-300 font-mono">,</code> with empty strings. Then Replace <code className="text-amber-300 font-mono">null</code> with <code className="text-emerald-400 font-mono">0</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Explicitly Coerce Column Types (Using Locale if Needed)</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Click the header type icons and assign <code className="text-emerald-400 font-mono">Decimal Number</code>, <code className="text-emerald-400 font-mono">Date</code>, and <code className="text-emerald-400 font-mono">Text</code> explicitly!
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
              Transform Error Protocol
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Error Code / Symptom</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">DataFormat.Error: We couldn't convert to Number</td>
                  <td className="py-3 px-4 text-slate-300">Coercing a text column containing currency symbols (<code className="text-rose-300 font-mono">₹, $</code>) or commas to number.</td>
                  <td className="py-3 px-4 text-slate-400">Red error cells in data preview.</td>
                  <td className="py-3 px-4 text-emerald-400">Strip currency symbols with Replace Values before changing data type.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Inverted International Dates</td>
                  <td className="py-3 px-4 text-slate-300">Parsing UK/India <code className="text-amber-300 font-mono">DD/MM/YYYY</code> dates on a US Windows machine.</td>
                  <td className="py-3 px-4 text-slate-400">August 5th (<code className="text-rose-300 font-mono">05/08</code>) parsed as May 8th.</td>
                  <td className="py-3 px-4 text-emerald-400">Right-click &rarr; Change Type &rarr; 'Using Locale...' &rarr; English (United Kingdom).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Replacer.ReplaceText on Numbers Error</td>
                  <td className="py-3 px-4 text-slate-300">Using ReplaceText on numeric columns to replace nulls.</td>
                  <td className="py-3 px-4 text-slate-400">Expression.Error: We cannot convert the value to Text.</td>
                  <td className="py-3 px-4 text-emerald-400">Use <code className="text-emerald-400 font-mono">Replacer.ReplaceValue</code> for non-text replacements.</td>
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
              Transform Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Using Locale...</span>
                <span>Global Date Immunity</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Change type with Locale to guarantee accurate date and decimal parsing worldwide.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Replacer.ReplaceValue</span>
                <span>Exact Null Replace</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use ReplaceValue instead of ReplaceText to replace nulls with 0 across numbers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">Double Click Header</span>
                <span>Fast Rename</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Double-click any header text to rename the column directly in the grid.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">Remove Blank Rows</span>
                <span>Spreadsheet Hygiene</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Eliminate 100% empty rows in one click from the Home tab Remove Rows menu.
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
                <strong>Reflect on type discipline:</strong> Why does assigning explicit data types (Decimal Number, Date, Text) instead of generic <code className="text-rose-400 font-mono">type any</code> optimize VertiPaq RAM compression in Power Pivot?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine international locale parsing:</strong> How does <code className="text-emerald-300 font-mono">Using Locale...</code> prevent catastrophic month/day date inversions when sharing financial workbooks across international offices?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider null handling:</strong> Why does replacing nulls with <code className="text-teal-300 font-mono">0</code> in numeric columns protect downstream DAX division and profit margin measures from propagating blank errors?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Core Transformations & Type Discipline — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Structure and type discipline form the backbone of enterprise financial modeling. Always promote headers cleanly, use 'Using Locale...' to guarantee date integrity across multinational operations, strip currency noise before numeric casting, and replace nulls with 0 to deliver pristine tables to your Power Pivot models!"
            }
          />
        </div>
      </div>
    </div>
  );
}
