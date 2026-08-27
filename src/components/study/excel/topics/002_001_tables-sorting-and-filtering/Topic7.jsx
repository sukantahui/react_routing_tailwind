"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/tables_sorting_filtering.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic7() {
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
    link.download = "tables_sorting_filtering_practice.xlsx";
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
              📋 Module 2.1 · Topic 7
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              Interactive Table Dashboard Studio
            </span>
            <span className="px-3 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-300 text-xs font-semibold">
              Bloom's Level 5: Synthesize
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 bg-clip-text text-transparent leading-tight">
            Practice Session: Building a Dynamic Sort &amp; Filter Dashboard
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Learn to synthesize the power of <strong>Excel Structured Tables</strong> (<code className="text-emerald-300 font-mono">Ctrl + T</code>), 
            <strong>Multi-Level Sorting</strong> (<code className="text-sky-300 font-mono">Alt + D + S</code>), 
            <strong>Interactive Visual Slicers</strong>, and dynamic 
            <strong>SUBTOTAL aggregations</strong> into an automated executive data dashboard that responds instantly to user interaction.
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Structured Objects:</strong> Auto-expanding [@Column] calculation formulas</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Visual Slicers:</strong> 1-Click horizontal button filtering panels</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Dynamic Aggregates:</strong> SUBTOTAL(109) evaluating visible rows only</span>
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
              <span className="text-emerald-400">⚡</span> Structured Syntax &amp; Table Hierarchy Blueprint
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Syntax Architecture
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto shadow-inner leading-relaxed space-y-2">
            <div>
              <span className="text-slate-500">// Structured Table Calculation &amp; Aggregation Syntax</span>
              <br />
              <span className="text-purple-400">Calculated Column:</span>&nbsp;&nbsp;<span className="text-amber-300">=[@Realized_Revenue] * (1 - [@Discount_Rate])</span>
              <br />
              <span className="text-purple-400">Total Row Sum:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-300">=SUBTOTAL(109, [Realized_Revenue])</span>
              <br />
              <span className="text-purple-400">External Table Sum:</span>&nbsp;&nbsp;<span className="text-sky-300">=SUM(tbl_CommercialOperations[Realized_Revenue])</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Syntax Element</th>
                  <th className="py-3 px-4">Structured Format</th>
                  <th className="py-3 px-4">Scope / Execution Mode</th>
                  <th className="py-3 px-4">Operational Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-300">Current Row Value</td>
                  <td className="py-3 px-4 font-mono text-sky-300">[@ColumnName]</td>
                  <td className="py-3 px-4 text-slate-300">Implicit intersection (active row)</td>
                  <td className="py-3 px-4">Immune to sorting disruptions and column shifting.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">Entire Data Body</td>
                  <td className="py-3 px-4 font-mono text-sky-300">TableName[ColumnName]</td>
                  <td className="py-3 px-4 text-slate-300">Full 1D column vector (data rows)</td>
                  <td className="py-3 px-4">Automatically grows as new transactions are added.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">Visible Rows Subtotal</td>
                  <td className="py-3 px-4 font-mono text-sky-300">SUBTOTAL(109, [Column])</td>
                  <td className="py-3 px-4 text-slate-300">Filtered subset calculation</td>
                  <td className="py-3 px-4">Recalculates dynamically during active Slicer clicks.</td>
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
              <span className="text-teal-400">🔬</span> The 4 Mechanics of Structured Table Dashboards
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Engine Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-emerald-300 text-base flex items-center gap-2">
                <span>1.</span> Relational Field Encapsulation
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Converting a raw range to an Excel Table (<kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-xs">Ctrl + T</kbd>) binds the cells into a unified relational database table. Formula columns propagate automatically to all rows, eliminating inconsistent cell calculations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-sky-300 text-base flex items-center gap-2">
                <span>2.</span> Non-Destructive Filtering Engine
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                AutoFilter and Slicers never delete unselected rows; they simply adjust row heights to zero. Because standard <code className="text-sky-300 font-mono">SUM</code> counts hidden rows, <code className="text-sky-300 font-mono">SUBTOTAL(109)</code> is required to sum visible filtered records only.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-teal-300 text-base flex items-center gap-2">
                <span>3.</span> Multi-Tier Sort Hierarchies
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Multi-level sorting organizes data by primary categorical tiers (e.g. Branch), secondary business units (e.g. Department), and tertiary quantitative ranks (e.g. Revenue Descending), providing structured executive clarity.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-purple-300 text-base flex items-center gap-2">
                <span>4.</span> Interactive Slicer Control Ribbons
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Slicers transform cumbersome header dropdown menus into large, touch-friendly navigation toolbars. Setting Slicer columns to 4 creates a sleek, executive-level header filter strip across the top of the worksheet.
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
              <span className="text-emerald-400">📐</span> Interactive Table Dashboard Architecture
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Dashboard Map
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg
              viewBox="0 0 880 340"
              className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans"
            >
              <defs>
                <linearGradient id="tblGradHeader" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#065f46" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
                <linearGradient id="tblGradSlicer" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
              </defs>

              {/* Slicer Ribbon at Top */}
              <g transform="translate(40, 20)">
                <rect width="800" height="60" rx="10" fill="url(#tblGradSlicer)" stroke="#0284c7" strokeWidth="1.5" />
                <text x="20" y="25" fill="#38bdf8" fontSize="11" fontWeight="bold">BRANCH SLICER RIBBON (1-Click Interactive Filter)</text>
                
                {/* Slicer Buttons */}
                <rect x="20" y="32" width="130" height="20" rx="4" fill="#0284c7" />
                <text x="85" y="46" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">✓ All Branches</text>

                <rect x="160" y="32" width="130" height="20" rx="4" fill="#334155" />
                <text x="225" y="46" textAnchor="middle" fill="#e2e8f0" fontSize="10">Barrackpore</text>

                <rect x="300" y="32" width="130" height="20" rx="4" fill="#334155" />
                <text x="365" y="46" textAnchor="middle" fill="#e2e8f0" fontSize="10">Shyamnagar</text>

                <rect x="440" y="32" width="130" height="20" rx="4" fill="#334155" />
                <text x="505" y="46" textAnchor="middle" fill="#e2e8f0" fontSize="10">Ichapur</text>

                <rect x="580" y="32" width="130" height="20" rx="4" fill="#334155" />
                <text x="645" y="46" textAnchor="middle" fill="#e2e8f0" fontSize="10">Naihati</text>
              </g>

              {/* Table Container */}
              <g transform="translate(40, 95)">
                <rect width="800" height="210" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1" />

                {/* Table Header */}
                <rect width="800" height="32" rx="10" fill="url(#tblGradHeader)" />
                <text x="30" y="21" fill="#ffffff" fontWeight="bold" fontSize="11">Dashboard_Ref</text>
                <text x="160" y="21" fill="#ffffff" fontWeight="bold" fontSize="11">Branch_Center</text>
                <text x="310" y="21" fill="#ffffff" fontWeight="bold" fontSize="11">Product_Segment</text>
                <text x="470" y="21" fill="#ffffff" fontWeight="bold" fontSize="11">Annual_Quota</text>
                <text x="610" y="21" fill="#ffffff" fontWeight="bold" fontSize="11">Realized_Revenue</text>
                <text x="750" y="21" fill="#ffffff" fontWeight="bold" fontSize="11">Variance_%</text>

                {/* Row 1 */}
                <rect x="10" y="40" width="780" height="26" fill="#1e293b" rx="4" />
                <text x="30" y="57" fill="#38bdf8" fontSize="10" fontFamily="monospace">DSH-5501</text>
                <text x="160" y="57" fill="#e2e8f0" fontSize="10">Barrackpore</text>
                <text x="310" y="57" fill="#e2e8f0" fontSize="10">Software Engineering</text>
                <text x="470" y="57" fill="#94a3b8" fontSize="10">₹ 12,00,000</text>
                <text x="610" y="57" fill="#34d399" fontSize="10" fontWeight="bold">₹ 14,20,000</text>
                <text x="750" y="57" fill="#34d399" fontSize="10" fontWeight="bold">+ 18.3%</text>

                {/* Row 2 */}
                <rect x="10" y="72" width="780" height="26" fill="#0f172a" rx="4" />
                <text x="30" y="89" fill="#38bdf8" fontSize="10" fontFamily="monospace">DSH-5502</text>
                <text x="160" y="89" fill="#e2e8f0" fontSize="10">Shyamnagar</text>
                <text x="310" y="89" fill="#e2e8f0" fontSize="10">Taxation &amp; Accounts</text>
                <text x="470" y="89" fill="#94a3b8" fontSize="10">₹ 12,00,000</text>
                <text x="610" y="89" fill="#34d399" fontSize="10" fontWeight="bold">₹ 13,85,000</text>
                <text x="750" y="89" fill="#34d399" fontSize="10" fontWeight="bold">+ 15.4%</text>

                {/* Row 3 */}
                <rect x="10" y="104" width="780" height="26" fill="#1e293b" rx="4" />
                <text x="30" y="121" fill="#38bdf8" fontSize="10" fontFamily="monospace">DSH-5503</text>
                <text x="160" y="121" fill="#e2e8f0" fontSize="10">Ichapur</text>
                <text x="310" y="121" fill="#e2e8f0" fontSize="10">Financial Analytics</text>
                <text x="470" y="121" fill="#94a3b8" fontSize="10">₹ 12,00,000</text>
                <text x="610" y="121" fill="#38bdf8" fontSize="10" fontWeight="bold">₹ 12,40,000</text>
                <text x="750" y="121" fill="#38bdf8" fontSize="10" fontWeight="bold">+ 3.3%</text>

                {/* Total Row (SUBTOTAL 109) */}
                <rect x="0" y="170" width="800" height="36" fill="#022c22" stroke="#059669" strokeWidth="1" rx="6" />
                <text x="30" y="193" fill="#34d399" fontWeight="extrabold" fontSize="11">TOTAL (SUBTOTAL 109 Visible Rows):</text>
                <text x="470" y="193" fill="#e2e8f0" fontWeight="bold" fontSize="11">₹ 36,00,000</text>
                <text x="610" y="193" fill="#34d399" fontWeight="extrabold" fontSize="12">₹ 40,45,000</text>
                <text x="750" y="193" fill="#34d399" fontWeight="extrabold" fontSize="12">+ 12.3% Net</text>
              </g>
            </svg>
          </div>
          <p className="text-xs text-slate-400 text-center italic">
            Figure 7.1: Interactive Table Dashboard Architecture. Top slicer buttons dynamically filter structured table rows while the Total Row uses SUBTOTAL(109) to compute visible metrics in real time.
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
                Explore the multi-branch commercial dashboard table live below or download the workbook to practice in Microsoft Excel.
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
            sheetName="Topic7_Dashboard_Practice"
            title="Commercial Operations Table Practice (Dashboard Ref, Branch Center, Product Segment, Lead Specialist, Annual Quota, Realized Revenue, Variance %)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Scenario 1 · Commercial Roster</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Swadeep Banerjee: Multi-Slicer Operations Table
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Lead <strong>Swadeep Banerjee</strong> converts a 45-row commercial contract sheet into a structured table named <code className="text-emerald-300 font-mono">tbl_Commercial</code>. Connecting two 4-column slicers for Branch and Segment allows regional managers to isolate localized revenue in 1 click.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Formula: =SUBTOTAL(109, tbl_Commercial[Realized_Revenue])
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Scenario 2 · Compensation Ranking</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Tuhina Mukherjee: 3-Tier Multi-Level Sort
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                HR Specialist <strong>Tuhina Mukherjee</strong> configures a multi-level sort hierarchy across 40 regional staff: Level 1 by Branch (A-Z), Level 2 by Department, and Level 3 by Monthly Sales (Largest to Smallest), enabling immediate tier-based incentive auditing.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-sky-300">
                Sort: [Branch] (A-Z) &rarr; [Dept] (A-Z) &rarr; [Sales] (Descending)
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Scenario 3 · Stock Reorder Alert</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Abhronila Das: AutoFilter SKU Thresholds
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Inventory Manager <strong>Abhronila Das</strong> uses AutoFilter custom criteria with wildcard patterns (<code className="text-teal-300 font-mono">*Precision*</code>) to filter critical hardware parts falling below their 20-unit reorder threshold.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Filter: [Current_Stock] &lt;= 20 AND [Item_Description] CONTAINS "Precision"
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Scenario 4 · Advanced Filter Extraction</span>
                <span className="text-xs font-mono text-slate-400">Naihati Wholesale</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Debangshu Roy: Complex Boolean Extraction
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Auditor <strong>Debangshu Roy</strong> models a 2-row criteria range in Advanced Filter to extract all orders exceeding ₹50,000 in Barrackpore OR orders paid via UPI in Naihati, copying unique results to an audit review tab.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Criteria: (Branch="BKP" AND Tot&gt;50k) OR (Branch="NAI" AND Pay="UPI")
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
              <span className="text-sky-400">🛠️</span> Step-by-Step Table Dashboard Construction
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
                Step 1: Convert Range to Table &amp; Rename
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Click inside your dataset &rarr; Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Ctrl + T</kbd> &rarr; Check 'My table has headers' &rarr; Click OK &rarr; Go to <strong>Table Design</strong> &rarr; Rename to <code className="text-emerald-300 font-mono">tbl_CommercialOperations</code>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-sky-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center text-xs">2</span>
                Step 2: Add Calculated Columns with Structured Formulas
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Type <code className="text-sky-300 font-mono">=[@Realized_Revenue] - [@Annual_Quota]</code> in column G. Notice how Excel automatically expands the table and propagates the formula down all rows instantly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-teal-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-950 border border-teal-700 text-teal-300 flex items-center justify-center text-xs">3</span>
                Step 3: Insert Interactive Slicers &amp; Enable Total Row
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Go to <strong>Table Design &rarr; Insert Slicer</strong> &rarr; Select <strong>Branch_Center</strong> &rarr; Set Columns to 4 &rarr; Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Ctrl + Shift + T</kbd> to activate the dynamic Total Row.
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
              <span className="text-rose-400">⚠️</span> Common Table Dashboard Pitfalls &amp; Diagnostic Fixes
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Troubleshooting Matrix
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Table Problem</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Operational Risk</th>
                  <th className="py-3 px-4">Diagnostic Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">Misleading Filtered Totals</td>
                  <td className="py-3 px-4">Using standard <code className="text-rose-300 font-mono">=SUM(...)</code> instead of <code className="text-emerald-300 font-mono">=SUBTOTAL(109, ...)</code>.</td>
                  <td className="py-3 px-4 text-rose-400 font-semibold">Hidden filtered rows are erroneously included in totals.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Use SUBTOTAL with code 109 to ignore hidden rows.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">Broken Static References</td>
                  <td className="py-3 px-4">Using static cell addresses (<code className="text-amber-300 font-mono">E2*0.18</code>) inside calculated columns.</td>
                  <td className="py-3 px-4 text-amber-400 font-semibold">Formulas corrupt when table rows are sorted.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Always use structured [@ColumnName] syntax.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">Auto-Expansion Failure</td>
                  <td className="py-3 px-4">Blank rows or blank columns separating new entries from table.</td>
                  <td className="py-3 px-4 text-purple-400 font-semibold">New transactions are excluded from calculations.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Eliminate empty gap rows/columns before appending data.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">Greyed-Out Slicer Buttons</td>
                  <td className="py-3 px-4">Slicer displays disabled combinations with no active data.</td>
                  <td className="py-3 px-4 text-sky-400 font-semibold">Confuses leadership with non-clickable buttons.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Right-click Slicer &rarr; Slicer Settings &rarr; Check 'Hide items with no data'.</td>
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
              <span className="text-emerald-400">💡</span> Master Table Pro Tips &amp; Keyboard Accelerators
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Productivity Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-300 flex items-center gap-2">
                <span>⚡</span> Tip 1: Toggle Total Row via Ctrl + Shift + T
              </div>
              <p className="text-slate-300 leading-relaxed">
                Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-xs">Ctrl + Shift + T</kbd> to instantly toggle the table Total Row on or off without navigating to the ribbon.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-sky-300 flex items-center gap-2">
                <span>⚡</span> Tip 2: Clear All Filters via Alt + A + C
              </div>
              <p className="text-slate-300 leading-relaxed">
                Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-xs">Alt + A + C</kbd> to reset all active column filters across the entire table simultaneously.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span>⚡</span> Tip 3: Multi-Column Slicer Ribbons
              </div>
              <p className="text-slate-300 leading-relaxed">
                Format slicers with 4 or 5 columns on the Slicer ribbon tab to convert vertical button stacks into sleek horizontal dashboard toolbars.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> Tip 4: 1-Click Column Selection
              </div>
              <p className="text-slate-300 leading-relaxed">
                Hover your cursor over the top edge of any table column header until it turns into a black downward arrow &rarr; Click once to select all data cells in that column.
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
                <span className="text-emerald-400">💭</span> Question 1: How does structured syntax eliminate formula maintenance debt?
              </h3>
              <p className="leading-relaxed">
                Why does writing <code className="text-slate-300 font-mono">[@Gross] - [@Tax]</code> protect your spreadsheet model from breaking when coworkers insert new columns compared to static <code className="text-slate-300 font-mono">F2 - G2</code> formulas?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">💭</span> Question 2: Why are Slicers far superior to dropdown filter arrows for executive presentations?
              </h3>
              <p className="leading-relaxed">
                How does displaying active filter states clearly on prominent colored buttons reduce confusion during live executive meetings?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 3: What happens when an Excel Table connects to downstream PivotTables or Power Query?
              </h3>
              <p className="leading-relaxed">
                How does using named table objects establish the foundational architecture for enterprise business intelligence pipelines?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 7: Dynamic Table Dashboard Studio FAQ"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Structured Tables are the unsung heroes of Excel. The moment you press Ctrl + T, you transform a fragile grid of numbers into a robust relational database. Always name your tables, write self-documenting [@Column] formulas, and connect horizontal slicers. When your data structure is clean and dynamic, every chart, pivot table, and formula built on top becomes indestructible."
            }
          />
        </div>
      </div>
    </div>
  );
}
