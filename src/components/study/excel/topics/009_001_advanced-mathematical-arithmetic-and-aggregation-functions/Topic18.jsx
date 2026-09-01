"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/009_001_advanced_mathematical_arithmetic_and_aggregation_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic18_files/topic18_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic18() {
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
              🔄 Repetition Combinations · Topic 18
            </span>
            <span className="px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              Multiset Combination Selection
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Level 4: Analyze
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent leading-snug">
            COMBINA Function — Combinations With Repetition & Multiset Allocations
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            The <code className="text-purple-300 font-mono">COMBINA</code> function calculates the number of combinations for selecting <code className="text-sky-300 font-mono">k</code> items from <code className="text-teal-300 font-mono">n</code> types with repetition allowed: <code className="text-emerald-300 font-mono font-bold">COMBINA(n, k) = COMBIN(n + k - 1, k)</code>. Duplicate selections are permitted, allowing <code className="text-sky-300 font-mono">k &gt; n</code>.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Multiset Equivalence:</strong> COMBINA(3, 2) = COMBIN(4, 2) = 6</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Allows Duplicate Picks:</strong> {"{A, A}"} is a valid combination</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>k &gt; n Permitted:</strong> Select 5 items from 3 types</span>
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
              Multiset Signature
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-purple-300 space-y-3">
            <div className="text-slate-500">// Basic COMBINA Signature</div>
            <div className="text-white font-bold">
              =COMBINA(<span className="text-teal-300">number</span>, <span className="text-sky-300">number_chosen</span>)
            </div>
            <div className="text-slate-400 text-xs font-sans pt-1">
              • <strong>number:</strong> Required. Total available item types (n ≥ 0).<br />
              • <strong>number_chosen:</strong> Required. Number of items to select with replacement (k ≥ 0).
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
            <span className="text-emerald-400">🔬</span> Mathematical Mechanics: Stars and Bars Theorem
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              COMBINA applies the Stars and Bars theorem to count multiset distributions:
            </p>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-amber-300 space-y-2">
              <div>Stars and Bars Identity: COMBINA(n, k) = COMBIN(n + k - 1, k)</div>
              <div className="text-slate-400 text-xs font-sans">Example for 3 types choose 2:</div>
              <div className="text-emerald-400">COMBINA(3, 2) = COMBIN(3 + 2 - 1, 2) = COMBIN(4, 2) = 6 combinations</div>
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
            <span className="text-indigo-400">📐</span> Visual Multiset Selection Pipeline
          </h2>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center">
            <svg viewBox="0 0 720 200" className="w-full max-w-3xl h-auto font-sans">
              <g transform="translate(30, 40)">
                <rect width="180" height="120" rx="12" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
                <text x="90" y="32" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold font-mono">Types: n = 4</text>
                <text x="90" y="65" textAnchor="middle" fill="#F8FAFC" className="text-sm font-mono">Order Size: k = 3</text>
                <text x="90" y="90" textAnchor="middle" fill="#94A3B8" className="text-xs">Repetition allowed</text>
              </g>

              <path d="M 220 100 L 270 100" stroke="#34D399" strokeWidth="3" markerEnd="url(#arrow)" />

              <g transform="translate(285, 40)">
                <rect width="180" height="120" rx="12" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
                <text x="90" y="32" textAnchor="middle" fill="#34D399" className="text-xs font-bold font-mono">COMBINA Engine</text>
                <text x="90" y="68" textAnchor="middle" fill="#FFFFFF" className="text-2xl font-extrabold font-mono">20</text>
                <text x="90" y="92" textAnchor="middle" fill="#A7F3D0" className="text-xs">Unique Multiset Options</text>
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
                Explore COMBINA formulas live in the master workbook grid.
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
            sheetName="Topic18"
            title="Topic 18: COMBINA Function Practice Grid"
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
              <span className="px-2.5 py-1 rounded bg-sky-950 text-sky-300 text-xs font-bold">Scenario 1: Product Customizer Flavor Bundling</span>
              <h3 className="text-base font-bold text-white">Naihati Confectionery Multi-Scoop Customizer</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Calculate unique 3-scoop order combinations from 4 flavor options allowing duplicate scoops in D3.
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-purple-300">
                =COMBINA(4, 3)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 text-xs font-bold">Scenario 2: Capital Budget Point Allocation</span>
              <h3 className="text-base font-bold text-white">Barrackpore Investment Capital Allocation</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Calculate total ways to allocate 5 risk capital points across 3 asset buckets in D3.
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-purple-300">
                =COMBINA(3, 5)
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
              <span className="text-sky-400 font-bold">Step 1: Identify n and k</span>
              <p>Pass item types (e.g. 3) and selection count (e.g. 2).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold">Step 2: Type COMBINA Formula</span>
              <p>Type <code className="text-emerald-300 font-mono">=COMBINA(3, 2)</code> in cell.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Evaluate Multiset Combination</span>
              <p>Excel calculates COMBIN(3 + 2 - 1, 2) = COMBIN(4, 2) and returns 6.</p>
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
                  <td className="py-3 pr-4 text-rose-400 font-bold">#NUM! Error</td>
                  <td className="py-3 px-4 font-sans">Negative numbers passed to COMBINA.</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Ensure arguments are non-negative integers. Note that k &gt; n is completely valid!</td>
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
              <span className="text-sky-400 font-bold">k &gt; n is Allowed</span>
              <p className="text-slate-300">Unlike COMBIN, COMBINA allows choosing more items (k) than available types (n) because items are replaced after each pick.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold">Stars & Bars Equivalence</span>
              <p className="text-slate-300"><code className="text-emerald-300 font-mono font-bold">COMBINA(n, k) = COMBIN(n + k - 1, k)</code> is the exact formula wrapper.</p>
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
            <p>• <strong>Think about:</strong> Why does <code className="text-purple-300 font-mono">=COMBINA(3, 5)</code> return <code className="text-emerald-300 font-mono">21</code> while <code className="text-sky-300 font-mono">=COMBIN(3, 5)</code> returns #NUM!?</p>
            <p>• <strong>Observe carefully:</strong> How does allowing duplicate item selections change product customizers in retail e-commerce?</p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 18: COMBINA Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            topicName="COMBINA Function"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"COMBINA calculates combinations WITH repetition allowed. Remember that COMBINA(n, k) = COMBIN(n + k - 1, k), and unlike COMBIN, selecting k > n items is completely valid!"}
          />
        </div>
      </div>
    </div>
  );
}
