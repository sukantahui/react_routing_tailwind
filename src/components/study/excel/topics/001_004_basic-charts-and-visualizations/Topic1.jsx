"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_004_basic_charts_and_visualizations_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic1() {
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
              📊 Charts & Dashboards · Topic 1
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 & 3: Understand & Apply
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Column and Bar Charts: Comparing Discrete Categories, Ranking and Variance Analysis
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master Column (Vertical) and Bar (Horizontal) charts: Clustered columns for target vs actual comparisons, Stacked columns for cumulative totals, 100% Stacked for proportional mix, sorting bars for instant ranking, and gap width optimization.
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
            =COLUMN_CHART(Categories, Values, TargetSeries)
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Clustered Column</td>
                  <td className="py-3 px-4 text-teal-400">Multi-Series</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Comparison</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Places Target and Actual bars side-by-side per category.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Horizontal Bar</td>
                  <td className="py-3 px-4 text-teal-400">Long Labels</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Ranking</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Ideal for ranking 8+ items with long text names (e.g. Barrackpore, Shyamnagar).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Gap Width</td>
                  <td className="py-3 px-4 text-teal-400">Visual Density</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Styling</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Spacing between bars; optimal setting is 50% - 100% for solid modern aesthetic.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Visual Output: </strong>
              Renders a high-contrast <span className="text-sky-300 font-semibold">Categorical Length Encoding Matrix</span> optimized for executive review.
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
            <p>Column charts map numerical values to bar heights starting strictly from baseline 0, allowing instant relative magnitude assessment.</p>
            <p>Sorting categorical data in descending order before plotting creates an instant visual Pareto ranking hierarchy.</p>
            <p>Clustered Column charts should be limited to 2 or 3 series max; more series become visually noisy and difficult to decode.</p>
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
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">📊</span>
                Live Visual Charts: Vertical Column vs Horizontal Ranked Bar Chart
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Visualizing discrete category comparisons and top-to-bottom ranking with exact grid axes and data labels.
              </p>
            </div>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/80 px-3 py-1.5 rounded-full border border-sky-800 shrink-0 font-bold">
              Interactive Chart Rendering
            </span>
          </div>

          {/* TWO VISUAL CHARTS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CHART 1: VERTICAL CLUSTERED COLUMN CHART */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h3 className="text-sm font-bold text-sky-300 flex items-center gap-2">
                  <span>📊</span> 1. Vertical Column Chart (Regional Sales)
                </h3>
                <span className="text-[10px] font-mono bg-sky-950 text-sky-400 px-2 py-0.5 rounded border border-sky-800">
                  Discrete Categories
                </span>
              </div>
              <p className="text-xs text-slate-400">Best when category count is small (<7) and time/categories run left-to-right.</p>
              
              {/* SVG VISUAL COLUMN CHART */}
              <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800/80 flex items-center justify-center">
                <svg viewBox="0 0 420 220" className="w-full h-auto">
                  {/* Y-Axis Gridlines */}
                  <line x1="45" y1="30" x2="400" y2="30" stroke="#334155" strokeDasharray="3 3" />
                  <text x="40" y="34" textAnchor="end" fill="#64748B" fontSize="9">₹25L</text>

                  <line x1="45" y1="70" x2="400" y2="70" stroke="#334155" strokeDasharray="3 3" />
                  <text x="40" y="74" textAnchor="end" fill="#64748B" fontSize="9">₹20L</text>

                  <line x1="45" y1="110" x2="400" y2="110" stroke="#334155" strokeDasharray="3 3" />
                  <text x="40" y="114" textAnchor="end" fill="#64748B" fontSize="9">₹15L</text>

                  <line x1="45" y1="150" x2="400" y2="150" stroke="#334155" strokeDasharray="3 3" />
                  <text x="40" y="154" textAnchor="end" fill="#64748B" fontSize="9">₹10L</text>

                  <line x1="45" y1="180" x2="400" y2="180" stroke="#475569" strokeWidth="1.5" />

                  {/* Columns */}
                  {/* Barrackpore - ₹14.5L */}
                  <rect x="65" y="114" width="42" height="66" rx="4" fill="url(#colGrad1)" stroke="#38BDF8" strokeWidth="1" />
                  <text x="86" y="108" textAnchor="middle" fill="#38BDF8" fontSize="10" fontWeight="bold">₹14.5L</text>
                  <text x="86" y="195" textAnchor="middle" fill="#94A3B8" fontSize="9">Barrackpore</text>

                  {/* Kolkata - ₹21.0L */}
                  <rect x="135" y="62" width="42" height="118" rx="4" fill="url(#colGrad2)" stroke="#34D399" strokeWidth="1" />
                  <text x="156" y="56" textAnchor="middle" fill="#34D399" fontSize="10" fontWeight="bold">₹21.0L</text>
                  <text x="156" y="195" textAnchor="middle" fill="#94A3B8" fontSize="9">Kolkata</text>

                  {/* Howrah - ₹17.5L */}
                  <rect x="205" y="90" width="42" height="90" rx="4" fill="url(#colGrad1)" stroke="#38BDF8" strokeWidth="1" />
                  <text x="226" y="84" textAnchor="middle" fill="#38BDF8" fontSize="10" fontWeight="bold">₹17.5L</text>
                  <text x="226" y="195" textAnchor="middle" fill="#94A3B8" fontSize="9">Howrah</text>

                  {/* Hooghly - ₹12.0L */}
                  <rect x="275" y="134" width="42" height="46" rx="4" fill="url(#colGrad1)" stroke="#38BDF8" strokeWidth="1" />
                  <text x="296" y="128" textAnchor="middle" fill="#38BDF8" fontSize="10" fontWeight="bold">₹12.0L</text>
                  <text x="296" y="195" textAnchor="middle" fill="#94A3B8" fontSize="9">Hooghly</text>

                  {/* Sodepur - ₹16.0L */}
                  <rect x="345" y="102" width="42" height="78" rx="4" fill="url(#colGrad1)" stroke="#38BDF8" strokeWidth="1" />
                  <text x="366" y="96" textAnchor="middle" fill="#38BDF8" fontSize="10" fontWeight="bold">₹16.0L</text>
                  <text x="366" y="195" textAnchor="middle" fill="#94A3B8" fontSize="9">Sodepur</text>

                  <defs>
                    <linearGradient id="colGrad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0284C7" />
                      <stop offset="100%" stopColor="#0369A1" stopOpacity="0.6" />
                    </linearGradient>
                    <linearGradient id="colGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#047857" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* CHART 2: HORIZONTAL RANKED BAR CHART */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h3 className="text-sm font-bold text-teal-300 flex items-center gap-2">
                  <span>📊</span> 2. Ranked Horizontal Bar Chart (Department Budget)
                </h3>
                <span className="text-[10px] font-mono bg-teal-950 text-teal-400 px-2 py-0.5 rounded border border-teal-800">
                  Long Labels &amp; Ranking
                </span>
              </div>
              <p className="text-xs text-slate-400">Best for long text labels and top-to-bottom ranked performance comparisons.</p>
              
              {/* SVG VISUAL HORIZONTAL BAR CHART */}
              <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800/80 flex items-center justify-center">
                <svg viewBox="0 0 420 220" className="w-full h-auto">
                  {/* Category Labels & Bars */}
                  {/* Software Dev - ₹28.5L */}
                  <text x="110" y="35" textAnchor="end" fill="#CBD5E1" fontSize="9">Software Dev</text>
                  <rect x="120" y="23" width="240" height="18" rx="3" fill="#059669" />
                  <text x="368" y="36" textAnchor="start" fill="#34D399" fontSize="9" fontWeight="bold">₹28.5L</text>

                  {/* Cloud Infra - ₹22.0L */}
                  <text x="110" y="70" textAnchor="end" fill="#CBD5E1" fontSize="9">Cloud Infra</text>
                  <rect x="120" y="58" width="185" height="18" rx="3" fill="#0284C7" />
                  <text x="312" y="71" textAnchor="start" fill="#38BDF8" fontSize="9" fontWeight="bold">₹22.0L</text>

                  {/* Consulting - ₹18.5L */}
                  <text x="110" y="105" textAnchor="end" fill="#CBD5E1" fontSize="9">Consulting</text>
                  <rect x="120" y="93" width="155" height="18" rx="3" fill="#0284C7" />
                  <text x="282" y="106" textAnchor="start" fill="#38BDF8" fontSize="9" fontWeight="bold">₹18.5L</text>

                  {/* Hardware Sales - ₹14.2L */}
                  <text x="110" y="140" textAnchor="end" fill="#CBD5E1" fontSize="9">Hardware Sales</text>
                  <rect x="120" y="128" width="120" height="18" rx="3" fill="#0284C7" />
                  <text x="247" y="141" textAnchor="start" fill="#38BDF8" fontSize="9" fontWeight="bold">₹14.2L</text>

                  {/* Tech Support - ₹11.0L */}
                  <text x="110" y="175" textAnchor="end" fill="#CBD5E1" fontSize="9">Tech Support</text>
                  <rect x="120" y="163" width="92" height="18" rx="3" fill="#0284C7" />
                  <text x="219" y="176" textAnchor="start" fill="#38BDF8" fontSize="9" fontWeight="bold">₹11.0L</text>

                  {/* X Axis Line */}
                  <line x1="120" y1="190" x2="380" y2="190" stroke="#475569" strokeWidth="1" />
                  <text x="120" y="204" textAnchor="middle" fill="#64748B" fontSize="8">₹0</text>
                  <text x="212" y="204" textAnchor="middle" fill="#64748B" fontSize="8">₹10L</text>
                  <text x="305" y="204" textAnchor="middle" fill="#64748B" fontSize="8">₹20L</text>
                  <text x="380" y="204" textAnchor="middle" fill="#64748B" fontSize="8">₹30L</text>
                </svg>
              </div>
            </div>
          </div>

          {/* DETAILED CHART MECHANICS & SELECTION GUIDE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-sky-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span>📌</span> When to Select Vertical Column Charts
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Discrete Category Comparison:</strong> Comparing 3 to 7 distinct items side-by-side.</li>
                <li><strong>Short Category Labels:</strong> Month names (Jan, Feb) or short city codes (KOL, HWH, BKP).</li>
                <li><strong>Gap Width Standard:</strong> Set gap width between 50% and 80% of column width to prevent skinny or bloated bars.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-teal-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span>📌</span> When to Select Horizontal Bar Charts
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Long Text Labels:</strong> Department names or product descriptions read naturally left-to-right.</li>
                <li><strong>Leaderboard Ranking:</strong> Sorting values in descending order creates an instant top-to-bottom leaderboard.</li>
                <li><strong>Zero Label Overlap:</strong> Vertical Y-axis provides infinite room for text without awkward rotation.</li>
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
            sheetName="Topic1"
            title="Module 1.4 - Column and Bar Charts: Comparing Discrete Categories, Ranking and Variance Analysis"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: 20 COMPREHENSIVE REAL-WORLD COLUMN & BAR CHART SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
                20 Real-World Business Scenarios: Column &amp; Bar Chart Applications
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                20 practical workplace scenarios detailing optimal orientation, category counts, gap width settings, and visual formatting rules.
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
                  <th className="py-3 px-3">Orientation</th>
                  <th className="py-3 px-3">Category Count</th>
                  <th className="py-3 px-3">Optimal Gap Width</th>
                  <th className="py-3 px-3">Key Design &amp; Formatting Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-101</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Barrackpore 8 Branches Target vs Actual</td>
                  <td className="py-2.5 px-3 text-sky-300">Vertical Clustered Column</td>
                  <td className="py-2.5 px-3 text-emerald-400">8 Branches</td>
                  <td className="py-2.5 px-3 text-purple-300">75% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Side-by-side Target (Grey) vs Actual (Green) bars.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-102</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kolkata Top 10 Product SKUs Revenue</td>
                  <td className="py-2.5 px-3 text-sky-300">Horizontal Ranked Bar</td>
                  <td className="py-2.5 px-3 text-emerald-400">10 Products</td>
                  <td className="py-2.5 px-3 text-purple-300">50% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Sorted descending; long labels legible without rotation.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-103</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Shyamnagar Quarterly Revenue Mix</td>
                  <td className="py-2.5 px-3 text-sky-300">Vertical Stacked Column</td>
                  <td className="py-2.5 px-3 text-emerald-400">4 Quarters</td>
                  <td className="py-2.5 px-3 text-purple-300">100% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Distinct fill colors for Product, Service, and AMC streams.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-104</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Ichapur Plant Manufacturing Defect Pareto</td>
                  <td className="py-2.5 px-3 text-sky-300">Pareto Combo Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">7 Defect Types</td>
                  <td className="py-2.5 px-3 text-purple-300">40% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Descending bars + orange cumulative % line on secondary axis.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-105</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Salt Lake Branch Quarterly Operating Costs</td>
                  <td className="py-2.5 px-3 text-sky-300">Clustered Column</td>
                  <td className="py-2.5 px-3 text-emerald-400">4 Quarters</td>
                  <td className="py-2.5 px-3 text-purple-300">80% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Clear quarter-on-quarter expense trajectory comparison.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-106</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Siliguri Warehouse Inventory Stock Units</td>
                  <td className="py-2.5 px-3 text-sky-300">Horizontal Bar</td>
                  <td className="py-2.5 px-3 text-emerald-400">12 Categories</td>
                  <td className="py-2.5 px-3 text-purple-300">60% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Data labels anchored outside bar ends for quick lookup.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-107</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Durgapur Steel Plant Shift Output Volumes</td>
                  <td className="py-2.5 px-3 text-sky-300">Clustered Column</td>
                  <td className="py-2.5 px-3 text-emerald-400">3 Shifts</td>
                  <td className="py-2.5 px-3 text-purple-300">70% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Distinct color accents highlight Morning shift lead.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-108</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Asansol Fleet Truck Fuel Efficiency Scores</td>
                  <td className="py-2.5 px-3 text-sky-300">Horizontal Bar</td>
                  <td className="py-2.5 px-3 text-emerald-400">15 Vehicle IDs</td>
                  <td className="py-2.5 px-3 text-purple-300">45% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Green fill for >12 km/L; Red for underperforming trucks.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-109</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Howrah Engineering Dept Headcount Allocations</td>
                  <td className="py-2.5 px-3 text-sky-300">Clustered Column</td>
                  <td className="py-2.5 px-3 text-emerald-400">6 Departments</td>
                  <td className="py-2.5 px-3 text-purple-300">75% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Category gaps clearly separate payroll allocations.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-110</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Haldia Petrochemical Monthly Refinery Yield</td>
                  <td className="py-2.5 px-3 text-sky-300">Vertical Column</td>
                  <td className="py-2.5 px-3 text-emerald-400">12 Months</td>
                  <td className="py-2.5 px-3 text-purple-300">65% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Sky Blue bars reveal seasonal refinery output surges.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-111</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Malda Agricultural Export Quantities by Crop</td>
                  <td className="py-2.5 px-3 text-sky-300">Horizontal Ranked Bar</td>
                  <td className="py-2.5 px-3 text-emerald-400">8 Crop Types</td>
                  <td className="py-2.5 px-3 text-purple-300">55% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Sorted descending; Mango and Jute top exported goods.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-112</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Midnapore Hospital Bed Occupancy Rates %</td>
                  <td className="py-2.5 px-3 text-sky-300">Clustered Column</td>
                  <td className="py-2.5 px-3 text-emerald-400">5 Wards</td>
                  <td className="py-2.5 px-3 text-purple-300">70% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Benchmark threshold line highlights ICU at 92% capacity.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-113</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kharagpur Tech Institute Placement Rates</td>
                  <td className="py-2.5 px-3 text-sky-300">Horizontal Bar</td>
                  <td className="py-2.5 px-3 text-emerald-400">7 Engineering Branches</td>
                  <td className="py-2.5 px-3 text-purple-300">50% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Normalized percentage scale; CSE track leads at 98%.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-114</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Hooghly Jute Mill Maintenance Downtime</td>
                  <td className="py-2.5 px-3 text-sky-300">Pareto Combo Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">6 Machine Types</td>
                  <td className="py-2.5 px-3 text-purple-300">40% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Cumulative line proves 2 looms cause 75% downtime.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-115</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Burdwan Retail Category Profit Margins</td>
                  <td className="py-2.5 px-3 text-sky-300">Horizontal Bar</td>
                  <td className="py-2.5 px-3 text-emerald-400">10 Categories</td>
                  <td className="py-2.5 px-3 text-purple-300">50% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Color coded: Groceries high volume, Electronics high margin.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-116</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Purulia Solar vs Wind Energy Daily Output</td>
                  <td className="py-2.5 px-3 text-sky-300">Clustered Column</td>
                  <td className="py-2.5 px-3 text-emerald-400">30 Days</td>
                  <td className="py-2.5 px-3 text-purple-300">35% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Dual series bars show solar higher during dry season.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-117</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Bankura Handicraft Export Destination Value</td>
                  <td className="py-2.5 px-3 text-sky-300">Horizontal Bar</td>
                  <td className="py-2.5 px-3 text-emerald-400">6 Countries</td>
                  <td className="py-2.5 px-3 text-purple-300">60% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Currency formatting; US and UK generate 68% export revenue.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-118</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Jalpaiguri Tea Estate Monthly Harvest</td>
                  <td className="py-2.5 px-3 text-sky-300">Vertical Column</td>
                  <td className="py-2.5 px-3 text-emerald-400">12 Months</td>
                  <td className="py-2.5 px-3 text-purple-300">65% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Green tea leaf theme; monsoon harvest peak highlighted.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-119</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Darjeeling Resort Occupancy by Season</td>
                  <td className="py-2.5 px-3 text-sky-300">Stacked Bar Chart</td>
                  <td className="py-2.5 px-3 text-emerald-400">4 Seasons</td>
                  <td className="py-2.5 px-3 text-purple-300">80% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Room Type breakdown; winter season driven by Deluxe Suites.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CB-120</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Cooch Behar Logistics Order Fulfillments</td>
                  <td className="py-2.5 px-3 text-sky-300">Clustered Column</td>
                  <td className="py-2.5 px-3 text-emerald-400">5 Logistics Partners</td>
                  <td className="py-2.5 px-3 text-purple-300">60% Gap Width</td>
                  <td className="py-2.5 px-3 text-slate-300">Visual ratio of on-time vs delayed package deliveries.</td>
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Bars Overly Thin with Massive Gaps</td>
                  <td className="py-3 px-4 text-slate-300">Default Excel Gap Width is 219%, creating spindly needle-thin bars.</td>
                  <td className="py-3 px-4 text-amber-300">Chart looks empty and fragmented.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Right-click series → Format Data Series → Set Gap Width to 75%.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Too Many Clustered Series</td>
                  <td className="py-3 px-4 text-slate-300">Clustering 8 series side-by-side on 12 categories.</td>
                  <td className="py-3 px-4 text-amber-300">96 narrow bars create an unreadable optical illusion.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Use a Small Multiples panel chart or Stacked chart.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Inconsistent Sorting</td>
                  <td className="py-3 px-4 text-slate-300">Leaving categories in random unsorted order.</td>
                  <td className="py-3 px-4 text-amber-300">Bars zig-zag up and down erratically.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Sort data descending by value before generating chart.</td>
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
                Alt + N + B
              </kbd>
              <div>
                <strong className="text-xs text-white block">Insert Horizontal Bar Ribbon</strong>
                <p className="text-xs text-slate-400 mt-0.5">Trigger Insert Ribbon menu for Horizontal Bar charts.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why does adjusting Gap Width to 75% dramatically improve the visual authority of a column chart?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">When is a Stacked Column chart preferred over a Clustered Column chart?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why must the value axis of a bar/column chart always begin at 0, while a line chart axis can be truncated?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Column and Bar Charts: Comparing Discrete Categories, Ranking and Variance Analysis - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Pro styling tip: Never leave Excel's default 219% Gap Width! Always right-click your columns, go to Format Data Series, and set Gap Width to 60% - 80%. Your bars will look thick, solid, and executive-ready!"
          />
        </div>
      </div>
    </div>
  );
}
