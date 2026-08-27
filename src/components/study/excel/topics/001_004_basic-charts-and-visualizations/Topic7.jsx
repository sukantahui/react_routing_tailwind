"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/basic_charts.xlsx?url";
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
              📊 Module 1.4 · Topic 7
            </span>
            <span className="px-3 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-300 text-xs font-semibold">
              Practical Chart Pack Studio
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300 text-xs font-semibold">
              Bloom's Level 5: Synthesize
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Practice Session: Creating a Business Performance Chart Pack
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In executive reporting, standalone single charts rarely tell the whole story. A <strong>Business Performance Chart Pack</strong> consolidates four essential analytical viewpoints—categorical rankings, multi-year trajectories, budget proportions, and in-cell trend sparklines—into a harmonious, executive-ready dashboard.
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>4-Visual Suite:</strong> Column, Combo, Doughnut &amp; Sparklines</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Visual Harmony:</strong> Cohesive palettes &amp; magnetic grid snapping</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Zero Chart Junk:</strong> Maximized data-ink ratio for C-suite clarity</span>
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
              <span className="text-sky-400">⚡</span> Executive Chart Pack Architectural Blueprint
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Visual Composition Matrix
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Visual Component</th>
                  <th className="py-3 px-4">Chart Archetype</th>
                  <th className="py-3 px-4">Primary Metric Encoded</th>
                  <th className="py-3 px-4">Design Rules &amp; Best Practices</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">1. Regional Comparison</td>
                  <td className="py-3 px-4 font-mono text-purple-300">Clustered Column</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Target vs Actual (INR)</td>
                  <td className="py-3 px-4">Zero baseline, 150% gap width, distinct actual/target fill contrast.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-teal-300">2. Trend &amp; Efficiency</td>
                  <td className="py-3 px-4 font-mono text-purple-300">Combo (Line + Column)</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Revenue vs Margin %</td>
                  <td className="py-3 px-4">Assign Margin % to Secondary Axis; smooth line curves.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">3. Budget Share</td>
                  <td className="py-3 px-4 font-mono text-purple-300">Doughnut Chart</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Cost Centre % Share</td>
                  <td className="py-3 px-4">Maximum 5 slices; 65% hole size; direct percentage data callouts.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-indigo-300">4. Micro Trajectory</td>
                  <td className="py-3 px-4 font-mono text-purple-300">Line Sparklines</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">12-Month Quarterly Run</td>
                  <td className="py-3 px-4">Embedded in summary table cells; highlight High/Low markers.</td>
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
              <span className="text-teal-400">🔬</span> The 4 Pillars of High-Impact Chart Pack Design
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Information Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-sky-300 text-base flex items-center gap-2">
                <span>1.</span> Visual Hierarchy &amp; Scanning Flow
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Executives read dashboards top-to-bottom and left-to-right (the "F-pattern"). Position critical aggregated KPI numbers at the top-left, follow with categorical rankings, and place granular trend details at the bottom.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-teal-300 text-base flex items-center gap-2">
                <span>2.</span> Monochromatic Foundations with Accent Alerts
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Avoid rainbow themes. Build the foundation using muted slate navies (<code className="text-slate-300 font-mono">#1E293B</code>) for baseline context, and reserve vibrant emerald (<code className="text-emerald-400 font-mono">#10B981</code>) and crimson (<code className="text-rose-400 font-mono">#F43F5E</code>) exclusively for positive/negative variance callouts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-indigo-300 text-base flex items-center gap-2">
                <span>3.</span> Dynamic Title Cell Referencing
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Never hardcode static chart titles. Linking chart title elements directly to formula cells (e.g. <code className="text-indigo-300 font-mono">="FY2026 " &amp; B2 &amp; " Sales Performance"</code>) ensures the visuals dynamically adapt whenever the user changes a slicer or filter.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-purple-300 text-base flex items-center gap-2">
                <span>4.</span> Magnetic Grid Snapping &amp; Container Grouping
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Holding the <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Alt</kbd> key while resizing snaps chart corners magnetically to spreadsheet cell borders. Grouping all visuals with <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Ctrl + G</kbd> locks the entire layout in place.
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
              <span className="text-indigo-400">📐</span> Executive Performance Chart Pack Layout Architecture
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              Dashboard Canvas
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg
              viewBox="0 0 880 360"
              className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans"
            >
              <defs>
                <linearGradient id="cpGradCard" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
                <linearGradient id="cpGradBar" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="cpGradTarget" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
              </defs>

              {/* Top Banner: KPI Cards */}
              <g transform="translate(20, 20)">
                <rect width="260" height="60" rx="10" fill="url(#cpGradCard)" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="130" y="26" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">TOTAL REVENUE (FY26)</text>
                <text x="130" y="48" textAnchor="middle" fill="#38bdf8" fontSize="18" fontWeight="extrabold">₹ 4.82 Crore</text>
              </g>

              <g transform="translate(310, 20)">
                <rect width="260" height="60" rx="10" fill="url(#cpGradCard)" stroke="#34d399" strokeWidth="1.5" />
                <text x="130" y="26" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">YOY GROWTH RATE</text>
                <text x="130" y="48" textAnchor="middle" fill="#34d399" fontSize="18" fontWeight="extrabold">+ 18.4% YoY</text>
              </g>

              <g transform="translate(600, 20)">
                <rect width="260" height="60" rx="10" fill="url(#cpGradCard)" stroke="#a855f7" strokeWidth="1.5" />
                <text x="130" y="26" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">OPERATING MARGIN</text>
                <text x="130" y="48" textAnchor="middle" fill="#c084fc" fontSize="18" fontWeight="extrabold">24.6% Margin</text>
              </g>

              {/* Visual 1: Clustered Column (Target vs Actual) */}
              <g transform="translate(20, 100)">
                <rect width="410" height="230" rx="12" fill="url(#cpGradCard)" stroke="#334155" strokeWidth="1" />
                <text x="20" y="30" fill="#38bdf8" fontWeight="bold" fontSize="13">Regional Target vs Actual Sales (INR Lakhs)</text>
                
                {/* Columns */}
                {/* Barrackpore */}
                <rect x="50" y="100" width="22" height="90" rx="3" fill="url(#cpGradTarget)" />
                <rect x="76" y="80" width="22" height="110" rx="3" fill="url(#cpGradBar)" />
                <text x="74" y="208" textAnchor="middle" fill="#94a3b8" fontSize="10">BKP</text>

                {/* Shyamnagar */}
                <rect x="130" y="110" width="22" height="80" rx="3" fill="url(#cpGradTarget)" />
                <rect x="156" y="95" width="22" height="95" rx="3" fill="url(#cpGradBar)" />
                <text x="154" y="208" textAnchor="middle" fill="#94a3b8" fontSize="10">SHY</text>

                {/* Ichapur */}
                <rect x="210" y="120" width="22" height="70" rx="3" fill="url(#cpGradTarget)" />
                <rect x="236" y="105" width="22" height="85" rx="3" fill="url(#cpGradBar)" />
                <text x="234" y="208" textAnchor="middle" fill="#94a3b8" fontSize="10">ICH</text>

                {/* Naihati */}
                <rect x="290" y="130" width="22" height="60" rx="3" fill="url(#cpGradTarget)" />
                <rect x="316" y="115" width="22" height="75" rx="3" fill="url(#cpGradBar)" />
                <text x="314" y="208" textAnchor="middle" fill="#94a3b8" fontSize="10">NAI</text>

                {/* Legend */}
                <rect x="250" y="18" width="12" height="10" fill="#64748b" rx="2" />
                <text x="268" y="27" fill="#94a3b8" fontSize="10">Target</text>
                <rect x="320" y="18" width="12" height="10" fill="#0284c7" rx="2" />
                <text x="338" y="27" fill="#38bdf8" fontSize="10">Actual</text>
              </g>

              {/* Visual 2: Doughnut & Micro-Trend */}
              <g transform="translate(450, 100)">
                <rect width="410" height="230" rx="12" fill="url(#cpGradCard)" stroke="#334155" strokeWidth="1" />
                <text x="20" y="30" fill="#34d399" fontWeight="bold" fontSize="13">Budget Share &amp; Quarterly Momentum</text>

                {/* Doughnut representation */}
                <circle cx="110" cy="130" r="55" fill="none" stroke="#0284c7" strokeWidth="22" strokeDasharray="140 345" />
                <circle cx="110" cy="130" r="55" fill="none" stroke="#34d399" strokeWidth="22" strokeDasharray="90 345" strokeDashoffset="-140" />
                <circle cx="110" cy="130" r="55" fill="none" stroke="#a855f7" strokeWidth="22" strokeDasharray="70 345" strokeDashoffset="-230" />
                <circle cx="110" cy="130" r="55" fill="none" stroke="#f59e0b" strokeWidth="22" strokeDasharray="45 345" strokeDashoffset="-300" />
                <text x="110" y="135" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">OpEx</text>

                {/* In-Cell Sparklines Table Representation */}
                <g transform="translate(210, 60)">
                  <text x="0" y="15" fill="#94a3b8" fontSize="11" fontWeight="bold">Branch</text>
                  <text x="80" y="15" fill="#94a3b8" fontSize="11" fontWeight="bold">12-Mo Trend</text>
                  <text x="160" y="15" fill="#94a3b8" fontSize="11" fontWeight="bold">KPI</text>

                  {/* Row 1 */}
                  <text x="0" y="40" fill="#e2e8f0" fontSize="11">Barrackpore</text>
                  <polyline points="80,38 95,33 110,36 125,28 140,24" fill="none" stroke="#38bdf8" strokeWidth="2" />
                  <text x="160" y="40" fill="#34d399" fontSize="11" fontWeight="bold">98%</text>

                  {/* Row 2 */}
                  <text x="0" y="70" fill="#e2e8f0" fontSize="11">Shyamnagar</text>
                  <polyline points="80,68 95,65 110,60 125,64 140,55" fill="none" stroke="#34d399" strokeWidth="2" />
                  <text x="160" y="70" fill="#34d399" fontSize="11" fontWeight="bold">92%</text>

                  {/* Row 3 */}
                  <text x="0" y="100" fill="#e2e8f0" fontSize="11">Ichapur</text>
                  <polyline points="80,95 95,98 110,92 125,90 140,84" fill="none" stroke="#a855f7" strokeWidth="2" />
                  <text x="160" y="100" fill="#38bdf8" fontSize="11" fontWeight="bold">88%</text>

                  {/* Row 4 */}
                  <text x="0" y="130" fill="#e2e8f0" fontSize="11">Naihati</text>
                  <polyline points="80,128 95,124 110,126 125,118 140,112" fill="none" stroke="#f59e0b" strokeWidth="2" />
                  <text x="160" y="130" fill="#f59e0b" fontSize="11" fontWeight="bold">84%</text>
                </g>
              </g>
            </svg>
          </div>
          <p className="text-xs text-slate-400 text-center italic">
            Figure 7.1: Executive Performance Chart Pack Canvas. The layout couples high-level scalar KPI cards with categorical comparisons, budget composition, and in-cell trend sparklines.
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
                Explore the business chart pack dataset below or download the workbook to build your interactive visuals directly in Microsoft Excel.
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
            sheetName="Topic7_Chart_Pack_Practice"
            title="Corporate Business Chart Pack Practice Dataset (Product Line, Branch, FY25 Units, FY26 Units, YoY Growth %, Target Met)"
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
              Corporate Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Scenario 1 · Executive Operations Pack</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Swadeep Banerjee: Branch Operations Dashboard
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Lead <strong>Swadeep Banerjee</strong> builds a 4-visual chart pack comparing target vs actual revenue across 8 regional branches. By setting a uniform 150% bar gap width and linking the header to cell <code className="text-sky-300 font-mono">B2</code>, regional leadership reviews monthly performance in seconds.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-sky-300">
                Formula: ='Topic7_Chart_Pack_Practice'!$A$1 &amp; " - Operational Review"
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Scenario 2 · Manufacturing Yield &amp; Scrap</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Plant</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Tuhina Mukherjee: Dual-Axis Plant Efficiency
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Production Engineer <strong>Tuhina Mukherjee</strong> tracks monthly steel tonnage alongside defect scrap rate. Using a combo chart with tonnage on the primary column axis and scrap % on a secondary smooth line axis, she identifies furnace overheating trends instantly.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Visual: Combo (Tonnage: Clustered Column | Scrap %: Secondary Line)
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Scenario 3 · Cost Centre Allocation</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Abhronila Das: Budget Share Doughnut
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Abhronila Das</strong> replaces a cluttered 12-slice pie chart with a clean 5-slice doughnut chart featuring direct percentage callouts and a central "Total Budget" summary label, achieving 100% executive sign-off.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Visual: Doughnut (Hole Size: 65% | Direct Labels: Value &amp; %)
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Scenario 4 · Fleet Logistics &amp; Fuel Run</span>
                <span className="text-xs font-mono text-slate-400">Naihati Logistics</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Debangshu Roy: Fleet Micro-Trend Sparklines
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Logistics Manager <strong>Debangshu Roy</strong> embeds line sparklines directly inside a 35-row fleet maintenance table. Highlighting the peak fuel consumption marker in red allows dispatchers to detect vehicle engine deterioration proactively.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Sparkline: Line Sparklines with High/Low Points Enabled
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
              <span className="text-sky-400">🛠️</span> Step-by-Step Chart Pack Construction Protocol
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Workshop Guide
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-sky-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center text-xs">1</span>
                Step 1: Format Base Tables as Structured Excel Tables (Ctrl + T)
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Click inside your dataset and press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Ctrl + T</kbd>. Converting ranges to structured tables ensures all newly added records automatically expand connected charts.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-teal-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-950 border border-teal-700 text-teal-300 flex items-center justify-center text-xs">2</span>
                Step 2: Generate Core Visuals &amp; Configure Secondary Axes
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Select your category and metric columns. Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Alt + F1</kbd> to insert default charts. For mixed scales, change the chart type to <strong>Combo Chart</strong> and check the Secondary Axis box for percentage metrics.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-indigo-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center text-xs">3</span>
                Step 3: Magnetic Snapping &amp; Multi-Object Grouping
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Hold the <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Alt</kbd> key while dragging chart borders to snap them perfectly to grid cell lines. Select all 4 charts, go to <strong>Shape Format &rarr; Group</strong> to lock the pack into a single unified visual unit.
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
              <span className="text-rose-400">⚠️</span> Common Chart Pack Pitfalls &amp; Diagnostic Fixes
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Troubleshooting Matrix
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Chart Error / Bug</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Executive Impact</th>
                  <th className="py-3 px-4">Step-by-Step Resolution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">Floating Truncated Axis</td>
                  <td className="py-3 px-4">Excel automatically sets minimum axis bound above zero (e.g. 50,000).</td>
                  <td className="py-3 px-4 text-rose-400 font-semibold">Exaggerates minor differences misleadingly.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Right-click Axis &rarr; Format Axis &rarr; Set Bounds Minimum = 0.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">Invisible Secondary Series</td>
                  <td className="py-3 px-4">Plotting small percentages on the primary large-currency axis.</td>
                  <td className="py-3 px-4 text-amber-400 font-semibold">Percentages appear as flat lines at zero.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Change Chart Type &rarr; Combo &rarr; Check Secondary Axis.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">Overcrowded Pie Slices</td>
                  <td className="py-3 px-4">Attempting to plot &gt; 6 categorical slices in a single pie.</td>
                  <td className="py-3 px-4 text-purple-400 font-semibold">Labels overlap; slice comparisons become impossible.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Switch to a Bar chart or aggregate smaller slices into 'Other'.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">Chart Overlap on Print</td>
                  <td className="py-3 px-4">Chart property set to 'Do not move or size with cells'.</td>
                  <td className="py-3 px-4 text-sky-400 font-semibold">Visuals drift and overlap during PDF export.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Format Chart Area &rarr; Size &amp; Properties &rarr; Move &amp; size with cells.</td>
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
              <span className="text-purple-400">💡</span> Master Charting Pro Tips &amp; Keyboard Accelerators
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Productivity Tips
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-sky-300 flex items-center gap-2">
                <span>⚡</span> Tip 1: Instant Chart Generation via Alt + F1
              </div>
              <p className="text-slate-300 leading-relaxed">
                Select your table data and press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Alt + F1</kbd> to insert an embedded column chart in 10 milliseconds, or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">F11</kbd> for a dedicated chart sheet.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span>⚡</span> Tip 2: Copy Chart Formats via Paste Special
              </div>
              <p className="text-slate-300 leading-relaxed">
                Format one chart perfectly &rarr; Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Ctrl + C</kbd> &rarr; Select another chart &rarr; Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Alt + E + S</kbd> &rarr; Select <strong>Formats</strong> &rarr; Enter.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-indigo-300 flex items-center gap-2">
                <span>⚡</span> Tip 3: Direct Data Label Callouts
              </div>
              <p className="text-slate-300 leading-relaxed">
                Delete floating legend boxes on line charts and add data labels directly to the final data point. This cuts reading time in half by eliminating eye-tracking fatigue.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> Tip 4: Magnetic Grid Alignment via Alt Drag
              </div>
              <p className="text-slate-300 leading-relaxed">
                Hold <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Alt</kbd> while dragging chart bounding boxes. The edges will magnetically snap to row and column boundaries, producing pixel-perfect dashboards.
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
              Visual Reflection
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">💭</span> Question 1: How does color restraint elevate executive credibility?
              </h3>
              <p className="leading-relaxed">
                Why does using a single accent color for significant variances communicate authority far more effectively than using 6 rainbow colors across random categorical bars?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 2: Why are bar charts superior to pie charts for comparing 8 branch locations?
              </h3>
              <p className="leading-relaxed">
                How does human spatial perception compare linear length along a shared baseline versus estimating subtle angular slice differences in a circular pie?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-indigo-400">💭</span> Question 3: What happens when you combine in-cell sparklines with top-level KPI cards?
              </h3>
              <p className="leading-relaxed">
                How does pairing aggregated scalar numbers with micro-visual sparkline trajectories give stakeholders both high-level summaries and granular historical context simultaneously?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 7: Business Performance Chart Pack Studio FAQ"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "A brilliant chart pack does not distract with 3D tilts or neon colors; it informs with quiet, effortless precision. Always anchor your bar charts at zero, align your visual containers magnetically with the Alt key, and ensure that every visual directly answers a specific business question. When leadership can digest your entire operational health in under ten seconds, you have mastered executive storytelling."
            }
          />
        </div>
      </div>
    </div>
  );
}
