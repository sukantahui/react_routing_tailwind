"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_002_advanced_power_query_m_code_scripting_and_custom_functions_master.xlsx?url";
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
    link.download = "m_code_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-amber-500/30 selection:text-amber-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              🏆 Module Capstone Assessment · Topic 13
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-xs font-semibold">
              Advanced M Scripting Challenge
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300 text-xs font-semibold">
              Bloom's Level 6: Synthesize &amp; Evaluate
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Assessment: Advanced M Scripting &amp; Enterprise ETL Challenge
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Welcome to the definitive capstone assessment for <strong>Module 005_002: Advanced Power Query M Code Scripting &amp; Custom Functions</strong>. 
            This comprehensive challenge evaluates your mastery across all advanced dimensions of M code development: 
            AST compilation, dynamic API pagination (<code className="text-teal-300 font-mono">List.Generate</code>), 
            resilient error handling (<code className="text-amber-300 font-mono">try...otherwise</code>), 
            database query pushdown (<code className="text-cyan-300 font-mono">Query Folding</code>), 
            and in-memory buffer optimization (<code className="text-indigo-300 font-mono">Table.Buffer</code>).
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-amber-400 text-base">✓</span>
              <span><strong>100-Point Challenge:</strong> Multi-domain architectural evaluation</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Architect Certification:</strong> Distinction awarded for scores &ge; 85%</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Enterprise Readiness:</strong> Direct industry accreditation by Coder &amp; AccoTax</span>
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
              <span className="text-amber-400">⚡</span> Master M Grammar &amp; Architecture Matrix
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Evaluation Syllabus
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto shadow-inner leading-relaxed space-y-2">
            <div>
              <span className="text-slate-500">// Advanced M Architectural Syntax Summary</span>
              <br />
              <span className="text-purple-400">let</span>
              <br />
              &nbsp;&nbsp;<span className="text-sky-300">ParamSource</span> = <span className="text-purple-400">Sql.Database</span>(pServer, pDB, [EnableFolding=<span className="text-emerald-300">true</span>]),
              <br />
              &nbsp;&nbsp;<span className="text-sky-300">BufferedDim</span> = <span className="text-purple-400">Table.Buffer</span>(DimRates),
              <br />
              &nbsp;&nbsp;<span className="text-sky-300">CleanFact</span> = <span className="text-purple-400">Table.SelectRows</span>(ParamSource, <span className="text-purple-400">each</span> [Date] &gt;= pStart <span className="text-purple-400">and</span> [Date] &lt;= pEnd),
              <br />
              &nbsp;&nbsp;<span className="text-sky-300">Enriched</span> = <span className="text-purple-400">Table.AddColumn</span>(CleanFact, <span className="text-emerald-200">"INR"</span>, <span className="text-purple-400">each</span> [Amt] * BufferedDim&#123;[Cur=[Cur]]&#125;[Rate]),
              <br />
              &nbsp;&nbsp;<span className="text-sky-300">Quarantine</span> = <span className="text-purple-400">Table.SelectRows</span>(ParamSource, <span className="text-purple-400">each</span> [Amt] &lt;= 0)
              <br />
              <span className="text-purple-400">in</span>
              <br />
              &nbsp;&nbsp;Enriched
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Evaluation Domain</th>
                  <th className="py-3 px-4">Core M Functions</th>
                  <th className="py-3 px-4">Point Weight</th>
                  <th className="py-3 px-4">Key Assessment Criteria</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">1. M Engine &amp; AST</td>
                  <td className="py-3 px-4 font-mono text-purple-300">let...in, each (_) =&gt; _, #shared</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">15 Points</td>
                  <td className="py-3 px-4">Understanding call-by-need lazy evaluation and lexical scoping.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-teal-300">2. Iteration &amp; Loops</td>
                  <td className="py-3 px-4 font-mono text-purple-300">List.Generate, List.Accumulate, @fx</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">20 Points</td>
                  <td className="py-3 px-4">Implementing recursive algorithms and dynamic API token pagination.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-indigo-300">3. Fault Tolerance</td>
                  <td className="py-3 px-4 font-mono text-purple-300">try...otherwise, MissingField.UseNull</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">15 Points</td>
                  <td className="py-3 px-4">Engineering Dual-Stream Quarantine logs and schema drift resilience.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-cyan-300">4. Query Folding</td>
                  <td className="py-3 px-4 font-mono text-purple-300">Value.NativeQuery, Sql.Database</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">15 Points</td>
                  <td className="py-3 px-4">Verifying SQL pushdown and optimizing relational step sequences.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">5. Memory &amp; Speed</td>
                  <td className="py-3 px-4 font-mono text-purple-300">Table.Buffer, List.Buffer, Binary.Buffer</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">20 Points</td>
                  <td className="py-3 px-4">Pruning columns, reducing RAM footprint, and locking sort order.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-300">6. Governance</td>
                  <td className="py-3 px-4 font-mono text-purple-300">Value.ReplaceType, Query Groups</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">15 Points</td>
                  <td className="py-3 px-4">Structuring 6 numbered folders and decorating functions with UI metadata.</td>
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
              <span className="text-teal-400">🔬</span> Conceptual Architecture &amp; Evaluation Rubric
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Architectural Mastery
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-amber-300 text-base flex items-center gap-2">
                <span>1.</span> The Architectural Shift: Wrangling vs Engineering
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                A basic analyst uses Power Query by clicking buttons in the ribbon to transform static tables. 
                An Enterprise ETL Engineer writes procedural M code that handles asynchronous API tokens, buffers lookup tables in RAM, delegates relational algebra to database clusters, and quarantines defective transactions automatically.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-teal-300 text-base flex items-center gap-2">
                <span>2.</span> Algorithmic Complexity &amp; Memory Bounds
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                In assessment challenges, solutions that take minutes due to <code className="text-rose-300 font-mono">O(N*M)</code> unbuffered row scans will be penalized. 
                Demonstrate proficiency by buffering lookup tables in RAM and pruning wide text columns at Step 1 to achieve sub-second execution.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-indigo-300 text-base flex items-center gap-2">
                <span>3.</span> Zero-Loss Audit Compliance
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Never delete bad data. Statutory tax standards (e.g. Indian GST laws) require that every single unrecorded or malformed transaction be retained in an audit log. 
                Full marks are awarded for implementations featuring transparent Dual-Stream Quarantine routing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-cyan-300 text-base flex items-center gap-2">
                <span>4.</span> Reusability &amp; Self-Documenting Pipelines
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Code that cannot be maintained by teammates fails enterprise review. 
                Structure all custom lambdas with <code className="text-cyan-300 font-mono">Value.ReplaceType</code> metadata, organize queries into numbered groups, and disable load on all intermediate staging steps.
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
              <span className="text-indigo-400">📐</span> Visual Evaluation Map: 360-Degree Advanced M Architecture
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              Competency Map
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg
              viewBox="0 0 880 340"
              className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans"
            >
              <defs>
                <linearGradient id="gradCenter" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
                <linearGradient id="gradNode" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
              </defs>

              {/* Central Core: M Scripting Engine */}
              <circle cx="440" cy="170" r="70" fill="url(#gradCenter)" stroke="#fef3c7" strokeWidth="3" />
              <text x="440" y="165" textAnchor="middle" fill="#0f172a" fontWeight="extrabold" fontSize="14">
                M SCRIPTING
              </text>
              <text x="440" y="182" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="11">
                MASTER CORE
              </text>

              {/* Node 1: Top Left - AST & Lazy Evaluation */}
              <g transform="translate(60, 40)">
                <rect width="200" height="75" rx="12" fill="url(#gradNode)" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="100" y="28" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="12">1. AST &amp; Evaluation</text>
                <text x="100" y="46" textAnchor="middle" fill="#bae6fd" fontSize="10">Call-by-Need Pruning</text>
                <text x="100" y="62" textAnchor="middle" fill="#94a3b8" fontSize="9">Lexical Scoping (15 pts)</text>
              </g>
              <line x1="260" y1="90" x2="380" y2="140" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />

              {/* Node 2: Top Right - API & Dynamic Pagination */}
              <g transform="translate(620, 40)">
                <rect width="200" height="75" rx="12" fill="url(#gradNode)" stroke="#34d399" strokeWidth="1.5" />
                <text x="100" y="28" textAnchor="middle" fill="#34d399" fontWeight="bold" fontSize="12">2. API Pagination</text>
                <text x="100" y="46" textAnchor="middle" fill="#a7f3d0" fontSize="10">List.Generate / Tokens</text>
                <text x="100" y="62" textAnchor="middle" fill="#94a3b8" fontSize="9">OAuth2 Refresh (20 pts)</text>
              </g>
              <line x1="620" y1="90" x2="500" y2="140" stroke="#34d399" strokeWidth="2" strokeDasharray="3,3" />

              {/* Node 3: Mid Left - Query Folding Pushdown */}
              <g transform="translate(30, 190)">
                <rect width="200" height="75" rx="12" fill="url(#gradNode)" stroke="#a855f7" strokeWidth="1.5" />
                <text x="100" y="28" textAnchor="middle" fill="#c084fc" fontWeight="bold" fontSize="12">3. Query Folding</text>
                <text x="100" y="46" textAnchor="middle" fill="#e9d5ff" fontSize="10">T-SQL Server Pushdown</text>
                <text x="100" y="62" textAnchor="middle" fill="#94a3b8" fontSize="9">Incremental Refresh (15 pts)</text>
              </g>
              <line x1="230" y1="220" x2="370" y2="185" stroke="#a855f7" strokeWidth="2" strokeDasharray="3,3" />

              {/* Node 4: Mid Right - Memory & Buffer Tuning */}
              <g transform="translate(650, 190)">
                <rect width="200" height="75" rx="12" fill="url(#gradNode)" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="100" y="28" textAnchor="middle" fill="#fb7185" fontWeight="bold" fontSize="12">4. RAM Buffering</text>
                <text x="100" y="46" textAnchor="middle" fill="#fecdd3" fontSize="10">Table.Buffer / Complexity</text>
                <text x="100" y="62" textAnchor="middle" fill="#94a3b8" fontSize="9">Early Column Prune (20 pts)</text>
              </g>
              <line x1="650" y1="220" x2="510" y2="185" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" />

              {/* Node 5: Bottom Center - Quarantine & Governance */}
              <g transform="translate(340, 255)">
                <rect width="200" height="75" rx="12" fill="url(#gradNode)" stroke="#eab308" strokeWidth="1.5" />
                <text x="100" y="28" textAnchor="middle" fill="#fde047" fontWeight="bold" fontSize="12">5. Governance &amp; Audits</text>
                <text x="100" y="46" textAnchor="middle" fill="#fef08a" fontSize="10">Dual-Stream Quarantine</text>
                <text x="100" y="62" textAnchor="middle" fill="#94a3b8" fontSize="9">UI Metadata Docs (30 pts)</text>
              </g>
              <line x1="440" y1="240" x2="440" y2="255" stroke="#eab308" strokeWidth="2" strokeDasharray="3,3" />
            </svg>
          </div>
          <p className="text-xs text-slate-400 text-center italic">
            Figure 13.1: 360-Degree Enterprise M Code Competency Map. The assessment comprehensively tests AST evaluation, API token loops, query folding pushdown, memory buffering, and quarantine governance.
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
                Explore the assessment candidate evaluation scoring dataset live in the grid below or download the full module workbook to practice in Microsoft Excel.
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
            sheetName="EX2114"
            title="Capstone Assessment Candidate Scorecard (Candidate Name, Branch, AST Score, Loop Score, Folding Score, Buffer Score, Governance Score, Total /100, Certification Level)"
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
              <span className="text-amber-400">🏢</span> Real-World Corporate Assessment Scenarios
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Evaluation Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Scenario 1 · Principal Architect Defense</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Swadeep Banerjee: 98/100 Master Defense
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Candidate <strong>Swadeep Banerjee</strong> presents a multi-branch consolidation pipeline featuring dynamic API bearer token renewal, 100% SQL query folding pushdown, and dual-stream quarantine logging, earning the Principal Enterprise BI Architect gold medal.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-amber-300">
                Score: 98/100 → Principal Enterprise BI Architect Certified
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Scenario 2 · Memory Optimization Challenge</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Tuhina Mukherjee: 94/100 Speed Tuning
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Candidate <strong>Tuhina Mukherjee</strong> is tasked with debugging an ETL query crashing due to memory leaks. 
                She identifies an unbuffered table scan inside a custom function loop, refactors it with <code className="text-teal-300 font-mono">Table.Buffer</code>, and drops execution time by 97%.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Score: 94/100 → Senior Power Query Performance Specialist
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Scenario 3 · Query Folding Recovery</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Abhronila Das: 92/100 T-SQL Pushdown
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Candidate <strong>Abhronila Das</strong> fixes a broken query folding chain on a 5-million-row SQL fact table by re-ordering <code className="text-indigo-300 font-mono">Table.AddIndexColumn</code> to the tail, restoring native database joins and sub-3-second cloud refresh.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Score: 92/100 → Enterprise Relational Pushdown Specialist
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Scenario 4 · Governance &amp; Schema Drift</span>
                <span className="text-xs font-mono text-slate-400">Naihati Logistics</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Debangshu Roy: 90/100 Dual-Stream Architecture
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Candidate <strong>Debangshu Roy</strong> engineers a fault-tolerant folder ingestion pipeline with <code className="text-purple-300 font-mono">MissingField.UseNull</code> and dual-stream quarantine routing, achieving 100% data audit compliance for statutory GST filing.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Score: 90/100 → Certified Enterprise Governance Architect
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
              <span className="text-sky-400">🛠️</span> Step-by-Step Assessment Execution Protocol
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Exam Workflow
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-950 border border-amber-700 text-amber-300 flex items-center justify-center text-xs">1</span>
                Step 1: Inspect Query Diagnostics &amp; Lineage DAG
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Open <strong>View → Query Dependencies</strong> to evaluate the entire pipeline architecture. Start <strong>Tools → Start Diagnostics</strong> to measure duration and memory metrics for every applied step.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-teal-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-950 border border-teal-700 text-teal-300 flex items-center justify-center text-xs">2</span>
                Step 2: Validate Query Folding &amp; Server Delegation
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Right-click filtering and joining steps to confirm that <strong>View Native Query</strong> is active. Verify that WHERE clauses and column selections are executed directly on the SQL server.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-indigo-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center text-xs">3</span>
                Step 3: Verify Dual-Stream Quarantine Isolation
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Confirm that the production Fact query contains zero error cells and that all malformed or duplicate records are successfully routed to <code className="text-indigo-300 font-mono">Audit_QuarantineLog</code>.
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
              <span className="text-rose-400">⚠️</span> Assessment Evaluation Pitfalls &amp; Penalties
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">Silent Error Suppression</td>
                  <td className="py-3 px-4">Using <code className="text-rose-300 font-mono">try...otherwise null</code> without creating an audit quarantine stream.</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">-15 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Evaluate full error records and preserve defective rows in an audit log.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">Broken Query Folding</td>
                  <td className="py-3 px-4">Placing <code className="text-amber-300 font-mono">Table.AddIndexColumn</code> or client functions before SQL row filters.</td>
                  <td className="py-3 px-4 text-amber-400 font-bold">-10 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Fold early: Push SELECT, WHERE, and JOIN steps to the database first.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">Unbuffered Dimension Lookups</td>
                  <td className="py-3 px-4">Performing row-by-row lookups inside <code className="text-purple-300 font-mono">Table.AddColumn</code> without <code className="text-purple-300 font-mono">Table.Buffer</code>.</td>
                  <td className="py-3 px-4 text-purple-400 font-bold">-15 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Buffer dimension tables in the outer let block to ensure O(N) complexity.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">Loaded Staging Queries</td>
                  <td className="py-3 px-4">Leaving 'Enable Load' active on intermediate transformation staging queries.</td>
                  <td className="py-3 px-4 text-sky-400 font-bold">-10 Points</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Uncheck 'Enable Load' so staging queries exist purely as in-memory processors.</td>
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
              <span className="text-purple-400">💡</span> Final Architect Tips &amp; High-Speed Shortcuts
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Exam Strategies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-300 flex items-center gap-2">
                <span>⚡</span> Tip 1: Profile with Diagnostics First
              </div>
              <p className="text-slate-300 leading-relaxed">
                Before refactoring any slow M query, run Power Query Diagnostics to identify the exact step causing CPU spikes or memory ballooning.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span>⚡</span> Tip 2: Decouple Staging via Reference
              </div>
              <p className="text-slate-300 leading-relaxed">
                Always use <strong>Reference</strong> when branching queries. This ensures that changes to source logic propagate dynamically without maintaining duplicate scripts.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-indigo-300 flex items-center gap-2">
                <span>⚡</span> Tip 3: Structure M Code with 2-Space Indentation
              </div>
              <p className="text-slate-300 leading-relaxed">
                Format your <code className="text-indigo-300 font-mono">let...in</code> blocks cleanly. Clear indentation and descriptive step names make code reviews seamless.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> Tip 4: Test Edge Cases with Empty Datasets
              </div>
              <p className="text-slate-300 leading-relaxed">
                Verify that your custom functions handle 0-row tables and null inputs without throwing unhandled indexing exceptions.
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
              Architectural Reflection
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">💭</span> Question 1: How does understanding lazy evaluation prevent redundant computations?
              </h3>
              <p className="leading-relaxed">
                If an intermediate step in the <code className="text-slate-300 font-mono">let</code> block is never referenced by downstream steps or the <code className="text-slate-300 font-mono">in</code> expression, why does M completely skip its evaluation?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 2: Why is Query Folding essential for Cloud Incremental Refresh?
              </h3>
              <p className="leading-relaxed">
                When Power BI Service refreshes a 100-million-row partitioned dataset, why does broken query folding force full dataset reloads and trigger service timeouts?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-indigo-400">💭</span> Question 3: What distinguishes a basic Excel user from an Enterprise Data Architect?
              </h3>
              <p className="leading-relaxed">
                How does mastering procedural M scripting, recursive iteration, memory budgeting, and fault tolerance transform your ability to solve complex corporate data challenges?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 13: Advanced M Scripting Capstone Assessment FAQ"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Completing this advanced Power Query M scripting module marks your transition into elite enterprise data engineering. You now possess the specialized skills to build automated, high-speed, and fault-tolerant data pipelines that handle millions of records effortlessly. Remember: Great data architects do not just transform data; they build resilient systems that empower entire organizations. Carry these principles forward with pride and precision."
            }
          />
        </div>
      </div>
    </div>
  );
}
