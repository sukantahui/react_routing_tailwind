"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/tables_sorting_filtering.xlsx?url";
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
    link.download = "tables_sorting_filtering_practice.xlsx";
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
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Structured Tables &amp; Filtering Assessment
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
              Bloom's Level 6: Evaluate
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-emerald-300 to-sky-300 bg-clip-text text-transparent leading-tight">
            Test Your Skill: Structured Tables, Sorting, Filtering &amp; Slicers
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Welcome to the definitive capstone assessment for <strong>Module 2.1: Tables, Sorting, and Filtering</strong>. 
            This comprehensive challenge evaluates your mastery across structured referencing (<code className="text-emerald-300 font-mono">[@Column]</code>), 
            multi-tier sorting hierarchies (<code className="text-sky-300 font-mono">Alt + D + S</code>), 
            advanced Boolean filter criteria, interactive visual slicers, and dynamic <code className="text-purple-300 font-mono">SUBTOTAL(109)</code> aggregations.
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>100-Point Assessment:</strong> Comprehensive tabular data engineering</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Table Specialist:</strong> Distinction awarded for scores &ge; 85%</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Enterprise Accreditation:</strong> Coder &amp; AccoTax Centre of Excellence</span>
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
              <span className="text-purple-400">⚡</span> Table Engineering Competency Evaluation Matrix
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
                  <th className="py-3 px-4">Core Structured Mechanics</th>
                  <th className="py-3 px-4">Point Weight</th>
                  <th className="py-3 px-4">Key Assessment Criteria</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">1. Structured Tables</td>
                  <td className="py-3 px-4 font-mono text-emerald-300">Ctrl+T, [@Column], Table[#Data]</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">25 Points</td>
                  <td className="py-3 px-4">Converting ranges, descriptive naming, and automated formula propagation.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-300">2. Multi-Level Sort</td>
                  <td className="py-3 px-4 font-mono text-emerald-300">Alt+D+S, Custom Lists, Cell Color</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">25 Points</td>
                  <td className="py-3 px-4">Configuring multi-tier categorical and quantitative ranking hierarchies.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">3. Advanced Filtering</td>
                  <td className="py-3 px-4 font-mono text-emerald-300">Criteria Ranges, OR Logic, Unique Rows</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">25 Points</td>
                  <td className="py-3 px-4">Modeling complex Boolean criteria ranges and deduplicating records.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">4. Slicers &amp; Subtotals</td>
                  <td className="py-3 px-4 font-mono text-emerald-300">Table Slicers, SUBTOTAL(109)</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">25 Points</td>
                  <td className="py-3 px-4">Constructing interactive visual toolbars and dynamic filtered aggregations.</td>
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
              <span className="text-emerald-400">🔬</span> Conceptual Architecture: Tabular Data Integrity
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Data Principles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-purple-300 text-base flex items-center gap-2">
                <span>1.</span> Static Grids vs Relational Entities
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                A basic spreadsheet treats cells as isolated coordinates (<code className="text-slate-300 font-mono">A1:F50</code>). An Enterprise Table Architect treats the dataset as an atomic relational entity with strict schema definitions, typed fields, and dynamic boundary expansion.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-emerald-300 text-base flex items-center gap-2">
                <span>2.</span> The Subtotal Paradox on Filtered Views
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Using <code className="text-rose-300 font-mono">=SUM(tbl[Sales])</code> on an active filtered view silently produces false reports because hidden rows are aggregated. Full marks are awarded for mastering <code className="text-emerald-300 font-mono">=SUBTOTAL(109, tbl[Sales])</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-sky-300 text-base flex items-center gap-2">
                <span>3.</span> Criteria Range Boolean Matrix
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Understanding that horizontal columns in Advanced Filter criteria execute <code className="text-sky-300 font-mono">AND</code> logic while vertical rows execute <code className="text-sky-300 font-mono">OR</code> logic unlocks the ability to model complex SQL-like query queries directly on the Excel grid.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-amber-300 text-base flex items-center gap-2">
                <span>4.</span> Interactive Slicer Governance
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Slicers must be formatted cleanly: multi-column ribbons across the top of the worksheet, hidden zero-data items, and magnetic cell snapping using the <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-xs">Alt</kbd> key.
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
              <span className="text-sky-400">📐</span> Module 2.1 Table Engineering Competency Radar
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
                <linearGradient id="tblRadarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.5" />
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

              {/* Competency Poly */}
              <polygon points="440,65 570,160 440,250 310,160" fill="url(#tblRadarGrad)" stroke="#34d399" strokeWidth="2.5" />

              {/* Points */}
              <circle cx="440" cy="65" r="5" fill="#a855f7" />
              <circle cx="570" cy="160" r="5" fill="#38bdf8" />
              <circle cx="440" cy="250" r="5" fill="#34d399" />
              <circle cx="310" cy="160" r="5" fill="#fbbf24" />

              {/* Labels */}
              <text x="440" y="32" textAnchor="middle" fill="#c084fc" fontWeight="bold" fontSize="13">
                1. STRUCTURED TABLES &amp; SYNTAX (96%)
              </text>
              <text x="615" y="165" fill="#38bdf8" fontWeight="bold" fontSize="13">
                2. MULTI-TIER SORTING (94%)
              </text>
              <text x="440" y="298" textAnchor="middle" fill="#34d399" fontWeight="bold" fontSize="13">
                3. SLICERS &amp; SUBTOTAL 109 (98%)
              </text>
              <text x="140" y="165" fill="#fbbf24" fontWeight="bold" fontSize="13">
                4. ADVANCED FILTER LOGIC (92%)
              </text>
            </svg>
          </div>
          <p className="text-xs text-slate-400 text-center italic">
            Figure 8.1: Master Table Engineering Competency Radar. Evaluates structured syntax, multi-tier sorting, visual slicer architecture, and advanced criteria logic.
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
            sheetName="Topic8_Tables_Assessment"
            title="Module 2.1 Assessment Candidate Scorecard (Candidate ID, Candidate Name, Exam Branch, Table Syntax Score, Filter Logic Score, Slicer Setup Score, Total Score, Qualification)"
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
                Swadeep Banerjee: 98/100 Table Defense
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Candidate <strong>Swadeep Banerjee</strong> demonstrates an end-to-end commercial operations table with automated [@Column] calculations, multi-column slicers, and subtotal 109 integrity, earning the Gold Medal of Table Engineering Excellence.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Score: 98/100 &rarr; Principal Table Architecture Specialist
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Scenario 2 · Multi-Tier Sort Refactoring</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Tuhina Mukherjee: 94/100 Hierarchy Fix
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Candidate <strong>Tuhina Mukherjee</strong> refactors an unsorted 40-row regional payroll ledger into a clean 3-level sort hierarchy (Branch &rarr; Dept &rarr; Sales Descending), reducing audit cycle times by 80%.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Score: 94/100 &rarr; Certified Data Wrangling Specialist
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Scenario 3 · Advanced Filter Modeling</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Abhronila Das: 92/100 Criteria Extraction
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Candidate <strong>Abhronila Das</strong> models a multi-row Advanced Filter criteria range to extract critical low-stock items while ignoring delivered orders, copying unique records to an executive review sheet.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-sky-300">
                Score: 92/100 &rarr; Certified Advanced Filter Specialist
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Scenario 4 · Slicer Optimization</span>
                <span className="text-xs font-mono text-slate-400">Naihati Logistics</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Debangshu Roy: 90/100 Subtotal Integrity
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Candidate <strong>Debangshu Roy</strong> fixes an active billing report by replacing flawed SUM formulas with <code className="text-amber-300 font-mono">SUBTOTAL(109, ...)</code>, ensuring accurate dynamic invoicing totals during regional slicer selections.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-amber-300">
                Score: 90/100 &rarr; Certified Reporting Integrity Analyst
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
                Step 1: Validate Table Creation &amp; Naming Conventions
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Confirm that the dataset is converted to a table (<kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-xs">Ctrl + T</kbd>) and renamed with a descriptive <code className="text-purple-300 font-mono">tbl_</code> prefix on the Table Design ribbon.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center justify-center text-xs">2</span>
                Step 2: Inspect Structured Formula Consistency
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Verify that all calculated columns use structured <code className="text-emerald-300 font-mono">[@Column]</code> syntax and contain zero static cell addresses (<code className="text-slate-400 font-mono">E2</code>).
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-sky-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center text-xs">3</span>
                Step 3: Test Dynamic Slicer Filtering &amp; Subtotals
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Click various Slicer buttons to ensure rows filter smoothly and the Total Row updates instantaneously via <code className="text-sky-300 font-mono">SUBTOTAL(109, ...)</code>.
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
              <span className="text-rose-400">⚠️</span> Table Engineering Assessment Penalties
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">Hardcoded Cell Coordinates</td>
                  <td className="py-3 px-4">Using <code className="text-rose-300 font-mono">E2*0.18</code> inside calculated table columns.</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">-15 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Use structured [@ColumnName] referencing.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">SUM on Filtered Tables</td>
                  <td className="py-3 px-4">Using standard <code className="text-amber-300 font-mono">=SUM(...)</code> on filtered views.</td>
                  <td className="py-3 px-4 text-amber-400 font-bold">-15 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Use SUBTOTAL with code 109 to calculate visible rows only.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">Blank Rows in Table Body</td>
                  <td className="py-3 px-4">Leaving blank separator lines inside table ranges.</td>
                  <td className="py-3 px-4 text-purple-400 font-bold">-10 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Delete all blank rows to preserve 100% contiguous data.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">Default Table1 Name</td>
                  <td className="py-3 px-4">Leaving tables with default generic names like Table1, Table2.</td>
                  <td className="py-3 px-4 text-sky-400 font-bold">-10 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Assign descriptive tbl_ names via Table Design tab.</td>
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
                <span>⚡</span> Tip 1: Toggle Total Row via Ctrl + Shift + T
              </div>
              <p className="text-slate-300 leading-relaxed">
                Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-xs">Ctrl + Shift + T</kbd> to toggle the dynamic Total Row instantly.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-300 flex items-center gap-2">
                <span>⚡</span> Tip 2: Clear Filters via Alt + A + C
              </div>
              <p className="text-slate-300 leading-relaxed">
                Reset all applied table filters across all columns simultaneously using <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-xs">Alt + A + C</kbd>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-sky-300 flex items-center gap-2">
                <span>⚡</span> Tip 3: Multi-Column Slicer Ribbons
              </div>
              <p className="text-slate-300 leading-relaxed">
                Format slicers with 4 columns on the Slicer ribbon to transform vertical button stacks into horizontal toolbars.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-300 flex items-center gap-2">
                <span>⚡</span> Tip 4: Magnetic Slicer Snapping via Alt
              </div>
              <p className="text-slate-300 leading-relaxed">
                Hold <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-xs">Alt</kbd> while dragging slicer containers to snap them to grid cell boundaries.
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
                <span className="text-purple-400">💭</span> Question 1: How does structured table referencing make financial models audit-proof?
              </h3>
              <p className="leading-relaxed">
                When an external auditor reviews a workbook, why is reading <code className="text-slate-300 font-mono">[@Taxable_Amount] * [@GST_Rate]</code> far more transparent than analyzing <code className="text-slate-300 font-mono">D45 * $M$2</code>?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">💭</span> Question 2: Why do downstream PivotTables perform better when connected to structured tables?
              </h3>
              <p className="leading-relaxed">
                Why does connecting PivotTables to table names eliminate range maintenance errors compared to static grid ranges?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">💭</span> Question 3: What distinguishes a basic Excel user from an Enterprise Data Architect?
              </h3>
              <p className="leading-relaxed">
                How does mastering structured tables, multi-tier sorting hierarchies, and dynamic slicers elevate your data engineering capabilities?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 8: Structured Tables & Filtering Assessment FAQ"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Completing this module solidifies your foundation in modern Excel data wrangling. Always treat your tables as relational databases: name them cleanly, write self-documenting [@Column] formulas, and connect interactive slicers. When your data architecture is structured and disciplined, you build reports that are robust, automated, and executive-ready."
            }
          />
        </div>
      </div>
    </div>
  );
}
