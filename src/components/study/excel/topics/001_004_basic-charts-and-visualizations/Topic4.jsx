"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_004_basic_charts_and_visualizations_master.xlsx?url";
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
              📊 Charts & Dashboards · Topic 4
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 & 3: Understand & Apply
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Mastering Chart Elements: Titles, Legends, Data Labels, Dual-Axes and Gridline Decluttering
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master chart components and structural anatomy: Dynamic formula-linked chart titles, smart data label placement, legend optimization, primary vs secondary dual-axes (Combo charts), and decluttering gridlines for maximum visual punch.
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
            =CHART_ELEMENTS(Title, DataLabels, PrimaryAxis, SecondaryAxis)
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Formula-Linked Title</td>
                  <td className="py-3 px-4 text-teal-400">Dynamic Text</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Mandatory</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Click chart title, type '=' in formula bar, click cell A1 to auto-update title dynamically.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Data Labels</td>
                  <td className="py-3 px-4 text-teal-400">Direct Value Callout</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Clarity</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Displays exact numbers on top of bars, allowing deletion of vertical Y-axis.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Secondary Axis (Combo)</td>
                  <td className="py-3 px-4 text-teal-400">Dual Scale</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Advanced</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Plots Volume (Bars on left Y-axis) and Growth % (Line on right secondary Y-axis).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Visual Output: </strong>
              Renders a high-contrast <span className="text-sky-300 font-semibold">Fully Annotated Executive Chart Architecture</span> optimized for executive review.
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
            <p>A great chart title is an executive summary headline, not a passive description (e.g. 'FY26 Revenue Grew +24% YoY Driven by Cloud' instead of 'Sales Chart').</p>
            <p>Dynamic titles linked to cells (=A1) update automatically whenever underlying data or filters change.</p>
            <p>Dual-Axis Combo charts allow visualizing metrics of vastly different magnitudes (e.g. Revenue in Crores on Primary Axis + Profit Margin % on Secondary Axis).</p>
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
                Live Visual Charts: Dual-Axis Combo Chart &amp; Chart Elements Anatomy
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Combining discrete currency volume columns on primary Y-axis with percentage profitability line overlays on secondary Y-axis.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/80 px-3 py-1.5 rounded-full border border-amber-800 shrink-0 font-bold">
              Dual-Axis Combo Engine
            </span>
          </div>

          {/* TWO VISUAL CHARTS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CHART 1: DUAL-AXIS COMBO CHART */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h3 className="text-sm font-bold text-sky-300 flex items-center gap-2">
                  <span>📊</span> 1. Dual-Axis Combo (Revenue ₹ + Margin %)
                </h3>
                <span className="text-[10px] font-mono bg-sky-950 text-sky-400 px-2 py-0.5 rounded border border-sky-800">
                  Left: ₹ Lakhs | Right: %
                </span>
              </div>
              <p className="text-xs text-slate-400">Plotting absolute revenue (columns) alongside percentage profitability (line) on a secondary right axis.</p>
              
              {/* SVG VISUAL DUAL AXIS CHART */}
              <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800/80 flex items-center justify-center">
                <svg viewBox="0 0 420 220" className="w-full h-auto">
                  {/* Left Primary Y-Axis (Revenue ₹) */}
                  <line x1="45" y1="30" x2="375" y2="30" stroke="#334155" strokeDasharray="3 3" />
                  <text x="40" y="34" textAnchor="end" fill="#38BDF8" fontSize="8" fontWeight="bold">₹30L</text>
                  <text x="380" y="34" textAnchor="start" fill="#F59E0B" fontSize="8" fontWeight="bold">30%</text>

                  <line x1="45" y1="75" x2="375" y2="75" stroke="#334155" strokeDasharray="3 3" />
                  <text x="40" y="79" textAnchor="end" fill="#38BDF8" fontSize="8" fontWeight="bold">₹20L</text>
                  <text x="380" y="79" textAnchor="start" fill="#F59E0B" fontSize="8" fontWeight="bold">20%</text>

                  <line x1="45" y1="120" x2="375" y2="120" stroke="#334155" strokeDasharray="3 3" />
                  <text x="40" y="124" textAnchor="end" fill="#38BDF8" fontSize="8" fontWeight="bold">₹10L</text>
                  <text x="380" y="124" textAnchor="start" fill="#F59E0B" fontSize="8" fontWeight="bold">10%</text>

                  <line x1="45" y1="165" x2="375" y2="165" stroke="#475569" strokeWidth="1.5" />

                  {/* Primary Columns (Revenue) */}
                  <rect x="65" y="110" width="30" height="55" rx="3" fill="#0284C7" />
                  <text x="80" y="180" textAnchor="middle" fill="#94A3B8" fontSize="8">Q1</text>

                  <rect x="145" y="80" width="30" height="85" rx="3" fill="#0284C7" />
                  <text x="160" y="180" textAnchor="middle" fill="#94A3B8" fontSize="8">Q2</text>

                  <rect x="225" y="50" width="30" height="115" rx="3" fill="#0284C7" />
                  <text x="240" y="180" textAnchor="middle" fill="#94A3B8" fontSize="8">Q3</text>

                  <rect x="305" y="35" width="30" height="130" rx="3" fill="#059669" />
                  <text x="320" y="180" textAnchor="middle" fill="#94A3B8" fontSize="8">Q4</text>

                  {/* Secondary Line Overlay (Margin %) */}
                  <path d="M 80 135 L 160 100 L 240 70 L 320 45" fill="none" stroke="#F59E0B" strokeWidth="3" />
                  <circle cx="80" cy="135" r="3.5" fill="#D97706" stroke="#FBBF24" strokeWidth="2" />
                  <circle cx="160" cy="100" r="3.5" fill="#D97706" stroke="#FBBF24" strokeWidth="2" />
                  <circle cx="240" cy="70" r="3.5" fill="#D97706" stroke="#FBBF24" strokeWidth="2" />
                  <circle cx="320" cy="45" r="3.5" fill="#D97706" stroke="#FBBF24" strokeWidth="2" />
                  <text x="320" y="35" textAnchor="middle" fill="#FBBF24" fontSize="8" fontWeight="bold">28.4%</text>

                  {/* Legend Bottom */}
                  <rect x="120" y="195" width="8" height="8" rx="1.5" fill="#0284C7" />
                  <text x="133" y="202" fill="#CBD5E1" fontSize="8">Revenue (Left Axis)</text>

                  <line x1="230" y1="199" x2="245" y2="199" stroke="#F59E0B" strokeWidth="2" />
                  <text x="250" y="202" fill="#CBD5E1" fontSize="8">Margin % (Right Axis)</text>
                </svg>
              </div>
            </div>

            {/* CHART 2: CHART ELEMENTS ANATOMY DIAGRAM */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h3 className="text-sm font-bold text-teal-300 flex items-center gap-2">
                  <span>⚙️</span> 2. Chart Anatomy &amp; Decluttering Guidelines
                </h3>
                <span className="text-[10px] font-mono bg-teal-950 text-teal-400 px-2 py-0.5 rounded border border-teal-800">
                  Element Specification
                </span>
              </div>
              <p className="text-xs text-slate-400">Anatomy of professional chart elements: Title, Legends, Data Labels, Gridlines &amp; Axis bounds.</p>
              
              {/* SVG ANATOMY SPECIFICATION */}
              <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800/80 flex items-center justify-center">
                <svg viewBox="0 0 420 220" className="w-full h-auto">
                  {/* Chart Container Box */}
                  <rect x="20" y="15" width="380" height="190" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
                  
                  {/* Title Pointer */}
                  <text x="210" y="32" textAnchor="middle" fill="#38BDF8" fontSize="10" fontWeight="bold">Executive Sales Growth &amp; Profitability</text>
                  <line x1="210" y1="36" x2="210" y2="44" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 2" />

                  {/* Y-Axis Label Pointer */}
                  <text x="35" y="105" textAnchor="middle" fill="#94A3B8" fontSize="8" transform="rotate(-90 35 105)">Primary Value Y-Axis</text>

                  {/* Decluttered Gridlines */}
                  <line x1="55" y1="65" x2="365" y2="65" stroke="#1E293B" strokeWidth="1" />
                  <line x1="55" y1="105" x2="365" y2="105" stroke="#1E293B" strokeWidth="1" />
                  <line x1="55" y1="145" x2="365" y2="145" stroke="#1E293B" strokeWidth="1" />

                  {/* Bars & Labels */}
                  <rect x="80" y="95" width="35" height="50" fill="#0284C7" rx="2" />
                  <rect x="160" y="75" width="35" height="70" fill="#0284C7" rx="2" />
                  <rect x="240" y="55" width="35" height="90" fill="#059669" rx="2" />

                  <text x="257" y="48" textAnchor="middle" fill="#34D399" fontSize="8" fontWeight="bold">Data Callout</text>

                  {/* Category X-Axis */}
                  <line x1="55" y1="145" x2="365" y2="145" stroke="#475569" strokeWidth="1.5" />
                  <text x="210" y="162" textAnchor="middle" fill="#94A3B8" fontSize="8">Categorical X-Axis Labels</text>

                  {/* Legend Footer */}
                  <rect x="140" y="175" width="140" height="20" rx="4" fill="#1E293B" />
                  <text x="210" y="188" textAnchor="middle" fill="#CBD5E1" fontSize="8">Bottom Legend Alignment</text>
                </svg>
              </div>
            </div>
          </div>

          {/* DETAILED CHART MECHANICS & SELECTION GUIDE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span>📌</span> When to Implement Dual-Axis Combo Charts
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Mixed Scale Metrics:</strong> Plotting absolute currency amounts ($ Lakhs) alongside percentage rates (%).</li>
                <li><strong>Volume vs Profitability:</strong> Comparing revenue volume bars against margin percentage lines.</li>
                <li><strong>Explicit Axis Color Coding:</strong> Color-code axis titles to match their corresponding chart series.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-teal-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span>📌</span> Essential Chart Element Decluttering
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Mute Gridlines:</strong> Soften gridlines to light grey (#334155) so bars remain the primary focus.</li>
                <li><strong>Direct Data Callouts:</strong> Place data values above top-performing bars and eliminate redundant legend clutter.</li>
                <li><strong>Dynamic Chart Titles:</strong> Write actionable headline titles describing the key business insight.</li>
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
            defaultSheetName="Topic4"
            title="Module 1.4 - Mastering Chart Elements: Titles, Legends, Data Labels, Dual-Axes and Gridline Decluttering"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: 20 COMPREHENSIVE REAL-WORLD CHART ELEMENTS & DUAL-AXIS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
                20 Real-World Business Scenarios: Dual-Axis &amp; Chart Elements Matrix
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                20 practical workplace scenarios detailing secondary axis mapping, dynamic cell-linked titles, error bars, and chart decluttering.
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
                  <th className="py-3 px-3">Primary Left Axis ($)</th>
                  <th className="py-3 px-3">Secondary Right Axis (%)</th>
                  <th className="py-3 px-3">Dynamic Title Formula</th>
                  <th className="py-3 px-3">Key Design &amp; Decluttering Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-101</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kolkata Revenue &amp; Profit Margin %</td>
                  <td className="py-2.5 px-3 text-sky-300">Revenue (₹ Lakhs)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Margin % (Line)</td>
                  <td className="py-2.5 px-3 text-purple-300">="Revenue vs Margin %: " &amp; E1</td>
                  <td className="py-2.5 px-3 text-slate-300">Primary Column (Sky Blue) + Secondary Line (Emerald).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-102</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Barrackpore Annual Sales Headline</td>
                  <td className="py-2.5 px-3 text-sky-300">Sales Value (₹)</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">="FY26 Sales: ₹ " &amp; TEXT(SUM(D2:D50),"#,##,##0")</td>
                  <td className="py-2.5 px-3 text-slate-300">Title linked directly to cell E1 for 100% live updates.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-103</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Shyamnagar Minimalist Bar Chart</td>
                  <td className="py-2.5 px-3 text-sky-300">Sales Volume</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">Static Title</td>
                  <td className="py-2.5 px-3 text-slate-300">Delete Y-axis &amp; gridlines; enable direct white data labels.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-104</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Ichapur Plant Quality Defect Error Bars</td>
                  <td className="py-2.5 px-3 text-sky-300">Defect Count</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A</td>
                  <td className="py-2.5 px-3 text-purple-300">Static Title</td>
                  <td className="py-2.5 px-3 text-slate-300">Add Error Bars (5% margin caps) for statistical variance.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-105</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Salt Lake SaaS ARR vs Churn %</td>
                  <td className="py-2.5 px-3 text-sky-300">ARR ($ Million)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Churn % (Right)</td>
                  <td className="py-2.5 px-3 text-purple-300">="SaaS ARR &amp; Churn Trajectory"</td>
                  <td className="py-2.5 px-3 text-slate-300">Dual-axis combo highlights churn drop alongside ARR growth.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-106</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Siliguri Freight Weight vs Delivery Hours</td>
                  <td className="py-2.5 px-3 text-sky-300">Cargo Weight (Tons)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Delivery Latency (Hours)</td>
                  <td className="py-2.5 px-3 text-purple-300">="Freight Tonnage vs Delay"</td>
                  <td className="py-2.5 px-3 text-slate-300">Columns (Tons) + Line (Hours) on secondary axis.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-107</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Durgapur Steel Output vs Energy Consumption</td>
                  <td className="py-2.5 px-3 text-sky-300">Steel Yield (Tons)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Power Consumption (MWh)</td>
                  <td className="py-2.5 px-3 text-purple-300">="Steel Output &amp; MWh Efficiency"</td>
                  <td className="py-2.5 px-3 text-slate-300">Tracks energy efficiency ratio per metric ton of steel.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-108</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Asansol Coal Production vs Safety Incidents</td>
                  <td className="py-2.5 px-3 text-sky-300">Coal Output (K Tons)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Incident Count (Right)</td>
                  <td className="py-2.5 px-3 text-purple-300">="Mine Production &amp; Safety Audit"</td>
                  <td className="py-2.5 px-3 text-slate-300">Secondary axis line tracks safety incidents alongside output.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-109</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Howrah Freight Shipped Units vs Return %</td>
                  <td className="py-2.5 px-3 text-sky-300">Shipped Volume (Units)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Return Rate % (Right)</td>
                  <td className="py-2.5 px-3 text-purple-300">="Shipped Units vs Return %"</td>
                  <td className="py-2.5 px-3 text-slate-300">Identifies product lines with spike in return rate.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-110</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Haldia Refinery Output vs Crude Cost</td>
                  <td className="py-2.5 px-3 text-sky-300">Fuel Output (Barrels)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Crude Price ($/bbl)</td>
                  <td className="py-2.5 px-3 text-purple-300">="Refinery Crack Spread Analysis"</td>
                  <td className="py-2.5 px-3 text-slate-300">Refinery crack spread profitability visualization.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-111</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Malda Fruit Processing Output vs Scrap %</td>
                  <td className="py-2.5 px-3 text-sky-300">Processed Packets</td>
                  <td className="py-2.5 px-3 text-emerald-400">Fruit Waste % (Right)</td>
                  <td className="py-2.5 px-3 text-purple-300">="Processing Volume vs Waste %"</td>
                  <td className="py-2.5 px-3 text-slate-300">Shows scrap rate dropping as batch size increases.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-112</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Midnapore Hospital Beds vs Occupancy %</td>
                  <td className="py-2.5 px-3 text-sky-300">Total Beds Available</td>
                  <td className="py-2.5 px-3 text-emerald-400">Occupancy Rate %</td>
                  <td className="py-2.5 px-3 text-purple-300">="Ward Capacity &amp; Utilization"</td>
                  <td className="py-2.5 px-3 text-slate-300">ICU capacity alert visual for hospital board.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-113</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kharagpur Enrolment vs Placement %</td>
                  <td className="py-2.5 px-3 text-sky-300">Enroled Students</td>
                  <td className="py-2.5 px-3 text-emerald-400">Placement % (Right)</td>
                  <td className="py-2.5 px-3 text-purple-300">="Branch Enrolment &amp; Placement %"</td>
                  <td className="py-2.5 px-3 text-slate-300">Computer Science placement rate leads at 98%.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-114</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Hooghly Looms Active vs Maintenance Hours</td>
                  <td className="py-2.5 px-3 text-sky-300">Active Looms Count</td>
                  <td className="py-2.5 px-3 text-emerald-400">Downtime Hours</td>
                  <td className="py-2.5 px-3 text-purple-300">="Looms Operational &amp; Downtime"</td>
                  <td className="py-2.5 px-3 text-slate-300">Equipment breakdown correlation tracking.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-115</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Burdwan Retail Sales vs Customer Footfall</td>
                  <td className="py-2.5 px-3 text-sky-300">Sales (₹ Lakhs)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Footfall Count (Right)</td>
                  <td className="py-2.5 px-3 text-purple-300">="Store Sales &amp; Shopper Traffic"</td>
                  <td className="py-2.5 px-3 text-slate-300">Average transaction value visual.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-116</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Purulia Solar KWh vs Wind KWh Generation</td>
                  <td className="py-2.5 px-3 text-sky-300">Solar Output (KWh)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Wind Output (KWh)</td>
                  <td className="py-2.5 px-3 text-purple-300">="Solar &amp; Wind Energy Mix"</td>
                  <td className="py-2.5 px-3 text-slate-300">Dual renewable source output balance visual.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-117</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Bankura Craft Orders vs Shipping Expense</td>
                  <td className="py-2.5 px-3 text-sky-300">Order Volume</td>
                  <td className="py-2.5 px-3 text-emerald-400">Shipping Cost (₹)</td>
                  <td className="py-2.5 px-3 text-purple-300">="Order Count vs Shipping Cost"</td>
                  <td className="py-2.5 px-3 text-slate-300">Transport cost ratio monitoring.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-118</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Jalpaiguri Tea Harvest vs Rainfall mm</td>
                  <td className="py-2.5 px-3 text-sky-300">Harvest Yield (Tons)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Rainfall (mm)</td>
                  <td className="py-2.5 px-3 text-purple-300">="Tea Yield &amp; Monsoon Rainfall"</td>
                  <td className="py-2.5 px-3 text-slate-300">Monsoon rainfall correlation with tea yield.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-119</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Darjeeling Hotel Revenue vs Occupancy %</td>
                  <td className="py-2.5 px-3 text-sky-300">Revenue (₹ Lakhs)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Occupancy % (Right)</td>
                  <td className="py-2.5 px-3 text-purple-300">="Hotel RevPAR &amp; Occupancy %"</td>
                  <td className="py-2.5 px-3 text-slate-300">RevPAR performance visual for hotel management.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">CE-120</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Cooch Behar Bank Deposits vs Loan Total</td>
                  <td className="py-2.5 px-3 text-sky-300">Total Deposits (₹ Cr)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Disbursed Loans (₹ Cr)</td>
                  <td className="py-2.5 px-3 text-purple-300">="Bank Deposits &amp; Loan Disbursals"</td>
                  <td className="py-2.5 px-3 text-slate-300">Credit-to-Deposit ratio visual.</td>
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Dual-Axis Scale Misleading Readers</td>
                  <td className="py-3 px-4 text-slate-300">Misaligning scales so that a 2% margin line visually crosses a ₹ 50 Lakh bar.</td>
                  <td className="py-3 px-4 text-amber-300">Readers assume margin and revenue have equal monetary value.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Clearly color-code axes to match their corresponding series (Blue Axis for Blue Bars).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Overlapping Data Labels</td>
                  <td className="py-3 px-4 text-slate-300">Enabling data labels on 50 closely-packed column bars.</td>
                  <td className="py-3 px-4 text-amber-300">Numbers overlap into an illegible black smudge.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Label only the Max and Min points, or widen the chart.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Generic Non-Descriptive Titles</td>
                  <td className="py-3 px-4 text-slate-300">Leaving title as default 'Chart Title' or 'Series 1'.</td>
                  <td className="py-3 px-4 text-amber-300">Audience has no context on the chart's message.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Write an active headline summarizing the core business takeaway.</td>
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
                Click Title → '=' → Cell
              </kbd>
              <div>
                <strong className="text-xs text-white block">Dynamic Title Link</strong>
                <p className="text-xs text-slate-400 mt-0.5">Select chart title, type '=', and click any cell to create a dynamic formula title.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + N + SD
              </kbd>
              <div>
                <strong className="text-xs text-white block">Insert Dual-Axis Combo Ribbon</strong>
                <p className="text-xs text-slate-400 mt-0.5">Trigger Insert Ribbon menu for Dual-Axis Combo Column + Line charts.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why does linking a chart title to a cell formula (=A1) prevent embarrassing outdated presentation headers?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does deleting the vertical Y-axis and using direct data labels increase the Data-to-Ink ratio?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">What precautions must be taken when designing dual-axis combo charts to avoid deceiving executive viewers?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Mastering Chart Elements: Titles, Legends, Data Labels, Dual-Axes and Gridline Decluttering - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Power tip: Never type static text in your chart titles! Write a dynamic summary formula in a cell like ='Total Sales: ₹ ' & TEXT(SUM(B2:B10), '#,##0') then click your chart title, type '=' in the formula bar, and click that cell. Now your title updates live automatically!"
          />
        </div>
      </div>
    </div>
  );
}
