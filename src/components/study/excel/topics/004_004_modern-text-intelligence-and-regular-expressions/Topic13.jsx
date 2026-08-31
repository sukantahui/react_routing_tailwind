"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_004_modern_text_intelligence_and_regular_expressions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic13_files/topic13_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic13() {
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

  // Direct workbook download handler
  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "regex_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-purple-500/30 selection:text-purple-200">
      {/* Scoped CSS Keyframes for Smooth Reveal Animation */}
      <style>{`
        @keyframes fadeInSlide {
          from {
            transform: translateY(18px);
          }
          to {
            transform: translateY(0);
          }
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
              ⚡ Capstone Assessment Lab · Topic 13
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Mastery Verification
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 6: Evaluate & Govern
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Assessment: Advanced Regular Expressions & String Intelligence Lab
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Welcome to the definitive capstone assessment for <strong>Modern Text Intelligence & Regular Expressions</strong>. 
            This comprehensive lab evaluates your practical mastery across all 14 core competencies: 
            anchored pattern matching (<code className="text-purple-300 font-mono">REGEXTEST</code>), 
            multi-group extraction (<code className="text-sky-300 font-mono">REGEXEXTRACT</code> Mode 2), 
            backreference cleansing (<code className="text-emerald-300 font-mono">REGEXREPLACE</code>), 
            2D matrix splitting (<code className="text-amber-300 font-mono">TEXTSPLIT</code>), 
            negative instance slicing (<code className="text-indigo-300 font-mono">TEXTBEFORE/TEXTAFTER</code>), and 
            dynamic array ETL orchestration (<code className="text-fuchsia-300 font-mono">FILTER, BYROW, TOCOL</code>).
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>10 Enterprise Lab Challenges:</strong> Real-world corporate problem sets</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>5-Dimension Competency Rubric:</strong> Rigorous evaluation matrix</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>30 Viva Voce Questions:</strong> Complete technical interview prep</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">⚡</span> The 10 Capstone Assessment Lab Challenges
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Challenge Matrix
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Lab #</th>
                  <th className="py-3 px-4">Challenge Description</th>
                  <th className="py-3 px-4">Target Functions</th>
                  <th className="py-3 px-4">Evaluation Criteria</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-400">Lab 1</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Dual-Field PAN &amp; Corporate Email Filter</td>
                  <td className="py-3 px-4 text-sky-300">FILTER + REGEXTEST</td>
                  <td className="py-3 px-4 font-sans text-emerald-400">Zero non-compliant records spilled.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-400">Lab 2</td>
                  <td className="py-3 px-4 font-sans text-slate-300">2D Matrix Key-Value Splitting</td>
                  <td className="py-3 px-4 text-sky-300">TEXTSPLIT(A2, ": ", " | ")</td>
                  <td className="py-3 px-4 font-sans text-emerald-400">2D matrix generated in 1 formula.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-400">Lab 3</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Negative Instance Directory &amp; Extension Slicing</td>
                  <td className="py-3 px-4 text-sky-300">TEXTBEFORE / TEXTAFTER (-1)</td>
                  <td className="py-3 px-4 font-sans text-emerald-400">Accurately isolates path and extension.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-400">Lab 4</td>
                  <td className="py-3 px-4 font-sans text-slate-300">5-Token Server Security Log Decomposition</td>
                  <td className="py-3 px-4 text-sky-300">REGEXEXTRACT (Mode 2)</td>
                  <td className="py-3 px-4 font-sans text-emerald-400">Spills 5 columns horizontally in pure RAM.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-400">Lab 5</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Automated HTML Tag &amp; Whitespace Cleansing</td>
                  <td className="py-3 px-4 text-sky-300">PROPER(TRIM(REGEXREPLACE))</td>
                  <td className="py-3 px-4 font-sans text-emerald-400">Zero HTML tags or double spaces remain.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-400">Lab 6</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Credit Card Masking &amp; Backreference Formatting</td>
                  <td className="py-3 px-4 text-sky-300">REGEXREPLACE ($1)</td>
                  <td className="py-3 px-4 font-sans text-emerald-400">Masks first 12 digits (XXXX-XXXX-XXXX-8842).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-400">Lab 7</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Master Invoice Code Registry</td>
                  <td className="py-3 px-4 text-sky-300">SORT(UNIQUE(TOCOL(...)))</td>
                  <td className="py-3 px-4 font-sans text-emerald-400">1D sorted unique list of invoice IDs.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-400">Lab 8</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Lookbehind API Status Token Extraction</td>
                  <td className="py-3 px-4 text-sky-300">REGEXEXTRACT (?<=KEY=)</td>
                  <td className="py-3 px-4 font-sans text-emerald-400">Extracts value with zero helper columns.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-400">Lab 9</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Quality Score &amp; Dynamic Defect Remarks</td>
                  <td className="py-3 px-4 text-sky-300">TEXTJOIN + IF + REGEXTEST</td>
                  <td className="py-3 px-4 font-sans text-emerald-400">Assembles failure reasons dynamically.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-400">Lab 10</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Single-Formula Board-Level Governance KPI Dashboard</td>
                  <td className="py-3 px-4 text-sky-300">LET + HSTACK + SUM</td>
                  <td className="py-3 px-4 font-sans text-emerald-400">Dynamic compliance % calculated in RAM.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & CALCULATION MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">🔬</span> 5-Dimension Competency Rubric & Evaluation Standard
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Evaluation Standards
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Pattern Anchoring & Rigor (20%)
              </h3>
              <p className="leading-relaxed">
                Candidate consistently enforces start <code className="text-emerald-300 font-mono">^</code> and end <code className="text-emerald-300 font-mono">$</code> anchors, 
                eliminating false-positive partial matches and guaranteeing strict statutory format compliance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Dynamic Array Orchestration (25%)
              </h3>
              <p className="leading-relaxed">
                Candidate leverages native dynamic arrays (<code className="text-sky-300 font-mono">FILTER, BYROW, TOCOL, MAP</code>) 
                to process entire tables in compiled memory without static helper columns or manual formula dragging.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-amber-400">3.</span> Lookaround & Group Capturing Mastery (20%)
              </h3>
              <p className="leading-relaxed">
                Candidate deploys capturing groups (Mode 2) and positive lookbehinds <code className="text-purple-300 font-mono">(?<=KEY=)</code> to isolate target tokens 
                cleanly without redundant string trimming formulas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-fuchsia-400">4.</span> Non-Destructive Data Hygiene (20%)
              </h3>
              <p className="leading-relaxed">
                Candidate preserves raw intake tables, implementing multi-phase sanitization pipelines that transform noise into pristine database strings.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">📐</span> Capstone Mastery & Module 004_004 Graduation Architecture
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Mastery Pipeline
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how the 10 lab challenges test and certify your mastery as a Modern Excel Text Intelligence Architect:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Challenge Suite (Left) */}
              <rect x="25" y="25" width="230" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="25" width="230" height="34" rx="12" fill="#7E22CE" fillOpacity="0.3" />
              <text x="140" y="47" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">10 CAPSTONE LAB CHALLENGES</text>

              <g transform="translate(35, 70)" fontSize="8.5" fontFamily="sans-serif" fill="#E2E8F0">
                <text x="0" y="15" fill="#38BDF8">1. Dual-Field Tax Filter</text>
                <text x="0" y="35" fill="#A7F3D0">2. 2D Matrix Key-Value Splitting</text>
                <text x="0" y="55" fill="#FDE047">3. Negative Instance Slicing</text>
                <text x="0" y="75" fill="#F472B6">4. 5-Token Log Decomposition</text>
                <text x="0" y="95" fill="#34D399">5. Automated HTML Cleanser</text>
                <text x="0" y="115" fill="#C084FC">6. Dynamic Card Masking</text>
                <text x="0" y="135" fill="#38BDF8">7. Deduplicated Invoice List</text>
                <text x="0" y="155" fill="#FDE047">8. Lookbehind Token Isolator</text>
                <text x="0" y="175" fill="#A7F3D0">9. Dynamic Defect Flags</text>
                <text x="0" y="195" fill="#F472B6">10. In-Memory KPI Dashboard</text>
              </g>

              {/* Arrow */}
              <path d="M 270 160 L 315 160" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,160 310,155 310,165" fill="#A855F7" />

              {/* Rigorous Evaluation Engine (Center) */}
              <rect x="325" y="25" width="250" height="270" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="325" y="25" width="250" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="450" y="47" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">EVALUATION ENGINE</text>

              <g transform="translate(340, 70)" fontSize="8.5" fontFamily="sans-serif">
                <rect width="220" height="32" rx="4" fill="#3B0764" stroke="#A855F7" />
                <text x="10" y="20" fill="#F5D0FE" fontWeight="bold">Pattern Anchoring &amp; Precision</text>

                <rect y="38" width="220" height="32" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="58" fill="#BAE6FD" fontWeight="bold">Dynamic Array Vectorization</text>

                <rect y="76" width="220" height="32" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="96" fill="#A7F3D0" fontWeight="bold">Lookaround &amp; Group Capturing</text>

                <rect y="114" width="220" height="32" rx="4" fill="#854D0E" fillOpacity="0.3" stroke="#EAB308" />
                <text x="10" y="134" fill="#FEF08A" fontWeight="bold">In-Memory Governance</text>
              </g>

              <text x="450" y="270" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ 100% Deterministic Testing</text>

              {/* Arrow */}
              <path d="M 590 160 L 620 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,160 615,155 615,165" fill="#10B981" />

              {/* Certified Master (Right) */}
              <rect x="630" y="25" width="195" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="630" y="25" width="195" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="727" y="45" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">MODULE 004_004 CERTIFIED</text>

              <g transform="translate(640, 70)">
                <rect width="175" height="42" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="16" fill="#34D399" fontSize="9" fontWeight="bold" fontFamily="sans-serif">STUDENT MASTERY</text>
                <text x="10" y="32" fill="#A7F3D0" fontSize="8" fontFamily="monospace">Swadeep, Tuhina, Debangshu</text>

                <rect y="50" width="175" height="60" rx="4" fill="#1E1B4B" stroke="#6366F1" />
                <text x="10" y="20" fill="#E0E7FF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">ACHIEVEMENT</text>
                <text x="10" y="36" fill="#FDE047" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">Master of Text Intelligence</text>
                <text x="10" y="50" fill="#94A3B8" fontSize="7.5" fontFamily="sans-serif">Excel 365 Native Architect</text>
              </g>

              <rect x="640" y="235" width="175" height="50" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="727" y="255" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">100% Module Complete</text>
              <text x="727" y="271" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Ready for Production ETL</text>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LIVE EXCEL FILE LOADER & DIRECT DOWNLOAD BAR
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet & Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the capstone assessment dataset below or download the practice workbook to test the 10 lab challenges in Microsoft Excel.
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
            sheetName="EX1914"
            title="Capstone Assessment Lab Dataset (Challenge ID, Problem Domain, Raw Source String, Target Function, Solution Formula)"
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
              <span className="text-amber-400">🏢</span> Real-World Corporate Business Scenarios
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Corporate Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Financial Audit Automation</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Instant Vendor Tax ID &amp; Email Verification
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Auditor <strong>Swadeep Banerjee</strong> replaces manual audit ticking with a vectorized REGEXTEST pipeline, 
                auditing 50,000 vendor files in 30 seconds with 100% mathematical precision!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =FILTER(Vendors, ValidPAN * ValidGST * ValidEmail)
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Payment Gateway Ingestion</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                2D Dynamic Webhook Payload Parsing
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Accountant <strong>Tuhina Mukherjee</strong> ingests complex API settlement notifications: 
                <code className="text-amber-300 font-mono">=TEXTSPLIT(Payload, ": ", " | ")</code>, 
                generating relational ledgers directly from raw API text blobs.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Generates 2-column key-value ledger matrices in pure RAM
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Enterprise System Security</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Server Log Incident Extraction
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Security Auditor <strong>Abhronila Sengupta</strong> isolates unauthorized intrusion attempts: 
                <code className="text-indigo-300 font-mono">=REGEXEXTRACT(LogLine, "^\\[([^\\]]+)\\]\\s+\\[([^\\]]+)\\]\\s+(.+)$", 2)</code>, 
                spilling event timestamps and IP addresses across thousands of rows.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Mode 2 Capturing Groups isolate IP addresses in 1 formula
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Executive Master Governance</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Single-Formula Data Hygiene Board Dashboard
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Compliance Officer <strong>Debangshu Ghosh</strong> deploys an in-memory LET executive dashboard, 
                reporting real-time data hygiene percentages to corporate leadership with zero VBA macros.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Live Data Hygiene: 98.4% Clean Compliance Index
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">🪜</span> Step-by-Step Capstone Assessment Execution Protocol
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Download the Practice Workbook</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Click the <strong>Download Practice Workbook (.xlsx)</strong> button to open <code className="text-amber-300 font-mono">regex_master_practice.xlsx</code> in Excel 365.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Navigate to Sheet "Topic13_Capstone_Lab"</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Locate the 10 real-world challenge rows and review the problem statement and target return structure.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Implement Pure In-Memory Formulas</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Write the required formulas using REGEXTEST, REGEXEXTRACT, REGEXREPLACE, TEXTSPLIT, TEXTBEFORE, TEXTAFTER, and FILTER.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Verify Output and Achieve 100% Mastery</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Verify that all 10 challenges evaluate to exact matching outputs with zero helper columns or static wizard dependencies!
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
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚠️</span> The 4 Ultimate Exam Pitfalls & Troubleshooting Matrix
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Exam Diagnostic Matrix
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Exam Pitfall</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">1. Unanchored Regex Match</td>
                  <td className="py-3 px-4 text-slate-300">Omitted <code className="text-rose-300 font-mono">^</code> and <code className="text-rose-300 font-mono">$</code> anchors.</td>
                  <td className="py-3 px-4 text-slate-400">Invalid strings with embedded conforming substrings pass test.</td>
                  <td className="py-3 px-4 text-emerald-400">Always enclose full-field patterns with <code className="text-emerald-400 font-mono">^...$</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">2. Missing Return Mode 2</td>
                  <td className="py-3 px-4 text-slate-300">Forgot return_mode in REGEXEXTRACT.</td>
                  <td className="py-3 px-4 text-slate-400">Returns full matched string instead of horizontal group tokens.</td>
                  <td className="py-3 px-4 text-emerald-400">Specify <code className="text-emerald-400 font-mono">2</code> as the 3rd argument of REGEXEXTRACT.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">3. Positive vs Negative Instances</td>
                  <td className="py-3 px-4 text-slate-300">Used <code className="text-rose-300 font-mono">1</code> instead of <code className="text-emerald-300 font-mono">-1</code> for file extension.</td>
                  <td className="py-3 px-4 text-slate-400">Extracts after the first dot instead of the last dot.</td>
                  <td className="py-3 px-4 text-emerald-400">Pass <code className="text-emerald-400 font-mono">-1</code> for right-to-left reverse searches.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-400">4. Double Unary Boolean Bug</td>
                  <td className="py-3 px-4 text-slate-300">Omitted <code className="text-rose-300 font-mono">--</code> before REGEXTEST in SUM.</td>
                  <td className="py-3 px-4 text-slate-400">SUM returns 0 because booleans are ignored by default.</td>
                  <td className="py-3 px-4 text-emerald-400">Prepend <code className="text-emerald-400 font-mono">--</code>: <code className="text-emerald-400 font-mono">=SUM(--REGEXTEST(...))</code>.</td>
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
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">💡</span> High-Speed Keyboard Shortcuts & Pro Tips
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Assessment Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">F9 Formula RAM Inspection</span>
                <span>Evaluate In-Place</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight any nested regex snippet and press <strong>F9</strong> to inspect intermediate array outputs in RAM.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Ctrl + Shift + Enter</span>
                <span>Obsolete in Excel 365</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dynamic arrays spill natively upon pressing standard <strong>Enter</strong>!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">TOCOL(..., 3)</span>
                <span>Error Discarding Flattening</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Flag 3 discards both blanks and #N/A errors from spilled regex extraction arrays.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">Name Manager</span>
                <span>LAMBDA Registration</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Press <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">Ctrl + F3</kbd> to package regex pipelines into named enterprise functions.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">🤔</span> Socratic Analytical Reflection
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Critical Thinking Prompts
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Reflect on your progression:</strong> How has your understanding evolved from basic text formulas like <code className="text-rose-400 font-mono">LEFT/MID/FIND</code> to multi-threaded in-memory regular expression pipelines in Excel 365?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine performance scalability:</strong> Why does processing 50,000 corporate records in formula RAM using <code className="text-purple-300 font-mono">REGEXTEST + FILTER</code> run 100x faster than legacy VBA macro loops?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider enterprise governance:</strong> How does deploying named LAMBDAs like <code className="text-emerald-300 font-mono">FX_VALIDATE_CUSTOMER</code> establish deterministic data quality standards across entire multinational finance departments?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Advanced Regex & String Intelligence Lab — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & GRADUATION ADDRESS
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Heartiest Congratulations on completing Module 004_004: Modern Text Intelligence & Regular Expressions! You have mastered the complete spectrum of string engineering—from basic metacharacters and quantifiers to native REGEXTEST, REGEXEXTRACT, REGEXREPLACE, 2D TEXTSPLIT matrices, and dynamic array pipelines. You now hold the power to build institutional-grade data governance platforms in pure formula RAM. Go forth and engineer with excellence!"
            }
          />
        </div>
      </div>
    </div>
  );
}
