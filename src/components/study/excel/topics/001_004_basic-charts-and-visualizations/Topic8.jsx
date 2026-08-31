"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_004_basic_charts_and_visualizations_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic8() {
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
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-purple-500/30 selection:text-purple-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              🏆 Module Capstone · Topic 8
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              Chart Design &amp; Visual Storytelling Assessment
            </span>
            <span className="px-3 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-300 text-xs font-semibold">
              Bloom's Level 6: Evaluate
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-emerald-300 bg-clip-text text-transparent leading-tight">
            Quick Check Quiz &amp; Visual Storytelling Assessment
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Welcome to the final capstone evaluation for <strong>Module 1.4: Basic Charts and Visualizations</strong>. 
            This assessment evaluates your proficiency in selecting the ideal chart archetype, eliminating visual clutter, configuring dual-axis combo charts, creating in-cell sparklines, and upholding data integrity.
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>100-Point Rubric:</strong> Chart selection, design polish &amp; accuracy</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Visual Specialist:</strong> Distinction awarded for scores &ge; 85%</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Accredited by:</strong> Coder &amp; AccoTax Centre of Excellence</span>
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
              <span className="text-purple-400">⚡</span> Visual Storytelling Competency Evaluation Matrix
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Grading Syllabus
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Evaluation Domain</th>
                  <th className="py-3 px-4">Core Visual Mechanics</th>
                  <th className="py-3 px-4">Point Weight</th>
                  <th className="py-3 px-4">Key Assessment Criteria</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">1. Chart Typology</td>
                  <td className="py-3 px-4 font-mono text-sky-300">Column, Bar, Line, Doughnut, Scatter</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">25 Points</td>
                  <td className="py-3 px-4">Selecting the correct visual encoding for discrete vs continuous data.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">2. Dual-Axis &amp; Combos</td>
                  <td className="py-3 px-4 font-mono text-sky-300">Combo Charts, Secondary Axes, Trendlines</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">25 Points</td>
                  <td className="py-3 px-4">Plotting mixed currency and margin % scales with zero distortion.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-teal-300">3. Micro-Visualization</td>
                  <td className="py-3 px-4 font-mono text-sky-300">Line &amp; Column Sparklines, High/Low Markers</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">20 Points</td>
                  <td className="py-3 px-4">Embedding high-density in-cell trajectory sparklines cleanly.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">4. Information Design</td>
                  <td className="py-3 px-4 font-mono text-sky-300">Decluttering, Zero Baselines, Dynamic Titles</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">30 Points</td>
                  <td className="py-3 px-4">Eliminating chart junk, linking titles to cells, magnetic grid alignment.</td>
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
              <span className="text-sky-400">🔬</span> Conceptual Architecture: Visual Ethics &amp; Integrity
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Visual Principles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-purple-300 text-base flex items-center gap-2">
                <span>1.</span> The Lie Factor in Data Presentation
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                A chart is untruthful if the visual proportion does not match the numerical proportion. Truncating the vertical axis on a bar chart so a 5% gain looks like a 300% surge severely violates professional ethics.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-sky-300 text-base flex items-center gap-2">
                <span>2.</span> Cognitive Load &amp; Eye-Tracking Speed
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Floating legends require the viewer's eyes to bounce back and forth between the series and the key. Placing direct data labels at the end of line series eliminates cognitive friction entirely.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-teal-300 text-base flex items-center gap-2">
                <span>3.</span> Spatial Encodings: Length vs Area vs Angle
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Human visual perception decodes length along a shared alignment with 99% accuracy, whereas estimating angles (pie charts) or 2D areas (bubble charts) has a 20-30% perceptual error margin.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-amber-300 text-base flex items-center gap-2">
                <span>4.</span> Interactive Dynamism via Tables
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Static charts break when new monthly rows are appended. Building charts exclusively on structured Excel Tables (<code className="text-amber-300 font-mono">Ctrl + T</code>) ensures automated series expansion.
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
              <span className="text-emerald-400">📐</span> Module 1.4 Visual Storytelling Competency Radar
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Evaluation Radar
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg
              viewBox="0 0 880 320"
              className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans"
            >
              <defs>
                <linearGradient id="compRadarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Spider Grid Lines */}
              <polygon points="440,60 580,160 440,260 300,160" fill="none" stroke="#334155" strokeWidth="1" />
              <polygon points="440,90 535,160 440,230 345,160" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
              <polygon points="440,120 490,160 440,200 390,160" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />

              {/* Axes */}
              <line x1="440" y1="40" x2="440" y2="280" stroke="#475569" strokeWidth="1.5" />
              <line x1="280" y1="160" x2="600" y2="160" stroke="#475569" strokeWidth="1.5" />

              {/* Competency Poly (Distinction Benchmark) */}
              <polygon points="440,68 565,160 440,248 315,160" fill="url(#compRadarGrad)" stroke="#38bdf8" strokeWidth="2.5" />

              {/* Points */}
              <circle cx="440" cy="68" r="5" fill="#a855f7" />
              <circle cx="565" cy="160" r="5" fill="#38bdf8" />
              <circle cx="440" cy="248" r="5" fill="#34d399" />
              <circle cx="315" cy="160" r="5" fill="#fbbf24" />

              {/* Labels */}
              <text x="440" y="32" textAnchor="middle" fill="#c084fc" fontWeight="bold" fontSize="13">
                1. CHART TYPOLOGY &amp; SELECTION (95%)
              </text>
              <text x="615" y="165" fill="#38bdf8" fontWeight="bold" fontSize="13">
                2. DUAL-AXIS COMBOS (92%)
              </text>
              <text x="440" y="298" textAnchor="middle" fill="#34d399" fontWeight="bold" fontSize="13">
                3. DECLUTTERING &amp; ZERO BASELINES (96%)
              </text>
              <text x="140" y="165" fill="#fbbf24" fontWeight="bold" fontSize="13">
                4. IN-CELL SPARKLINES (90%)
              </text>
            </svg>
          </div>
          <p className="text-xs text-slate-400 text-center italic">
            Figure 8.1: Master Visual Storytelling Competency Radar. Evaluates precision in chart selection, secondary axis calibration, decluttering, and in-cell sparkline trends.
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
                Explore the candidate evaluation scorecard below or download the master module workbook to practice in Microsoft Excel.
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
            fileUrl={sampleWorkbookUrl}
            sheetName="Topic8"
            title="Module 1.4 Assessment Candidate Scorecard (Question ID, Candidate Name, Chart Domain, Design Score, Accuracy Score, Total Score, Grade)"
            rowsPerPage={10}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: 20 COMPREHENSIVE REAL-WORLD ASSESSMENT SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-amber-400">🏢</span> 20 Real-World Assessment &amp; Visual Defense Cases
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                20 practical evaluation scenarios detailing visual integrity fixes, dual-axis debugging, sparkline integration, and capstone defense scores.
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
                  <th className="py-3 px-3">Candidate &amp; Organization</th>
                  <th className="py-3 px-3">Evaluation Case &amp; Problem</th>
                  <th className="py-3 px-3">Applied Remediation</th>
                  <th className="py-3 px-3">Final Score</th>
                  <th className="py-3 px-3">Certification Distinction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-101</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Swadeep Banerjee (Barrackpore HQ)</td>
                  <td className="py-2.5 px-3 text-sky-300">4-Visual Executive Defense</td>
                  <td className="py-2.5 px-3 text-emerald-400">Zero baseline + dynamic cell-linked titles</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">98 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Gold Medal Visual Excellence.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-102</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Tuhina Mukherjee (Shyamnagar Plant)</td>
                  <td className="py-2.5 px-3 text-sky-300">Truncated Axis Exaggeration</td>
                  <td className="py-2.5 px-3 text-emerald-400">Reset min axis bound to 0</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">94 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Certified Visual Integrity Analyst.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-103</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Abhronila Das (Ichapur Heavy Engg)</td>
                  <td className="py-2.5 px-3 text-sky-300">Invisible Flat Margin Series</td>
                  <td className="py-2.5 px-3 text-emerald-400">Mapped Margin % to Secondary Y-Axis</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">92 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Dashboard Architecture Specialist.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-104</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Debangshu Roy (Naihati Logistics)</td>
                  <td className="py-2.5 px-3 text-sky-300">High Cognitive Load in Ledger</td>
                  <td className="py-2.5 px-3 text-emerald-400">35-Row In-Cell Sparkline Tracker</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">90 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Corporate Reporting Analyst.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-105</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Ananya Sen (Salt Lake Tech)</td>
                  <td className="py-2.5 px-3 text-sky-300">Floating Unaligned Dashboard Widgets</td>
                  <td className="py-2.5 px-3 text-emerald-400">Alt+Drag magnetic grid snapping</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">96 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Executive Dashboard Architect.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-106</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Saugata Paul (Siliguri Tea Trade)</td>
                  <td className="py-2.5 px-3 text-sky-300">Monsoon Supply Dip Noise</td>
                  <td className="py-2.5 px-3 text-emerald-400">7-Day Moving Average trendline</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">91 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Supply Chain Visual Analyst.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-107</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Sourav Das (Durgapur Steel Mill)</td>
                  <td className="py-2.5 px-3 text-sky-300">Unsorted Equipment Downtime</td>
                  <td className="py-2.5 px-3 text-emerald-400">Pareto Combo Chart (80/20 rule)</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">95 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Plant Maintenance Analyst.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-108</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Riya Dutta (Asansol Energy Grid)</td>
                  <td className="py-2.5 px-3 text-sky-300">Ambiguous Multi-Slice Pie</td>
                  <td className="py-2.5 px-3 text-emerald-400">Doughnut Chart with Center Total text</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">93 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Energy Systems Analyst.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-109</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Subham Ghosh (Howrah Freight)</td>
                  <td className="py-2.5 px-3 text-sky-300">Truncated Label Text in Columns</td>
                  <td className="py-2.5 px-3 text-emerald-400">Horizontal Bar Chart orientation</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">89 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Freight Terminal Specialist.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-110</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Priyanka Roy (Haldia Refinery)</td>
                  <td className="py-2.5 px-3 text-sky-300">Cluttered Chart Junk in Cockpit</td>
                  <td className="py-2.5 px-3 text-emerald-400">Executive Dark Dashboard Theme</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">97 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Refinery Operations Specialist.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-111</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Amitava Ray (Malda Mango Co-Op)</td>
                  <td className="py-2.5 px-3 text-sky-300">Unclear Crop Yield Breakdown</td>
                  <td className="py-2.5 px-3 text-emerald-400">Stacked Column Chart with data callouts</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">90 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Agricultural Data Specialist.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-112</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Sneha Bose (Midnapore Hospital)</td>
                  <td className="py-2.5 px-3 text-sky-300">Raw Bed Count Comparison Failure</td>
                  <td className="py-2.5 px-3 text-emerald-400">100% Normalized Stacked Bar</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">94 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Healthcare Analytics Specialist.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-113</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Bikramjit Das (Kharagpur Campus)</td>
                  <td className="py-2.5 px-3 text-sky-300">Legend Bouncing Cognitive Friction</td>
                  <td className="py-2.5 px-3 text-emerald-400">Direct data labels above bars</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">96 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Academic Analytics Specialist.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-114</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Sanchari Pal (Hooghly Jute Mill)</td>
                  <td className="py-2.5 px-3 text-sky-300">Bulky Charts Crowding Table</td>
                  <td className="py-2.5 px-3 text-emerald-400">In-Cell Text Sparklines (`=REPT`)</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">92 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Text Sparkline Specialist.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-115</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Arindam Kar (Burdwan Retail)</td>
                  <td className="py-2.5 px-3 text-sky-300">Basket Size Correlation Overlap</td>
                  <td className="py-2.5 px-3 text-emerald-400">2D Scatter Chart with trendline</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">88 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Retail Customer Analytics Specialist.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-116</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Tamalika De (Purulia Solar Project)</td>
                  <td className="py-2.5 px-3 text-sky-300">Solar vs Grid Scale Mismatch</td>
                  <td className="py-2.5 px-3 text-emerald-400">Dual-Axis Combo Chart + Target Band</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">93 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Clean Energy Analytics Specialist.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-117</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kakali Roy (Bankura Terracotta)</td>
                  <td className="py-2.5 px-3 text-sky-300">Export Market Focal Point Loss</td>
                  <td className="py-2.5 px-3 text-emerald-400">Doughnut + 10% Exploded USA Slice</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">91 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Craft Export Visual Analyst.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-118</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Souvik Ghosal (Jalpaiguri Estate)</td>
                  <td className="py-2.5 px-3 text-sky-300">Uncertain Quality Variance</td>
                  <td className="py-2.5 px-3 text-emerald-400">Line Chart with Error Bars (5% bounds)</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">95 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Quality Assurance Visual Specialist.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-119</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Tanusree Seal (Darjeeling Hotel)</td>
                  <td className="py-2.5 px-3 text-sky-300">Revenue vs Occupancy Confusion</td>
                  <td className="py-2.5 px-3 text-emerald-400">Combo Chart (Columns + Occupancy Line)</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">96 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Hospitality Revenue Specialist.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">QUIZ-120</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Rajat Mukherjee (Cooch Behar Bank)</td>
                  <td className="py-2.5 px-3 text-sky-300">5-Year Portfolio Trajectory Defense</td>
                  <td className="py-2.5 px-3 text-emerald-400">Stacked Area Chart + Cell-Linked Title</td>
                  <td className="py-2.5 px-3 text-purple-300 font-bold">98 / 100</td>
                  <td className="py-2.5 px-3 text-slate-300">Financial Modeling Capstone Winner.</td>
                </tr>
              </tbody>
            </table>
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
              <span className="text-purple-400">🛠️</span> Step-by-Step Assessment Protocol
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Exam Workflow
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-purple-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-950 border border-purple-700 text-purple-300 flex items-center justify-center text-xs">1</span>
                Step 1: Inspect Data Archetype &amp; Dimensionality
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Determine whether your metric is discrete categorical (use Column/Bar), continuous time series (use Line), or proportional part-to-whole (use Doughnut).
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-sky-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center text-xs">2</span>
                Step 2: Enforce Zero Baselines &amp; Scale Harmonization
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Right-click the primary vertical axis to confirm the minimum bound is explicitly set to 0. For secondary axes, calibrate max bounds so line points do not collide with column tops.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center justify-center text-xs">3</span>
                Step 3: Remove Redundant Visual Fluff (Chart Junk)
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Delete unnecessary background fills, soft-color the gridlines, remove floating legends in favor of direct series labels, and snap the chart corners to the worksheet grid using <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Alt</kbd>.
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
              <span className="text-rose-400">⚠️</span> Visual Storytelling Assessment Penalties
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Exam Penalties
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Evaluation Deficiency</th>
                  <th className="py-3 px-4">Technical Impact</th>
                  <th className="py-3 px-4">Point Penalty</th>
                  <th className="py-3 px-4">Remediation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">3D Perspective Tilt</td>
                  <td className="py-3 px-4">Using 3D Column or Pie visuals that distort proportions.</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">-15 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Use clean flat 2D visuals exclusively.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">Truncated Axis Baseline</td>
                  <td className="py-3 px-4">Starting bar chart vertical axes above zero.</td>
                  <td className="py-3 px-4 text-amber-400 font-bold">-10 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Format Axis Bounds Minimum to 0.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">Over-Slices in Pie Charts</td>
                  <td className="py-3 px-4">Plotting more than 5 slices in a single pie/doughnut.</td>
                  <td className="py-3 px-4 text-purple-400 font-bold">-10 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Aggregate into Top 4 + 'Other' or switch to Bar chart.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">Unanchored Slicers</td>
                  <td className="py-3 px-4">Leaving slicers and charts floating without alignment.</td>
                  <td className="py-3 px-4 text-sky-400 font-bold">-10 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Snap to grid using the Alt key and group objects.</td>
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
              <span className="text-purple-400">💡</span> Final Architect Tips &amp; Keyboard Accelerators
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Exam Strategies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> Tip 1: Always Convert to Tables First (Ctrl+T)
              </div>
              <p className="text-slate-300 leading-relaxed">
                Creating charts from structured tables ensures that new rows automatically populate the chart without editing series ranges.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-sky-300 flex items-center gap-2">
                <span>⚡</span> Tip 2: Copy-Paste Chart Formats (Alt+E+S)
              </div>
              <p className="text-slate-300 leading-relaxed">
                Save hours by designing one chart perfectly, copying it (<kbd className="px-1 py-0.5 rounded bg-slate-800 font-mono text-xs">Ctrl+C</kbd>), selecting another chart, and applying Paste Special Formats.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span>⚡</span> Tip 3: Direct Data Label Callouts
              </div>
              <p className="text-slate-300 leading-relaxed">
                Eliminate floating legends on line charts and add data labels directly to the final endpoint point to accelerate executive comprehension.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-300 flex items-center gap-2">
                <span>⚡</span> Tip 4: Magnetic Grid Alignment via Alt
              </div>
              <p className="text-slate-300 leading-relaxed">
                Hold the <kbd className="px-1 py-0.5 rounded bg-slate-800 font-mono text-xs">Alt</kbd> key when positioning chart containers to snap edges to worksheet gridlines.
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
              Exam Reflection
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-purple-400">💭</span> Question 1: How does visual restraint demonstrate executive professionalism?
              </h3>
              <p className="leading-relaxed">
                Why do leading corporate financial dashboards rely on clean slate backgrounds and single-accent alerts rather than flashy 3D graphics?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">💭</span> Question 2: Why are horizontal bar charts superior for 10 regional branch rankings?
              </h3>
              <p className="leading-relaxed">
                How does reading horizontal text without diagonal tilts reduce cognitive strain for leadership during executive board reviews?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 3: What is the ultimate role of an Excel Data Visualizer?
              </h3>
              <p className="leading-relaxed">
                How does transforming raw numbers into immediate, actionable visual intelligence empower leadership to make high-stakes corporate decisions with confidence?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 8: Visual Storytelling & Chart Assessment FAQ"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Mastering chart design is not about creating pretty art; it is about building high-speed visual communication bridges between complex data and executive leadership. When your charts are clean, anchored at zero, magnetically aligned, and self-updating via structured tables, you give decision-makers clarity and confidence. Take pride in these visual storytelling skills and carry them forward into your data career."
            }
          />
        </div>
      </div>
    </div>
  );
}
