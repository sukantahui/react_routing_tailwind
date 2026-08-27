"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/basic_charts.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic3() {
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
              📊 Charts & Dashboards · Topic 3
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 & 3: Understand & Apply
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Pie and Doughnut Charts: Part-to-Whole Proportions, Slice Limits and Modern Best Practices
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master Pie and Doughnut charts: Visualizing part-to-whole relationships, the strict 5-slice limit, slice rotation for optimal reading angle, slice explosion for emphasis, Doughnut hole sizing, and when to replace pie charts with 100% stacked bar charts.
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
            =PIE_CHART(Slices_Max_5, PercentageValues)
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Slice Count (&lt;=5)</td>
                  <td className="py-3 px-4 text-teal-400">Cognitive Limit</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Mandatory</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Never exceed 5 slices; group smaller items into an 'Other' slice.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Doughnut Hole Size</td>
                  <td className="py-3 px-4 text-teal-400">Visual Density</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Design</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Setting hole size to 65% - 75% creates space for a central KPI callout.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Slice Rotation</td>
                  <td className="py-3 px-4 text-teal-400">Reading Flow</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Layout</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Rotate first slice angle so the largest slice begins at 12 o'clock (0 degrees).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Visual Output: </strong>
              Renders a high-contrast <span className="text-sky-300 font-semibold">Proportional Angular Composition</span> optimized for executive review.
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
            <p>Pie charts map percentage values to 360-degree angles. Because human eyes struggle to compare subtle angle differences, pie charts should only be used when differences are dramatic.</p>
            <p>Doughnut charts are visually superior to solid pie charts because the hollow center eliminates heavy colored ink and provides space to display the Grand Total KPI inside the ring.</p>
            <p>Data labels on pie/doughnut charts should always display both the Category Name and the Percentage value directly on the slice, eliminating the need for a separate legend.</p>
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
            Visual Encoding Architecture: Doughnut Architecture with Center KPI Total Callout
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
            sheetName="Topic0_Chart_Guide"
            title="Module 1.4 - Pie and Doughnut Charts: Part-to-Whole Proportions, Slice Limits and Modern Best Practices"
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
                <h3 className="text-base font-bold text-white">Barrackpore Academy Revenue Stream Composition</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Displaying revenue breakdown across 4 training disciplines (Software 45%, Taxation 30%, Data Analytics 15%, Hardware 10%).</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Discipline</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">% Share</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Slice_Color</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Label_Style</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Software Engineering</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">45%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">#0284C7 (Sky Blue)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Direct Data Label (Name + %)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Taxation &amp; GST</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">30%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">#059669 (Emerald)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Direct Data Label (Name + %)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Data Analytics</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">15%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">#7C3AED (Purple)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Direct Data Label (Name + %)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Hardware &amp; Infra</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">10%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">#64748B (Slate)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Direct Data Label (Name + %)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Doughnut Chart with Center Total (₹ 1.25 Cr)</div>
                <div className="text-emerald-400 font-semibold">Result: Clean 4-slice executive proportion chart.</div>
                <div className="text-slate-400 text-[11px]">Under 5 slices, doughnut charts communicate category proportions clearly.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Kolkata Corporate Budget Expense Allocation (Exploded Slice)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Highlighting that R&amp;D receives the largest budget allocation (52%).</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Expense_Category</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Budget_%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Visual_Treatment</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Research &amp; Development</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">52%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Exploded by 10% outward from ring</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Marketing &amp; Sales</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">24%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Standard ring slice</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Operations</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">24%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Standard ring slice</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Exploded Doughnut Slice (10% offset)</div>
                <div className="text-emerald-400 font-semibold">Result: R&amp;D category instantly commands audience attention.</div>
                <div className="text-slate-400 text-[11px]">Exploding a single slice creates an intentional focal point.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Regional Retail Payment Method Split</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Analyzing customer checkout payment methods (UPI 68%, Credit Card 20%, Cash 12%).</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Payment_Mode</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Volume_%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Insight</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">UPI / QR Code</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">68%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Dominant digital payment channel</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Cards &amp; NetBanking</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">20%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Secondary channel</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Physical Cash</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">12%</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Minority channel</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: 2D Pie Chart rotated with UPI starting at 12 o'clock</div>
                <div className="text-emerald-400 font-semibold">Result: Digital dominance instantly recognized by retail management.</div>
                <div className="text-slate-400 text-[11px]">Starting the largest slice at 12 o'clock aligns with natural reading order.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Ichapur Plant Defect Source Grouping (Top 4 + Other)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Consolidating 20 tiny defect sources into 4 major categories plus 'Other Minor'.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Defect_Group</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Count</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">% Share</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Calibration Error</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">85</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">42.5%</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Material Fatigue</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">45</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">22.5%</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Operator Error</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">35</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">17.5%</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Power Surge</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">20</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">10.0%</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Other (16 Minor Sources)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">15</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">7.5%</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Consolidated 5-Slice Doughnut Chart</div>
                <div className="text-emerald-400 font-semibold">Result: Clean readable chart eliminating 16 cluttered slivers.</div>
                <div className="text-slate-400 text-[11px]">Grouping minor tails into an 'Other' bucket preserves visual clarity.</div>
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Pie Chart with 15+ Slices (The Rainbow Wheel)</td>
                  <td className="py-3 px-4 text-slate-300">Plotting too many detailed categories on a pie chart.</td>
                  <td className="py-3 px-4 text-amber-300">Unreadable overlapping labels and indistinguishable slice slivers.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Limit to top 4 categories + 'Other', or switch to a horizontal bar chart.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">3D Exploded Pie Distortion</td>
                  <td className="py-3 px-4 text-slate-300">Using 3D Pie format.</td>
                  <td className="py-3 px-4 text-amber-300">Front slice looks 50% larger than identical-sized back slice.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Strictly use clean flat 2D Doughnut or 2D Pie charts.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Pie Slices Not Totaling 100%</td>
                  <td className="py-3 px-4 text-slate-300">Plotting non-exclusive multi-select survey responses on a pie chart.</td>
                  <td className="py-3 px-4 text-amber-300">Sum of percentages equals 145%, violating part-to-whole geometry.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Use a horizontal bar chart for multi-select responses.</td>
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
                Alt + N + Q
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Insert Pie / Doughnut Chart.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + 1 (on Slice)
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Open Format Data Series to adjust Hole Size and Angle of First Slice.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Click &amp;rarr; Click Single Slice
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Select an individual slice to change its fill color or explode it outward.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + J + C + A &amp;rarr; Data Labels
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Add Category Name and Percentage data labels directly on slices.</p>
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is a Doughnut chart with a center KPI total considered superior to a solid Pie chart?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why does plotting multi-select survey questions on a pie chart create a mathematical fallacy?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does placing data labels directly on slices eliminate cognitive eye travel between chart and legend?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Pie and Doughnut Charts: Part-to-Whole Proportions, Slice Limits and Modern Best Practices - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Strict rule for pie charts: 5 slices maximum! If you have more than 5 categories, group the rest into 'Other' or use a horizontal bar chart. Always use Doughnut charts, display direct percentages on the slices, and delete the distracting legend!"
          />
        </div>
      </div>
    </div>
  );
}
