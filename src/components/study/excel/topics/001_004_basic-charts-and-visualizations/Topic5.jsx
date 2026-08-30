"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_004_basic_charts_and_visualizations_master.xlsx?url";
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
            SECTION 4: INTERACTIVE VISUAL CHARTS & CHART MECHANICS GUIDE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">🎨</span>
                Live Visual Charts: Corporate Color Palettes &amp; Executive Dashboard Aesthetics
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Applying Edward Tufte's Data-to-Ink ratio, high-contrast callout KPI metric cards, and decluttered corporate themes.
              </p>
            </div>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/80 px-3 py-1.5 rounded-full border border-sky-800 shrink-0 font-bold">
              Dashboard Polish Engine
            </span>
          </div>

          {/* EXECUTIVE DASHBOARD WIDGET SHOWCASE */}
          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-5 shadow-2xl">
            {/* TOP 3 KPI METRIC CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-800/60 space-y-1">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">Total Sales Revenue</span>
                <div className="text-xl font-extrabold text-white">₹1.45 Crore</div>
                <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span>▲ +18.4%</span> vs previous fiscal quarter
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-800/60 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Gross Operating Margin</span>
                <div className="text-xl font-extrabold text-white">32.8%</div>
                <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span>▲ +3.2%</span> efficiency improvement
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-800/60 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Active Campus Clients</span>
                <div className="text-xl font-extrabold text-white">1,240</div>
                <div className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                  <span>● 98.6%</span> retention rate
                </div>
              </div>
            </div>

            {/* SYNCHRONIZED EXECUTIVE CHART WIDGET */}
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800">
                <h4 className="text-xs font-bold text-slate-200">Quarterly Branch Performance Breakdown (Sky &amp; Emerald Palette)</h4>
                <span className="text-[10px] font-mono text-sky-400 bg-sky-950 px-2 py-0.5 rounded">High-Contrast Hex #0284C7</span>
              </div>

              <svg viewBox="0 0 700 180" className="w-full h-auto">
                {/* Background Grid */}
                <line x1="50" y1="30" x2="670" y2="30" stroke="#334155" strokeDasharray="3 3" />
                <line x1="50" y1="80" x2="670" y2="80" stroke="#334155" strokeDasharray="3 3" />
                <line x1="50" y1="130" x2="670" y2="130" stroke="#334155" strokeDasharray="3 3" />
                <line x1="50" y1="150" x2="670" y2="150" stroke="#475569" strokeWidth="1.5" />

                {/* Bars */}
                <rect x="90" y="70" width="45" height="80" rx="4" fill="#0284C7" />
                <text x="112" y="62" textAnchor="middle" fill="#38BDF8" fontSize="9" fontWeight="bold">₹28L</text>

                <rect x="230" y="40" width="45" height="110" rx="4" fill="#059669" />
                <text x="252" y="32" textAnchor="middle" fill="#34D399" fontSize="9" fontWeight="bold">₹42L ★</text>

                <rect x="370" y="85" width="45" height="65" rx="4" fill="#0284C7" />
                <text x="392" y="77" textAnchor="middle" fill="#38BDF8" fontSize="9" fontWeight="bold">₹22L</text>

                <rect x="510" y="55" width="45" height="95" rx="4" fill="#0284C7" />
                <text x="532" y="47" textAnchor="middle" fill="#38BDF8" fontSize="9" fontWeight="bold">₹35L</text>

                {/* Labels */}
                <text x="112" y="166" textAnchor="middle" fill="#94A3B8" fontSize="9">Barrackpore</text>
                <text x="252" y="166" textAnchor="middle" fill="#94A3B8" fontSize="9">Kolkata HQ</text>
                <text x="392" y="166" textAnchor="middle" fill="#94A3B8" fontSize="9">Howrah</text>
                <text x="532" y="166" textAnchor="middle" fill="#94A3B8" fontSize="9">Hooghly</text>
              </svg>
            </div>
          </div>

          {/* DETAILED CHART MECHANICS & SELECTION GUIDE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-sky-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span>📌</span> Edward Tufte Data-to-Ink Principles
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>95%+ Data Ink Ratio:</strong> Eliminate heavy black borders, 3D tilt bevels, and redundant backgrounds.</li>
                <li><strong>Intentional Focal Color:</strong> Keep comparison bars in muted Slate Grey (#475569) and highlight top performance in Sky Blue.</li>
                <li><strong>Instant 3-Second Insight:</strong> Executive dashboards must convey key findings in under 3 seconds.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-emerald-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span>📌</span> Executive Dashboard Layout Standards
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Top KPI Metric Callouts:</strong> Place 3-4 headline metric cards at the very top of the dashboard.</li>
                <li><strong>Grid Alignment:</strong> Hold <kbd className="px-1 py-0.5 bg-slate-800 text-slate-200 rounded text-[10px]">Alt</kbd> while dragging chart borders to snap perfectly to cell boundaries.</li>
                <li><strong>Synchronized Color Palette:</strong> Maintain consistent color meanings across all chart widgets.</li>
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
            defaultSheetName="Topic5"
            title="Module 1.4 - Formatting and Visual Polish: Corporate Color Palettes, Callout Cards and Modern Dashboard Aesthetics"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: 20 COMPREHENSIVE REAL-WORLD DASHBOARD AESTHETICS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
                20 Real-World Business Scenarios: Dashboard Aesthetics &amp; Visual Polish Matrix
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                20 practical workplace scenarios detailing corporate color palettes, dark theme design systems, KPI callout cards, and data-to-ink optimization.
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
                  <th className="py-3 px-3">Dashboard Application</th>
                  <th className="py-3 px-3">Background Theme</th>
                  <th className="py-3 px-3">Accent Focal Color</th>
                  <th className="py-3 px-3">Data-to-Ink Action</th>
                  <th className="py-3 px-3">Key KPI Callout Metric</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-101</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Corporate Financial Executive Dark Theme</td>
                  <td className="py-2.5 px-3 text-sky-300">Dark Slate (#020617)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Sky Blue (#38BDF8)</td>
                  <td className="py-2.5 px-3 text-purple-300">Delete gridlines, round card borders</td>
                  <td className="py-2.5 px-3 text-slate-300">Total Revenue ₹ 1.48 Cr (+18.4% YoY).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-102</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Barrackpore Retail KPI Summary Header</td>
                  <td className="py-2.5 px-3 text-sky-300">3-Card Header Grid</td>
                  <td className="py-2.5 px-3 text-emerald-400">Emerald Green (#34D399)</td>
                  <td className="py-2.5 px-3 text-purple-300">28pt bold numbers, muted labels</td>
                  <td className="py-2.5 px-3 text-slate-300">Active Clients 12,450 (+850 New).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-103</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Shyamnagar Branch Intentional Focal Accent</td>
                  <td className="py-2.5 px-3 text-sky-300">Grey-plus-accent theme</td>
                  <td className="py-2.5 px-3 text-emerald-400">Vibrant Sky Blue #1 Branch</td>
                  <td className="py-2.5 px-3 text-purple-300">Muted slate grey for remaining 7</td>
                  <td className="py-2.5 px-3 text-slate-300">Barrackpore Branch #1 (₹ 14.5 L).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-104</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Ichapur Plant Dashboard Typography Scale</td>
                  <td className="py-2.5 px-3 text-sky-300">Inter / Segoe UI</td>
                  <td className="py-2.5 px-3 text-emerald-400">White / Light Slate Hierarchy</td>
                  <td className="py-2.5 px-3 text-purple-300">28pt KPI / 14pt Title / 9pt Axis</td>
                  <td className="py-2.5 px-3 text-slate-300">ISO Audit Compliant Visual Standard.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-105</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Salt Lake SaaS Startup Executive Board</td>
                  <td className="py-2.5 px-3 text-sky-300">Dark Navy (#0B132B)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Electric Cyan (#00F5D4)</td>
                  <td className="py-2.5 px-3 text-purple-300">Delete border lines, glow accents</td>
                  <td className="py-2.5 px-3 text-slate-300">ARR $4.2M (+34% YoY Growth).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-106</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Siliguri Logistics Fleet Control Center</td>
                  <td className="py-2.5 px-3 text-sky-300">Midnight Charcoal</td>
                  <td className="py-2.5 px-3 text-emerald-400">Amber Warning (#F59E0B)</td>
                  <td className="py-2.5 px-3 text-purple-300">High contrast card borders</td>
                  <td className="py-2.5 px-3 text-slate-300">Delivery On-Time Rate 94.2%.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-107</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Durgapur Steel Rolling Mill Monitor</td>
                  <td className="py-2.5 px-3 text-sky-300">Dark Slate (#0F172A)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Emerald Green (#10B981)</td>
                  <td className="py-2.5 px-3 text-purple-300">Thermal efficiency cards</td>
                  <td className="py-2.5 px-3 text-slate-300">Daily Steel Yield 1,850 Tons.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-108</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Asansol Coal Safety Command Wall</td>
                  <td className="py-2.5 px-3 text-sky-300">Obsidian Black</td>
                  <td className="py-2.5 px-3 text-emerald-400">Crimson Alert (#EF4444)</td>
                  <td className="py-2.5 px-3 text-purple-300">Real-time gas telemetry cards</td>
                  <td className="py-2.5 px-3 text-slate-300">Safe Operating Days: 412 Days.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-109</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Howrah Freight Terminal Scorecard</td>
                  <td className="py-2.5 px-3 text-sky-300">Slate Grey (#1E293B)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Royal Blue (#2563EB)</td>
                  <td className="py-2.5 px-3 text-purple-300">Turnaround time card matrix</td>
                  <td className="py-2.5 px-3 text-slate-300">Tonnage Turnover 42.5K Tons.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-110</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Haldia Petrochemical Refinery Cockpit</td>
                  <td className="py-2.5 px-3 text-sky-300">Deep Navy (#0A192F)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Gold Accent (#F59E0B)</td>
                  <td className="py-2.5 px-3 text-purple-300">Refinery margin card tiles</td>
                  <td className="py-2.5 px-3 text-slate-300">Crack Spread Margin $14.8/bbl.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-111</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Malda Mango Export Cooperative Board</td>
                  <td className="py-2.5 px-3 text-sky-300">Forest Green Dark</td>
                  <td className="py-2.5 px-3 text-emerald-400">Warm Mango Yellow (#FBBF24)</td>
                  <td className="py-2.5 px-3 text-purple-300">Cold chain temp cards</td>
                  <td className="py-2.5 px-3 text-slate-300">Total Export Volume 8,400 Tons.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-112</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Midnapore Hospital Command Portal</td>
                  <td className="py-2.5 px-3 text-sky-300">Slate Blue (#1E293B)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Medical Teal (#14B8A6)</td>
                  <td className="py-2.5 px-3 text-purple-300">Bed occupancy status cards</td>
                  <td className="py-2.5 px-3 text-slate-300">Emergency Ward Occupancy 88%.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-113</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kharagpur Institute Executive Wall</td>
                  <td className="py-2.5 px-3 text-sky-300">Midnight Blue</td>
                  <td className="py-2.5 px-3 text-emerald-400">Campus Violet (#8B5CF6)</td>
                  <td className="py-2.5 px-3 text-purple-300">Placement KPI summary cards</td>
                  <td className="py-2.5 px-3 text-slate-300">CSE Batch Placement 98.4%.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-114</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Hooghly Jute Mill Control Widget</td>
                  <td className="py-2.5 px-3 text-sky-300">Dark Olive (#1A2E05)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Jute Gold (#D97706)</td>
                  <td className="py-2.5 px-3 text-purple-300">Loom downtime KPI cards</td>
                  <td className="py-2.5 px-3 text-slate-300">Factory OEE Score 82.5%.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-115</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Burdwan Supermarket Executive Board</td>
                  <td className="py-2.5 px-3 text-sky-300">Dark Charcoal</td>
                  <td className="py-2.5 px-3 text-emerald-400">Emerald Green (#10B981)</td>
                  <td className="py-2.5 px-3 text-purple-300">Gross margin KPI summary cards</td>
                  <td className="py-2.5 px-3 text-slate-300">Store Footfall 45,200 Shoppers.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-116</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Purulia Wind &amp; Solar Panel</td>
                  <td className="py-2.5 px-3 text-sky-300">Obsidian Dark</td>
                  <td className="py-2.5 px-3 text-emerald-400">Solar Yellow (#FACC15)</td>
                  <td className="py-2.5 px-3 text-purple-300">Energy yield KPI cards</td>
                  <td className="py-2.5 px-3 text-slate-300">Total Power Generated 1.8 GWh.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-117</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Bankura Craft E-Commerce Dashboard</td>
                  <td className="py-2.5 px-3 text-sky-300">Terracotta Brown Dark</td>
                  <td className="py-2.5 px-3 text-emerald-400">Clay Orange (#EA580C)</td>
                  <td className="py-2.5 px-3 text-purple-300">Cart conversion cards</td>
                  <td className="py-2.5 px-3 text-slate-300">E-Commerce Revenue ₹ 95.4L.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-118</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Jalpaiguri Tea Estate Factory Scorecard</td>
                  <td className="py-2.5 px-3 text-sky-300">Tea Leaf Dark</td>
                  <td className="py-2.5 px-3 text-emerald-400">Emerald Green (#10B981)</td>
                  <td className="py-2.5 px-3 text-purple-300">Fermentation quality cards</td>
                  <td className="py-2.5 px-3 text-slate-300">CTC Tea Production 14.2 Tons.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-119</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Darjeeling Resort Hotel Cockpit</td>
                  <td className="py-2.5 px-3 text-sky-300">Deep Slate (#0F172A)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Luxury Gold (#D97706)</td>
                  <td className="py-2.5 px-3 text-purple-300">RevPAR KPI summary cards</td>
                  <td className="py-2.5 px-3 text-slate-300">Average Daily Rate (ADR) ₹ 8,450.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">DA-120</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Cooch Behar Bank Performance Portal</td>
                  <td className="py-2.5 px-3 text-sky-300">Banking Navy</td>
                  <td className="py-2.5 px-3 text-emerald-400">Gold / Cyan Accent</td>
                  <td className="py-2.5 px-3 text-purple-300">Deposit growth KPI cards</td>
                  <td className="py-2.5 px-3 text-slate-300">Loan Disbursal Total ₹ 128.5 Cr.</td>
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
                Ctrl + Click → Align
              </kbd>
              <div>
                <strong className="text-xs text-white block">Align Dashboard Widgets</strong>
                <p className="text-xs text-slate-400 mt-0.5">Multi-select charts and use Shape Format → Align Top / Distribute Horizontally.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Right-Click → Save Template
              </kbd>
              <div>
                <strong className="text-xs text-white block">Save Chart Template</strong>
                <p className="text-xs text-slate-400 mt-0.5">Save custom corporate color palette as reusable <code className="text-purple-300">.crtx</code> chart template.</p>
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
