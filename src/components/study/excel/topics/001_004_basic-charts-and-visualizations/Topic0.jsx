"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_004_basic_charts_and_visualizations_master.xlsx?url";
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
              📊 Charts & Dashboards · Topic 0
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 & 3: Understand & Apply
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Chart Selection Guide: Matching Business Data Stories to Optimal Chart Types
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master the art and science of data visualization: Select the perfect chart type based on your analytical story (Comparison, Time-Series Trend, Part-to-Whole Composition, or Distribution). Avoid chart junk, 3D distortions, and misleading dual-axes.
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
            =CHART_RECOMMENDATION(DataType, AnalyticalGoal)
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Comparison Story</td>
                  <td className="py-3 px-4 text-teal-400">Column / Bar Chart</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Discrete</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Compares values across discrete categories (e.g. Sales across 8 branches).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Time-Series Story</td>
                  <td className="py-3 px-4 text-teal-400">Line / Area Chart</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Continuous</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Visualizes trends, seasonality, and trajectories over chronological time periods.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Part-to-Whole Story</td>
                  <td className="py-3 px-4 text-teal-400">Pie / Doughnut / Treemap</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Composition</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Displays percentage contribution to a 100% total (Max 5 slices).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Distribution Story</td>
                  <td className="py-3 px-4 text-teal-400">Histogram / Box-Plot</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Statistical</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Shows spread, frequency, skewness, and outliers across data points.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Visual Output: </strong>
              Renders a high-contrast <span className="text-sky-300 font-semibold">Optimized Visual Encoding Specification</span> optimized for executive review.
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
            <p>Visual perception research shows humans perceive lengths along a common axis (Bar/Column charts) with far greater precision than angles or areas (Pie charts).</p>
            <p>Edward Tufte's Data-to-Ink Ratio principle states that non-essential ink (clutter, 3D shadows, heavy gridlines) must be stripped to maximize data clarity.</p>
            <p>Never use 3D charts in business reports. Perspective distortion skews front slices, causing smaller values to appear visually larger than bigger values in the background.</p>
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
            SECTION 4: INTERACTIVE VISUAL CHARTS & CHART SELECTION SHOWCASE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">📊</span>
                Live Visual Chart Showcase: Matching Data Stories to Optimal Chart Types
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Visualizing Column, Line, Doughnut, and Ranked Bar charts with exact axes, data labels, and color encoding.
              </p>
            </div>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/80 px-3 py-1.5 rounded-full border border-sky-800 shrink-0 font-bold">
              Chart Selection Matrix
            </span>
          </div>

          {/* 4-CHART SHOWCASE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CHART 1: COLUMN CHART */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h3 className="text-xs font-bold text-sky-300">1. Vertical Column Chart</h3>
                <span className="text-[9px] font-mono text-sky-400 bg-sky-950 px-1.5 py-0.5 rounded">Discrete Comparison</span>
              </div>
              <p className="text-[11px] text-slate-400">Compares discrete categories side-by-side (e.g. Sales across 4 regional branches).</p>
              <svg viewBox="0 0 300 130" className="w-full h-auto bg-slate-900/80 rounded border border-slate-800/80 p-2">
                <line x1="30" y1="20" x2="280" y2="20" stroke="#334155" strokeDasharray="2 2" />
                <line x1="30" y1="60" x2="280" y2="60" stroke="#334155" strokeDasharray="2 2" />
                <line x1="30" y1="100" x2="280" y2="100" stroke="#475569" strokeWidth="1.5" />

                <rect x="45" y="50" width="30" height="50" rx="2" fill="#0284C7" />
                <text x="60" y="42" textAnchor="middle" fill="#38BDF8" fontSize="8" fontWeight="bold">₹14.5L</text>
                <text x="60" y="112" textAnchor="middle" fill="#94A3B8" fontSize="7">BKP</text>

                <rect x="105" y="25" width="30" height="75" rx="2" fill="#059669" />
                <text x="120" y="18" textAnchor="middle" fill="#34D399" fontSize="8" fontWeight="bold">₹21.0L</text>
                <text x="120" y="112" textAnchor="middle" fill="#94A3B8" fontSize="7">KOL</text>

                <rect x="165" y="40" width="30" height="60" rx="2" fill="#0284C7" />
                <text x="180" y="32" textAnchor="middle" fill="#38BDF8" fontSize="8" fontWeight="bold">₹17.5L</text>
                <text x="180" y="112" textAnchor="middle" fill="#94A3B8" fontSize="7">HWH</text>

                <rect x="225" y="65" width="30" height="35" rx="2" fill="#0284C7" />
                <text x="240" y="57" textAnchor="middle" fill="#38BDF8" fontSize="8" fontWeight="bold">₹12.0L</text>
                <text x="240" y="112" textAnchor="middle" fill="#94A3B8" fontSize="7">HGH</text>
              </svg>
            </div>

            {/* CHART 2: LINE CHART */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h3 className="text-xs font-bold text-emerald-300">2. Chronological Line Chart</h3>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">Time-Series Trend</span>
              </div>
              <p className="text-[11px] text-slate-400">Tracks continuous monthly revenue trends, seasonality, and slope trajectory over time.</p>
              <svg viewBox="0 0 300 130" className="w-full h-auto bg-slate-900/80 rounded border border-slate-800/80 p-2">
                <line x1="30" y1="20" x2="280" y2="20" stroke="#334155" strokeDasharray="2 2" />
                <line x1="30" y1="60" x2="280" y2="60" stroke="#334155" strokeDasharray="2 2" />
                <line x1="30" y1="100" x2="280" y2="100" stroke="#475569" strokeWidth="1.5" />

                <path d="M 45 85 L 105 70 L 165 40 L 225 25 L 265 15" fill="none" stroke="#34D399" strokeWidth="2.5" />
                <circle cx="45" cy="85" r="3" fill="#059669" stroke="#34D399" strokeWidth="1.5" />
                <circle cx="105" cy="70" r="3" fill="#059669" stroke="#34D399" strokeWidth="1.5" />
                <circle cx="165" cy="40" r="3" fill="#059669" stroke="#34D399" strokeWidth="1.5" />
                <circle cx="225" cy="25" r="3" fill="#059669" stroke="#34D399" strokeWidth="1.5" />
                <circle cx="265" cy="15" r="3" fill="#059669" stroke="#34D399" strokeWidth="1.5" />

                <text x="45" y="112" textAnchor="middle" fill="#94A3B8" fontSize="7">Jan</text>
                <text x="105" y="112" textAnchor="middle" fill="#94A3B8" fontSize="7">Feb</text>
                <text x="165" y="112" textAnchor="middle" fill="#94A3B8" fontSize="7">Mar</text>
                <text x="225" y="112" textAnchor="middle" fill="#94A3B8" fontSize="7">Apr</text>
                <text x="265" y="112" textAnchor="middle" fill="#94A3B8" fontSize="7">May</text>
              </svg>
            </div>

            {/* CHART 3: DOUGHNUT CHART */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h3 className="text-xs font-bold text-purple-300">3. Executive Doughnut Chart</h3>
                <span className="text-[9px] font-mono text-purple-400 bg-purple-950 px-1.5 py-0.5 rounded">Part-to-Whole 100%</span>
              </div>
              <p className="text-[11px] text-slate-400">Displays percentage contribution (Max 5 slices) with a central total metric callout.</p>
              <svg viewBox="0 0 300 130" className="w-full h-auto bg-slate-900/80 rounded border border-slate-800/80 p-2">
                <g transform="translate(110, 65)">
                  <path d="M 0 0 L 0 -45 A 45 45 0 0 1 42 16 Z" fill="#0284C7" stroke="#0F172A" />
                  <path d="M 0 0 L 42 16 A 45 45 0 0 1 -33 30 Z" fill="#059669" stroke="#0F172A" />
                  <path d="M 0 0 L -33 30 A 45 45 0 0 1 -42 -16 Z" fill="#7C3AED" stroke="#0F172A" />
                  <path d="M 0 0 L -42 -16 A 45 45 0 0 1 0 -45 Z" fill="#D97706" stroke="#0F172A" />
                  <circle cx="0" cy="0" r="25" fill="#0F172A" />
                  <text x="0" y="3" textAnchor="middle" fill="#34D399" fontSize="8" fontWeight="bold">100%</text>
                </g>
                <g transform="translate(180, 25)">
                  <rect x="0" y="5" width="8" height="8" fill="#0284C7" />
                  <text x="12" y="12" fill="#CBD5E1" fontSize="8">Enterprise (42%)</text>
                  <rect x="0" y="25" width="8" height="8" fill="#059669" />
                  <text x="12" y="32" fill="#CBD5E1" fontSize="8">Cloud Infra (28%)</text>
                  <rect x="0" y="45" width="8" height="8" fill="#7C3AED" />
                  <text x="12" y="52" fill="#CBD5E1" fontSize="8">Consulting (18%)</text>
                  <rect x="0" y="65" width="8" height="8" fill="#D97706" />
                  <text x="12" y="72" fill="#CBD5E1" fontSize="8">Support (12%)</text>
                </g>
              </svg>
            </div>

            {/* CHART 4: HORIZONTAL BAR CHART */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h3 className="text-xs font-bold text-amber-300">4. Ranked Horizontal Bar Chart</h3>
                <span className="text-[9px] font-mono text-amber-400 bg-amber-950 px-1.5 py-0.5 rounded">Leaderboard Ranking</span>
              </div>
              <p className="text-[11px] text-slate-400">Best for long text category labels and top-to-bottom leaderboard rankings.</p>
              <svg viewBox="0 0 300 130" className="w-full h-auto bg-slate-900/80 rounded border border-slate-800/80 p-2">
                <text x="75" y="25" textAnchor="end" fill="#CBD5E1" fontSize="7">Software Dev</text>
                <rect x="85" y="16" width="160" height="12" rx="2" fill="#059669" />
                <text x="250" y="25" textAnchor="start" fill="#34D399" fontSize="7" fontWeight="bold">₹28.5L</text>

                <text x="75" y="50" textAnchor="end" fill="#CBD5E1" fontSize="7">Cloud Infra</text>
                <rect x="85" y="41" width="125" height="12" rx="2" fill="#0284C7" />
                <text x="215" y="50" textAnchor="start" fill="#38BDF8" fontSize="7" fontWeight="bold">₹22.0L</text>

                <text x="75" y="75" textAnchor="end" fill="#CBD5E1" fontSize="7">Consulting</text>
                <rect x="85" y="66" width="100" height="12" rx="2" fill="#0284C7" />
                <text x="190" y="75" textAnchor="start" fill="#38BDF8" fontSize="7" fontWeight="bold">₹18.5L</text>

                <text x="75" y="100" textAnchor="end" fill="#CBD5E1" fontSize="7">Tech Support</text>
                <rect x="85" y="91" width="65" height="12" rx="2" fill="#0284C7" />
                <text x="155" y="100" textAnchor="start" fill="#38BDF8" fontSize="7" fontWeight="bold">₹11.0L</text>
              </svg>
            </div>
          </div>

          {/* SUMMARY DECISION MATRIX */}
          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Chart Selection Golden Rule: </strong>
              Always match your visual chart choice to the core story of your data. Use <span className="text-sky-300 font-semibold">Column/Bar</span> for comparisons, <span className="text-emerald-300 font-semibold">Line/Area</span> for time-series trends, and <span className="text-purple-300 font-semibold">Doughnut</span> for part-to-whole composition.
            </div>
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
            fileUrl={sampleWorkbookUrl}
            defaultSheetName="Topic0"
            title="Module 1.4 - Chart Selection Guide: Matching Business Data Stories to Optimal Chart Types"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: 20 COMPREHENSIVE REAL-WORLD CHART SELECTION SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
                20 Real-World Business Scenarios: Chart Type Selection Matrix
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                20 comprehensive workplace data visualization scenarios across Bengal corporate, manufacturing, and financial domains.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/80 px-3 py-1.5 rounded-full border border-amber-800 shrink-0 font-bold">
              20 Real-World Examples
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                  <th className="py-3 px-3 w-16">ID</th>
                  <th className="py-3 px-3">Business Application</th>
                  <th className="py-3 px-3">Analytical Story</th>
                  <th className="py-3 px-3">Recommended Chart</th>
                  <th className="py-3 px-3">Key Design Rule</th>
                  <th className="py-3 px-3">Executive Insight Delivered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-101</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Barrackpore 8 Regional Branches Sales</td>
                  <td className="py-2.5 px-3 text-sky-300">Discrete Category Comparison</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Horizontal Bar Chart</td>
                  <td className="py-2.5 px-3 text-slate-300">Sort descending by sales value</td>
                  <td className="py-2.5 px-3 text-slate-300">Instant leaderboard ranking without slanted text.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-102</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kolkata HQ 36-Month Revenue Trajectory</td>
                  <td className="py-2.5 px-3 text-sky-300">Continuous Time-Series Trend</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">2D Line Chart + Markers</td>
                  <td className="py-2.5 px-3 text-slate-300">Highlight peak points in green</td>
                  <td className="py-2.5 px-3 text-slate-300">Reveals Q3 annual festive revenue acceleration.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-103</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Shyamnagar Plant 4 Cost Components</td>
                  <td className="py-2.5 px-3 text-sky-300">Part-to-Whole Composition</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Executive Doughnut Chart</td>
                  <td className="py-2.5 px-3 text-slate-300">Center KPI callout "₹85.4L Total"</td>
                  <td className="py-2.5 px-3 text-slate-300">Raw materials account for 55% of operating budget.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-104</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Ichapur Steel Quality (500 Batches)</td>
                  <td className="py-2.5 px-3 text-sky-300">Frequency Distribution</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Statistical Histogram</td>
                  <td className="py-2.5 px-3 text-slate-300">Bin width set to 10 MPa</td>
                  <td className="py-2.5 px-3 text-slate-300">Normal bell curve distribution verified for ISO audit.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-105</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Naihati Logistics Latency vs Volume</td>
                  <td className="py-2.5 px-3 text-sky-300">Metric Correlation</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">XY Scatter Plot</td>
                  <td className="py-2.5 px-3 text-slate-300">Add linear trendline overlay</td>
                  <td className="py-2.5 px-3 text-slate-300">Proves shipment volume over 5K units increases delay.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-106</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Titagarh Paper Production vs Scrap %</td>
                  <td className="py-2.5 px-3 text-sky-300">Dual Metric Scale</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Dual-Axis Combo Chart</td>
                  <td className="py-2.5 px-3 text-slate-300">Left: Tons (Bars), Right: Scrap % (Line)</td>
                  <td className="py-2.5 px-3 text-slate-300">Highlights scrap rate drop as output volume increases.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-107</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Hooghly IT Dept Payroll Expenses</td>
                  <td className="py-2.5 px-3 text-sky-300">Discrete Ranking</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Horizontal Bar Chart</td>
                  <td className="py-2.5 px-3 text-slate-300">Anchor Y-axis at zero</td>
                  <td className="py-2.5 px-3 text-slate-300">Software development represents largest payroll expense.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-108</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Sodepur Retail Quarterly Share</td>
                  <td className="py-2.5 px-3 text-sky-300">Cumulative Volume Growth</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Stacked Area Chart</td>
                  <td className="py-2.5 px-3 text-slate-300">High-contrast solid fills</td>
                  <td className="py-2.5 px-3 text-slate-300">Software subscriptions driving overall revenue growth.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-109</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kanchrapara Defect Frequency</td>
                  <td className="py-2.5 px-3 text-sky-300">80/20 Pareto Prioritization</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Pareto Combo Chart</td>
                  <td className="py-2.5 px-3 text-slate-300">Descending bars + cumulative % line</td>
                  <td className="py-2.5 px-3 text-slate-300">2 defect types cause 78% of total rework hours.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-110</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Executive Income Statement Summary</td>
                  <td className="py-2.5 px-3 text-sky-300">Multi-Year Comparison</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Clustered Column Chart</td>
                  <td className="py-2.5 px-3 text-slate-300">Sky Blue focal accent for 2026</td>
                  <td className="py-2.5 px-3 text-slate-300">Revenue growth outpaces operating expense increases.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-111</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Howrah Fleet Fuel Consumption</td>
                  <td className="py-2.5 px-3 text-sky-300">Asset Efficiency Ranking</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Horizontal Bar Chart</td>
                  <td className="py-2.5 px-3 text-slate-300">Long vehicle registration labels</td>
                  <td className="py-2.5 px-3 text-slate-300">Identifies top 3 fuel-inefficient heavy trucks.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-112</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Corporate SaaS Subscription Tiers</td>
                  <td className="py-2.5 px-3 text-sky-300">Part-to-Whole (3 Slices)</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Executive Doughnut Chart</td>
                  <td className="py-2.5 px-3 text-slate-300">Center ARR text ₹45.2L</td>
                  <td className="py-2.5 px-3 text-slate-300">Enterprise plan generates 62% of annual ARR.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-113</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kolkata Port Container Turnover</td>
                  <td className="py-2.5 px-3 text-sky-300">Quarterly Seasonality</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">2D Line Chart</td>
                  <td className="py-2.5 px-3 text-slate-300">Highlight monsoon months</td>
                  <td className="py-2.5 px-3 text-slate-300">Monsoon month dip clearly visible to operations.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-114</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Financial Modeling Candidate Scores</td>
                  <td className="py-2.5 px-3 text-sky-300">Candidate Score Ranking</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Horizontal Bar Chart</td>
                  <td className="py-2.5 px-3 text-slate-300">Data labels inside bars</td>
                  <td className="py-2.5 px-3 text-slate-300">Top 10 candidates highlighted for final interview.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-115</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Textile Factory Yarn Waste by Shift</td>
                  <td className="py-2.5 px-3 text-sky-300">Categorical Shift Variance</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Clustered Column Chart</td>
                  <td className="py-2.5 px-3 text-slate-300">Muted gridlines (#334155)</td>
                  <td className="py-2.5 px-3 text-slate-300">Night shift exhibits 4.2% higher waste margin.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-116</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Pharma Lab Batch Yield Variances</td>
                  <td className="py-2.5 px-3 text-sky-300">Statistical Outlier Spread</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Box &amp; Whisker Plot</td>
                  <td className="py-2.5 px-3 text-slate-300">Show inner quartile markers</td>
                  <td className="py-2.5 px-3 text-slate-300">Identifies 3 outlier batches exceeding threshold.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-117</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Student Enrolment by Campus Track</td>
                  <td className="py-2.5 px-3 text-sky-300">Composition by Campus</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">100% Stacked Bar Chart</td>
                  <td className="py-2.5 px-3 text-slate-300">Normalized percentage scale</td>
                  <td className="py-2.5 px-3 text-slate-300">Barrackpore leads in Full Stack Engineering tracks.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-118</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Power Plant Turbine Telemetry</td>
                  <td className="py-2.5 px-3 text-sky-300">Real-Time Metric Stream</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Line Chart + Alarm Marker</td>
                  <td className="py-2.5 px-3 text-slate-300">Dashed red warning threshold line</td>
                  <td className="py-2.5 px-3 text-slate-300">Temperature spike detected during peak load hours.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-119</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Executive Cash Flow Bridge</td>
                  <td className="py-2.5 px-3 text-sky-300">Sequential Variance</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Waterfall Chart</td>
                  <td className="py-2.5 px-3 text-slate-300">Green (Inflow) / Red (Outflow)</td>
                  <td className="py-2.5 px-3 text-slate-300">Explains bridge from Gross Sales to Net Profit.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CS-120</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Campus Placement CTC Ranges</td>
                  <td className="py-2.5 px-3 text-sky-300">Salary Band Distribution</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Histogram</td>
                  <td className="py-2.5 px-3 text-slate-300">₹1.5L bin width intervals</td>
                  <td className="py-2.5 px-3 text-slate-300">CTC distribution skewed positively toward top tier.</td>
                </tr>
              </tbody>
            </table>
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Using 3D Charts</td>
                  <td className="py-3 px-4 text-slate-300">Choosing 3D Exploded Pie or 3D Column charts for visual flair.</td>
                  <td className="py-3 px-4 text-amber-300">Angles are distorted by perspective foreshortening, misleading readers.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Strictly use clean 2D Column, Bar, and Line charts.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Truncating Y-Axis on Bar Charts</td>
                  <td className="py-3 px-4 text-slate-300">Starting Bar/Column chart Y-axis at 80 instead of 0.</td>
                  <td className="py-3 px-4 text-amber-300">A 5% difference looks visually like a 500% difference.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Always anchor Bar/Column chart Y-axes at zero (0).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Overcrowded Pie Slices</td>
                  <td className="py-3 px-4 text-slate-300">Plotting 15 categories on a Pie chart.</td>
                  <td className="py-3 px-4 text-amber-300">Slices become thin slivers with unreadable overlapping callouts.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Use a horizontal bar chart or group small slices into an 'Other' bucket.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: ESSENTIAL EXCEL CHARTING KEYBOARD SHORTCUTS & HOTKEYS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-base font-mono">⌨️</span>
                Master Excel Charting Keyboard Shortcuts &amp; Hotkeys
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Boost your chart creation and formatting speed by 10x with these essential workplace hotkeys.
              </p>
            </div>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/80 px-3 py-1.5 rounded-full border border-purple-800 shrink-0 font-bold">
              Speed Hotkeys Matrix
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + F1
              </kbd>
              <div>
                <strong className="text-xs text-white block">Insert Embedded Chart</strong>
                <p className="text-xs text-slate-400 mt-0.5">Instantly create default 2D Column Chart on active worksheet.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                F11
              </kbd>
              <div>
                <strong className="text-xs text-white block">New Chart Sheet</strong>
                <p className="text-xs text-slate-400 mt-0.5">Generate default chart on a dedicated standalone Chart Sheet (<code className="text-purple-300">Chart1</code>).</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + Drag
              </kbd>
              <div>
                <strong className="text-xs text-white block">Snap to Gridlines</strong>
                <p className="text-xs text-slate-400 mt-0.5">Hold <kbd className="text-slate-200 bg-slate-800 px-1 rounded text-[10px]">Alt</kbd> while moving chart corners to snap perfectly to cell borders.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + 1
              </kbd>
              <div>
                <strong className="text-xs text-white block">Format Task Pane</strong>
                <p className="text-xs text-slate-400 mt-0.5">Open Format Chart Area or Format Data Series sidebar menu instantly.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + N + C
              </kbd>
              <div>
                <strong className="text-xs text-white block">Insert Column Chart Ribbon</strong>
                <p className="text-xs text-slate-400 mt-0.5">Trigger Insert Ribbon menu for 2D/3D Column &amp; Bar charts.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + N + N
              </kbd>
              <div>
                <strong className="text-xs text-white block">Insert Line Chart Ribbon</strong>
                <p className="text-xs text-slate-400 mt-0.5">Trigger Insert Ribbon menu for 2D/3D Line &amp; Area charts.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + N + Q
              </kbd>
              <div>
                <strong className="text-xs text-white block">Insert Pie Chart Ribbon</strong>
                <p className="text-xs text-slate-400 mt-0.5">Trigger Insert Ribbon menu for Pie &amp; Doughnut charts.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl+C → Alt+E+S+T
              </kbd>
              <div>
                <strong className="text-xs text-white block">Copy Chart Formats</strong>
                <p className="text-xs text-slate-400 mt-0.5">Copy one chart and paste its formatting to another chart instantly.</p>
              </div>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why does starting a column chart's vertical axis at a non-zero value distort visual truth?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Under what specific circumstances is a horizontal bar chart superior to a vertical column chart?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why does Edward Tufte's Data-to-Ink ratio advocate removing heavy dark gridlines from business charts?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Chart Selection Guide: Matching Business Data Stories to Optimal Chart Types - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Golden rule of data visualization: If you cannot read the insight in 3 seconds, the chart has failed! Never use 3D charts in corporate finance. Choose 2D Column or Bar charts for comparisons, Line charts for time-series trends, and keep Pie/Doughnut charts under 5 slices!"
          />
        </div>
      </div>
    </div>
  );
}
