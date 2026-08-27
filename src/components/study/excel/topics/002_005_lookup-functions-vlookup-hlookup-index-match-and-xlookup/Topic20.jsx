"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/lookup_functions_vlookup_hlookup_index_match_and_xlookup_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic20_files/topic20_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic20() {
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
    link.download = "lookup_functions_practice.xlsx";
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
              🏆 Module Capstone · Topic 20
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Relational Lookups &amp; Data Retrieval Assessment
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              Bloom's Level 6: Evaluate
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-emerald-300 to-sky-300 bg-clip-text text-transparent leading-tight">
            Test Your Skill: VLOOKUP, HLOOKUP, INDEX-MATCH &amp; XLOOKUP
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Welcome to the final capstone evaluation for <strong>Module 2.5: Lookup Functions</strong>. 
            This assessment evaluates your proficiency in diagnosing legacy lookup limitations, constructing dynamic two-way matrix intersection formulas (<code className="text-purple-300 font-mono">INDEX-MATCH</code>), 
            deploying next-generation multi-condition <code className="text-emerald-300 font-mono">XLOOKUP</code> engines, and implementing error-resilient sanitation.
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>100-Point Rubric:</strong> VLOOKUP, INDEX-MATCH, XLOOKUP &amp; Two-Way Matrices</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Lookup Specialist:</strong> Distinction awarded for scores &ge; 85%</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
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
              <span className="text-purple-400">⚡</span> Relational Lookup Competency Evaluation Matrix
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Grading Rubric
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Evaluation Domain</th>
                  <th className="py-3 px-4">Core Syntax Mechanics</th>
                  <th className="py-3 px-4">Point Weight</th>
                  <th className="py-3 px-4">Key Assessment Criteria</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">1. Legacy Lookups</td>
                  <td className="py-3 px-4 font-mono text-emerald-300">VLOOKUP, HLOOKUP, Exact FALSE</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">25 Points</td>
                  <td className="py-3 px-4">Enforcing exact matches and managing column index limitations.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-300">2. Coordinate &amp; Matrix</td>
                  <td className="py-3 px-4 font-mono text-emerald-300">INDEX, MATCH, Two-Way Matrix</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">25 Points</td>
                  <td className="py-3 px-4">Constructing resilient 2D matrix lookups and left-side lookups.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">3. Modern XLOOKUP</td>
                  <td className="py-3 px-4 font-mono text-emerald-300">XLOOKUP, Multi-Spill, If_Not_Found</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">25 Points</td>
                  <td className="py-3 px-4">Deploying omnidirectional lookups with native error handling.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">4. Multi-Criteria Logic</td>
                  <td className="py-3 px-4 font-mono text-emerald-300">Boolean Arrays, TRIM Sanitation</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">25 Points</td>
                  <td className="py-3 px-4">Evaluating compound multi-condition queries and sanitizing keys.</td>
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
              <span className="text-emerald-400">🔬</span> Conceptual Architecture: Relational Data Integrity
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Retrieval Principles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-purple-300 text-base flex items-center gap-2">
                <span>1.</span> Decoupled Vector Architecture
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Legacy VLOOKUP forces the search and return ranges into a contiguous monolithic block. Modern lookup architecture decouples the key vector from the return vector, allowing lookups across different worksheets and backwards in space.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-emerald-300 text-base flex items-center gap-2">
                <span>2.</span> The Column Insertion Vulnerability
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                A hardcoded column index (<code className="text-rose-300 font-mono">3</code>) in VLOOKUP silently fails when an accountant inserts a new tax column, corrupting financial reports. Full marks are awarded for implementing dynamically resilient <code className="text-emerald-300 font-mono">XLOOKUP</code> and <code className="text-emerald-300 font-mono">INDEX-MATCH</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-sky-300 text-base flex items-center gap-2">
                <span>3.</span> Boolean Array Matrix Resolution
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Evaluating compound conditions like <code className="text-sky-300 font-mono">(Branch="BKP") * (Tier="Gold")</code> creates an array of 1s and 0s in memory. Searching for <code className="text-sky-300 font-mono">1</code> in XLOOKUP eliminates ugly concatenation helper columns.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-amber-300 text-base flex items-center gap-2">
                <span>4.</span> Built-In Error Governance
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                XLOOKUP's native <code className="text-amber-300 font-mono">[if_not_found]</code> parameter replaces ugly <code className="text-slate-300 font-mono">IFERROR(VLOOKUP(...))</code> wrappers, returning clean default numbers (like 0) that do not break downstream arithmetic.
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
              <span className="text-sky-400">📐</span> Module 2.5 Relational Lookup Competency Radar
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Evaluation Radar
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg
              viewBox="0 0 880 320"
              className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans"
            >
              <defs>
                <linearGradient id="lkRadarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Spider Grid Lines */}
              <polygon points="440,60 580,160 440,260 300,160" fill="none" stroke="#334155" strokeWidth="1" />
              <polygon points="440,90 535,160 440,230 345,160" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
              <polygon points="440,120 490,160 440,200 390,160" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />

              {/* Axes */}
              <line x1="440" y1="40" x2="440" y2="280" stroke="#475569" strokeWidth="1.5" />
              <line x1="280" y1="160" x2="600" y2="160" stroke="#475569" strokeWidth="1.5" />

              {/* Competency Poly */}
              <polygon points="440,65 570,160 440,250 310,160" fill="url(#lkRadarGrad)" stroke="#c084fc" strokeWidth="2.5" />

              {/* Points */}
              <circle cx="440" cy="65" r="5" fill="#a855f7" />
              <circle cx="570" cy="160" r="5" fill="#38bdf8" />
              <circle cx="440" cy="250" r="5" fill="#34d399" />
              <circle cx="310" cy="160" r="5" fill="#fbbf24" />

              {/* Labels */}
              <text x="440" y="32" textAnchor="middle" fill="#c084fc" fontWeight="bold" fontSize="13">
                1. MODERN XLOOKUP &amp; SPILL (98%)
              </text>
              <text x="615" y="165" fill="#38bdf8" fontWeight="bold" fontSize="13">
                2. TWO-WAY MATRIX (95%)
              </text>
              <text x="440" y="298" textAnchor="middle" fill="#34d399" fontWeight="bold" fontSize="13">
                3. MULTI-CRITERIA BOOLEAN (94%)
              </text>
              <text x="140" y="165" fill="#fbbf24" fontWeight="bold" fontSize="13">
                4. KEY SANITATION &amp; TRIM (96%)
              </text>
            </svg>
          </div>
          <p className="text-xs text-slate-400 text-center italic">
            Figure 20.1: Master Relational Lookup Competency Radar. Evaluates XLOOKUP versatility, two-way matrix resolution, multi-criteria Boolean querying, and primary key hygiene.
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
            fileModule={sampleWorkbookUrl}
            sheetName="Topic20_Test_Your_Skill"
            title="Module 2.5 Assessment Candidate Scorecard (Candidate ID, Candidate Name, Exam Branch, VLOOKUP Score, INDEX-MATCH Score, XLOOKUP Score, Total Score, Qualification)"
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
                Swadeep Banerjee: 98/100 Lookup Defense
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Candidate <strong>Swadeep Banerjee</strong> presents a 3-tier commercial tariff model featuring Boolean multi-condition XLOOKUP, two-way matrix resolution, and dynamic spill vectors, earning the Gold Medal of Relational Data Architecture.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Score: 98/100 &rarr; Principal Relational Data Specialist
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Scenario 2 · Boolean XLOOKUP Polish</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Tuhina Mukherjee: 94/100 Multi-Criteria Logic
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Candidate <strong>Tuhina Mukherjee</strong> refactors an error-prone nested IF structure into a streamlined Boolean array XLOOKUP, evaluating region, customer tier, and volume bracket in a single cell formula.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Score: 94/100 &rarr; Certified Advanced Lookup Specialist
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Scenario 3 · Two-Way Matrix Mastery</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Abhronila Das: 92/100 Matrix Resolution
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Candidate <strong>Abhronila Das</strong> models a 2D tariff grid using nested MATCH functions inside INDEX, allowing dynamic pricing extraction without hardcoding column offsets.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-sky-300">
                Score: 92/100 &rarr; Certified Matrix Architecture Specialist
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Scenario 4 · Left-Lookup &amp; Sanitation</span>
                <span className="text-xs font-mono text-slate-400">Naihati Logistics</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Debangshu Roy: 90/100 Data Hygiene
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Candidate <strong>Debangshu Roy</strong> diagnoses #N/A errors caused by non-breaking whitespace and type mismatches, writing an automated <code className="text-amber-300 font-mono">TRIM(CLEAN(...))</code> left-lookup to retrieve supplier records.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-amber-300">
                Score: 90/100 &rarr; Certified Data Hygiene Specialist
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
              <span className="text-purple-400">🛠️</span> Step-by-Step Assessment Protocol
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Exam Guide
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-purple-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-950 border border-purple-700 text-purple-300 flex items-center justify-center text-xs">1</span>
                Step 1: Check Primary Key Uniqueness &amp; Format
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Confirm that the key column contains 100% unique records and sanitize strings with <code className="text-purple-300 font-mono">TRIM()</code> to prevent false #N/A failures.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center justify-center text-xs">2</span>
                Step 2: Deploy Decoupled XLOOKUP or INDEX-MATCH
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Avoid rigid hardcoded column indexes. Use independent lookup and return ranges to ensure formula immunity against column insertions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-sky-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center text-xs">3</span>
                Step 3: Configure Explicit Error Fallbacks
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Set XLOOKUP's <code className="text-sky-300 font-mono">[if_not_found]</code> parameter to <code className="text-slate-300 font-mono">0</code> or <code className="text-slate-300 font-mono">"Not Found"</code> to preserve downstream calculation integrity.
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
              <span className="text-rose-400">⚠️</span> Lookup Assessment Penalties
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">Omitted FALSE in VLOOKUP</td>
                  <td className="py-3 px-4">Triggers approximate matching on unsorted data, returning wrong rows.</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">-15 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Set 4th argument explicitly to FALSE or 0.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">Hardcoded Column Indices</td>
                  <td className="py-3 px-4">Static index numbers break when columns are inserted into the sheet.</td>
                  <td className="py-3 px-4 text-amber-400 font-bold">-15 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Switch to XLOOKUP or INDEX-MATCH.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">Whole Column References</td>
                  <td className="py-3 px-4">Evaluating <code className="text-purple-300 font-mono">A:F</code> across large workbooks degrades performance.</td>
                  <td className="py-3 px-4 text-purple-400 font-bold">-10 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Use structured table references (tbl_Data[Col]).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">Unsanitized Trailing Spaces</td>
                  <td className="py-3 px-4">Hidden spaces trigger persistent #N/A errors.</td>
                  <td className="py-3 px-4 text-sky-400 font-bold">-10 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Wrap lookup values in TRIM(CLEAN(...)).</td>
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
                <span>⚡</span> Tip 1: Multi-Column Spill via XLOOKUP
              </div>
              <p className="text-slate-300 leading-relaxed">
                Specify a multi-column range to XLOOKUP's return vector to populate all customer attributes across the row in a single formula.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-300 flex items-center gap-2">
                <span>⚡</span> Tip 2: Bottom-Up Search (-1)
              </div>
              <p className="text-slate-300 leading-relaxed">
                Use search mode <code className="text-emerald-300 font-mono">-1</code> in XLOOKUP to extract the latest chronological transaction effortlessly.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-sky-300 flex items-center gap-2">
                <span>⚡</span> Tip 3: Built-In If_Not_Found Fallbacks
              </div>
              <p className="text-slate-300 leading-relaxed">
                Set the 4th argument of XLOOKUP to <code className="text-sky-300 font-mono">0</code> to prevent missing records from breaking downstream arithmetic totals.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-300 flex items-center gap-2">
                <span>⚡</span> Tip 4: Lock Range Coordinates via F4
              </div>
              <p className="text-slate-300 leading-relaxed">
                Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-xs">F4</kbd> when defining non-table ranges to prevent floating reference coordinate shifts.
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
                <span className="text-purple-400">💭</span> Question 1: How does decoupled vector architecture eliminate formula maintenance?
              </h3>
              <p className="leading-relaxed">
                Why does separating lookup and return arrays make models immune to columns being inserted, moved, or deleted?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">💭</span> Question 2: Why are Boolean multi-condition lookups superior to helper columns?
              </h3>
              <p className="leading-relaxed">
                How does in-memory array evaluation keep your worksheet clean, compact, and aligned with database standards?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">💭</span> Question 3: What is the mark of a master Excel Relational Architect?
              </h3>
              <p className="leading-relaxed">
                How does mastering two-way matrices, modern XLOOKUP, and primary key hygiene elevate your spreadsheet models to institutional grade?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 20: Relational Lookups Assessment FAQ"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Mastering relational lookups is a defining milestone in your spreadsheet engineering journey. Always protect your data integrity: enforce exact matches, clean your keys with TRIM, utilize XLOOKUP and INDEX-MATCH for flexible left and two-way lookups, and configure explicit fallback values. Build your models with discipline, and they will serve your organization reliably for years to come."
            }
          />
        </div>
      </div>
    </div>
  );
}
