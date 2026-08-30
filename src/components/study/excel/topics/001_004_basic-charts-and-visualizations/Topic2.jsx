"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_004_basic_charts_and_visualizations_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic2() {
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
              📊 Charts & Dashboards · Topic 2
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 & 3: Understand & Apply
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Line and Area Charts: Visualizing Chronological Trends, Seasonality and Cumulative Trajectories
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master Line and Area charts for continuous time-series data: Multi-line comparisons, trendlines, markers, smoothing, Area charts for volume accumulation, and date-axis vs text-axis configurations.
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
            =LINE_CHART(DateSeries, MetricValues, BaselineSeries)
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">2D Line Chart</td>
                  <td className="py-3 px-4 text-teal-400">Time-Series</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Trend</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Connects chronological data points with straight line vectors to display trajectory.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Data Markers</td>
                  <td className="py-3 px-4 text-teal-400">Point Highlights</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Emphasis</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Circles or diamonds highlighting exact measured data coordinates.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Stacked Area</td>
                  <td className="py-3 px-4 text-teal-400">Cumulative Volume</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Volume</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Shades area below curves to display overall volume and component share over time.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Visual Output: </strong>
              Renders a high-contrast <span className="text-sky-300 font-semibold">Continuous Trajectory &amp; Slope Encoding</span> optimized for executive review.
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
            <p>Line charts encode data via the slope of line segments, enabling rapid detection of rate of change (acceleration vs deceleration).</p>
            <p>Unlike column charts, line chart Y-axes do NOT always need to start at 0 if the objective is to highlight subtle fluctuations (e.g. stock prices or body temperature).</p>
            <p>When formatting line charts with multiple series, use distinct colors and line styles (solid vs dashed) to ensure black-and-white print readability.</p>
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
            SECTION 4: INTERACTIVE VISUAL CHARTS & CHART MECHANICS GUIDE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">📈</span>
                Live Visual Charts: Chronological Line Chart vs Stacked Area Volume Chart
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Visualizing continuous time-series trajectories, quarterly seasonality spikes, and cumulative product volume growth.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-800 shrink-0 font-bold">
              Trend Rendering Engine
            </span>
          </div>

          {/* TWO VISUAL CHARTS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CHART 1: LINE CHART WITH MARKERS */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h3 className="text-sm font-bold text-sky-300 flex items-center gap-2">
                  <span>📈</span> 1. 2D Line Chart with Markers (12-Month Sales Trajectory)
                </h3>
                <span className="text-[10px] font-mono bg-sky-950 text-sky-400 px-2 py-0.5 rounded border border-sky-800">
                  Continuous Time-Series
                </span>
              </div>
              <p className="text-xs text-slate-400">Best for identifying trends, slope trajectories, and monthly seasonality spikes over continuous time.</p>
              
              {/* SVG VISUAL LINE CHART */}
              <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800/80 flex items-center justify-center">
                <svg viewBox="0 0 420 220" className="w-full h-auto">
                  {/* Grid Lines */}
                  <line x1="45" y1="30" x2="400" y2="30" stroke="#334155" strokeDasharray="3 3" />
                  <text x="40" y="34" textAnchor="end" fill="#64748B" fontSize="9">₹30L</text>

                  <line x1="45" y1="80" x2="400" y2="80" stroke="#334155" strokeDasharray="3 3" />
                  <text x="40" y="84" textAnchor="end" fill="#64748B" fontSize="9">₹20L</text>

                  <line x1="45" y1="130" x2="400" y2="130" stroke="#334155" strokeDasharray="3 3" />
                  <text x="40" y="134" textAnchor="end" fill="#64748B" fontSize="9">₹10L</text>

                  <line x1="45" y1="170" x2="400" y2="170" stroke="#475569" strokeWidth="1.5" />

                  {/* Target Benchmark Line (Dashed Orange) */}
                  <line x1="60" y1="95" x2="385" y2="95" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x="390" y="92" textAnchor="start" fill="#FBBF24" fontSize="8" fontWeight="bold">Target</text>

                  {/* Sales Trajectory Line Path */}
                  <path d="M 65 145 L 120 120 L 175 140 L 230 85 L 285 60 L 340 45 L 380 35" fill="none" stroke="#38BDF8" strokeWidth="3" />

                  {/* Data Points / Markers */}
                  <circle cx="65" cy="145" r="4" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
                  <text x="65" y="160" textAnchor="middle" fill="#94A3B8" fontSize="8">Q1</text>
                  <text x="65" y="135" textAnchor="middle" fill="#38BDF8" fontSize="8">₹7L</text>

                  <circle cx="120" cy="120" r="4" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
                  <text x="120" y="160" textAnchor="middle" fill="#94A3B8" fontSize="8">Q2</text>
                  <text x="120" y="110" textAnchor="middle" fill="#38BDF8" fontSize="8">₹12L</text>

                  <circle cx="175" cy="140" r="4" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
                  <text x="175" y="160" textAnchor="middle" fill="#94A3B8" fontSize="8">Q3</text>

                  <circle cx="230" cy="85" r="4" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
                  <text x="230" y="160" textAnchor="middle" fill="#94A3B8" fontSize="8">Q4</text>
                  <text x="230" y="75" textAnchor="middle" fill="#38BDF8" fontSize="8">₹19L</text>

                  <circle cx="285" cy="60" r="4" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
                  <text x="285" y="160" textAnchor="middle" fill="#94A3B8" fontSize="8">Q5</text>

                  <circle cx="340" cy="45" r="4" fill="#34D399" stroke="#059669" strokeWidth="2" />
                  <text x="340" y="160" fill="#94A3B8" fontSize="8" textAnchor="middle">Q6</text>
                  <text x="340" y="35" fill="#34D399" fontSize="9" fontWeight="bold" textAnchor="middle">₹27L 🔥</text>

                  <circle cx="380" cy="35" r="4" fill="#34D399" stroke="#059669" strokeWidth="2" />
                  <text x="380" y="160" fill="#94A3B8" fontSize="8" textAnchor="middle">Q7</text>
                </svg>
              </div>
            </div>

            {/* CHART 2: STACKED AREA CHART */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <span>📉</span> 2. Stacked Area Chart (Cumulative Product Volume)
                </h3>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                  Cumulative Volume
                </span>
              </div>
              <p className="text-xs text-slate-400">Best for displaying total combined volume while illustrating individual product group contributions.</p>
              
              {/* SVG VISUAL STACKED AREA CHART */}
              <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800/80 flex items-center justify-center">
                <svg viewBox="0 0 420 220" className="w-full h-auto">
                  <defs>
                    <linearGradient id="areaGrad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#047857" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0284C7" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#0369A1" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="45" y1="30" x2="400" y2="30" stroke="#334155" strokeDasharray="3 3" />
                  <text x="40" y="34" textAnchor="end" fill="#64748B" fontSize="9">₹50L</text>

                  <line x1="45" y1="80" x2="400" y2="80" stroke="#334155" strokeDasharray="3 3" />
                  <text x="40" y="84" textAnchor="end" fill="#64748B" fontSize="9">₹30L</text>

                  <line x1="45" y1="130" x2="400" y2="130" stroke="#334155" strokeDasharray="3 3" />
                  <text x="40" y="134" textAnchor="end" fill="#64748B" fontSize="9">₹15L</text>

                  <line x1="45" y1="170" x2="400" y2="170" stroke="#475569" strokeWidth="1.5" />

                  {/* Area 1: Hardware Sales */}
                  <path d="M 60 170 L 60 140 L 140 130 L 220 100 L 300 70 L 380 40 L 380 170 Z" fill="url(#areaGrad1)" stroke="#34D399" strokeWidth="1.5" />

                  {/* Area 2: Software Subscriptions (Stacked on top) */}
                  <path d="M 60 140 L 140 130 L 220 100 L 300 70 L 380 40 L 380 20 L 300 40 L 220 60 L 140 90 L 60 110 Z" fill="url(#areaGrad2)" stroke="#38BDF8" strokeWidth="1.5" />

                  {/* Legend Labels */}
                  <rect x="70" y="180" width="10" height="10" rx="2" fill="#38BDF8" />
                  <text x="85" y="188" fill="#CBD5E1" fontSize="8">Software Subscriptions</text>

                  <rect x="210" y="180" width="10" height="10" rx="2" fill="#34D399" />
                  <text x="225" y="188" fill="#CBD5E1" fontSize="8">Hardware Infrastructure</text>

                  {/* Total Volume Point Callout */}
                  <text x="380" y="15" textAnchor="end" fill="#34D399" fontSize="9" fontWeight="bold">Total Cumulative: ₹54.2L</text>
                </svg>
              </div>
            </div>
          </div>

          {/* DETAILED CHART MECHANICS & SELECTION GUIDE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-sky-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span>📌</span> When to Select Line Charts
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Continuous Time Series:</strong> Tracking metrics across months, quarters, or years.</li>
                <li><strong>Slope &amp; Trajectory Analysis:</strong> Instantly revealing acceleration, plateauing, or rapid declines.</li>
                <li><strong>Data Markers:</strong> Adding circle markers on data points makes individual quarterly figures easily readable.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-emerald-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span>📌</span> When to Select Stacked Area Charts
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Cumulative Total Volume:</strong> Demonstrating how overall corporate volume expands over time.</li>
                <li><strong>Component Contribution:</strong> Showing individual product lines stacked on top of one another.</li>
                <li><strong>Avoid Overlapping Fill Clutter:</strong> Stacked Area fills the vertical space without obscuring underlying lines.</li>
              </ul>
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
            defaultSheetName="Topic2"
            title="Module 1.4 - Line and Area Charts: Visualizing Chronological Trends, Seasonality and Cumulative Trajectories"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: 20 COMPREHENSIVE REAL-WORLD LINE & AREA CHART SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
                20 Real-World Business Scenarios: Line &amp; Area Chart Applications
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                20 practical workplace scenarios detailing time-series trajectories, trendlines, stacked volume shading, and seasonality analysis.
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
                  <th className="py-3 px-3">Chart Sub-Type</th>
                  <th className="py-3 px-3">Time Period</th>
                  <th className="py-3 px-3">Line &amp; Marker Style</th>
                  <th className="py-3 px-3">Key Analytical Finding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-101</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kolkata HQ 3-Year Monthly Revenue vs Expenses</td>
                  <td className="py-2.5 px-3 text-sky-300">Multi-Series 2D Line</td>
                  <td className="py-2.5 px-3 text-emerald-400">36 Months</td>
                  <td className="py-2.5 px-3 text-purple-300">Solid 2.5pt Sky Blue + Dashed Rose</td>
                  <td className="py-2.5 px-3 text-slate-300">Demonstrates consistent operating margin expansion.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-102</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Barrackpore Solar Plant Daily Energy Output</td>
                  <td className="py-2.5 px-3 text-sky-300">Line + Polynomial Trendline</td>
                  <td className="py-2.5 px-3 text-emerald-400">365 Days</td>
                  <td className="py-2.5 px-3 text-purple-300">Order 2 Curve + R² Equation</td>
                  <td className="py-2.5 px-3 text-slate-300">Peak summer generation &amp; winter dip modeled (R²=0.94).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-103</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Shyamnagar 4-Branch Cumulative Revenue</td>
                  <td className="py-2.5 px-3 text-sky-300">Stacked Area Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">12 Months</td>
                  <td className="py-2.5 px-3 text-purple-300">High-contrast solid area fills</td>
                  <td className="py-2.5 px-3 text-slate-300">Visualizes regional sales growth &amp; branch share mix.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-104</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Ichapur CNC Machine Spindle Vibration</td>
                  <td className="py-2.5 px-3 text-sky-300">Line + Static Threshold</td>
                  <td className="py-2.5 px-3 text-emerald-400">100 Hours</td>
                  <td className="py-2.5 px-3 text-purple-300">Red dashed alert line at 4.0 mm/s</td>
                  <td className="py-2.5 px-3 text-slate-300">Triggered maintenance alert at Hour 84 exceeding 4.0 mm/s.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-105</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Salt Lake Tech Startup Monthly Active Users</td>
                  <td className="py-2.5 px-3 text-sky-300">2D Line with Markers</td>
                  <td className="py-2.5 px-3 text-emerald-400">24 Months</td>
                  <td className="py-2.5 px-3 text-purple-300">Smooth line + circle markers</td>
                  <td className="py-2.5 px-3 text-slate-300">Highlights organic user acquisition acceleration after v2 launch.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-106</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Siliguri Logistics Fleet Daily Distance Traveled</td>
                  <td className="py-2.5 px-3 text-sky-300">Multi-Line Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">30 Days</td>
                  <td className="py-2.5 px-3 text-purple-300">4 vehicle group series lines</td>
                  <td className="py-2.5 px-3 text-slate-300">Tracks daily route mileage variances across delivery fleets.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-107</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Durgapur Steel Rolling Mill Furnace Temp</td>
                  <td className="py-2.5 px-3 text-sky-300">Real-Time Line Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">24 Hours</td>
                  <td className="py-2.5 px-3 text-purple-300">1-Hour interval markers</td>
                  <td className="py-2.5 px-3 text-slate-300">Detects overnight thermal cooling anomaly between 2-4 AM.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-108</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Asansol Coal Mine Methane Gas Concentration</td>
                  <td className="py-2.5 px-3 text-sky-300">Line + Warning Zone</td>
                  <td className="py-2.5 px-3 text-emerald-400">Continuous</td>
                  <td className="py-2.5 px-3 text-purple-300">Red shaded threshold &gt; 1.5%</td>
                  <td className="py-2.5 px-3 text-slate-300">Ensures underground safety ventilation compliance.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-109</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Howrah Freight Terminal Monthly Turnover</td>
                  <td className="py-2.5 px-3 text-sky-300">100% Stacked Area Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">12 Months</td>
                  <td className="py-2.5 px-3 text-purple-300">Normalized percentage fills</td>
                  <td className="py-2.5 px-3 text-slate-300">Displays strategic modal shift from Rail to Road haulage.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-110</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Haldia Refinery Crude Oil Price vs Finished Petrol</td>
                  <td className="py-2.5 px-3 text-sky-300">Dual-Line Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">52 Weeks</td>
                  <td className="py-2.5 px-3 text-purple-300">Primary ($) + Secondary (₹) axis</td>
                  <td className="py-2.5 px-3 text-slate-300">Triggers inventory hedging when crack spread widens.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-111</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Malda Cold Storage Mango Temperature Bounds</td>
                  <td className="py-2.5 px-3 text-sky-300">Line + Shaded Min/Max Band</td>
                  <td className="py-2.5 px-3 text-emerald-400">30 Days</td>
                  <td className="py-2.5 px-3 text-purple-300">Green target band (2-4°C)</td>
                  <td className="py-2.5 px-3 text-slate-300">Verifies cold chain temperature compliance for exports.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-112</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Midnapore ICU Patient Heart Rate Telemetry</td>
                  <td className="py-2.5 px-3 text-sky-300">High-Frequency Line Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">60 Minutes</td>
                  <td className="py-2.5 px-3 text-purple-300">1-Minute data points</td>
                  <td className="py-2.5 px-3 text-slate-300">Real-time cardiac stability monitoring in intensive care.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-113</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kharagpur Wi-Fi Network Bandwidth Traffic</td>
                  <td className="py-2.5 px-3 text-sky-300">Stacked Area Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">24 Hours</td>
                  <td className="py-2.5 px-3 text-purple-300">Student vs Faculty vs Admin bands</td>
                  <td className="py-2.5 px-3 text-slate-300">Identifies peak bandwidth demand window between 7-10 PM.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-114</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Hooghly River Water Gauge Level During Monsoon</td>
                  <td className="py-2.5 px-3 text-sky-300">Line + Danger Mark Line</td>
                  <td className="py-2.5 px-3 text-emerald-400">90 Days</td>
                  <td className="py-2.5 px-3 text-purple-300">Benchmark red line at Danger Mark</td>
                  <td className="py-2.5 px-3 text-slate-300">Flood warning system visual for municipal emergency teams.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-115</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Burdwan Rice Mill Milling Yield Efficiency %</td>
                  <td className="py-2.5 px-3 text-sky-300">Line + Moving Average</td>
                  <td className="py-2.5 px-3 text-emerald-400">60 Batches</td>
                  <td className="py-2.5 px-3 text-purple-300">7-Day Moving Average trendline</td>
                  <td className="py-2.5 px-3 text-slate-300">Filters out daily grain moisture noise to reveal trend.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-116</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Purulia Wind Farm Turbine Power Generation</td>
                  <td className="py-2.5 px-3 text-sky-300">Multi-Line Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">12 Months</td>
                  <td className="py-2.5 px-3 text-purple-300">5 Wind Turbine series lines</td>
                  <td className="py-2.5 px-3 text-slate-300">Identifies Turbine #3 underperformance due to gear wear.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-117</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Bankura E-Commerce Website Traffic</td>
                  <td className="py-2.5 px-3 text-sky-300">2D Line Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">365 Days</td>
                  <td className="py-2.5 px-3 text-purple-300">Festive callout markers</td>
                  <td className="py-2.5 px-3 text-slate-300">Highlights 320% traffic surge during Durga Puja week.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-118</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Jalpaiguri Tea Factory Fermentation Humidity</td>
                  <td className="py-2.5 px-3 text-sky-300">Line + Target Band</td>
                  <td className="py-2.5 px-3 text-emerald-400">24 Hours</td>
                  <td className="py-2.5 px-3 text-purple-300">Shaded green band (85-90%)</td>
                  <td className="py-2.5 px-3 text-slate-300">Ensures premium CTC tea flavor profile consistency.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-119</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Darjeeling Tourist Footfall vs Hotel Bookings</td>
                  <td className="py-2.5 px-3 text-sky-300">Multi-Line Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">12 Months</td>
                  <td className="py-2.5 px-3 text-purple-300">Footfall vs Booking series</td>
                  <td className="py-2.5 px-3 text-slate-300">Identifies 14-day advance booking lead time pattern.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LA-120</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Cooch Behar Regional Bank Deposit Growth</td>
                  <td className="py-2.5 px-3 text-sky-300">Stacked Area Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">5 Years</td>
                  <td className="py-2.5 px-3 text-purple-300">Savings vs Fixed Deposit bands</td>
                  <td className="py-2.5 px-3 text-slate-300">Shows consumer transition toward high-yield fixed deposits.</td>
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Using Line Charts for Discrete Unrelated Categories</td>
                  <td className="py-3 px-4 text-slate-300">Plotting [Apples, Oranges, Bananas] on a line chart.</td>
                  <td className="py-3 px-4 text-amber-300">The line implies a chronological progression between apples and oranges.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Use a Column or Bar chart for discrete categorical data.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Over-Smoothing Lines (Spaghetti Effect)</td>
                  <td className="py-3 px-4 text-slate-300">Enabling 'Smoothed Line' on volatile noisy data.</td>
                  <td className="py-3 px-4 text-amber-300">Curves create false peaks and dips that do not exist in the raw numbers.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Keep straight vector line segments.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Too Many Overlapping Lines</td>
                  <td className="py-3 px-4 text-slate-300">Plotting 15 lines on a single chart.</td>
                  <td className="py-3 px-4 text-amber-300">Incomprehensible 'spaghetti chart' tangle.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Highlight the 1 key series in bold color and grey out the remaining 14 background series.</td>
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
                Alt + N + N
              </kbd>
              <div>
                <strong className="text-xs text-white block">Insert Line Chart Ribbon</strong>
                <p className="text-xs text-slate-400 mt-0.5">Trigger Insert Ribbon menu for 2D/3D Line &amp; Area charts.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + N + AR
              </kbd>
              <div>
                <strong className="text-xs text-white block">Insert Area Chart Ribbon</strong>
                <p className="text-xs text-slate-400 mt-0.5">Trigger Insert Ribbon menu for Stacked &amp; 100% Area charts.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Up / Down Arrow
              </kbd>
              <div>
                <strong className="text-xs text-white block">Select Chart Elements</strong>
                <p className="text-xs text-slate-400 mt-0.5">Cycle through chart series, legend, title, and data labels via keyboard.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is it conceptually erroneous to plot non-chronological categories (e.g. Departments) on a line chart?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Under what analytical conditions is it permissible to truncate the vertical Y-axis of a line chart?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does the 'Grey + Accent Color' technique solve the problem of overcrowded multi-line charts?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Line and Area Charts: Visualizing Chronological Trends, Seasonality and Cumulative Trajectories - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Never connect unrelated categories with a line! A line chart implies time and progression. Use line charts for dates, months, and years. When plotting multiple lines, make your main company series bold Sky Blue and fade competitor lines to subtle Slate Grey!"
          />
        </div>
      </div>
    </div>
  );
}
