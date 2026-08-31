"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/002_004_statistical_functions_for_data_analysis_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic38_files/topic38_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic38() {
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
    link.download = "statistical_functions_practice.xlsx";
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
              🏆 Module Capstone · Topic 38
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              Statistical Mastery &amp; Hypothesis Assessment
            </span>
            <span className="px-3 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-300 text-xs font-semibold">
              Bloom's Level 6: Evaluate
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-emerald-300 bg-clip-text text-transparent leading-tight">
            Test Your Skill: Statistical Functions For Data Analysis
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Welcome to the final capstone evaluation for <strong>Module 2.4: Statistical Functions for Data Analysis</strong>. 
            This assessment evaluates your proficiency in calculating sample vs population variance (<code className="text-purple-300 font-mono">STDEV.S</code>), 
            detecting Tukey outliers via Interquartile Ranges (<code className="text-sky-300 font-mono">QUARTILE.INC</code>), 
            quantifying bivariate correlation (<code className="text-teal-300 font-mono">CORREL</code>), and generating least-squares linear forecasts (<code className="text-amber-300 font-mono">FORECAST.LINEAR</code>).
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>100-Point Rubric:</strong> Dispersion, ranking, forecasting &amp; outliers</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Quantitative Specialist:</strong> Distinction awarded for scores &ge; 85%</span>
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
              <span className="text-purple-400">⚡</span> Statistical Function Engine Anatomy
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Formula Specs
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Statistical Domain</th>
                  <th className="py-3 px-4">Core Function Syntax</th>
                  <th className="py-3 px-4">Mathematical Definition</th>
                  <th className="py-3 px-4">Operational Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">1. Sample Dispersion</td>
                  <td className="py-3 px-4 font-mono text-sky-300">=STDEV.S(DataRange)</td>
                  <td className="py-3 px-4 text-slate-300">&radic;[&Sigma;(x - x&#772;)&sup2; / (n - 1)]</td>
                  <td className="py-3 px-4">Unbiased sample standard deviation with Bessel's correction.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">2. Pearson Correlation</td>
                  <td className="py-3 px-4 font-mono text-sky-300">=CORREL(Array1, Array2)</td>
                  <td className="py-3 px-4 text-slate-300">Cov(X,Y) / (&sigma;x &middot; &sigma;y)</td>
                  <td className="py-3 px-4">Measures strength and direction of linear association [-1 to +1].</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-teal-300">3. Tukey Outlier Fences</td>
                  <td className="py-3 px-4 font-mono text-sky-300">=Q3 + 1.5 * (Q3 - Q1)</td>
                  <td className="py-3 px-4 text-slate-300">Upper Fence = Q3 + 1.5 &times; IQR</td>
                  <td className="py-3 px-4">Identifies extreme statistical anomalies resistant to skewness.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">4. Linear Forecasting</td>
                  <td className="py-3 px-4 font-mono text-sky-300">=FORECAST.LINEAR(x, Y, X)</td>
                  <td className="py-3 px-4 text-slate-300">y&#770; = a + bx (Least Squares)</td>
                  <td className="py-3 px-4">Projects future revenue based on historical trendlines.</td>
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
              <span className="text-sky-400">🔬</span> Conceptual Architecture: Distribution Shape &amp; Bias
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Statistical Theory
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-purple-300 text-base flex items-center gap-2">
                <span>1.</span> Bessel's Correction &amp; Sample Degrees of Freedom
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Sample data naturally underestimates true population spread because samples cluster closer to the sample mean than the population mean. Dividing by <code className="text-purple-300 font-mono">n - 1</code> in <code className="text-purple-300 font-mono">STDEV.S</code> mathematically removes this bias.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-sky-300 text-base flex items-center gap-2">
                <span>2.</span> The Mean vs Median Dilemma in Skewed Data
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                A single billionaire entering a room of 100 students raises the average income to ₹10 Crore, while the median remains ₹25,000. For compensation and pricing datasets, the <code className="text-sky-300 font-mono">MEDIAN</code> provides the true central reality.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-teal-300 text-base flex items-center gap-2">
                <span>3.</span> Pearson Correlation vs Causation
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                <code className="text-teal-300 font-mono">CORREL</code> quantifies linear association, not causation. A correlation of +0.92 between marketing spend and sales proves co-movement, requiring domain validation to establish causal mechanisms.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-amber-300 text-base flex items-center gap-2">
                <span>4.</span> Tukey's 1.5*IQR Non-Parametric Fences
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Unlike Z-Scores (which assume a normal Gaussian bell curve), Tukey's IQR fences operate on percentiles, making them robust for identifying fraud, billing anomalies, and operational outliers across all distribution shapes.
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
              <span className="text-emerald-400">📐</span> Normal Distribution Curve &amp; Statistical Fences
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Gaussian Curve
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg
              viewBox="0 0 880 320"
              className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans"
            >
              <defs>
                <linearGradient id="bellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Baseline */}
              <line x1="60" y1="260" x2="820" y2="260" stroke="#475569" strokeWidth="2" />

              {/* Bell Curve Path */}
              <path
                d="M 80,258 Q 240,256 340,160 Q 400,90 440,50 Q 480,90 540,160 Q 640,256 800,258 Z"
                fill="url(#bellGrad)"
                stroke="#38bdf8"
                strokeWidth="2.5"
              />

              {/* Center Mean Line */}
              <line x1="440" y1="50" x2="440" y2="260" stroke="#a855f7" strokeWidth="2" strokeDasharray="4,4" />
              <text x="440" y="40" textAnchor="middle" fill="#c084fc" fontWeight="bold" fontSize="12">
                Mean (&mu;) / Median
              </text>

              {/* -1 Sigma, +1 Sigma */}
              <line x1="360" y1="140" x2="360" y2="260" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="520" y1="140" x2="520" y2="260" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="360" y="278" textAnchor="middle" fill="#94a3b8" fontSize="11">-1&sigma; (Q1)</text>
              <text x="520" y="278" textAnchor="middle" fill="#94a3b8" fontSize="11">+1&sigma; (Q3)</text>

              {/* -2 Sigma, +2 Sigma */}
              <line x1="260" y1="220" x2="260" y2="260" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="620" y1="220" x2="620" y2="260" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="260" y="278" textAnchor="middle" fill="#34d399" fontSize="11">-2&sigma;</text>
              <text x="620" y="278" textAnchor="middle" fill="#34d399" fontSize="11">+2&sigma;</text>

              {/* Outlier Fences (+3 Sigma) */}
              <line x1="160" y1="250" x2="160" y2="260" stroke="#f43f5e" strokeWidth="2" />
              <line x1="720" y1="250" x2="720" y2="260" stroke="#f43f5e" strokeWidth="2" />
              <text x="160" y="278" textAnchor="middle" fill="#f43f5e" fontWeight="bold" fontSize="11">Lower Outlier Fence</text>
              <text x="720" y="278" textAnchor="middle" fill="#f43f5e" fontWeight="bold" fontSize="11">Upper Outlier Fence</text>

              {/* Central 68.2% & 95.4% annotations */}
              <text x="440" y="180" textAnchor="middle" fill="#e2e8f0" fontWeight="bold" fontSize="12">
                68.2% within &plusmn;1&sigma; (IQR Core)
              </text>
              <text x="440" y="210" textAnchor="middle" fill="#94a3b8" fontSize="11">
                95.4% within &plusmn;2&sigma; | 99.7% within &plusmn;3&sigma;
              </text>
            </svg>
          </div>
          <p className="text-xs text-slate-400 text-center italic">
            Figure 38.1: Gaussian Distribution Anatomy. Illustrates standard deviation bands (&plusmn;1&sigma;, &plusmn;2&sigma;, &plusmn;3&sigma;) and Tukey outlier fence boundaries.
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
                Explore the statistical interpretation model below or download the workbook to practice in Microsoft Excel.
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
            fileModule={sampleWorkbookUrl}
            sheetName="Topic38_Test_Your_Skill"
            title="Statistical Model Evaluation Sheet (Record ID, Location, Units, Revenue, Z-Score, Outlier Flag, Forecast)"
            rowsPerPage={10}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-amber-400">🏢</span> Real-World Assessment Scenarios
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Evaluation Cases
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Scenario 1 · Master Defense</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Swadeep Banerjee: 98/100 Statistical Defense
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Candidate <strong>Swadeep Banerjee</strong> presents an econometric risk model incorporating sample standard deviation, IQR outlier fences, and Pearson correlation coefficients, earning the Gold Medal in Quantitative Analytics.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Score: 98/100 → Certified Quantitative Modeling Specialist
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Scenario 2 · Tukey Anomaly Detection</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Tuhina Mukherjee: 94/100 Outlier Remediation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Candidate <strong>Tuhina Mukherjee</strong> diagnoses a corrupted plant maintenance ledger where rogue data entries skewed the mean, successfully isolating anomalies using <code className="text-sky-300 font-mono">=QUARTILE.INC</code> and 1.5&times;IQR fences.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-sky-300">
                Score: 94/100 → Certified Data Quality Specialist
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Scenario 3 · Linear Regression Modeling</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Abhronila Das: 92/100 Revenue Forecasting
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Candidate <strong>Abhronila Das</strong> models a multi-quarter revenue projection using <code className="text-teal-300 font-mono">=FORECAST.LINEAR</code> and evaluates trend reliability via <code className="text-teal-300 font-mono">=CORREL</code> (r = 0.94), providing accurate Q4 guidance.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Score: 92/100 → Certified Financial Forecasting Specialist
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Scenario 4 · Multimodal Distribution Analysis</span>
                <span className="text-xs font-mono text-slate-400">Naihati Logistics</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Debangshu Roy: 90/100 Multimodal Spill
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Candidate <strong>Debangshu Roy</strong> leverages Excel 365 dynamic array function <code className="text-amber-300 font-mono">=MODE.MULT</code> to identify dual peak delivery volume cycles across logistics routes.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-amber-300">
                Score: 90/100 → Certified Operations Research Analyst
              </div>
            </div>
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
              <span className="text-purple-400">🛠️</span> Step-by-Step Statistical Analysis Workflow
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Exam Protocol
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-purple-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-950 border border-purple-700 text-purple-300 flex items-center justify-center text-xs">1</span>
                Step 1: Check Distribution Shape &amp; Skewness
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Compute both <code className="text-purple-300 font-mono">=AVERAGE(...)</code> and <code className="text-purple-300 font-mono">=MEDIAN(...)</code>. If the mean substantially deviates from the median, flag the dataset as skewed and utilize median-based metrics.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-sky-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center text-xs">2</span>
                Step 2: Construct Tukey Outlier Fences
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Calculate <code className="text-sky-300 font-mono">Q1 = QUARTILE.INC(Data, 1)</code> and <code className="text-sky-300 font-mono">Q3 = QUARTILE.INC(Data, 3)</code>. Define Upper Fence as <code className="text-sky-300 font-mono">Q3 + 1.5*(Q3 - Q1)</code> to isolate anomalies.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center justify-center text-xs">3</span>
                Step 3: Execute Least-Squares Trend Projection
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Validate correlation with <code className="text-emerald-300 font-mono">=CORREL(X, Y)</code>. If |r| &ge; 0.70, apply <code className="text-emerald-300 font-mono">=FORECAST.LINEAR(New_X, Known_Y, Known_X)</code> to project future performance.
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
              <span className="text-rose-400">⚠️</span> Statistical Analysis Assessment Penalties
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
                  <th className="py-3 px-4">Mathematical Impact</th>
                  <th className="py-3 px-4">Point Penalty</th>
                  <th className="py-3 px-4">Remediation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">Using STDEV.P on Samples</td>
                  <td className="py-3 px-4">Dividing by N instead of (n - 1) produces biased underestimate of variance.</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">-15 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Use STDEV.S for all sample datasets.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">Reporting Mean on Skewed Data</td>
                  <td className="py-3 px-4">Mean is distorted by extreme outliers, misleading leadership.</td>
                  <td className="py-3 px-4 text-amber-400 font-bold">-15 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Report MEDIAN for skewed distributions.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">CORREL on Zero-Variance Array</td>
                  <td className="py-3 px-4">Produces #DIV/0! because division by zero standard deviation occurs.</td>
                  <td className="py-3 px-4 text-purple-400 font-bold">-10 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Validate data variance before running CORREL.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">Using COUNTA on Numeric Range</td>
                  <td className="py-3 px-4">Counts text headers or error strings, corrupting sample size (n).</td>
                  <td className="py-3 px-4 text-sky-400 font-bold">-10 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Use COUNT for numeric sample sizes.</td>
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
                <span>⚡</span> Tip 1: Top 5 Sum via Array Constants
              </div>
              <p className="text-slate-300 leading-relaxed">
                Sum the top 5 values instantly using <code className="text-purple-300 font-mono">=SUM(LARGE(Range, &#123;1,2,3,4,5&#125;))</code> without auxiliary columns.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-sky-300 flex items-center gap-2">
                <span>⚡</span> Tip 2: Lock Statistical Ranges via F4
              </div>
              <p className="text-slate-300 leading-relaxed">
                Always press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-xs">F4</kbd> when defining reference population ranges to prevent floating coordinate shifts.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span>⚡</span> Tip 3: Evaluate Sub-Formulas via F9
              </div>
              <p className="text-slate-300 leading-relaxed">
                Highlight statistical sub-expressions in the formula bar and press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-xs">F9</kbd> to inspect evaluated arrays.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-300 flex items-center gap-2">
                <span>⚡</span> Tip 4: Ignore Errors via AGGREGATE
              </div>
              <p className="text-slate-300 leading-relaxed">
                Use <code className="text-amber-300 font-mono">=AGGREGATE(4, 6, Range)</code> to compute statistical maximums while automatically bypassing #N/A and #VALUE! errors.
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
                <span className="text-purple-400">💭</span> Question 1: Why is statistical honesty essential in executive analytics?
              </h3>
              <p className="leading-relaxed">
                How does choosing the correct metric (Median vs Mean, STDEV.S vs STDEV.P) prevent costly corporate mismanagement?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">💭</span> Question 2: Why are non-parametric Tukey fences superior to standard Z-scores for fraud detection?
              </h3>
              <p className="leading-relaxed">
                When real-world financial transaction distributions are non-Gaussian and heavily skewed, why does IQR quartile fencing outperform 3-sigma thresholds?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 3: What is the ultimate objective of statistical modeling in Excel?
              </h3>
              <p className="leading-relaxed">
                How does transforming noisy raw datasets into rigorous probabilistic and quantitative intelligence empower leadership to act with confidence?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 38: Statistical Functions Assessment FAQ"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Statistical rigor is the foundation of high-stakes corporate modeling. Never accept summary numbers blindly: always check distribution shape, clean anomalies with IQR fences, and use unbiased sample formulas like STDEV.S. When your statistical foundation is bulletproof, executive leadership can trust your insights completely."
            }
          />
        </div>
      </div>
    </div>
  );
}
