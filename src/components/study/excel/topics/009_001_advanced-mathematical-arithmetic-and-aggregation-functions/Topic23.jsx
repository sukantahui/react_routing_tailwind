"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/009_001_advanced_mathematical_arithmetic_and_aggregation_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic23_files/topic23_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic23() {
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
    link.download = "009_001_advanced_mathematical_master.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-purple-500/30 selection:text-purple-200">
      <style>{`
        @keyframes fadeInSlide {
          from { transform: translateY(18px); opacity: 0.9; }
          to { transform: translateY(0); opacity: 1; }
        }
        .reveal-section {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* =========================================================================
            SECTION 1: HERO HEADER & EXECUTIVE OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ➖ Difference of Squares Engine · Topic 23
            </span>
            <span className="px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              Sum of Difference of Squares
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Level 4: Analyze
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent leading-snug">
            SUMX2MY2 Function — Sum of Difference of Squares & Vector Variances
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            The <code className="text-purple-300 font-mono">SUMX2MY2</code> function calculates the sum of the difference of squares between corresponding elements in two arrays: <code className="text-emerald-300 font-mono font-bold">SUM(x² - y²)</code>. It factorizes algebraically into <code className="text-teal-300 font-mono">SUM((x - y)(x + y))</code>, modeling kinetic energy differentials and orthogonal vector variances.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Difference of Squares:</strong> SUMX2MY2({"{"}4, 5{"}"}, {"{"}3, 4{"}"}) = 16</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Algebraic Identity:</strong> x² - y² = (x - y)(x + y)</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Dimension Equality:</strong> Requires arrays of identical dimensions</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA ANATOMY & SYNTAX CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">⚡</span> Formula Anatomy & Signature
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Difference of Squares Signature
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-purple-300 space-y-3">
            <div className="text-slate-500">// Basic SUMX2MY2 Signature</div>
            <div className="text-white font-bold">
              =SUMX2MY2(<span className="text-teal-300">array_x</span>, <span className="text-sky-300">array_y</span>)
            </div>
            <div className="text-slate-400 text-xs font-sans pt-1">
              • <strong>array_x:</strong> Required. First array, range, or vector.<br />
              • <strong>array_y:</strong> Required. Second array or range. Must have identical dimensions to array_x.
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-emerald-400">🔬</span> Mathematical Mechanics: Difference of Squares Summation
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              SUMX2MY2 evaluates paired squared differences:
            </p>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-amber-300 space-y-2">
              <div>Sum Formula: SUM(x² - y²) = (x1² - y1²) + (x2² - y2²) + ... + (xk² - yk²)</div>
              <div className="text-slate-400 text-xs font-sans">Example for array_x={"{"}4, 5{"}"} and array_y={"{"}3, 4{"}"}:</div>
              <div className="text-emerald-400">(4² - 3²) + (5² - 4²) = (16 - 9) + (25 - 16) = 7 + 9 = 16</div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">📐</span> Visual Paired Difference Pipeline
          </h2>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center">
            <svg viewBox="0 0 720 200" className="w-full max-w-3xl h-auto font-sans">
              <g transform="translate(30, 40)">
                <rect width="180" height="120" rx="12" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
                <text x="90" y="32" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold font-mono">array_x: {"{"}4, 5{"}"}</text>
                <text x="90" y="65" textAnchor="middle" fill="#F8FAFC" className="text-sm font-mono">array_y: {"{"}3, 4{"}"}</text>
                <text x="90" y="90" textAnchor="middle" fill="#94A3B8" className="text-xs">(4²-3²) + (5²-4²)</text>
              </g>

              <path d="M 220 100 L 270 100" stroke="#34D399" strokeWidth="3" markerEnd="url(#arrow)" />

              <g transform="translate(285, 40)">
                <rect width="180" height="120" rx="12" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
                <text x="90" y="32" textAnchor="middle" fill="#34D399" className="text-xs font-bold font-mono">SUMX2MY2 Engine</text>
                <text x="90" y="68" textAnchor="middle" fill="#FFFFFF" className="text-2xl font-extrabold font-mono">16</text>
                <text x="90" y="92" textAnchor="middle" fill="#A7F3D0" className="text-xs">Sum of Difference of Squares</text>
              </g>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LIVE EXCEL FILE LOADER & DOWNLOAD PORTAL
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-emerald-400">📥</span> Interactive Practice Sheet
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore SUMX2MY2 formulas live in the master workbook grid.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download Master Practice Workbook (.xlsx)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic23"
            title="Topic 23: SUMX2MY2 Function Practice Grid"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-amber-400">🏢</span> Real-World Business Scenarios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="px-2.5 py-1 rounded bg-sky-950 text-sky-300 text-xs font-bold">Scenario 1: Energy & Power Variance Comparison</span>
              <h3 className="text-base font-bold text-white">Naihati Factory Power Grid Squared Variance</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Calculate total kinetic power squared variance differential between baseline x in D3:D7 and actual y in E3:E7.
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-purple-300">
                =SUMX2MY2(D3:D7, E3:E7)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 text-xs font-bold">Scenario 2: Pythagorean Triple Distance Verification</span>
              <h3 className="text-base font-bold text-white">Barrackpore Surveying Hypotenuse Differential</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Calculate hypotenuse squared differential $c^2 - b^2$ for hypotenuse vector x and side vector y.
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-purple-300">
                =SUMX2MY2(D3:D7, E3:E7)
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-sky-400">📝</span> Step-by-Step Practical Walkthrough
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold">Step 1: Identify Paired Array Inputs</span>
              <p>Pass array_x (e.g. {"{"}4, 5{"}"}) and array_y (e.g. {"{"}3, 4{"}"}).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold">Step 2: Type SUMX2MY2 Formula</span>
              <p>Type <code className="text-emerald-300 font-mono font-bold">=SUMX2MY2({"{"}4, 5{"}"}, {"{"}3, 4{"}"})</code> in cell.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Evaluate Difference of Squares Sum</span>
              <p>Excel calculates (16 - 9) + (25 - 16) = 7 + 9 and returns 16.</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: COMMON PITFALLS & TROUBLESHOOTING
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-rose-400">⚠️</span> Error & Troubleshooting Matrix
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Issue</th>
                  <th className="pb-3 px-4">Root Cause</th>
                  <th className="pb-3 pl-4">Fix / Remedy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="py-3 pr-4 text-rose-400 font-bold">#N/A Error</td>
                  <td className="py-3 px-4 font-sans">array_x and array_y have unequal row/column dimensions (e.g. 5 cells vs 4 cells).</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Ensure array_x and array_y have identical cell grid dimensions.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-purple-400">💡</span> Pro Tips & Shortcuts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold">Identical Arrays Yield 0</span>
              <p className="text-slate-300">Passing identical arrays returns <code className="text-sky-300 font-mono font-bold">0</code> because x² - y² = 0 for all elements.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold">Negative Output Permitted</span>
              <p className="text-slate-300">If y &gt; x, the difference of squares produces a negative result (e.g. <code className="text-emerald-300 font-mono">SUMX2MY2({"{"}2{"}"}, {"{"}4{"}"}) = -12</code>).</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC HINT SECTION
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-teal-400">🤔</span> Socratic Analytical Hints
          </h2>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs sm:text-sm text-slate-300">
            <p>• <strong>Think about:</strong> Why does <code className="text-purple-300 font-mono font-bold">=SUMX2MY2({"{"}1, 2, 3{"}"}, {"{"}3, 2, 1{"}"})</code> evaluate to <code className="text-emerald-300 font-mono font-bold">0</code>?</p>
            <p>• <strong>Observe carefully:</strong> How does algebraic factorization $(x - y)(x + y)$ speed up array calculations?</p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 23: SUMX2MY2 Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            topicName="SUMX2MY2 Function"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"SUMX2MY2 calculates paired difference of squares SUM(x² - y²). Remember that arrays must have identical dimensions and identical vectors yield 0!"}
          />
        </div>
      </div>
    </div>
  );
}
