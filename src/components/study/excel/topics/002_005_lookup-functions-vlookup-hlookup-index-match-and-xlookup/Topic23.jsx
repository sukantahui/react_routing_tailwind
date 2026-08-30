"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/002_005_lookup_functions_vlookup_hlookup_index_match_and_xlookup_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic23_files/topic23_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic23() {
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
    link.download = "lookup_functions_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              📋 Module 2.5 · Topic 23
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              Dynamic Relational Lookup Studio
            </span>
            <span className="px-3 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-300 text-xs font-semibold">
              Bloom's Level 5: Synthesize
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 bg-clip-text text-transparent leading-tight">
            Practice Session: Building a Multi-Criteria Dynamic Lookup Hub
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Synthesize the complete suite of Excel relational lookup technologies—from classic <strong>VLOOKUP</strong> and 
            <strong>INDEX-MATCH</strong> to modern <strong>XLOOKUP</strong> and dynamic two-way matrix intersection engines—into 
            an automated corporate pricing and data retrieval model.
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Two-Way Matrix:</strong> Dynamic row-and-column intersection retrieval</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Multi-Criteria Engine:</strong> Boolean array filtering inside XLOOKUP</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Error Immunity:</strong> Built-in if_not_found fallbacks and TRIM sanitation</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">⚡</span> Relational Lookup Syntax Architecture
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Formula Anatomy
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto shadow-inner leading-relaxed space-y-2">
            <div>
              <span className="text-slate-500">// Modern Multi-Criteria &amp; Two-Way Lookup Formulas</span>
              <br />
              <span className="text-purple-400">Two-Way INDEX-MATCH:</span>&nbsp;&nbsp;<span className="text-amber-300">=INDEX(PriceMatrix, MATCH(ProductKey, Codes, 0), MATCH(TierKey, Tiers, 0))</span>
              <br />
              <span className="text-purple-400">Multi-Condition XLOOKUP:</span>&nbsp;&nbsp;<span className="text-emerald-300">=XLOOKUP(1, (tbl_Pricing[Region]=C2) * (tbl_Pricing[Tier]=D2), tbl_Pricing[Tariff], "Not Found")</span>
              <br />
              <span className="text-purple-400">Sanitized XLOOKUP:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-300">=XLOOKUP(TRIM(A2), TRIM(tbl_Staff[ID]), tbl_Staff[Salary], 0)</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Lookup Pattern</th>
                  <th className="py-3 px-4">Standard Formula Structure</th>
                  <th className="py-3 px-4">Search Vector Direction</th>
                  <th className="py-3 px-4">Key Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-300">Classic Exact Match</td>
                  <td className="py-3 px-4 font-mono text-sky-300">=VLOOKUP(key, table, col, FALSE)</td>
                  <td className="py-3 px-4 text-slate-300">Vertical (Right-only)</td>
                  <td className="py-3 px-4">Universal legacy compatibility across older workbooks.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">Resilient Two-Way</td>
                  <td className="py-3 px-4 font-mono text-sky-300">=INDEX(grid, MATCH(r), MATCH(c))</td>
                  <td className="py-3 px-4 text-slate-300">2D Matrix (Row &times; Col)</td>
                  <td className="py-3 px-4">Immune to column insertion disruptions; supports left lookups.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">Modern Universal</td>
                  <td className="py-3 px-4 font-mono text-sky-300">=XLOOKUP(key, lookup, return, [not_found])</td>
                  <td className="py-3 px-4 text-slate-300">Omni-Directional (Any vector)</td>
                  <td className="py-3 px-4">Defaults to exact match; native error handling and array spilling.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">🔬</span> The 4 Mechanics of Relational Lookups
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Retrieval Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-emerald-300 text-base flex items-center gap-2">
                <span>1.</span> Primary Key Hygiene &amp; Uniqueness
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                A lookup function scans top-to-bottom and stops at the very first match. If primary keys are duplicated or contain trailing whitespace (<code className="text-rose-300 font-mono">"EMP-101 "</code> vs <code className="text-emerald-300 font-mono">"EMP-101"</code>), the lookup returns false data or errors out.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-sky-300 text-base flex items-center gap-2">
                <span>2.</span> Left-Lookup Decoupling
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Traditional VLOOKUP binds search and return columns into a rigid block. By separating lookup vectors from return vectors, <code className="text-sky-300 font-mono">INDEX-MATCH</code> and <code className="text-sky-300 font-mono">XLOOKUP</code> allow retrieving fields located anywhere on the worksheet.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-teal-300 text-base flex items-center gap-2">
                <span>3.</span> Boolean Array Multi-Condition Logic
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Evaluating <code className="text-teal-300 font-mono">(Branch="Barrackpore") * (Dept="IT")</code> generates a 1D vector of 1s and 0s in memory. Searching for <code className="text-teal-300 font-mono">1</code> isolates the exact record fulfilling all business constraints without auxiliary helper columns.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-purple-300 text-base flex items-center gap-2">
                <span>4.</span> Dynamic Array Multi-Column Spilling
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                In Excel 365, supplying a multi-column range to XLOOKUP's return vector (e.g. <code className="text-purple-300 font-mono">tbl_Staff[[Name]:[Salary]]</code>) returns all requested attributes simultaneously from a single formula cell.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">📐</span> Two-Way Matrix &amp; Multi-Criteria Lookup Hub Map
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Matrix Map
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg
              viewBox="0 0 880 340"
              className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans"
            >
              <defs>
                <linearGradient id="lkGradMatrix" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
              </defs>

              {/* Master 2D Matrix Container */}
              <g transform="translate(40, 20)">
                <rect width="800" height="280" rx="12" fill="url(#lkGradMatrix)" stroke="#334155" strokeWidth="1" />

                {/* Top Column Header Selector (MATCH Col) */}
                <rect x="220" y="20" width="560" height="40" rx="8" fill="#0284c7" fillOpacity="0.2" stroke="#0284c7" strokeWidth="1.5" />
                <text x="500" y="45" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="12">
                  MATCH(ColKey, [Bronze, Silver, Gold, Platinum], 0) &rarr; Col Coordinate 4
                </text>

                {/* Left Row Header Selector (MATCH Row) */}
                <rect x="20" y="80" width="180" height="180" rx="8" fill="#059669" fillOpacity="0.2" stroke="#059669" strokeWidth="1.5" />
                <text x="110" y="150" textAnchor="middle" fill="#34d399" fontWeight="bold" fontSize="12">
                  MATCH(RowKey) &rarr;
                </text>
                <text x="110" y="170" textAnchor="middle" fill="#34d399" fontWeight="bold" fontSize="12">
                  Row Coordinate 3
                </text>

                {/* Intersection Cell (INDEX Result) */}
                <rect x="620" y="140" width="140" height="60" rx="8" fill="#7c3aed" stroke="#c084fc" strokeWidth="2" />
                <text x="690" y="165" textAnchor="middle" fill="#ffffff" fontWeight="extrabold" fontSize="11">
                  INTERSECTION
                </text>
                <text x="690" y="185" textAnchor="middle" fill="#facc15" fontWeight="extrabold" fontSize="14">
                  ₹ 14,500 / mo
                </text>

                {/* Intersection Crosshair Guides */}
                <line x1="200" y1="170" x2="620" y2="170" stroke="#34d399" strokeWidth="2" strokeDasharray="4,4" />
                <line x1="690" y1="60" x2="690" y2="140" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4" />

                {/* Legend callouts */}
                <text x="240" y="240" fill="#94a3b8" fontSize="11">
                  • Row Key: Product Segment = "Enterprise Cloud" (Row 3)
                </text>
                <text x="240" y="260" fill="#94a3b8" fontSize="11">
                  • Column Key: Service Level = "Platinum" (Column 4) &rarr; INDEX(Matrix, 3, 4)
                </text>
              </g>
            </svg>
          </div>
          <p className="text-xs text-slate-400 text-center italic">
            Figure 19.1: Two-Way Matrix Lookup Architecture. Row coordinate and column coordinate are dynamically resolved via nested MATCH functions to extract the exact cell intersection.
          </p>
        </section>

        {/* =========================================================================
            SECTION 5: INTERACTIVE SPREADSHEET & DIRECT DOWNLOAD PORTAL
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
                Explore the multi-criteria pricing practice ledger live below or download the workbook to practice in Microsoft Excel.
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
            sheetName="Topic19_Practice_These_Top"
            title="Commercial Pricing Lookup Hub (Pricing Ref, Product Family, Service Tier, Region, Base Tariff, Surge Multiplier, Effective Price)"
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
              <span className="text-amber-400">🏢</span> Real-World Corporate Implementation Scenarios
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Enterprise Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Scenario 1 · Two-Way Pricing</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Swadeep Banerjee: 2D Tariff Matrix Engine
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Lead <strong>Swadeep Banerjee</strong> builds a dynamic two-way pricing calculator using <code className="text-emerald-300 font-mono">=INDEX(Matrix, MATCH(SKU), MATCH(Tier))</code>, enabling billing clerks to look up effective enterprise tariffs in 1 second.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Formula: =INDEX(tbl_RateCard, MATCH(C2, tbl_SKU, 0), MATCH(D2, tbl_Tiers, 0))
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Scenario 2 · Multi-Condition Query</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Tuhina Mukherjee: Boolean Multi-Criteria XLOOKUP
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Analyst <strong>Tuhina Mukherjee</strong> implements a multi-condition XLOOKUP based on Region and Service Tier to retrieve base billing tariffs, eliminating complex helper columns entirely.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-sky-300">
                Formula: =XLOOKUP(1, (tbl_Rates[Region]=E2)*(tbl_Rates[Tier]=F2), tbl_Rates[Tariff])
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Scenario 3 · Resilient Left-Lookup</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Abhronila Das: Key Sanitation &amp; Left Retrieval
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Inventory Specialist <strong>Abhronila Das</strong> sanitizes raw barcode imports with <code className="text-teal-300 font-mono">TRIM(CLEAN(...))</code> and performs a left-lookup to retrieve Supplier IDs positioned to the left of SKU codes.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Formula: =XLOOKUP(TRIM(A2), tbl_Parts[SKU], tbl_Parts[Supplier_ID], "Unknown")
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Scenario 4 · Reverse Order Search</span>
                <span className="text-xs font-mono text-slate-400">Naihati Logistics</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Debangshu Roy: Bottom-Up Chronological Tracking
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Logistics Lead <strong>Debangshu Roy</strong> configures XLOOKUP with search mode <code className="text-purple-300 font-mono">-1</code> (last-to-first) across a 45-row shipment log to instantly extract the latest delivery status for any client ID.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =XLOOKUP(ClientID, tbl_Log[Client], tbl_Log[Status], "No Record", 0, -1)
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP PRACTICAL CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-sky-400">🛠️</span> Step-by-Step Lookup Hub Construction
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Lab Guide
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center justify-center text-xs">1</span>
                Step 1: Sanitize Primary Keys &amp; Bind Tables
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Convert both the transaction table and dimension master into structured tables (<kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-xs">Ctrl + T</kbd>). Confirm there are zero blank rows and wrap key inputs in <code className="text-emerald-300 font-mono">TRIM()</code>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-sky-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center text-xs">2</span>
                Step 2: Build Two-Way Matrix Resolution
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Use <code className="text-sky-300 font-mono">=INDEX(RateMatrix, MATCH(ProductKey, Codes, 0), MATCH(TierKey, Tiers, 0))</code> to extract the exact cell at the intersection of the product row and service level column.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-teal-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-950 border border-teal-700 text-teal-300 flex items-center justify-center text-xs">3</span>
                Step 3: Implement Fallback Error Handling
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Configure explicit <code className="text-teal-300 font-mono">[if_not_found]</code> values (e.g. <code className="text-slate-300 font-mono">0</code> or <code className="text-slate-300 font-mono">"Not Listed"</code>) so arithmetic downstream formulas do not break with #N/A.
              </p>
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
              <span className="text-rose-400">⚠️</span> Common Lookup Pitfalls &amp; Diagnostic Fixes
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Troubleshooting Matrix
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Lookup Error</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Operational Impact</th>
                  <th className="py-3 px-4">Diagnostic Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">#N/A Mystery Error</td>
                  <td className="py-3 px-4">Trailing space in key or number stored as text.</td>
                  <td className="py-3 px-4 text-rose-400 font-semibold">Valid records fail to match.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Wrap keys in TRIM() or use VALUE() / TEXT().</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">Column Shift Corruption</td>
                  <td className="py-3 px-4">Hardcoded column index (e.g. 3) in VLOOKUP after column insertion.</td>
                  <td className="py-3 px-4 text-amber-400 font-semibold">Formula returns wrong column data silently.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Switch to INDEX-MATCH or XLOOKUP.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">Omitted FALSE in VLOOKUP</td>
                  <td className="py-3 px-4">Leaving 4th argument blank triggers approximate match on unsorted data.</td>
                  <td className="py-3 px-4 text-purple-400 font-semibold">Returns wrong random client or product.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Always set 4th argument explicitly to FALSE or 0.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">Whole Column Sluggishness</td>
                  <td className="py-3 px-4">Referencing entire columns (e.g. <code className="text-sky-300 font-mono">A:D</code>) across 5,000 rows.</td>
                  <td className="py-3 px-4 text-sky-400 font-semibold">Workbook freezes during recalculation.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Use structured table references (tbl_Data[Col]).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & HIGH-SPEED SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">💡</span> Master Lookup Pro Tips &amp; Keyboard Accelerators
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Productivity Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-300 flex items-center gap-2">
                <span>⚡</span> Tip 1: Multi-Column Spill via XLOOKUP
              </div>
              <p className="text-slate-300 leading-relaxed">
                Pass a multi-column range to XLOOKUP's return vector (e.g. <code className="text-emerald-300 font-mono">C2:F100</code>) to spill all fields across the row from a single formula cell.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-sky-300 flex items-center gap-2">
                <span>⚡</span> Tip 2: Bottom-to-Top Search Mode (-1)
              </div>
              <p className="text-slate-300 leading-relaxed">
                Set search mode to <code className="text-sky-300 font-mono">-1</code> in XLOOKUP to extract the latest transaction date or most recent order status instantly.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span>⚡</span> Tip 3: Built-In If_Not_Found Fallbacks
              </div>
              <p className="text-slate-300 leading-relaxed">
                Utilize XLOOKUP's 4th argument <code className="text-teal-300 font-mono">"Not Found"</code> to eliminate wrapping formulas in cumbersome <code className="text-slate-300 font-mono">IFERROR()</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> Tip 4: Lock Lookup Tables via F4
              </div>
              <p className="text-slate-300 leading-relaxed">
                Always press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-xs">F4</kbd> to lock range coordinates (<code className="text-purple-300 font-mono">$A$2:$D$500</code>) when working on non-table ranges.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS ("THINK ABOUT...")
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">🤔</span> Socratic Analytical Hints ("Think About...")
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Architectural Reflection
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">💭</span> Question 1: Why did Microsoft create XLOOKUP after 30 years of VLOOKUP?
              </h3>
              <p className="leading-relaxed">
                How does eliminating hardcoded column index numbers and default approximate matching prevent multi-million dollar corporate spreadsheet errors?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">💭</span> Question 2: How does a Two-Way matrix lookup mimic relational database queries?
              </h3>
              <p className="leading-relaxed">
                Why is resolving row coordinates and column coordinates simultaneously superior to creating 50 separate formula lookup rules?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 3: What is the relationship between Data Validation dropdowns and Lookups?
              </h3>
              <p className="leading-relaxed">
                How does constraining user input with dropdown lists eliminate 99% of lookup #N/A errors in shared corporate workbooks?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 23: Dynamic Relational Lookup Studio FAQ"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Lookups are the relational backbone of financial modeling and enterprise reporting. Never rely on fragile hardcoded column numbers. Clean your primary keys with TRIM, leverage XLOOKUP and INDEX-MATCH for flexible two-way and left-side lookups, and configure explicit if_not_found fallbacks. When your lookup architecture is robust, your entire spreadsheet model becomes indestructible."
            }
          />
        </div>
      </div>
    </div>
  );
}
