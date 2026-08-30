"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_003_custom_functions_with_lambda_and_helper_engines_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic4() {
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
              ⚡ Defensive API Design · Topic 4
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Apply
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Handling Optional Parameters with ISOMITTED & Default Fallbacks
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In professional spreadsheet engineering, functions must be flexible—allowing casual users to supply minimal inputs while 
            empowering advanced analysts to override default business rules. 
            By declaring <strong>bracketed optional parameters <code className="text-amber-300 font-mono">[param]</code></strong> and inspecting them with 
            <code className="text-purple-300 font-mono font-bold">ISOMITTED()</code> inside <code className="text-emerald-300 font-mono">LET</code>, 
            you assign resilient fallback constants (e.g. default 18% GST or 5% discount) when arguments are skipped.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Bracket Notation:</strong> =LAMBDA(req, [opt], ...)</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>ISOMITTED():</strong> Built-in parameter introspection</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Sensible Defaults:</strong> Graceful fallback values in LET</span>
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
              <span className="text-purple-400">⚡</span> Formula Anatomy: Optional Parameters & ISOMITTED
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pattern: IF(ISOMITTED(param), default_value, param)
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Declaration & Default Assignment Pattern</span>
            <div className="mt-1 text-white font-bold">
              =LAMBDA(<span className="text-amber-300">base_rate</span>, [<span className="text-yellow-300">disc_rate</span>], LET(<span className="text-sky-300">d</span>, IF(ISOMITTED(<span className="text-yellow-300">disc_rate</span>), <span className="text-emerald-300">0.05</span>, <span className="text-yellow-300">disc_rate</span>), <span className="text-amber-300">base_rate</span> * (1 - <span className="text-sky-300">d</span>)))
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Usage 1 (Omitted Argument &rarr; Uses default 5% discount):</span>{" "}
              <span className="text-emerald-400 font-bold">=CALCULATE_ROOM_FEE(4500)</span>{" "}
              <span className="text-slate-500">&rarr; 4,275</span> <br />
              <span className="text-slate-500">// Usage 2 (Custom Argument &rarr; Overrides with 10% discount):</span>{" "}
              <span className="text-emerald-400 font-bold">=CALCULATE_ROOM_FEE(4500, 0.10)</span>{" "}
              <span className="text-slate-500">&rarr; 4,050</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Syntax Element</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Position Rule</th>
                  <th className="py-3 px-4">Behavior & Constraints</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">required_param</td>
                  <td className="py-3 px-4 text-slate-300">Mandatory Identifier</td>
                  <td className="py-3 px-4 text-slate-400">Must come first</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Caller MUST provide this argument, or Excel returns error.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-yellow-300">[optional_param]</td>
                  <td className="py-3 px-4 text-purple-300">Bracketed Identifier</td>
                  <td className="py-3 px-4 text-emerald-400">Must be trailing</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Can be skipped by caller. Enclosed in square brackets <code className="text-yellow-300 font-mono">[ ]</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-300">ISOMITTED(p)</td>
                  <td className="py-3 px-4 text-cyan-300">Boolean Introspection</td>
                  <td className="py-3 px-4 text-slate-400">Inside LAMBDA calc</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Returns TRUE if caller skipped argument; FALSE if supplied.</td>
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
              <span className="text-emerald-400">🔬</span> Conceptual Mechanics & Defensive Fallback Patterns
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Robust Software Patterns
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Trailing Placement Rule
              </h3>
              <p className="leading-relaxed">
                In Excel, optional parameters must <strong>always appear at the end</strong> of the parameter list. 
                Writing <code className="text-rose-400 font-mono">=LAMBDA([disc], price, ...)</code> causes a syntax error because Excel cannot determine positional binding if optional parameters appear before required ones.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Rule: Required First &rarr; Optional Last [in brackets]
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Handling Omissions vs. Blank Cells
              </h3>
              <p className="leading-relaxed">
                When a user references a blank cell (e.g. <code className="text-amber-300 font-mono">=FUNC(A2, B2)</code> where B2 is empty), 
                <code className="text-purple-300 font-mono">ISOMITTED(B2)</code> returns <code className="text-rose-400 font-mono">FALSE</code> because a cell reference was supplied! 
                To handle both formula omissions and blank cells, combine: <code className="text-emerald-300 font-mono">IF(OR(ISOMITTED(p), p=""), default, p)</code>.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                Dual Check: IF(OR(ISOMITTED(p), p=""), default, p)
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Multi-Optional Parameter Ingestion
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When a function defines multiple optional parameters (e.g. <code className="text-amber-300 font-mono">=LAMBDA(rate, [gst], [disc], ...)</code>), 
              users can selectively supply the 3rd argument while omitting the 2nd by leaving an empty slot between commas:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                =CALCULATE_TOTAL(5000, , 0.10)  &rarr; Uses default GST (18%) and custom 10% discount!
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
              <span className="text-purple-400">📐</span> Visual ISOMITTED & Default Fallback Logic Flow
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Conditional Fallback Pipeline
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how Excel's calculation engine evaluates ISOMITTED to choose between user overrides and corporate fallback defaults:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Caller Input (Left) */}
              <rect x="25" y="40" width="220" height="240" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="40" width="220" height="34" rx="14" fill="#7E22CE" fillOpacity="0.3" />
              <text x="135" y="62" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CALLER INVOCATION</text>

              <g transform="translate(40, 90)">
                <rect width="190" height="32" rx="6" fill="#1E293B" stroke="#334155" />
                <text x="95" y="20" fill="#E2E8F0" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Arg 1 (rate): ₹4,500</text>

                <rect y="44" width="190" height="32" rx="6" fill="#450A0A" stroke="#EF4444" strokeDasharray="3 3" />
                <text x="95" y="64" fill="#FCA5A5" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Arg 2 (disc): [OMITTED]</text>
              </g>

              <rect x="40" y="185" width="190" height="75" rx="8" fill="#7E22CE" fillOpacity="0.12" stroke="#7E22CE" strokeDasharray="3 3" />
              <text x="135" y="205" fill="#E9D5FF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Worksheet Cell Call</text>
              <text x="135" y="223" fill="#94A3B8" fontSize="9.5" textAnchor="middle" fontFamily="monospace">=CALC_FEE(4500)</text>
              <text x="135" y="240" fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">2nd argument not passed</text>

              {/* Arrow */}
              <path d="M 260 160 L 330 160" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="335,160 325,155 325,165" fill="#A855F7" />

              {/* Decision Branch (Center) */}
              <rect x="340" y="40" width="250" height="240" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="340" y="40" width="250" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="465" y="62" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ISOMITTED() INTROSPECTION</text>

              <g transform="translate(355, 90)">
                <rect width="220" height="36" rx="6" fill="#3B0764" stroke="#A855F7" />
                <text x="110" y="22" fill="#F5D0FE" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">ISOMITTED(disc_rate) &rarr; TRUE</text>

                <rect y="50" width="220" height="55" rx="6" fill="#064E3B" stroke="#10B981" />
                <text x="110" y="70" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Fallback Triggered</text>
                <text x="110" y="88" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">LET(d = 0.05 (5% Default))</text>
              </g>

              <text x="465" y="220" fill="#E2E8F0" fontSize="9.5" textAnchor="middle" fontFamily="monospace">Math: 4500 * (1 - 0.05)</text>
              <text x="465" y="240" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Resilient Zero-Error Execution</text>

              {/* Arrow */}
              <path d="M 605 160 L 665 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="670,160 660,155 660,165" fill="#10B981" />

              {/* Output (Right) */}
              <rect x="675" y="40" width="150" height="240" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="675" y="40" width="150" height="34" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="750" y="62" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">OUTPUT VALUE</text>

              <g transform="translate(685, 95)">
                <rect width="130" height="40" rx="6" fill="#064E3B" stroke="#10B981" />
                <text x="65" y="25" fill="#A7F3D0" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">₹4,275.00</text>
              </g>

              <rect x="685" y="180" width="130" height="80" rx="6" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeDasharray="3 3" />
              <text x="750" y="205" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Graceful Fallback</text>
              <text x="750" y="225" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">4500 - 5% = 4275</text>
              <text x="750" y="243" fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Zero #VALUE! Errors</text>
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
                Explore the hotel booking dataset below or download the master workbook to test optional parameter functions in Microsoft Excel.
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
            sheetName="Topic4_ISOMITTED"
            title="Hotel Booking Register (Base Rate, Custom Discount Rate Overrides)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Hospitality Booking Engine</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore Guest House</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Default 5% Member Discount with VIP Overrides
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Front Desk Manager <strong>Swadeep Banerjee</strong> creates: 
                <code className="text-emerald-300 font-mono">CALC_ROOM = LAMBDA(rate, [disc], LET(d, IF(ISOMITTED(disc), 0.05, disc), rate * (1 - d)))</code>. 
                Regular bookings use <code className="text-purple-300 font-mono">=CALC_ROOM(E5)</code> (5% default discount), while VIP bookings pass custom discounts: <code className="text-purple-300 font-mono">=CALC_ROOM(E6, F6)</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =CALC_ROOM(E5, [F5]) &rarr; Graceful 5% Default Handling
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Corporate Tax Compliance</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Default 18% Standard GST Rate with 12%/28% Overrides
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Accountant <strong>Tuhina Mukherjee</strong> registers <code className="text-amber-300 font-mono">FX_GST_TOTAL = LAMBDA(amt, [gst], LET(r, IF(ISOMITTED(gst), 0.18, gst), amt * (1 + r)))</code>. 
                95% of transactions omit the 2nd argument and apply standard 18% GST, while luxury items pass <code className="text-emerald-300 font-mono">0.28</code> explicitly.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Default 18% GST &rarr; Custom Override when Required
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Banking Loan Advisory</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Advisory</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Default 8.5% Benchmark Repo Rate for Mortgages
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Loan Officer <strong>Abhronila Sengupta</strong> registers <code className="text-indigo-300 font-mono">FX_EMI = LAMBDA(P, n_months, [annual_rate], LET(r, IF(ISOMITTED(annual_rate), 0.085, annual_rate)/12, P*r*(1+r)^n_months / ((1+r)^n_months - 1)))</code>. 
                Junior clerks calculate standard quotes instantly by providing only Principal and Tenure!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Default Repo Rate &rarr; Simplified 2-Argument Invocation
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Automated Data Cleansing</span>
                <span className="text-xs font-mono text-slate-400">Naihati Software Lab</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Default Country Code Prefix (+91 India)
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                DevOps Engineer <strong>Debangshu Ghosh</strong> builds <code className="text-amber-300 font-mono">CLEAN_PHONE = LAMBDA(phone, [country_code], LET(cc, IF(ISOMITTED(country_code), "+91", country_code), cc & " " & RIGHT(SUBSTITUTE(phone, " ", ""), 10)))</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Default +91 Country Prefix &rarr; Robust Phone Standardization
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
              <span className="text-purple-400">🪜</span> Step-by-Step Optional Parameter Implementation Walkthrough
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Declare Optional Parameter in Brackets</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Start your LAMBDA declaration: <code className="text-amber-300 font-mono">=LAMBDA(rate, [disc], ...)</code>. Note that <code className="text-yellow-300 font-mono">[disc]</code> is wrapped in square brackets.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Assign Default Value in LET with ISOMITTED</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Inside the calculation, wrap in LET: <code className="text-emerald-400 font-mono">LET(d, IF(ISOMITTED(disc), 0.05, disc), rate * (1 - d))</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Test Both Scenarios with Immediate Execution</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Test omission: <code className="text-emerald-400 font-mono">=(LAMBDA(r, [d], LET(d_val, IF(ISOMITTED(d), 0.05, d), r*(1-d_val))))(4500)</code> &rarr; Returns 4275. <br />
                  Test override: <code className="text-emerald-400 font-mono">=(LAMBDA(r, [d], LET(d_val, IF(ISOMITTED(d), 0.05, d), r*(1-d_val))))(4500, 0.10)</code> &rarr; Returns 4050.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Register in Name Manager with Default Comment</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Save as <code className="text-emerald-300 font-mono">CALCULATE_ROOM_FEE</code> in Name Manager with comment: <code className="text-slate-300 font-mono">"CALCULATE_ROOM_FEE(rate, [disc=5%])"</code>.
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
                  <th className="py-3 px-4">Error Pattern</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Syntax Error on Brackets</td>
                  <td className="py-3 px-4 text-slate-300">Placed an optional parameter before a required parameter (e.g. LAMBDA([d], p, ...)).</td>
                  <td className="py-3 px-4 text-slate-400">Excel refuses formula entry with syntax alert.</td>
                  <td className="py-3 px-4 text-emerald-400">Move all bracketed <code className="text-emerald-400 font-mono">[opt]</code> parameters to the end.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Calculation Error / NaN</td>
                  <td className="py-3 px-4 text-slate-300">Forgot to test with ISOMITTED; performed arithmetic directly on omitted parameter.</td>
                  <td className="py-3 px-4 text-slate-400">Formula fails when user omits the optional argument.</td>
                  <td className="py-3 px-4 text-emerald-400">Sanitize with <code className="text-emerald-400 font-mono">IF(ISOMITTED(p), default, p)</code> inside LET.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Blank Cell Misinterpretation</td>
                  <td className="py-3 px-4 text-slate-300">User referenced an empty cell; ISOMITTED returned FALSE.</td>
                  <td className="py-3 px-4 text-slate-400">Formula treated empty cell as 0 instead of applying default.</td>
                  <td className="py-3 px-4 text-emerald-400">Use <code className="text-emerald-400 font-mono">IF(OR(ISOMITTED(p), p=""), default, p)</code>.</td>
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
              Optional Parameter Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Skip with Empty Comma</span>
                <span>Multi-Optional Calls</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Skip an optional argument while providing subsequent ones: <code className="text-amber-300 font-mono">=FUNC(100, , 0.18)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Dynamic Fallback Expressions</span>
                <span>Dynamic Defaults</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use dynamic formulas as defaults: <code className="text-emerald-300 font-mono">IF(ISOMITTED(d), TODAY(), d)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">Top-of-LET Sanitization</span>
                <span>Clean Architecture</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always resolve all ISOMITTED defaults in the first lines of LET declarations.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">Ctrl+Shift+A</kbd>
                <span>Bracketed Prompts</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Press Ctrl+Shift+A to view which arguments are marked optional with <code className="text-yellow-300 font-mono">[brackets]</code>.
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
                <strong>Reflect on defensive programming:</strong> Why does wrapping optional parameter sanitization inside <code className="text-emerald-300 font-mono">LET</code> prevent unexpected calculation errors when junior staff omit arguments?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine blank cell edge cases:</strong> Why does passing a reference to an empty cell cause <code className="text-purple-300 font-mono">ISOMITTED()</code> to return <code className="text-rose-400 font-mono">FALSE</code>, and how does combining with <code className="text-emerald-300 font-mono">OR(ISOMITTED(p), p="")</code> solve this?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider API design:</strong> When designing a corporate tax function, why is defaulting to the standard 18% GST rate better than forcing users to type 0.18 in every invoice row?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Optional Parameters & ISOMITTED — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Optional parameters with ISOMITTED and default fallbacks in LET are the secret to building intuitive corporate APIs in Excel. By providing sensible standard defaults (like 18% GST or 5% member discounts), your custom functions remain effortless for 95% of routine workflows while still retaining full override flexibility for complex exceptions!"
            }
          />
        </div>
      </div>
    </div>
  );
}
