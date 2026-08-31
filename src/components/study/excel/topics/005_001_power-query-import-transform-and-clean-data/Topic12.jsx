"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_001_power_query_import_transform_and_clean_data_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic12_files/topic12_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic12() {
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
              ⚡ AI String Matching · Topic 12
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Approximate &amp; Fuzzy Joins
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze &amp; Harmonize
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Fuzzy Matching: Merging Datasets with Typos &amp; Approximate Spellings
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Real-world corporate data is rarely pristine: customer names contain typos, addresses omit spaces, 
            and vendor invoices use non-standard acronyms. 
            Power Query's <strong>Fuzzy Matching Engine</strong> (<code className="text-teal-300 font-mono">Table.FuzzyNestedJoin</code>) 
            harnesses advanced Jaccard similarity and Levenshtein edit distance heuristics to merge datasets with 
            configurable <strong>Similarity Thresholds</strong> (0.80–0.85), <strong>Token Recombination</strong>, and 
            custom <strong>Transformation Tables</strong> (<code className="text-emerald-300 font-mono">[From, To]</code>)!
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Similarity Thresholds:</strong> Calibrate matching tolerance from 0.00 to 1.00 (0.82 optimal)</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Transformation Tables:</strong> Map domain acronyms (e.g. BKP → Barrackpore)</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>NumberOfMatches = 1:</strong> Eliminates duplicate row explosion during fuzzy lookup</span>
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
              <span className="text-teal-400">⚡</span> Power Query Fuzzy Match M Syntax Anatomy
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              M Table.FuzzyNestedJoin
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300 space-y-2">
            <span className="text-slate-500">// 1. Fuzzy Merge with Custom Threshold &amp; Options</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.FuzzyNestedJoin(Fact_Sales, {"Customer_Name"}, Dim_Customers, {"Customer_Name"}, "Matched", JoinKind.LeftOuter, [IgnoreCase=true, IgnoreSpaces=true, Threshold=0.82, NumberOfMatches=1, TransformationTable=tbl_Acronyms])'}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Fuzzy Option Parameter</th>
                  <th className="py-3 px-4">Default Value</th>
                  <th className="py-3 px-4">Recommended Setting</th>
                  <th className="py-3 px-4">Enterprise Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">Similarity Threshold</td>
                  <td className="py-3 px-4 text-teal-300">0.80</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">0.80 – 0.85</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Balances typo tolerance with false-positive prevention.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">Ignore Spaces</td>
                  <td className="py-3 px-4 text-emerald-300">true</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">true</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Matches token spacing differences (e.g. 'Micro Soft' → 'Microsoft').</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">NumberOfMatches</td>
                  <td className="py-3 px-4 text-sky-300">null (All)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">1</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Returns only the single highest-scoring match, preventing row duplication.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-indigo-400 font-sans">TransformationTable</td>
                  <td className="py-3 px-4 text-indigo-300">null</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">tbl_Synonyms</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Custom [From, To] mapping table for local corporate acronyms.</td>
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
              <span className="text-emerald-400">🔬</span> Similarity Tuning, Transformation Tables &amp; 3-Phase Architecture
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Fuzzy Matching Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> Transformation Table Schema (`From` / `To`)
              </h3>
              <p className="leading-relaxed">
                Fuzzy algorithms cannot guess arbitrary business acronyms (e.g. <code className="text-teal-300 font-mono">BKP</code> for <code className="text-teal-300 font-mono">Barrackpore</code>). 
                Creating a 2-column table with exact headers <code className="text-sky-300 font-mono">From</code> and <code className="text-sky-300 font-mono">To</code> teaches 
                Power Query your domain dictionary!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                From: "BKP" → To: "Barrackpore"
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> 3-Phase High-Performance Architecture
              </h3>
              <p className="leading-relaxed">
                Fuzzy matching across 500,000 raw transaction rows consumes extreme CPU time. 
                Instead: 
                <strong>1. Extract Distinct Raw Names → 2. Fuzzy Match the small distinct list → 3. Exact-merge clean names back to the transaction fact table!</strong>
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Distinct Key Match → 95% CPU Reduction
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Similarity Threshold Calibration (0.80–0.85)
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Setting the threshold below <strong>0.70</strong> introduces dangerous false positives (e.g. matching <em>Tata Motors</em> to <em>Tata Steel</em>). 
              Setting it above <strong>0.90</strong> misses multi-letter typos. 
              The recommended corporate standard is <strong>0.82</strong> with <code className="text-teal-300 font-mono">NumberOfMatches = 1</code>.
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
              <span className="text-teal-400">📐</span> Visual Fuzzy String Resolution Pipeline
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Fuzzy Matching Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how dirty strings with typos, missing spaces, and acronyms are resolved against the clean master dimension:
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
              <text x="135" y="47" fill="#FECDD3" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. DIRTY INPUT STRINGS</text>

              <g transform="translate(35, 75)" fontSize="8.5" fontFamily="monospace" fill="#CBD5E1">
                <rect width="200" height="28" fill="#1E293B" />
                <text x="8" y="18" fill="#FCA5A5">Swadip Banerji (Typo)</text>

                <rect y="32" width="200" height="28" fill="#1E293B" />
                <text x="8" y="50" fill="#FCA5A5">TuhinaMukherjee (Space)</text>

                <rect y="64" width="200" height="28" fill="#1E293B" />
                <text x="8" y="82" fill="#FCA5A5">BKP Tech Hub (Acronym)</text>

                <rect y="96" width="200" height="28" fill="#1E293B" />
                <text x="8" y="114" fill="#FCA5A5">Abhronila Sengupt (Missing)</text>
              </g>

              <rect x="35" y="225" width="200" height="55" rx="6" fill="#881337" fillOpacity="0.4" stroke="#F43F5E" />
              <text x="135" y="245" fill="#FDA4AF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Messy ERP Strings</text>
              <text x="135" y="262" fill="#FECDD3" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Fails Exact VLOOKUP (0 Matches)</text>

              {/* Arrow */}
              <path d="M 260 160 L 315 160" stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,160 310,155 310,165" fill="#14B8A6" />

              {/* Fuzzy Match Engine (Center) */}
              <rect x="325" y="25" width="250" height="270" rx="14" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="325" y="25" width="250" height="34" rx="14" fill="#115E59" fillOpacity="0.4" />
              <text x="450" y="47" fill="#F0FDFA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. FUZZY MATCH ENGINE</text>

              <g transform="translate(340, 70)" fontSize="8.5" fontFamily="sans-serif">
                <rect width="220" height="32" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="10" y="20" fill="#5EEAD4" fontWeight="bold">1. Jaccard &amp; Levenshtein (0.82)</text>

                <rect y="38" width="220" height="32" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="58" fill="#BAE6FD" fontWeight="bold">2. IgnoreSpaces &amp; IgnoreCase</text>

                <rect y="76" width="220" height="32" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="96" fill="#A7F3D0" fontWeight="bold">3. TransformationTable (BKP → ...)</text>

                <rect y="114" width="220" height="32" rx="4" fill="#854D0E" fillOpacity="0.3" stroke="#EAB308" />
                <text x="10" y="134" fill="#FEF08A" fontWeight="bold">4. NumberOfMatches = 1</text>
              </g>

              <text x="450" y="270" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ AI-Level String Resolution</text>

              {/* Arrow */}
              <path d="M 590 160 L 620 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,160 615,155 615,165" fill="#10B981" />

              {/* Master Output (Right) */}
              <rect x="630" y="25" width="195" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="630" y="25" width="195" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="727" y="45" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. STANDARDIZED MASTER</text>

              <g transform="translate(640, 75)" fontSize="8" fontFamily="monospace" fill="#E2E8F0">
                <rect width="175" height="22" fill="#064E3B" stroke="#10B981" />
                <text x="6" y="15" fill="#34D399" fontWeight="bold">Swadeep Banerjee</text>

                <rect y="25" width="175" height="20" fill="#1E293B" />
                <text x="6" y="39">Tuhina Mukherjee</text>

                <rect y="48" width="175" height="20" fill="#1E293B" />
                <text x="6" y="62">Barrackpore Tech Hub</text>

                <rect y="71" width="175" height="20" fill="#1E293B" />
                <text x="6" y="85">Abhronila Sengupta</text>
              </g>

              <rect x="640" y="225" width="175" height="55" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="727" y="245" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">100% Clean Schema</text>
              <text x="727" y="262" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Standardized for Analytics</text>
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
                Explore the fuzzy matching dataset below or download the practice workbook to test Table.FuzzyNestedJoin in Microsoft Excel.
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
            sheetName="EX2013"
            title="Fuzzy Matching Reconciliation Pipeline (Raw Client Name, Matched Master Name, Match Similarity Score, Standardized Branch, Invoice Amount INR)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · Typo Customer Reconciliation</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Resolving 'Swadip Banerji' to Master Name
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> reconciles 15,000 legacy handwritten receipts containing spelling slips using <code className="text-teal-300 font-mono">Table.FuzzyNestedJoin</code> at threshold 0.82, matching 99.4% of records automatically!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Threshold = 0.82 → 99.4% Automated Match Rate
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Acronym Transformation Table</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Mapping 'BKP', 'WB', and 'Pvt Ltd'
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> connects a 2-column <code className="text-emerald-300 font-mono">[From, To]</code> Transformation Table mapping regional abbreviations, eliminating manual dictionary replacement steps entirely.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                TransformationTable → Auto-Standardizes Corporate Acronyms
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Missing Space Recombination</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                IgnoreSpaces Matching on Vendor Names
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> cleans vendor files where strings lack spaces (<code className="text-indigo-300 font-mono">"TataSteelLtd"</code> vs <code className="text-indigo-300 font-mono">"Tata Steel Ltd"</code>) using <code className="text-indigo-300 font-mono">[IgnoreSpaces = true]</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                [IgnoreSpaces=true] → Resolves Concatenated Vendor Strings
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · 3-Phase CPU Architecture</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Fuzzy Matching on Distinct Key Lists
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> deduplicates 300,000 POS transactions to 2,000 distinct customer names before fuzzy matching, reducing refresh duration from 12 minutes to 3.5 seconds!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Distinct Key Match → 3.5s Refresh vs 12 Minutes
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
              <span className="text-teal-400">🪜</span> Step-by-Step Fuzzy Matching Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Pre-Clean Text on Both Tables</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Apply <code className="text-teal-300 font-mono">Text.Clean</code>, <code className="text-teal-300 font-mono">Text.Trim</code>, and <code className="text-teal-300 font-mono">Text.Upper</code> to strip non-printable characters and whitespace noise.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Create [From, To] Transformation Table</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Go to <strong>Home → Enter Data</strong> → Create columns <code className="text-indigo-300 font-mono">From</code> and <code className="text-indigo-300 font-mono">To</code> with corporate acronym mappings.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Enable Fuzzy Matching &amp; Set Threshold (0.82)</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In the Merge dialog, check <strong>Use fuzzy matching to perform the merge</strong> → Set Threshold to <strong>0.82</strong> → Set <strong>Maximum number of matches = 1</strong>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Audit Matched Master Names Side-by-Side</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Expand Master Name → Add conditional column <code className="text-emerald-400 font-mono">[Raw_Name] &lt;&gt; [Master_Name]</code> to review and approve all corrected typo instances!
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
              Fuzzy Error Protocol
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">False Positive Matches</td>
                  <td className="py-3 px-4 text-slate-300">Threshold set too low (&lt; 0.70), matching unrelated accounts.</td>
                  <td className="py-3 px-4 text-slate-400">'Tata Motors' matches 'Tata Steel'.</td>
                  <td className="py-3 px-4 text-emerald-400">Raise Similarity Threshold to 0.82–0.88.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Fuzzy Row Duplication</td>
                  <td className="py-3 px-4 text-slate-300">Left 'Maximum number of matches' blank when two similar candidates existed.</td>
                  <td className="py-3 px-4 text-slate-400">Primary transaction row duplicates in fact table.</td>
                  <td className="py-3 px-4 text-emerald-400">Set <code className="text-emerald-400 font-mono">NumberOfMatches = 1</code> in Fuzzy Options.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Transformation Table Ignored</td>
                  <td className="py-3 px-4 text-slate-300">Used column headers other than 'From' and 'To' (e.g. 'Old' and 'New').</td>
                  <td className="py-3 px-4 text-slate-400">Acronyms like 'BKP' fail to match 'Barrackpore'.</td>
                  <td className="py-3 px-4 text-emerald-400">Rename columns strictly to <code className="text-emerald-400 font-mono">From</code> and <code className="text-emerald-400 font-mono">To</code>.</td>
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
              Fuzzy Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">NumberOfMatches = 1</span>
                <span>Prevent Row Duplication</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always set to 1 to pick the single top-scoring candidate and prevent row multiplication.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Threshold 0.82</span>
                <span>The Golden Ratio</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                0.82 provides the ideal corporate balance between typo tolerance and precision.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">Transformation Tables</span>
                <span>Acronym Dictionaries</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use 2-column [From, To] mapping tables to teach Power Query domain-specific synonyms.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">Distinct Key Strategy</span>
                <span>95% CPU Savings</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fuzzy match distinct customer keys first, then exact-merge back to transaction fact tables.
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
                <strong>Reflect on similarity calibration:</strong> Why does lowering the similarity threshold from 0.80 to 0.60 exponentially increase false-positive match risks in corporate accounting?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine Transformation Tables:</strong> Why are phonetic and edit-distance algorithms incapable of matching <code className="text-teal-300 font-mono">BKP</code> to <code className="text-teal-300 font-mono">Barrackpore</code> without a custom <code className="text-emerald-400 font-mono">[From, To]</code> mapping dictionary?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider distinct key architecture:</strong> Why does isolating unique customer names before fuzzy matching reduce computational complexity by 95% compared to matching raw fact tables?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Fuzzy Matching & String Reconciliation — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Pre-clean text, use Transformation Tables for acronyms, and never fuzzy-match raw transaction millions! Always apply Clean and Trim first, set Similarity Threshold between 0.80 and 0.85 with NumberOfMatches=1 to avoid row explosion, supply a [From, To] Transformation Table for local domain abbreviations, and execute fuzzy joins ONLY on distinct key lists before merging back to transaction facts!"
            }
          />
        </div>
      </div>
    </div>
  );
}
