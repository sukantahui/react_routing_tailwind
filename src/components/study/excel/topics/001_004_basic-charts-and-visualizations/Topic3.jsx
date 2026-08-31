"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_004_basic_charts_and_visualizations_master.xlsx?url";
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

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Slice Count (&le;5)</td>
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
            SECTION 4: INTERACTIVE VISUAL CHARTS & CHART MECHANICS GUIDE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">🍩</span>
                Live Visual Charts: Executive Doughnut Chart vs Exploded Pie Slice Detail
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Visualizing part-to-whole 100% proportional breakdowns with center KPI summary callouts and leader lines.
              </p>
            </div>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/80 px-3 py-1.5 rounded-full border border-purple-800 shrink-0 font-bold">
              Proportion Engine
            </span>
          </div>

          {/* TWO VISUAL CHARTS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CHART 1: EXECUTIVE DOUGHNUT CHART WITH CENTER METRIC */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2">
                  <span>🍩</span> 1. Executive Doughnut Chart (Center KPI Total)
                </h3>
                <span className="text-[10px] font-mono bg-purple-950 text-purple-400 px-2 py-0.5 rounded border border-purple-800">
                  Part-to-Whole 100%
                </span>
              </div>
              <p className="text-xs text-slate-400">Best for displaying slice contribution to a 100% whole with a central metric summary.</p>
              
              {/* SVG VISUAL DOUGHNUT CHART */}
              <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800/80 flex items-center justify-center">
                <svg viewBox="0 0 420 220" className="w-full h-auto">
                  {/* Doughnut Center Ring & Slices */}
                  <g transform="translate(140, 110)">
                    {/* Slice 1: Enterprise 38% (0 deg to 136.8 deg) */}
                    <path d="M 0 0 L 0 -80 A 80 80 0 0 1 73 32 Z" fill="#0284C7" stroke="#0F172A" strokeWidth="2" />
                    {/* Slice 2: Cloud 25% (136.8 deg to 226.8 deg) */}
                    <path d="M 0 0 L 73 32 A 80 80 0 0 1 -59 54 Z" fill="#059669" stroke="#0F172A" strokeWidth="2" />
                    {/* Slice 3: Consulting 18% (226.8 deg to 291.6 deg) */}
                    <path d="M 0 0 L -59 54 A 80 80 0 0 1 -74 -29 Z" fill="#7C3AED" stroke="#0F172A" strokeWidth="2" />
                    {/* Slice 4: Subscriptions 12% (291.6 deg to 334.8 deg) */}
                    <path d="M 0 0 L -74 -29 A 80 80 0 0 1 -34 -72 Z" fill="#D97706" stroke="#0F172A" strokeWidth="2" />
                    {/* Slice 5: Support 7% (334.8 deg to 360 deg) */}
                    <path d="M 0 0 L -34 -72 A 80 80 0 0 1 0 -80 Z" fill="#475569" stroke="#0F172A" strokeWidth="2" />

                    {/* Center Doughnut Hole (Hollow Mask) */}
                    <circle cx="0" cy="0" r="48" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />

                    {/* Center Metric Callout */}
                    <text x="0" y="-6" textAnchor="middle" fill="#94A3B8" fontSize="8" fontWeight="bold">TOTAL REVENUE</text>
                    <text x="0" y="10" textAnchor="middle" fill="#34D399" fontSize="11" fontWeight="extrabold">₹85.4L</text>
                  </g>

                  {/* Legend Slices */}
                  <g transform="translate(255, 30)">
                    <rect x="0" y="10" width="10" height="10" rx="2" fill="#0284C7" />
                    <text x="16" y="18" fill="#CBD5E1" fontSize="9">Enterprise (38%)</text>

                    <rect x="0" y="32" width="10" height="10" rx="2" fill="#059669" />
                    <text x="16" y="40" fill="#CBD5E1" fontSize="9">Cloud Infra (25%)</text>

                    <rect x="0" y="54" width="10" height="10" rx="2" fill="#7C3AED" />
                    <text x="16" y="62" fill="#CBD5E1" fontSize="9">Consulting (18%)</text>

                    <rect x="0" y="76" width="10" height="10" rx="2" fill="#D97706" />
                    <text x="16" y="84" fill="#CBD5E1" fontSize="9">Subscriptions (12%)</text>

                    <rect x="0" y="98" width="10" height="10" rx="2" fill="#475569" />
                    <text x="16" y="106" fill="#CBD5E1" fontSize="9">Support (7%)</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* CHART 2: EXPLODED PIE SLICE BREAKDOWN */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h3 className="text-sm font-bold text-sky-300 flex items-center gap-2">
                  <span>🥧</span> 2. Exploded Pie Slice (Focal Segment Callout)
                </h3>
                <span className="text-[10px] font-mono bg-sky-950 text-sky-400 px-2 py-0.5 rounded border border-sky-800">
                  Exploded Focal Slice
                </span>
              </div>
              <p className="text-xs text-slate-400">Offsetting a key segment to highlight an executive story or major market shift.</p>
              
              {/* SVG VISUAL EXPLODED PIE CHART */}
              <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800/80 flex items-center justify-center">
                <svg viewBox="0 0 420 220" className="w-full h-auto">
                  <g transform="translate(190, 110)">
                    {/* Exploded Slice (Offset outwards) */}
                    <g transform="translate(10, -10)">
                      <path d="M 0 0 L 0 -80 A 80 80 0 0 1 73 32 Z" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />
                      {/* Leader Line Callout */}
                      <path d="M 35 -35 L 70 -50 L 110 -50" stroke="#38BDF8" strokeWidth="1.5" fill="none" />
                      <text x="115" y="-46" fill="#38BDF8" fontSize="10" fontWeight="bold">Top Performer: ₹32.4L (38%)</text>
                    </g>

                    {/* Remaining Slices */}
                    <path d="M 0 0 L 73 32 A 80 80 0 0 1 -59 54 Z" fill="#059669" stroke="#0F172A" strokeWidth="2" />
                    <path d="M 0 0 L -59 54 A 80 80 0 0 1 -74 -29 Z" fill="#7C3AED" stroke="#0F172A" strokeWidth="2" />
                    <path d="M 0 0 L -74 -29 A 80 80 0 0 1 -34 -72 Z" fill="#D97706" stroke="#0F172A" strokeWidth="2" />
                    <path d="M 0 0 L -34 -72 A 80 80 0 0 1 0 -80 Z" fill="#475569" stroke="#0F172A" strokeWidth="2" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* DETAILED CHART MECHANICS & SELECTION GUIDE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-purple-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span>📌</span> Golden Rules for Pie &amp; Doughnut Charts
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Max 5 Slices:</strong> Never exceed 5 or 6 slices; combine small trailing items into 'Other'.</li>
                <li><strong>100% Total Equality:</strong> Slices must strictly sum to 100% of a unified total payload.</li>
                <li><strong>12 O'Clock Clockwise Ordering:</strong> Position the largest slice starting at 12 o'clock running clockwise.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-sky-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span>📌</span> Why Executive Doughnut Charts Excel
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Center KPI Hole:</strong> Provides high-visibility real estate for overall revenue totals or key callouts.</li>
                <li><strong>Arc Length Encoding:</strong> Humans evaluate arc lengths more accurately than solid pie angles.</li>
                <li><strong>Clean Modern Aesthetics:</strong> Eliminates dense center fill clutter for sleek dashboard interfaces.</li>
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
            sheetName="Topic3"
            title="Module 1.4 - Pie and Doughnut Charts: Part-to-Whole Proportions, Slice Limits and Modern Best Practices"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: 20 COMPREHENSIVE REAL-WORLD PIE & DOUGHNUT CHART SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
                20 Real-World Business Scenarios: Pie &amp; Doughnut Applications
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                20 practical workplace scenarios detailing part-to-whole composition, slice count constraints, center hole callouts, and leader lines.
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
                  <th className="py-3 px-3">Slice Count</th>
                  <th className="py-3 px-3">Center Hole Callout</th>
                  <th className="py-3 px-3">Exploded Segment</th>
                  <th className="py-3 px-3">Key Design &amp; Leader Line Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-101</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Barrackpore Academy Discipline Share</td>
                  <td className="py-2.5 px-3 text-sky-300">4 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">"₹ 1.25 Cr Total"</td>
                  <td className="py-2.5 px-3 text-purple-300">None (Unified ring)</td>
                  <td className="py-2.5 px-3 text-slate-300">Direct data labels showing Category + Percentage.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-102</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kolkata Corporate R&amp;D Budget Share</td>
                  <td className="py-2.5 px-3 text-sky-300">3 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">"₹ 85.0 L R&amp;D"</td>
                  <td className="py-2.5 px-3 text-purple-300">10% R&amp;D slice offset</td>
                  <td className="py-2.5 px-3 text-slate-300">Exploding primary R&amp;D slice commands executive focus.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-103</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Shyamnagar Retail Payment Methods</td>
                  <td className="py-2.5 px-3 text-sky-300">3 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A (Solid Pie)</td>
                  <td className="py-2.5 px-3 text-purple-300">None</td>
                  <td className="py-2.5 px-3 text-slate-300">UPI slice (68%) high contrast sky blue fill.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-104</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Ichapur Plant Factory Waste Breakdown</td>
                  <td className="py-2.5 px-3 text-sky-300">4 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">"4.2 Tons Scrap"</td>
                  <td className="py-2.5 px-3 text-purple-300">None</td>
                  <td className="py-2.5 px-3 text-slate-300">Leader lines connect outer label to small 8% slice.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-105</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Salt Lake SaaS Customer Segment Mix</td>
                  <td className="py-2.5 px-3 text-sky-300">3 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">"Hole Size 65%"</td>
                  <td className="py-2.5 px-3 text-purple-300">None</td>
                  <td className="py-2.5 px-3 text-slate-300">Enterprise accounts for 58% ARR total.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-106</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Siliguri Tea Logistics Transport Mode</td>
                  <td className="py-2.5 px-3 text-sky-300">3 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A (Solid Pie)</td>
                  <td className="py-2.5 px-3 text-purple-300">None</td>
                  <td className="py-2.5 px-3 text-slate-300">Road transport accounts for 74% shipment volume.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-107</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Durgapur Steel Ore Sourcing Share</td>
                  <td className="py-2.5 px-3 text-sky-300">4 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">"₹ 4.8 Cr Ore"</td>
                  <td className="py-2.5 px-3 text-purple-300">None</td>
                  <td className="py-2.5 px-3 text-slate-300">Domestic iron ore constitutes 62% of raw material stock.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-108</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Asansol Energy Grid Supply Mix</td>
                  <td className="py-2.5 px-3 text-sky-300">4 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A (Solid Pie)</td>
                  <td className="py-2.5 px-3 text-purple-300">None</td>
                  <td className="py-2.5 px-3 text-slate-300">Thermal power represents 71% of regional energy supply.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-109</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Howrah Freight Customer Satisfaction</td>
                  <td className="py-2.5 px-3 text-sky-300">3 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">"88% CSAT"</td>
                  <td className="py-2.5 px-3 text-purple-300">None</td>
                  <td className="py-2.5 px-3 text-slate-300">Green/Yellow/Red fills; Satisfied tier represents 82%.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-110</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Haldia Port Export Cargo Mix</td>
                  <td className="py-2.5 px-3 text-sky-300">4 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A (Solid Pie)</td>
                  <td className="py-2.5 px-3 text-purple-300">None</td>
                  <td className="py-2.5 px-3 text-slate-300">Slices sorted by size; petroleum generates 54% export.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-111</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Malda Mango Variety Yield Share</td>
                  <td className="py-2.5 px-3 text-sky-300">4 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">"12.5K Tons"</td>
                  <td className="py-2.5 px-3 text-purple-300">None</td>
                  <td className="py-2.5 px-3 text-slate-300">Himsagar variety leads at 48% total harvest.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-112</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Midnapore Hospital Ward Admissions</td>
                  <td className="py-2.5 px-3 text-sky-300">4 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">"Hole Size 70%"</td>
                  <td className="py-2.5 px-3 text-purple-300">None</td>
                  <td className="py-2.5 px-3 text-slate-300">General Medicine accounts for 42% total ward occupancy.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-113</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kharagpur Library Book Categories</td>
                  <td className="py-2.5 px-3 text-sky-300">4 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A (Solid Pie)</td>
                  <td className="py-2.5 px-3 text-purple-300">None</td>
                  <td className="py-2.5 px-3 text-slate-300">Computer Science books account for 51% total stock.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-114</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Hooghly Jute Product Market Share</td>
                  <td className="py-2.5 px-3 text-sky-300">3 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">"₹ 2.4 Cr Jute"</td>
                  <td className="py-2.5 px-3 text-purple-300">Gunny bags slice exploded</td>
                  <td className="py-2.5 px-3 text-slate-300">Gunny bags command 65% domestic sales volume.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-115</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Burdwan Retail Sales Channels</td>
                  <td className="py-2.5 px-3 text-sky-300">3 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">"₹ 3.8 Cr Sales"</td>
                  <td className="py-2.5 px-3 text-purple-300">None</td>
                  <td className="py-2.5 px-3 text-slate-300">In-store retail generates 76% total sales volume.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-116</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Purulia Rural Solar Pump Grants</td>
                  <td className="py-2.5 px-3 text-sky-300">3 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A (Solid Pie)</td>
                  <td className="py-2.5 px-3 text-purple-300">None</td>
                  <td className="py-2.5 px-3 text-slate-300">Small farmers receive 64% total subsidy allocation.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-117</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Bankura Terracotta Product Type Sales</td>
                  <td className="py-2.5 px-3 text-sky-300">4 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">"₹ 95.0 L Revenue"</td>
                  <td className="py-2.5 px-3 text-purple-300">None</td>
                  <td className="py-2.5 px-3 text-slate-300">Decorative tiles account for 46% annual craft revenue.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-118</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Jalpaiguri Tea Packaging Export Mix</td>
                  <td className="py-2.5 px-3 text-sky-300">3 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">N/A (Solid Pie)</td>
                  <td className="py-2.5 px-3 text-purple-300">None</td>
                  <td className="py-2.5 px-3 text-slate-300">Bulk wooden chest exports account for 62% volume.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-119</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Darjeeling Hotel Booking Channels</td>
                  <td className="py-2.5 px-3 text-sky-300">4 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">"15.4K Guests"</td>
                  <td className="py-2.5 px-3 text-purple-300">None</td>
                  <td className="py-2.5 px-3 text-slate-300">Online Travel Agencies (OTA) drive 58% guest bookings.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">PD-120</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Cooch Behar Bank Loan Portfolio Mix</td>
                  <td className="py-2.5 px-3 text-sky-300">4 Slices</td>
                  <td className="py-2.5 px-3 text-emerald-400">"Hole Size 60%"</td>
                  <td className="py-2.5 px-3 text-purple-300">None</td>
                  <td className="py-2.5 px-3 text-slate-300">Agricultural loans represent 44% portfolio share.</td>
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
                Alt + N + Q
              </kbd>
              <div>
                <strong className="text-xs text-white block">Insert Pie Chart Ribbon</strong>
                <p className="text-xs text-slate-400 mt-0.5">Trigger Insert Ribbon menu for Pie &amp; Doughnut charts.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Click → Click
              </kbd>
              <div>
                <strong className="text-xs text-white block">Select Single Slice</strong>
                <p className="text-xs text-slate-400 mt-0.5">Click once to select whole series, second click selects an individual slice to explode.</p>
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
