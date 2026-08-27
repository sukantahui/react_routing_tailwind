"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/basic_charts.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic6() {
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
    link.download = "basic_charts_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-sky-500/30 selection:text-sky-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              📊 Charts & Dashboards · Topic 6
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 3 & 4: Apply & Analyze
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Comprehensive Laboratory Practice Session: Chart Creation, Customization and Executive Dashboard Construction
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Hands-on capstone laboratory practice for Module 1.4: Build an end-to-end multi-widget executive sales dashboard combining Top KPI metric cards, Clustered Target vs Actual column chart, 12-Month Revenue &amp; Margin dual-axis combo line chart, and a 4-Slice Doughnut cost allocation chart.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Visual Storytelling:</strong> 3-Second Rule Insight</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Dual-Axis Combos:</strong> Volume + Margin Lines</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Dark Aesthetics:</strong> Coder & AccoTax Styling</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">⚡</span>
            Chart Anatomy & Structural Specification
          </h2>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            =BUILD_EXECUTIVE_DASHBOARD(Dataset, KPIs, Charts)
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Component</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Lab Scope</td>
                  <td className="py-3 px-4 text-teal-400">Full Dashboard Build</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Mandatory</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Construct a complete 3-tier visual dashboard from raw multi-branch sales data.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Widgets Included</td>
                  <td className="py-3 px-4 text-teal-400">Multi-Chart Stack</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Practical</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">3 KPI Cards + Clustered Column + Dual-Axis Combo Line + Category Doughnut.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Ergonomic Finish</td>
                  <td className="py-3 px-4 text-teal-400">Grid Snapping &amp; Polish</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Mandatory</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Snap all widgets cleanly to grid (Alt+Drag), remove gridlines, apply dark theme.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Visual Output: </strong>
              Renders a high-contrast <span className="text-sky-300 font-semibold">Complete Integrated Visual Dashboard</span> optimized for executive review.
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">🔬</span>
            Visual Perception & Cognitive Mechanics
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>An executive dashboard synthesizes complex multidimensional data into an intuitive, single-page visual command center.</p>
            <p>The layout must flow logically: 1. Strategic Summary (Top KPIs), 2. Operational Comparison (Middle Charts), 3. Diagnostic Breakdown (Bottom Detail).</p>
            <p>Always hide worksheet gridlines (View &amp;rarr; uncheck Gridlines) when presenting executive dashboards for a clean app-like interface.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">Tufte Data-to-Ink Ratio</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Eliminate decorative borders, 3D shadows, and heavy gridlines so that 95%+ of pixel ink communicates pure data.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">Intentional Accent Coloring</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Keep contextual comparison series in subtle Slate Grey and apply vibrant Sky Blue only to your key focal series.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-base font-mono">📐</span>
            Visual Encoding Architecture: Module 1.4 Capstone: Complete Multi-Widget Executive Dashboard
          </h2>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-x-auto">
            <svg viewBox="0 0 800 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="m4_input" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m4_chart" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m4_dash" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <rect x="30" y="50" width="200" height="150" rx="12" fill="url(#m4_input)" stroke="#38bdf8" strokeWidth="2" />
              <text x="130" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">1. Data Aggregation</text>
              <text x="130" y="115" textAnchor="middle" fill="#e0f2fe" fontSize="11">Categorical Totals</text>
              <text x="130" y="135" textAnchor="middle" fill="#e0f2fe" fontSize="11">12-Month Time-Series</text>
              <text x="130" y="165" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">Clean Normalized Rows</text>

              <path d="M 235 125 L 295 125" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="295,120 305,125 295,130" fill="#38bdf8" />

              <rect x="310" y="50" width="200" height="150" rx="12" fill="url(#m4_chart)" stroke="#34d399" strokeWidth="2" />
              <text x="410" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">2. Visual Encoding</text>
              <text x="410" y="115" textAnchor="middle" fill="#d1fae5" fontSize="11">Clustered Column</text>
              <text x="410" y="135" textAnchor="middle" fill="#d1fae5" fontSize="11">Dual-Axis Combo Line</text>
              <text x="410" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Doughnut Proportions</text>

              <path d="M 515 125 L 575 125" stroke="#34d399" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="575,120 585,125 575,130" fill="#34d399" />

              <rect x="590" y="50" width="180" height="150" rx="12" fill="url(#m4_dash)" stroke="#a78bfa" strokeWidth="2" />
              <text x="680" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">3. Executive Dashboard</text>
              <text x="680" y="115" textAnchor="middle" fill="#ede9fe" fontSize="11">Top KPI Callouts</text>
              <text x="680" y="135" textAnchor="middle" fill="#ede9fe" fontSize="11">Alt+Drag Grid Snapping</text>
              <text x="680" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="11" fontWeight="bold">3-Second Insight</text>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LIVE EXCEL PRACTICE GRID & DOWNLOAD PORTAL
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">📥</span>
                Interactive Spreadsheet & Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Interact with the dataset live below or download the master chapter workbook to practice locally in desktop Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download full .xlsx master workbook for Module 1.4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic1_Column_Bar"
            title="Module 1.4 - Comprehensive Laboratory Practice Session: Chart Creation, Customization and Executive Dashboard Construction"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS (4+ CASES)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
            Real-World Business Scenarios (Bengal & Corporate Applications)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">01</span>
                <h3 className="text-base font-bold text-white">Kolkata Enterprise 50-Row Multi-Branch Executive Dashboard</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Students build a complete single-page interactive dashboard for corporate executives.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Dashboard_Component</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Visual_Widget</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Data_Source</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Key_Takeaway</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Top Row</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">3 KPI Cards (Revenue, Profit, Margin %)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Summary Formulas</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 1.48 Cr Revenue (+18% YoY)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Middle Left</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Target vs Actual Clustered Column</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">8 Branch Sales</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Barrackpore &amp; Shyamnagar exceeded target</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Middle Right</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Dual-Axis Revenue &amp; Margin Line</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">12-Month Trend</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Margin expanded from 18% to 26% in H2</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Bottom Left</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Expense Breakdown Doughnut</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">4 Cost Centers</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Raw materials accounted for 55% of total budget</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Complete Module 1.4 Visualization Stack</div>
                <div className="text-emerald-400 font-semibold">Result: Boardroom-ready interactive dashboard delivered in 10 minutes.</div>
                <div className="text-slate-400 text-[11px]">Combining multiple chart types provides a 360-degree view of business health.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Barrackpore Academy Academic Performance Dashboard</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Visualizing subject score distributions, cohort pass rates, and subject rankings.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Widget</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Chart_Type</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Metric</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Subject Ranking</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sorted Horizontal Bar</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Average score per subject</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Attendance vs Score</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Scatter / Bubble Chart</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Correlation between attendance and exam results</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Academic Visual Dashboard</div>
                <div className="text-emerald-400 font-semibold">Result: Clear visual insights for faculty and student mentoring.</div>
                <div className="text-slate-400 text-[11px]">Visual analytics identify struggling student cohorts rapidly.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Regional Retail Slicer-Driven Interactive Filter</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Connecting a PivotChart to Slicers for 1-click regional filtering.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Filter_Action</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Connected_Charts</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Response_Time</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Click 'Barrackpore' Slicer</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">All 3 dashboard charts update instantly</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">&lt; 0.1 second</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Slicer-Connected PivotCharts</div>
                <div className="text-emerald-400 font-semibold">Result: Interactive filtering without writing macros or VBA.</div>
                <div className="text-slate-400 text-[11px]">Slicers turn static charts into dynamic interactive applications.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Ichapur Plant ISO 9001 Quality Audit Executive Presentation</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Packaging manufacturing quality metrics into an audited compliance dashboard.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Audit_Parameter</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Visual_Representation</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Status</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Defect PPM Trend</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Line Chart with Upper Control Limit</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Within 6-Sigma Bounds</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Scrap Reduction</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Waterflow / Waterfall Chart</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 12 Lakhs Saved</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Quality Assurance Compliance Dashboard</div>
                <div className="text-emerald-400 font-semibold">Result: ISO 9001 certification renewal approved without audit observations.</div>
                <div className="text-slate-400 text-[11px]">Visual compliance reporting proves rigorous quality control.</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">🪜</span>
            Step-by-Step Practical Implementation Guide
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <h3 className="text-sm font-bold text-white">Select Clean Summarized Data Range</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Highlight category labels and values. Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Alt + F1</kbd> to generate default 2D Column Chart.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <h3 className="text-sm font-bold text-white">Optimize Gap Width & Remove Clutter</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Right-click columns &rarr; Format Data Series &rarr; Set <strong>Gap Width to 75%</strong>. Select horizontal gridlines and press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Delete</kbd>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <h3 className="text-sm font-bold text-white">Link Dynamic Title & Format Callouts</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Click chart title, type <code className="text-sky-300 font-mono">=</code> in formula bar, click cell <code className="text-amber-300 font-mono">E1</code>, and press Enter.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <h3 className="text-sm font-bold text-white">Snap to Grid & Hide Sheet Gridlines</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Hold <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Alt</kbd> while dragging chart corners to snap cleanly to cell borders. Go to View &rarr; uncheck Gridlines.
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
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 text-base font-mono">⚠️</span>
            Common Pitfalls & Diagnostic Troubleshooting
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Error / Symptom</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Check</th>
                  <th className="py-3 px-4">Foolproof Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Dashboard Exceeds Single Screen Viewport</td>
                  <td className="py-3 px-4 text-slate-300">Sprawling 10 charts across 2,000 vertical pixels.</td>
                  <td className="py-3 px-4 text-amber-300">Executive has to scroll up and down repeatedly to connect insights.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Design within a single 1920x1080 viewport using 3-4 tightly aligned widgets.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Leaving Default Sheet Gridlines Visible</td>
                  <td className="py-3 px-4 text-slate-300">Leaving Excel's grey gridlines on behind dark-styled charts.</td>
                  <td className="py-3 px-4 text-amber-300">Dashboard looks cluttered and amateurish.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Go to View Tab &amp;rarr; Uncheck 'Gridlines' for a clean canvas.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Misaligned Widget Boundaries</td>
                  <td className="py-3 px-4 text-slate-300">Dragging chart borders manually without grid snapping.</td>
                  <td className="py-3 px-4 text-amber-300">Charts are unevenly spaced with jagged ragged margins.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Hold Alt while dragging chart borders to snap them cleanly to cell boundaries.</td>
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
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-base font-mono">💡</span>
            Classroom Pro Tips & High-Speed Shortcuts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + W + V + G
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Toggle Worksheet Gridlines off for clean canvas presentation.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + Drag Chart Border
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Snap chart edges perfectly to underlying cell grid.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                F11
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Move chart to full-screen dedicated Chart Sheet.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + P
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Print preview to verify 1-page landscape dashboard layout.</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS ("THINK ABOUT...")
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">🤔</span>
            Socratic Analytical Hints ("Think About...")
          </h2>

          <div className="space-y-3">
            
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is unchecking View &amp;rarr; Gridlines the single easiest way to make an Excel dashboard look like a custom software application?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does the Alt+Drag snapping shortcut guarantee pixel-perfect alignment across multiple chart widgets?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">What is the operational advantage of designing an executive dashboard to fit within a single screen without scrolling?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Comprehensive Laboratory Practice Session: Chart Creation, Customization and Executive Dashboard Construction - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Congratulations on completing Module 1.4: Basic Charts and Visualizations! You have mastered the complete visualization pipeline: selecting the right chart, building clustered columns, dual-axis trends, clean doughnuts, and packaging them into stunning executive dashboards with Coder & AccoTax dark styling. You have now completed all 4 foundational modules of Segment 1!"
          />
        </div>
      </div>
    </div>
  );
}
