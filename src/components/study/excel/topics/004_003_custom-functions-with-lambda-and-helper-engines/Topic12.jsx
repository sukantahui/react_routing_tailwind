"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_003_custom_functions_with_lambda_and_helper_engines_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic12_files/topic12_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic12() {
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
    link.download = "lambda_master_practice.xlsx";
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
              ⚡ Advanced Algorithmic Recursion · Topic 12
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 5: Synthesize & Evaluate
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Recursive LAMBDAs: Solving Algorithmic Loops & Deep Tree Traversals
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            The introduction of named <code className="text-purple-300 font-mono font-bold">LAMBDA</code> functions 
            elevated Microsoft Excel into a formally <strong>Turing-complete programming language</strong>. 
            By registering a function in Name Manager that invokes itself by name, modelers can execute complex 
            recursive algorithms—including parent-child organizational hierarchy rollups, multi-level Bill of Materials (BOM) explosions, 
            mathematical factorials, string reversals, and tokenizers—entirely inside native formula memory with zero VBA or macro security warnings.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Turing Complete:</strong> True algorithmic recursion in formula RAM</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Hierarchy Rollups:</strong> Traverse organizational trees dynamically</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>1,024 Frame Stack:</strong> Safe memory architecture with depth protection</span>
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
              <span className="text-purple-400">⚡</span> Anatomy of a Recursive LAMBDA
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Rule: Registered Name + Base Condition + Recursive Call
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Name Manager Registration: FX_FACTORIAL</span>
            <div className="mt-1 text-white font-bold">
              =<span className="text-purple-300">LAMBDA</span>(<span className="text-amber-300">n</span>, <span className="text-yellow-300">IF</span>(<span className="text-sky-300">{"n <= 1"}</span>, <span className="text-emerald-300">1</span>, <span className="text-amber-300">n</span> * <span className="text-pink-300">FX_FACTORIAL</span>(<span className="text-amber-300">n</span> - 1)))
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Hierarchy Rollup (Finding Top Executive / CEO):</span> <br />
              <span className="text-emerald-400 font-bold">
                FX_FIND_CEO = LAMBDA(empID, LET(mgr, XLOOKUP(empID, EmpTbl[ID], EmpTbl[MgrID]), IF(OR(mgr="", mgr=empID), empID, FX_FIND_CEO(mgr))))
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Component</th>
                  <th className="py-3 px-4">Syntax Role</th>
                  <th className="py-3 px-4">Mandatory Rule</th>
                  <th className="py-3 px-4">Execution Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-300">Base Case</td>
                  <td className="py-3 px-4 text-emerald-400">Termination Condition</td>
                  <td className="py-3 px-4 text-emerald-400">Non-Negotiable</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Evaluates when recursion stops. Returns a literal without making further self-calls.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-pink-300">Recursive Step</td>
                  <td className="py-3 px-4 text-purple-300">Self-Invocation</td>
                  <td className="py-3 px-4 text-emerald-400">Parameter Reduction</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Calls itself with a smaller input parameter (e.g. <code className="text-amber-300 font-mono">n - 1</code> or parent node).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">Name Manager Binding</td>
                  <td className="py-3 px-4 text-slate-300">Named Identifier</td>
                  <td className="py-3 px-4 text-emerald-400">Strictly Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The formula must be registered under a defined name so the closure can reference itself.</td>
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
              <span className="text-emerald-400">🔬</span> Call Stack Memory Mechanics & Hierarchy Traversal
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Stack Allocation Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Call Stack Unwinding Mechanics
              </h3>
              <p className="leading-relaxed">
                When <code className="text-emerald-300 font-mono">FX_FACT(4)</code> is evaluated, Excel pauses each frame in volatile RAM:
                <br />
                <code className="text-amber-300 font-mono">Frame 1: 4 * FX_FACT(3) → Frame 2: 3 * FX_FACT(2) → Frame 3: 2 * FX_FACT(1) → Base Case: 1</code>.
                <br />
                The stack unwinds backward: <code className="text-sky-300 font-mono">2 * 1 = 2 → 3 * 2 = 6 → 4 * 6 = 24</code>.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                1,024 Maximum Stack Depth Before #NUM! Protection
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Non-Linear Tree & Hierarchy Traversal
              </h3>
              <p className="leading-relaxed">
                While linear datasets can be processed using <code className="text-sky-300 font-mono">REDUCE</code> or <code className="text-sky-300 font-mono">SCAN</code>, 
                non-linear hierarchical structures (like parent-child manager rollups or nested sub-assemblies) have unknown depth. 
                Recursive LAMBDAs climb these dynamic graphs dynamically until hitting the root executive!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Dynamic Graph Traversal without Hard-Coded Depth Limits
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Defensive Depth Limiting Pattern
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              To prevent accidental infinite loops from circular reporting data (e.g. A reports to B, B reports to A), 
              always pass an optional <code className="text-purple-300 font-mono">[maxDepth]</code> parameter:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                {"FX_SAFE_CEO = LAMBDA(empID, [maxDepth], LET(depth, IF(ISOMITTED(maxDepth), 20, maxDepth), mgr, XLOOKUP(empID, ID, MgrID), IF(OR(depth<=0, mgr=\"\", mgr=empID), empID, FX_SAFE_CEO(mgr, depth - 1))))"}
              </code>
            </p>
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
              <span className="text-purple-400">📐</span> Visual Recursive Hierarchy Traversal & Stack Unwinding
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Stack Unwinding Schematic
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how FX_FIND_CEO climbs from entry-level employee Swadeep up to CEO Debangshu:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 330"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Hierarchy Nodes (Left) */}
              <rect x="25" y="30" width="230" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="30" width="230" height="34" rx="12" fill="#7E22CE" fillOpacity="0.3" />
              <text x="140" y="52" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ORGANIZATION HIERARCHY</text>

              <g transform="translate(35, 75)">
                <rect width="210" height="32" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="20" fill="#A7F3D0" fontSize="9.5" fontWeight="bold" fontFamily="monospace">E101: Debangshu (CEO)</text>

                <path d="M 140 32 L 140 50" stroke="#94A3B8" strokeWidth="2" strokeDasharray="2 2" />

                <rect y="50" width="210" height="32" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="70" fill="#38BDF8" fontSize="9.5" fontFamily="monospace">E102: Tuhina (VP Ops → E101)</text>

                <path d="M 140 82 L 140 100" stroke="#94A3B8" strokeWidth="2" strokeDasharray="2 2" />

                <rect y="100" width="210" height="32" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="120" fill="#FDE047" fontSize="9.5" fontFamily="monospace">E103: Swadeep (Analyst → E102)</text>
              </g>

              <rect x="35" y="225" width="210" height="55" rx="6" fill="#1E293B" stroke="#334155" />
              <text x="140" y="247" fill="#FDE047" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Input: =FX_FIND_CEO("E103")</text>
              <text x="140" y="265" fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Starting Node: Swadeep</text>

              {/* Arrow */}
              <path d="M 270 165 L 320 165" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="325,165 315,160 315,170" fill="#A855F7" />

              {/* Stack Execution (Center) */}
              <rect x="330" y="30" width="270" height="270" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="330" y="30" width="270" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="465" y="52" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">RECURSIVE CALL FRAMES</text>

              <g transform="translate(345, 75)">
                <rect width="240" height="42" rx="4" fill="#3B0764" stroke="#A855F7" />
                <text x="10" y="16" fill="#F5D0FE" fontSize="9" fontWeight="bold" fontFamily="monospace">Frame 1: FX_FIND_CEO("E103")</text>
                <text x="10" y="32" fill="#E2E8F0" fontSize="8" fontFamily="sans-serif">XLOOKUP("E103") → Mgr="E102" → Recurse!</text>

                <rect y="50" width="240" height="42" rx="4" fill="#3B0764" stroke="#A855F7" />
                <text x="10" y="66" fill="#F5D0FE" fontSize="9" fontWeight="bold" fontFamily="monospace">Frame 2: FX_FIND_CEO("E102")</text>
                <text x="10" y="82" fill="#E2E8F0" fontSize="8" fontFamily="sans-serif">XLOOKUP("E102") → Mgr="E101" → Recurse!</text>

                <rect y="100" width="240" height="42" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="116" fill="#A7F3D0" fontSize="9" fontWeight="bold" fontFamily="monospace">Frame 3: FX_FIND_CEO("E101")</text>
                <text x="10" y="132" fill="#34D399" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Base Case Met! Mgr="" → Return "E101"</text>
              </g>

              <text x="465" y="275" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ 3 Frames Resolved in Memory</text>

              {/* Arrow */}
              <path d="M 615 165 L 650 165" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="655,165 645,160 645,170" fill="#10B981" />

              {/* Final Output (Right) */}
              <rect x="660" y="80" width="165" height="170" rx="12" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="660" y="80" width="165" height="34" rx="12" fill="#065F46" fillOpacity="0.4" />
              <text x="742" y="102" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">TOP EXECUTIVE</text>

              <g transform="translate(675, 130)">
                <rect width="135" height="45" rx="6" fill="#064E3B" stroke="#10B981" />
                <text x="67" y="28" fill="#FDE047" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">E101</text>
              </g>

              <text x="742" y="200" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Debangshu Ghosh</text>
              <text x="742" y="225" fill="#34D399" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Chief Executive Officer</text>
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
                Explore the corporate reporting hierarchy roster below or download the master workbook to test recursive LAMBDAs in Microsoft Excel.
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
            sheetName="EX1813"
            title="Corporate Hierarchy Roster (Employee ID, Name, Department, Reports-To Manager ID)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · HR Hierarchy Rollup</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Automated Root Executive & Level Identification
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                HR Director <strong>Swadeep Banerjee</strong> deploys: 
                <code className="text-emerald-300 font-mono">=FX_FIND_CEO(A5)</code>. 
                Recursively climbs from junior analysts through shift managers and VP levels up to CEO Debangshu in 1ms.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =FX_FIND_CEO("E103") → Returns "E101" (Debangshu)
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Manufacturing BOM Explosion</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Facility</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Multi-Level Component Requirement Traversal
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Production Lead <strong>Tuhina Mukherjee</strong> calculates total nuts, bolts, and raw steel by recursing down 5 levels of sub-assemblies: 
                <code className="text-amber-300 font-mono">=FX_EXPLODE_BOM(AssemblyID)</code>, 
                eliminating manual part lookups.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Multi-Level Bill of Materials (BOM) Explosion in RAM
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Financial Combinatorics</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Advisory</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Permutations & Factorial Probability Engine
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Risk Analyst <strong>Abhronila Sengupta</strong> registers <code className="text-indigo-300 font-mono">FX_FACT</code> in Name Manager: 
                <code className="text-indigo-300 font-mono">{"=LAMBDA(n, IF(n<=1, 1, n * FX_FACT(n-1)))"}</code>, 
                computing portfolio permutation combinations without external add-ins.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Factorial Combinatorics: FX_FACT(8) = 40,320
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Automated Text Tokenizer</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Recursive String Delimiter Splitting
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Systems Engineer <strong>Debangshu Ghosh</strong> splits complex log lines: 
                <code className="text-amber-300 font-mono">=FX_RECURSIVE_SPLIT(LogLine, ";")</code>, 
                dynamically unwinding tokens into a vertical spilled column using VSTACK.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Recursive Text Tokenizer: Delimited String → Spilled Array
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
              <span className="text-purple-400">🪜</span> Step-by-Step Recursive Function Setup in Name Manager
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Open Name Manager</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-purple-300 font-mono text-xs">Ctrl + F3</kbd> and click <strong>New</strong>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Enter Name and Recursive Formula</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Set <strong>Name</strong> = <code className="text-purple-300 font-mono">FX_FIND_CEO</code>. In <strong>Refers To</strong>, enter: <br />
                  <code className="text-emerald-400 font-mono text-xs">=LAMBDA(empID, LET(mgr, XLOOKUP(empID, Topic12_Recursive_LAMBDA!$A$5:$A$9, Topic12_Recursive_LAMBDA!$D$5:$D$9), IF(OR(mgr="", mgr=empID), empID, FX_FIND_CEO(mgr))))</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Save and Close Name Manager</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Click OK. Excel verifies the recursive self-reference and binds the function to the workbook namespace.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Execute in Worksheet Cell</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">F5</code>, enter: <code className="text-emerald-400 font-mono">=FX_FIND_CEO(A5)</code>. Watch it return <strong>E101 (Debangshu)</strong> in 1 millisecond!
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
              <span className="text-rose-400">⚠️</span> Common Errors & Troubleshooting Matrix
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Error Diagnostic Protocol
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Error Code</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#NUM! (Stack Overflow)</td>
                  <td className="py-3 px-4 text-slate-300">Recursion exceeded 1,024 frames due to missing/flawed base case or circular data loop.</td>
                  <td className="py-3 px-4 text-slate-400">Check base condition logic and check for circular parent-child IDs.</td>
                  <td className="py-3 px-4 text-emerald-400">Implement defensive base conditions (e.g. <code className="text-emerald-400 font-mono">{"depth <= 0"}</code>) and depth limiters.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#NAME?</td>
                  <td className="py-3 px-4 text-slate-300">Attempted to run recursive formula in a cell before registering its name in Name Manager.</td>
                  <td className="py-3 px-4 text-slate-400">Self-referencing requires an explicit defined name.</td>
                  <td className="py-3 px-4 text-emerald-400">Register the formula in Name Manager (<kbd className="px-1 rounded bg-slate-800 text-xs">Ctrl+F3</kbd>) first.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Base Case Flaw</td>
                  <td className="py-3 px-4 text-slate-300">Wrote <code className="text-rose-300 font-mono">n = 1</code> instead of <code className="text-emerald-300 font-mono">{"n <= 1"}</code>, causing negative inputs to loop indefinitely.</td>
                  <td className="py-3 px-4 text-slate-400">Test function with 0 and negative numbers.</td>
                  <td className="py-3 px-4 text-emerald-400">Always use inequality operators (<code className="text-emerald-400 font-mono">{"<="}</code>) for base termination.</td>
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
              Recursion Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Defensive Depth Limiter</span>
                <span>Crash Prevention</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Add optional depth param: <code className="text-emerald-300 font-mono">LAMBDA(id, [maxDepth], ...)</code> to prevent runaway circular loops!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">VSTACK Array Building</span>
                <span>Dynamic Spilling</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Build spilled lists: <code className="text-sky-300 font-mono">VSTACK(current_node, FX_RECURSE(next_node))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">Ctrl + F3</kbd>
                <span>Name Manager Shortcut</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Press <strong>Ctrl + F3</strong> from anywhere in Excel to quickly edit or register recursive LAMBDA functions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">LET Inside Recursion</span>
                <span>Optimized Memory</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Wrap recursive steps in LET to evaluate lookups only once per stack frame.
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
                <strong>Reflect on Turing completeness:</strong> Why does enabling self-referential recursive LAMBDAs formally prove that Excel's formula engine can simulate any algorithmic computer program?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine stack exhaustion protection:</strong> What happens when a recursive formula exceeds 1,024 nested calls, and why does Excel return <code className="text-rose-400 font-mono">#NUM!</code> rather than crashing?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider architectural tool choice:</strong> When should you use a Recursive LAMBDA (for non-linear trees and unknown depth) vs a higher-order helper function like <code className="text-purple-300 font-mono">REDUCE</code> (for fixed linear arrays)?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Recursive LAMBDAs & Algorithmic Loops — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Recursive LAMBDAs represent the pinnacle of computational power in modern Microsoft Excel. By mastering base termination conditions, stack unwinding mechanics, and depth limiters, you can build corporate hierarchy rollups, BOM explosions, and algorithmic tokenizers that execute in native formula memory with zero VBA dependencies!"
            }
          />
        </div>
      </div>
    </div>
  );
}
