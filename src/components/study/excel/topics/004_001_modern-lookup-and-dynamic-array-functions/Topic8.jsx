"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_001_modern_lookup_and_dynamic_array_functions_master.xlsx?url";
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

  // Direct workbook download handler
  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "dynamic_arrays_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
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
          className="reveal-section rounded-2xl p-5 sm:p-7 bg-slate-900/50 border border-slate-800 shadow-md relative overflow-hidden"
        >
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800 text-xs font-semibold">
              Composite Pipeline · Topic 8
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800 text-xs font-mono">
              =SORT(UNIQUE(FILTER()))
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
            Combining FILTER, UNIQUE, and SORT for Automated Alphabetical Searchable Lists
          </h1>

          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed max-w-4xl">
            Synthesize modern dynamic arrays into a unified, high-speed data pipeline. 
            By composing <strong className="text-emerald-300 font-mono">SORT(UNIQUE(FILTER()))</strong> into a single formula, 
            you can filter data on active criteria, eliminate duplicate entries, and alphabetize distinct items in real time. 
            Power interactive search boxes with <code className="text-amber-300 font-mono">(SearchBox="") + ISNUMBER(SEARCH(...))</code> and 
            feed dynamic Data Validation dropdown lists via the <code className="text-sky-300 font-mono">#</code> spill operator.
          </p>

          <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-emerald-400 text-sm">✓</span>
              <span><strong>3-Tier Pipeline:</strong> Filter → Deduplicate → Alphabetize</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-sky-400 text-sm">✓</span>
              <span><strong>Live Search Box:</strong> Type keywords to filter instantly</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-purple-400 text-sm">✓</span>
              <span><strong>Dropdown Ready:</strong> Direct Data Validation with <code className="font-mono text-sky-300">#</code></span>
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
              <span className="text-emerald-400">⚡</span> Master Pipeline Formula Anatomy
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Syntax Specification: =SORT(UNIQUE(FILTER(array, include, [if_empty])))
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-emerald-300">
            <span className="text-slate-500">// 3-Tier Dynamic Array Pipeline:</span>
            <div className="mt-1 text-white font-bold">
              =SORT(<span className="text-purple-300">UNIQUE</span>(<span className="text-sky-300">FILTER</span>(<span className="text-amber-300">array</span>, <span className="text-emerald-400">include</span>, <span className="text-rose-400">[if_empty]</span>)))
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Live Search Box Formula:</span>{" "}
              <code className="text-amber-300">=SORT(UNIQUE(FILTER(B2:B50, (J1="") + ISNUMBER(SEARCH(J1, B2:B50)), "No Matches")))</code>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Pipeline Layer</th>
                  <th className="pb-3 px-4">Role & Execution Order</th>
                  <th className="pb-3 pl-4">Operational Responsibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="py-3 pr-4 text-sky-300 font-bold">1. FILTER (Inner)</td>
                  <td className="py-3 px-4 text-slate-400">Executes 1st in Memory</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Extracts only records meeting criteria (e.g. branch, search keyword, active status).</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-purple-300 font-bold">2. UNIQUE (Middle)</td>
                  <td className="py-3 px-4 text-slate-400">Executes 2nd in Memory</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Eliminates duplicate names/categories from the filtered stream.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-emerald-300 font-bold">3. SORT (Outer)</td>
                  <td className="py-3 px-4 text-slate-400">Executes 3rd in Memory</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Alphabetizes the clean unique list from A to Z (or Z to A with -1).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-emerald-400">🔬</span> Conceptual Mechanics: Zero-Latency In-Memory Pipelines
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              In legacy Excel, creating a search-filtered distinct dropdown required VBA event macros (<code className="text-slate-400 font-mono">Worksheet_Change</code>), fragile hidden helper sheets, and volatile <code className="text-slate-400 font-mono">OFFSET/COUNTA</code> Named Ranges.
            </p>
            <p>
              The <code className="text-emerald-300 font-mono">SORT(UNIQUE(FILTER()))</code> pipeline executes completely within CPU registers:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-200">
              <li><strong>Search Box Evaluation:</strong> If cell <code className="text-amber-300 font-mono">J1</code> is blank, <code className="text-emerald-400 font-mono">(J1="")</code> evaluates to <code className="text-slate-300 font-mono">TRUE (1)</code>, streaming all rows. When a keyword is typed, <code className="text-sky-300 font-mono">ISNUMBER(SEARCH(J1, Target))</code> filters matching rows.</li>
              <li><strong>Deduplication Pass:</strong> <code className="text-purple-300 font-mono">UNIQUE</code> hash-checks the filtered vector, stripping repeating values.</li>
              <li><strong>Alphabetical Ordering:</strong> <code className="text-emerald-300 font-mono">SORT</code> outputs an ordered spilled vector at origin cell <code className="text-sky-300 font-mono">L2#</code>.</li>
              <li><strong>UI Binding:</strong> Setting Data Validation source to <code className="text-amber-300 font-mono">=$L$2#</code> creates a self-updating, auto-completing dropdown menu with zero VBA!</li>
            </ol>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">📐</span> 3-Tier Pipeline Processing Architecture
            </h2>
            <span className="text-xs text-teal-300 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800">
              Data Pipeline Flow
            </span>
          </div>

          <p className="text-sm text-slate-300">
            Follow the transformations as raw transactions pass through FILTER, UNIQUE, and SORT.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-center items-center overflow-x-auto">
            <svg className="w-full max-w-2xl h-auto" viewBox="0 0 760 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="gridPattern9" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="760" height="260" fill="url(#gridPattern9)" rx="16" />

              {/* Stage 1: FILTER */}
              <g transform="translate(25, 25)">
                <rect x="0" y="0" width="220" height="210" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <rect x="8" y="8" width="204" height="26" rx="6" fill="#0c4a6e" />
                <text x="110" y="25" fill="#7dd3fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. FILTER(Status="Active")</text>

                <rect x="15" y="42" width="190" height="24" rx="4" fill="#0369a1" />
                <text x="25" y="58" fill="#ffffff" fontSize="9">Swadeep Roy (Barrackpore)</text>

                <rect x="15" y="70" width="190" height="24" rx="4" fill="#0369a1" />
                <text x="25" y="86" fill="#ffffff" fontSize="9">Tuhina Mukherjee (Shyamnagar)</text>

                <rect x="15" y="98" width="190" height="24" rx="4" fill="#0369a1" />
                <text x="25" y="114" fill="#ffffff" fontSize="9">Swadeep Roy (Duplicate)</text>

                <rect x="15" y="126" width="190" height="24" rx="4" fill="#0369a1" />
                <text x="25" y="142" fill="#ffffff" fontSize="9">Abhronila Das (Naihati)</text>

                <rect x="15" y="154" width="190" height="24" rx="4" fill="#0369a1" />
                <text x="25" y="170" fill="#ffffff" fontSize="9">Susmita Saha (Ichapur)</text>
              </g>

              {/* Stage 2: UNIQUE */}
              <g transform="translate(270, 25)">
                <rect x="0" y="0" width="220" height="210" rx="10" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1.5" />
                <rect x="8" y="8" width="204" height="26" rx="6" fill="#581c87" />
                <text x="110" y="25" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">2. UNIQUE (Deduplicated)</text>

                <rect x="15" y="42" width="190" height="26" rx="4" fill="#6b21a8" />
                <text x="25" y="59" fill="#ffffff" fontSize="10" fontWeight="bold">Swadeep Roy</text>

                <rect x="15" y="74" width="190" height="26" rx="4" fill="#6b21a8" />
                <text x="25" y="91" fill="#ffffff" fontSize="10">Tuhina Mukherjee</text>

                <rect x="15" y="106" width="190" height="26" rx="4" fill="#6b21a8" />
                <text x="25" y="123" fill="#ffffff" fontSize="10">Abhronila Das</text>

                <rect x="15" y="138" width="190" height="26" rx="4" fill="#6b21a8" />
                <text x="25" y="155" fill="#ffffff" fontSize="10">Susmita Saha</text>

                <text x="110" y="190" fill="#c084fc" fontSize="9" textAnchor="middle">Duplicate Swadeep Removed!</text>
              </g>

              {/* Stage 3: SORT */}
              <g transform="translate(515, 25)">
                <rect x="0" y="0" width="220" height="210" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <rect x="8" y="8" width="204" height="26" rx="6" fill="#047857" />
                <text x="110" y="25" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">3. SORT (A to Z Output L2#)</text>

                <rect x="15" y="42" width="190" height="26" rx="4" fill="#059669" />
                <text x="25" y="59" fill="#ffffff" fontSize="10" fontWeight="bold">1. Abhronila Das</text>

                <rect x="15" y="74" width="190" height="26" rx="4" fill="#047857" />
                <text x="25" y="91" fill="#e2e8f0" fontSize="10">2. Susmita Saha</text>

                <rect x="15" y="106" width="190" height="26" rx="4" fill="#047857" />
                <text x="25" y="123" fill="#e2e8f0" fontSize="10">3. Swadeep Roy</text>

                <rect x="15" y="138" width="190" height="26" rx="4" fill="#047857" />
                <text x="25" y="155" fill="#e2e8f0" fontSize="10">4. Tuhina Mukherjee</text>

                <text x="110" y="190" fill="#6ee7b7" fontSize="9" fontWeight="bold" textAnchor="middle">Fed into Data Validation =L2#</text>
              </g>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet: 3-Tier Pipeline Lab
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the master trainer and center dataset below or download the practice workbook to test the combined pipeline in desktop Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer"
              title="Download dynamic_arrays_master.xlsx practice file"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Workbook (.xlsx)</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
            <ExcelFileLoader
              fileModule={sampleWorkbookUrl}
              sheetName="Topic8_Filter_Unique_Sort"
              title="Master Trainer & Center Activity Register"
              rowsPerPage={10}
              showSheetSelector={true}
            />
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-amber-400">🏢</span> Real-World Business Applications of the Master Pipeline
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-emerald-300 text-base">Case 1: Live Interactive Search Box</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Barrackpore HQ</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Swadeep Roy</strong> connects a search cell <code className="text-amber-300 font-mono">H1</code> to filter active trainers in cell <code className="text-amber-300 font-mono">H3</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-300 border border-slate-800">
                =SORT(UNIQUE(FILTER(B2:B11, (H1="") + ISNUMBER(SEARCH(H1, B2:B11)), "No Matches")))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Typing "a" narrows the alphabetized trainer list dynamically!
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sky-300 text-base">Case 2: Auto-Updating Dropdown Source</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">Shyamnagar Operations</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Tuhina Mukherjee</strong> extracts active skill tracks to feed a Data Validation dropdown:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-sky-300 border border-slate-800">
                =SORT(UNIQUE(FILTER(D2:D11, E2:E11="Active")))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Data Validation source set to <code className="text-emerald-400 font-mono">=K2#</code> displays an alphabetized distinct course list!
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-indigo-300 text-base">Case 3: Branch-Specific Distinct Faculty Roster</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">Ichapur Academic Hub</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita Saha</strong> extracts active trainers teaching at <em>Barrackpore Center</em>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-indigo-300 border border-slate-800">
                =SORT(UNIQUE(FILTER(B2:B11, (C2:C11="Barrackpore") * (E2:E11="Active"))))
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Spills an alphabetized list of active Barrackpore faculty (Priya Ghosh, Swadeep Roy).
              </p>
            </div>

            {/* Scenario 4 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-purple-300 text-base">Case 4: Dynamic Header KPI Card</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">Naihati Dashboard</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Abhronila Das</strong> creates a dynamic title widget reflecting the filtered count:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-purple-300 border border-slate-800">
                ="Active Faculty: " & ROWS(H3#) & " Trainers Online"
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Header dynamically updates whenever new faculty members are added!
              </p>
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
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-sky-400">📋</span> 3-Step Construction Guide
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center border border-emerald-800 shrink-0">1</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Construct the FILTER Foundation</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Start with <code className="text-emerald-400 font-mono">=FILTER(B2:B11, (J1="") + ISNUMBER(SEARCH(J1, B2:B11)), "No Records")</code> to verify search filtering.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-purple-950 text-purple-400 font-bold flex items-center justify-center border border-purple-800 shrink-0">2</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Wrap with UNIQUE to Strip Duplicates</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Nest the FILTER expression inside <code className="text-purple-300 font-mono">UNIQUE(...)</code> to remove repetitive entries.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-sky-950 text-sky-400 font-bold flex items-center justify-center border border-sky-800 shrink-0">3</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Alphabetize with SORT & Bind Dropdown</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Wrap with <code className="text-sky-300 font-mono">SORT(...)</code> and set Data Validation source to <code className="text-amber-300 font-mono">=$L$2#</code>.
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
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚠️</span> Common Pipeline Pitfalls & Fixes
            </h2>
            <span className="text-xs text-rose-300 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800">
              Diagnostic Guide
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Frequent Mistake</th>
                  <th className="pb-3 px-4">Error / Symptom</th>
                  <th className="pb-3 pl-4">Corrective Best Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Omitted [if_empty] Fallback</td>
                  <td className="py-3.5 px-4 text-rose-400 font-mono">#CALC! Error</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Always supply the 3rd argument in FILTER: <code className="text-sky-300 font-mono">"No Records Found"</code>.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Trailing Spaces Creating Duplicates</td>
                  <td className="py-3.5 px-4 text-slate-300">Same name appears twice in list.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Wrap the input range in <code className="text-sky-300 font-mono">TRIM(B2:B11)</code> before filtering.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">#SPILL! Collision</td>
                  <td className="py-3.5 px-4 text-rose-400 font-mono">#SPILL! Error</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Place search inputs above the spill origin (e.g. J1) so results spill down freely.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & KEYBOARD SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-purple-400">💡</span> Pro Tips & Advanced Recipes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-xs">TEXTJOIN</span>
                <span>Format as Comma List</span>
              </div>
              <p className="text-slate-300">
                To output all matching items in a single cell: <code className="text-emerald-400 font-mono">=TEXTJOIN(", ", TRUE, SORT(UNIQUE(FILTER(...))))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-xs">TAKE</span>
                <span>Top 5 Distinct Search Items</span>
              </div>
              <p className="text-slate-300">
                To restrict output to the first 5 unique results: <code className="text-emerald-400 font-mono">=TAKE(SORT(UNIQUE(FILTER(...))), 5)</code>.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-teal-400">🤔</span> Socratic Analytical Hints
          </h2>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-teal-500">
              <h3 className="font-bold text-teal-300 text-sm">Think About Why the Pipeline Replaces VBA</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                In legacy Excel, creating a live search box required writing 50 lines of VBA code with <code className="text-slate-400 font-mono">Worksheet_Change</code> events. Why is <code className="text-emerald-400 font-mono">=SORT(UNIQUE(FILTER(...)))</code> completely immune to macro-security blocking?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-sky-500">
              <h3 className="font-bold text-sky-300 text-sm">Observe How Data Validation Connects</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Notice that binding a dropdown list to <code className="text-emerald-400 font-mono">=$L$2#</code> causes the dropdown menu to automatically expand and contract in real time as the user types into the search box!
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ (30 QUESTIONS VIA FAQTemplate)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="The FILTER + UNIQUE + SORT Pipeline FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Mastering the =SORT(UNIQUE(FILTER())) pipeline is the true badge of an expert Excel architect in Barrackpore and Kolkata. Use it to build live search boxes and auto-updating Data Validation dropdowns with zero VBA code. It provides maximum speed, 100% data integrity, and total freedom from macro errors!"
            }
          />
        </div>
      </div>
    </div>
  );
}
