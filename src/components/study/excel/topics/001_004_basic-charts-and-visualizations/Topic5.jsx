"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/basic_charts.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic5() {
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
              📊 Charts & Dashboards · Topic 5
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 3 & 4: Apply & Analyze
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Formatting and Visual Polish: Corporate Color Palettes, Callout Cards and Modern Dashboard Aesthetics
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Elevate your charts from amateur to elite corporate standard: Coder &amp; AccoTax dark theme palettes (Slate-950, Sky-400, Emerald-400), intentional accent coloring, KPI metric callout cards, border radius card containers, and visual hierarchy.
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
            =DASHBOARD_STYLING(Palette_Dark_Theme, Contrast_Ratio, Micro_Cards)
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Color Harmony</td>
                  <td className="py-3 px-4 text-teal-400">Palette System</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Aesthetics</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Use max 2-3 intentional colors: Sky Blue (#0284C7), Emerald (#10B981), Slate Grey (#64748B).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">KPI Callout Cards</td>
                  <td className="py-3 px-4 text-teal-400">Metric Highlight</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Dashboard</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Display high-level totals in prominent cards directly above supporting charts.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Visual Hierarchy</td>
                  <td className="py-3 px-4 text-teal-400">Layout Flow</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Cognition</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Top-to-bottom, left-to-right reading order: KPI Cards &amp;rarr; Trend Charts &amp;rarr; Detail Tables.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Visual Output: </strong>
              Renders a high-contrast <span className="text-sky-300 font-semibold">Boardroom-Ready Visual Dashboard Asset</span> optimized for executive review.
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
            <p>Color should be used for cognition, not decoration. Every color in an executive dashboard must represent a specific meaning (e.g. Green = Target Achieved, Red = Deficit, Blue = Current Year).</p>
            <p>Executive dashboards combine 3 visual tiers: 1. Top KPI Metric Summary Cards (Big Numbers), 2. Middle Visual Trend/Comparison Charts, 3. Bottom Granular Detail Table.</p>
            <p>Never use default garish Excel rainbow colors. Use cohesive, calibrated HSL palette tokens that feel modern, elegant, and credible.</p>
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
            Visual Encoding Architecture: 3-Tier Executive Dashboard Architecture (KPIs + Charts + Grid)
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
            sheetName="Topic2_Line_Area"
            title="Module 1.4 - Formatting and Visual Polish: Corporate Color Palettes, Callout Cards and Modern Dashboard Aesthetics"
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
                <h3 className="text-base font-bold text-white">Coder &amp; AccoTax Executive Dark Dashboard Theme Implementation</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Styling an annual financial report with sleek dark aesthetics for high-impact executive presentation.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Dashboard_Element</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Styling_Applied</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Design_Token</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Background Container</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Dark Slate Background</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">#020617 (Slate-950)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Chart Card Panels</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Subtle rounded border panels</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Border: #1E293B | Fill: #0F172A</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Primary Data Series</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Vibrant Sky Blue</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">#38BDF8 (Sky-400)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Accent Highlights</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Luminous Emerald</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">#34D399 (Emerald-400)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Executive Dark Theme Palette</div>
                <div className="text-emerald-400 font-semibold">Result: Stunning modern visual presentation wows corporate leadership.</div>
                <div className="text-slate-400 text-[11px]">Dark themes reduce eye strain and make vibrant data points stand out.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Barrackpore Retail Top KPI Metric Summary Cards</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Building 3 summary metric cards above charts: Total Revenue, Active Customers, and Net Profit Margin.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">KPI_Card</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Big_Number_Display</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sub_Text_Comparison</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Total Revenue</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 1.48 Cr</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">+18.4% YoY Growth (Green Tag)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Active Customers</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">12,450</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">+850 New Clients (Sky Tag)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Net Profit Margin</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">24.2%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">+2.1% Margin Expansion</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: 3-Tier Dashboard Grid Layout</div>
                <div className="text-emerald-400 font-semibold">Result: C-suite executives absorb top-level performance in 2 seconds.</div>
                <div className="text-slate-400 text-[11px]">KPI cards answer key executive questions before they explore detailed charts.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Regional Sales Intentional Accent Coloring</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Coloring all 7 average branches in subtle Slate Grey and highlighting the #1 performing branch in vibrant Sky Blue.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Branch</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Revenue</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Bar_Color_Assigned</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Visual_Effect</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Barrackpore (#1)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 14.5 L</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">#0284C7 (Vibrant Sky Blue)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Instant visual focal point</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Other 7 Branches</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">₹ 8.0 L to 11.0 L</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">#64748B (Muted Slate Grey)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Contextual background benchmark</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Intentional Single-Series Accent Coloring</div>
                <div className="text-emerald-400 font-semibold">Result: Audience attention focused instantly on top performer without distraction.</div>
                <div className="text-slate-400 text-[11px]">Grey-plus-accent coloring guides audience cognition directly to the key insight.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Ichapur Plant Clean Typography &amp; Font Hierarchy</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Standardizing dashboard typography with Segoe UI / Inter font families.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Text_Level</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Font_Size</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Weight</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Color</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">KPI Big Numbers</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">28pt</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Bold</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">#FFFFFF (Pure White)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Chart Titles</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">14pt</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Semi-Bold</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">#E2E8F0 (Light Slate)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Axis Labels</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">9pt</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Regular</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">#94A3B8 (Muted Slate)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Typography Scale Standard</div>
                <div className="text-emerald-400 font-semibold">Result: Clean readable typographic hierarchy across all dashboard widgets.</div>
                <div className="text-slate-400 text-[11px]">Disciplined typography creates a polished, cohesive aesthetic.</div>
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Rainbow Color Overload</td>
                  <td className="py-3 px-4 text-slate-300">Assigning a different bright color to every single column in a single-series chart.</td>
                  <td className="py-3 px-4 text-amber-300">Chart looks like a toy and confuses viewers.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Use a single uniform color for a single series, using accent color only for highlights.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Clashing Font Styles</td>
                  <td className="py-3 px-4 text-slate-300">Mixing Comic Sans, Times New Roman, and Calibri across different charts.</td>
                  <td className="py-3 px-4 text-amber-300">Dashboard looks unprofessional and disjointed.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Standardize on one clean font family (e.g. Segoe UI, Aptos, or Inter).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Cramming Too Many Charts on One Screen</td>
                  <td className="py-3 px-4 text-slate-300">Placing 12 small charts on one sheet without breathing room.</td>
                  <td className="py-3 px-4 text-amber-300">Cognitive overload; viewers cannot determine priority.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Limit dashboard to 3-4 high-impact charts with generous padding.</td>
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
                Format Painter (Alt + H + F + P)
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Copy chart formatting and apply instantly to another chart.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + Drag
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Snap chart boundary cleanly to Excel grid cell lines.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Click Multiple Charts &amp;rarr; Align
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Align top, left, and distribute horizontally for perfect grid symmetry.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Right-Click Chart &amp;rarr; Save as Template
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Save customized chart styling as reusable .crtx corporate template.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is 'Grey + Single Accent Color' considered the gold standard in corporate data journalism?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does pressing the Alt key while moving or resizing a chart snap it perfectly to the underlying cell grid?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">What is the cognitive purpose of placing KPI summary cards at the top of a dashboard before detailed charts?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Formatting and Visual Polish: Corporate Color Palettes, Callout Cards and Modern Dashboard Aesthetics - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Aesthetics are everything in executive presentations! Never show amateur default charts with random rainbow colors. Use our Coder & AccoTax dark aesthetic: clean Slate-950 panels, vibrant Sky Blue for your main series, Emerald for targets, and mute background context with Slate Grey. Hold Alt while resizing charts to snap them perfectly to the cell grid!"
          />
        </div>
      </div>
    </div>
  );
}
