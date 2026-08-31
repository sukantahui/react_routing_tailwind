"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_004_basic_charts_and_visualizations_master.xlsx?url";
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

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
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
            <p>Always hide worksheet gridlines (View → uncheck Gridlines) when presenting executive dashboards for a clean app-like interface.</p>
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
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">⚡</span>
                Live Visual Charts: In-Cell Micro-Sparklines (=REPT("█", ...)) &amp; Capstone Dashboard
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Constructing automated in-cell bar charts directly inside grid cells using text formulas and multi-widget dashboards.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-800 shrink-0 font-bold">
              Formula Micro-Sparkline Engine
            </span>
          </div>

          {/* TWO VISUAL CHARTS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CHART 1: IN-CELL REPT FORMULA SPARKLINE TABLE */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <span>📊</span> 1. In-Cell Formula Sparklines (=REPT("█", E4/2000))
                </h3>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                  Formula Visualization
                </span>
              </div>
              <p className="text-xs text-slate-400">Generates lightweight bar charts inside plain text grid cells without inserting graphical chart objects.</p>

              {/* LIVE SIMULATED REPT SPARKLINE TABLE */}
              <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/90 p-2">
                <table className="w-full text-left text-xs font-mono text-slate-300">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 px-3">Campus Branch</th>
                      <th className="py-2 px-3 text-right">Revenue</th>
                      <th className="py-2 px-3">In-Cell Micro-Sparkline Formula (=REPT("█", E4/2500))</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr>
                      <td className="py-2 px-3 font-sans text-white font-semibold">Barrackpore</td>
                      <td className="py-2 px-3 text-right text-sky-400 font-bold">₹28,500</td>
                      <td className="py-2 px-3 text-emerald-400">███████████ (11)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-sans text-white font-semibold">Kolkata HQ</td>
                      <td className="py-2 px-3 text-right text-sky-400 font-bold">₹42,000</td>
                      <td className="py-2 px-3 text-emerald-400 font-bold">████████████████ (16) ★</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-sans text-white font-semibold">Howrah</td>
                      <td className="py-2 px-3 text-right text-sky-400 font-bold">₹22,000</td>
                      <td className="py-2 px-3 text-emerald-400">████████ (8)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-sans text-white font-semibold">Hooghly</td>
                      <td className="py-2 px-3 text-right text-sky-400 font-bold">₹35,000</td>
                      <td className="py-2 px-3 text-emerald-400">██████████████ (14)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* CHART 2: CAPSTONE MULTI-WIDGET SCORECARD */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h3 className="text-sm font-bold text-sky-300 flex items-center gap-2">
                  <span>🏆</span> 2. Capstone Executive Performance Widget
                </h3>
                <span className="text-[10px] font-mono bg-sky-950 text-sky-400 px-2 py-0.5 rounded border border-sky-800">
                  Integrated Scorecard
                </span>
              </div>
              <p className="text-xs text-slate-400">Combining target benchmarks, variance indicators, and color-coded status pills.</p>

              {/* SVG CAPSTONE SCORECARD */}
              <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800/80 flex items-center justify-center">
                <svg viewBox="0 0 420 220" className="w-full h-auto">
                  {/* Gauge / Benchmark Bars */}
                  <text x="30" y="35" fill="#CBD5E1" fontSize="9" fontWeight="bold">Financial Modeling Benchmark</text>
                  <rect x="30" y="45" width="360" height="14" rx="7" fill="#1E293B" />
                  <rect x="30" y="45" width="290" height="14" rx="7" fill="#059669" />
                  <text x="320" y="56" fill="#34D399" fontSize="9" fontWeight="bold">80.5% (Pass)</text>

                  <text x="30" y="90" fill="#CBD5E1" fontSize="9" fontWeight="bold">Visual Encoding Accuracy</text>
                  <rect x="30" y="100" width="360" height="14" rx="7" fill="#1E293B" />
                  <rect x="30" y="100" width="330" height="14" rx="7" fill="#0284C7" />
                  <text x="365" y="111" fill="#38BDF8" fontSize="9" fontWeight="bold">91.6% (Exceeds)</text>

                  <text x="30" y="145" fill="#CBD5E1" fontSize="9" fontWeight="bold">Decluttering &amp; Gridline Softening</text>
                  <rect x="30" y="155" width="360" height="14" rx="7" fill="#1E293B" />
                  <rect x="30" y="155" width="345" height="14" rx="7" fill="#7C3AED" />
                  <text x="380" y="166" fill="#A78BFA" fontSize="9" fontWeight="bold">95.8% (Mastery)</text>
                </svg>
              </div>
            </div>
          </div>

          {/* DETAILED CHART MECHANICS & SELECTION GUIDE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-emerald-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span>📌</span> How REPT Micro-Sparklines Work
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Formula Syntax:</strong> `=REPT("█", E4 / 2500)` repeats the solid block character based on numeric values.</li>
                <li><strong>Font Formatting:</strong> Apply Consolas, Segoe UI, or Playbill font to ensure uniform character width.</li>
                <li><strong>Zero Overhead:</strong> Lightweight and highly portable; copies instantly across standard cell ranges.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-sky-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span>📌</span> Module 1.4 Laboratory Capstone Goals
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Multi-Chart Integration:</strong> Build Column, Line, Doughnut, and Dual-Axis charts in a single master sheet.</li>
                <li><strong>Executive Scorecard:</strong> Align micro-sparklines alongside macro KPI cards for executive reviews.</li>
                <li><strong>Workplace Readiness:</strong> Prepare professional report models suitable for corporate finance audits.</li>
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
            sheetName="Topic6"
            title="Module 1.4 - Comprehensive Laboratory Practice Session: Chart Creation, Customization and Executive Dashboard Construction"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: 20 COMPREHENSIVE REAL-WORLD LABORATORY PRACTICE SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
                20 Real-World Business Scenarios: Comprehensive Laboratory Practice Matrix
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                20 practical lab modeling scenarios detailing dashboard widget construction, in-cell sparklines (`=REPT`), grid alignment, and audit verification.
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
                  <th className="py-3 px-3">Workplace Modeling Task</th>
                  <th className="py-3 px-3">Chart Type / Formula</th>
                  <th className="py-3 px-3">In-Cell Sparkline Formula</th>
                  <th className="py-3 px-3">Grid Alignment Rule</th>
                  <th className="py-3 px-3">Audit Verification Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-101</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kolkata 50-Row Executive Dashboard</td>
                  <td className="py-2.5 px-3 text-sky-300">Clustered Column + Line + Doughnut</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A (Multi-Widget Grid)</td>
                  <td className="py-2.5 px-3 text-purple-300">Alt+Drag Grid Snapping</td>
                  <td className="py-2.5 px-3 text-slate-300">Boardroom-ready dashboard completed in 10 mins.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-102</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Barrackpore Academic Performance Scorecard</td>
                  <td className="py-2.5 px-3 text-sky-300">Sorted Horizontal Bar</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">Category gaps 50%</td>
                  <td className="py-2.5 px-3 text-slate-300">Subject rankings highlight struggling student cohorts.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-103</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Shyamnagar Slicer-Driven Filter Lab</td>
                  <td className="py-2.5 px-3 text-sky-300">Slicer-Connected PivotCharts</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">Slicer aligned to top right</td>
                  <td className="py-2.5 px-3 text-slate-300">1-Click regional filtering updates 3 charts in &lt;0.1s.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-104</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Ichapur ISO 9001 Quality Audit Board</td>
                  <td className="py-2.5 px-3 text-sky-300">Line + Control Limit Line</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">Red dashed alert boundary</td>
                  <td className="py-2.5 px-3 text-slate-300">ISO 9001 compliance audit passed without observations.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-105</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Salt Lake In-Cell REPT Sparkline Table</td>
                  <td className="py-2.5 px-3 text-sky-300">In-Cell Text Formula</td>
                  <td className="py-2.5 px-3 text-emerald-400">=REPT("█", ROUND(C2/1000,0))</td>
                  <td className="py-2.5 px-3 text-purple-300">Monospace font in cell</td>
                  <td className="py-2.5 px-3 text-slate-300">Zero external chart objects needed; ultra lightweight.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-106</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Siliguri Freight Delivery Time Sparklines</td>
                  <td className="py-2.5 px-3 text-sky-300">In-Cell Text Formula</td>
                  <td className="py-2.5 px-3 text-emerald-400">=REPT("▓", ROUND(D2/2,0))</td>
                  <td className="py-2.5 px-3 text-purple-300">Right-aligned cell text</td>
                  <td className="py-2.5 px-3 text-slate-300">Route delivery delays highlighted inline.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-107</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Durgapur Steel Shift Output Lab</td>
                  <td className="py-2.5 px-3 text-sky-300">Clustered Column Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">Alt+Drag corner snapping</td>
                  <td className="py-2.5 px-3 text-slate-300">Morning shift productivity lead confirmed.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-108</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Asansol Coal Mine Gas Telemetry Lab</td>
                  <td className="py-2.5 px-3 text-sky-300">Line + Threshold Line</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">Alert line at 1.5 PPM</td>
                  <td className="py-2.5 px-3 text-slate-300">Safety compliance score 100% verified.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-109</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Howrah Freight Turnover Scorecard</td>
                  <td className="py-2.5 px-3 text-sky-300">Dual-Axis Combo Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">Primary (Left) + Secondary (Right)</td>
                  <td className="py-2.5 px-3 text-slate-300">Cargo tonnage vs turnaround latency verified.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-110</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Haldia Petrochemical OEE Lab</td>
                  <td className="py-2.5 px-3 text-sky-300">Doughnut with Center Text</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">Hole size 65%</td>
                  <td className="py-2.5 px-3 text-slate-300">Center "84.2% OEE" metric text verified.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-111</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Malda Mango Export Volume Scorecard</td>
                  <td className="py-2.5 px-3 text-sky-300">Sorted Horizontal Bar</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">Sorted descending</td>
                  <td className="py-2.5 px-3 text-slate-300">Export revenue ₹ 4.2 Cr confirmed.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-112</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Midnapore Hospital Ward Occupancy Lab</td>
                  <td className="py-2.5 px-3 text-sky-300">Stacked Bar Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">100% normalized scale</td>
                  <td className="py-2.5 px-3 text-slate-300">ICU ward occupancy bottleneck identified.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-113</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kharagpur Campus Placement Lab</td>
                  <td className="py-2.5 px-3 text-sky-300">Clustered Column Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">Data labels above bars</td>
                  <td className="py-2.5 px-3 text-slate-300">CSE track 98% placement verified.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-114</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Hooghly Jute Loom Downtime Pareto Lab</td>
                  <td className="py-2.5 px-3 text-sky-300">Pareto Combo Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">Cumulative line overlay</td>
                  <td className="py-2.5 px-3 text-slate-300">Top 2 looms cause 76% downtime; maintenance set.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-115</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Burdwan Supermarket Category Profit Lab</td>
                  <td className="py-2.5 px-3 text-sky-300">2D Line + Moving Average</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">7-Day trendline</td>
                  <td className="py-2.5 px-3 text-slate-300">Festive demand spike modeled.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-116</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Purulia Solar Generation Sparkline Lab</td>
                  <td className="py-2.5 px-3 text-sky-300">In-Cell Text Formula</td>
                  <td className="py-2.5 px-3 text-emerald-400">=REPT("█", ROUND(D2/10,0))</td>
                  <td className="py-2.5 px-3 text-purple-300">Cell font Courier New</td>
                  <td className="py-2.5 px-3 text-slate-300">Daily solar peak at 1 PM confirmed.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-117</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Bankura Terracotta Export Share Lab</td>
                  <td className="py-2.5 px-3 text-sky-300">Doughnut + Exploded Slice</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">10% USA slice offset</td>
                  <td className="py-2.5 px-3 text-slate-300">Top export destination highlighted.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-118</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Jalpaiguri Tea Moisture Control Lab</td>
                  <td className="py-2.5 px-3 text-sky-300">Line + Shaded Band</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">Green target band (3-5%)</td>
                  <td className="py-2.5 px-3 text-slate-300">Tea flavor quality verified.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-119</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Darjeeling Resort Occupancy Lab</td>
                  <td className="py-2.5 px-3 text-sky-300">Dual-Axis Combo Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">Secondary axis line</td>
                  <td className="py-2.5 px-3 text-slate-300">Peak season RevPAR calculated.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">LAB-120</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Cooch Behar Bank Deposit Growth Lab</td>
                  <td className="py-2.5 px-3 text-sky-300">Stacked Area Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">5-Year time horizon</td>
                  <td className="py-2.5 px-3 text-slate-300">Financial modeling capstone verified.</td>
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
                  Right-click columns → Format Data Series → Set <strong>Gap Width to 75%</strong>. Select horizontal gridlines and press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Delete</kbd>.
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
                  Hold <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Alt</kbd> while dragging chart corners to snap cleanly to cell borders. Go to View → uncheck Gridlines.
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
                  <td className="py-3 px-4 text-emerald-400 font-medium">Go to View Tab → Uncheck 'Gridlines' for a clean canvas.</td>
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
                Alt + W + V + G
              </kbd>
              <div>
                <strong className="text-xs text-white block">Toggle Worksheet Gridlines</strong>
                <p className="text-xs text-slate-400 mt-0.5">Toggle sheet gridlines off for clean executive presentation canvases.</p>
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
                Ctrl + P
              </kbd>
              <div>
                <strong className="text-xs text-white block">Print Preview Dashboard</strong>
                <p className="text-xs text-slate-400 mt-0.5">Verify 1-page landscape executive dashboard layout before printing or exporting PDF.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Delete Key
              </kbd>
              <div>
                <strong className="text-xs text-white block">Delete Selected Element</strong>
                <p className="text-xs text-slate-400 mt-0.5">Instantly remove selected legend, axis, or clutter gridline.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is unchecking View → Gridlines the single easiest way to make an Excel dashboard look like a custom software application?</p>
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
